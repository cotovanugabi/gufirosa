import { prisma } from "../lib/prisma";

const seasons = [
  {
    id: 1,
    name: "Season 2021/22",
  },
  {
    id: 2,
    name: "Season 2022/23",
  },
];

export const resolvers = {
  Query: {
    seasons: () => {
      return seasons;
    },
    stars: () => {
      return prisma?.star.findMany();
    },
  },
  Mutation: {
    createSeason: () => {
      return seasons[0];
    },
  },
};
