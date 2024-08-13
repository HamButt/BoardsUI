import React, { useEffect, useState, useRef } from 'react'
import NavBar from './NavBar'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import {useRouter} from 'next/router'
import {MdArrowBackIos} from 'react-icons/md'
import crypto from 'crypto'
import { Toaster,toast } from 'sonner';
import {CreateBoardApi} from '../apis/CreateBoardApi';
function Message({decrementStep, boardData, setBoardData}) {
    const router = useRouter()
    const [percent,setPercent] = useState(75)
    const [title,setTitle] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const inputRef = useRef(null)
   

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 12,
        borderRadius: 8,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 8,
          backgroundColor: theme.palette.mode === 'light' ? '#FF9669' : '#308fe8',
        },
      }));

    const convertCookieIntoHash = () => {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.createHmac('sha256', salt).update(boardData.creator_name).digest('hex');
        window.localStorage.setItem('Creator', hash)
    }
    
    const createBoard = async () => {
        setIsLoading(true)
        setBoardData(prevState => ({
            ...prevState,
            title: title
        }));
        localStorage.setItem('title', title)
        const userId = localStorage.getItem('userId')
        const board = {
            occasion: boardData.occasion,
            creator_name: boardData.creator_name,
            recipient: boardData.recipient_name,
            title: title,
            userId: userId
        }
            const res = await CreateBoardApi(board, setIsLoading)
            if(res.status === 200){
                convertCookieIntoHash()
                localStorage.setItem('boardId', res.data.board._id)
                router.push(`/boards/${res.data.board._id}`)
                confetti({
                    particleCount: 200,
                    spread: 50,
                    origin: { y: 0.7 }
                })
                setIsLoading(false)
            }else{
                handleError(res)
            }
        
    }

    const handleError = (error) => {
        setIsLoading(false);
        if (error.response.status === 401) {
          toast.error(error.response.data.message, {
            action: <button className='text-white bg-[#2a9d8f] px-2 py-1 rounded' onClick={() => router.push('/boards/user/dashboard')}>Go to dashboard</button>,
            duration: Infinity,
        });
        }
      };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && title) {
            createBoard();
        }
      };

      useEffect(()=>{
        inputRef.current.focus()
      }, [])

  return (
    <div className='min-h-screen h-full'>

        <NavBar/>


        <Toaster richColors position="top-center" invert={true}/>

        <div className="w-full mt-10 2xl:mt-20 flex items-center justify-center">
            <div className='max-md:w-8/12 w-5/12'>
                <BorderLinearProgress  variant="determinate" value={percent}/>
            </div>
        </div>

        <div className='flex items-center justify-center mt-10 2xl:mt-32 mx-2' data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">
            <button onClick={decrementStep} className='decrement-step-button' > 
                <MdArrowBackIos className='text-lg md:text-2xl ms-2' />
            </button>
            <div className=" pb-10 pt-6 bg-white w-[500px] border shadow rounded-lg"  >
                <div className="form flex items-center justify-center flex-col" >
                    <p>4/4</p>
                    <h1 className='sm:text-md md:text-lg lg:text-2xl mt-2' >What should the title be?</h1>
                    <input ref={inputRef} onKeyDown={handleKeyDown} className='board-creator-input' type="text" 
                        placeholder={`e.g ${boardData.occasion} `} value={title} name='title' 
                        onChange={(e) => setTitle(e.target.value)} required />
                    <button disabled={!title ? true : false} onClick={createBoard} 
                        className='board-create-button'>
                        {isLoading ? "Creating..." : "Create board"}</button>

                        <div className='sm:hidden w-full flex items-center justify-center mt-6 space-x-2'>
                            <button onClick={decrementStep} className=' bg-gray-200 shadow-md btn btn-circle text-black'> 
                                <MdArrowBackIos className='text-lg md:text-2xl ms-2'/>
                            </button>
                            <button disabled={!title ? true : false} onClick={createBoard} 
                                className='board-create-btton-mbl'>
                                {isLoading ? "Creating..." : "Create board"}
                            </button>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Message
