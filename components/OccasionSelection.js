'use client'
import React from 'react'
import Image from 'next/image'
import { Farewell, Easter, Love, Valentine, Wedding, Christmas,
         Fathersday, Mothersday, Congratulations, Graduation, 
         NewBaby, NewYear, Thankyou, Retirement, Birthday, Welcome, 
         Link, Logo, IndependenceDay, EidulFitr, EidulAdha
        } from '../components/OccasionImages'


const occasions = [
    { name: "Independence Day", image: IndependenceDay, alt: "Independence Day" },
    { name: "Eid ul Fitr", image: EidulFitr, alt: "Eid ul Fitr" },
    { name: "Eid ul Adha", image: EidulAdha, alt: "Eid ul Adha" },
    { name: "Thankyou", image: Thankyou, alt: "Thankyou" },
    { name: "Retirement", image: Retirement, alt: "Retirement" },
    { name: "Birthday and Celebrations", image: Birthday, alt: "Birthday" },
    { name: "Welcome & Onboarding", image: Welcome, alt: "Welcome" },
    { name: "Farewell", image: Farewell, alt: "Farewell" },
    { name: "Love", image: Love, alt: "Love" },
    { name: "Valentines Day", image: Valentine, alt: "Valentines Day" },
    { name: "Wedding & Anniversary", image: Wedding, alt: "Wedding & Anniversary" },
    { name: "Easter", image: Easter, alt: "Easter" },
    { name: "Merry Christmas", image: Christmas, alt: "Christmas" },
    { name: "Happy Fathers Day", image: Fathersday, alt: "Fathers Day" },
    { name: "Happy Mothers Day", image: Mothersday, alt: "Mothers Day" },
    { name: "Congratulations!", image: Congratulations, alt: "Congratulations" },
    { name: "Graduation", image: Graduation, alt: "Graduation" },
    { name: "New Baby", image: NewBaby, alt: "New Baby" },
    { name: "New Year", image: NewYear, alt: "New Year" },
];
        

function OccasionSelection({increaseStep, boardData,setBoardData}) {
    
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
            <h1 id='occasion-heading' className='text-center text-3xl sm:text-4xl mt-6 text-white'>Select an Occasion</h1>
            <div className=" flex items-start justify-center flex-wrap py-2">
                {occasions.map((occasion) => (
                    <div key={occasion.name} onClick={() => nextQuestion(occasion.name)} className="option">
                        <div className="rounded-tr-md rounded-tl-md overflow-hidden w-full h-full">
                            <Image
                            sizes="(max-width: 200px) 100vw, 33vw"
                            className="occasion-img"
                            src={occasion.image}
                            alt={occasion.alt}
                            width={10}
                            height={10}
                            />
                        </div>
                        <p>{occasion.name}</p>
                    </div>
                ))}
            </div>
        </div>
        
    </div>
  )
}

export default OccasionSelection
