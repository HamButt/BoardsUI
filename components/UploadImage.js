import React from 'react'
import { BsCloudUpload } from "react-icons/bs";

function UploadImage({handleUploadFiles}) {
  return (
    <div className='text-center mt-4'>
          <p className='font-semibold'>Please upload images that are appropriate for all audiences. We reserve the right to remove content without notice!</p>
          <label htmlFor="file" className="labelFile border-2 border-gray-300 rounded-lg px-4 "><span><BsCloudUpload className="text-2xl" /></span>
              <div className='mt-2 w-full'>
                  <p className='upload-image' >drag and drop your image file here or click to select a file</p>
                  <p className='text-end text-xs font-semibold mt-3' >JPG, PNG, JPEG</p>
              </div>
          </label>                         
          <input accept='.png,.jpg,.jpeg' className="upload-input" name="image" id="file" type="file" onChange={handleUploadFiles} />
      </div>
  )
}

export default UploadImage