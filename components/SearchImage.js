import React from 'react'

function SearchImage({imageSearchValue,setImageSearchValue,title}) {
  return (
        <div className=' mt-4'>
            <p className='font-semibold'>Add more specific image terms to your search if you don&apos;t find what you&apos;re looking for</p>
            <input name='unsplashImage' type="search" className="mt-3 input input-bordered border-2 w-full bg-white dark:bg-white" 
                value={imageSearchValue} placeholder={`Search ${title} image`} 
                onChange={(e) => setImageSearchValue(e.target.value)} /> 
        </div>
  )
}

export default SearchImage