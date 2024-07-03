import React from 'react'
import NavBar from './NavBar'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import {useRouter} from 'next/router'
import {MdArrowBackIos} from 'react-icons/md'
import crypto from 'crypto'
import { createBoardApi } from '../api/createBoardApi'
function Message({decrementStep, boardData, setBoardData}) {
    const router = useRouter()
    const [percent,setPercent] = React.useState(75)
    const [title,setTitle] = React.useState('')
    const [isLoading,setIsLoading] = React.useState(false)
   

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 12,
        borderRadius: 8,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 8,
          backgroundColor: theme.palette.mode === 'light' ? '#202459' : '#308fe8',
        },
      }));

    const convertCookieIntoHash = () => {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.createHmac('sha256', salt).update(boardData.creator_name).digest('hex');
        localStorage.setItem('Creator', hash)
    }
    
    const createBoard = () => {
        setIsLoading(true)
        setBoardData(prevState => ({
            ...prevState,
            title: title
          }));
        const board = {
            occasion: boardData.occasion,
            creator_name: boardData.creator_name,
            recipient: boardData.recipient_name,
            title: title
        }
        createBoardApi(board)
        .then((res) => {
            if(res.status === 200){
                confetti({
                    particleCount: 200,
                    spread: 50,
                    origin: { y: 0.7 }
                })
                router.push(`/boards/${res.data.eBoard._id}`)
                convertCookieIntoHash()
            }
        }).catch((err) => {
            console.log(err);
            setIsLoading(false)
        }).finally(()=>{
            setIsLoading(false)
        })
    }

  return (
    <div className='h-screen'>

        <NavBar/>

        <div className="w-full mt-6 flex items-center justify-center">
            <div className='max-md:w-8/12 w-5/12'>
                <BorderLinearProgress  variant="determinate" value={percent}/>
            </div>
        </div>

        <div className='flex items-center justify-center mt-10 mx-2' data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">
            <button onClick={decrementStep} className='max-sm:hidden me-2 bg-gray-200 shadow-md btn btn-circle text-black' > 
                <MdArrowBackIos className='text-lg md:text-2xl ms-2' />
            </button>
            <div className=" pb-10 pt-6 bg-white w-[500px] border shadow rounded-lg"  >
                <div className="form flex items-center justify-center flex-col" >
                    <p>4/4</p>
                    <h1 className='sm:text-md md:text-lg lg:text-2xl mt-2' >What should the title be?</h1>
                    <input className='input border-2 w-10/12 mt-5 border-gray-300 rounded-lg outline-none px-4' type="text" placeholder={`e.g ${boardData.occasion} `} value={title} name='title' onChange={(e) => setTitle(e.target.value)} required />
                    <button disabled={!title ? true : false} onClick={createBoard} 
                        className='max-sm:hidden btn glass hover:bg-[#202459] bg-[#202459] min:w-7/12 lg:w-5/12 mt-8  text-white rounded-lg shadow-lg text-lg sm:text-lg'>
                        {isLoading ? "Creating..." : "Create board"}</button>

                        <div className='sm:hidden w-full flex items-center justify-center mt-6 space-x-2'>
                            <button onClick={decrementStep} className=' bg-gray-200 shadow-md btn btn-circle text-black'> 
                                <MdArrowBackIos className='text-lg md:text-2xl ms-2'/>
                            </button>
                            <button disabled={!title ? true : false} onClick={createBoard} 
                                className='btn glass hover:bg-[#202459] bg-[#202459] min:w-7/12 lg:w-5/12 text-white rounded-lg shadow-lg text-lg sm:text-lg'>
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