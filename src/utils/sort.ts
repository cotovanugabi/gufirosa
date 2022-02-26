export function sortTeams<T>(teams: T[], isHome: boolean) {
  if (isHome) {
    return teams;
  }
  return teams.reverse();
}
