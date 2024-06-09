import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/logo.png'

function Header() {
  return (
    <header>
      <div className="header">
          <Link href='/' className="text-3xl text-black">
            <Image src={Logo} alt='Logo' width={100} height={200}  sizes='(max-width: 200px) 100vw, 33vw'/>
          </Link>
          <div className='space-x-5'>
            <Link href='/how-to' className=''>How to</Link>
            <Link href='/auth/login' className='btn btn-md shadow text-lg font-light border-black rounded-2xl hover:shadow-xl hover:bg-transparent bg-transparent'>Login</Link>
          </div>
      </div>
    </header>
  )
}

export default Header