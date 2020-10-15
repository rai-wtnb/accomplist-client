import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

type Props = {};

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Sawarabi+Gothic&display=swap"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
