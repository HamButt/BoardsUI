'use client'
import React, {useEffect} from 'react'
import Cookie from 'js-cookie'
import {useRouter} from 'next/router'
import Head from 'next/head'

function Token() {
  const router = useRouter()

  useEffect(()=>{
      const token = router?.asPath?.split('?')[1]?.split('=')[1];
      const userId = router?.asPath?.split('?')[2]?.split('=')[1];
      Cookie.set("token", token)
      localStorage.setItem('userId', userId)
      router.push('/boards/user/dashboard')
  }, [])


  return (
    <div className='flex items-center justify-center h-screen w-full bg-white dark:bg-white' >
        <Head>
          <title>Verification</title>
        </Head>
      <p className="text">Authorizing...</p>

    </div>
  )
}

export default Token