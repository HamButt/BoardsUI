import React, {useEffect} from 'react'
import { Toaster,toast } from 'sonner';
import {useRouter} from 'next/router'
import {motion} from 'framer-motion'
function Error() {
  const router = useRouter()

  useEffect(()=>{
    toast.success("Board deleted", {
      action: <motion.button className='text-white bg-[#FF9669] px-2 py-1 rounded' onClick={() => router.push('/boards/user/dashboard')}>Go to dashboard</motion.button>,
      duration: Infinity,
  });
  }, [])
  
  return (
    <div className='flex items-center justify-center h-screen bg-white'>
        <p>404 | Page not found</p>  
        <Toaster theme='system' closeButton richColors={true} position="top-center" />
    </div>
  )
}

export default Error