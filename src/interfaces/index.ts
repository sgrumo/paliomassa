// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export enum Role {
  INTERNAL = "Interno",
  MEDIAN = "Mediano",
  EXTERNAL = "Esterno",
}

export interface Athlete {
  name: string;
  weight: number;
  roles: Role[];
  excluded: boolean;
  mustBeInTheTeam: boolean;
}

export interface SingleRoleAthlete {
  name: string;
  weight: number;
  role: Role;
}

export interface MultiselectOption {
  name: string;
  value: string;
  checked: boolean;
}

export type AthleteInTeam = SingleRoleAthlete[];

export interface Team {
  internals: AthleteInTeam;
  medians: AthleteInTeam;
  externals: AthleteInTeam;
  weight: number;
}

export type Result = Team[];
