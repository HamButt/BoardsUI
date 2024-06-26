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
// import {motion} from 'framer-motion'
import useMeasure from "react-use-measure";
import { useDragControls, useMotionValue, useAnimate, motion} from "framer-motion";

const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

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
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-gray-800"
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
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
export default function Home() {
  const categories = ['Happy Birthday!', 'Anniversary!', 'Congratulations!', 'Graduation!', 'Thank You!', 'New Year!'];
  const [currentCategoryIndex, setCurrentCategoryIndex] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState('');
  const [isErasing, setIsErasing] = React.useState(false);
  const [preview,setPreview] = React.useState(false);
  const [occasion,setOccasion] = React.useState('');
  const [open, setOpen] = React.useState(false);


  React.useEffect(() => {
    let btn;
    const closeButton = document.getElementsByClassName('close-button');
    for (let i = 0; i < closeButton.length; i++) {
      btn = closeButton[i];
      btn.addEventListener('click', handleCloseModal);
    }

    return () => {
      btn.removeEventListener('click', handleCloseModal);
    };
  }, []);

  const handleCloseModal = () => {
    const previews = document.getElementById('previews');
    if (previews) {
      previews.scrollIntoView({ behavior: 'smooth' }); 
    }
  };

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
    
      {preview ? <PreviewBoard setPreview={setPreview} occasion={occasion} /> : 

      <div className="absolute w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">

        <Head>
          <title>Home</title>
        </Head>

        <Header/>
        
        <div className="main mt-10">
          <div className="max-w-3xl mx-auto mt-6 flex flex-col items-center text-center justify-center">
            {/* <p className="text-4xl">Create group memories with personalized recognition cards and leave a lasting impression!</p> */}
            <p className="sm:text-4xl text-2xl font-bold ">Celebrate your team members and people you admire</p>
            {/* <p className="text-2xl mt-5">Personalized praise boards with every occasion <span className="text-lg font-semibold">{displayedText}</span> </p> */}
            <p className="text-lg sm:text-2xl max-sm:font-semibold mt-5 max-sm:px-5">Beautiful, collaborative personalized online boards to celebrate your team and friends 
            {/*   <span className="text-sm sm:text-lg font-semibold">{displayedText}</span>  */}
            </p>
            {/* <p className="text-4xl">Create group memories with personalized recognition cards and leave a lasting impression!</p> */}
            {/* <p className="text-2xl mt-5">Personalized praise boards with every occasion <span className="text-lg font-semibold">{displayedText}</span> </p> */}
            <Link rel="stylesheet" className="mt-6 btn btn-md sm:btn-lg text-md font-semibold sm:text-xl sm:font-medium border hover:shadow-xl border-black rounded-2xl hover:bg-white bg-white" 
              href="/boards/create" >Create Board - it's free
              <span className="animate-pulse"><FaArrowRight /></span>
            </Link>
          </div>
        </div>

        <div id="previews" className="flex items-center justify-center flex-col mt-16 py-16 bg-gray-200">
          
            
            <div className="text-center max-md:px-2 max-sm:px-2">
                <h1 className="sm:text-4xl font-semibold text-2xl"> Explore our previews</h1>
                <p className="sm:text-xl text-md font-semibold sm:font-medium mt-4">Uncover the potential of what we can design for you</p>
            </div>
            
            <div className="max-w-screen-lg w-full mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex items-center justify-evenly flex-wrap mt-10" >
                <div>
                
                  <dialog id="retirement_modal" className="modal bg-gray-300 absolute inset-0 -z-10 h-full w-full" >
                        <p className="mt-4 sm:mt-0 text-2xl sm:text-4xl font-semibold text-gray-600" >Preview retirement posts</p>
                        <Image src={PreviewRetirementGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage"
                          width={0} height={0} className="img border-4 p-1 border-white rounded-box"/>
                          <form method="dialog">
                            <motion.button whileTap={{scale:0.9}} className="close-button hover:bg-gray-400 px-3 py-2 
                            rounded-full border-none outline-none text-xl text-gray-600 
                            font-light absolute top-2 right-2 sm:top-10 sm:right-10">X</motion.button>
                          </form>
                        <motion.button whileTap={{scale:0.9}} className="btn bg-white w-52 border border-gray-500 outline-none rounded-lg text-gray-600 text-xl font-semibold hover:bg-white hover:shadow-xl hover:border-gray-500" onClick={() => {setPreview(true); setOccasion('retirement')}}>Preview <FiExternalLink /> </motion.button>
                  </dialog>

                  <div className="image-container rounded-box">
                    <Image   src={PreviewRetirementGif} sizes='(max-width: 200px) 100vw, 33vw'  
                      alt="RetirementImage" width={0} height={0} className="img rounded-box"/>

                    <div className="overlay">
                        <motion.button whileTap={{scale:0.9}} 
                        onClick={() => setOpen(true)}
                          className="overlay-button btn border outline-none rounded-lg  text-lg font-semibold hover:shadow-xl" 
                          >Preview <FiExternalLink /> </motion.button>
                    </div>
                  </div>
                </div>

                <div>
                  
                  <dialog id="thankyou_modal" className="modal bg-gray-300 absolute inset-0 -z-10 h-full w-full">
                      <p className="mt-4 sm:mt-0 text-2xl sm:text-4xl font-semibold text-gray-600" >Preview thankyou posts</p>
                      <Image  src={PreviewThankyouGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" 
                      width={0} height={0} className="img border-4 p-1 border-white rounded-box"/>
                        <form method="dialog">
                          <motion.button className="close-button hover:bg-gray-400 px-3 py-2 
                            rounded-full border-none outline-none text-xl text-gray-600 font-light absolute top-2 right-2 sm:top-10 sm:right-10" whileTap={{scale:0.9}}>X</motion.button>
                        </form>
                      <motion.button whileTap={{scale:0.9}} className="btn bg-white w-52 border border-gray-500 outline-none rounded-lg text-gray-600 text-xl font-semibold hover:bg-white hover:shadow-xl hover:border-gray-500" onClick={() => {setPreview(true); setOccasion('thankyou')}}>Preview<FiExternalLink /></motion.button>
                  </dialog>

                  <div className="image-container rounded-box">
                    <Image  src={PreviewThankyouGif} sizes='(max-width: 200px) 100vw, 33vw'  
                      alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <div className="overlay">
                        <motion.button whileTap={{scale:0.9}} 
                        className="overlay-button btn border outline-none rounded-lg  text-lg font-semibold hover:shadow-xl" onClick={()=>document.getElementById('thankyou_modal').showModal()}>Preview <FiExternalLink /> </motion.button>
                    </div>
                  </div>
                </div>
                  
                <div>
                  <dialog id="graduation_modal" className="modal bg-gray-300 absolute inset-0 -z-10 h-full w-full">
                      <p className="mt-4 sm:mt-0 text-2xl sm:text-4xl font-semibold text-gray-600" >Preview graduation posts</p>
                      <Image  src={PreviewGraduationGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage"
                         width={0} height={0} className="img border-4 p-1 border-white rounded-box"/>
                        <form method="dialog">
                          <motion.button className="close-button hover:bg-gray-400 px-3 py-2 
                            rounded-full border-none outline-none text-gray-600 font-light absolute
                             top-2 right-2 sm:top-10 sm:right-10" whileTap={{scale:0.9}}>X</motion.button>
                        </form>
                      <motion.button whileTap={{scale:0.9}} className="btn bg-white w-52 border text-xl border-gray-500 outline-none rounded-lg text-gray-600 font-semibold hover:bg-white hover:shadow-xl hover:border-gray-500 " onClick={() => {setPreview(true); setOccasion('graduation')}}>Preview<FiExternalLink /></motion.button>
                  </dialog>

                  <div className="image-container rounded-box">
                    <Image src={PreviewGraduationGif} sizes='(max-width: 200px) 100vw, 33vw'  
                      alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <div className="overlay">
                        <motion.button whileTap={{scale:0.9}} 
                        className="overlay-button btn border  outline-none rounded-lg text-lg font-semibold  hover:shadow-xl" onClick={()=>document.getElementById('graduation_modal').showModal()}>Preview <FiExternalLink /> </motion.button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <dialog id="birthday_modal" className="modal bg-gray-300 absolute inset-0 -z-10 h-full w-full">
                      <p className="mt-4 sm:mt-0 text-2xl sm:text-4xl font-semibold text-gray-600" >Preview birthday posts</p>
                      <Image  src={PreviewBirthdayGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" 
                      width={0} height={0} className="img rounded-box border-4 p-1 border-white"/>
                        <form method="dialog">
                          <motion.button className="close-button hover:bg-gray-400 px-3 py-2 
                            rounded-full border-none outline-none text-xl text-gray-600 font-light absolute top-2 right-2 sm:top-10 sm:right-10" whileTap={{scale:0.9}}>X</motion.button>
                        </form>
                      <motion.button whileTap={{scale:0.9}} className="btn bg-white w-52 border border-gray-500 outline-none rounded-lg text-gray-600 text-xl font-semibold hover:bg-white hover:shadow-xl hover:border-gray-500 " onClick={() => {setPreview(true); setOccasion('birthday')}}>Preview<FiExternalLink /></motion.button>
                  </dialog>

                  <div className="image-container rounded-box">
                    <Image src={PreviewBirthdayGif} sizes='(max-width: 200px) 100vw, 33vw'  
                      alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <div className="overlay">
                        <motion.button whileTap={{scale:0.9}} className="overlay-button btn border outline-none rounded-lg text-lg font-semibold  hover:shadow-xl"
                        onClick={()=>document.getElementById('birthday_modal').showModal()}>Preview <FiExternalLink /> </motion.button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <dialog id="farewell_modal" className="modal bg-gray-300 absolute inset-0 -z-10 h-full w-full">
                      <p className="mt-4 sm:mt-0 text-2xl sm:text-4xl font-semibold text-gray-600" >Preview farewell posts</p>
                      <Image  src={PreviewFarewellGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" 
                      width={0} height={0} className="img rounded-box border-4 p-1 border-white"/>
                        <form method="dialog">
                          <motion.button className="close-button hover:bg-gray-400 px-3 py-2 
                            rounded-full border-none outline-none text-xl text-gray-600 font-light absolute top-2 right-2 sm:top-10 sm:right-10" whileTap={{scale:0.9}}>X</motion.button>
                        </form>
                      <motion.button whileTap={{scale:0.9}} className="btn bg-white w-52 border border-gray-500 outline-none rounded-lg text-gray-600 text-xl font-semibold hover:bg-white hover:shadow-xl hover:border-gray-500 " onClick={() => {setPreview(true); setOccasion('farewell')}}>Preview<FiExternalLink /></motion.button>
                  </dialog>

                  <div className="image-container rounded-box">
                    <Image src={PreviewFarewellGif} sizes='(max-width: 200px) 100vw, 33vw'  
                      alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <div className="overlay">
                        <motion.button whileTap={{scale:0.9}} className="overlay-button btn border  outline-none rounded-lg text-lg font-semibold  hover:shadow-xl"
                        onClick={()=>document.getElementById('farewell_modal').showModal()}>Preview <FiExternalLink /> </motion.button>
                    </div>
                  </div>

                </div>

                <div>
                  <dialog id="new_year_modal" className="modal bg-gray-300 absolute inset-0 -z-10 h-full w-full">
                      <p className="mt-4 sm:mt-0 text-2xl sm:text-4xl font-semibold text-gray-600" >Preview new year posts</p>
                      <Image data-aos-duration="1000" src={PreviewNewYearGif} sizes='(max-width: 200px) 100vw, 33vw' 
                      alt="RetirementImage" width={0} height={0} className="img rounded-box border-4 p-1 border-white"/>
                        <form method="dialog">
                          <motion.button className="close-button hover:bg-gray-400 px-3 py-2 
                            rounded-full border-none outline-none text-xl text-gray-600 font-light absolute top-2 right-2 sm:top-10 sm:right-10" whileTap={{scale:0.9}}>X</motion.button>
                        </form>
                      <motion.button whileTap={{scale:0.9}} className="btn bg-white w-52 border border-gray-500 outline-none rounded-lg text-gray-600 text-xl font-semibold hover:bg-white hover:shadow-xl hover:border-gray-500 " onClick={() => {setPreview(true); setOccasion('new year')}}>Preview<FiExternalLink /></motion.button>
                  </dialog>

                  <div className="image-container rounded-box">
                    <Image src={PreviewNewYearGif} sizes='(max-width: 200px) 100vw, 33vw'  
                      alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <div className="overlay">
                        <motion.button whileTap={{scale:0.9}} className="overlay-button btn border outline-none rounded-lg text-lg font-semibold  hover:shadow-xl"
                        onClick={()=>document.getElementById('new_year_modal').showModal()}>Preview <FiExternalLink /> </motion.button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
        
        </div>

        <div id="how-to" className=" how-it-works my-10 text-center ">
          <h1 className="text-3xl sm:text-5xl my-4">How to create board</h1>
          <div className="process flex items-start justify-evenly flex-wrap  mx-3">
            
            <div className="one sm:px-5 sm:pb-5 pb-3 px-3">
              <Image className="process-img" sizes='(max-width: 200px) 100vw, 33vw' src='https://static.123cards.com/images/how-it-works-img1.svg' alt="Category selection" width={0} height={0} />
              <h1 className="sm:text-3xl text-2xl">Create</h1>
              <p className="step ">Select any occasion</p>
              <p className="step-process ">Birthday, anniversary or any other occasion. Select the category and style in minutes</p>
            </div>
            <div className="two sm:px-5 sm:pb-5 pb-3 px-3">
              <Image className="process-img" sizes='(max-width: 200px) 100vw, 33vw' src='https://static.123cards.com/images/how-it-works-img2.svg' alt="Schedule" width={0} height={0}  />
              <p  className="sm:text-3xl text-2xl">Invite</p>
              <p className="step">Invite people</p>
              <p className="step-process" >Fill out your details, add recipients & write a personal message and create board</p>
            </div>
            <div className="three sm:px-5 sm:pb-5 pb-3 px-3">
              <Image className="process-img" sizes='(max-width: 200px) 100vw, 33vw' src='https://static.123cards.com/images/how-it-works-img3.svg'  alt="Send" width={0} height={0}  />
              <p  className="sm:text-3xl text-2xl">Deliver</p>
              <p className="step">Create posts and deliver </p>
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
       
        

      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="flex flex-col items-center justify-center text-black space-y-4 bg-gray-800">
            <p className="mt-4 sm:mt-0 text-2xl sm:text-4xl font-semibold text-gray-600" >Preview retirement posts</p>
            <Image src={PreviewRetirementGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage"
              width={0} height={0} className="img border-4 p-1 border-white rounded-box"/>
            <motion.button whileTap={{scale:0.9}} className="btn bg-white w-52 border border-gray-500 outline-none rounded-lg text-gray-600 text-xl font-semibold hover:bg-white hover:shadow-xl hover:border-gray-500" onClick={() => {setPreview(true); setOccasion('retirement')}}>Preview <FiExternalLink /> </motion.button>
        </div>
      </DragCloseDrawer>

      </div>

    }
    </>
  );
}
