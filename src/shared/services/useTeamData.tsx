import { useEffect, useState } from "react";
import { Team } from "../../types/types";

export const useTeamData = (id: string) => {
  const [team, setTeam] = useState<Team>();

  const URL = "https://tunnel.humanoids.nl/teams/";

  const fetchData = async () => {
    try {
      const res = await fetch(URL);
      const json = await res.json();

      const team = json?.find((team) => team.id === id || team.name === id);

      setTeam(team);
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
