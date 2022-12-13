import { useRouter } from "next/router";
import { useState } from "react";
import { HomeScreen } from "../../../screens/HomeScreen.styled";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";

const Addition = () => {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const handleSave = async () => {
    const url = "https://kerst-quiz-db.vercel.app/api/teams/" + (id as string);

    if (!(name && color)) {
      return;
    }

    const nameChange = { id, name, hex: color };

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
      {id ? (
        <>
          <h2>Your Team Name</h2>
          <h1>{(name || (id as string))?.toUpperCase()}</h1>
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
        </>
      ) : null}
    </HomeScreen>
  );
};

export default Addition;
