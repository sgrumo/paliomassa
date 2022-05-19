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
  INTERNAL = "interno",
  MEDIAN = "median",
  EXTERNAL = "esterno",
}

export interface Athlete {
  name: string;
  weight: number;
  roles: Role[];
}

export interface MultiselectOption {
  name: string;
  value: string;
  checked: boolean;
}
