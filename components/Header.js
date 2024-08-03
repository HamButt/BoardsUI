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
            <Link href='/boards/login' className='login-link '>Log in</Link>
          </div>
      </div>
    </header>
  )
}

export default Header