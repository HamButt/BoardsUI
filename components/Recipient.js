import React, {useEffect,useRef} from 'react'
import NavBar from './NavBar'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import {MdArrowBackIos} from 'react-icons/md'

function Recipient({increaseStep,decrementStep,boardData, setBoardData}) {
    const [percent,setPercent] = React.useState(55)
    const [recipient,setRecipient] = React.useState('')
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

    const nextQuestion = () => {
        setBoardData(prevState => ({
            ...prevState,
            recipient_name: recipient
          }));
        increaseStep()
    };


    useEffect(() => {
        setRecipient(boardData.recipient_name)
    }, [])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && recipient) {
          nextQuestion();
        }
      };

    useEffect(()=>{
    inputRef.current.focus()
    }, [])

  return (
    <div className='min-h-screen h-full'>
        <NavBar/>

        <div className="w-full mt-10 2xl:mt-20 flex items-center justify-center">
            <div className='max-md:w-8/12 w-5/12'>
                <BorderLinearProgress  variant="determinate" value={percent}/>
            </div>
        </div>
        <div className='flex items-center justify-center mt-10 2xl:mt-32 mx-2' data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">
            <button onClick={decrementStep} className='decrement-step-button' > 
                <MdArrowBackIos className='text-lg md:text-2xl ms-2' />
            </button>
            <div className=" pb-10 pt-6 bg-white w-[500px]  border shadow rounded-lg">
                <div className="form flex items-center justify-center flex-col">
                    <p>3/4</p>
                    <h1 className='sm:text-md md:text-lg lg:text-2xl mt-2'>Who is the recipient?</h1>
                    <input ref={inputRef} onKeyDown={handleKeyDown} className='board-creator-input' type="text" 
                        placeholder='Name' value={recipient} name='recipient' onChange={(e) => setRecipient(e.target.value)} required />
                    <button disabled={!recipient ? true : false} onClick={nextQuestion} className='board-next-button mt-8 max-sm:hidden' >Next</button>
                    <div className='sm:hidden w-full flex items-center justify-center mt-6 space-x-2'>
                        <button onClick={decrementStep} className=' bg-gray-200 shadow-md btn btn-circle text-black' > 
                            <MdArrowBackIos className='text-lg md:text-2xl ms-2' />
                        </button>
                        <button disabled={!recipient ? true : false} onClick={nextQuestion} className='board-next-button' >Next</button>
                    </div>

                </div> 
            </div>
        </div>

    </div>
  )
}

export default Recipient