'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IoMdArrowRoundBack } from "react-icons/io";
// import { FileUploader } from "react-drag-drop-files"; 
import Head from 'next/head'
import {useRouter} from 'next/navigation'
import { IoImages } from "react-icons/io5";
import { PiGifFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { FaYoutube } from "react-icons/fa6";
import Logo from '../../../../public/logo.png'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem ,Button} from "@nextui-org/react";
import { MdDriveFolderUpload } from "react-icons/md";
import { RiStackFill } from "react-icons/ri";
import { IoIosArrowDown  } from "react-icons/io";
import { BsCloudUpload } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import axios from 'axios' 
import UploadImage from '@/components/UploadImage';
import SearchImage from '@/components/SearchImage';
import PreviewSplashImage from '@/components/PreviewSplashImage';
import SplashImages from '@/components/SplashImages';
import Error from '@/components/Error';
import GifUpload from '@/components/GifUpload';
import GifSearch from '@/components/GifSearch';
import UploadYoutubeVideo from '@/components/UploadYoutubeVideo';
import SelectedGif from '@/components/SelectedGif';
import Giphy from '@/components/Giphy';


function CreatePost() {
    const router = useRouter()
    const [GIFCompnent, setGIFComponent] = useState(""); 
    const [imageComponent, setImageComponent] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    const [videoInputHandling, setVideoInputHandling] = useState(false);
    const [gifSection, setGifSection] = useState(false);
    const [imageSection, setImageSection] = useState(false);
    const [videoComponent, setVideoComponent] = useState(false); 
    const [splashImage, setSplashImage] = useState(''); 
    const [creator, setCreator] = useState(''); 
    const [boardId, setBoardId] = useState('');
    const [image, setImage] = useState(''); 
    const [gif, setGif] = useState(''); 
    const [title, setTitle] = useState(''); 
    const [message, setMessage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [gifSearchValue, setGifSearchValue] = useState('');
    const [imageSearchValue, setImageSearchValue] = useState('');
    const [debounceTimerForImage, setDebounceTimerForImage] = useState(0);
    const [debounceTimerForGIf, setDebounceTimerForGIf] = useState(0);
    const [imagePage, setImagePage] = useState(1);
    const [gifData, setGifData] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [error, setError] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [gifOffset, setGifOffset] = useState(0);
    let limit = 12;
    let offset = gifOffset;
    
    
    useEffect(()=>{
        
        if(gifSearchValue){
            setGifSection(true)
            clearTimeout(debounceTimerForGIf);
            const newDebounceTimer = setTimeout(() => {
                getGifsFromGiphy()
                setImageSection(false)
            }, 500);
                setDebounceTimerForGIf(newDebounceTimer);
              }

              return () => {
                if (debounceTimerForGIf) {
                    clearTimeout(debounceTimerForGIf);
                    setGifData("")
                }};
       
    }, [gifSearchValue])


    const getGifsFromGiphy = async () => {
        setGifOffset((prevOffset) => prevOffset + limit)
        const gifUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.apiKey}&q=${gifSearchValue}&limit=${limit}&offset=${offset}&rating=g&lang=en`;
        try {
            const response = await axios.get(gifUrl)
            setGifData(response.data.data)
        } catch (error) {
            console.log("error",error);
            setError(error.response)}
    }
    

    useEffect(()=>{
        if(imageSearchValue){
            setImageSection(true)
            clearTimeout(debounceTimerForImage);
            const newDebounceTimer = setTimeout(() => {
                getImagesFromUnsplash()
                setGifSection(false)
                }, 500);
                setDebounceTimerForImage(newDebounceTimer);
            }
            
            return () => {
                if (debounceTimerForImage) {
                    clearTimeout(debounceTimerForImage);
                    setImageData("")
            }};

       
    }, [imageSearchValue])

    const getImagesFromUnsplash = async () =>{

        const unsplashParams = {
            query: imageSearchValue,
            page:  imagePage,
            per_page: 12,
            client_id: process.env.clientId,
            orientation: 'portrait',
        };

        setImagePage((imgPg) => imgPg + 1 )
        try {
            const response = await axios.get(process.env.unsplashUrl, { params: unsplashParams  })
            setImageData(response.data.results)
            
        } catch (error) {
            setError(error.response.data.errors[0])
            console.log("Error",error);
        }
    }

    useEffect(()=>{
        if(videoLink){
            setVideoInputHandling(true)
        }
        
        return (() => {
            setVideoInputHandling(false)

        })
    }, [videoLink])
    
    const createPost = async () => {
        
        setIsLoading(true)
        const formData = new FormData();
        if(image){
            formData.append('image', image) // upload image and upload gif
        }else if(gif){
            formData.append('gif', gif) //giphy
        }else if(videoLink){
            formData.append('video', videoLink) // youtube video link
        }else{
            formData.append('unsplashImage', splashImage) // unplash image
        }
        formData.append('message',message)
        formData.append('boardId',boardId)
        formData.append('creator',creator)
        
        try {
            const res = await axios.post(`${process.env.basePath}/posts`, formData ,{
                 headers:{
                     "Content-Type": "multipart/form-data"
             }})
                 if(res.status === 200){
                    confetti({
                         particleCount: 200,
                         spread: 50,
                         origin: { y: 0.7 }
                     })
                    router.push(`/boards/${boardId}`)
                    setIsLoading(false);
                 }
        } catch (error) {
            console.log(err)
            if(err.response.status === 403){
                setOpenErrorModal(err.response.data.message)
                setIsLoading(false)
            }
        }
    }

    const handleUploadFiles = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImage(file);
        }
      };

    useEffect(()=>{
        
        const selectImage = document.getElementsByClassName('upload-image')[0]
        const selectGif = document.getElementsByClassName('upload-gif')[0]
        if(selectImage){
            selectImage.textContent = `Image saved - (${image.name})`
        }else if(selectGif){
            selectGif.textContent = `GIF saved - (${image.name})`
        }

        const board_id = window.location.pathname.split('/')[2]
        setBoardId(board_id)

        axios.get(`${process.env.basePath}/boards/${board_id}`)
        .then((res) => {
            setTitle(res.data.board.occasion)
        }).catch((err) => {
            console.log(err);
        })
    }, [image])

  return (

    
    <div className='bg-[#2a9d8f] min-h-screen h-full ' >

        <Head>
            <title>Create post</title>
        </Head>

        <div className="logo py-4 bg-white flex items-center justify-center">
            <Link href='/' className="">
                <Image src={Logo} alt='Logo' width={60} height={60}/>
            </Link>
        </div>

        <div className="title py-6 2xl:py-8 text-center bg-[#FF9669]">
            <p className='occasion-title text-3xl 2xl:text-4xl text-white'>{title}</p>
        </div>
        
        <div className='post flex items-center justify-center'>
            <div className='post-modal-parent' data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">
                <div className="post-modal">
                
                    <div className="back-link-arrow flex items-center ps-6 space-x-2 ">
                        <Link href={`/boards/${boardId}`} className='text-3xl' ><IoMdArrowRoundBack/></Link>
                        <p className='text-2xl'>Add a post</p>
                    </div>

                    <div className="uploading-section">
                        <div className="uploading-section-buttons">
                            
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button className='add-an-image-btn'>
                                        <IoImages className='text-lg md:text-[16px] text-indigo-600'/>  
                                        <span className='text-sm md:text-[15px] ms-2 p-0'>Add an image</span>
                                        <IoIosArrowDown className='ms-1 text-lg md:text-[16px] text-indigo-600' />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu variant="faded" aria-label="Static Actions" className='bg-white rounded-md border shadow-xl py-2'>
                                    <DropdownItem textValue='Upload'>
                                        <div className='upload-image'>
                                            <MdDriveFolderUpload className='text-xl text-indigo-600' />
                                            <p className='text-sm font-semibold ps-3' 
                                                onClick={() => {
                                                    setImageComponent('upload'); setImageSection(false); 
                                                    setGIFComponent("");  setVideoComponent(false); 
                                                    setGifSection(false); setGif(false); 
                                                    setVideoInputHandling(false);setGifData("")}} >Upload image</p>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem textValue='Search'>
                                        <div className='search-image'>
                                            <RiStackFill className='text-xl text-indigo-600' />
                                            <p className='text-sm font-semibold ps-3' 
                                                onClick={() => { 
                                                    setImageComponent('search'); setGIFComponent("");
                                                    setVideoComponent(false); setGifSection(false);
                                                    setGif(false); setVideoInputHandling(false);
                                                    setGifData("")}}>Search with unsplash</p>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <Dropdown>
                                <DropdownTrigger>
                                    <Button className='add-a-gif-btn'>
                                        <PiGifFill className='text-lg md:text-[18px] text-pink-600' />
                                        <span className='text-sm md:text-[15px] ms-2 p-0'>Add a GIF</span>
                                        <IoIosArrowDown className='ms-1 text-lg md:text-[16px] text-pink-600' />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions" className='bg-white rounded-md border shadow-xl py-2'>
                                    <DropdownItem textValue='Upload'>
                                        <div className='upload-gif'>
                                            <MdDriveFolderUpload className='text-xl text-pink-600' />
                                            <p className='text-sm font-semibold ps-3' 
                                                onClick={() => {
                                                    setGIFComponent('upload'); setImageComponent("");
                                                    setImageSection(false);  setVideoComponent(false);
                                                    setGifSection(false); setGif(false); 
                                                    setVideoInputHandling(false); setImageData("")}} >Upload GIF</p>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem textValue='Search'>
                                        <div className='search-gif'>
                                            <RiStackFill className='text-xl text-pink-600' />
                                            <p className='text-sm font-semibold ps-3' 
                                                onClick={() => {
                                                    setGIFComponent('search'); setImageComponent("");
                                                    setImageSection(false); setVideoComponent(false); 
                                                    setGifSection(false); setGif(false); setVideoInputHandling(false);
                                                    setImageData("")}}>Search with giphy</p>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                                
                            <Button onClick={() => { setGIFComponent("");setImageData("");setGifData(''); setImageComponent("");  
                                setImageSection(false); setVideoComponent(!videoComponent); setGifSection(false); setGif(false);
                                setVideoInputHandling(false)}} className="youtube-btn"> 
                                <FaYoutube  className='text-lg md:text-[16px] text-red-700' />
                                <span className='text-sm md:text-[15px] ms-2 p-0'>Add a video</span> 
                            </Button>

                        </div>
                    </div>
                    
                    <div className="file-uploader mx-10 mt-6 flex flex-col items-center justify-center">

                        <>
                            { 

                                imageComponent === "upload" ?
                                    <UploadImage handleUploadFiles={handleUploadFiles} />
                            : 
                            
                                imageComponent === "search" ? 
                                    <SearchImage imageSearchValue={imageSearchValue} setImageSearchValue={setImageSearchValue} title={title} />
                                
                            : ""
                            }
                        </>
                        
                        {
                            splashImage && 
                                <PreviewSplashImage 
                                    error={error} 
                                    splashImage={splashImage} 
                                    setSplashImage={setSplashImage} 
                                    setImageComponent={setImageComponent} 
                                    setImageSection={setImageSection}  
                                />
                        }

                        { 
                            imageSection && imageSearchValue && 

                            <SplashImages 
                                error={error} 
                                setSplashImage={setSplashImage} 
                                setImageComponent={setImageComponent} 
                                setImageSection={setImageSection} 
                                imageSearchValue={imageSearchValue} 
                                imageData={imageData} 
                                getImagesFromUnsplash={getImagesFromUnsplash}
                            />
                        
                        }

                        {!imageData.length > 0 && error && <Error error={error} /> }


                        {
                            GIFCompnent === "upload" ? 
                                <GifUpload handleUploadFiles={handleUploadFiles} />
                            : 

                            GIFCompnent === "search" ? 
                                <GifSearch gifSearchValue={gifSearchValue} title={title} setGifSearchValue={setGifSearchValue} />
                            
                            : ""
                        }

                        {
                            videoComponent && <UploadYoutubeVideo setVideoLink={setVideoLink} videoLink={videoLink} />
                        }

                        {
                            videoLink && videoInputHandling && <iframe className='mt-2' width="450" height="253" src={videoLink} ></iframe>  
                        }

                        {
                            gif && <SelectedGif setGif={setGif} setGIFComponent={setGIFComponent} setGifSection={setGifSection} gif={gif} />
                        }

                        {
                            gifSection && gifSearchValue &&
                                <Giphy gifSearchValue={gifSearchValue} gifData={gifData} setGif={setGif} setGIFComponent={setGIFComponent} setGifSection={setGifSection} getGifsFromGiphy={getGifsFromGiphy} />
                            
                        }

                    </div>


                    <div className="inputs text-center mx-10 mt-6">
                        <input 
                            type="text" className="input input-bordered border-2 w-full" 
                            placeholder='Enter your name or post anonymously' value={creator} 
                            onChange={(e) => setCreator(e.target.value)}  />
                        <textarea style={{resize:"none"}} value={message} rows={4}
                            className='message-textarea textarea textarea-bordered' type="text" name='message' required placeholder='(Required) Add a message...' onChange={(e) => setMessage(e.target.value)}  ></textarea>
                        <motion.button whileTap={{scale: !message ? "1" : "0.9"}} disabled={!message ? true : false} onClick={createPost} 
                            style={{backgroundColor: !message ? "rgb(189, 185, 185)" : "#2a9d8f"}}
                            className={`create-post-btn`}>{isLoading ? "Creating..." : "Create post"}
                        </motion.button>
                    </div>
                    
                </div>
            </div>
        </div>

        {openErrorModal && 
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpenErrorModal(false)}
                    className="animated-error-modal"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="animated-error-modal-child"
                    >
                    <FiAlertCircle className="text-white/10 rotate-12 text-[250px]  absolute z-0 -top-24 -left-24" />
                    <div className="relative z-10">
                        <div className="animated-error-modal-icon">
                            <FiAlertCircle />
                        </div>
                        <h3 className="text-3xl font-bold text-center mb-2">Limit reached to an end</h3>
                        <p className="text-center mb-6">{openErrorModal}</p>
                        <div className="flex gap-2">
                            <button onClick={() => setOpenErrorModal(false)} 
                                className="animated-error-modal-close-btn"> Close </button>
                            <button disabled onClick={() => setOpenErrorModal(false)} 
                                className="animated-error-modal-premium-btn" data-tip="Coming soon">
                                Go premium
                            </button>
                        </div>
                    </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>}
        
    </div>
  )
}

export default CreatePost
