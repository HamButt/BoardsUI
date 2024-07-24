import React from 'react'
import { MdDelete } from "react-icons/md";
function SelectedGif({setGif,setGIFComponent,setGifSection,gif}) {
  return (
    <div className="image">
        <p className='text-center text-lg font-semibold'>Your selected GIF</p>
        <button className='bg-black relative top-9 p-1 left-2 rounded-lg' 
            onClick={() => {setGif(false); setGIFComponent('search'); setGifSection(true) } }>
            <MdDelete className=' text-white text-lg hover:text-gray-400'/>
        </button>
        <img className='shadow-lg rounded-lg' style={{maxWidth:"350px", height: "300px"}} src={gif} alt="GIF" />
    </div>
  )
}

export default SelectedGif