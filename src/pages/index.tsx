import { useRouter } from "next/router";
import { TEAM_KEY } from "../../utils/combination";
import Layout from "../components/Layout";

const IndexPage = () => {
  const router = useRouter();

  const handleTeamFile = (e: File) => {
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
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl mt-16 font-bold">Ciao amici del Palio 👋</h1>
        <div className="flex flex-col lg:flex-row justify-evenly w-full mt-16 ">
          <label className="flex flex-col mb-2 text-xl font-bold">
            Se hai scaricato un JSON con il team puoi caricarlo:
            <input
              className=" mt-2 block text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              accept=".json"
              onChange={(e) => handleTeamFile(e.target.files[0])}
            />
          </label>
          <button
            className="bg-violet-500 p-4 rounded text-white"
            onClick={() => {
              sessionStorage.clear();
              router.push("/insert");
            }}
            type="button"
          >
            Forma un team con nuovi combattenti
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
