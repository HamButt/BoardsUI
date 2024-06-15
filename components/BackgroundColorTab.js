import axios from 'axios';
import React from 'react'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import Swal from 'sweetalert2'
import { motion} from 'framer-motion'

function BackgroundColorTab({setImageUrl, boardId, setUploadedImage, setOpenNav}) {
    const [color, setColor] = useColor("#000000");

    React.useEffect(()=>{
        if(color.hex !== "#000000"){
            setImageUrl("")
            setUploadedImage("")
            document.body.style.backgroundColor = color.hex
        }
    },[color])

    const changeBackground = () => {
      console.log("changeBackground worked");
      const formData = {
        color: color.hex, 
        boardId
      }
        axios.post(`${process.env.basePath}/boards/updateBackground`, formData )
            .then((res) => {
              if(res.status === 200){
                setOpenNav(false)
                Swal.fire({
                    icon: "success",
                    title: res.data.message,
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
              }
            }).catch((err) => {
                console.log(err);
            })
    }

  return (
    <div data-offset='0' data-aos="fade-right"  data-aos-easing="ease-in-back" data-aos-duration="300">
        <h1 className='text-black text-lg text-center'>Select your background color</h1>
        <div className='mt-2'>
            <ColorPicker hideInput={["rgb", "hsv"]} color={color} onChange={setColor}/>
        </div>
        <div className="flex items-center justify-center space-x-4">
            <motion.button whileTap={{scale:0.9}}  className='border border-gray-400 p-3 rounded-md text-sm font-semibold text-gray-600 mt-3' onClick={changeBackground}>Apply changes</motion.button>
        </div>
    </div>
  )
}

export default BackgroundColorTab