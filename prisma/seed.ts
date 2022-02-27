import { PrismaClient, PlayerStatus } from "@prisma/client";
import { comps, groups, players, seasons, teams } from "./data";

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
  const [currentSeason] = seasons;
  const [currentGroup] = groups;

  console.log("Seeding competitions...");
  const [mainCompetition, ...comps] = await prisma.$transaction(
    generateComps(currentGroup.id, currentSeason.id)
  );

  console.log("Seeding teams...");
  const [currentTeam, ...opponents] = await prisma.$transaction(
    generateTeams(currentGroup.id)
  );

  console.log("Seeding players...");
  const players = await prisma.$transaction(
    generatePlayers(currentTeam.id, currentGroup.id)
  );

  console.log("Seeding events...");
  const events = await prisma.$transaction(
    generateEvents(
      currentSeason.id,
      currentGroup.id,
      mainCompetition.id,
      currentTeam.id,
      opponents.map((team) => team.id)
    )
  );

  console.log("Adding players to events...");
  const playersOnEvents = await prisma.$transaction(
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

function generateSeasons() {
  return seasons.map((season) =>
    prisma.season.create({
      data: {
        name: season.name,
      },
    })
  );
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
  console.log(players);
  console.log(events);

  const playersOnEvents = events.map((eventId) => {
    return players.map((playerId) => {
      const status = randomFromEnum(PlayerStatus);
      return prisma.playersOnEvent.create({
        data: {
          eventId,
          playerId,
          status,
        },
      });
    });
  });
  return flatten(playersOnEvents);
}

function randomFromEnum<T, K extends keyof T>(e: T): K {
  const keys = Object.keys(e) as K[];
  return keys[Math.floor(Math.random() * Object.keys(keys).length)];
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
