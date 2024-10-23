import React from 'react'

function UploadYoutubeVideo({setVideoLink,videoLink}) {
  return (
    <div className='text-center mt-4 w-full'>
        <p className='font-semibold'>Copy the youtube video url from share button e.g.</p>
        <p className='font-semibold text-xs text-gray-500 mt-1' >https://www.youtube.com/embed/V5qRp8ZXm44?si=......</p>
        <input type="text" className="input w-full mt-3 input-bordered border-2 bg-white dark:bg-white" 
        placeholder='Paste youtube video link' value={videoLink} 
        onChange={(e) => setVideoLink(e.target.value)} />
    </div>
  )
}

export default UploadYoutubeVideo