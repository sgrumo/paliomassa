import { Athlete, Role, Team } from "../src/interfaces";
import { SingleRoleAthlete } from "./../src/interfaces/index";

export const MAX_WEIGHT = 540;
export const MAX_ATHLETE_PER_ROLE = 2;
export const MAX_ROLES = 3;
export const TEAM_LENGTH = MAX_ATHLETE_PER_ROLE * MAX_ROLES;

export const COMBINATION_KEY = "COMBINATION";
export const TEAM_KEY = "TEAM";

export const getCombinations = (athletes: Athlete[]) => {
  // const teams: Team[] = [];

  const nra: SingleRoleAthlete[] = athletes.filter(athlete => athlete.excluded !== true).flatMap((athlete) =>
    athlete.roles.map((role) => ({
      role,
      name: athlete.name,
      weight: athlete.weight,
    }))
  );

  const teams = subset(nra, TEAM_LENGTH);

  const filteredTeams = teams.filter((team) => {
    const nameSet = new Set(team.map((athl) => athl.name));
    if (nameSet.size !== TEAM_LENGTH) {
      return false;
    }
    const totalWeight = team.reduce((acc, curr) => (acc += curr.weight), 0);
    if (totalWeight > MAX_WEIGHT) {
      return false;
    }
    const internalsNumb = team.filter(
      (athl) => athl.role === Role.INTERNAL
    ).length;
    const externalsNumb = team.filter(
      (athl) => athl.role === Role.EXTERNAL
    ).length;
    const mediansNumb = team.filter((athl) => athl.role === Role.MEDIAN).length;

    if (
      internalsNumb !== MAX_ATHLETE_PER_ROLE ||
      mediansNumb !== MAX_ATHLETE_PER_ROLE ||
      externalsNumb !== MAX_ATHLETE_PER_ROLE
    ) {
      return false;
    }

    return true;
  });



  const team: Team[] = filteredTeams
    .filter(team => {
      const athletesMustBeInTeam = athletes.filter(athlete => athlete.mustBeInTheTeam);
      const teamAthleteNames = team.map(athl => athl.name);

      return athletesMustBeInTeam.every(athlete => teamAthleteNames.includes(athlete.name));
    })
    .map((singleTeam) => {
      const internals = singleTeam.filter((athl) => athl.role === Role.INTERNAL);
      const externals = singleTeam.filter((athl) => athl.role === Role.EXTERNAL);
      const medians = singleTeam.filter((athl) => athl.role === Role.MEDIAN);
      const weight = singleTeam.reduce((acc, curr) => (acc += curr.weight), 0);
      return { internals, externals, medians, weight };
    });

  sessionStorage.setItem(COMBINATION_KEY, JSON.stringify(team));
  sessionStorage.setItem(TEAM_KEY, JSON.stringify(athletes));
};

const subset = <T>(arra: T[], combination: number): T[][] => {
  const result_set: T[][] = [];
  let result: T[];

  for (let x = 0; x < Math.pow(2, arra.length); x++) {
    result = [];
    let i = arra.length - 1;
    do {
      if ((x & (1 << i)) !== 0) {
        result.push(arra[i]);
      }
    } while (i--);

    if (result.length === combination) {
      result_set.push(result);
    }
  }

  return result_set;
};
