import React, { useEffect, useState } from "react";
import Head from "next/head";

import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/global";
import dynamic from "next/dynamic";

const FirePlace = dynamic(() => import("../shared/animations/FirePlace"), {
  ssr: false,
});

const KerstQuiz = ({ Component, pageProps }: AppProps) => {
  const windowSize = useWindowSize();

  return (
    <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
      <Head>
        <title>Hum Kerst</title>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
      <FirePlace
        style={{
          position: "fixed",
          bottom: 0,
          transform: "translateY(6px)",
          pointerEvents: "none",
        }}
        w={windowSize?.width < 800 ? window.innerWidth : 800}
      />
    </div>
  );
};

export default KerstQuiz;

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
