import React, { useEffect, useState } from "react";
import { Team } from "../../types/types";
import { useGameInfo } from "../services/useGameInfo";
import { Button } from "./Button";
import { Input } from "./Input";
import { Paper } from "./Paper";
import { ShredFilter } from "./ShredFilter";

interface IRoundForm {
  team: Team;
}

export const RoundForm = ({ team }: IRoundForm) => {
  const [answers, setAnswers] = useState<string[]>([]);

  const [hasShredded, setHasShredded] = useState(false);

  useEffect(() => {
    if (team?.scores?.some((s) => s.shredded)) {
      setHasShredded(true);
    }
  }, [team]);

  const { gameInfo } = useGameInfo();

  const roundScores = team.scores?.find(
    (s) => s.round === gameInfo?.currentRound
  );

  const roundOver = roundScores?.correct > 0 || roundScores?.bonus > 0;

  const handleShred = async () => {
    const url = "https://tunnel.humanoids.nl/teams/" + team?.id;

    const currentTeam: Team = await (await fetch(url)).json();

    const scoresUpdated = roundScores
      ? [...(currentTeam?.scores || [])].map((s) => {
          if (s.round === gameInfo.currentRound) {
            return {
              ...s,
              correct: 10,
              shredded: true,
              round: gameInfo.currentRound,
            };
          }
          return s;
        })
      : [
          ...(currentTeam?.scores || []),
          {
            correct: 10,
            bonus: 0,
            shredded: true,
            round: gameInfo.currentRound,
          },
        ];

    const update: Team = {
      ...currentTeam,
      scores: scoresUpdated,
    };

    if (currentTeam?.id) {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json	",
        },
        body: JSON.stringify(update),
      });
      const json = await res.json();
      if (json) {
        setHasShredded(true);
      }
    }
  };

  return (
    <>
      {roundOver ? (
        <h3>Answers recorded for Round {gameInfo?.currentRound}</h3>
      ) : null}
      {gameInfo?.currentRound && !roundOver ? (
        <form
          id="search-hack"
          style={{
            width: "100%",
            maxWidth: "400px",
            position: "relative",
            display: "flex",
            gap: "0.5rem",
            flexFlow: "column",
            alignItems: "center",
          }}
        >
          {gameInfo?.currentRound ? (
            <h1>Round {gameInfo?.currentRound}</h1>
          ) : null}
          {new Array(10).fill("").map((_, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "3rem 1fr",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <h4>{index + 1}</h4>
              <Input
                color={team.hex}
                type="text"
                handleChange={() => {}}
              ></Input>
            </div>
          ))}
          <Paper shredded={hasShredded} color={team.hex}></Paper>
          <Button
            style={{
              marginTop: hasShredded ? "-150px" : "-40px",
              transition: "margin-top 2s ease-out",
            }}
            color={team.hex}
            label={
              !hasShredded
                ? `SHRED ROUND ${gameInfo?.currentRound}?`
                : "CAN'T UNSHRED!"
            }
            handleClick={async () => {
              if (!hasShredded) {
                await handleShred();
              }
            }}
          >
            <ShredFilter color={team.hex} />
          </Button>
        </form>
      ) : null}
    </>
  );
};
