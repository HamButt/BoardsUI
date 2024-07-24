import React from 'react'

function GifSearch({gifSearchValue,title,setGifSearchValue}) {
  return (
    <div className='mt-4'>
        <p className='font-semibold font-md'>Add more specific GIF terms to your search if you don&apos;t find what you&apos;re looking for</p>
        <input name='gif' type="search" className="mt-3 input input-bordered border-2 w-full" 
            value={gifSearchValue} placeholder={`Search ${title} GIF`} 
            onChange={(e) => setGifSearchValue(e.target.value)} /> 
    </div>
  )
}

export default GifSearch