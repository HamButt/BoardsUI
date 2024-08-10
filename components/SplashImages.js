import React from 'react'
import {motion} from 'framer-motion'
function SplashImages({setSplashImage,setImageComponent,setImageSection,imageSearchValue,imageData,getImagesFromUnsplash,error,isFetching}) {
  return (
    <div className='text-center'>
        <div style={{maxHeight:"300px"}} className="mt-2 gifs mx-10 my-1 flex flex-wrap overflow-auto items-start justify-evenly">
            {imageSearchValue && imageData.length ?  
                imageData.map((img, index)=>{ 
                    return(
                        <div key={index} className='mt-2 cursor-pointer max-sm:w-[80px] max-sm:h-[90px] sm:w-[100px] sm:h-[120px] md:w-[150px] md:h-[170px]'
                            onClick={() => {setSplashImage(img.urls.regular); setImageComponent(""); setImageSection(false)}}>
                            <motion.img whileTap={{scale:0.9}} className='h-full w-full rounded-md' src={img.urls.small} alt="IMAGE URL" />
                        </div> 
                    )})
                :  imageSearchValue && !imageData ? <div className='mt-2 font-semibold'>Searching...</div> 
                : error  ? "" :  <div className='mt-2 font-semibold' >No images found for "{imageSearchValue}"</div>
                }
        </div>
            { imageData.length > 0 && <motion.button disabled={isFetching ? true : false} whileTap={{ scale: 0.9 }} 
                onClick={getImagesFromUnsplash} className='mt-2 border text-sm my-1 px-2 py-1 rounded-md border-black text-black'>{isFetching ? "Loading..." : "Load more"}</motion.button>}
    </div>
  )
}

export default SplashImages