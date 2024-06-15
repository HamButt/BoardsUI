import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {MdArrowBackIos} from 'react-icons/md'
import Logo from '../public/logo.png'

function NavBar() {
  return (
    <div className='text-center py-3 bg-gray-200'>
        <header>
            <div className="logo flex items-center justify-center">
                <Link href='/' className="">
                    <Image src={Logo} alt='Logo' width={70} height={70}/>
                </Link>
            </div>
        </header>
    </div>
  )
}

export default NavBar