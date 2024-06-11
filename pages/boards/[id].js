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


function Post() {
    const router = useRouter()
    const [title,setTitle] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const [uploadedImage,setUploadedImage] = useState('')
    const [boardId,setBoardId] = useState('')
    const [posts,setPosts] = useState([])
    const [userCookie,setUserCookie] = useState('')
    const [totalPost,setTotalPost] = useState('')
    const [recipient,setRecipient] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [openNav,setOpenNav] = useState(false)
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
            setPosts(res.data.allPosts.reverse())
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
        router.push(`/boards/${boardId}`)
        }).catch((err) => {
            console.log(err);
            setIsLoading(false)
        }).finally(() =>{
            setIsLoading(false)
        })
    }

    const copyLink = (postsLink) =>{
        navigator.clipboard.writeText(`http://localhost:3000/boards/${postsLink}`);
        toast.success('Link copied');
    }

  return (
    <div className={`min-h-screen h-full w-full`} style={{backgroundImage:`url(${uploadedImage ? uploadedImage : imageUrl})`, backgroundRepeat:"no-repeat",backgroundAttachment:"fixed", backgroundSize:'cover',backgroundPosition:"center"}}>
        
        <Head>
            <title>Posts</title>
        </Head>

        <nav  id='' className={`bg-gray-200 z-50 py-3 flex items-center justify-between fixed top-0 right-0 left-0 transition-all duration-300`}>
            <div className="logo text-xl ps-10">
                <Link href='/' className="text-2xl text-[#202459]"> eBoards</Link>
            </div>

            <Toaster theme='system' richColors={true} closeButton={true}  position="center-right" />

            <div className="header-buttons space-x-5 flex items-end pe-4"> 
                {userCookie &&
                <>
                    <p className='m-0 p-0 font-semibold'>Posts {totalPost === 0 ? "0" : totalPost} - of 40 </p>
                    <button onClick={() => deleteBoard()} className='btn btn-sm hover:bg-transparent bg-transparent border border-[#202459]  text-[#202459] text-lg '>
                            {isLoading ? "Processing..." : " Delete Board"}
                    </button>
                </>
                }
                <Link href={`/boards/${boardId ?? router.query.id}/ecard/create`} 
                className='btn btn-sm  glass bg-[#202459] text-lg text-white font-light hover:bg-[#202459] rounded-lg '>+ Add a card</Link>
                
                <span  className='tooltip tooltip-left' data-tip="Share Board" >
                    <FaShare  className=" text-[#202459] text-xl  share-button cursor-pointer" onClick={() => copyLink(boardId)} />
                </span>
                <span  className='tooltip tooltip-left' data-tip="Edit Board" >
                    <CiEdit onClick={() => setOpenNav(true)} className=" text-[#202459] text-xl share-button cursor-pointer" />
                </span>
          </div>
        </nav>

        <div className="selected-title bg-[#202459]  mt-10 pt-8 pb-4">
            <p className='m-0 p-0 font-light text-white ms-10 '>Add cards for <span className=''>{recipient}</span></p>
                
            <div className="text-center editable-element hover:bg-[#4149b4] bg-[##202459] ">
                <input  type="text" value={title} name='title' onChange={(e) => setTitle(e.target.value)} 
                    className=' focus:border w-full text-3xl outline-none py-2 text-center bg-transparent text-white cursor-pointer'  />
            </div>
        </div>

        <div className="image-section px-10" data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">

            <div className="image flex items-start justify-start flex-wrap" >
                { posts.length ? 
                    posts.map((post,index) => {
                        
                        let formattedImage;
                        if(post.image){
                            formattedImage = Buffer.from(post.image.data)
                        }
                        
                        return (
                            <div key={post._id}>
                                {
                                    formattedImage || post.giphy || post.video || post.unsplashImage ? 
                                
                                <div style={{width: "400px",  height:"auto"}} className="post  bg-[#202459] p-2 my-5 ms-3 rounded-lg shadow-md " >
                                    
                                    <div className="post-image">
                                       
                                        { formattedImage ? 
                                            (<Image className='rounded-lg'
                                            sizes='(max-width: 200px) 100vw, 33vw'
                                            src={`${process.env.basePath}/images/${formattedImage}`}
                                            fetchPriority="high"
                                            alt={formattedImage} width={500} height={500}/>)
                                           
                                            : post.giphy ?
                                           ( <img fetchPriority="high" className='rounded-lg' src={post.giphy} alt="GIF" style={{width:"500px", height:"400px"}} />)
                                           
                                            : post.unsplashImage ?
                                           ( 
                                            <div style={{height:"400px"}} >
                                                <Image sizes='(max-width: 200px) 100vw, 33vw' fetchPriority="high" className='object-cover rounded-lg w-full h-full' src={post.unsplashImage} alt="unsplashImage" width={0} height={0}/>
                                            </div>
                                            )
                                           
                                            : (<iframe className='rounded-lg' width="385" height="217" src={post.video} ></iframe>)
                                        }
                                    </div>

                                    <div className="message py-4">
                                        <p className='text-xl ms-5 text-white'>{post.message}</p>
                                        <p className='text-sm flex flex-1  items-end justify-end mt-4  text-white'>{post.creator ? `Added by ${post.creator}` : "Anonymous"}</p>
                                    </div>

                                </div>
                                
                                : post.message ? 
                                
                                <div className="mt-6 ms-4 px-3 py-6 bg-[#202459] rounded-lg shadow-md min-w-96">
                                    <p className='text-lg text-white'>{post.message}</p>
                                    <p className='text-sm flex flex-1 items-end justify-end mt-4  text-white'>{post.creator ? `Added by ${post.creator}` : "Anonymous"}</p>
                                </div>
                                   : "Loading your posts..." }
                            </div>
                        )
                    })
                :
                <div className='flex flex-1 flex-col items-center mt-40 justify-center'>
                    <p className='text-2xl' >No card created yet</p>
                    <Link href={`/boards/${boardId ?? router.query.id}/ecard/create`} 
                    className=' border border-black px-10 py-2 rounded-md text-xl font-semibold text-black mt-3 '>Add a card</Link>
                </div>
                
                }
            </div>
        </div>
        
        <Link style={{padding:"5px 16px", boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px"}} data-tip="Create Board" href='/boards/create' className='rounded-full text-5xl bg-white board-btn cursor-pointer tooltip tooltip-left fixed bottom-3 right-3  ' >+</Link>

        <div id="mySidenav" className="sidenav bg-white " style={{marginRight: openNav ? "0" : "-30rem"}}>
            <button onClick={() => setOpenNav(false)} className='text-gray-800 text-end pe-5 w-full text-3xl m-0'>&times;</button>
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