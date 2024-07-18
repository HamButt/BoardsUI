import React, {useEffect, useState} from 'react'
import axios from 'axios' 
import Head from 'next/head'

function myBackground() {
  const [imageUrl,setImageUrl] = useState(null)
  const [uploadedImage,setUploadedImage] = useState(null)

  useEffect(()=>{
    const boardId = window.location.pathname.split('/').reverse()[0]
    fetchBoardBackground(boardId)
  }, [])


  const fetchBoardBackground = async (boardId) =>{
    const res = await axios.get(`${process.env.basePath}/boards/${boardId}`)
    const board = res.data.board
    if(board.uploaded_image){
      const boardImage = Buffer.from(board.uploaded_image.data)
      setUploadedImage(`${process.env.basePath}/images/${boardImage}`)
    }else if(board.unsplash_image){
        setImageUrl(board.unsplash_image)
    }
}

  return (
    <>

        <Head>
          <title>My background</title>
        </Head>

        {imageUrl || uploadedImage ? <div className='min-h-screen h-full bg-fixed bg-no-repeat bg-center bg-cover transition-all ease-linear' style={{backgroundImage:`url(${ imageUrl ? imageUrl : uploadedImage})`}} ></div>
        :
          <div className='text-center flex items-center justify-center h-screen' >
            <span className='loading loading-spinner'></span>
            <span className='ms-2' >Loading background...</span>
          </div>
        }
    </>
  )
}

export default myBackground