import { useEffect, useState } from "react";
import { Team } from "../../types/types";

type GameInfo = {
  currentRound?: number;
};

export const useGameInfo = () => {
  const [gameInfo, setGameInfo] = useState<GameInfo>();

  const URL = "https://tunnel.humanoids.nl/gameInfo";

  const fetchData = async () => {
    try {
      const res = await fetch(URL);
      const json = await res.json();

      setGameInfo(json);
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

  return { gameInfo, fetchData };
};
