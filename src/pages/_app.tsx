import React, { useEffect, useState } from "react";
import Head from "next/head";

import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/global";

const KerstQuiz = ({ Component, pageProps }: AppProps) => {
  return (
    <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
      <Head>
        <title>Hum Kerst</title>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </div>
  );
};

export default KerstQuiz;
