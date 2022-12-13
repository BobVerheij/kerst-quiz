import { useRouter } from "next/router";
import { useState } from "react";
import { HomeScreen } from "../../../screens/HomeScreen.styled";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import { Team as TeamType } from "../../../types/types";

const Addition = ({ ...props }) => {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const router = useRouter();

  const handleSave = async () => {
    const url = "https://kerst-quiz-db.vercel.app/api/teams/" + props?.id;

    if (!(name && color)) {
      return;
    }

    const nameChange = { id: props?.id, name, hex: color };

    console.log(nameChange);

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json	",
      },
      body: JSON.stringify(nameChange),
    });

    router.push("/");
  };

  return (
    <HomeScreen bgColor={color}>
      <h2>Your Team Name</h2>
      <h1>{(name || props?.id).toUpperCase()}</h1>
      <div
        style={{
          display: "flex",
          gap: ".5rem",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "0.5rem",
        }}
      >
        <Input
          type="text"
          placeholder="ENTER TEAM NAME"
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value.toLowerCase());
          }}
        />
        <Input
          type="color"
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setColor(e.target.value.toLowerCase());
          }}
        />
      </div>
      <Button label="SAVE NAME & COLOR" handleClick={handleSave}></Button>
    </HomeScreen>
  );
};

export const getStaticPaths = async () => {
  const url = "https://kerst-quiz-db.vercel.app/api/teams/";
  const res = await fetch(url);

  const teams: TeamType[] = await res.json();

  console.log(teams);

  const paths = teams.map((team) => {
    return {
      params: {
        id: team.id.toString(),
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  console.log(params);

  const id = params?.id;

  console.log(id);

  return {
    props: {
      id,
    }, // will be passed to the page component as props
  };
};

export default Addition;
