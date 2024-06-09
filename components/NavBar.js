import React from 'react'
import Link from 'next/link'
import {MdArrowBackIos} from 'react-icons/md'

function NavBar({decrementStep, firstComponent}) {
  return (
    <div className='text-center py-3 bg-gray-200'>
        <header>
            {/* <button onClick={decrementStep} className='flex items-center text-black'> 
                {firstComponent ? "" :
                <>
                    <MdArrowBackIos />
                    <span className='ms-2 text-lg'>Back</span>
                </>
                }
            </button> */}
            <div className="logo">
                <Link href='/' className="text-3xl text-[#202459]">eBoards</Link>
            </div>
        </header>
    </div>
  )
}

export default NavBar