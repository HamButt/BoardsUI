import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/logo.png'

function Header() {
  return (
    <header>
      <div className="header">
          <Link href='/'>
            <Image className='w-[70px]' src={Logo} alt='Logo' width={0} height={0}  sizes='(max-width: 200px) 100vw, 33vw'/>
          </Link>
          <div className='space-x-5'>
            <Link href='#how-to' className='btn btn-md bg-white text-lg font-light border hover:border-[#2a9d8f] border-[#2a9d8f] rounded-lg hover:bg-white text-[#2a9d8f] max-sm:hidden'>How to</Link>
          </div>
      </div>
    </header>
  )
}

export default Header