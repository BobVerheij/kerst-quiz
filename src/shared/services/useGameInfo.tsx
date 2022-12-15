import { useEffect, useState } from "react";

type GameInfo = {
  currentRound?: number;
  showScore?: boolean;
  sortScore?: boolean;
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
    }, 1000);

    fetchData();

    return () => clearInterval(intervalletje);
  }, []);

  return { gameInfo, fetchData };
};
