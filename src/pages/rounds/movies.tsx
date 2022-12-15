import Link from "next/link";
import React, { useState } from "react";
import { HomeScreen } from "../../screens/HomeScreen.styled";
import { Button } from "../../shared/components/Button";

const Movies = () => {
  const [currentImage, setCurrentImage] = useState(1);

  return (
    <HomeScreen fullWidth>
      <Link href={"/"}>
        <a
          style={{ textDecoration: "none", color: "black" }}
        >{`<-- back to score overview`}</a>
      </Link>
      <h1>Movies & TV Round</h1>
      <h3>{currentImage}</h3>
      <Button
        label="<"
        handleClick={() =>
          setCurrentImage(currentImage > 1 ? currentImage - 1 : 10)
        }
      />
      <img
        src={`/images/movies/image${currentImage}.jpg`}
        style={{ maxWidth: "600px", width: "100%" }}
      />
      <Button
        label=">"
        handleClick={() =>
          setCurrentImage(currentImage < 10 ? currentImage + 1 : 1)
        }
      />
    </HomeScreen>
  );
};

export default Movies;
