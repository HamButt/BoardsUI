import axios from 'axios';
import React, { useState } from 'react'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import Swal from 'sweetalert2'
import {  motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

function BackgroundColorTab({setImageUrl, boardId, setUploadedImage, setOpenNav, setAnimateModal}) {
    const [color, setColor] = useColor("#000000");
    // const [animateModal, setAnimateModal] = useState(false);

    React.useEffect(()=>{
        if(color.hex !== "#000000"){
            setImageUrl("")
            setUploadedImage("")
            document.body.style.backgroundColor = color.hex
        }
    },[color])

    const changeBackground = () => {
      const formData = {
        color: color.hex, 
        boardId
      }
        axios.post(`${process.env.basePath}/boards/updateBackground`, formData )
            .then((res) => {
              if(res.status === 200){

                setAnimateModal(true)
                setOpenNav(false)
              }
             
            }).catch((err) => {
                console.log(err);
            })
    }

  return (
    <>

    <div data-offset='0' data-aos="fade-right"  data-aos-easing="ease-in-back" data-aos-duration="300">
        <h1 className='text-black text-lg text-center'>Select your background color</h1>
        <div className='mt-2'>
            <ColorPicker hideInput={["rgb", "hsv"]} color={color} onChange={setColor}/>
        </div>
        <div className="flex items-center justify-center space-x-4">
            <motion.button whileTap={{scale:0.9}}  className='border border-gray-600 p-3 rounded-md text-sm font-semibold text-gray-600 mt-3' onClick={changeBackground}>Apply changes</motion.button>
        </div>
    </div>

          {/* {animateModal && <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpenErrorModal(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-green-400 to-green-700 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                    <FiAlertCircle className="text-white/10 rotate-12 text-[250px]  absolute z-0 -top-24 -left-24" />
                    <div className="relative z-10">
                        <div className="bg-green-400 w-16 h-16 mb-2 rounded-full text-3xl text-white grid place-items-center mx-auto">
                            <FiAlertCircle />
                        </div>
                        <h3 className="text-3xl font-bold text-center mb-2">Background updated</h3>
                        <p className="text-center mb-6">Your background is set successfully</p>
                        <div className="flex gap-2">
                            <button onClick={() => setAnimateModal(false)} className="bg-transparent hover:bg-white/10 transition-colors
                            text-white font-semibold w-full py-2 rounded"> Close </button>
                            
                        </div>
                    </div>
                    </motion.div>
                </motion.div>
          </AnimatePresence>} */}
    </>
  )
}

export default BackgroundColorTab