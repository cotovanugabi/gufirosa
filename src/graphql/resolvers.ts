import { prisma } from "../lib/prisma";

export const resolvers = {
  Event: {
    //@ts-ignore
    competition: ({ competitionId }) => {
      return prisma.competition.findFirst({ where: { id: competitionId } });
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
    events: async (_parent, { input: { seasonId, groupId } }) => {
      return prisma.event.findMany({
        where: { seasonId, groupId },
      });
    },
  },
};
