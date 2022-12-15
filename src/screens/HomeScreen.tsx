import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Button } from "../shared/components/Button";
import { TeamCard } from "../shared/components/TeamCard";
import { useAllTeamData } from "../shared/services/useAllTeamData";
import { useGameInfo } from "../shared/services/useGameInfo";
import * as Styled from "./HomeScreen.styled";

const FirePlace = dynamic(() => import("../shared/animations/FirePlace"), {
  ssr: false,
});

export const HomeScreen = () => {
  const { teams } = useAllTeamData();

  const { gameInfo } = useGameInfo();

  const windowSize = useWindowSize();

  const [showScore, setShowScore] = useState(false);

  const currentRound = gameInfo?.currentRound || 0;

  const countdown = Math.floor(
    (new Date("Dec 16, 2022 18:00:00").getTime() - new Date().getTime()) / 1000
  );
  // const countdown = Math.floor(
  //   (new Date("Dec 16, 2022 18:00:00").getTime() - new Date().getTime()) / 1000
  // );

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor(countdown / 60) % (24 * 60);

  return (
    <Styled.HomeScreen bgColor="blanchedalmond" fullWidth>
      <h1>{teams ? "Teams" : "No Connection"}</h1>
      <h2>{currentRound ? `Round ${currentRound}` : "Game starts in..."}</h2>
      {countdown > 0 ? (
        countdown < 1000 ? (
          <h1>{countdown}</h1>
        ) : (
          <h3>{`${hours}:${minutes}`}</h3>
        )
      ) : null}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          height: teams?.length * 72 || 0,
        }}
      >
        {teams
          ?.sort((a, b) => (a.name || a.id)?.localeCompare(b.name || b.id))
          ?.sort(
            (a, b) =>
              (b.scores?.reduce(
                (acc, dat) => dat.correct + (dat.bonus || 0) + acc,
                0
              ) || 0) -
              (a.scores?.reduce(
                (acc, dat) => dat.correct + (dat.bonus || 0) + acc,
                0
              ) || 0)
          )
          .map((t, index) => (
            <TeamCard
              pos={index * 72}
              key={t.id}
              index={index}
              team={t}
              showScore={showScore}
            ></TeamCard>
          ))}
      </div>
      {/* <Button
        label="show scores"
        handleClick={() => setShowScore(!showScore)}
      ></Button> */}

      <FirePlace
        style={{
          position: "fixed",
          bottom: 0,
          transform: "translateY(6px)",
          pointerEvents: "none",
        }}
        w={windowSize?.width < 800 ? window.innerWidth : 800}
      />
    </Styled.HomeScreen>
  );
};

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
