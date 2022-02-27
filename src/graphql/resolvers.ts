import { prisma } from "../lib/prisma";

const select = {
  id: true,
  firstName: true,
  lastName: true,
  number: true,
};

export const resolvers = {
  Event: {
    //@ts-ignore
    competition: ({ competitionId }) => {
      return prisma.competition.findFirst({ where: { id: competitionId } });
    },
    //@ts-ignore
    players: async ({ id, teamId }) => {
      const playersOnEvent = await prisma.playersOnEvent.findMany({
        where: {
          eventId: id,
        },
        select: {
          player: {
            select,
          },
          status: true,
        },
      });
      const ids = playersOnEvent.map(({ player }) => player.id);
      const invited = await prisma.player.findMany({
        where: {
          teamId,
          id: {
            notIn: ids,
          },
        },
        select,
      });

      return [
        ...playersOnEvent,
        ...invited.map((player) => ({
          player,
          status: "PENDING",
        })),
      ];
    },
    //@ts-ignore
    team: ({ teamId }) => {
      return prisma.team.findFirst({ where: { id: teamId } });
    },
    //@ts-ignore
    opponent: ({ opponentId }) => {
      return prisma.team.findFirst({ where: { id: opponentId } });
    },
    //@ts-ignore
    result: ({ id }) => {
      return prisma.eventResult.findFirst({ where: { eventId: id } });
    },
  },
  Query: {
    //@ts-ignore
    events: (_parent, { input: { seasonId, groupId } }) => {
      return prisma.event.findMany({
        where: { seasonId, groupId },
      });
    },
    //@ts-ignore
    event: (_parent, { input: { eventId } }) => {
      return prisma.event.findFirst({
        where: { id: eventId },
      });
    },
    //@ts-ignore
    eventStats: async (_parent, { input: { eventId } }) => {
      const stats = await prisma.playerStats.findMany({
        where: {
          eventId,
        },
        include: {
          player: {
            select,
          },
        },
      });
      console.log("stats", stats);
      if (stats.length < 1) {
        const acceptedPlayers = await prisma.playersOnEvent.findMany({
          where: { eventId, status: "ACCEPTED" },
          include: { player: { select } },
        });
        console.log(acceptedPlayers);
        return acceptedPlayers.map(({ player }) => ({
          playerId: player.id,
          firstName: player.firstName,
          lastName: player.lastName,
          eventId,
          goals: 0,
          assists: 0,
          redCards: 0,
          yellowCards: 0,
        }));
      }
      return stats.map(({ player, ...rest }) => ({
        ...rest,
        firstName: player?.firstName,
        lastName: player?.lastName,
      }));
    },
  },
  Mutation: {
    //@ts-ignore
    submitEventStats: async (_parent, { input: { players } }) => {
      console.log(players);
      const stats = await prisma.$transaction(
        players.map((player: any) =>
          prisma.playerStats.upsert({
            create: player,
            update: player,
            where: {
              id: player.playerId,
            },
            include: {
              player: {
                select,
              },
            },
          })
        )
      );
      console.log("created", stats);
      return stats.map(({ player, ...rest }) => ({
        ...rest,
        firstName: player?.firstName,
        lastName: player?.lastName,
      }));
    },
  },
};
