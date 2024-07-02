'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IoMdArrowRoundBack } from "react-icons/io";
import { FileUploader } from "react-drag-drop-files"; 
import axios from 'axios';
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
    const [openErrorModal, setOpenErrorModal] = React.useState(false);
    
    // Unsplash params
    
    const params = {
        query: imageSearchValue,
        page:  imagePage,
        per_page: 12,
        client_id: process.env.clientId,
        orientation: 'portrait',
    };

    React.useEffect(()=>{
        
        if(gifSearchValue){
            setGifSection(true)
            clearTimeout(debounceTimerForGIf);
            const newDebounceTimer = setTimeout(() => {
                fetchGifsFromGiphy()
            }, 500);
                setDebounceTimerForGIf(newDebounceTimer);
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
                confetti({
                    particleCount: 200,
                    spread: 50,
                    origin: { y: 0.7 }
                })
                router.push(`/boards/${boardId}`)
            }
                setTimeout(() => {
                    setIsLoading(false)
                }, 3000);
        }).catch((err) => {
            if(err.response.status === 403){
                setOpenErrorModal(err.response.data.message)
                setIsLoading(false)
            }
        })
    }

    const handleUploadFiles = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImage(file);
        }
      };

    React.useEffect(()=>{
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
    <div className=' ' >

        <Head>
            <title>Create post</title>
        </Head>

        <div className="logo py-3 bg-white flex items-center justify-center">
            <Link href='/' className="">
                <Image src={Logo} alt='Logo' width={50} height={50}/>
            </Link>
        </div>

        <div className="title py-6 text-center bg-black">
            <p className='text-2xl text-white'>{title}</p>
        </div>
        

            <div className='post flex items-center justify-center bg-gray-800'>
                <div className='w-[650px] bg-white mt-5 py-8 rounded-lg  border-2 h-auto mx-2 ' data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">
                    <div className="post-modal">
                    
                        <div className="back-link-arrow flex items-center ps-6 space-x-2 ">
                            <Link href={`/boards/${boardId}`} className='text-3xl' ><IoMdArrowRoundBack/></Link>
                            <p className='text-2xl'>Add a post</p>
                        </div>

                        <div className="uploding-section flex flex-col items-center justify-center mt-5">
                            <div className="buttons flex items-center justify-center flex-wrap space-x-2 md:space-x-5">
                                
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button className='flex items-center justify-center mt-2 hover:bg-transparent hover:border-indigo-600 
                                            font-semibold bg-transparent border-indigo-600 text-indigo-600 border rounded-lg outline-none py-5 px-3'>
                                            <IoImages className='text-lg md:text-[16px] text-indigo-600'/>  
                                            <span className='text-sm md:text-[15px] ms-2 p-0'>Add an image</span>
                                            <IoIosArrowDown className='ms-1 text-lg md:text-[16px] text-indigo-600' />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu variant="faded" aria-label="Static Actions" className='bg-white rounded-md border shadow-xl py-2'>
                                        <DropdownItem textValue='Upload'>
                                            <div className='upload  hover:bg-indigo-100 flex items-center justify-start cursor-pointer rounded-md p-2'>
                                                <MdDriveFolderUpload className='text-xl text-indigo-600' />
                                                <p className='text-sm font-semibold ps-3' onClick={() => {setImageComponent('upload'); setImageSection(false); setGIFComponent(false);  setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false);setGifData("")}} >Upload image</p>
                                            </div>
                                        </DropdownItem>
                                        <DropdownItem textValue='Search'>
                                            <div className='search hover:bg-indigo-100 flex items-center justify-start  mt-2 cursor-pointer  rounded-md p-2'>
                                                <RiStackFill className='text-xl text-indigo-600' />
                                                <p className='text-sm font-semibold ps-3' onClick={() => { setImageComponent('search'); setGIFComponent(false);  setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false);setGifData("")}}>Search with unsplash</p>
                                            </div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button className='flex items-center mt-2 justify-center hover:bg-transparent hover:border-pink-600 font-semibold 
                                            bg-transparent border-pink-600 text-pink-600 border rounded-lg outline-none py-5 px-3'>
                                            <PiGifFill className='text-lg md:text-[16px] text-pink-600' />
                                            <span className='text-sm md:text-[15px] ms-2 p-0'>Add a GIF</span>
                                            <IoIosArrowDown className='ms-1 text-lg md:text-[16px] text-pink-600' />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Static Actions" className='bg-white rounded-md border shadow-xl py-2'>
                                        <DropdownItem textValue='Upload'>
                                            <div className='upload  hover:bg-pink-100 flex items-center justify-start cursor-pointer rounded-md p-2'>
                                                <MdDriveFolderUpload className='text-xl text-pink-600' />
                                                <p className='text-sm font-semibold ps-3' onClick={() => {setGIFComponent('upload'); setImageComponent(false); setImageSection(false);  setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false); setImageData("")}} >Upload GIF</p>
                                            </div>
                                        </DropdownItem>
                                        <DropdownItem textValue='Search'>
                                            <div className='search hover:bg-pink-100 flex items-center justify-start mt-2 cursor-pointer rounded-md p-1 md:p-2'>
                                                <RiStackFill className='text-xl text-pink-600' />
                                                <p className='text-sm font-semibold ps-3' onClick={() => {setGIFComponent('search'); setImageComponent(false); setImageSection(false); setVideoComponent(false); setGifSection(false); setGif(false); setVideoInputHandling(false);setImageData("")}}>Search with giphy</p>
                                            </div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                    
                                <Button onClick={() => { setGIFComponent(false);setImageData("");setGifData(''); setImageComponent(false);  
                                    setImageSection(false); setVideoComponent(!videoComponent); setGifSection(false); setGif(false);
                                    setVideoInputHandling(false)}} className="mt-2 flex items-center justify-center font-semibold rounded-lg outline-none social-buttons 
                                    border border-red-700 text-red-700 bg-transparent hover:bg-transparent hover:border-red-700 py-5 px-3"> 
                                    <FaYoutube  className='text-lg md:text-[16px] text-red-700' />
                                    <span className='text-sm md:text-[15px] ms-2 p-0'> Add a video </span> 
                                </Button>
                            </div>
                        </div>
                        
                        <div className="file-uploader mx-10 mt-6 flex flex-col items-center justify-center">

                            { imageComponent === "upload" ?
                            <div className='text-center mt-4'>
                                
                                <p className='font-semibold'>Please upload images that are appropriate for all audiences. We reserve the right to remove content without notice!</p>
                                
                                <label htmlFor="file" className="labelFile border-2 border-gray-300 rounded-lg px-4 "><span><BsCloudUpload className="text-2xl" /></span>
                                    <div className='mt-2 w-full'>
                                        <p className='upload-image' >drag and drop your image file here or click to select a file</p>
                                        <p className='text-end text-xs font-semibold mt-3' >JPG, PNG, JPEG</p>
                                    </div>
                                </label>                         
                                <input accept='.png,.jpg,.jpeg' className="upload-input" name="image" id="file" type="file" onChange={handleUploadFiles} />

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

                            <div className='text-center'>
                                <div style={{maxHeight:"300px"}} className="mt-2 gifs mx-10 my-1 flex flex-wrap overflow-auto items-start justify-evenly">
                                    {imageSearchValue && imageData.length ?  
                                        imageData.map((img, index)=>{ 
                                            return(
                                                <div key={index} className='mt-2 cursor-pointer max-sm:w-[80px] max-sm:h-[90px] sm:w-[100px] sm:h-[120px] md:w-[150px] md:h-[170px]'
                                                    onClick={() => {setSplashImage(img.urls.regular); setImageComponent(false); setImageSection(false)}}>
                                                    <motion.img whileTap={{scale:0.9}} className='h-full w-full rounded-md' src={img.urls.small} alt="IMAGE URL" />
                                                </div> 
                                            )})
                                        :  imageSearchValue && !imageData ? <div className='mt-2 font-semibold'>Searching...</div> 
                                        : <div className='mt-2 font-semibold' >No images found for "{imageSearchValue}"</div>
                                        }
                                </div>
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
                                <div className='text-center mt-4'>
                                    <p className='font-semibold font-md'>Please upload GIFs that are appropriate for all audiences. We reserve the right to remove content without notice!</p>
                                    <label htmlFor="file" className="labelFile border-2 border-gray-300 rounded-lg px-4 "><span><BsCloudUpload className="text-2xl" /></span>
                                        <div className='mt-2 w-full'>
                                            <p className='upload-gif'>drag and drop your GIF here or click to select</p>
                                            <p className='text-end text-xs font-semibold' >GIF</p>
                                        </div>
                                    </label>                         
                                    <input accept='image/gif' className="upload-input" name="image" id="file" type="file" onChange={handleUploadFiles} />
                                </div>
                                : 

                            GIFCompnent === "search" ? 
                                <div className='mt-4'>
                                    <p className='font-semibold font-md'>Add more specific GIF terms to your search if you don't find what you're looking for</p>
                                    <input name='gif' type="search" className="mt-3 input input-bordered border-2 w-full" value={gifSearchValue} placeholder={`Search ${title} GIF`} onChange={(e) => setGifSearchValue(e.target.value)} /> 
                                </div>
                                : ""
                            }

                            {videoComponent && 
                                <div className='text-center mt-4 w-full'>
                                    <p className='font-semibold'>Copy the youtube video url from share button e.g.</p>
                                    <p className='font-semibold text-xs text-gray-500 mt-1' >https://www.youtube.com/embed/V5qRp8ZXm44?si=......</p>
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
                                            
                                            <div key={index} className='mt-2 cursor-pointer  w-[120px] h-[130px] md:w-[180px] md:h-[200px]'
                                                onClick={() => {setGif(gif.images.original.url); setGIFComponent(false); setGifSection(false)}}>
                                                <motion.img 
                                                    whileTap={{scale:0.9}} 
                                                    className=' h-full w-full rounded-md' 
                                                    src={gif.images.original.url} alt="URL GIF"  
                                                    />
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

        {openErrorModal && 
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpenErrorModal(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-red-400 to-red-700 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                    <FiAlertCircle className="text-white/10 rotate-12 text-[250px]  absolute z-0 -top-24 -left-24" />
                    <div className="relative z-10">
                        <div className="bg-red-400 w-16 h-16 mb-2 rounded-full text-3xl text-red-600 grid place-items-center mx-auto">
                            <FiAlertCircle />
                        </div>
                        <h3 className="text-3xl font-bold text-center mb-2">Limit reached to an end</h3>
                        <p className="text-center mb-6">{openErrorModal}</p>
                        <div className="flex gap-2">
                            <button onClick={() => setOpenErrorModal(false)} className="bg-transparent hover:bg-white/10 transition-colors
                            text-white font-semibold w-full py-2 rounded"> Close </button>
                            <button disabled onClick={() => setOpenErrorModal(false)} className="bg-white  transition-opacity
                            text-red-600 font-semibold w-full py-2 rounded tooltip tooltip-top" data-tip="Coming soon">
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