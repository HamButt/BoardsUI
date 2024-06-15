import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';
function PreviewBoard({setPreview, occasion}) {

    const [posts,setPosts] = useState([])
    const [imageUrl,setImageUrl] = useState([])
    const [title,setTitle] = useState('')

    useEffect(()=>{
      axios.get(`${process.env.basePath}/previews/${occasion}`)
      .then((res) => {
        console.log(res.data);
          setPosts(res.data.posts)
          setTitle(res.data.posts[0].title)
          setImageUrl(`${process.env.basePath}/images/${res.data.backgroundImage.gif}`)
      }).catch((err) => {
          console.log(err);
      })
    }, [])
    function capitalizeTitle(str) {
      return str.replace(/\b\w/g, char => char.toUpperCase());
    }

  return (
    <div >
        <Head>
          <title >{capitalizeTitle(occasion)}</title>
        </Head>

        <header className='fixed top-0 right-0 left-0 z-50 bg-white py-6 shadow'>
          <div className="flex items-center justify-evenly">
            <button className='btn bg-transparent hover:bg-transparent border-none shadow-none'>
              <IoMdArrowRoundBack className='text-black text-3xl' onClick={() => setPreview(false)}/>
            </button>
            <div className="description-title">
              <p className='text-xl font-semibold'>Celebrate {occasion} with PraiseBoard</p>
              <p className='text-lg'>Drive employee happiness by celebrating milestones with online {occasion} cards by PraiseBoard</p>
            </div>
            <Link className='btn hover:bg-black bg-black text-white font-medium text-lg' href='/boards/create'>Create Board</Link>
          </div>
        </header>

        <div className='' style={{backgroundImage: `url(${imageUrl})`,backgroundRepeat:"no-repeat",backgroundAttachment:"fixed", backgroundSize:'cover',backgroundPosition:"center"}}>

          <div className="selected-title bg-[#202459]  mt-24 py-6">
              <p className='text-3xl py-2 text-center text-white'>{title}</p>
          </div>
           
          <div className="image-section px-10" data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">

             <div className="image flex items-start justify-start flex-wrap py-2" >

                  { posts.map((post,index) => {
                        
                        return (
                            <>
                                {
                                
                                <div style={{width: "400px", height:"auto"}} className="post  bg-[#202459] mt-3 ms-3 rounded-lg shadow-md " key={post._id}>
                                    
                                    <div className="post-image">
                                       
                                        { post.image ? 
                                            (<Image className='rounded-t-lg'
                                              sizes='(max-width: 200px) 100vw, 33vw'
                                              src={`${process.env.basePath}/images/${post.image}`}
                                              alt="Post image" width={500} height={500}/>)
                                           
                                            : post.gif ?

                                           ( <img className='rounded-t-lg' src={`${process.env.basePath}/images/${post.gif}`} alt="GIF" style={{width:"500px", height:"400px"}} />)
                                          
                                            : (
                                              <video className='rounded-t-lg' autoPlay controls preload="none" >
                                                <source src={`${process.env.basePath}/images/${post.video}`} type="video/mp4" />
                                                  Your browser does not support the video tag.
                                              </video>
                                              )
                                        }
                                    </div>

                                    <div className="message py-5">
                                        <p className='text-lg mx-4 text-white'>{post.message}</p>
                                        <p className='text-sm me-4 flex flex-1 items-end justify-end mt-8  text-white'>{post.creator ? `Added by ${post.creator}` : "Anonymous"}</p>
                                    </div>

                                </div>
                                
                                    }
                            </>
                        )
                    })
                
                }
            </div>

          </div>
        </div>
    </div>
  )
}

export default PreviewBoard