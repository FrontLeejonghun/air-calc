import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <title>공기소모량 계산기</title>

      <Head>
        <meta charSet="utf-8" />
        <meta lang="ko" />
        <meta
          content="no-cache, no-store, must-revalidate"
          httpEquiv="Cache-control"
        />
        <meta content="no-cache" httpEquiv="Pragma" />
        <meta content="0" httpEquiv="expires" />
      </Head>
      <body>
        <Main />
        <NextScript />

        <div id="portal-wrap" />
      </body>
    </Html>
  );
}
