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
  },
  Mutation: {
    createSeason: () => {
      return seasons[0];
    },
  },
};
