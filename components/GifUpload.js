import React from 'react'
import { BsCloudUpload } from "react-icons/bs";
function GifUpload({handleUploadFiles}) {
  
  return (
    <div className='text-center mt-4'>
        <p className='font-semibold font-md'>Please upload GIFs that are appropriate for all audiences. We reserve the right to remove content without notice!</p>
        <label htmlFor="file" className="labelFile border-2 border-gray-300 rounded-lg px-4 "><span><BsCloudUpload className="text-2xl" /></span>
            <div className='mt-2 w-full'>
                <p className='upload-gif'>drag and drop your GIF here or click to select</p>
                <p className='text-end text-xs font-semibold'>GIF</p>
            </div>
        </label>                         
        <input accept='image/gif' className="upload-input" name="image" id="file" type="file" onChange={handleUploadFiles} />
    </div>
  )
}

export default GifUpload