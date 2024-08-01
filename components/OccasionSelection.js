import React , {useEffect, useState} from 'react'
import Image from 'next/image'
import Farewell from '../public/farewell.jpg'
import Easter from '../public/easter.jpg'
import Love from '../public/love.jpg'
import Valentine from '../public/valentines.jpg'
import Wedding from '../public/wedding.jpg'
import Christmas from '../public/christmas.jpg'
import Fathersday from '../public/fathers.jpeg'
import Mothersday from '../public/happy-mothers-day-greeting-card-design-with-flower-and-typographic-elements-on-heart-background-vector.jpg'
import Congratulations from '../public/congratulation.jpg'
import Graduation from '../public/graduation.jpg'
import NewBaby from '../public/baby.jpg'
import NewYear from '../public/newyear.jpg'
import Thankyou from '../public/thankyou.jpg'
import Retirement from '../public/retirement.jpg'
import Birthday from '../public/Happy-birthday-images-free-download.jpg'
import Welcome from '../public/welcome.jpg'
import Link from 'next/link'
import Logo from '../public/logo.png'
import axios from 'axios'

function OccasionSelection({increaseStep, boardData,setBoardData}) {
    // const [boardId, setBoardId] = useState('')
    const nextQuestion = (occasion) => {
        setBoardData(prevState => ({
            ...prevState,
            occasion: occasion
          }));
        increaseStep()
    };

    
  return (

    <div>
        
        <div className='text-center py-5 bg-white'>
            <header>
                <div className="logo flex items-center justify-center">
                    <Link href='/' className="">
                            <Image src={Logo} alt='Logo' width={70} height={70}/>
                    </Link>
                </div>
            </header>
        </div>

         <div data-offset='0' data-aos="fade-up" data-aos-easing="ease-in-back" data-aos-duration="1000">
                <h1 className='text-center text-3xl mt-6 text-white'>Select an Occasion</h1>
                <div className=" flex items-start justify-center flex-wrap py-6">
                    <div onClick={() => nextQuestion("Thankyou")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image  sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Thankyou} alt="Thankyou" width={10} height={10} />
                        </div>
                        <p>Thankyou</p>
                    </div>
                    <div onClick={() => nextQuestion("Retirement")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Retirement} alt="Retirement" width={10} height={10}/>
                        </div>
                        <p>Retirement</p>
                    </div>
                    <div onClick={() => nextQuestion("Birthday and Celebrations")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Birthday} alt="Birthday" width={10} height={10}/>
                        </div>
                        <p>Birthdays</p>
                    </div>
                    <div onClick={() => nextQuestion("Welcome & Onboarding")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Welcome} alt="Welcome" width={10} height={10} />
                        </div>
                        <p >Welcome</p>
                    </div>
                    <div onClick={() => nextQuestion("Farewell")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Farewell} alt="Farewell" width={10} height={10} />
                        </div>
                        <p>Farewell</p>
                    </div>
                    <div onClick={() => nextQuestion("Love")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Love} alt="Love" width={10} height={10} />
                        </div>
                        <p>Love</p>
                    </div>
                    <div onClick={() => nextQuestion("Valentines Day")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Valentine} alt="Valentine" width={10} height={10} />
                        </div>
                        <p>Valentines</p>
                    </div>
                    <div onClick={() => nextQuestion("Wedding & Anniversary")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Wedding} alt="Four" width={10} height={10} />
                        </div>
                        <p>Wedding & Anniversary</p>
                    </div>
                    <div onClick={() => nextQuestion("Easter")} className="option ">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Easter} alt="Four" width={10} height={10} />
                        </div>
                        <p>Easter</p>
                    </div>
                    <div onClick={() => nextQuestion("Merry Christmas")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Christmas} alt="Four" width={10} height={10} />
                        </div>
                        <p>Christmas</p>
                    </div>
                    <div onClick={() => nextQuestion("Happy Fathers Day")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Fathersday} alt="Four" width={10} height={10} />
                        </div>
                        <p>Happy Fathers day</p>
                    </div>
                    <div onClick={() => nextQuestion("Happy Mothers Day")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Mothersday} alt="Four" width={10} height={10} />
                        </div>
                        <p>Happy Mothers day</p>
                    </div>
                    <div onClick={() => nextQuestion("Congratulations!")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Congratulations} alt="Four" width={10} height={10} />
                        </div>
                        <p>Congratulations</p>
                    </div>
                    <div onClick={() => nextQuestion("Graduation")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={Graduation} alt="Graduation" width={10} height={10} />
                        </div>
                        <p>Graduation</p>
                    </div>
                    <div onClick={() => nextQuestion("New Baby")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={NewBaby} alt="Four" width={10} height={10} />
                        </div>
                        <p>New Baby</p>
                    </div>
                    <div onClick={() => nextQuestion("New Year")} className="option">
                        <div style={{width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden'}}>
                            <Image sizes='(max-width: 200px) 100vw, 33vw' className="occasion-img" src={NewYear} alt="NewYear" width={10} height={10} />
                        </div>
                        <p>New Year</p>
                    </div>
                </div>
        </div>
        
    </div>
  )
}

export default OccasionSelection