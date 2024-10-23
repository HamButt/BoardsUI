'use client'
import Header from "../components/Header";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import PreviewBoard from "@/components/PreviewBoard";
import { FiExternalLink } from "react-icons/fi";
import Logo from '../public/logo.png'
import {PreviewBirthdayGif, PreviewThankyouGif, PreviewGraduationGif, PreviewFarewellGif, PreviewNewYearGif, PreviewRetirementGif} from '../components/LandingPageGifs'
// import { FileUploader } from "../components/Fileuploader";
import { FaPlus } from "react-icons/fa6";
import Loader from '../components/Loader';
import { TextParallaxContentExample } from "../components/OnscrollAnimator";
import ShuffleHero from '../components/ShuffleHero'
import DragCloseDrawer from '../components/DragCloseDrawer'
import {motion} from 'framer-motion'



export default function Home() {
 
  const [preview,setPreview] = React.useState(false);
  const [occasion,setOccasion] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [drawer,setDrawer] = React.useState({
    event: "",
    gif: null
  });
  const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

  const [handleNavigating, setHandleNavigating] = useState(false);
  
  const navigationToPage = () => {
    setHandleNavigating(true)
}


  return (
    <>
    
        {preview ? <PreviewBoard setPreview={setPreview} occasion={occasion} /> 
      
          : 

          <div className="hero-section">

              <Head>
                <title>Home</title>
              </Head>

              <Header/>

              
              

              <div className="main mt-14 text-black">
                <div className="main-parent">
                  <p className="main-heading" >
                    Celebrate your team members and people you admire
                  </p>
                  <p className="text-lg sm:text-2xl max-sm:font-semibold mt-5 max-sm:px-5">Beautiful personalized online boards to celebrate your team and friends </p>
                  <Link onClick={navigationToPage} rel="stylesheet" id="board-creation-link" 
                    className="main-cta" href="/boards/create">
                    {handleNavigating ? <span className="loading loading-dots loading-lg"></span>
                          : 
                          <>
                              Create Board - it's free
                              <span className="animate-pulse"><FaArrowRight /></span>
                          </>
                      }
                  </Link>
                </div>
              </div>
 
              <div className="mt-24 bg-white dark:bg-white" >
                <h1 className="how-to-heading">How to create a board</h1>
                <TextParallaxContentExample/>
              </div>          

              <div id="previews">
                  <div className="text-center max-md:px-2 max-sm:px-2">
                      <h1 className="previews-heading">Praise board for every occasion</h1>
                      <p className="previews-p">Uncover the potential of what we can design for you</p>
                  </div>
                  
                  <div className="max-w-screen-lg w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    
                    <div className="flex items-center justify-evenly flex-wrap" >

                        {isClient && previewsData.length > 0 ?
                          previewsData.map((previewPost,index) => {
                            return (
                            <div key={previewPost.id} className="image-container rounded-box">
                              <Image src={previewPost.gif} sizes='(max-width: 200px) 100vw, 33vw'  
                                alt="RetirementImage" width={0} height={0} className="img rounded-box"/>

                              <div className="overlay">
                                  <motion.button whileTap={{scale:0.9}} onClick={() => {setOpen(true); setDrawer({event: previewPost.event, gif: previewPost.gif}) }}
                                    className="overlay-button btn border outline-none rounded-lg text-lg font-semibold hover:shadow-xl" 
                                    >Preview <FiExternalLink /> </motion.button>
                              </div>
                            </div>
                            )
                          })

                        : <div className='flex items-center'>
                            <Loader color="#FF9669" size="sm" margin="2"/>
                          </div>
                      }

                    </div>
                  </div>

                  <Link rel="stylesheet" 
                    href="/boards/create" 
                    className="mt-12 btn bg-[#2a9d8f] sm:btn-lg text-md sm:text-xl font-medium text-white border hover:bg-transparent hover:text-[#2a9d8f] hover:border-[#2a9d8f]" 
                    > <FaPlus /> Create a Praise board 
                  </Link>
              
              </div>

              <div className="pt-8 bg-white dark:bg-white">
                <ShuffleHero/>
              </div>


              <DragCloseDrawer open={open} setOpen={setOpen}>
                <div className="flex flex-col items-center justify-center text-black space-y-8 bg-gray-800 mt-4">
                    <p className="sm:mt-0 text-2xl sm:text-4xl font-semibold text-white">Preview {drawer?.event} posts</p>
                    <Image src={drawer?.gif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage"
                      width={0} height={0} className="img border-4 p-1 border-white rounded-box"/>
                    <motion.button 
                      whileTap={{scale:0.9}} 
                      className="preview-button" 
                      onClick={() => {setPreview(true); setOccasion(drawer.event)}}>Preview<FiExternalLink /> 
                    </motion.button>
                </div>
              </DragCloseDrawer>

              <span className="divider m-0 p-0"></span>

              <footer>
                <div className="footer text-black py-10 flex items-start justify-evenly">
                  <div className="pages ">
                  <h1 className="text-2xl">Pages</h1>
                  <div className=" flex flex-col">
                    <Link className="text-lg" href='/boards/create'>» Create Board</Link>
                    <Link className="text-lg" href='#how-to' >» How to create a board</Link>
                  </div>
                </div>
                {isClient && <Image src={Logo} width={60} height={60} alt="Logo"/>}
                  </div>
              </footer>
                    
            {/* <FileUploader/> */}

          </div>
        }
      </>
  );
}


const previewsData = [
  {
    id: 1,
    gif: PreviewRetirementGif,
    event: "retirement"
  },
  {
    id: 2,
    gif: PreviewThankyouGif,
    event: "thankyou"
  },
  {
    id: 3,
    gif: PreviewGraduationGif,
    event: "graduation"
  },
  {
    id: 4,
    gif: PreviewBirthdayGif,
    event: "birthday"
  },
  {
    id: 5,
    gif: PreviewFarewellGif,
    event: "farewell"
  },
  {
    id: 6,
    gif: PreviewNewYearGif,
    event: "new year"
  }
]
