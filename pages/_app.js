import "@/styles/globals.css";
import { Poppins } from 'next/font/google';
import React from "react";
import AOS from "aos";
import '../node_modules/aos/dist/aos.css';

const poppins = Poppins({ 
weight: '500',
subsets: ['latin'],
display: 'swap' 
});

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    AOS.init({});
  }, []);

  return(
    <main style={{fontFamily:"Bricolage Grotesque"}} className={poppins.className}>
      <Component {...pageProps} />
    </main>
  )
}
