import { Athlete, Role } from "../src/interfaces";

export const sampleAthletes: Athlete[] = [
  {
    name: "Johnny",
    weight: 83.7,
    roles: [Role.INTERNAL, Role.MEDIAN],
    mustBeInTheTeam: false,
    excluded: false
  },
  {
    name: "Beppe",
    weight: 94.1,
    roles: [Role.EXTERNAL],
    mustBeInTheTeam: false,
    excluded: false
  },
  {
    name: "Rigoberto",
    weight: 73.2,
    roles: [Role.INTERNAL],
    mustBeInTheTeam: false,
    excluded: false
  },
  {
    name: "Jackie Chan",
    weight: 83.7,
    roles: [Role.MEDIAN],
    mustBeInTheTeam: false,
    excluded: false
  },
  {
    name: "Sartianivic",
    weight: 83.7,
    roles: [Role.INTERNAL, Role.EXTERNAL],
    mustBeInTheTeam: false,
    excluded: false
  },
  {
    name: "Satana",
    weight: 76.7,
    roles: [Role.MEDIAN],
    mustBeInTheTeam: false,
    excluded: false
  },
  {
    name: "Tajeur",
    weight: 94.7,
    roles: [Role.INTERNAL],
    mustBeInTheTeam: false,
    excluded: false
  },
  {
    name: "Mino",
    weight: 80.3,
    roles: [Role.EXTERNAL, Role.MEDIAN],
    mustBeInTheTeam: false,
    excluded: false
  },
  {
    name: "Sauro il magnifico",
    weight: 83.7,
    roles: [Role.EXTERNAL, Role.MEDIAN],
    mustBeInTheTeam: false,
    excluded: false
  },
];
