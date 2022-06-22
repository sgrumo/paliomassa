import { useEffect, useState } from "react";
import { COMBINATION_KEY, TEAM_KEY } from "../../../utils/combination";
import Combination from "../../components/Combination";
import Layout from "../../components/Layout";
import { Athlete, Team } from "../../interfaces";

const ResultPage = () => {
  const [combs, setCombs] = useState<Team[]>([]);
  const [team, setTeam] = useState<Athlete[]>([]);

  useEffect(() => {
    const allCombinations = JSON.parse(
      sessionStorage.getItem(COMBINATION_KEY)
    ) as Team[];

    setCombs(allCombinations);

    const athletes = JSON.parse(sessionStorage.getItem(TEAM_KEY)) as Athlete[];
    setTeam(athletes);
  }, []);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(team)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "team.json";

    link.click();
  };

  const sortPerWeightDescending = (team1: Team, team2: Team): number =>
    team2.weight - team1.weight;

  const combinations = combs
    .sort(sortPerWeightDescending)
    .map((comb, index) => {
      return <Combination team={comb} index={index} key={index} />;
    });

  return (
    <Layout title="Risultati">
      <button
        className="bg-violet-500 p-4 rounded text-white mx-auto my-0 block"
        type="button"
        onClick={() => exportData()}
      >
        Scarica il file la squadra della morte
      </button>
      <div className="grid grid-cols-2">{combinations}</div>
    </Layout>
  );
};

export default ResultPage;
