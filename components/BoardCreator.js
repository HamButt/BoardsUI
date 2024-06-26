import React from 'react'
import NavBar from './NavBar'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import {MdArrowBackIos} from 'react-icons/md'

function From({increaseStep,decrementStep,boardData, setBoardData}) {
    const [percent,setPercent] = React.useState(25)
    const [creatorName, setCreatorName] = React.useState('')

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


  return (

    <div className='min-h-screen h-full'>
        <NavBar/>

        <div className="w-full mt-6 flex items-center justify-center">
            <div className='max-md:w-8/12 w-5/12'>
                <BorderLinearProgress  variant="determinate" value={percent}/>
            </div>
        </div>

        {/* //data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000" */}

        <div className=' flex items-center justify-center mt-10 mx-2'   >
            <button onClick={decrementStep} className='max-sm:hidden me-2 bg-gray-200 shadow-md btn btn-circle text-black' > 
                <MdArrowBackIos className='text-lg md:text-2xl ms-2' />
            </button>
            <div className="pb-10 pt-6 bg-white border shadow rounded-lg w-[500px]">
                <div className="form  flex items-center justify-center flex-col" >
                    <p>2/4</p>
                    <h1 className='sm:text-md md:text-lg lg:text-2xl mt-2 mx-auto px-2' >Let people know who is this from</h1>
                    <input className='input border-2 w-10/12 mt-5 border-gray-300 rounded-lg outline-none px-4' type="text" placeholder='Name' value={creatorName} name='creator_name' onChange={(e) => setCreatorName(e.target.value)} required />
                    <button disabled={!creatorName ? true : false}  onClick={() => {increaseStep(); setBoardData([...boardData, creatorName])} } className="board-next-button mt-8 max-sm:hidden" >Next</button>
                    <div className='sm:hidden  w-full flex items-center justify-center mt-6 space-x-2'>
                        <button onClick={decrementStep} className=' bg-gray-200 shadow-md btn btn-circle text-black' > 
                            <MdArrowBackIos className='text-lg md:text-2xl ms-2' />
                        </button>
                        <button disabled={!creatorName ? true : false}  onClick={() => {increaseStep(); setBoardData([...boardData, creatorName])} } className="board-next-button" >Next</button>
                    </div>
                </div> 
            </div>
        </div>
        


    </div>
  )
}

export default From