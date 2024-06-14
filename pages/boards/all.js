'use client'
import axios from 'axios';
import React from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2'
import 'animate.css';
import Head from 'next/head'
import Cookies from 'js-cookie';
import { format } from 'timeago.js';
import CircularProgress from '@mui/material/CircularProgress';
// import { RiShare2Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { BiCustomize } from "react-icons/bi";
import { LuView } from "react-icons/lu";
// import { Toaster,toast } from 'sonner';

function BoardsAll() {
  const router = useRouter();
  const [boards, setBoards] = React.useState([]);
  const [searchValue,setSeachValue] = React.useState('')
  const cookie = Cookies.get('Creator');
  const [debounceTimer, setDebounceTimer] = React.useState(null);
  
  const fetchBoards = () => {
    axios.get(`${process.env.basePath}/boards`)
    .then((res) => {
      setBoards(res.data.boards.reverse())
    }).catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(()=>{
    fetchBoards()
    }, []);

    const deleteBoard = (boardId) =>{
      const updatedBoards = boards.filter((item,index)=> boardId !== item._id)
      setBoards(updatedBoards)
      axios.delete(`${process.env.basePath}/boards/${boardId}`)
      .then((res) => {
        Swal.fire({
          title: "Deleted",
          text: "Your Board is deleted successfully",
          icon: "success"
        });

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
      })
    }

    React.useEffect(() =>{

      if(searchValue){
        clearTimeout(debounceTimer);
        const newDebounceTimer = setTimeout(() => {
          axios.get(`${process.env.basePath}/boards?board=${searchValue}`)
          .then((res)=>{
            setBoards(res.data.boards)
            console.log(res.data.boards);
          }).catch((err) => {
            console.log(err);
          })
            }, 500);
            setDebounceTimer(newDebounceTimer);
          }else{
            fetchBoards()
          }
              
              return () => {
                if (debounceTimer) {
                  clearTimeout(debounceTimer);
                }

              };

    }, [searchValue])


  return (

    <div >
      
      <Head>
        <title>All Boards</title>
      </Head>


        <div className='flex items-center justify-between px-10 text-center py-5 bg-gray-200 fixed top-0 right-0 left-0 z-50'>
            <div className="logo">
                <Link href='/' className="text-3xl text-[#202459]">eBoards</Link>
            </div>
            <div className='w-2/6'>
              <input className='input input-bordered w-full' type="search" value={searchValue} onChange={(e) => setSeachValue(e.target.value)} placeholder='Search eBoards'  />
            </div>
        </div>

        <div className="board-screen min-h-screen flex items-center justify-center bg-[#202459] mt-20">

          <div className="all-boards flex items-center flex-col justify-start bg-gray-200 border my-6 py-6 w-10/12 rounded-lg shadow">
            
              <h1 className='text-3xl font-semibold text-[#202459]'>{boards.length ? "All eBoards" : "Processing boards..."}</h1>
              {/* data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="600" */}
              {
                boards.length ? 

                boards.map((board,index) => {
                  
                  const date = new Date(board.created_at)
                  const options = { 
                      year: 'numeric', 
                      month: 'long', 
                      day: '2-digit' 
                  };
                  const formattedDate = date.toLocaleDateString('en-US', options)
                  let formattedImage ;
                  let splashUrl;
                  if(board.uploaded_image) {
                    formattedImage = Buffer.from(board.uploaded_image.data)
                  }else{
                    splashUrl = board.unsplash_image
                  }

                  return (

                  <div key={board._id} className="eboards mt-5 p-4 shadow rounded-lg w-5/6">
                    <div className="board-structure flex ">
                    
                      <div className="image border rounded-md mt-2" style={{maxWidth:"170px",maxHeight:"170px"}}>
                       { 
                        formattedImage ?
                          <Image className="rounded-md w-full h-full" sizes='(max-width: 200px) 100vw, 33vw' src={`${process.env.basePath}/images/${formattedImage}`} alt={formattedImage}  width={10} height={10} />
                        : 
                          <Image className="rounded-md w-full h-full" sizes='(max-width: 200px) 100vw, 33vw' src={splashUrl} alt={"URL"}  width={10} height={10} />
                        }
                      </div>

                      <div className="data flex-1 flex items-start justify-between" >

                        <div className="description ps-5 rounded-lg ">
                            <p className=' text-2xl font-bold w-64 overflow-hidden text-nowrap text-ellipsis'>{board.title}</p>

                            <div className="flex flex-col">
                              <div className="flex items-center mt-2">
                                <span className='text-gray-600 text-sm mr-2 m-0 p-0 font-semibold'>For</span>
                                <span className='text-sm font-semibold text-gray-600 m-0 p-0 capitalize'>{board.recipient}</span>
                              </div>
                              <div className='mt-2 flex items-center'>
                                <p className='text-gray-600 text-sm me-8 m-0 p-0 font-semibold'>Creator</p>
                                <p className='m-0 p-0 capitalize font-semibold'>{board.creator_name}</p>
                              </div>
                              <div className='mt-1 flex items-center'>
                                <p className='text-gray-600 text-sm me-7 m-0 p-0 font-semibold'>Created</p>
                                <p className='m-0 p-0 font-semibold'>{formattedDate}</p>
                              </div>
                              <div className='mt-1 flex items-center'>
                                <p className='text-gray-600 text-sm me-11 m-0 p-0 font-semibold'>Posts</p>
                                <p className='m-0 p-0 font-semibold'>{board.post === 0 ? "0" : board.post} - Limit 40 </p>
                              </div>
                              <div className='mt-1 flex items-center'>
                                <p className='text-gray-600 text-sm me-6 m-0 p-0 font-semibold'>Last Post</p>
                                <p className='m-0 p-0 font-semibold'>{board.post === 0 ? "Not yet" : format(board.last_post_created_at)} <Link className="text-gray-400 font-light" href={`/boards/${board._id}/kudos/create`}>add a post</Link></p>
                              </div>
                            </div>

                          </div>

                        <div className="board-options flex items-start">
                          <div className='flex items-center space-x-2'>
                            <Link href={`/boards/${board._id}`} className=' text-[#202459] rounded-md text-md tooltip '  data-tip="View Board"> <LuView /> </Link>
                            
                            <button className="tooltip text-[#202459] cursor-pointer text-2xl" data-tip="Delete Board">
                              {cookie && <MdDeleteOutline onClick={()=>document.getElementById('my_modal_1').showModal()}/> }
                            </button>

                            <dialog id="my_modal_1" className="modal">
                              <div className="modal-box">
                                <h3 className="font-bold text-lg">You going to delete this eBoard</h3>
                                <p className="py-4">Are you sure you want to delete this?</p>
                                <div className="modal-action">
                                  <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button onClick={() => deleteBoard(board._id)} className="btn glass bg-red-500">Yes I'm sure</button>
                                    <button className="btn glass ms-2 bg-green-500">No I'm not</button>
                                  </form>
                                </div>
                              </div>
                            </dialog>

                            <button className="tooltip text-[#202459] edit-button text-xl cursor-pointer" onClick={() => copyLink(board._id)} data-tip="Edit Board"> 
                              <CiEdit />
                            </button>
                            
                            <button className="tooltip text-[#202459] text-xl customise-button cursor-pointer" data-tip="Customise Board"  onClick={() => copyLink(board._id)}> 
                              <BiCustomize/>
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                  )
                })
              : 
              <div className='flex items-center mt-40 justify-center'>
                {
                  searchValue ? "No Boards found" : 
                  
                  <>
                
                    <svg width={0} height={0}>
                      <defs>
                        <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#e01cd5" />
                          <stop offset="100%" stopColor="#1CB5E0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
                  </>
                  }
              </div>
              }
            </div>

        </div>
    </div>
  )
}

export default BoardsAll