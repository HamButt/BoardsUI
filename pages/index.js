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
       
        

        
        {/* <div className="my-6">
          <h1 className="text-center text-2xl my-4">View Sample of amazing cards</h1>
          
          <div className="mt-6 carousel carousel-center mx-8 p-4 space-x-4 bg-neutral rounded-box">
            <div className="carousel-item">
              <Image src={PreviewRetirementGif} sizes='(max-width: 200px) 100vw, 33vw' width={300} height={400} alt="PreviewRetirementGif" className="rounded-box" />
            </div> 
            <div className="carousel-item">
              <Image src={PreviewThankyouGif} sizes='(max-width: 200px) 100vw, 33vw' width={300} height={400} alt="PreviewRetirementGif" className="rounded-box" />
            </div> 
            <div className="carousel-item">
              <Image src={PreviewGraduationGif} sizes='(max-width: 200px) 100vw, 33vw' width={300} height={400} alt="PreviewRetirementGif" className="rounded-box" />
            </div> 
            <div className="carousel-item">
              <Image src={PreviewBirthdayGif} sizes='(max-width: 200px) 100vw, 33vw' width={300} height={400} alt="PreviewRetirementGif" className="rounded-box" />
            </div> 
            <div className="carousel-item">
              <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="rounded-box" />
            </div> 
            <div className="carousel-item">
              <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="rounded-box" />
            </div> 
            <div className="carousel-item">
              <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="rounded-box" />
            </div>
          </div>

        </div> */}

        {/* <div className="text-center mt-6 py-10 bg-[#3A4550]">
          <h1 className=" text-center text-white text-4xl">Swipe right and checkout amazing cards </h1>
        
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper mt-10 text-start"
        >
          <SwiperSlide onClick={() => setPreview(true)}>
            <h1 className="font-light ms-2 mt-4">Good bye on retirement!</h1>
            <p className="ms-2 font-light text-sm my-2">Say Good bye with your heartful message along with image </p>
            <Image src={RetirementImage} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={500} height={500}/>
            
          </SwiperSlide>
        
          <SwiperSlide>
            <h1 className="font-light ms-2 mt-4">GIF for retirement!</h1>
            <p className="ms-2 font-light text-sm my-2">You can also add GIF to express your feelings </p>
            <video className="rounded-lg" width="390" height="440" autoPlay loop muted >
              <source src={RetirementGif} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </SwiperSlide>
        
          <SwiperSlide>
            <h1 className="font-light ms-2 mt-4">Thankyou!</h1>
            <p className="ms-2 font-light text-sm my-2">Just leave a message if not image, GIF or video want to add </p>
            <Image src={ThankyouText} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={500} height={500}/>
          </SwiperSlide>
        
          <SwiperSlide>
          <h1 className="font-light ms-2 mt-4">Retirement youtube video</h1>
            <p className="ms-2 font-light text-sm my-2">Say goodbye your team member with youtube video</p>
            <video className="rounded-lg" width="390" height="440" autoPlay loop muted >
              <source src={RetirementYoutubeVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </SwiperSlide>
        
          <SwiperSlide>
            <h1 className="font-light ms-2 mt-4">Welcome youtube video</h1>
            <p className="ms-2 font-light text-sm my-2">Welcome your team member with youtube video</p>
            <video className="rounded-lg" width="390" height="440" autoPlay loop muted >
              <source src={WelcomeYoutubeVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </SwiperSlide>
        </Swiper>
        
        <Link rel="stylesheet" className="hover:bg-white hover:text-black hover:border-black text-white mt-6 btn btn-lg text-xl font-light border-2 shadow rounded-2xl hover:shadow-xl hover:bg-transparent bg-transparent" 
              href="/boards/create" >Start creating one
              <span className="animate-pulse"><FaArrowRight /></span>
        </Link>
        </div> */}
      </div>

    }
    </>
  );
}
