import React, { useEffect, useState } from "react";
import { Team as TeamType } from "../../types/types";

import * as ScreenStyles from "../../screens/HomeScreen.styled";

import { Button } from "../../shared/components/Button";
import { Paper } from "../../shared/components/Paper";
import { ShredFilter } from "../../shared/components/ShredFilter";
import { useTeamData } from "../../shared/services/useTeamData";
import { useRouter } from "next/router";

const Team = () => {
  const router = useRouter();
  const { id } = router.query;

  const [showScore, setShowScore] = useState(false);

  const { team, fetchData: refetchData } = useTeamData(id as string);

  console.log(team?.name);

  const lastRound = team?.scores?.length || 1;
  const nextRound = lastRound < 7 ? lastRound + 1 : 7;

  const handleShred = async () => {
    const url = "https://kerst-quiz-db.vercel.app/api/teams/" + team?.id;

    console.log(url);

    const currentTeam: TeamType = await (await fetch(url)).json();

    console.log(currentTeam);

    const scoresFilled = currentTeam?.scores?.some(
      (s) => s.round === lastRound
    );

    const scoresUpdated = scoresFilled
      ? [...(currentTeam?.scores || [])].map((s) => {
          if (s.round === lastRound) {
            return { ...s, correct: 10, shredded: true };
          }
          return s;
        })
      : [
          ...(currentTeam?.scores || []),
          { round: lastRound, correct: 10, bonus: 0, shredded: true },
        ];

    const update: TeamType = {
      ...currentTeam,
      scores: scoresUpdated,
    };

    if (currentTeam?.id) {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json	",
        },
        body: JSON.stringify(update),
      });
    }
    refetchData();
  };

  const score =
    team?.scores?.reduce(
      (acc, dat) => acc + dat.correct + (dat.bonus || 0),
      0
    ) || 0;

  const hasShredded = team?.scores?.some((s) => s.shredded);

  return (
    <>
      {team ? (
        <ScreenStyles.HomeScreen bgColor={team.hex} fullWidth>
          <meta name="theme-color" content={team.hex} />

          <h1>Team: {team.name?.toUpperCase() || team.id}</h1>
          <br />
          <p>Current Round: {nextRound}</p>
          <br />
          <Button
            color={team.hex}
            label={!showScore ? "SEE SCORE (**)" : `HIDE SCORE (${score})`}
            handleClick={() => {
              setShowScore(!showScore);
            }}
          ></Button>
          <br />
          <Paper shredded={hasShredded} color={team.hex}></Paper>
          <Button
            style={{
              marginTop: hasShredded ? "-150px" : "-40px",
              transition: "margin-top 2s ease-out",
            }}
            color={team.hex}
            label={
              !hasShredded ? `SHRED ROUND ${lastRound}?` : "CAN'T UNSHRED!"
            }
            handleClick={async () => {
              if (!hasShredded) {
                await handleShred();
              }
            }}
          >
            <ShredFilter color={team.hex} />
          </Button>
        </ScreenStyles.HomeScreen>
      ) : (
        <p>Failed to load team!?</p>
      )}
    </>
  );
};

export default Team;
