'use client'
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import PreviewBoard from "@/components/PreviewBoard";
import PreviewRetirementGif from '../preview-assets/retirement.gif'
import PreviewThankyouGif from '../preview-assets/thankyou.gif'
import PreviewGraduationGif from '../preview-assets/congrats.gif'
import PreviewBirthdayGif from '../preview-assets/birthdaygif.gif'
import PreviewFarewellGif from '../preview-assets/farewell.gif'
import PreviewNewYearGif from '../preview-assets/newyear.gif'
import { FiExternalLink } from "react-icons/fi";
import Logo from '../public/logo.png'
import {motion} from 'framer-motion'


export default function Home() {
  const categories = ['Happy Birthday!', 'Anniversary!', 'Congratulations!', 'Graduation!', 'Thank You!', 'New Year!'];
  const [currentCategoryIndex, setCurrentCategoryIndex] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState('');
  const [isErasing, setIsErasing] = React.useState(false);
  const [preview,setPreview] = React.useState(false);
  const [occasion,setOccasion] = React.useState('');


  React.useEffect(() => {
    let timeoutId;

    if (!isErasing) {
      // Writing mode
      if (displayedText.length < categories[currentCategoryIndex].length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(categories[currentCategoryIndex].substring(0, displayedText.length + 1));
        }, 100); // Speed of writing each letter
      } else {
        timeoutId = setTimeout(() => {
          setIsErasing(true);
        }, 1000); // Delay before starting to erase
      }
    } else {
      // Erasing mode
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(categories[currentCategoryIndex].substring(0, displayedText.length - 1));
        }, 100); // Speed of erasing each letter
      } else {
        setIsErasing(false);
        setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isErasing, currentCategoryIndex]);
  
  return (
    <>
    
      {preview ? <PreviewBoard setPreview={setPreview} occasion={occasion}/> : 

      <div className="absolute w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">

        <Head>
          <title>Home</title>
        </Head>

        <Header/>
        
        <div className="main mt-10">
          <div className="max-w-3xl mx-auto mt-6 flex flex-col items-center text-center justify-center">
            {/* <p className="text-4xl">Create group memories with personalized recognition cards and leave a lasting impression!</p> */}
            <p className="text-4xl font-bold">Celebrate your team members and people you admire</p>
            {/* <p className="text-2xl mt-5">Personalized praise boards with every occasion <span className="text-lg font-semibold">{displayedText}</span> </p> */}
            <p className="text-2xl mt-5">Beautiful, collaborative personalized online boards to celebrate your team and friends <span className="text-lg font-semibold">{displayedText}</span> </p>
            <p className="text-4xl">Create group memories with personalized recognition cards and leave a lasting impression!</p>
            <p className="text-2xl mt-5">Personalized praise boards with every occasion <span className="text-lg font-semibold">{displayedText}</span> </p>
            <Link rel="stylesheet" className="mt-6 btn btn-lg text-xl font-light border hover:shadow-xl border-black rounded-2xl hover:bg-white bg-white" 
              href="/boards/create" >Create Board - it's free
              <span className="animate-pulse"><FaArrowRight /></span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col mt-16 py-16 bg-gray-100">
            <h1 className="text-black text-4xl"> Checkout our previews</h1>
            <div className="flex itmes-center justify-evenly flex-wrap w-[900px] mt-10">

              <dialog id="retirement_modal" className="modal bg-white absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" >
                    <p className="text-3xl text-black" >Preview retirement cards</p>
                    <Image src={PreviewRetirementGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                      <form method="dialog">
                        <motion.button whileTap={{scale:0.9}} className="border-none outline-none text-2xl text-black font-light absolute top-10 right-10">X</motion.button>
                      </form>
                    <motion.button whileTap={{scale:0.9}} className="btn bg-transparent w-52 border border-black outline-none rounded-lg text-black text-xl font-semibold hover:bg-transparent hover:shadow-xl hover:border-gray " onClick={() => {setPreview(true); setOccasion('retirement')}}>Preview <FiExternalLink /> </motion.button>
              </dialog>
              <Image data-offset='0' data-aos="fade-right"  data-aos-easing="ease-in-back" data-aos-duration="1000" onClick={()=>document.getElementById('retirement_modal').showModal()} src={PreviewRetirementGif} sizes='(max-width: 200px) 100vw, 33vw'  alt="RetirementImage" width={0} height={0} className="img rounded-box hover:scale-75"/>
                
              <dialog id="thankyou_modal" className="modal bg-white absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
                  <p className="text-2xl text-white" >Preview thankyou cards</p>
                  <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewThankyouGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <form method="dialog">
                      <button className="border-none outline-none text-2xl text-black font-light absolute top-10 right-10" whileTap={{scale:0.9}}>X</button>
                    </form>
                  <motion.button whileTap={{scale:0.9}} className="btn bg-transparent w-52 border border-black outline-none rounded-lg text-black text-xl font-semibold hover:bg-transparent hover:shadow-xl hover:border-gray" onClick={() => {setPreview(true); setOccasion('thankyou')}}>Preview<FiExternalLink /></motion.button>
              </dialog>
              <Image data-offset='0' data-aos="fade-down"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewThankyouGif} onClick={()=>document.getElementById('thankyou_modal').showModal()}  sizes='(max-width: 200px) 100vw, 33vw' alt="PreviewThankyouGif"  width={0} height={0} className="img rounded-box"/>
                
              <dialog id="graduation_modal" className="modal bg-white absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
                  <p className="text-2xl text-white" >Preview graduation cards</p>
                  <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewGraduationGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <form method="dialog">
                      <button className="border-none outline-none text-2xl text-black font-light absolute top-10 right-10" whileTap={{scale:0.9}}>X</button>
                    </form>
                  <motion.button whileTap={{scale:0.9}} className="btn bg-transparent w-52 border border-black outline-none rounded-lg text-black text-xl font-semibold hover:bg-transparent hover:shadow-xl hover:border-gray " onClick={() => {setPreview(true); setOccasion('graduation')}}>Preview<FiExternalLink /></motion.button>
              </dialog>
              <Image data-offset='0' data-aos="fade-left"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewGraduationGif} onClick={()=>document.getElementById('graduation_modal').showModal()}   sizes='(max-width: 200px) 100vw, 33vw' alt="PreviewGraduationGif" width={0} height={0} className="img rounded-box"/>
              
              <dialog id="birthday_modal" className="modal bg-white absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
                  <p className="text-2xl text-white" >Preview birthday cards</p>
                  <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewBirthdayGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <form method="dialog">
                      <button className="border-none outline-none text-2xl text-black font-light absolute top-10 right-10" whileTap={{scale:0.9}}>X</button>
                    </form>
                  <motion.button whileTap={{scale:0.9}} className="btn bg-transparent w-52 border border-black outline-none rounded-lg text-black text-xl font-semibold hover:bg-transparent hover:shadow-xl hover:border-gray " onClick={() => {setPreview(true); setOccasion('birthday')}}>Preview<FiExternalLink /></motion.button>
               </dialog>
              <Image data-offset='0' data-aos="fade-right"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewBirthdayGif} onClick={()=>document.getElementById('birthday_modal').showModal()}  sizes='(max-width: 200px) 100vw, 33vw' alt="PreviewBirthdayGif" width={0} height={0} className="img rounded-box"/>
              
              <dialog id="farewell_modal" className="modal bg-white absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
                  <p className="text-2xl text-white" >Preview farewell cards</p>
                  <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewFarewellGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <form method="dialog">
                      <button className="border-none outline-none text-2xl text-black font-light absolute top-10 right-10" whileTap={{scale:0.9}}>X</button>
                    </form>
                  <motion.button whileTap={{scale:0.9}} className="btn bg-transparent w-52 border border-black outline-none rounded-lg text-black text-xl font-semibold hover:bg-transparent hover:shadow-xl hover:border-gray " onClick={() => {setPreview(true); setOccasion('farewell')}}>Preview<FiExternalLink /></motion.button>
               </dialog>

              <Image data-offset='0' data-aos="fade-up"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewFarewellGif} onClick={()=>document.getElementById('farewell_modal').showModal()}  sizes='(max-width: 200px) 100vw, 33vw' alt="PreviewFarewellGif" width={0} height={0} className="img rounded-box"/>

               <dialog id="new_year_modal" className="modal bg-white absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
                  <p className="text-2xl text-white" >Preview new year cards</p>
                  <Image data-offset='0' data-aos="fade" data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewNewYearGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <form method="dialog">
                      <button className="border-none outline-none text-2xl text-black font-light absolute top-10 right-10" whileTap={{scale:0.9}}>X</button>
                    </form>
                  <motion.button whileTap={{scale:0.9}} className="btn bg-transparent w-52 border border-black outline-none rounded-lg text-black text-xl font-semibold hover:bg-transparent hover:shadow-xl hover:border-gray " onClick={() => {setPreview(true); setOccasion('new year')}}>Preview<FiExternalLink /></motion.button>
              </dialog>
              <Image data-offset='0' data-aos="fade-left"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewNewYearGif} onClick={()=>document.getElementById('new_year_modal').showModal()}  sizes='(max-width: 200px) 100vw, 33vw' alt="PreviewNewYearGif" width={0} height={0} className="img rounded-box"/>
            </div>
        
        </div>

        <div id="how-to" className=" how-it-works my-10 text-center ">
          <h1 className="text-5xl my-4">How to create board</h1>
          <div className="process flex items-start justify-evenly flex-wrap">
            <div className="one px-5 pb-5">
              <Image sizes='(max-width: 200px) 100vw, 33vw' src='https://static.123cards.com/images/how-it-works-img1.svg' alt="Category selection" width={200} height={100} />
              <h1 className="text-3xl">Create</h1>
              <p className="step">Select any occasion</p>
              <p className="step-process">Birthday, anniversary or any other occasion. Select the category and style in minutes</p>
            </div>
            <div className="two px-5 pb-5">
              <Image sizes='(max-width: 200px) 100vw, 33vw' src='https://static.123cards.com/images/how-it-works-img2.svg' alt="Schedule" width={200} height={100}  />
              <p  className="text-3xl">Invite</p>
              <p className="step">Invite people</p>
              <p className="step-process" >Fill out your details, add recipients & write a personal message and create board</p>
            </div>
            <div className="three px-5 pb-5">
              <Image sizes='(max-width: 200px) 100vw, 33vw' src='https://static.123cards.com/images/how-it-works-img3.svg'  alt="Send" width={200} height={100}  />
              <p  className="text-3xl">Deliver</p>
              <p className="step">Create posts and deliver to recipient </p>
              <p className="step">Create cards and deliver to recipient </p>
              <p className="step-process">Copy the link of board and share your card with them </p>
            </div>
      </div>
        </div> 

        <footer>
          <div className="footer py-10 flex items-start bg-white justify-evenly ">
            <div className="pages ">
            <h1 className="text-2xl">  Pages</h1>
            <div className=" flex flex-col">
              <Link className="text-lg" href='/boards/create'>» Create Board</Link>
              <Link className="text-lg" href='how-to' >» How to create board</Link>
            </div>
          </div>
             <Image src={Logo} width={60} height={60} alt="Logo"/>
            </div>
        </footer>
       
      </div>

    }
    </>
  );
}
