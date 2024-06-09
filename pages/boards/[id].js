'use client'
import React , {useEffect, useState} from 'react'
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Swal from 'sweetalert2'
import CircularProgress from '@mui/material/CircularProgress';
import { MdDeleteOutline } from "react-icons/md";
import Cookies from 'js-cookie';
import {useRouter} from 'next/router'
import { Toaster,toast } from 'sonner';
import { RiShare2Line } from "react-icons/ri";
import { format } from 'timeago.js';

function Post() {
    const router = useRouter()
    const [title,setTitle] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const [boardId,setBoardId] = useState('')
    const [posts,setPosts] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [userCookie,setUserCookie] = useState('')
    const [totalPost,setTotalPost] = useState('')
    const [boardCreationTime,setBoardCreationTime] = useState('')
    const [boardCreatorName,setBoardCreatorName] = useState('')
    const [lastPostCreationTime,setLastPostCreationTime] = useState('')
    const [recipient,setRecipient] = useState('')

  
    // Fetching Board
    useEffect(()=>{
        const cookie = Cookies.get('Creator');
        setUserCookie(cookie)
        const board_id = window.location.pathname.split('/').reverse()[0];
        setBoardId(board_id)
        if(board_id){
            axios.get(`${process.env.basePath}/boards/${board_id}`)
            .then((res) => {
                const boardImage = Buffer.from(res.data.board.image)
                setTitle(res.data.board.title)
                setTotalPost(res.data.board.post)
                setBoardCreatorName(res.data.board.creator_name)
                setRecipient(res.data.board.recipient)
                const options = { 
                    year: 'numeric', 
                    month: 'long', 
                    day: '2-digit' 
                };
                const date = new Date(res.data.board.created_at)
                const formattedDate = date.toLocaleDateString('en-US', options)
                setBoardCreationTime(formattedDate)
                setLastPostCreationTime(res.data.board.last_post_created_at)
                setImageUrl(`${process.env.basePath}/images/${boardImage}`)
            }).catch((err) => {
                console.log(err);
            })
        }

        axios.get(`${process.env.basePath}/posts/${board_id}`)
        .then((res) => {
            setPosts(res.data.allPosts.reverse())
            console.log(res.data.allPosts)
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
    <div className={`min-h-screen h-full w-full`} style={{backgroundImage: `url(${imageUrl})`,backgroundRepeat:"no-repeat",backgroundAttachment:"fixed", backgroundSize:'cover',backgroundPosition:"center"}}>
        
        <Head>
            <title>All Posts</title>
        </Head>

        <nav  id='header' className={`bg-gray-200 z-50 py-3 flex items-center justify-between px-10 fixed top-0 right-0 left-0 transition-all duration-300`}>
            <div className="logo text-xl">
                <Link href='/' className="text-2xl text-[#202459]"> eBoards</Link>
            </div>
              
            {userCookie && <p className='m-0 p-0 font-semibold'>Posts {totalPost === 0 ? "0" : totalPost} - Limit 40 </p>}
            <p className='m-0 p-0 font-semibold'>Last Post {totalPost === 0 ? "Not yet" : format(lastPostCreationTime)}</p>
            <p className='m-0 p-0 font-semibold'>Creator {boardCreatorName}</p>
            <p className='m-0 p-0 font-semibold'>Created at {boardCreationTime}</p>
            <p className='m-0 p-0 font-semibold'>Recipient {recipient}</p>

            <div className="header-buttons space-x-5 flex items-end "> 
                <Toaster theme='system' richColors={true}  position="bottom-left" />
                    <span  className='tooltip' data-tip="Share Board" >
                        <RiShare2Line className=" text-[#202459] text-xl  share-button cursor-pointer" onClick={() => copyLink(boardId)} />
                    </span>
               {userCookie && 
                <button onClick={() => deleteBoard()} className='btn btn-sm glass text-[#202459] text-lg '>
                        {isLoading ? "Processing..." : " Delete Board"}
                </button>
                }
                <Link href={`/boards/${boardId ?? router.query.id}/ecard/create`} className='btn btn-sm  glass bg-[#202459] text-lg text-white font-light hover:bg-[#202459] rounded-lg '>Add a card</Link>
          </div>
        </nav>

        <div className="selected-title bg-[#202459] text-center mt-10 pt-8 pb-4">
            <div className="editable-element hover:bg-[#4149b4] bg-[##202459] ">
                <input  type="text" value={title} name='title' onChange={(e) => setTitle(e.target.value)} 
                    className='focus:border w-full text-3xl outline-none py-2 text-center bg-transparent text-white cursor-pointer'  />
            </div>
        </div>

           
        <div className="image-section px-10" data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">

            <div className="image flex items-start justify-start flex-wrap" >
                {posts ? 
                    posts.map((post,index) => {
                        
                        let formattedImage;
                        if(post.image){
                            formattedImage = Buffer.from(post.image.data)
                        }
                        
                        return (
                                <div style={{width:"400px", height:"auto"}} className="post  bg-[#202459] p-2 my-5 ms-3 rounded-lg shadow-md " key={post._id}>
                                    <div className="post-image">
                                       
                                        { formattedImage ? 
                                            (<Image className='rounded-lg'
                                            src={`${process.env.basePath}/images/${formattedImage}`}
                                            alt={formattedImage} width={500} height={500}/>)
                                            : post.giphy ?
                                           ( <img className='rounded-lg' src={post.giphy} alt="GIF" style={{width:"500px", height:"400px"}} />)
                                        :
                                        (<iframe className='rounded-lg mt-2' width="385" height="217" src={post.video} frameborder="0" ></iframe>)
                                        }
                                    </div>

                                    <div className="message py-4">
                                        <p className='text-xl ms-5 text-white'>{post.message}</p>
                                        <p className='text-sm flex flex-1  items-end justify-end mt-4  text-white'>{post.creator ? `Added by ${post.creator}` : "Anonymous"}</p>
                                    </div>
                                </div>
                        )
                    })
                : 
                <div className='flex flex-1 items-center mt-40 justify-center'>
                    <svg width={0} height={0}>
                        <defs>
                        <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#e01cd5" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                        </linearGradient>
                        </defs>
                    </svg>
                    <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
                </div>
                }
            </div>
        </div>
        
        <Link data-tip="Create Board" href='/boards/create' className=' board-btn cursor-pointer tooltip tooltip-left fixed bottom-3 right-3  shadow-md' >
            <p className='bg-white rounded-full px-4 py-2 text-4xl'>+</p>
        </Link>
        
    </div>
  )
}

export default Post