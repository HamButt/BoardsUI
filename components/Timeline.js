
import React from 'react'; 
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { FcInvite } from "react-icons/fc";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineCheck } from "react-icons/md";

export default function Steps() {
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
    )
}
        