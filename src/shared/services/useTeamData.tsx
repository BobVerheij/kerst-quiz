import { useEffect, useState } from "react";
import { Team } from "../../types/types";

export const useTeamData = (id: number) => {
  const [team, setTeam] = useState<Team>();

  const URL = "http://192.168.1.57:3004/teams/" + id;

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

    fetchData();

    return () => clearInterval(intervalletje);
  }, []);

  return { team, fetchData };
};
