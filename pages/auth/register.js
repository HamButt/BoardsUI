'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Google from '../../assests/google-image.png'
import Facebook from '../../assests/facebook-image.png'
import axios from 'axios'
import { RegistartionAPI } from '@/API/RegistrationAPI'
import {useRouter} from 'next/navigation'
import Head from "next/head";


function Register() {
    const [error, setError] = React.useState(false)

    const router = useRouter()

    const [registartionData, setRegistartionData] = React.useState({
        email:"",
        password: "",
        confirm_password:""
    })
    const [hasScrolled, setHasScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 0) {
            setHasScrolled(true);
          } else {
            setHasScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    const handleInputs = (e) =>{
        const value = e.target.value
        const name = e.target.name

        setRegistartionData(prevState => ({ ...prevState, [name]: value }))
    }

    const registartionHandle = () => {
        if(registartionData.password === registartionData.confirm_password){

            RegistartionAPI(registartionData)
            .then((res) => {
            if(res.status === 200){
                router.push('/auth/login')
            }
            setRegistartionData({
                email:"",
                password:"",
                confirm_password:""
            })
            setError("")
        }).catch((err) => {
            console.log(err);
            setError(err.data.message)
        })
    }else{
        setError("Password does not match")
    }
    }

    const googlePassportLogin = () =>{
        window.open(`${process.env.basePath}/auth/google`, "_self")
    }

    const facebookPassportLogin = () =>{
        window.open(`${process.env.basePath}/auth/facebook`, "_self")
    }

    

  return (

    <div>

        <Head>
            <title>Sign Up</title>
        </Head>

        <div className='bg-[#44bbe2]'>
            
            <nav  id='header' className={`bg-[#44bbe2] z-50 py-5 flex items-center justify-between px-10 fixed top-0 right-0 left-0 transition-all duration-300 ${hasScrolled ? 'shadow-md' : ''}`}>
                <div className="logo text-xl">
                    <Link href='/' className="text-2xl text-white"> kudoboard</Link>
                </div>
                <div className="header-buttons space-x-5 "> 
                    <Link href='/auth/login' className='text-white rounded-md p-2 text-lg hover:bg-[#35778d]'>Sign In</Link>

                <Link href='/boards/create' className='bg-white  text-lg py-2 px-4 shadow-md rounded-3xl '> 
                    <span className='text-black'>Create a kudoboard</span>
                </Link>
            </div>
            </nav>

            <div className="registration-component flex items-center justify-center py-[6.5rem]" >
                <div  className="registration-modal bg-white p-10 rounded-2xl shadow-lg w-4/12">
                    <h1 className='text-center text-2xl text-[#7a7a7a]'>Kudoboard Registartion</h1>
                    <div className="mt-5 modal flex items-start justify-start flex-col">
                        <input className='border border-[#d4d4d4] py-3 rounded-md outline-none w-full px-4 ' type="email" name='email' value={registartionData.email} required placeholder='Email' onChange={handleInputs}/>
                        <input className='border border-[#d4d4d4] mt-4 py-3 rounded-md outline-none w-full px-4 ' type="password" name='password' value={registartionData.password} required placeholder='password' onChange={handleInputs}  />
                        <input className='border border-[#d4d4d4] mt-4 py-3 rounded-md outline-none w-full px-4 ' type="password" name='confirm_password' value={registartionData.confirm_password} required placeholder='Confirm password' onChange={handleInputs}/>
                        {error && <p className='mt-2 ms-1 text-xs text-red-600' >{error}</p> }
                        <button onClick={registartionHandle} className='mt-4 bg-[#44bbe2] px-5 py-3 text-white text-xl w-full  rounded-md'>Register</button>
                    </div>

                    <div className="separator">
                        <p>OR</p>
                    </div>

                    <div className="social-buttons flex items-center justify-center flex-col">
                        <button onClick={googlePassportLogin} className='bg-[#e4e2e2] shadow-sm flex items-center justify-center px-5 py-3 w-full rounded-md '>
                            <Image src={Google} alt='Google' width={30}/>
                            <span className='ps-2'>Register with Google</span>
                        </button>
                        <button onClick={facebookPassportLogin} className='mt-2 bg-[#e4e2e2] shadow-sm flex items-center justify-center px-5 py-3 w-full rounded-md '>
                            <Image src={Facebook} alt='Facebook' width={25}/>
                            <span className='ps-2'>Register with Facebook</span>
                        </button>
                    </div>
                        <div className='flex items-center justify-center mt-4' >
                            <p className='text-xs'>Already have an account? </p>
                            <Link href='/auth/login' className='text-xs font-extralight text-[#44bbe2] ps-2'>
                                Sign in
                            </Link>
                        </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Register