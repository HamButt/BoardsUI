import React from 'react'
import { BsCloudUpload } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

function GifUpload({handleUploadFiles, uploadGifPreview, setUploadGIfPreview }) {
  
  return (
    <div className='text-center mt-4'>
        <p className='font-semibold font-md'>Please upload GIFs that are appropriate for all audiences. We reserve the right to remove content without notice!</p>
        
        {uploadGifPreview &&
            <>
                <button className='bg-black relative top-9 right-[104px] p-1 rounded-lg' onClick={() => setUploadGIfPreview(null)}>
                    <MdDelete className='text-white text-lg hover:text-gray-400' />
                </button>
                <div className='flex items-center justify-center ' >
                  <img src={uploadGifPreview} alt="Preview" className='shadow-lg rounded-lg w-[250px] h-[300px]'  />
                </div>
            </>
              
            }
        
        <label htmlFor="file" className="labelFile border-2 border-gray-300 rounded-lg px-4 "><span><BsCloudUpload className="text-2xl" /></span>
            <div className='mt-2 w-full'>
                <p className='upload-gif-section text-ellipsis overflow-hidden whitespace-nowrap w-[530px]'>{!uploadGifPreview && "drag and drop your GIF here or click to select"}</p>
                <p className='text-end text-xs font-semibold'>GIF</p>
            </div>
        </label>                         
        <input accept='image/gif' className="upload-input" name="image" id="file" type="file" onChange={handleUploadFiles} />
    </div>
  )
}

export default GifUpload