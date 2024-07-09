
import React from 'react'; 
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
// import { Stepper } from 'primereact/stepper';
// import { StepperPanel } from 'primereact/stepperpanel';
// import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { FcInvite } from "react-icons/fc";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineCheck } from "react-icons/md";

export default function Steps() {
    const stepperRef = React.useRef(null);
        const events = [
        { 
            status: 'Create', 
            heading: 'Select any occasion', 
            icon: <IoIosCreate/>, 
            color: '#FF9669', 
            description: 'Birthday, anniversary or any other occasion. Select the category and style in minutes' 
        },
        { 
            status: 'Invite', 
            heading: 'Invite people', 
            icon: <FcInvite />, 
            color: '#FF9669', 
            description: 'Fill out your details, add recipients & write a personal message and create board' 
        },
        {   status: 'Deliver', 
            heading: 'Deliver to recipient', 
            icon: <MdOutlineCheck />, 
            color: '#FF9669', 
            description: 'Copy the link and deliver the praise board to your people' 
        }
    ];

    const customizedMarker = (item) => {
        return (
            <span className="flex rounded-full align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
                <p className='text-2xl p-2' >{item.icon}</p>
            </span>
        );
    };

    const customizedContent = (item) => {
        return (
            <Card title={item.status} subTitle={item.heading} className='my-2 md:w-[500px] text-black'>
                <p className='text-black' >{item.description}</p>
            </Card>
        );
    };
        
    return (

        <div className="card mt-10 text-black">
             <Timeline value={events} align='left' className="customized-timeline" marker={customizedMarker} content={customizedContent} />
         </div>

        // <div className=" md:w-[500px]">
        //               <Stepper ref={stepperRef} orientation="vertical">
                          
        //                   <StepperPanel header="Create">
        //                       <div className="flex flex-col h-12rem ">
        //                           <div className=" flex-auto text-start flex flex-col justify-center items-start font-medium">
        //                             <img className="w-24" src="https://static.123cards.com/images/how-it-works-img1.svg" />
        //                             <h1 className="text-xl mt-2 text-black font-semibold">Select any occasion</h1>
        //                             <p className="mt-4 text-black" >Birthday, anniversary or any other occasion. Select the category and style in minutes</p>
        //                           </div>
        //                       </div>
        //                       <div className="flex py-4">
        //                           <Button label="Next" onClick={() => stepperRef.current.nextCallback()} />
        //                       </div>
        //                   </StepperPanel>
                          
        //                   <StepperPanel header="Invite">
        //                       <div className="flex flex-col h-12rem">
        //                         <div className=" flex-auto text-start flex flex-col justify-center items-start font-medium">
        //                             <img className="w-24" src="https://static.123cards.com/images/how-it-works-img2.svg" />
        //                             <h1 className="text-xl mt-2 text-black font-semibold">Invite people</h1>
        //                             <p className="mt-4 text-black" >Fill out your details, add recipients & write a personal message and create board</p>
        //                           </div>
        //                       </div>
        //                       <div className="flex py-4 gap-2">
        //                           <Button label="Back"  onClick={() => stepperRef.current.prevCallback()} />
        //                           <Button label="Next" onClick={() => stepperRef.current.nextCallback()} />
        //                       </div>
        //                   </StepperPanel>

        //                   <StepperPanel header="Deliver">
        //                       <div className="flex flex-col h-12rem ">
        //                           <div className=" flex-auto text-start flex flex-col justify-center items-start font-medium">
        //                             <img className="w-24" src="https://static.123cards.com/images/how-it-works-img3.svg" />
        //                             <h1 className="text-xl mt-2 text-black font-semibold">Deliver to anyone</h1>
        //                             <p className="mt-4 text-black" >Copy the link and deliver the praise board to your people</p>
        //                           </div>
        //                       </div>
        //                       <div className="flex py-4">
        //                         <Button label="Back" onClick={() => stepperRef.current.prevCallback()} />
        //                       </div>
        //                   </StepperPanel>

        //                   <StepperPanel header="Delight">
        //                       <div className="flex flex-col h-12rem ">
        //                           <div className=" flex-auto text-start flex flex-col justify-center items-start font-medium">
        //                             <img className="w-24" src="https://static.123cards.com/images/how-it-works-img3.svg" />
        //                             <h1 className="text-xl mt-2 text-black font-semibold">Deliver to anyone</h1>
        //                             <p className="mt-4 text-black" >Copy the link and deliver the praise board to your people</p>
        //                           </div>
        //                       </div>
        //                       <div className="flex py-4">
        //                         <Button label="Back" onClick={() => stepperRef.current.prevCallback()} />
        //                       </div>
        //                   </StepperPanel>
                          
        //               </Stepper>
        // </div>
    )
}
        
