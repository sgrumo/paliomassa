import { useRouter } from "next/router";
import { TEAM_KEY } from "../../utils/combination";
import Layout from "../components/Layout";

const IndexPage = () => {
  const router = useRouter();

  const handleTeamFile = (e: File) => {
    console.log(e);
    const fileReader = new FileReader();
    fileReader.readAsText(e, "UTF-8");
    fileReader.onload = (e) => {
      const athletes = JSON.parse(e.target.result.toString());
      sessionStorage.setItem(TEAM_KEY, JSON.stringify(athletes));
      router.push("/insert");
    };
  };
  return (
    <Layout title="Intro">
      <h1>Ciao amici del Palio 👋</h1>
      <label>
        Carica un team:
        <input
          type="file"
          accept=".json"
          onChange={(e) => handleTeamFile(e.target.files[0])}
        />
      </label>
      <button
        onClick={() => {
          sessionStorage.clear();
          router.push("/insert");
        }}
        type="button"
      >
        Crea nuova lista
      </button>
    </Layout>
  );
};

export default IndexPage;
