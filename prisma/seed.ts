import { PrismaClient, PlayerStatus } from "@prisma/client";
import { comps, players, teams } from "./data";

let prisma = new PrismaClient();

main()
  .catch(function onError(error) {
    console.error(error);
    process.exit(1);
  })
  .finally(async function onFinally() {
    await prisma.$disconnect();
  });

async function main() {
  console.log(`Seeding seasons...`);
  let currentSeason = await prisma.season.create({
    data: {
      name: "Season 2021/22",
    },
  });

  console.log("Seeding groups...");
  let currentGroup = await prisma.group.create({
    data: {
      name: "Gufirosa",
    },
  });

  console.log("Seeding competitions...");
  let [mainCompetition, ...comps] = await prisma.$transaction(
    generateComps(currentGroup.id, currentSeason.id)
  );

  console.log("Seeding teams...");
  let [currentTeam, ...opponents] = await prisma.$transaction(
    generateTeams(currentGroup.id)
  );

  console.log("Seeding players...");
  let players = await prisma.$transaction(
    generatePlayers(currentTeam.id, currentGroup.id)
  );

  console.log("Seeding events...");
  let events = await prisma.$transaction(
    generateEvents(
      currentSeason.id,
      currentGroup.id,
      mainCompetition.id,
      currentTeam.id,
      opponents.map((team) => team.id)
    )
  );

  console.log("Adding players to events...");
  let playersOnEvents = await prisma.$transaction(
    //@ts-ignore
    addPlayersToEvents(
      players.map((player) => player.id),
      events.map((event) => event.id)
    )
  );

  // let playersOnEvent = players.map(({ id, groupId }) => ({
  //   playerId: id,
  //   groupId,
  //   events: events
  //     .filter((event) => event.groupId == groupId)
  //     .map((event) => event.id),
  // }));
  // await prisma.playersOnEvent.createMany({
  //   data: generatePlayersOnEvents(playersOnEvent),
  // });

  // console.log("Adding player stats...");
  // await prisma.playerStats.createMany({
  //   data: generatePlayerStats(
  //     italyPlayerIds,
  //     italyEventIds,
  //     italyGroup.id,
  //     currentSeason.id
  //   ),
  // });
  // await prisma.playerStats.createMany({
  //   data: generatePlayerStats(
  //     englandPlayerIds,
  //     englandEventIds,
  //     englandGroup.id,
  //     currentSeason.id
  //   ),
  // });
}

function generateComps(groupId: number, seasonId: number) {
  return comps.map((comp) =>
    prisma.competition.create({
      data: {
        name: comp,
        groupId,
        seasonId,
      },
    })
  );
}

function generateTeams(groupId: number) {
  return teams.map((team) =>
    prisma.team.create({
      data: {
        ...team,
        groupId,
      },
    })
  );
}

function generatePlayers(teamId: number, groupId: number) {
  return players.map((player) =>
    prisma.player.create({
      data: {
        ...player,
        teamId,
        groupId,
      },
    })
  );
}

function generateEvents(
  seasonId: number,
  groupId: number,
  competitionId: number,
  teamId: number,
  opponents: number[]
) {
  let events = opponents.map((opponentId) =>
    prisma.event.create({
      data: {
        opponentId,
        competitionId,
        teamId,
        groupId,
        seasonId,
        isHome: Math.random() < 0.4, //40% probability of getting true
        ...(Math.random() < 0.6
          ? {
              result: {
                create: {
                  teamGoals: randomNumberFromInterval(0, 3),
                  opponentGoals: randomNumberFromInterval(0, 3),
                },
              },
            }
          : {}),
      },
    })
  );
  return flatten(events);
}

function addPlayersToEvents(players: number[], events: number[]) {
  let playersOnEvents = events.map((eventId) => {
    return players.map((playerId) =>
      prisma.playersOnEvent.create({
        data: {
          eventId,
          playerId,
          status: "ACCEPTED",
        },
      })
    );
  });
  return flatten(playersOnEvents);
}

