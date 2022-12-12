import React, { useState } from "react";
import { TeamCard } from "../shared/components/TeamCard";
import { useAllTeamData } from "../shared/services/useAllTeamData";
import * as Styled from "./HomeScreen.styled";

export const HomeScreen = () => {
  const { teams } = useAllTeamData();
  const [showScore, setShowScore] = useState(true);

  return (
    <Styled.HomeScreen bgColor="#eee" fullWidth>
      <h1>Teams</h1>
      {teams
        ?.filter((team) => team.name)
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
            key={t.id}
            index={index}
            team={t}
            showScore={showScore}
          ></TeamCard>
        ))}
    </Styled.HomeScreen>
  );
};
