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

function Dashboard() {
    const [boards,setBoards] = useState([])
    const [isLimitReached, setIsLimitReached] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false) 
    const setClipboard = useClipboard();

    useEffect(()=>{
        fetchBoards()
    }, [])
    
    const fetchBoards = async () =>{
        setLoading(true)
        try {
            const email = localStorage.getItem('email')
            const response = await axios.get(`${process.env.basePath}/users/${email}`)
            const boards = response?.data?.boards || [];
            setBoards(boards.reverse());
             if (boards.length >= 3){
                setIsLimitReached(true)
            }else{
                setIsLimitReached(false)
            }
           
        } catch (error) {
            setLoading(false)
            setIsLimitReached(false)
        }finally{
            setLoading(false)
        }
    }

    const deleteBoard = async (boardId) => { 
        setIsDeleteLoading(true)
        try {
            const res = await axios.delete(`${process.env.basePath}/boards/${boardId}`)
            if(res.status === 200){
                localStorage.removeItem('title')
                localStorage.removeItem('modal')
                await fetchBoards()
                setIsDeleteLoading(false)
            }
        } catch (error) {
            setIsDeleteLoading(false)
        } finally{
            setIsDeleteLoading(false)
        }
    }

    const copyLink = (boardId) =>{
        setClipboard(`${process.env.copyLinkUrl}/boards/${boardId}`)
        toast.success('Link copied'); 
    }

  return (

    <div>


        <Toaster theme='system' richColors={true} position="top-center" />
        
        <Head>
            <title>Dashboard</title>
        </Head>

        <header className='fixed top-0 right-0 left-0 z-50 bg-white py-3 shadow'>
          
          <div className="flex items-center justify-between px-5 sm:px-10">

            <Link href='/'>
                <Image className='w-[70px]' src={Logo} alt='Logo' width={0} height={0}  sizes='(max-width: 200px) 100vw, 33vw'/>
            </Link>

            <div className='flex items-start justify-center space-x-5' >
                
                <div className="">
                    <Link href='/boards/user/dashboard' className=''> 
                        <motion.p whileTap={{scale:"0.9"}} 
                            className='transition-all text-lg text-[#2a9d8f] hover:bg-[#e9f0ef] rounded-md sm:px-2 py-[10px]'>Dashboard
                        </motion.p>
                        <p className='relative left-0 right-0 top-3 h-[4px] rounded-tl-full rounded-tr-full bg-[#2a9d8f]'></p>
                    </Link>
                </div> 
                
            {
                isLoading ? 
                    <div className='flex items-center'>
                        <Loader text="Processing..." size="xs" margin="2" color="black" />
                    </div>
                     :

                    <Link style={{color: isLimitReached ? '#2a9d8f' : 'white'}}
                        className={`btn max-sm:btn-sm btn-md rounded-md text-2xl sm:text-lg font-medium 
                        hover:bg-[#34bdad] 
                        ${isLimitReached ? "bg-gray-100" : "bg-[#2a9d8f]"} 
                        ${isLimitReached ? 'pointer-events-none' : ''}`} 
                        href='/boards/create'>{isLimitReached ? "You have reached the limit" : "Create a Praiseboard"}</Link>
            }
            </div>

          </div>
        </header>



        <div className={`all-boards ${boards.length > 0 ? 'pt-32' : ''} flex items-start justify-center py-4 bg-white`}>
                
                <div className="boards max-sm:hidden min-w-[600px] max-lg:mx-2 w-[900px]" data-offset='0' data-aos="fade-down"  data-aos-easing="ease-in-back" data-aos-duration="1000">
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
                                    formattedImage ? <Image className='rounded mt-2 w-[180px] h-[160px]' src={`${process.env.basePath}/images/${formattedImage}`} alt='board' width={0} height={0} sizes='(max-width: 200px) 100vw, 33vw'/>
                                    :  board.unsplash_image ? <Image className='rounded mt-2 w-[180px] h-[160px]' src={board.unsplash_image} alt='board' width={260} height={260} sizes='(max-width: 200px) 100vw, 33vw'/>
                                    : <div style={{backgroundColor: board.color}} className={`rounded mt-2 w-[180px] h-[160px]`} ></div>
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

                                        <Dropdown>
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
                                                <DropdownItem textValue='Cookie'>
                                                        <div className='delete' onClick={()=>document.getElementById('delete_modal_in_dashboard_for_big_screens').showModal()}>
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
                                                        <button onClick={() => deleteBoard(board._id)} className="btn hover:bg-red-500 bg-red-500 text-white">{isDeleteLoading ? "Processing..." : " Yes I'm sure"}</button>
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
                            <Loader color="black" size="lg" margin="2" />
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

                <div className="boards w-[900px] sm:hidden mx-4" data-offset='0' data-aos="fade-down"  data-aos-easing="ease-in-back" data-aos-duration="1000">
                    {boards.length ? <h1 className='text-lg md:text-xl xl:text-2xl'>All Praise boards</h1> : ""}
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
                                    <Image className='rounded w-full h-[250px] object-cover' 
                                        src={`${process.env.basePath}/images/${formattedImage}`} 
                                        alt='board' width={0} height={0} sizes='(max-width: 200px) 100vw, 33vw'/>
                                    :  board.unsplash_image ? 
                                        <Image className='rounded  w-full h-[250px] object-cover' 
                                            src={board.unsplash_image} 
                                            alt='board' width={260} height={260} sizes='(max-width: 200px) 100vw, 33vw'/>
                                    : <div style={{backgroundColor: board.color}} className={`rounded  w-full h-[250px] object-cover`} ></div>
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

                                            <Dropdown>
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
                                                    <DropdownItem textValue='Cookie'>
                                                            <div className='delete' onClick={()=>document.getElementById('delete_modal_in_dashboard_for_small_screens').showModal()}>
                                                                <MdDeleteOutline className='text-2xl' />  
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
                                                            <button onClick={() => deleteBoard(board._id)} className="btn hover:bg-red-500 bg-red-500 text-white">{isDeleteLoading ? "Processing..." : " Yes I'm sure"}</button>
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

                            <Loader color="black" size="lg" margin="2" />
                        </div> 
                    :
                        <div className='flex items-center justify-center h-screen flex-col'>
                            <h1 className='text-black text-3xl' >All Praiseboards</h1>
                            <p className='text-lg text-black mt-2' >All boards you can access appear here.</p>
                            <Link className='mt-4 text-white text-xl rounded-md bg-[#2a9d8f] shadow font-light btn btn-md hover:bg-[#34bdad] border-none hover:border-none' 
                                href='/boards/create' > <FaPlus/> Create a Praiseboard</Link>
                        </div>  

                    }
                </div>
        </div>

    </div>
  )
}

export default Dashboard
