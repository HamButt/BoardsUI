import React from 'react'
import Image from "next/image";

function HowTo() {


  
  return (

    <div className="how-it-works my-10 text-center ">
    <h1 className="text-5xl my-4">How to create board</h1>
    <div className="process flex items-start justify-evenly flex-wrap">
      <div className="one px-5 pb-5">
        <Image sizes='(max-width: 200px) 100vw, 33vw' src='https://static.123cards.com/images/how-it-works-img1.svg' alt="Category selection" width={200} height={100} />
        <h1 className="text-3xl">Create</h1>
        <p className="step">Select any occasion</p>
        <p className="step-process">Birthday, anniversary or any other occasion. Select the category and style in minutes</p>
      </div>
      <div className="two px-5 pb-5">
        <Image sizes='(max-width: 200px) 100vw, 33vw' src='https://static.123cards.com/images/how-it-works-img2.svg' alt="Schedule" width={200} height={100}  />
        <p  className="text-3xl">Invite</p>
        <p className="step">Invite people</p>
        <p className="step-process" >Fill out your details, add recipients & write a personal message and create board</p>
      </div>
      <div className="three px-5 pb-5">
        <Image sizes='(max-width: 200px) 100vw, 33vw' src='https://static.123cards.com/images/how-it-works-img3.svg'  alt="Send" width={200} height={100}  />
        <p  className="text-3xl">Deliver</p>
        <p className="step">Create posts and deliver to recipient </p>
        <p className="step-process">Copy the link of board and share your posts with them </p>
      </div>
    </div>
  </div>  )
}

export default HowTo