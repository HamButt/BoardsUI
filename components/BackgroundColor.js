import axios from 'axios';
import React from 'react'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

function BackgroundColor({setImageUrl, boardId}) {
    const [color, setColor] = useColor("#202459");
    const [debounceTime, setDebounceTime] = React.useState(0)
    
    React.useEffect(()=>{
        setImageUrl("")
        setColor(color)
        document.body.style.backgroundColor = color.hex

        if(color){
            clearTimeout(debounceTime);
            const newDebounceTime = setTimeout(() => {
                axios.post(`${process.env.basePath}/background/${boardId}`)
                .then((res) => {
                    console.log(res.data);
                }).catch((err) => {
                    console.log(err);
                })
                setDebounceTime(newDebounceTime)
            },[1000])

        }
        return (() => {
            if(debounceTime){
                clearTimeout(time)
            }
        })
    },[color])

  return (
    <div className='mt-10 px-6'>
        <ColorPicker hideInput={["rgb", "hsv"]} color={color} onChange={setColor}/>
    </div>
  )
}

export default BackgroundColor