import React, { useEffect } from 'react'
import { BsCloudUpload } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

function UploadImage({handleUploadFiles, uploadImagePreview, setUploadImagePreview}) {
  
  useEffect(()=>{

    return () => {
        URL.revokeObjectURL(uploadImagePreview)
    }

}, [uploadImagePreview])

  return (
    <div className='text-center mt-4'>
          <p className='font-semibold'>Please upload images that are appropriate for all audiences. We reserve the right to remove content without notice!</p>
            
            {uploadImagePreview &&
            <>
                <button className='bg-black relative top-9 right-[104px] p-1 rounded-lg' onClick={() => setUploadImagePreview(null)}>
                    <MdDelete className='text-white text-lg hover:text-gray-400' />
                </button>
                <div className='flex items-center justify-center ' >
                  <img src={uploadImagePreview} alt="Preview" className='shadow-lg rounded-lg w-[250px] h-[300px]'  />
                </div>
            </>
              
            }

            <div className="__imageUploadSection">
              <label htmlFor="file" className="labelFile border-2 border-gray-300 rounded-lg px-4 "><span><BsCloudUpload className="text-2xl" /></span>
                  <div className='mt-2'>
                      <p className='upload-image-section text-ellipsis overflow-hidden whitespace-nowrap w-[530px]' >{!uploadImagePreview && "drag and drop your image file here or click to select a file"}</p>
                      <p className='text-end text-xs font-semibold mt-3' >JPG, PNG, JPEG</p>
                  </div>
              </label>                         
              <input accept='.png,.jpg,.jpeg' className="upload-input" name="image" id="file" type="file" onChange={handleUploadFiles} />
            </div>

      </div>
  )
}

export default UploadImage