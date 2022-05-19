import React, { useState } from "react";
import { Athlete, MultiselectOption, Role } from "../interfaces";
import Multiselect from "./Multiselect";

export interface AthleteFormInputProps {
  index: number;
  athlete: Athlete;
  deleteAthlete: (index: number) => void;
}

const AthleteFormInput = ({ index, deleteAthlete }: AthleteFormInputProps) => {
  const [_, selectRoles] = useState<MultiselectOption[]>([]);

  const options = [
    { name: "Interno", value: Role.INTERNAL, checked: false },
    { name: "Mediano", value: Role.MEDIAN, checked: false },
    { name: "Esterno", value: Role.EXTERNAL, checked: false },
  ];

  const handleChangeSelected = (selected: MultiselectOption[]) => {
    selectRoles(selected);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 items-center">
      <label className="flex flex-col">
        Nome
        <input
          type="text"
          required
          className="my-2 py-2 flex border border-gray-200 bg-white rounded "
        />
      </label>
      <label className="flex flex-col">
        Peso
        <input
          type="number"
          min={30}
          max={200}
          required
          className="my-2 py-2 flex border border-gray-200 bg-white rounded "
        />
      </label>
      <label className="flex flex-col">
        Ruolo
        <Multiselect
          handleChangeSelected={handleChangeSelected}
          options={options}
        />
      </label>
      {index !== 0 && (
        <button
          onClick={() => deleteAthlete(index)}
          className="bg-red-500 py-2 rounded text-white"
          type="button"
        >
          Cancella stammerda
        </button>
      )}
    </div>
  );
};

export default AthleteFormInput;
