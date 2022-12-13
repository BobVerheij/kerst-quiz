import { useEffect, useState } from "react";
import { Team } from "../../types/types";

export const useTeamData = (id: string) => {
  const [team, setTeam] = useState<Team>();

  const URL = "https://kerst-quiz-db.vercel.app/api/teams/" + id;

  const fetchData = async () => {
    try {
      const res = await fetch(URL);
      const json = await res.json();

      setTeam(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalletje = setInterval(() => {
      fetchData();
    }, 60000);

    console.log(id);
    fetchData();

    return () => clearInterval(intervalletje);
  }, []);

  return { team, fetchData };
};
