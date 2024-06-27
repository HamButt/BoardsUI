import "@/styles/globals.css";
import { Poppins } from 'next/font/google';
import React from "react";
import AOS from "aos";
import '../node_modules/aos/dist/aos.css';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

const poppins = Poppins({ 
weight: '500',
subsets: ['latin'],
display: 'swap' 
});

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    AOS.init({});
    VANTA.FOG({
      el :".create-post-div",
      mouseControls: true,
      touchControls: true, 
      gyroControls: false,  
      minHeight: 200.00, minWidth: 200.00, highlightColor: 0xbea572, midtoneColor: 0xe1ff, 
      lowlightColor: 0x1c1425, baseColor: 0x340a0a, blurFactor: 0.57, THREE: THREE,})
  }, []);

  return(
    <main style={{fontFamily:"Bricolage Grotesque"}}>
      <Component {...pageProps} />
    </main>
  )
}
