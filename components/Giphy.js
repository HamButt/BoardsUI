import React from 'react'
import {motion} from 'framer-motion'
function Giphy({gifSearchValue,gifData,setGif,setGIFComponent,setGifSection,getGifsFromGiphy}) {
  
    return (

    <div style={{maxHeight:"330px"}} className="gifs mx-10 mt-4 flex-wrap overflow-auto flex items-start justify-evenly">
                                
        { gifSearchValue && gifData.length ?  
            gifData.map((gif, index)=>{ 
                return(
                    
                    <div key={index} className='mt-2 cursor-pointer  w-[120px] h-[130px] md:w-[150px] md:h-[180px]'
                        onClick={() => {setGif(gif.images.original.url); setGIFComponent(""); setGifSection(false)}}>
                        <motion.img 
                            whileTap={{scale:0.9}} 
                            className=' h-full w-full rounded-md' 
                            src={gif.images.original.url} alt="URL GIF"  
                            />
                    </div> 
                )})
                : gifSearchValue && !gifData ? <div className='mt-2 font-semibold'>Searching...</div>
                : <div className='mt-2 font-semibold' >No images found for "{gifSearchValue}"</div>}
                { 
                    gifData.length ? <motion.button whileTap={{ scale: 0.9 }} onClick={getGifsFromGiphy} 
                    className='mt-2 border text-sm my-1 px-2 py-1 rounded-md border-black text-black'>Load more</motion.button> 
                : ""
            }
        </div>
  )
}

export default Giphy