import React from "react";
import styled from "styled-components";
import { Team } from "../../types/types";

const Wrapper = styled.div<{ bgColor?: string }>`
  width: 100%;
  max-width: 400px;
  min-height: 4rem;
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  border: 0.25rem solid black;
  padding: 0.5rem;
  display: flex;

  position: relative;
`;

const Fill = styled.div<{ percentage?: string }>`
  position: absolute;
  background-color: red;
  width: ${({ percentage }) => percentage || "0%"};
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.5;
  mix-blend-mode: multiply;
`;

export const TeamCard = ({
  index,
  team,
  showScore,
}: {
  index?: number;
  team: Team;
  showScore?: boolean;
}) => {
  const totalScore = team?.scores?.reduce(
    (acc, dat) => acc + dat.correct + (dat.bonus || 0),
    0
  );
  return (
    <Wrapper bgColor={team?.hex}>
      <h2>
        {index + 1}. {team.name.toUpperCase() || team.id}
      </h2>
      {showScore ? (
        <Fill percentage={`${(totalScore / 70) * 100}%`}></Fill>
      ) : null}
    </Wrapper>
  );
};
