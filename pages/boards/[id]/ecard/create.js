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
    const [gifData, setGifData] = React.useState([]);
    const [imageData, setImageData] = React.useState([]);
    const imageTypes = ["JPG", "PNG", "JPEG"];
    const gifType = ["GIF"];

    let offset = 0;
    let limit = 12;
    const gifUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.apiKey}&q=${gifSearchValue}&limit=${limit}&offset=${offset}&rating=g&lang=en`;
    
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
        setGifSection(true)

        if(gifSearchValue){
            clearTimeout(debounceTimerForGIf);
            const newDebounceTimer = setTimeout(() => {
                axios.get(gifUrl)
                .then(response => {
                    setGifData(response.data.data)
                })
                .catch(error => console.error('Error:', error));
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

    React.useEffect(()=>{
        if(imageSearchValue){
            setImageSection(true)
            setImagePage((imgPg) => imgPg + 1 )
            clearTimeout(debounceTimerForImage);
            const newDebounceTimer = setTimeout(() => {
                axios.get(process.env.unsplashUrl, { params })
                .then(response => {
                    console.log(response.data.results);
                    setImageData(response.data.results)
                })
                .catch(error => console.error('Error:', error));
                }, 500);
                setDebounceTimerForImage(newDebounceTimer);
              }
                
                return () => {
                    if (debounceTimerForImage) {
                        clearTimeout(debounceTimerForImage);
                        setImageData("")
            }};

       
    }, [imageSearchValue])

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
    <div className='min-h-screen h-full bg-[#202459] '>

        <Head>
            <title>Create card</title>
        </Head>

        <NavBar/>

        <div className="selected-title bg-[#4149b4] py-4 text-center ">
            <p className='text-2xl text-white' >{title}</p>
        </div>
        <div className='post flex items-center justify-center '>
            <div className="h-auto post-modal bg-white mt-5 py-8 rounded-lg w-6/12">
               
                <div className="back-link-arrow flex items-center ps-6 space-x-2">
                    <Link href={`/boards/${boardId}`} className='text-3xl' ><IoMdArrowRoundBack/></Link>
                    <p className='text-2xl'>Add a card</p>
                </div>

                <div className="uploding-section flex flex-col items-center justify-center mt-7">
                    <div className="buttons w-full flex itmes-center justify-center space-x-5">

                        <div className="dropdown dropdown-hover image-section">
                            <div className="btn border-indigo-600 w-44 text-indigo-600 "> <IoImages className='text-xl text-indigo-600' /> Add an image</div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                                <li onClick={() => {setImageComponent('upload'); setImageSection(false); setGIFComponent(false);  setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false);setGifData("")}}><a className='font-semibold'>Upload </a></li>
                                <li onClick={() => {setImageComponent('search'); setGIFComponent(false);  setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false);setGifData("")}}><a className='font-semibold'>Search</a></li>
                            </ul>
                        </div>
                        <div className="dropdown dropdown-hover gif-section">
                            <div className="btn border-pink-500 w-36 text-pink-500 "> <PiGifFill className='text-2xl text-pink-500' />Add a GIF</div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                                <li onClick={() => {setGIFComponent('upload'); setImageComponent(false); setImageSection(false);  setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false); setImageData("")}}><a className='font-semibold'>Upload </a></li>
                                <li onClick={() => {setGIFComponent('search'); setImageComponent(false); setImageSection(false); setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false);setImageData("")}}><a className='font-semibold'>Search</a></li>
                            </ul>
                        </div>

                        <button onClick={() => { setGIFComponent(false);setImageData("");setGifData(''); setImageComponent(false);  setImageSection(false); setVideoComponent(!videoComponent); setGifSection(false); setGif(false); setVideoInputHandling(false)}} className="btn social-buttons border-red-700 w-40 text-red-700"> <FaYoutube  className='text-2xl text-red-700' /> Add a video </button>
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

                    : "" }

                    {
                        imageSection && 

                    <div style={{maxHeight:"300px"}} className="mt-2 gifs mx-10 my-1 flex-wrap overflow-auto flex items-start justify-evenly">
                        
                        {imageSearchValue && imageData.length ?  
                            imageData.map((img, index)=>{ 
                                return(
                                    <div key={index} className='mt-2 cursor-pointer ' style={{maxWidth:"200px", height:"160px"}} 
                                        onClick={() => {setSplashImage(img.urls.regular); setImageComponent(false); setImageSection(false)}}>
                                        <img className='h-full w-full rounded-md' src={img.urls.small} alt="IMAGE URL" />
                                    </div> 
                                )})
                            : ""}
                    </div>
                }

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
                    gifSection && 

                    <div style={{maxHeight:"300px"}} className="gifs mx-10 my-1 flex-wrap overflow-auto flex items-start justify-evenly">
                        
                        {gifSearchValue && gifData.length ?  
                            gifData.map((gif, index)=>{ 
                                return(
                                    <div key={index} className='border-2 mt-2 cursor-pointer' style={{maxWidth:"180px"}} 
                                        onClick={() => {setGif(gif.images.original.url); setGIFComponent(false); setGifSection(false)}}>
                                        <img src={gif.images.original.url} alt="URL GIF" className='h-full w-full' />
                                    </div> 
                                )})
                            : ""}
                    </div>
                }

                <div className="inputs text-center mx-10 mt-6">
                    <input type="text" className="input input-bordered border-2 w-full" placeholder='Enter your name or post anonymously' value={creator} onChange={(e) => setCreator(e.target.value)}  />
                    <textarea style={{resize:"none"}} value={message} rows={4} className='w-full textarea textarea-bordered border-2 text-lg mt-3 outline-none px-4 py-5' type="text" name='message' required placeholder='(Required) Add a message...' onChange={(e) => setMessage(e.target.value)}  ></textarea>
                    <button disabled={!videoLink && !message || !image && !message || !gif && !message ? true : false} onClick={createPost} className='btn glass font-light mt-4 hover:bg-[#202459] bg-[#202459] text-white text-xl w-2/4  rounded-lg'>{isLoading ? "Creating..." : "Create card"}</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default CreatePost