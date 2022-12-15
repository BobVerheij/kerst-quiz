import { useEffect, useState } from "react";
import { Team } from "../../types/types";

export const useTeamData = (id: string) => {
  const [team, setTeam] = useState<Team>();

  const URL = "https://tunnel.humanoids.nl/teams/" + id;

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
    if (!id) {
      return;
    }

    const intervalletje = setInterval(() => {
      fetchData();
    }, 10000);

    fetchData();

    return () => clearInterval(intervalletje);
  }, [id]);

  return { team, fetchData };
};
