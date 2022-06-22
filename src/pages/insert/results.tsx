import { useEffect, useState } from "react";
import { COMBINATION_KEY } from "../../../utils/combination";
import Combination from "../../components/Combination";
import Layout from "../../components/Layout";
import { Team } from "../../interfaces";

const ResultPage = () => {
  const [teams, setCombs] = useState<Team[]>([]);

  useEffect(() => {
    const allCombinations = JSON.parse(
      sessionStorage.getItem(COMBINATION_KEY)
    ) as Team[];
    setCombs(allCombinations);
  }, []);

  const exportData = () => {
    const teamData = [];
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(teamData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  const sortPerWeightDescending = (team1: Team, team2: Team): number =>
    team2.weight - team1.weight;

  const combinations = teams
    .sort(sortPerWeightDescending)
    .map((comb, index) => {
      return <Combination team={comb} index={index} key={index} />;
    });

  return (
    <Layout title="Risultati">
      <div className="grid grid-cols-2 grid-rows-1">{combinations}</div>
    </Layout>
  );
};

export default ResultPage;
