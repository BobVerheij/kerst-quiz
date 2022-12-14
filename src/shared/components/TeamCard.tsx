import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { Team } from "../../types/types";

const Wrapper = styled.div<{ bgColor?: string; pos?: number }>`
  min-width: 100%;
  max-width: 400px;
  min-height: 4rem;
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  border: 0.25rem solid black;
  padding: 0.5rem;
  display: flex;
  margin-bottom: 0.5rem;
  position: absolute;

  top: 0px;

  top: ${({ pos }) => pos || 0}px;

  transition: top 2s ease;

  filter: saturate(0.66);
  cursor: pointer;

  --bg: ${({ bgColor }) => bgColor || "#fff"};
`;

const Fill = styled.div<{ percentage?: string }>`
  position: absolute;
  background-color: var(--bg);
  filter: saturate(10);
  width: ${({ percentage }) => percentage || "0%"};
  height: 1rem;
  bottom: 0;
  left: 0;
`;

export const TeamCard = ({
  index,
  team,
  showScore,
  pos,
}: {
  index?: number;
  team: Team;
  showScore?: boolean;
  pos?: number;
}) => {
  const router = useRouter();

  const totalScore = team?.scores?.reduce(
    (acc, dat) => acc + dat.correct + (dat.bonus || 0),
    0
  );
  return (
    <Wrapper
      pos={pos}
      bgColor={team?.hex}
      onClick={() => {
        if (team.name) {
          return router.push(`/teams/${team.id}`);
        }
        return router.push(`/teams/add/${team.id}`);
      }}
    >
      <h2>
        {showScore ? <span>{index + 1}. </span> : <></>}
        {team.name?.toUpperCase() || team.id}
      </h2>
      {showScore ? (
        <Fill percentage={`${(totalScore / 70) * 100}%`}></Fill>
      ) : null}
    </Wrapper>
  );
};
