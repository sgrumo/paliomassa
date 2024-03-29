import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  TEAM_KEY,
  TEAM_LENGTH,
  getCombinations,
} from "../../../utils/combination";
import AthleteFormInput from "../../components/AthleteFormInput";
import Layout from "../../components/Layout";
import { Athlete } from "../../interfaces";

const EMPTY_ATHLETE: Athlete = {
  name: "",
  weight: 30,
  roles: [],
  excluded: false,
  mustBeInTheTeam: false
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
    } else if (athletes.filter(athlete => athlete.excluded === false).length < TEAM_LENGTH) {
      alert("Ma che cazzo fai, hai escluso troppi combattenti");
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

  const excludeAthlete = (index: number, excluded: boolean) => {
    const athletesCopy = [...athletes];
    athletesCopy[index].excluded = excluded;
    setAthletes(athletesCopy);
  }

  const forceAthleteInTheTeam = (index: number, force: boolean) => {
    const athletesCopy = [...athletes];
    athletesCopy[index].mustBeInTheTeam = force;
    setAthletes(athletesCopy);
  }

  const athleteInputs = athletes.map((athlete, index) => (
    <AthleteFormInput
      athlete={athlete}
      key={index}
      index={index}
      deleteAthlete={deleteAthlete}
      updateAthlete={(athlete) => updateAthlete(index, athlete)}
      excludeAthlete={(excluded) => excludeAthlete(index, excluded)}
      forceAtlheteInTheTeam={(force) => forceAthleteInTheTeam(index, force)}
    />
  ));

  return (
    <Layout title="Intro">
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-y-8 justify-center">
        <h2 className="text-2xl font-bold">LA FORMAZIONE DEL PORCO 🐗</h2>
        {athleteInputs}
        <div className="flex lg:block flex-col gap-4">
          <button
            className="bg-orange-500 p-2 rounded text-white mt-8"
            type="button"
            onClick={addAthlete}
          >
            Aggiungi un posto a tavola per uno grosso merz
          </button>
          <button
            className="bg-violet-500 p-2 rounded text-white lg:ml-8"
            type="submit"
          >
            Fammi vedere sta cazzo di squadra
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default IndexPage;
