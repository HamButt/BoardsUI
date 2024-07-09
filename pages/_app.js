import "@/styles/globals.css";
import { Poppins } from 'next/font/google';
import React from "react";
import AOS from "aos";
import '../node_modules/aos/dist/aos.css';
// import VANTA from 'v'
import Script from 'next/script'; 

const poppins = Poppins({ 
weight: '500',
subsets: ['latin'],
display: 'swap' 
});

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    AOS.init({});
    // VANTA.FOG({
    //   el :".create-post-div",
    //   mouseControls: true,
    //   touchControls: true, 
    //   gyroControls: false,  
    //   minHeight: 200.00, minWidth: 200.00, highlightColor: 0xbea572, midtoneColor: 0xe1ff, 
    //   lowlightColor: 0x1c1425, baseColor: 0x340a0a, blurFactor: 0.57})
  }, []);

  return(
    <main className={poppins.className}>
       <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js" async strategy="lazyOnload"/>
      <Component {...pageProps} />
    </main>
)
}
