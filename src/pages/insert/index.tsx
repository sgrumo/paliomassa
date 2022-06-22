import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getCombinations,
  TEAM_KEY,
  TEAM_LENGTH,
} from "../../../utils/combination";
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
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!athletes.every((athlete) => athlete.roles.length > 0)) {
      alert("Ma che cazzo fai, dai almeno un ruolo a tutti");
    } else if (athletes.length < TEAM_LENGTH) {
      alert("Ma che cazzo fai, metti almeno 6 combattenti");
    } else {
      getCombinations(athletes);
      router.push("/insert/results");
    }
  };

  const addAthlete = () => {
    setAthletes((oldArray) => [...oldArray, EMPTY_ATHLETE]);
  };

  useEffect(() => {
    const team = sessionStorage.getItem(TEAM_KEY);
    if (team !== null) {
      const jsonTeam = JSON.parse(team);
      setAthletes(jsonTeam);
    } else {
      addAthlete();
    }
  }, []);

  const deleteAthlete = (index: number) => {
    const athletesCopy = [...athletes];
    athletesCopy.splice(index, 1);
    setAthletes(athletesCopy);
  };

  const updateAthlete = (index: number, athlete: Athlete) => {
    const athletesCopy = [...athletes];
    athletesCopy[index] = athlete;
    setAthletes(athletesCopy);
  };

  const athleteInputs = athletes.map((athlete, index) => (
    <AthleteFormInput
      athlete={athlete}
      key={index}
      index={index}
      deleteAthlete={deleteAthlete}
      updateAthlete={(athlete) => updateAthlete(index, athlete)}
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
