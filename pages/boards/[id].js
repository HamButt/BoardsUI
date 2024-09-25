'use client'
import React , {useEffect, useState, useRef} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import {useRouter} from 'next/router'
import { Toaster,toast } from 'sonner';
import ConfettiImage from '../../public/confetti.jpg'
import Logo from '../../public/logo.png'
import 'animate.css';
import { AnimatePresence, motion } from "framer-motion";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import useClipboard from '@/hooks/useClipboard';
import { GetPostsApi } from '../../apis/GetPostsApi';
import { GetBoardApi } from '../../apis/GetBoardApi';
import { DeleteBoardApi } from '../../apis/DeleteBoardApi';
import { UpdateTitleApi } from '../../apis/UpdateTitleApi';
import BackgroundImageTab from '../../components/BackgroundImageTab';
import BackgroundColorTab from '../../components/BackgroundColorTab';
import { BsThreeDotsVertical, MdDeleteOutline, FaPlus, MdOutlineCheck, IoMdClose, MdOutlineModeEdit, IoLinkOutline , CiEdit, Confetti, Loader, Backdrop, IoShareOutline, HiOutlineMail,FaWhatsapp } from '../../components/BoardIcons'

function Post() {
    const router = useRouter()
    const [title,setTitle] = useState('')
    const [imageUrl,setImageUrl] = useState(null)
    const [uploadedImage,setUploadedImage] = useState(null)
    const [boardId,setBoardId] = useState('')
    const [posts,setPosts] = useState([])
    const [userCookie,setUserCookie] = useState('')
    const [recipient,setRecipient] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [openNav,setOpenNav] = useState(false)
    const [loading, setLoading] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const [welcomeModal, setWelcomeModal] = useState(true);
    const [sideComponent,setSideComponent] = useState('color')
    const [isImageLoading, setIsImageLoading] = useState(false)
    const setClipboard = useClipboard();
    const inputRef = useRef(null)

    const fetchPosts = async (boardId) => {
        setLoading(true);
        const modal = localStorage.getItem('modal')
        const res = await GetPostsApi(boardId)
        if(res.data.allPosts.length > 0){
            setPosts(res.data.allPosts.reverse())
        }else if(!modal){
            Confetti()
        }
        else if(modal === boardId){
            setWelcomeModal(false)
        }
        setLoading(false);
    }

    const fetchBoard = async (boardId) => {
        const res = await GetBoardApi(boardId)
        const board = res.data.board
        console.log(board)
        const capitilizeTitle = capitalizeTitle(board.title)
        setTitle(capitilizeTitle)
        setRecipient(board.recipient)
        if(board.uploaded_image){
            const boardImage = Buffer.from(board.uploaded_image.data)
            setUploadedImage(`${process.env.basePath}/images/${boardImage}`)
        }else if(board.unsplash_image){
            setImageUrl(board.unsplash_image)
        }else{
            document.body.style.backgroundColor = board.color
        }
    }

    function capitalizeTitle(str) {
        const firstChar = str.charAt(0).toUpperCase();
        const restOfString = str.slice(1);
        return firstChar + restOfString;
    }
    
    useEffect(()=>{
        const cookie = localStorage.getItem('Creator')
        const board_id = window.location.pathname.split('/').reverse()[0]
        setUserCookie(cookie)
        setBoardId(board_id)
        
        fetchBoard(board_id)
        fetchPosts(board_id)
    }, [])
    
    
    useEffect(() => {
        if (inputRef.current) {
            adjustTextareaHeight(inputRef.current);
        }

        const timer = setTimeout(() => {
            updateTitle()
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [title]);

    const updateTitle = async () => {
        try {
            const res = await UpdateTitleApi(title,boardId)
            if (res.status === 200) {
                setTitle(title);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBoard = async () => {
        setIsLoading(true)
            const res = await DeleteBoardApi(boardId)
            if(res.status === 200){
                localStorage.removeItem('title')
                localStorage.removeItem('modal')
                navigateUserTo404()
                setIsLoading(false)
            }
    }

    const navigateUserTo404 = () => {
        router.push('/404');
    }

    const copyLink = (boardId) =>{
        setClipboard(`${process.env.copyLinkUrl}/boards/${boardId}`)
        toast.success('Board link copied'); 
    }

    const navigationToPage = () => {
        setIsNavigating(true)
    }

    const handleWelcomeModal = () => {
        localStorage.setItem('modal', boardId)
        setWelcomeModal(false)
    }
    
    const focusOnInput = () => {
        inputRef.current.focus();
    }

    const handleBackground = (backgroundImage) => {
        setIsImageLoading(true)
        setImageUrl(backgroundImage)
        setIsImageLoading(false)
    }

    const handleTitleInput = (e) => {
        setTitle(e.target.value);
        adjustTextareaHeight(e.target)
    }

    const adjustTextareaHeight = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (

        <div className={`board-screen`} style={{backgroundImage:`url(${ imageUrl ? imageUrl : uploadedImage})`}}>
    
            <Toaster theme='system' richColors={true} position="top-center" />
    
            <Head>
                <title>Posts</title>
            </Head>

            {isImageLoading && 
        
                <Backdrop/>
            }

            <nav className={`nav-bar`}>
                
                {userCookie ? 
                
                <div className="ps-4 sm:ps-8">
                    <Link href='/boards/user/dashboard' className=''> 
                        <motion.p whileTap={{scale:"0.9"}} className='transition-all text-lg text-[#2a9d8f] hover:bg-[#e9f0ef] rounded-lg px-2 py-1'>Dashboard</motion.p>
                    </Link>
                </div> 
                : 
                <div className="logo ps-8">
                    <Link href='/' className=''> 
                        <Image src={Logo} alt='Logo' width={50} height={50}/>
                    </Link>
                </div>
                }

                <div className={`max-sm:hidden flex items-center justify-center text-lg`}>Add posts for 
                    { recipient ? <p className='ms-1 capitalize'> { recipient } </p> : <div className="skeleton h-5 w-32 ms-2 rounded-md"></div>}
                </div>

                <div className="header-buttons space-x-1 flex items-end"> 
                    
                    <Link onClick={navigationToPage} href={`/boards/${boardId ?? router.query.id}/post/create`} 
                        className='add-a-post-button '>
                        {isNavigating ? <span className="loading loading-dots loading-md text-[#FF9669]"></span>
                            : 
                            <>
                                <FaPlus /> Add a post
                            </>
                            }
                    </Link>
                    
                    <Dropdown>
                        <DropdownTrigger>
                            <Button  className={`pop-up`}>
                                <BsThreeDotsVertical/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Static Actions" className='py-2 mt-1 shadow-xl bg-white rounded-md'>
                            <DropdownItem textValue='Copy'>
                                <div className='copy' onClick={()=>document.getElementById('share-board').showModal()}>
                                    <IoShareOutline className="text-black share-button text-[22px] cursor-pointer" />
                                    <button className="text-sm font-semibold ps-3 text-black text-[14px] " >Share board</button>
                                </div>
                            </DropdownItem>
                            <DropdownItem textValue='Customise'>
                                <div onClick={() => {setOpenNav(true)}} className='customise '>
                                    <CiEdit  className="text-black share-button text-[22px] cursor-pointer" />
                                    <p className='text-sm font-semibold ps-2 text-black text-[14px]'>Customise board</p>
                                </div>
                            </DropdownItem>
                            <DropdownItem textValue='Cookie'>
                                { userCookie && 
                                    <div className='delete' onClick={()=>document.getElementById('delete_modal').showModal()}>
                                        <MdDeleteOutline className='text-2xl' />  
                                        <p className='text-sm font-semibold ps-3'>Delete board</p>
                                    </div>
                                }
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    
                    <dialog id="share-board" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="text-xl text-black">Share {recipient}'s board | {title} </h3>
                            <div className="mt-5 flex items-center justify-center space-x-3" >
                                <motion.div whileTap={{scale:0.9, transition: { duration: 1 }}} className="border-2 cursor-pointer rounded-md hover:border-[#FF9669] w-36 py-7 flex items-center flex-col" onClick={() => copyLink(boardId)}>
                                    <IoLinkOutline className='text-[22px]' />
                                    <button className="text-[16px] mt-2 text-black" >Copy link</button>
                                </motion.div>
                                <motion.div whileTap={{scale:0.9, transition: { duration: 1 }}} className="border-2 cursor-pointer rounded-md hover:border-[#FF9669] w-36 py-7 flex items-center flex-col" onClick={(e) => {window.open(`mailto:?body=${process.env.copyLinkUrl}/boards/${boardId}`)}}>
                                    <HiOutlineMail className='text-[22px]' />
                                    <button className="text-[16px] mt-2 text-black" >Email</button>
                                </motion.div>
                                <motion.div whileTap={{scale:0.9, transition: { duration: 1 }}} className="border-2 cursor-pointer rounded-md hover:border-[#FF9669] w-36 py-7 flex items-center flex-col" onClick={() => {
                                    window.open(`https://wa.me/?text=${process.env.copyLinkUrl}/boards/${boardId}`, '_blank')}}>
                                    <FaWhatsapp className='text-[22px]' />
                                    <button className="whatsapp-button text-[16px] mt-2 text-black"> 
                                        WhatsApp
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </dialog>

                    <dialog id="delete_modal" className="modal">
                        <div className="modal-box">
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

            {loading ? 
                <div className='flex items-center justify-center h-screen'>
                    <Loader color="#FF9669" size="lg"/>
                </div>
                    
                :
                
                <div>
                
                    <div  className="mt-14 bg-gray-300 max-sm:py-3 py-6 "  data-offset='0' data-aos="fade-down"  data-aos-easing="ease-in-back" data-aos-duration="1000">
                        <div className='sm:hidden text-black text-md flex items-center justify-center py-3'>Add posts for 
                            { recipient ? <p className='ms-1 capitalize'> { recipient } </p> : <div className="skeleton h-5 w-32 ms-2 rounded-md"></div>}
                        </div>

                        <div className="text-center editable-element flex items-center justify-center">
                            <div className="title max-sm:w-[300px] sm:w-[500px] md:w-[600px] lg:w-[800px]">
                            
                                <textarea style={{resize:"none"}}  ref={inputRef} type="text" value={title} name='title' onChange={handleTitleInput} 
                                className='title-teaxtarea' rows={1} spellCheck={true}></textarea>
                                <button onClick={focusOnInput} className="edit-button"> <MdOutlineModeEdit/> </button>
                                
                            </div>
                        </div>
                    </div>
                                
                    <div className="posts-section flex items-center justify-center" data-offset='0' data-aos="fade-down"  data-aos-easing="ease-in-back" data-aos-duration="1000">

                        {posts.length > 0 ? 

                            <div className="board-posts grid grid-cols-12 py-2 place-items-start" >
                                {posts.map((post,index) => {
                                
                                const formattedImage = post.image ? Buffer.from(post.image.data) : null
                                                            
                                return (
                                        <div key={post._id} className="user-posts"  >
                                            {
                                                formattedImage || post.giphy || post.video || post.unsplashImage ? 
                                            
                                                <div>
                                                    
                                                    <div className="post w-full" >
                                                        
                                                        { formattedImage ?
                                                            
                                                                <Image sizes='(max-width: 200px) 100vw, 33vw' 
                                                                    className='post-uploaded-image rounded-t-lg w-full' 
                                                                    src={`${process.env.basePath}/images/${formattedImage}`} 
                                                                    alt="Post image" width={0} height={0}/>
                                                            
                                                            : post.giphy ?

                                                                <img 
                                                                    fetchPriority="high" 
                                                                    className='post-gif rounded-t-lg' 
                                                                    src={post.giphy} alt="GIF" /> 
                                                            
                                                            : post.unsplashImage ?

                                                                <Image 
                                                                    sizes='(max-width: 200px) 100vw, 33vw' 
                                                                    fetchPriority="high" 
                                                                    className='object-cover rounded-t-lg unsplash-image' 
                                                                    src={post.unsplashImage} alt="unsplashImage" width={0} height={0}/>
                                                            : 
                                                                <iframe className='youtube-video rounded-t-lg' src={post.video} ></iframe>
                                                        }
                                                    </div>

                                                    <div className="message py-3">
                                                        <p className='text-lg sm:text-xl mx-5 text-white'>{post.message}</p>
                                                        <p className='text-sm flex pe-4 flex-1 items-end justify-end mt-5 text-white'>{post.creator ? `Added by ${post.creator}` : "Anonymous"}</p>
                                                    </div>
                                                </div>
                                                
                                                : 
                                                
                                                <div className="ps-4 px-3 py-6 bg-[#2a9d8f] rounded-lg shadow-md">
                                                    <p className='text-md sm:text-lg text-white'>{post.message}</p>
                                                    <p className='text-sm flex flex-1 items-end justify-end mt-4  text-white'>{post.creator ? `Added by ${post.creator}` : "Anonymous"}</p>
                                                </div>

                                            }
                                        </div> 
                                        )
                                })}
                            </div>

                            : welcomeModal ? 
                            <div className='welcome-modal'>
                                <div className='welcome-modal-child' style={{ width: "440px", maxWidth: "600px", height: "410px" }}>
                                    <button onClick={handleWelcomeModal} className='close-button' ><IoMdClose/></button>
                                    <Image src={ConfettiImage} alt='Confetti' className='' width={350} height={200}/>
                                    <div className="mt-5">
                                        <h3 className="font-bold text-lg sm:text-2xl px-3">Welcome to the praise board of</h3>
                                        <p className="font-semibold mt-1 text-lg sm:text-xl capitalize">{recipient}</p>
                                        <Link onClick={navigationToPage} href={`/boards/${boardId ?? router.query.id}/post/create`} 
                                            className='add-your-post-cta'>
                                            
                                            {isNavigating ? 
                                                <span className="loading loading-dots loading-md lg:loading-lg text-[#FF9669]"></span>
                                            : "Add your post"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        : ''}
                            
                            
                    </div>
                </div>
            }
            

            
            <Link style={{ boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px"}} 
                data-tip="Create Board" href='/boards/create'
                className='create-board-button ' > <FaPlus/> </Link>

            <div id="mySidenav" className={` sidenav bg-white `} style={{marginRight: openNav ? "0" : "-30rem"}}>
                <div className={`flex flex-1 justify-end pe-5`}>
                    <button onClick={() => {setOpenNav(false); }} className='text-gray-800 text-3xl m-0'>&times;</button>
                </div>
                <h1 className='text-black text-xl text-center'>Set background</h1>
                
                <div className='customise-board-side-bar' >
                    <div 
                        className={` background-image  text-${sideComponent === 'color' ? 'black' : 'gray-500'}
                        bg-${sideComponent === 'color' ? 'white' : ''} `} onClick={() => setSideComponent('color')}>
                        Color
                    </div>
                    <div 
                        className={` background-color 
                        bg-${sideComponent === 'image' ? 'white' : ''} text-${sideComponent === 'image' ? 'black' : 'gray-500'} 
                        transition-all ease-linear`} onClick={() => setSideComponent('image')}>
                        Image
                    </div>
                </div>

                <div className='mt-4 px-6'>
                    {
                        sideComponent === "image" ? 
                            <BackgroundImageTab
                                handleBackground={handleBackground}
                                fetchBoard={fetchBoard}
                                setSideComponent={setSideComponent}
                                setAnimateModal={setAnimateModal}
                                setOpenNav={setOpenNav} 
                                setUploadedImage={setUploadedImage} 
                                uploadedImage={uploadedImage}
                                imageUrl={imageUrl} 
                                setImageUrl={setImageUrl} 
                                boardId={boardId} 
                            /> : 
                            <BackgroundColorTab 
                                imageUrl={imageUrl} 
                                setImageUrl={setImageUrl} 
                                setOpenNav={setOpenNav} 
                                setUploadedImage={setUploadedImage} 
                                setAnimateModal={setAnimateModal}
                                boardId={boardId}
                            />
                    }
                </div>
            </div> 


            {animateModal && 
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setAnimateModal(false)}
                        className="animated-modal"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: "10deg" }}
                            animate={{ scale: 1, rotate: "0deg" }}
                            exit={{ scale: 0, rotate: "0deg" }}
                            onClick={(e) => e.stopPropagation()}
                            className="animated-modal-div"
                        >
                        <div className="relative z-10">
                            <div className="animated-modal-icon">
                                <MdOutlineCheck />
                            </div>
                            <h3 className="text-3xl font-bold text-center mb-2">Background updated</h3>
                            <p className="text-center mb-6">Your background is updated successfully</p>
                            <div className="flex gap-2">
                                <button onClick={() => setAnimateModal(false)} className="bg-transparent hover:bg-white/10 transition-colors
                                text-white font-semibold w-full py-2 rounded"> Close </button>
                                
                            </div>
                        </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            }
        </div> 
          
    )

}

export default Post