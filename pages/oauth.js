'use client'
import React, {useEffect} from 'react'
import Cookie from 'js-cookie'
import {useRouter} from 'next/router'
function Token() {
  const router = useRouter()

  useEffect(()=>{
      const token = router.asPath.split('?')[1].split('=')[1];
      const email = router.asPath.split('?')[2].split('=')[1];
      Cookie.set("token", token)
      localStorage.setItem('email', email)
      router.push('/boards/user/dashboard')
  }, [])


  return (
    <div className='flex items-center justify-center h-screen w-full' >
       
    </div>
  )
}

export default Token