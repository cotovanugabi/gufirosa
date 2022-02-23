import { prisma } from "../lib/prisma";

export const resolvers = {
  Event: {
    //@ts-ignore
    competition: ({ competitionId }) => {
      return prisma.competition.findFirst({ where: { id: competitionId } });
    },
    //@ts-ignore
    players: async ({ id, teamId }) => {
      let select = {
        id: true,
        firstName: true,
        lastName: true,
      };
      let playersOnEvent = await prisma.playersOnEvent.findMany({
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
      let ids = playersOnEvent.map(({ player }) => player.id);
      let invited = await prisma.player.findMany({
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
  },
};
