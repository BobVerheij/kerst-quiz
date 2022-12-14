import React, { useEffect, useState } from "react";
import { Team as TeamType } from "../../types/types";

import * as ScreenStyles from "../../screens/HomeScreen.styled";

import { Button } from "../../shared/components/Button";
import { Paper } from "../../shared/components/Paper";
import { ShredFilter } from "../../shared/components/ShredFilter";
import { useTeamData } from "../../shared/services/useTeamData";
import { useRouter } from "next/router";
import Link from "next/link";
import { Input } from "../../shared/components/Input";
import { RoundForm } from "../../shared/components/RoundForm";

const Team = () => {
  const router = useRouter();
  const { id } = router.query;

  const [showScore, setShowScore] = useState(false);
  const [currentRound, setCurrentRound] = useState<number | undefined>();

  const { team, fetchData: refetchData } = useTeamData(id as string);

  useEffect(() => {
    if (!id) {
      return;
    }
    refetchData();
  }, [id]);

  const lastRound =
    team?.scores?.find(
      (score) => score.correct >= 0 || score.bonus >= 0 || score.answers.length
    ).round || 0;
  const nextRound = lastRound < 7 ? lastRound + 1 : 7;

  const handleShred = async () => {
    const url = "https://tunnel.humanoids.nl/teams/" + team?.id;

    const currentTeam: TeamType = await (await fetch(url)).json();

    const scoresFilled = currentTeam?.scores?.some(
      (s) => s.round === lastRound
    );

    const scoresUpdated = scoresFilled
      ? [...(currentTeam?.scores || [])].map((s) => {
          if (s.round === lastRound) {
            return { ...s, correct: 10, shredded: true, round: nextRound };
          }
          return s;
        })
      : [
          ...(currentTeam?.scores || []),
          { round: nextRound, correct: 10, bonus: 0, shredded: true },
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

          <Link href={"/"}>
            <a
              style={{ textDecoration: "none", color: "black" }}
            >{`<-- back to score overview`}</a>
          </Link>
          <br />
          <h1>Team: {team.name?.toUpperCase()}</h1>
          <br />
          <p>Current Round: {nextRound}</p>
          <br />
          <Button
            color={team.hex}
            label={!showScore ? "SEE SCORE ( ** )" : `HIDE SCORE ( ${score} )`}
            handleClick={() => {
              setShowScore(!showScore);
            }}
          ></Button>
          <br />

          <RoundForm
            handleShred={handleShred}
            hasShredded={hasShredded}
            round={nextRound}
            team={team}
          />
        </ScreenStyles.HomeScreen>
      ) : (
        <p>Failed to load team!?</p>
      )}
    </>
  );
};

export default Team;
