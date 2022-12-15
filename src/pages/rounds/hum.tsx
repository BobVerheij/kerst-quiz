import Link from "next/link";
import React, { useState } from "react";
import { HomeScreen } from "../../screens/HomeScreen.styled";
import { Button } from "../../shared/components/Button";

const Hum = () => {
  const [currentImage, setCurrentImage] = useState(1);

  return (
    <HomeScreen fullWidth>
      <Link href={"/"}>
        <a
          style={{ textDecoration: "none", color: "black" }}
        >{`<-- back to score overview`}</a>
      </Link>
      <h1>Hum Ronde</h1>
      <Button
        label="<"
        handleClick={() =>
          setCurrentImage(currentImage > 1 ? currentImage - 1 : 5)
        }
      />
      <img
        src={`/images/image${currentImage}.svg`}
        style={{ maxWidth: "600px", width: "100%" }}
      />
      <Button
        label=">"
        handleClick={() =>
          setCurrentImage(currentImage < 5 ? currentImage + 1 : 1)
        }
      />
    </HomeScreen>
  );
};

export default Hum;
