'use client'
import React , {useEffect, useState} from 'react'
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router'
import { Toaster,toast } from 'sonner';
import { FaShare } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import BackgroundImageTab from '@/components/BackgroundImageTab';
import BackgroundColorTab from '@/components/BackgroundColorTab';
import Confetti from '../../public/confetti.jpg'
import Logo from '../../public/logo.png'
import Swal from 'sweetalert2'
import 'animate.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import { motion } from 'framer-motion'
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import Copy from '../../public/copy.png'
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

function Post() {
    const router = useRouter()
    const [title,setTitle] = useState('')
    const [imageUrl,setImageUrl] = useState(null)
    const [uploadedImage,setUploadedImage] = useState('')
    const [boardId,setBoardId] = useState('')
    const [posts,setPosts] = useState([])
    const [userCookie,setUserCookie] = useState('')
    const [totalPost,setTotalPost] = useState('')
    const [recipient,setRecipient] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [openNav,setOpenNav] = useState(false)
    const [modal,setModal] = useState(false)
    const [isPopoverOpen,setIsPopoverOpen] = useState(true)
    const [sideComponent,setSideComponent] = useState('color')
    
    // Fetching Board
    useEffect(()=>{
        const cookie = Cookies.get('Creator');
        setUserCookie(cookie)
        const board_id = window.location.pathname.split('/').reverse()[0];
        setBoardId(board_id)
        if(board_id){
            axios.get(`${process.env.basePath}/boards/${board_id}`)
            .then((res) => {
                console.log(res.data.board);
                setTitle(res.data.board.title)
                setTotalPost(res.data.board.post)
                setRecipient(res.data.board.recipient)
                if(res.data.board.uploaded_image){
                    const boardImage = Buffer.from(res.data.board.uploaded_image.data)
                    setUploadedImage(`${process.env.basePath}/images/${boardImage}`)
                }else if(res.data.board.unsplash_image){
                    setImageUrl(res.data.board.unsplash_image)
                }else{
                    document.body.style.backgroundColor = res.data.board.color
                }
            }).catch((err) => {
                console.log(err);
            })
        }

        axios.get(`${process.env.basePath}/posts/${board_id}`)
        .then((res) => {
            if(res.data.allPosts.length){
                setPosts(res.data.allPosts.reverse())
            }else{
                setModal(true)
                const duration = 5 * 1000,
                animationEnd = Date.now() + duration,
                defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
                function randomInRange(min, max) {
                    return Math.random() * (max - min) + min;
                }
                const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
                const particleCount = 50 * (timeLeft / duration);

                confetti(
                    Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    })
                );

                confetti(
                    Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    })
                );
                }, 250);
            }
        }).catch((err) => {
            console.log(err);
        })

    }, [])
    
    useEffect(() => {
        const timer = setTimeout(() => {
            updateTitle()
        }, 5000);
    
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
            setTimeout(()=>{
                setIsLoading(false)
                router.push('/boards/create')
                }, 3000)
                  Swal.fire({
                    title: "Board deleted",
                    text: "Your Board is deleted successfully",
                    icon: "success",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
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

  return (
    <div className={`min-h-screen h-full w-full bg-fixed bg-no-repeat bg-cover bg-center transition-all ease-linear`} style={{backgroundImage:`url(${imageUrl ? imageUrl : uploadedImage})`}}>
        
        <Head>
            <title>Posts</title>
        </Head>

        <nav  id='' className={`bg-white z-50 py-3 flex items-center justify-between fixed top-0 right-0 left-0 transition-all duration-300`}>
            <div className="logo  ps-10">
                <Link href='/' className=""> 
                <Image src={Logo} className='m-0 p-0' alt='Logo' width={35} height={35} />
                </Link>
            </div>

            <Toaster theme='system' richColors={true} closeButton={true}  position="center" />

            <div className="header-buttons space-x-3 flex items-end pe-3"> 
                
                <Link href={`/boards/${boardId ?? router.query.id}/post/create`} 
                className='btn btn-sm bg-black font-normal text-md hover-shadow-xl text-white  border border-black hover:bg-black '><FaPlus /> Add a post</Link>

                <Popover placement="bottom" offset={15} color='default' showArrow={true}>
                    <PopoverTrigger onClick={() => setIsPopoverOpen(true)}>
                        <Button  className='bg-transparent m-0 px-2 border-gray-300 h-8 border rounded-lg outline-none '>
                            <BsThreeDotsVertical/>
                        </Button>
                    </PopoverTrigger>
                {isPopoverOpen && 
                    <PopoverContent >
                        <div className="py-2 w-50 shadow-xl px-4 bg-white rounded-md">
                            <div className="copy-and-customize  ">
                                <div className='copy  hover:bg-gray-100 flex items-center justify-start cursor-pointer rounded-md p-2' onClick={() => copyLink(boardId)}>
                                    <Image src={Copy} alt='Copy' width={20} height={20} className=" text-black share-button cursor-pointer"  />
                                    <p className='text-sm font-semibold ps-3' >Copy board link</p>
                                </div>
                                <div onClick={() => {setOpenNav(true); setIsPopoverOpen(false)}} className='edit hover:bg-gray-100 flex items-center justify-start  mt-2 cursor-pointer  rounded-md p-2'>
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
                            <button onClick={() => setIsPopoverOpen(true)} className="btn ms-2 bg-green-500 hover:bg-green-500 text-white">No I'm not</button>
                        </form>
                        </div>
                    </div>
                </dialog>
                
          </div>
        </nav>

        <div className="selected-title bg-gray-200  mt-10 pt-8 pb-4">
            <p className='m-0 p-0 font-semibold text-black ms-10 '>Add posts for <span>{recipient}</span></p>
                
            <div className="text-center editable-element hover:bg-gray-300  ">
                <input  type="text" value={title} name='title' onChange={(e) => setTitle(e.target.value)} 
                    className=' focus:border border-black w-full text-3xl outline-none py-2 text-center bg-transparent text-gray-600 hover:text-black cursor-pointer'  />
            </div>
        </div>

        <div className="image-section px-10" data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">

            <div className="image flex items-start justify-start flex-wrap" >
                { posts && 
                    posts.map((post,index) => {
                        
                        let formattedImage;
                        if(post.image){
                            formattedImage = Buffer.from(post.image.data)
                        }
                        
                        return (
                            <div key={post._id}>
                                {
                                    formattedImage || post.giphy || post.video || post.unsplashImage ? 
                                
                                <div style={{width: "400px",  height:"auto"}} className="post  bg-[#202459] my-5 ms-3 rounded-lg shadow-md " >
                                    
                                    <div className="post-image">
                                       
                                        { formattedImage ? 
                                            (<Image className='rounded-t-lg'
                                            sizes='(max-width: 200px) 100vw, 33vw'
                                            src={`${process.env.basePath}/images/${formattedImage}`}
                                            fetchPriority="high"
                                            alt={formattedImage} width={500} height={500}/>)
                                           
                                            : post.giphy ?
                                           ( <img fetchPriority="high" className='rounded-t-lg' src={post.giphy} alt="GIF" style={{width:"500px", height:"400px"}} />)
                                           
                                            : post.unsplashImage ?
                                           ( 
                                            <div style={{height:"400px"}} >
                                                <Image sizes='(max-width: 200px) 100vw, 33vw' fetchPriority="high" className='object-cover rounded-t-lg w-full h-full' src={post.unsplashImage} alt="unsplashImage" width={0} height={0}/>
                                            </div>
                                            )
                                           
                                            : (<iframe className='rounded-t-lg' width="400" height="220" src={post.video} ></iframe>)
                                        }
                                    </div>

                                    <div className="message py-5">
                                        <p className='text-xl mx-4 text-white'>{post.message}</p>
                                        <p className='text-sm flex pe-4 flex-1 items-end justify-end mt-8 text-white'>{post.creator ? `Added by ${post.creator}` : "Anonymous"}</p>
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
                    })
                }
                
                {modal && 
                    <div className='w-full h-screen flex items-start mt-10 justify-center'>
                        <div className=' bg-white flex items-center shadow-lg rounded-md justify-start flex-col' style={{width:"400px", maxWidth:"600px", height:"400px"}}>
                            <Image src={Confetti} alt='Confetti' className='mt-5' width={300} height={200} />
                            <h3 className="font-bold text-2xl mt-12">Welcome to the praise board of</h3>
                            <p className="font-semibold text-md mt-1">{recipient}</p>
                            <Link href={`/boards/${boardId ?? router.query.id}/post/create`} 
                            className='btn hover:bg-black bg-black mt-5 text-white border border-black px-10 py-2 rounded-md text-xl font-light '>Add your post</Link>
                        </div>
                    </div>
                    }
                
            </div>
        </div>
        
        <Link style={{padding:"5px 16px", boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px"}} data-tip="Create Board" href='/boards/create' className='animate-pulse rounded-full text-5xl bg-white board-btn cursor-pointer tooltip tooltip-left fixed bottom-3 right-3  ' >+</Link>

        <div id="mySidenav" className="sidenav bg-white" style={{marginRight: openNav ? "0" : "-30rem"}}>
            <div className='flex flex-1 justify-end pe-5'>
                <button onClick={() => {setOpenNav(false); setIsPopoverOpen(true)}} className='text-gray-800 text-3xl m-0'>&times;</button>
            </div>
            <h1 className='text-black text-xl text-center'>Set background</h1>
            
            <div className='rounded-md flex text-center mt-4 items-center justify-center p-1 mx-2 bg-gray-100' >
                <div 
                    className={` images py-1 rounded-md text-sm font-semibold text-${sideComponent === 'color' ? 'black' : 'gray-500'}
                    bg-${sideComponent === 'color' ? 'white' : ''} flex-1 cursor-pointer
                    transition-all ease-linear`} onClick={() => setSideComponent('color')}>Color</div>
                <div 
                className={` colors py-1 rounded-md text-sm font-semibold
                bg-${sideComponent === 'image' ? 'white' : ''} text-${sideComponent === 'image' ? 'black' : 'gray-500'} flex-1 text-md  cursor-pointer
                transition-all ease-linear`} onClick={() => setSideComponent('image')}>Image</div>
            </div>
            <div className='mt-4 px-6'>
                {sideComponent === "image" ? <BackgroundImageTab setOpenNav={setOpenNav} setUploadedImage={setUploadedImage} imageUrl={imageUrl} setImageUrl={setImageUrl} boardId={boardId} /> : <BackgroundColorTab setOpenNav={setOpenNav} setUploadedImage={setUploadedImage} setImageUrl={setImageUrl} boardId={boardId}/>}
            </div>
        </div>
    </div>
  )
}

export default Post
