import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'; 

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js" async></Script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" />
        
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
