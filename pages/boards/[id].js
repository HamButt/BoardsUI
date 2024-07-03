'use client'
import React , {useEffect, useState} from 'react'
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import {useRouter} from 'next/router'
import { Toaster,toast } from 'sonner';
import { CiEdit } from "react-icons/ci";
import BackgroundImageTab from '@/components/BackgroundImageTab';
import BackgroundColorTab from '@/components/BackgroundColorTab';
import ConfettiImage from '../../public/confetti.jpg'
import Logo from '../../public/logo.png'
import 'animate.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import Copy from '../../public/copy.png'
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import ImageLoading from '../../public/loading.gif'
import { getBoardApi } from '../../api/getBoardApi'
import { getPostsApi } from '../../api/getPostsApi'
import { Confetti } from '../../components/Confetti'
import { DeleteModal } from '../../components/DeleteModal';
import CircularProgress from '@mui/material/CircularProgress';

function Post() {
    const router = useRouter()
    const [title,setTitle] = useState('')
    const [imageUrl,setImageUrl] = useState(null)
    const [uploadedImage,setUploadedImage] = useState('')
    const [boardId,setBoardId] = useState('')
    const [posts,setPosts] = useState([])
    const [userCookie,setUserCookie] = useState('')
    const [recipient,setRecipient] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [openNav,setOpenNav] = useState(false)
    const [isPopover,setIsPopover] = useState(true)
    const [loading, setLoading] = useState(false);
    const [handleNavigating, setHandleNavigating] = useState(false);
    const [sideComponent,setSideComponent] = useState('color')
    
    // Fetching Board
    useEffect(()=>{
        const cookie = localStorage.getItem('Creator')
        setUserCookie(cookie)
        const board_id = window.location.pathname.split('/').reverse()[0];
        setBoardId(board_id)

        if(board_id){
            getBoardApi(board_id)
            .then((res) => {
                const board = res.data.board
                setTitle(board.title)
                setRecipient(board.recipient)
                if(board.uploaded_image){
                    const boardImage = Buffer.from(board.uploaded_image.data)
                    setUploadedImage(`${process.env.basePath}/images/${boardImage}`)
                }else if(board.unsplash_image){
                    setImageUrl(board.unsplash_image)
                }else{
                    document.body.style.backgroundColor = board.color
                }
            }).catch((err) => {
                console.log(err);
            })
        }

        getPostsApi(board_id)
        .then((res) => {
            setLoading(true);
            if(res.data.allPosts.length){
                setPosts(res.data.allPosts.reverse())
            }else{
                Confetti()
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() =>{
            setLoading(false);
        }) 

    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            updateTitle()
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [title]);

    const updateTitle = () => {
        if(title){
        axios.patch(`${process.env.basePath}/posts/${title}/${boardId}`)
            .then((res) => {
            if (res.status === 200) {
                setTitle(title);
            }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const deleteBoard = () =>{
        setIsLoading(true)
        axios.delete(`${process.env.basePath}/boards/${boardId}`)
        .then((res) => {
            setIsLoading(false)
            router.push('/boards/create')
            DeleteModal()
        }).catch((err) => {
            console.log(err);
        }).finally(() =>{
            setIsLoading(false)
        })
    }

    const copyLink = (postsLink) =>{
        navigator.clipboard.writeText(`http://localhost:3000/boards/${postsLink}`);
        toast.success('Link copied');
    }

    const navigationToPage = () => {
        setHandleNavigating(true)
    }

  return (
    <div className={`min-h-screen h-full w-full bg-fixed bg-no-repeat bg-cover bg-center transition-all ease-linear`} style={{backgroundImage:`url(${imageUrl ? imageUrl : uploadedImage})`}}>
        
        <Head>
            <title>Posts</title>
        </Head>

        <nav  className={`bg-white z-50 py-3 flex flex-wrap items-center justify-between fixed top-0 right-0 left-0 transition-all duration-300`}>
            <div className="logo ps-10">
                <Link href='/' className=""> 
                    <Image src={Logo} className='m-0 p-0' alt='Logo' width={45} height={45} />
                </Link>
            </div>

            <Toaster theme='system' richColors={true} closeButton={true}  position="center" />

            <div className="header-buttons space-x-3 flex items-end pe-3"> 
                
                <Link onClick={navigationToPage} href={`/boards/${boardId ?? router.query.id}/post/create`} 
                className='btn btn-sm bg-black font-normal text-md hover-shadow-xl text-white  border border-black hover:bg-black '>
                <FaPlus /> {handleNavigating ? 
                
                    <>
                        <svg width={20} height={20}>
                        <defs>
                            <linearGradient  x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2a9d8f" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                            </linearGradient>
                        </defs>
                        </svg>
                        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
                    </>
                    : "Add a post"}</Link>

                <Popover placement="bottom" offset={15} color='default' showArrow={true}>
                    <PopoverTrigger>
                        <Button  className='bg-transparent m-0 px-2 border-gray-300 h-8 border rounded-lg outline-none '>
                            <BsThreeDotsVertical/>
                        </Button>
                    </PopoverTrigger>
                { isPopover && 
                    <PopoverContent>
                        <div className="py-2 w-50 shadow-xl px-4 bg-white rounded-md">
                            <div className="copy-and-customize  ">
                                <div className='copy  hover:bg-gray-100 flex items-center justify-start cursor-pointer rounded-md p-2' onClick={() => copyLink(boardId)}>
                                    <Image src={Copy} alt='Copy' width={20} height={20} className=" text-black share-button cursor-pointer"  />
                                    <p className='text-sm font-semibold ps-3' >Copy board link</p>
                                </div>
                                <div onClick={() => {setOpenNav(true); setIsPopover(false)}} className='edit hover:bg-gray-100 flex items-center justify-start  mt-2 cursor-pointer  rounded-md p-2'>
                                    <CiEdit  className="text-black share-button text-2xl cursor-pointer" />
                                    <p className='text-sm font-semibold ps-3'>Customise board</p>
                                </div>
                                { userCookie && 
                                <div className='delete bg-red-500 hover:bg-red-500 cursor-pointer flex items-center justify-start  mt-2 rounded-md p-2 hover:border-red-700 border-red-700 text-white ' onClick={()=>document.getElementById('delete_modal').showModal()}>
                                    <MdDeleteOutline className='text-2xl' />  
                                    <p className='text-sm font-semibold ps-3 '>Delete board</p>
                                </div>
                                }
                            </div>
                        </div>
                    </PopoverContent>
                        }
                </Popover>

                <dialog id="delete_modal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">You going to delete this board</h3>
                        <p className="py-4">Are you sure you want to delete this?</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button onClick={deleteBoard} className="btn hover:bg-red-500 bg-red-500 text-white">{isLoading ? "Processing..." : " Yes I'm sure"}</button>
                                <button className="btn ms-2 bg-green-500 hover:bg-green-500 text-white">No I'm not</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                
            </div>

        </nav>

        <div className=" bg-[#2a9d8f]  mt-10 pt-8 pb-4">
            <div className='m-0 p-0 font-semibold text-black ms-10 flex items-center'>Add posts for 
              { recipient ? <p className='ms-1'> { recipient } </p> : <div className="skeleton h-5 w-32 ms-2 rounded-md"></div>}
            </div>
                
            <div className="text-center editable-element hover:bg-[#1CB5E0] ">
                {title ? <input  type="text" value={title} name='title' onChange={(e) => setTitle(e.target.value)} 
                    className=' focus:border border-black w-full text-3xl outline-none py-2 text-center bg-transparent
                     text-white hover:text-black cursor-pointer'  /> : 
                     <div className="skeleton h-10 rounded-md w-80 mt-2 mx-auto pt-2 font-semibold"></div>
                     }
            </div>
        </div>

        <div className="posts-section flex justify-center" data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">

            {posts.length > 0 ? 
                <div className="board-posts grid grid-cols-12 py-2 place-items-start" >
                    {posts.map((post,index) => {
                    
                    let formattedImage;
                    if(post.image){
                        formattedImage = Buffer.from(post.image.data)
                    }
                    
                    return (
                            <div key={post._id} className="user-posts col-span-12 md:col-span-6 w-[330px] sm:w-[450px] md:w-[380px] lg:w-[320px] xl:w-[410px]  lg:col-span-4 mt-3 bg-[#202459] mx-2 rounded-lg shadow-md">
                            {
                                formattedImage || post.giphy || post.video || post.unsplashImage ? 
                            
                            <div>
                                
                                <div className="post w-full">
                                    
                                    { formattedImage ? 
                                        (<Image className={`post-uploaded-image rounded-t-lg w-full`}
                                        sizes='(max-width: 200px) 100vw, 33vw'
                                        src={formattedImage.length ? `${process.env.basePath}/images/${formattedImage}` : ImageLoading}
                                        fetchPriority="high"
                                        alt={formattedImage} width={0} height={0}/>)
                                        
                                        : post.giphy ?

                                        <>
                                            { post.giphy.length ?
                                            <img fetchPriority="high" className='post-gif rounded-t-lg' src={post.giphy} alt="GIF" /> 
                                            :<Image sizes='(max-width: 200px) 100vw, 33vw' fetchPriority="high" width={0} height={0} className='post-gif rounded-t-lg' src={ImageLoading} alt="GIF" />
                                            }
                                        </>
                                        
                                        : post.unsplashImage ?
                                        ( 
                                            <Image sizes='(max-width: 200px) 100vw, 33vw' fetchPriority="high" className='object-cover rounded-t-lg unsplash-image' src={post.unsplashImage.length ? post.unsplashImage : ImageLoading} alt="unsplashImage" width={0} height={0}/>
                                        )
                                        
                                        : 
                                        <>
                                            { post.video.length ?
                                            <iframe className='youtube-video rounded-t-lg' src={post.video} ></iframe>
                                            :<Image sizes='(max-width: 200px) 100vw, 33vw' fetchPriority="high" width={0} height={0} className='post-gif rounded-t-lg' src={ImageLoading} alt="GIF" />
                                            }
                                        </>
                                    }
                                </div>

                                <div className="message py-3">
                                    <p className='text-xl mx-5 text-white'>{post.message}</p>
                                    <p className='text-sm flex pe-4 flex-1 items-end justify-end mt-5 text-white'>{post.creator ? `Added by ${post.creator}` : "Anonymous"}</p>
                                </div>
                                        
                            </div>
                            
                            : 
                            
                            <div className="mt-6 ms-4 px-3 py-6 bg-[#202459] rounded-lg shadow-md min-w-96">
                                <p className='text-lg text-white'>{post.message}</p>
                                <p className='text-sm flex flex-1 items-end justify-end mt-4  text-white'>{post.creator ? `Added by ${post.creator}` : "Anonymous"}</p>
                            </div>

                                }
                            </div> 
                    )
                })}
                </div>
                : loading ? 

                <div className='flex items-center justify-center h-screen'>
                    <progress className="progress w-96 h-4"></progress>
                </div>
                :
                <div className=' w-full h-screen flex items-start mt-10 justify-center'>
                    <div className='bg-white flex text-center items-center shadow-lg rounded-md justify-start flex-col mx-2' style={{ width: "420px", maxWidth: "600px", height: "400px" }}>
                        <Image src={ConfettiImage} alt='Confetti' className='mt-5' width={300} height={200}/>
                        <h3 className="font-bold text-lg sm:text-2xl mt-12 px-3">Welcome to the praise board of</h3>
                        <p className="font-semibold mt-1 text-lg sm:text-2xl">{recipient}</p>
                        <Link onClick={navigationToPage} href={`/boards/${boardId ?? router.query.id}/post/create`} 
                            className='btn hover:bg-black bg-black mt-5 text-white border border-black px-6 sm:px-10 py-1 sm:py-2 rounded-md text-md sm:text-xl font-light'>
                            {handleNavigating ? 
                                <>
                                    <svg width={40} height={40}>
                                        <defs>
                                            <linearGradient id='my_gradient'  x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#2a9d8f" />
                                            <stop offset="100%" stopColor="#1CB5E0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
                                </>
                             : "Add your post"}
                        </Link>
                    </div>
                </div> 
            }
                
                
        </div>
        
        <Link style={{ boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px"}} 
            data-tip="Create Board" href='/boards/create' 
            className='animate-pulse p-3 rounded-full text-2xl bg-white board-btn cursor-pointer tooltip tooltip-left fixed bottom-3 right-3' > <FaPlus/> </Link>


        <div id="mySidenav" className=" sidenav bg-white" style={{marginRight: openNav ? "0" : "-30rem"}}>
            <div className='flex flex-1 justify-end pe-5'>
                <button onClick={() => {setOpenNav(false); setIsPopover(true);}} className='text-gray-800 text-3xl m-0'>&times;</button>
            </div>
            <h1 className='text-black text-xl text-center'>Set background</h1>
            
            <div className='rounded-md flex text-center mt-4 items-center justify-center p-1 mx-2 bg-gray-100' >
                <div 
                    className={` images py-1 rounded-md text-sm font-semibold text-${sideComponent === 'color' ? 'black' : 'gray-500'}
                    bg-${sideComponent === 'color' ? 'white' : ''} flex-1 cursor-pointer
                    transition-all ease-linear`} onClick={() => setSideComponent('color')}>
                    Color
                </div>
                <div 
                    className={` colors py-1 rounded-md text-sm font-semibold
                    bg-${sideComponent === 'image' ? 'white' : ''} text-${sideComponent === 'image' ? 'black' : 'gray-500'} flex-1 text-md  cursor-pointer
                    transition-all ease-linear`} onClick={() => setSideComponent('image')}>
                    Image
                </div>
            </div>

            <div className='mt-4 px-6'>
                {
                    sideComponent === "image" ? 
                        <BackgroundImageTab 
                            setOpenNav={setOpenNav} 
                            setUploadedImage={setUploadedImage} 
                            imageUrl={imageUrl} 
                            setImageUrl={setImageUrl} 
                            boardId={boardId} 
                        /> : 
                        <BackgroundColorTab 
                            setOpenNav={setOpenNav} 
                            setUploadedImage={setUploadedImage} 
                            setImageUrl={setImageUrl} 
                            boardId={boardId}
                        />
                }
            </div>
        </div> 

    </div>
  )
}

export default Post
