import React from 'react'

function Loader({color,size,text,margin,breakPoint}) {

    return (
        <>
            <span className={`loading loading-spinner loading-sm sm:loading-${size} text-[${color}]`}></span>
            <span className={`text-[${color}] text-sm sm:text-lg ms-${margin}`}>{text}</span>
        </>
   
  )
}

export default Loader