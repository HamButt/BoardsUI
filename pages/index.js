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
            <Link rel="stylesheet" className="mt-6 btn btn-lg text-xl font-light border border-black rounded-2xl hover:shadow hover:bg-transparent bg-transparent" 
              href="/boards/create" >Create Board - it's free
              <span className="animate-pulse"><FaArrowRight /></span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col my-10 py-16 bg-indigo-950 space-x-5 rounded-box">
            <h1 className="text-white text-4xl"> Checkout our previews</h1>
            
            <div className="flex itmes-center justify-evenly flex-wrap w-[900px] mt-10">

              <dialog id="retirement_modal" className="modal bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
                    <p className="text-2xl text-white" >Preview retirement cards</p>
                    <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewRetirementGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                      <form method="dialog">
                        <button className="btn bg-indigo-950 hover:bg-indigo-950 text-lg text-white font-light absolute top-10 right-10">X</button>
                      </form>
                    <button className="btn bg-indigo-950 border text-white text-lg font-light hover:bg-indigo-950 " onClick={() => {setPreview(true); setOccasion('retirement')}}>Preview<FiExternalLink /></button>
              </dialog>
              <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" onClick={()=>document.getElementById('retirement_modal').showModal()} src={PreviewRetirementGif} sizes='(max-width: 200px) 100vw, 33vw'  alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                
              <dialog id="thankyou_modal" className="modal bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
                  <p className="text-2xl text-white" >Preview thankyou cards</p>
                  <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewThankyouGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <form method="dialog">
                      <button className="btn bg-indigo-950 hover:bg-indigo-950 text-lg text-white font-light absolute top-10 right-10">X</button>
                    </form>
                  <button className="btn bg-indigo-950 border text-white text-lg font-light hover:bg-indigo-950 " onClick={() => {setPreview(true); setOccasion('thankyou')}}>Preview<FiExternalLink /></button>
              </dialog>
              <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewThankyouGif} onClick={()=>document.getElementById('thankyou_modal').showModal()}  sizes='(max-width: 200px) 100vw, 33vw' alt="PreviewThankyouGif"  width={0} height={0} className="img rounded-box"/>
                
              <dialog id="graduation_modal" className="modal bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
                  <p className="text-2xl text-white" >Preview graduation cards</p>
                  <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewGraduationGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <form method="dialog">
                      <button className="btn bg-indigo-950 hover:bg-indigo-950 text-lg text-white font-light absolute top-10 right-10">X</button>
                    </form>
                  <button className="btn bg-indigo-950 border text-white text-lg font-light hover:bg-indigo-950 " onClick={() => {setPreview(true); setOccasion('graduation')}}>Preview<FiExternalLink /></button>
              </dialog>
              <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewGraduationGif} onClick={()=>document.getElementById('graduation_modal').showModal()}   sizes='(max-width: 200px) 100vw, 33vw' alt="PreviewGraduationGif" width={0} height={0} className="img rounded-box"/>
              
              <dialog id="birthday_modal" className="modal bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
                  <p className="text-2xl text-white" >Preview birthday cards</p>
                  <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewBirthdayGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <form method="dialog">
                      <button className="btn bg-indigo-950 hover:bg-indigo-950 text-lg text-white font-light absolute top-10 right-10">X</button>
                    </form>
                  <button className="btn bg-indigo-950 border text-white text-lg font-light hover:bg-indigo-950 " onClick={() => {setPreview(true); setOccasion('birthday')}}>Preview<FiExternalLink /></button>
              </dialog>
              <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewBirthdayGif} onClick={()=>document.getElementById('birthday_modal').showModal()}  sizes='(max-width: 200px) 100vw, 33vw' alt="PreviewBirthdayGif" width={0} height={0} className="img rounded-box"/>
              
              <dialog id="farewell_modal" className="modal bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
                  <p className="text-2xl text-white" >Preview farewell cards</p>
                  <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewFarewellGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <form method="dialog">
                      <button className="btn bg-indigo-950 hover:bg-indigo-950 text-lg text-white font-light absolute top-10 right-10">X</button>
                    </form>
                  <button className="btn bg-indigo-950 border text-white text-lg font-light hover:bg-indigo-950 " onClick={() => {setPreview(true); setOccasion('farewell')}}>Preview<FiExternalLink /></button>
              </dialog>

              <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewFarewellGif} onClick={()=>document.getElementById('farewell_modal').showModal()}  sizes='(max-width: 200px) 100vw, 33vw' alt="PreviewFarewellGif" width={0} height={0} className="img rounded-box"/>

              <dialog id="new_year_modal" className="modal bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
                  <p className="text-2xl text-white" >Preview new year cards</p>
                  <Image data-offset='0' data-aos="fade" data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewNewYearGif} sizes='(max-width: 200px) 100vw, 33vw' alt="RetirementImage" width={0} height={0} className="img rounded-box"/>
                    <form method="dialog">
                      <button className="btn bg-indigo-950 hover:bg-indigo-950 text-lg text-white font-light absolute top-10 right-10">X</button>
                    </form>
                  <button className="btn bg-indigo-950 border text-white text-lg font-light hover:bg-indigo-950 " onClick={() => {setPreview(true); setOccasion('new year')}}>Preview<FiExternalLink /></button>
              </dialog>
              <Image data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" src={PreviewNewYearGif} onClick={()=>document.getElementById('new_year_modal').showModal()}  sizes='(max-width: 200px) 100vw, 33vw' alt="PreviewNewYearGif" width={0} height={0} className="img rounded-box"/>
            </div>
        
        </div>

       
        

        
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