// function generateEvents(
//   seasons: Season[],
//   teams: {
//     id: string;
//     groupId: string;
//     opponents: string[];
//   }[],
//   competitions: Competition[]
// ) {
//   let events = seasons.map((season) => {
//     return teams.map(({ id, groupId, opponents }) => {
//       return opponents.map((opponent) => {
//         return competitions.map((comp) => {
//           return prisma.event.create({
//             data: {
//               competitionId: comp.id,
//               teamId: id,
//               opponentId: opponent,
//               seasonId: season.id,
//               groupId: groupId,
//               isHome: Math.random() < 0.4, //40% probability of getting true
//               ...(Math.random() < 0.6
//                 ? {
//                     result: {
//                       create: {
//                         teamGoals: randomNumberFromInterval(0, 3),
//                         opponentGoals: randomNumberFromInterval(0, 3),
//                       },
//                     },
//                   }
//                 : {}),
//             },
//           });
//         });
//       });
//     });
//   });
//   return flatten(events);
// }

function generatePlayersOnEvents(
  players: {
    playerId: string;
    groupId: string;
    events: string[];
  }[]
) {
  let responses = Object.keys(PlayerStatus);
  let playersOnEvents = players.map(({ playerId, events }) => {
    return events.map((eventId) => {
      return {
        playerId,
        eventId,
        status: randomFromArray(responses),
      };
    });
  });
  return flatten(playersOnEvents);
}

// function createTeams(teams: any[], groupId: string) {
//   return teams.map((team) =>
//     prisma.team.create({
//       data: {
//         ...team,
//         groupId,
//       },
//     })
//   );
// }

// function createPlayers(players: any[], teamId: string, groupId: string) {
//   return players.map((player) =>
//     prisma.player.create({
//       data: {
//         ...player,
//         groupId,
//         teamId,
//       },
//     })
//   );
// }

// function createEvents(
//   seasonId: string,
//   groupId: string,
//   competitionId: string,
//   teamId: string,
//   teams: string[]
// ) {
//   let events = generateEvents(seasonId, groupId, competitionId, teamId, teams);
//   return events.map((data) =>
//     prisma.event.create({
//       data,
//     })
//   );
// }

// function generateEvents(
//   seasonId: string,
//   groupId: string,
//   competitionId: string,
//   teamId: string,
//   teams: string[]
// ): {
//   groupId: string;
//   seasonId: string;
//   competitionId: string;
//   teamId: string;
//   opponentId: string;
//   isHome: boolean;
// }[] {
//   const count = 10;
//   let events = [];
//   for (let i = 0; i <= count; i++) {
//     events.push({
//       groupId,
//       seasonId,
//       competitionId,
//       teamId,
//       isHome: Math.random() < 0.5,
//       opponentId: randomFromArray(teams),
//       result: {
//         create: {
//           teamGoals: randomNumberFromInterval(0, 3),
//           opponentGoals: randomNumberFromInterval(0, 3),
//         },
//       },
//     });
//   }
//   return events;
// }

// function generatePlayersOnEvents(players: string[], events: string[]) {
//   let responses = Object.keys(PlayerStatus);
//   return flatten(
//     events.map((eventId) => {
//       return players.map((playerId) => {
//         return {
//           eventId,
//           playerId,
//           status: randomFromArray(responses),
//         };
//       });
//     })
//   );
// }

function generatePlayerStats(
  players: string[],
  events: string[],
  groupId: string,
  seasonId: string
) {
  return flatten(
    players.map((playerId) => {
      return events.map((eventId) => {
        return {
          playerId,
          eventId,
          groupId,
          seasonId,
          goals: randomNumber(2),
          assists: randomNumber(1),
          redCards: randomNumber(1),
          yellowCards: randomNumber(1),
        };
      });
    })
  );
}

function randomNumber(max = 4) {
  return Math.round(Math.random() * max);
}

function randomFromArray(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumberFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function flatten(arr: any[]): any {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
}
