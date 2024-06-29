import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/logo.png'

function Header() {
  return (
    <header>
      <div className="header">
          <Link href='/' className="text-3xl text-black">
            <Image className='max-w-16' src={Logo} alt='Logo' width={0} height={0}  sizes='(max-width: 200px) 100vw, 33vw'/>
          </Link>
          <div className='space-x-5'>
              
            <Link href='#how-to' className='btn btn-md shadow bg-white text-lg font-light border-black rounded-lg hover:shadow-xl hover:bg-white max-sm:hidden'>How to</Link>
          </div>
      </div>
    </header>
  )
}

export default Header