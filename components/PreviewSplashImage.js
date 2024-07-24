import React from 'react'
import { MdDelete } from "react-icons/md";
function PreviewSplashImage({splashImage,setSplashImage,setImageComponent,setImageSection}) {
  return (
    <div className="image">
        <p className='text-center text-lg font-semibold'>Your selected Image</p>
        <button className='bg-black relative top-9 p-1 left-2 rounded-lg' 
            onClick={() => {setSplashImage(false); setImageComponent('search'); setImageSection(true) } }>
            <MdDelete className=' text-white text-lg hover:text-gray-400'/>
        </button>
        <img  className='shadow-lg rounded-lg' style={{maxWidth:"300px", height: "300px"}} src={splashImage} alt="Splash Image" />
    </div>
  )
}

export default PreviewSplashImage