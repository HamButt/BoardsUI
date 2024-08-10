'use client'
import React, {useEffect, useState} from 'react'
import axios  from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import {motion} from 'framer-motion'
import Loader from '@/components/Loader'
import { FaPlus } from "react-icons/fa6";
import Logo from '../../public/logo.png'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem ,Button} from "@nextui-org/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { format } from 'timeago.js';
import { MdDeleteOutline } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { Toaster,toast } from 'sonner';
import useClipboard from '@/hooks/useClipboard';
function Favorites() {
    const [boards,setBoards] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false) 
    const [boardIdToRemove, setBoardIdToRemove] = useState(null)
    const setClipboard = useClipboard();

    useEffect(()=>{
        getBoards()
    }, [])

    const getBoards = async () => {
        setLoading(true)
        try {
            const userId = localStorage.getItem('userId')
            const response = await axios.get(`${process.env.basePath}/favorites/${userId}`)
            setBoards(response.data.favoriteBoards)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const removeBoard = async (boardId) => { 
        setIsDeleteLoading(true)
        const userId = localStorage.getItem('userId')
        try {
            const res = await axios.delete(`${process.env.basePath}/favorites/api`,{
                data: { userId, boardId },
              })
            if(res.status === 200){
                await getBoards()
                setIsDeleteLoading(false)
                setTimeout(()=>{
                    toast.success('Board removed from favorites'); 
                },1000)
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

    useEffect(()=>{
        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
        isDeleteLoading && toast.promise(promise, {
            loading: 'Removing board from favorites',
        }); 

    }, [isDeleteLoading])

  return (
    <>
        <Toaster theme='system' richColors={true} position="top-center" />

        {isDeleteLoading ? <Toaster theme='system' richColors={true} position="top-center"/> : ""}

        <Head>
            <title>Favorite Boards</title>
        </Head>

        <header className='transition-all fixed top-0 right-0 left-0 z-50 bg-white py-3 shadow'>
            
            <div className="flex items-center justify-between ps-5 pe-2 sm:ps-10 sm:pe-4">

                <Link href='/'>
                    <Image className='w-[55px] sm:w-[70px]' src={Logo} alt='Logo' width={0} height={0}  sizes='(max-width: 200px) 100vw, 33vw'/>
                </Link>

                <div className='flex items-end sm:items-center justify-center space-x-3' >

                    <Link href='/boards/favorites' className='transition-all sm:hover:bg-gray-100 sm:p-2 rounded-md'> 
                        <motion.button whileTap={{scale:"0.9"}} 
                        className='text-[#2a9d8f] border-none sm:text-lg sm:font-medium'>Favorites</motion.button>
                        <p className='relative left-0 right-0 top-[15px] sm:top-5 h-[4px] rounded-tl-full rounded-tr-full bg-[#2a9d8f]'></p>
                    </Link>

                    <Link href='/boards/user/dashboard' className='transition-all hover:bg-[#34bdad] bg-[#2a9d8f] px-2 py-1 sm:p-2 rounded-md'> 
                        <motion.button whileTap={{scale:"0.9"}} 
                        className='text-white border-none sm:text-lg font-medium '>Dashboard</motion.button>
                    </Link>

                </div>
            </div>
        </header>

        <div className={`all-boards ${boards.length > 0 ? 'pt-32' : ''} flex items-start justify-center py-4 bg-white`}>
                
                <div className="boards max-sm:hidden min-w-[600px] max-lg:mx-2 w-[900px]" data-offset='0' data-aos="fade-down"  data-aos-easing="ease-in-back" data-aos-duration="1000">
                    {boards.length ? <h1 className='text-2xl'>All Favorite boards</h1> : ""}
                    {boards.length > 0 ? boards.map((board,index)=> {
                        
                        const formattedImage = board.uploaded_image ? Buffer.from(board.uploaded_image) : null
                        const date = new Date(board.created_at);
                        const options = { year: 'numeric', month: 'long', day: 'numeric' };
                        const boardCreationDate = date.toLocaleDateString('en-US', options);
                        
                        return (
                        
                            <div  className="board border transition-all board mt-3 rounded-lg flex items-start w-full py-4 px-3" key={board._id}>
                                
                                <div className="board_image" >
                                {
                                    formattedImage ? <Image className='border rounded mt-1 w-[180px] h-[160px]' src={`${process.env.basePath}/images/${formattedImage}`} alt='board' width={0} height={0} sizes='(max-width: 200px) 100vw, 33vw'/>
                                    :  board.unsplash_image ? <Image className='border rounded mt-1 w-[180px] h-[160px]' src={board.unsplash_image} alt='board' width={260} height={260} sizes='(max-width: 200px) 100vw, 33vw'/>
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
                                                <DropdownItem textValue='Cookie'>
                                                        <div className='delete' onClick={()=>{setBoardIdToRemove(board._id);document.getElementById('delete_modal_in_favorites_for_big_screens').showModal()}}>
                                                            <MdDeleteOutline className='text-2xl' />  
                                                            <p className='text-sm font-semibold ps-3 '>Remove from favorites</p>
                                                        </div>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>

                                        <dialog id="delete_modal_in_favorites_for_big_screens" className="modal">
                                            <div className="modal-box">
                                                <p className="py-4">Are you sure you want to remove this from favorites?</p>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        <button onClick={() => removeBoard(boardIdToRemove)} className="btn hover:bg-red-500 bg-red-500 text-white">Yes I'm sure</button>
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
                            <h1 className='text-black text-3xl' >No favorite boards</h1>
                            <p className='text-lg text-black mt-2' >All favorite boards you can access appear here.</p>
                            <Link className='mt-4 text-white text-xl rounded-md bg-[#2a9d8f] shadow font-light btn btn-md hover:bg-[#34bdad] border-none hover:border-none' 
                                href='/boards/create'><FaPlus/>Create a Praiseboard</Link>
                        </div>
                    }
                </div>

                <div className="boards w-[900px] sm:hidden mx-4" data-offset='0' data-aos="fade-down"  data-aos-easing="ease-in-back" data-aos-duration="1000">
                    {boards.length ? <h1 className='text-xl'>All Favorite boards</h1> : ""}
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
                                                    <DropdownItem textValue='Delete'>
                                                            <div className='delete' onClick={()=>{setBoardIdToRemove(board._id);document.getElementById('delete_modal_in_favorites_for_small_screens').showModal()}}>
                                                                <MdDeleteOutline className='text-2xl' />  
                                                                <p className='text-sm font-semibold ps-3 '>Remove from favorites</p>
                                                            </div>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>

                                            <dialog id="delete_modal_in_favorites_for_small_screens" className="modal">
                                                <div className="modal-box">
                                                    <p className="py-4">Are you sure you want to remove this from favorites?</p>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button onClick={() => removeBoard(boardIdToRemove)} className="btn hover:bg-red-500 bg-red-500 text-white">Yes I'm sure</button>
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

                        <div className='flex items-center justify-center h-screen flex-col text-center'>
                            <h1 className='text-black text-3xl' >No favorite boards</h1>
                            <p className='text-lg text-black mt-2' >All favorite boards you can access appear here.</p>
                            <Link className='mt-4 text-white text-xl rounded-md bg-[#2a9d8f] shadow font-light btn btn-md hover:bg-[#34bdad] border-none hover:border-none' 
                                href='/boards/create' > <FaPlus/>Create a Praiseboard</Link>
                        </div>
                        

                    }
                </div>
        </div>

    </>
  )
}

export default Favorites