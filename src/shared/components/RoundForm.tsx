import React, { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Paper } from "./Paper";
import { ShredFilter } from "./ShredFilter";

export const RoundForm = ({ team, round, hasShredded, handleShred }) => {
  const [answers, setAnswers] = useState<string[]>([]);

  return (
    <form
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
      {new Array(10).fill("").map((_, index) => (
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "3rem 1fr",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <h4>{index + 1}</h4>
          <Input type="text" handleChange={() => {}}></Input>
        </div>
      ))}
      <Paper shredded={hasShredded} color={team.hex}></Paper>
      <Button
        style={{
          marginTop: hasShredded ? "-150px" : "-40px",
          transition: "margin-top 2s ease-out",
        }}
        color={team.hex}
        label={!hasShredded ? `SHRED ROUND ${round}?` : "CAN'T UNSHRED!"}
        handleClick={async () => {
          if (!hasShredded) {
            await handleShred();
          }
        }}
      >
        <ShredFilter color={team.hex} />
      </Button>
    </form>
  );
};
