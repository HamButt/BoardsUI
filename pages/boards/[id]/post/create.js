'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IoMdArrowRoundBack } from "react-icons/io";
import { FileUploader } from "react-drag-drop-files"; 
import axios from 'axios';
import Head from 'next/head'
import {useRouter} from 'next/navigation'
import NavBar from '@/components/NavBar';
import { IoImages } from "react-icons/io5";
import { PiGifFill } from "react-icons/pi";
import { MdDelete, MdVideoLibrary } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';
import { FaYoutube } from "react-icons/fa6";
import { motion} from 'framer-motion'
import Logo from '../../../../public/logo.png'
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { MdDriveFolderUpload } from "react-icons/md";
import { RiStackFill } from "react-icons/ri";

function CreatePost() {
    const router = useRouter()
    const [GIFCompnent, setGIFComponent] = React.useState(false); 
    const [imageComponent, setImageComponent] = React.useState(false); 
    const [isLoading, setIsLoading] = React.useState(false);
    const [videoInputHandling, setVideoInputHandling] = React.useState(false);
    const [gifSection, setGifSection] = React.useState(false);
    const [imageSection, setImageSection] = React.useState(false);
    const [videoComponent, setVideoComponent] = React.useState(false); 
    const [splashImage, setSplashImage] = React.useState(''); 
    const [creator, setCreator] = React.useState(''); 
    const [boardId, setBoardId] = React.useState('');
    const [image, setImage] = React.useState(''); 
    const [gif, setGif] = React.useState(''); 
    const [title, setTitle] = React.useState(''); 
    const [message, setMessage] = React.useState('');
    const [videoLink, setVideoLink] = React.useState('');
    const [gifSearchValue, setGifSearchValue] = React.useState('');
    const [imageSearchValue, setImageSearchValue] = React.useState('');
    const [debounceTimerForImage, setDebounceTimerForImage] = React.useState(0);
    const [debounceTimerForGIf, setDebounceTimerForGIf] = React.useState(0);
    const [imagePage, setImagePage] = React.useState(1);
    const [gifOffset, setGifOffset] = React.useState(0);
    const [gifData, setGifData] = React.useState([]);
    const [imageData, setImageData] = React.useState([]);
    const [error, setError] = React.useState(false);
    const imageTypes = ["JPG", "PNG", "JPEG"];
    const gifType = ["GIF"];

   
    
    // Unsplash Data
    
    const params = {
        query: imageSearchValue,
        page:  imagePage,
        per_page: 12,
        client_id: process.env.clientId,
        orientation: 'portrait',
    };

    //SECRET KEY
    //N__QEvwNa0tajmkhL_IXojNYXiunOe0Q5CDQuQODh2w

    React.useEffect(()=>{
        
        if(gifSearchValue){
            setGifSection(true)
            clearTimeout(debounceTimerForGIf);
            const newDebounceTimer = setTimeout(() => {
                fetchGifsFromGiphy()
            }, 500);
                setDebounceTimerForGIf(newDebounceTimer);
              }else{
                setGifData("")
              }

              return () => {
                if (debounceTimerForGIf) {
                    clearTimeout(debounceTimerForGIf);
                    setGifData("")
                }};
       
    }, [gifSearchValue])

    const fetchGifsFromGiphy = () => {
        let offset = gifOffset;
        let limit = 12;
        setGifOffset((prevOffset) => prevOffset + limit)
        const gifUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.apiKey}&q=${gifSearchValue}&limit=${limit}&offset=${offset}&rating=g&lang=en`;
        axios.get(gifUrl)
            .then(response => {
                setGifData(response.data.data)
            })
            .catch(error => setError(error.response.data));
                
    }

    React.useEffect(()=>{
        if(imageSearchValue){
            setImagePage((imgPg) => imgPg + 1 )
            setImageSection(true)
            clearTimeout(debounceTimerForImage);
            const newDebounceTimer = setTimeout(() => {
                fetchImagesFromUnsplash()
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

    const fetchImagesFromUnsplash = () => {
        axios.get(process.env.unsplashUrl, { params })
            .then(response => {
                console.log(response.data.results);
                setImageData(response.data.results)
            })
            .catch(error =>{ 
                setError(error.response.data)
            })
                
    }

    

    React.useEffect(()=>{
        if(videoLink){
            setVideoInputHandling(true)
        }
        
        return (() => {
            setVideoInputHandling(false)

        })
    }, [videoLink])
    
    const createPost = (e) => {
        
        e.preventDefault();
        confetti({
            particleCount: 200,
            spread: 50,
            origin: { y: 0.7 }
        })
        
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
        
        axios.post(`${process.env.basePath}/posts`, formData ,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        .then((res) => {
            if(res.status === 200){
                router.push(`/boards/${boardId}`)
                }
                setTimeout(() => {
                    setIsLoading(false)
                }, 3000);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false)
        })
    }

    React.useEffect(()=>{
        const selectImage = document.getElementsByClassName('kFhUBM')[0]
        if(selectImage){
            selectImage.textContent = `File saved - (${image.name})`
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
    <div className='min-h-screen h-full bg-gray-500 '>

        <Head>
            <title>Create post</title>
        </Head>

        <div className="logo py-2 bg-white flex items-center justify-center">
            <Link href='/' className="">
                <Image src={Logo} alt='Logo' width={50} height={50}/>
            </Link>
        </div>

        <div className="selected-title bg-gray-200 py-4 text-center ">
            <p className='text-2xl text-black ' >{title}</p>
        </div>
        
        <div className='post flex items-center justify-center '>
            <div className="h-auto post-modal bg-white mt-5 py-8 rounded-lg w-6/12" data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">
               
                <div className="back-link-arrow flex items-center ps-6 space-x-2">
                    <Link href={`/boards/${boardId}`} className='text-3xl' ><IoMdArrowRoundBack/></Link>
                    <p className='text-2xl'>Add a post</p>
                </div>

                <div className="uploding-section flex flex-col items-center justify-center mt-7">
                    <div className="buttons w-full flex itmes-center justify-center space-x-5">
                            
                            <Popover placement="bottom-start" offset={5} color='default' showArrow={true}>
                                <PopoverTrigger>
                                    <Button className='hover:bg-transparent hover:border-indigo-600 font-semibold bg-transparent m-0 btn border-indigo-600  text-indigo-600 border rounded-lg outline-none'>
                                        <IoImages className='text-xl text-indigo-600' />  Add an image
                                    </Button>
                                </PopoverTrigger>
                               <PopoverContent>
                                    <div className="py-2 w-50 shadow-xl px-2 bg-white rounded-md border ">
                                        <div className="copy-and-customize  ">
                                            <div className='upload  hover:bg-indigo-100 flex items-center justify-start cursor-pointer rounded-md p-2'>
                                                <MdDriveFolderUpload className='text-xl text-indigo-600' />
                                                <p className='text-sm font-semibold ps-3' onClick={() => {setImageComponent('upload'); setImageSection(false); setGIFComponent(false);  setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false);setGifData("")}} >Upload image</p>
                                            </div>
                                            <div  className='search hover:bg-indigo-100 flex items-center justify-start  mt-2 cursor-pointer  rounded-md p-2'>
                                                <RiStackFill className='text-xl text-indigo-600' />
                                                <p className='text-sm font-semibold ps-3' onClick={() => { setImageComponent('search'); setGIFComponent(false);  setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false);setGifData("")}}>Search with library</p>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            
                            <Popover placement="bottom-start" offset={5} color='default' showArrow={true}>
                                <PopoverTrigger>
                                    <Button className='hover:bg-transparent hover:border-pink-600 font-semibold bg-transparent m-0 btn border-pink-600  text-pink-600 border rounded-lg outline-none'>
                                        <PiGifFill className='text-xl text-pink-600' />Add a GIF
                                    </Button>
                                </PopoverTrigger>
                               <PopoverContent>
                                    <div className="py-2 w-50 shadow-xl px-2 bg-white rounded-md border ">
                                        <div className="copy-and-customize  ">
                                            <div className='upload  hover:bg-pink-100 flex items-center justify-start cursor-pointer rounded-md p-2'>
                                                <MdDriveFolderUpload className='text-xl text-pink-600' />
                                                <p className='text-sm font-semibold ps-3' onClick={() => {setGIFComponent('upload'); setImageComponent(false); setImageSection(false);  setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false); setImageData("")}} >Upload GIF</p>
                                            </div>
                                            <div  className='search hover:bg-pink-100 flex items-center justify-start  mt-2 cursor-pointer  rounded-md p-2'>
                                                <RiStackFill className='text-xl text-pink-600' />
                                                <p className='text-sm font-semibold ps-3' onClick={() => {setGIFComponent('search'); setImageComponent(false); setImageSection(false); setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false);setImageData("")}}>Search with library</p>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <button onClick={() => { setGIFComponent(false);setImageData("");setGifData(''); setImageComponent(false);  
                                setImageSection(false); setVideoComponent(!videoComponent); setGifSection(false); setGif(false); setVideoInputHandling(false)}} 
                                className="btn social-buttons border-red-700 w-40 text-red-700 bg-transparent hover:bg-transparent hover:border-red-700"> <FaYoutube  className='text-2xl text-red-700' /> Add a video </button>
                    </div>
                </div>
                
                <div className="file-uploader mx-10 mt-6 flex flex-col items-center justify-center">

                    { imageComponent === "upload" ?
                    <div className='text-center w-full mt-4'>
                        
                        <p className='font-semibold'>Please upload images that are appropriate for all audiences. We reserve the right to remove content without notice!</p>
                        <FileUploader  
                            handleChange={(file) => setImage(file)}  
                            name="image" 
                            type="file"
                            accept='image/JPG,PNG,JPEG'
                            types={imageTypes}
                            label="Drag or Upload an image file"
                        /> 
                    </div>

                    : 

                    imageComponent === "search" ? 
                        <div className=' mt-4'>
                            <p className='font-semibold'>Add more specific image terms to your search if you don't find what you're looking for</p>
                            <input name='unsplashImage' type="search" className="mt-3 input input-bordered border-2 w-full" value={imageSearchValue} placeholder={`Search ${title} image`} onChange={(e) => setImageSearchValue(e.target.value)} /> 
                        </div>
                        : ""
                    }
                    
                    {splashImage ?
                    
                    <div className="image">
                        <p className='text-center text-lg font-semibold'>Your selected Image</p>
                        <button className='bg-black relative top-9 p-1 left-2 rounded-lg' onClick={() => {setSplashImage(false); setImageComponent('search'); setImageSection(true) } }>
                            <MdDelete className=' text-white text-lg hover:text-gray-400'/>
                        </button>
                        <img  className='shadow-lg rounded-lg' style={{maxWidth:"300px", height: "300px"}} src={splashImage} alt="Splash Image" />
                    </div>

                    : ""}

                    { imageSection && imageSearchValue &&

                    <div style={{maxHeight:"300px"}} className="mt-2 gifs mx-10 my-1 flex-wrap overflow-auto flex items-start justify-evenly">
                        {imageSearchValue && imageData.length ?  
                            imageData.map((img, index)=>{ 
                                return(
                                    <div key={index} className='mt-2 cursor-pointer ' style={{minWidth:"120px", height:"160px"}} 
                                        onClick={() => {setSplashImage(img.urls.regular); setImageComponent(false); setImageSection(false)}}>
                                        <motion.img whileTap={{scale:0.9}} className='h-full w-full rounded-md' src={img.urls.small} alt="IMAGE URL" />
                                    </div> 
                                )})
                            :  imageSearchValue && !imageData ? <div className='mt-2 font-semibold'>Searching...</div> 
                            : <div className='mt-2 font-semibold' >No images found for "{imageSearchValue}"</div>
                            }
                            { imageData.length > 0 && <motion.button whileTap={{ scale: 0.9 }} onClick={fetchImagesFromUnsplash} className='mt-2 border text-sm my-1 px-2 py-1 rounded-md border-black text-black'>Load more</motion.button>}
                    </div>
                }

                    {error && (
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {GIFCompnent === "upload" ? 
                        <div className='text-center w-full mt-4'>
                            <p className='font-semibold'>Please upload GIFs that are appropriate for all audiences. We reserve the right to remove content without notice!</p>
                            <FileUploader  
                                handleChange={(file) => setImage(file)}  
                                name="image" 
                                type="file"
                                accept='gif'
                                types={gifType}
                                label="Upload or drop GIF here"
                            /> 
                        </div>
                        : 

                    GIFCompnent === "search" ? 
                        <div className='mt-4'>
                            <p className='font-semibold'>Add more specific GIF terms to your search if you don't find what you're looking for</p>
                            <input name='gif' type="search" className="mt-3 input input-bordered border-2 w-full" value={gifSearchValue} placeholder={`Search ${title} GIF`} onChange={(e) => setGifSearchValue(e.target.value)} /> 
                        </div>
                        : ""
                    }

                    {videoComponent && 
                        <div className='text-center mt-4'>
                            <p className='font-semibold'>Copy the youtube video url from share button e.g.<span className='text-xs text-gray-500' > https://www.youtube.com/embed/V5qRp8ZXm44?si=......</span></p>
                            <input type="text" className="input w-full mt-3 input-bordered border-2" 
                            placeholder='Paste youtube video link' value={videoLink} 
                            onChange={(e) => setVideoLink(e.target.value)} />
                        </div>
                    }

                    {videoLink && videoInputHandling ? <iframe className='mt-2' width="450" height="253" src={videoLink} ></iframe> : "" }

                    {gif ?
                    
                        <div className="image">
                            <p className='text-center text-lg font-semibold'>Your selected GIF</p>
                            <button className='bg-black relative top-9 p-1 left-2 rounded-lg' onClick={() => {setGif(false); setGIFComponent('search'); setGifSection(true) } }>
                                <MdDelete className=' text-white text-lg hover:text-gray-400'/>
                            </button>
                            <img className='shadow-lg rounded-lg' style={{maxWidth:"350px", height: "300px"}} src={gif} alt="GIF" />
                        </div>

                    : "" }

                </div>

                {
                    gifSection && gifSearchValue &&

                    <div style={{maxHeight:"330px"}} className="gifs mx-10 mt-4 flex-wrap overflow-auto flex items-start justify-evenly">
                        
                        {gifSearchValue && gifData.length ?  
                            gifData.map((gif, index)=>{ 
                                return(
                                    <div key={index} className='mt-2 cursor-pointer' style={{width:"180px", height:"200px"}}
                                        onClick={() => {setGif(gif.images.original.url); setGIFComponent(false); setGifSection(false)}}>
                                         <motion.img whileTap={{scale:0.9}} src={!gif.images.original.url ? "Loading.." : gif.images.original.url} alt="URL GIF"  className='text-black h-full w-full rounded-md' /> 
                                    </div> 
                                )})
                                : gifSearchValue && !gifData ? <div className='mt-2 font-semibold'>Searching...</div>
                                : <div className='mt-2 font-semibold' >No images found for "{gifSearchValue}"</div>}
                            { gifData.length ? <motion.button whileTap={{ scale: 0.9 }} onClick={fetchGifsFromGiphy} className='mt-2 border text-sm my-1 px-2 py-1 rounded-md border-black text-black'>Load more</motion.button> : ""}
                    </div>
                }

                <div className="inputs text-center mx-10 mt-6">
                    <input type="text" className="input input-bordered border-2 w-full" placeholder='Enter your name or post anonymously' value={creator} onChange={(e) => setCreator(e.target.value)}  />
                    <textarea style={{resize:"none"}} value={message} rows={4} className='w-full textarea textarea-bordered border-2 text-lg mt-3 outline-none px-4 py-5' type="text" name='message' required placeholder='(Required) Add a message...' onChange={(e) => setMessage(e.target.value)}  ></textarea>
                    <button disabled={ !message ? true : false} onClick={createPost} className='btn btn-lg glass font-light mt-4 hover:bg-black bg-black text-white text-2xl  rounded-lg'>{isLoading ? "Creating..." : "Create post"}</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default CreatePost