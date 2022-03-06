//@ts-nocheck
import { prisma } from "../lib/prisma";

const select = {
  id: true,
  firstName: true,
  lastName: true,
  number: true,
};

export const resolvers = {
  Event: {
    competition: ({ competitionId }) => {
      return prisma.competition.findFirst({ where: { id: competitionId } });
    },

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

    team: ({ teamId }) => {
      return prisma.team.findFirst({ where: { id: teamId } });
    },

    opponent: ({ opponentId }) => {
      return prisma.team.findFirst({ where: { id: opponentId } });
    },

    result: ({ id }) => {
      return prisma.eventResult.findFirst({ where: { eventId: id } });
    },
  },
  Query: {
    events: (_parent, { input: { seasonId, groupId } }) => {
      return prisma.event.findMany({
        where: { seasonId, groupId },
      });
    },

    event: (_parent, { input: { eventId } }) => {
      return prisma.event.findFirst({
        where: { id: eventId },
      });
    },

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
    submitEventStats: async (_parent, { input: { players } }) => {
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
      return stats.map(({ player, ...rest }) => ({
        ...rest,
        firstName: player?.firstName,
        lastName: player?.lastName,
      }));
    },
    submitEventResult: async (
      _parent,
      { input: { eventId, teamGoals, opponentGoals } }
    ) => {
      console.log(eventId, teamGoals, opponentGoals);
      const r = await prisma.eventResult.upsert({
        where: {
          eventId,
        },
        create: {
          teamGoals,
          opponentGoals,
          event: {
            connect: {
              id: eventId,
            },
          },
        },
        update: {
          teamGoals,
          opponentGoals,
        },
      });
      return prisma.event.findFirst({ where: { id: eventId } });
    },
  },
};
