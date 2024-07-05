'use client'
import React from 'react'
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import ListSubheader from '@mui/material/ListSubheader';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { BoardIcon } from '@/Icons/Icons';
// import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import {useRouter} from 'next/navigation';
import Head from "next/head";
import Cookies from 'js-cookie';
import crypto from 'crypto';
import OccasionSelection from '@/components/OccasionSelection';
import BoardCreator from '@/components/BoardCreator';
import Recipient from '@/components/Recipient';
import Message from '@/components/Message';


function BoardsCreation() {
    const [step,setStep] = React.useState(1)
    const [boardData, setBoardData] = React.useState({
        occasion: "",
        creator_name: "",
        recipient_name: "",
        title: ""
    })

    const increaseStep = () =>{
        setStep(s => s + 1)
    }

    const decrementStep = () => {
        setStep(s => s - 1)
    }

  return (
    <div>

        <Head>
            <title>Create Board</title>
        </Head>

        <div className="boards-creation bg-[#2a9d8f]">
        
            {step === 1 && <OccasionSelection increaseStep={increaseStep} decrementStep={decrementStep} boardData={boardData}  setBoardData={setBoardData}/>}
            {step === 2 && <BoardCreator firstComponent="hide" increaseStep={increaseStep} decrementStep={decrementStep} boardData={boardData}  setBoardData={setBoardData}/>}
            {step === 3 && <Recipient increaseStep={increaseStep} decrementStep={decrementStep} boardData={boardData}  setBoardData={setBoardData}/>}
            {step === 4 && <Message increaseStep={increaseStep} decrementStep={decrementStep} boardData={boardData} setBoardData={setBoardData} />}

        </div>

        
    </div>
  )
}

export default BoardsCreation