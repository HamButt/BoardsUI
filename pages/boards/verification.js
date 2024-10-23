'use client'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Cookie from 'js-cookie'
import axios from 'axios'

function Verification() {
    const router = useRouter()
    const token = router.asPath.split('=')[1]
    const [isError, setError] = useState(null)

    useEffect(()=>{
        getUser()
   }, [])
 
   const getUser = async () => {

     try {
       
       const user = await axios.get(`${process.env.basePath}/users/api/${token}`)
       if(user?.status === 200){
         Cookie.set("token", user?.data?.token)
         localStorage.setItem('userId', user?.data?.userId)
         router.push('/boards/user/dashboard')
       } else {
         router.push('/boards/login')
       }
     } catch (error) {
       setError(error?.response?.data?.message)
     }
   }


  return (
    <div className='flex items-center justify-center h-screen w-full bg-white dark:bg-white' >
        <Head>
          <title>Verification</title>
        </Head>
        {isError ?
            <div className='flex flex-col items-center justify-center' >
              <span className='ms-2 text-2xl' > {isError} </span>
              <Link href="/" className='text-xl btn mt-2 w-[220px] bg-[#2a9d8f] hover:bg-[#34bdad] shadow-none text-white font-medium' > Go home </Link>
            </div>
            :
            <p className="text">Authorization...</p>
        }
    </div>
  )
}

export default Verification