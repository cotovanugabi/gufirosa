import { PlayerStatus } from "../graphql/generated/api";
import { PlayersType } from "../types";

export function flattenPlayers(players: any[]) {
  return players.map(({ player, status }) => ({
    ...player,
    status,
  }));
}

export function filterAcceptedPlayers(players?: PlayersType) {
  if (!players) return [];
  return players.filter((player) => player?.status == PlayerStatus.Accepted);
}

export function sortTeams<T>(teams: T[], isHome: boolean) {
  if (isHome) {
    return teams;
  }
  return teams.reverse();
}
