import { prisma } from "../lib/prisma";

export const resolvers = {
  Event: {
    //@ts-ignore
    competition: ({ competitionId }) => {
      return prisma.competition.findFirst({ where: { id: competitionId } });
    },
  },
  Query: {
    //@ts-ignore
    events: (_parent, { input: { seasonId, groupId } }) => {
      return prisma.event.findMany({ where: { seasonId, groupId } });
    },
  },
};
