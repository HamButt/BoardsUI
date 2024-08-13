import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/logo.png'
import { format } from 'timeago.js';
import Loader from '@/components/Loader'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem ,Button} from "@nextui-org/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import useClipboard from '@/hooks/useClipboard';
import { Toaster,toast } from 'sonner';
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ImBlocked } from "react-icons/im";
import HeartIcon from '@/Icons/HeartIcon'
import { GetDashboardBoardsApi } from '../../../apis/GetDashboardBoardsApi'
import { DeleteBoardApi } from '@/apis/DeleteBoardApi'

function Dashboard() {
    const [boards,setBoards] = useState([])
    const [isLimitReached, setIsLimitReached] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false) 
    const [boardIdToDelete, setBoardIdToDelete] = useState(null);
    const setClipboard = useClipboard();

    useEffect(()=>{
        fetchBoards()
    }, [])
    
    const fetchBoards = async () =>{
        setLoading(true)
            const userId = localStorage.getItem('userId')
            const response = await GetDashboardBoardsApi(userId, setLoading)
            const boards = response?.data?.boards || [];
            setBoards(boards.reverse());
            boards.length >= 3 ? setIsLimitReached(true) : setIsLimitReached(false)
        setLoading(false)
    }

    const deleteBoard = async (boardId) => { 
        setIsDeleteLoading(true)
        try {
            const res = await DeleteBoardApi(boardId)
            if(res.status === 200){
                localStorage.removeItem('title')
                localStorage.removeItem('modal')
                await fetchBoards()
                setIsDeleteLoading(false)
                setTimeout(()=>{
                    toast.success('Board deleted'); 
                },1000)
            }
            setIsDeleteLoading(false)
        } catch (error) {
            setIsDeleteLoading(false)
        }
    }

    const copyLink = (boardId) =>{
        setClipboard(`${process.env.copyLinkUrl}/boards/${boardId}`)
        toast.success('Link copied'); 
    }

    const addToFavorite = async (boardId) => {
        try {
            
            const userId = localStorage.getItem('userId')
            const favoriteBoard = {
                boardId, userId
            }
            const response = await axios.put(`${process.env.basePath}/favorites`, favoriteBoard)
            if(response.status === 200){
                toast.success('Board added to favorites'); 
            }
        } catch (error) {
            console.error(error);   
        }
    }

    useEffect(()=>{
        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
        isDeleteLoading && toast.promise(promise, {
            loading: 'Deleting board',
        }); 
    }, [isDeleteLoading])

  return (

    <>

        <Head>
            <title>Dashboard</title>
        </Head>
        
        <Toaster theme='system' richColors={true} position="top-center" />

        {isDeleteLoading ? <Toaster theme='system' richColors={true} position="top-center" /> : ""}


        <header className='transition-all fixed top-0 right-0 left-0 z-50 bg-white py-3 shadow'>
          
          <div className="flex items-center justify-between ps-5 pe-2 sm:ps-10 sm:pe-4">

            <Link href='/'>
                <Image className='w-[55px] sm:w-[70px]' src={Logo} alt='Logo' width={0} height={0}  sizes='(max-width: 200px) 100vw, 33vw'/>
            </Link>

            <div className='flex items-end sm:items-center justify-center space-x-2'>
                

                <Link href='/boards/user/dashboard' className='transition-all sm:hover:bg-gray-100 sm:p-2 rounded-md'> 
                    <motion.button whileTap={{scale:"0.9"}} 
                    className='text-[#2a9d8f] border-none sm:text-lg sm:font-medium'>Dashboard</motion.button>
                    <p className='relative left-0 right-0 top-[14px] sm:top-5 h-[4px] rounded-tl-full rounded-tr-full bg-[#2a9d8f]'></p>
                </Link>

                <Link href='/boards/favorites' 
                    className='btn max-sm:btn-sm transition-all hover:bg-[#34bdad] bg-[#2a9d8f] font-medium px-2 py-1 sm:p-2 border-none shadow-none rounded-md'> 
                    <motion.button whileTap={{scale:"0.9"}} 
                    className='text-white border-none sm:text-lg sm:font-medium'>Favorites</motion.button>
                </Link>
                
            {
                isLoading ? 
                <>

                    <div className='max-sm:hidden flex items-center justify-center'>
                        <Loader text="Processing..." size="xs" margin="2" color="#FF9669" />
                    </div>

                    <div className='sm:hidden flex items-center justify-center'>
                        <Loader size="xs" margin="2" color="#FF9669" />
                    </div>
                </>
                     :
                    <>
                    
                        {/* FOR LARGE SCREENS */}
                        
                        <Link style={{color: isLimitReached ? 'black' : 'white'}}
                            className={`btn max-sm:hidden sm:btn-md rounded-md text-2xl sm:text-lg font-medium hover:bg-[#34bdad] border-none shadow-none
                            ${isLimitReached ? "bg-gray-100" : "bg-[#2a9d8f]"} 
                            ${isLimitReached ? 'pointer-events-none' : ''}`} 
                            href='/boards/create'>{isLimitReached ? "Limit exceeded"  : "Create a Praiseboard"}</Link>
                        
                        {/* FOR SMALL SCREENS */}

                        <Link style={{color: isLimitReached ? '#2a9d8f' : 'white'}}
                            className={`btn sm:hidden btn-sm rounded-md font-medium 
                            hover:bg-[#34bdad] 
                            ${isLimitReached ? "bg-gray-100" : "bg-[#2a9d8f]"} 
                            ${isLimitReached ? 'pointer-events-none' : ''}`} 
                            href='/boards/create'>{isLimitReached ?  <ImBlocked className='text-black' /> : <FaPlus/>}</Link>
                    </>
            }
            </div>

          </div>

        </header>

        <div className={`all-boards ${boards.length > 0 ? 'pt-32' : ''} flex items-start justify-center py-4 bg-white`}>

                {/* FOR LARGE SCREENS */}
                
                <div className={`boards max-sm:hidden min-w-[600px] max-lg:mx-2 w-[900px] `} data-offset='0' data-aos="fade-down"  data-aos-easing="ease-in-back" data-aos-duration="1000">
                    {boards.length ? <h1 className='text-lg md:text-xl xl:text-2xl'>All Praise boards</h1> : ""}
                    {boards.length > 0 ? boards.map((board,index)=> {
                        
                        const formattedImage = board.uploaded_image ? Buffer.from(board.uploaded_image) : null
                        const date = new Date(board.created_at);
                        const options = { year: 'numeric', month: 'long', day: 'numeric' };
                        const boardCreationDate = date.toLocaleDateString('en-US', options);
                        
                        return (
                        
                            <div  className="board border transition-all board mt-3 rounded-lg flex items-start w-full py-4 px-3" key={board._id}>
                                
                                <div className="board_image" >
                                {
                                    formattedImage ? 

                                        <Image className='border rounded mt-1 w-[180px] h-[160px]' 
                                        src={`${process.env.basePath}/images/${formattedImage}`} alt='board' 
                                        width={0} height={0} sizes='(max-width: 200px) 100vw, 33vw'/>

                                    :  board.unsplash_image ? 

                                        <Image className='border rounded mt-1 w-[180px] h-[160px]' 
                                            src={board.unsplash_image} alt='board' 
                                            width={260} height={260} sizes='(max-width: 200px) 100vw, 33vw'/>

                                    : <div style={{backgroundColor: board.color}} className={`border rounded mt-1 w-[180px] h-[160px]`} ></div>
                                }
                                </div>

                                <div className='flex items-start justify-between flex-1 ms-6'>
                                    
                                    <div className="details">
                                        <div className="flex">
                                            <p className='text-xl text-black' >{board.title}</p>
                                        </div>
                                        <div className='mt-2 flex items-center'>
                                            <p className='text-gray-400 text-sm font-light' >For</p>
                                            <p className='ms-4 text-black' >{board.recipient}</p>
                                        </div>
                                        <div className='mt-1 flex items-center '>
                                            <p className='text-gray-400 text-sm font-light' >Creator</p>
                                            <p className='ms-8 text-black' >{board.creator_name}</p>
                                        </div>
                                        <div className='mt-1 flex items-center '>
                                            <p className='text-gray-400 text-sm font-light' >Created</p>
                                            <p className='ms-7 text-black' >{boardCreationDate}</p>
                                        </div>
                                        <div className='mt-1 flex items-center '>
                                            <p className='text-gray-400 text-sm font-light' >Posts</p>
                                            <p className='ms-12 text-black' >{board.post} <span className='text-xs' >(Max-30)</span> <Link href={`/boards/${board._id}/post/create`} className='text-sm text-[#2a9d8f]' >add new post</Link> </p>
                                        </div>
                                        <div className='mt-1 flex items-center '>
                                            <p className='text-gray-400 text-sm font-light' >Last post</p>
                                            <p className='ms-6 text-black' >{board.last_post_created_at ? format(board.last_post_created_at) : "No post created"}</p>
                                        </div>
                                    
                                    </div>

                                    <div className='flex items-center space-x-1'>
                                        <Link className='text-white rounded-md bg-[#2a9d8f] font-medium btn btn-sm hover:bg-[#34bdad] border-none shadow-none hover:border-none' 
                                        href={`/boards/${board._id}`} >View board</Link>

                                        <Dropdown className='-mt-[2px]'>
                                            <DropdownTrigger>
                                                <Button className={`pop-up`}>
                                                    <BsThreeDotsVertical/>
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu variant="faded" aria-label="Static Actions" className='py-2 border shadow-sm bg-white rounded-md'>
                                                <DropdownItem textValue='Copy'>
                                                    <div className='copy' onClick={() => copyLink(board._id)}>
                                                        <MdContentCopy className="text-black share-button text-[17px] cursor-pointer"  />
                                                        <p className='text-sm font-semibold ps-3 text-black' >Copy board link</p>
                                                    </div>
                                                </DropdownItem>
                                                <DropdownItem textValue='Customise'>
                                                    <Link href={`/boards/${board._id}`} className='customise'>
                                                        <CiEdit  className="text-black text-[22px] cursor-pointer" />
                                                        <p className='text-sm font-semibold ps-2 text-black '>Customise board</p>
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem textValue='Add to favorites'>
                                                    <div onClick={() => addToFavorite(board._id)} className='add-to-favorite'>
                                                        <HeartIcon/>
                                                        <p className='text-sm font-semibold ps-2 text-black'>Add to favorites</p>
                                                    </div>
                                                </DropdownItem>
                                                <DropdownItem textValue='Cookie'>
                                                        <div className='delete' 
                                                            
                                                            onClick={()=>{setBoardIdToDelete(board._id); document.getElementById('delete_modal_in_dashboard_for_big_screens').showModal()}}>
                                                            <MdDeleteOutline className='text-2xl' />  
                                                            <p className='text-sm font-semibold ps-3 '>Delete board</p>
                                                        </div>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>

                                        <dialog id="delete_modal_in_dashboard_for_big_screens" className="modal">
                                            <div className="modal-box">
                                                <p className="py-4">Are you sure you want to delete this?</p>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        <button onClick={() => deleteBoard(boardIdToDelete)} 
                                                            className="btn hover:bg-red-500 bg-red-500 text-white">Yes I'm sure</button>
                                                        <button className="btn ms-2 bg-green-500 hover:bg-green-500 text-white">No I'm not</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </div>

                                </div>

                            </div>
                        )
                    })
                        
                    : isLoading ?
                        <div className='flex items-center justify-center h-screen'>
                            <Loader color="#FF9669" size="lg" margin="2" />
                        </div> 
                    :
                        <div className='flex items-center justify-center h-screen flex-col'>
                            <h1 className='text-black text-3xl' >All Praiseboards</h1>
                            <p className='text-lg text-black mt-2' >All boards you can access appear here.</p>
                            <Link className='mt-4 text-white text-xl rounded-md bg-[#2a9d8f] shadow font-light btn btn-md hover:bg-[#34bdad] border-none hover:border-none' 
                                href='/boards/create' > <FaPlus/>Create a Praiseboard</Link>
                        </div>
                    }
                </div>
                
                {/* FOR SMALL SCREENS */}

                <div className="boards w-[900px] sm:hidden mx-4" data-offset='0' data-aos="fade-down"  data-aos-easing="ease-in-back" data-aos-duration="1000">
                    {boards.length ? <h1 className='text-xl'>All Praise boards</h1> : ""}
                    {boards.length > 0 ? boards.map((board,index)=> {
                        
                        const formattedImage = board.uploaded_image ? Buffer.from(board.uploaded_image) : null
                        const date = new Date(board.created_at);
                        const options = { year: 'numeric', month: 'long', day: 'numeric' };
                        const boardCreationDate = date.toLocaleDateString('en-US', options);
                        
                        return (
                        
                            <div  className="board border transition-all board mt-3 rounded-lg w-full py-4 px-3" key={board._id}>
                                
                                <div className="board_image" >
                                {
                                    formattedImage ? 
                                    <Image className='border rounded w-full h-[250px] object-cover' 
                                        src={`${process.env.basePath}/images/${formattedImage}`} 
                                        alt='board' width={0} height={0} sizes='(max-width: 200px) 100vw, 33vw'/>
                                    :  board.unsplash_image ? 
                                        <Image className='border rounded  w-full h-[250px] object-cover' 
                                            src={board.unsplash_image} 
                                            alt='board' width={260} height={260} sizes='(max-width: 200px) 100vw, 33vw'/>
                                    : <div style={{backgroundColor: board.color}} className={`border rounded  w-full h-[250px] object-cover`} ></div>
                                }
                                </div>

                                <div className=''>
                                    
                                    <div className="mt-4 flex items-start justify-between flex-1">
                                        
                                        <div className='details'>

                                            <div className="flex">
                                                <p className='text-xl text-black' >{board.title}</p>
                                            </div>
                                            <div className='mt-2 flex items-center'>
                                                <p className='text-gray-400 text-sm font-light' >For</p>
                                                <p className='ms-4 text-black' >{board.recipient}</p>
                                            </div>
                                            <div className='mt-1 flex items-center '>
                                                <p className='text-gray-400 text-sm font-light' >Creator</p>
                                                <p className='ms-8 text-black' >{board.creator_name}</p>
                                            </div>
                                            <div className='mt-1 flex items-center '>
                                                <p className='text-gray-400 text-sm font-light' >Created</p>
                                                <p className='ms-7 text-black' >{boardCreationDate}</p>
                                            </div>
                                            <div className='mt-1 flex items-center '>
                                                <p className='text-gray-400 text-sm font-light' >Posts</p>
                                                <p className='ms-12 text-black' >{board.post} <span className='text-xs' >(Max-30)</span> <Link href={`/boards/${board._id}/post/create`} className='text-sm text-[#2a9d8f]' >add new post</Link> </p>
                                            </div>
                                            <div className='mt-1 flex items-center '>
                                                <p className='text-gray-400 text-sm font-light' >Last post</p>
                                                <p className='ms-6 text-black' >{board.last_post_created_at ? format(board.last_post_created_at) : "No post created"}</p>
                                            </div>

                                        </div>
                                        
                                        <div className=' flex items-center space-x-1'>
                                            <Link className='view-board-button-for-extra-small-in-user-dashboard text-white rounded-md bg-[#2a9d8f] font-medium btn btn-sm hover:bg-[#34bdad] border-none shadow-none hover:border-none' 
                                            href={`/boards/${board._id}`} >View board</Link>

                                            <Dropdown className='mb-1'>
                                                <DropdownTrigger>
                                                    <Button className={`pop-up`}>
                                                        <BsThreeDotsVertical/>
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu variant="faded" aria-label="Static Actions" className='py-2 border shadow-sm bg-white rounded-md'>
                                                    <DropdownItem textValue='Copy'>
                                                        <div className='copy' onClick={() => copyLink(board._id)}>
                                                            <MdContentCopy className="text-black share-button text-[17px] cursor-pointer"  />
                                                            <p className='text-sm font-semibold ps-3 text-black' >Copy board link</p>
                                                        </div>
                                                    </DropdownItem>
                                                    <DropdownItem textValue='Customise'>
                                                        <Link href={`/boards/${board._id}`} className='customise '>
                                                            <CiEdit  className="text-black share-button text-[22px] cursor-pointer" />
                                                            <p className='text-sm font-semibold ps-2 text-black '>Customise board</p>
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem textValue='Add to favorites'>
                                                        <div onClick={() => addToFavorite(board._id)} className='add-to-favorite '>
                                                            <HeartIcon/>
                                                            <p className='text-sm font-semibold ps-2 text-black '>Add to favorites</p>
                                                        </div>
                                                    </DropdownItem>
                                                    <DropdownItem textValue='Cookie'>
                                                    
                                                            <div className='delete' onClick={()=>{setBoardIdToDelete(board._id);document.getElementById('delete_modal_in_dashboard_for_small_screens').showModal()}}>
                                                                <MdDeleteOutline className='text-2xl'/>  
                                                                <p className='text-sm font-semibold ps-3 '>Delete board</p>
                                                            </div>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>

                                            <dialog id="delete_modal_in_dashboard_for_small_screens" className="modal">
                                                <div className="modal-box">
                                                    <p className="py-4">Are you sure you want to delete this?</p>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button onClick={() => deleteBoard(boardIdToDelete)} className="btn hover:bg-red-500 bg-red-500 text-white">Yes I'm sure</button>
                                                            <button className="btn ms-2 bg-green-500 hover:bg-green-500 text-white">No I'm not</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </div>
                                    </div>

                                    <div className='options-button-for-small-in-user-dashboard flex items-center space-x-1 mt-4 flex-1'>
                                        <Link className='text-white rounded-md bg-[#2a9d8f] font-medium btn btn-sm hover:bg-[#34bdad] border-none shadow-none hover:border-none' 
                                        href={`/boards/${board._id}`} >View board</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : isLoading ?
                        <div className='flex items-center justify-center h-screen'>

                            <Loader color="#FF9669" size="lg" margin="2" />
                        </div> 
                    :
                        <div className='flex items-center justify-center h-screen flex-col text-center'>
                            <h1 className='text-black text-3xl' >All Praiseboards</h1>
                            <p className='text-lg text-black mt-2' >All boards you can access appear here.</p>
                            <Link className='mt-4 text-white text-xl rounded-md bg-[#2a9d8f] shadow font-medium btn btn-md hover:bg-[#34bdad] border-none hover:border-none' 
                                href='/boards/create' > <FaPlus/> Create a Praiseboard</Link>
                        </div>  

                    }
                </div>

        </div>

    </>
  )
}

export default Dashboard
