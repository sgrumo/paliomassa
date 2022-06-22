import { SingleRoleAthlete, Team } from "../interfaces";

export interface CombinationProps {
  team: Team;
  index: number;
}

const Combination = ({ team, index }: CombinationProps) => {
  const { internals, medians, externals, weight } = team;

  const athleteMapping = (athl: SingleRoleAthlete, index: number) => {
    return (
      <div className="flex flex-col mr-8" key={index}>
        <p>
          <i>Nome:</i> {athl.name}
        </p>
        <p>
          <i>Peso:</i> {athl.weight}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col mb-4">
      <h2 className="font-bold">Combinazione {index + 1}</h2>
      <h3 className="font-bold">Interni</h3>
      <div className="flex">{internals.map(athleteMapping)}</div>
      <h3 className="font-bold mt-2">Mediani</h3>
      <div className="flex">{medians.map(athleteMapping)}</div>
      <h3 className="font-bold mt-2">Esterni</h3>
      <div className="flex">{externals.map(athleteMapping)}</div>
      <p className="mt-2">
        Peso totale: <b>{weight}</b>
      </p>
    </div>
  );
};

export default Combination;
