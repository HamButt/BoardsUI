import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Google from '../../assests/google-image.png'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Logo from '../../public/logo.png'
import { Toaster,toast } from 'sonner';
import Loader from '@/components/Loader'

function Login() {
    
    const [email,setEmail] = useState(null)
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [isGoogleLoading,setGoogleLoading] = useState(false)

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            handleEmail()
        }
    }
    
    const handleEmail = async () => {
        setIsLoading(true)
        try {
            const res = await axios.post(`${process.env.basePath}/users/login`, {email})
            if(res.status === 200){
                toast.success('Email sent, check your inbox'); 
                setError("")
            }
        } catch (error) {
            setError(error.response.data.error)
        } finally{
            setIsLoading(false)
        }
    }

    const googlePassportLogin = () => {
        setGoogleLoading(true)
        window.open(`${process.env.basePath}/auth/google`, "_self")
        setTimeout(()=>{
            setGoogleLoading(false)
        }, 2000)
    }

    useEffect(()=>{
        if(isGoogleLoading){
            toast.success('Singing you in');
        }
        return (() =>{
            setGoogleLoading(false)
        }) 
    }, [isGoogleLoading])
    
  return (
    <>
        <Head>
            <title>Login</title>
        </Head>

        <div className="flex items-center justify-center mt-5">
            <Link href='/'>
                <Image className='w-[70px]' src={Logo} alt='Logo' width={0} height={0}  sizes='(max-width: 200px) 100vw, 33vw'/>
            </Link>
        </div>

        <Toaster theme='system' richColors={true} position="top-center" />
        {isGoogleLoading && <Toaster theme='system' richColors={true} position="top-center" />}

        <div className='mt-10 flex items-center justify-center flex-col'>
            <h1 className='text-start text-2xl sm:text-3xl'>Login to Praiseboard</h1>
            <div className='max-sm:mx-2 sm:w-[480px]'>

                <div className="border w-full px-8 py-10 mt-6 rounded-md">
                    <h1 className="text-2xl">Create an account</h1>

                    <div className="custom-login">
                        <p className="py-4">Enter your email below</p>
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input  onKeyDown={handleKeyDown} className='w-full' type="email" placeholder="pb@example.com" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                            {error && <p className='text-red-600 text-sm mt-2' >{error}</p>}
                        <button 
                            onClick={handleEmail} 
                            disabled={!email || isLoading ? true : false}
                            className='mt-5 btn bg-[#2a9d8f] font-medium text-lg text-white hover:text-white hover:bg-[#2a9d8f] w-full '>
                            { isLoading ? 

                                <div className='flex items-center'>
                                    <Loader color="white" size="xs" margin="2" text="Sending..." />
                                </div>

                                : "Send me link"
                                }
                        </button>
                    </div>

                    <div className="separator relative mt-5" >
                        <div className="absolute inset-0 flex items-center" >
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase" >
                            <span className="bg-white text-sm px-2 text-muted-foreground">Or</span>
                        </div>
                    </div>

                    <button 
                        onClick={googlePassportLogin} 
                        className='btn mt-5 flex items-center justify-center w-full bg-transparent hover:bg-transparent border border-gray-300 '>
                        <Image src={Google} alt='Google' width={30} height={30}/>
                        <span className='ps-2 text-[16px] sm:text-[18px] font-medium'>Continue with Google</span>
                    </button>

                </div>
            </div>
            
        </div>

    </>
  )
}

export default Login
