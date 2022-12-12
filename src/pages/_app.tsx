import React from "react";
import Head from "next/head";

import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import { GlobalStyle } from "../styles/global";

const KerstQuiz = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Hum Kerst</title>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default KerstQuiz;
