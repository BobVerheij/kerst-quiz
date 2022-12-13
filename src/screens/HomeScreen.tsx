import React, { useState } from "react";
import { Button } from "../shared/components/Button";
import { TeamCard } from "../shared/components/TeamCard";
import { useAllTeamData } from "../shared/services/useAllTeamData";
import * as Styled from "./HomeScreen.styled";

export const HomeScreen = () => {
  const { teams } = useAllTeamData();
  const [showScore, setShowScore] = useState(false);

  return (
    <Styled.HomeScreen bgColor="#eee" fullWidth>
      <h1>Teams</h1>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          height: teams?.length * 72,
        }}
      >
        {teams
          ?.sort(
            (a, b) =>
              b.scores?.reduce(
                (acc, dat) => dat.correct + (dat.bonus || 0) + acc,
                0
              ) -
              a.scores?.reduce(
                (acc, dat) => dat.correct + (dat.bonus || 0) + acc,
                0
              )
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
      <Button
        label="show scores"
        handleClick={() => setShowScore(!showScore)}
      ></Button>
    </Styled.HomeScreen>
  );
};
