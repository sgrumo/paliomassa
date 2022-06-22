import React, { useState } from "react";
import { Athlete, MultiselectOption, Role } from "../interfaces";
import Multiselect from "./Multiselect";

export interface AthleteFormInputProps {
  index: number;
  athlete: Athlete;
  deleteAthlete: (index: number) => void;
  updateAthlete: (athlete: Athlete) => void;
}

const AthleteFormInput = ({
  index,
  athlete,
  deleteAthlete,
  updateAthlete,
}: AthleteFormInputProps) => {
  const [athleteInput, setAthleteInput] = useState<Athlete>(athlete);

  const handleChangeSelected = (selected: MultiselectOption[]) => {
    const roles = selected
      .filter(({ checked }) => checked)
      .map(({ value }) => value as Role);
    const newAthlete = { ...athleteInput, roles };
    updateAthlete(newAthlete);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAthlete = { ...athleteInput, name: e.target.value };
    updateAthlete(newAthlete);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAthlete = { ...athleteInput, weight: parseFloat(e.target.value) };
    updateAthlete(newAthlete);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 items-center">
      <label className="flex flex-col">
        Nome combattente
        <input
          type="text"
          required
          className="my-2 py-2 flex border border-gray-200 bg-white rounded"
          onChange={handleNameChange}
          value={athlete.name}
        />
      </label>
      <label className="flex flex-col">
        Peso
        <input
          type="number"
          min={30}
          max={200}
          required
          onChange={handleWeightChange}
          value={athlete.weight}
          step="0.01"
          className="my-2 py-2 flex border border-gray-200 bg-white rounded "
        />
      </label>
      <label className="flex flex-col">
        Ruolo
        <Multiselect
          values={athlete.roles}
          handleChangeSelected={handleChangeSelected}
        />
      </label>
      {index !== 0 && (
        <button
          onClick={() => deleteAthlete(index)}
          className="bg-red-500 rounded text-white"
          type="button"
        >
          X
        </button>
      )}
    </div>
  );
};

export default AthleteFormInput;
