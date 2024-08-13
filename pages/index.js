'use client'
import Header from "../components/Header";
import Image from "next/image";
import React, {useState} from "react";
import Head from "next/head";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import PreviewBoard from "@/components/PreviewBoard";
import PreviewRetirementGif from '../assests/preview-assets/retirement.gif'
import PreviewThankyouGif from '../assests/preview-assets/thankyou.gif'
import PreviewGraduationGif from '../assests/preview-assets/congrats.gif'
import PreviewBirthdayGif from '../assests/preview-assets/birthdaygif.gif'
import PreviewFarewellGif from '../assests/preview-assets/farewell.gif'
import PreviewNewYearGif from '../assests/preview-assets/newyear.gif'
import { FiExternalLink } from "react-icons/fi";
import Logo from '../public/logo.png'
import useMeasure from "react-use-measure";
import { useDragControls, useMotionValue, useAnimate, motion} from "framer-motion";
// import { FileUploader } from "../components/Fileuploader";
import Steps from "../components/Timeline";
import { FaPlus } from "react-icons/fa6";
import Confetti from '../public/confetti.jpg'

const DragCloseDrawer = ({ open, setOpen, children }) => {

  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    
    animate(scope.current, { opacity: [1, 0] });
    const yStart = typeof y.get() === "number" ? y.get() : 0;
    await animate("#drawer", { y: [yStart, height] });
    setOpen(false);

  };

  return (
    <>
      {open && (
        <motion.div 
          ref={scope} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          onClick={handleClose} 
          className="fixed inset-0 z-50 bg-neutral-950/70">
          <motion.div id="drawer" ref={drawerRef} onClick={(e) => e.stopPropagation()} initial={{ y: "100%" }} animate={{ y: "0%" }} 
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[85vh] w-full overflow-hidden rounded-t-3xl bg-gray-800"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-gray-700 p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-gray-200 active:cursor-grabbing"
              ></button>
            </div>
            <div className="preview-drawer-div relative z-0 h-full overflow-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
export default function Home() {
  const categories = ['Birthday!', 'Welcome!', 'New year!', 'Easter!', 'ThankYou!', 'Love!', 'Farewell!', 'Congrats!'];
  const [preview,setPreview] = React.useState(false);
  const [occasion,setOccasion] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [drawer,setDrawer] = React.useState({
    event: "",
    gif: null
  });
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isErasing, setIsErasing] = useState(false);
  const [handleNavigating, setHandleNavigating] = useState(false);
  


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

            <div id="how-to" >
              <h1 className="how-to-heading">How to create a board</h1>
                <div className="mx-3 flex items-center justify-evenly flex-wrap">
                    <div className="how-to-image-div">
                      <Image src={Confetti} alt="Confetti" className="how-to-img" width={1000} height={1000}/>
                      <p className="how-to-p-1" >Create group memories with personalized recognition cards and leave a lasting impression!</p>
                      <p className="how-to-p-2" >Personalized occasions with praise board for every 
                        <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#2a9d8f]" > {displayedText} </span>
                      </p>
                      <Link rel="stylesheet" className="how-to-cta" 
                        href="/boards/create" > <FaPlus /> Create your board 
                      </Link>
                    </div>
                    <Steps/>                
                </div>
            </div>          

            <div id="previews">
                <div className="text-center max-md:px-2 max-sm:px-2">
                    <h1 className="previews-heading">Praise board for every occasion</h1>
                    <p className="previews-p">Uncover the potential of what we can design for you</p>
                </div>
                
                <div className="max-w-screen-lg w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                  
                  <div className="flex items-center justify-evenly flex-wrap" >

                      {
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
                      }

                  </div>
                </div>

                <Link rel="stylesheet" 
                  href="/boards/create" 
                  className="mt-12 btn bg-[#2a9d8f] sm:btn-lg text-md sm:text-xl font-medium text-white border hover:bg-transparent hover:text-[#2a9d8f] hover:border-[#2a9d8f]" 
                  > <FaPlus /> Create a Praise board 
                </Link>
            
            </div>

            <DragCloseDrawer open={open} setOpen={setOpen}>
              <div className="flex flex-col items-center justify-center text-black space-y-8 bg-gray-800 mt-4">
                  <p className="sm:mt-0 text-2xl sm:text-4xl font-semibold text-white">Preview {drawer.event} posts</p>
                  <Image src={drawer.gif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage"
                    width={0} height={0} className="img border-4 p-1 border-white rounded-box"/>
                  <motion.button 
                    whileTap={{scale:0.9}} 
                    className="preview-button" 
                    onClick={() => {setPreview(true); setOccasion(drawer.event)}}>Preview<FiExternalLink /> 
                  </motion.button>
              </div>
            </DragCloseDrawer>

            <footer>
              <div className="footer text-black py-10 flex items-start bg-white justify-evenly">
                <div className="pages ">
                <h1 className="text-2xl">Pages</h1>
                <div className=" flex flex-col">
                  <Link className="text-lg" href='/boards/create'>» Create Board</Link>
                  <Link className="text-lg" href='#how-to' >» How to create board</Link>
                </div>
              </div>
                <Image src={Logo} width={60} height={60} alt="Logo"/>
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
