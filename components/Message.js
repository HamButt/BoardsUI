import React from 'react'
import NavBar from './NavBar'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import {useRouter} from 'next/router'
import {MdArrowBackIos} from 'react-icons/md'
import crypto from 'crypto'
import Cookies from 'js-cookie'

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
        const hash = crypto.createHmac('sha256', salt).update(boardData[2]).digest('hex');
        Cookies.set("Creator",hash, { expires: 7 })
    }


    React.useEffect(()=>{
        if(boardData[0]){
            return (()=>{
                    setBoardData("")
            })
    }
    }, [])
    
    const createBoard = () => {
        setIsLoading(true)
        confetti({
            particleCount: 200,
            spread: 50,
            origin: { y: 0.7 }
        })
        setBoardData([...boardData, title])
        const boardValues = {
            occasion: boardData[0],
            creator_name: boardData[1],
            recipient: boardData[2],
            title: title
        }
        axios.post(`${process.env.basePath}/boards`, boardValues)
        .then((res) => {
            if(res.status === 200){
                router.push(`/boards/${res.data.eBoard._id}`)
                convertCookieIntoHash()
            }
        }).catch((err) => {
            console.log(err);
            setIsLoading(false)
        }).finally(()=>{
            setTimeout(()=>{
                setIsLoading(false)
            }, 2000)
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

        <div className='flex items-center justify-center mt-10' data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">
            <button onClick={decrementStep} className=' me-2 bg-gray-200 shadow-md btn btn-circle text-black' > 
                <MdArrowBackIos className='text-lg md:text-2xl ms-2' />
            </button>
            <div className=" pb-10 pt-6 bg-white max-sm:w-9/12 sm:w-5/12 border shadow rounded-lg"  >
                <div className="form sm:w-full flex items-center justify-center flex-col" >
                    <p>4/4</p>
                    <h1 className='sm:text-md md:text-lg lg:text-2xl mt-2' >What should the title be?</h1>
                    <input className='input border-2 md:w-8/12 mt-5 border-gray-300 rounded-lg outline-none px-4' type="text" placeholder={`e.g. ${boardData[0]}`} value={title} name='title' onChange={(e) => setTitle(e.target.value)} required />
                    <button disabled={!title ? true : false} onClick={createBoard} 
                        className='btn glass hover:bg-[#202459] bg-[#202459] min:w-7/12 lg:w-5/12 mt-8  text-white rounded-lg shadow-lg text-lg sm:text-lg'>
                        {isLoading ? "Creating..." : "Create board"}</button>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Message