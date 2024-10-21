import React, {useEffect, useState} from "react";
import Logo from '../public/styledLogo.png'
import Head from "next/head";
import Image from "next/image";

export const Card = ({SetUserFirstTime}) => {
  const [showLogo, setShowLogo] = useState(false);
  const [handleHeading, setHeading] = useState(false);
  const [isExiting, setExiting] = useState(false);

  useEffect(() => {
    setHeading(true);
    const timer = setTimeout(() => {
      setShowLogo(true);
      confetti({
        particleCount: 200,
        spread: 50,
        origin: { y: 0.7 }
      })
    }, 2000);

    setTimeout(()=>{
      setExiting(true)
      SetUserFirstTime(false)
    }, 5000)

    return () => {
      clearTimeout(timer)
    }; // Cleanup timer on unmount

  }, []);
  
  return (
    <div>
      
      <Head>
        <title>Praise board</title>
      </Head>

      <div className={`bg-white dark:bg-white h-screen w-screen flex flex-col items-center justify-center`}>

          {handleHeading && <Heading/>}
        
          <div className={`transition-opacity duration-1000 ${showLogo ? "opacity-100" : "opacity-0"}`}>
            <Image src={Logo} alt="Praise Board Logo" width={300} height={300} />
          </div>
          
        </div>
    </div>
  );
};


const Heading = () => {

  return (

    <h1 className="text-4xl font-bold mb-4 opacity-100 transition-opacity duration-1000">
      Welcome to
    </h1>
  )
}