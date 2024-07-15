import axios from 'axios';
import React, { useState } from 'react'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import {  motion } from "framer-motion";

function BackgroundColorTab({setImageUrl, boardId, setUploadedImage, setOpenNav, setAnimateModal, uploadedImage, imageUrl}) {
    const [color, setColor] = useColor("#000000");
    const [loading, setLoading] = useState(false)
    const borderColor = loading ? 'border-[#FF9669]' : 'border-gray-600';

    React.useEffect(()=>{
        if(color.hex !== "#000000"){
            setImageUrl("")
            setUploadedImage("")
            document.body.style.backgroundColor = color.hex
          }
          
    },[color])

    const changeBackground = async () => {
      setLoading(true)
      const formData = {
        color: color.hex, 
        boardId
      }
      try {
        const res = await axios.post(`${process.env.basePath}/boards/updateBackground`, formData )
        if(res.status === 200){
              setAnimateModal(true)
              setOpenNav(false)
        }
        setLoading(false)
      } catch (error) {
          setLoading(false)
          console.error("Background Color Error", error);
      }
             
    }


  return (

    <div data-offset='0' data-aos="fade-right"  data-aos-easing="ease-in-back" data-aos-duration="300">
        <h1 className='text-black text-lg text-center'>Select your background color</h1>
        
        <div className='mt-2'>
            <ColorPicker hideInput={["rgb", "hsv"]} color={color} onChange={setColor} />
        </div>
        
        
        <div className="flex items-center justify-center space-x-4">
            <motion.button whileTap={{scale:0.9}}  className={`border ${borderColor} p-3 rounded-md text-sm font-semibold text-gray-600 mt-3`} onClick={changeBackground}>
            { loading ? 

              <div className='flex items-center'>
                <span className="loading loading-spinner loading-xs text-[#FF9669] "></span>
                <span className="text-[#FF9669] ms-2">Saving...</span>
              </div>

              : "Apply changes"
              }
             </motion.button>
        </div>
    </div>

  )
}

export default BackgroundColorTab