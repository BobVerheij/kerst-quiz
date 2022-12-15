import React, { useEffect, useState } from "react";
import { Team as TeamType } from "../../types/types";

import * as ScreenStyles from "../../screens/HomeScreen.styled";

import { Button } from "../../shared/components/Button";
import { useTeamData } from "../../shared/services/useTeamData";
import { useRouter } from "next/router";
import Link from "next/link";
import { RoundForm } from "../../shared/components/RoundForm";
import { useGameInfo } from "../../shared/services/useGameInfo";

const Team = () => {
  const router = useRouter();
  const { id } = router.query;

  const [showScore, setShowScore] = useState(false);

  const { team, fetchData: refetchData } = useTeamData(id as string);

  const { gameInfo } = useGameInfo();

  const currentRound = gameInfo?.currentRound;

  useEffect(() => {
    if (!id) {
      return;
    }
    refetchData();
  }, [id]);

  const score =
    team?.scores?.reduce(
      (acc, dat) => acc + dat.correct + (dat.bonus || 0),
      0
    ) || 0;

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

          <h1>Team: {team.name?.toUpperCase()}</h1>
          <p>Current Round: {currentRound}</p>

          <RoundForm team={team} />

          <Button
            style={{ marginTop: "auto" }}
            color={team.hex}
            label={!showScore ? "SEE SCORE ( ** )" : `HIDE SCORE ( ${score} )`}
            handleClick={() => {
              setShowScore(!showScore);
            }}
          ></Button>
        </ScreenStyles.HomeScreen>
      ) : (
        <p>Failed to load team!?</p>
      )}
    </>
  );
};

export default Team;
