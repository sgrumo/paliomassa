import React, { useEffect, useState } from "react";
import AthleteFormInput from "../../components/AthleteFormInput";
import Layout from "../../components/Layout";
import { Athlete } from "../../interfaces";

const EMPTY_ATHLETE: Athlete = {
  name: "",
  weight: undefined,
  roles: [],
};
const IndexPage = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  const onSubmit = (data) => {
    if (!athletes.every((athlete) => athlete.roles.length > 0)) {
      alert("Che cazzo fai, dai un ruolo a tutti ");
    }
  };

  const addAthlete = () => {
    setAthletes([...athletes, EMPTY_ATHLETE]);
  };

  useEffect(() => {
    addAthlete();
  }, []);

  const deleteAthlete = (index: number) => {
    const athletesCopy = [...athletes];
    athletesCopy.splice(index, 1);
    setAthletes(athletesCopy);
  };

  const athleteInputs = athletes.map((athlete, index) => (
    <AthleteFormInput
      athlete={athlete}
      key={index}
      index={index}
      deleteAthlete={deleteAthlete}
    />
  ));

  return (
    <Layout title="Intro">
      <h1>Ciao amici del Palio 👋</h1>
      <form onSubmit={onSubmit}>
        {athleteInputs}
        <button
          className="bg-orange-500 p-2 rounded text-white"
          type="button"
          onClick={addAthlete}
        >
          Aggiungi un posto a tavola
        </button>
        <button className="bg-violet-500 p-2 rounded text-white" type="submit">
          Fammi vedere sta cazzo di squadra
        </button>
      </form>
    </Layout>
  );
};

export default IndexPage;
