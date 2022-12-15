import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Team } from "../../types/types";
import { useGameInfo } from "../services/useGameInfo";
import { Button } from "./Button";
import { Input } from "./Input";
import { Paper } from "./Paper";
import { ShredFilter } from "./ShredFilter";
import { createPortal } from "react-dom";

interface IRoundForm {
  team: Team;
}

export const RoundForm = ({ team }: IRoundForm) => {
  const [answers, setAnswers] = useState<string[]>(new Array(10).fill(""));

  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [shredModalVisible, setShredModalVisible] = useState(false);

  const [hasShredded, setHasShredded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (team?.scores?.some((s) => s.shredded)) {
      setHasShredded(true);
    }
  }, [team]);

  const handleSubmit = (handler: () => void) => {};

  const { gameInfo } = useGameInfo();

  const roundScores = team.scores?.find(
    (s) => s.round === gameInfo?.currentRound
  );

  const roundOver = roundScores?.answers || roundScores?.shredded;

  const url = "https://tunnel.humanoids.nl/teams/" + team.id;

  const handleSaveAnswers = async () => {
    const updatedTeam: Team = {
      ...team,
      scores: [
        ...(team.scores || []),
        {
          round: gameInfo?.currentRound,
          answers,
          correct: 0,
          bonus: 0,
        },
      ],
    };

    if (team?.id) {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json	",
        },
        body: JSON.stringify(updatedTeam),
      });
      const json = await res.json();

      if (json.id) {
        router.reload();
      }
    }
  };

  const handleShred = async () => {
    const updatedTeam: Team = {
      ...team,
      scores: [
        ...(team.scores || []),
        {
          round: gameInfo?.currentRound,
          shredded: true,
          correct: 10,
          bonus: 0,
        },
      ],
    };

    if (team?.id) {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json	",
        },
        body: JSON.stringify(updatedTeam),
      });
      const json = await res.json();
      if (json) {
        setHasShredded(true);
      }
      setTimeout(() => {
        router.reload();
      }, 2000);
    }
  };

  return (
    <>
      {submitModalVisible || shredModalVisible ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: team.hex,
              width: "100%",
              maxWidth: "600px",
              display: "flex",
              flexFlow: "column",
              justifyContent: "center",
              padding: "2rem 2rem",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <h3>Are you sure?</h3>
            <h4>
              By clicking submit you are making your submission for Round{" "}
              {gameInfo?.currentRound} final!
            </h4>
            <Button
              label={"SUBMIT"}
              handleClick={async () => {
                setShredModalVisible(false);
                setSubmitModalVisible(false);
                if (shredModalVisible) return await handleShred();
                if (submitModalVisible) return await handleSaveAnswers();
                return null;
              }}
            />
            <Button
              label={"NAH, LET'S CANCEL"}
              handleClick={() => {
                setShredModalVisible(false);
                setSubmitModalVisible(false);
              }}
            />
          </div>
        </div>
      ) : null}
      {roundOver ? (
        <>
          <h2>Answers recorded for Round {gameInfo?.currentRound}</h2>
          <h3>
            {`If you shredded this round, your score has updated. Otherwise, wait for the quiz-master to count your score!`}
          </h3>
        </>
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
                value={answers[index]}
                color={team.hex}
                type="text"
                handleChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
              ></Input>
            </div>
          ))}
          <Button
            color={team.hex}
            label="Save answers"
            handleClick={() => {
              setSubmitModalVisible(true);
            }}
          />

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
                setShredModalVisible(true);
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
