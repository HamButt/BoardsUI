import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';
function PreviewBoard({setPreview, occasion}){
  
  const [posts,setPosts] = useState([])
  const [imageUrl,setImageUrl] = useState([])
  const [title,setTitle] = useState('')
  
  useEffect(()=>{
      console.log("occasion",occasion);
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
    <div  style={{backgroundImage: `url(${imageUrl})`,backgroundRepeat:"no-repeat",backgroundAttachment:"fixed", backgroundSize:'cover',backgroundPosition:"center"}}>
        <Head>
          <title >{capitalizeTitle(occasion)}</title>
        </Head>

        <header className='fixed top-0 right-0 left-0 z-50 bg-white py-6 shadow'>
          <div className="flex items-center justify-between sm:justify-evenly">
            <button className='back-button btn bg-transparent hover:bg-transparent border-none shadow-none'>
              <IoMdArrowRoundBack className='text-black text-3xl' onClick={() => setPreview(false)}/>
            </button>
            <div className="max-sm:hidden description-title">
              <p className='text-2xl font-semibold'>Celebrate {occasion} emotion with Praise Board</p>
              <p className='text-lg font-medium'>Drive employee happiness by celebrating milestones with online {occasion} posts by Praise Board</p>
            </div>
            <Link className='preview-board-create-btn btn hover:bg-black max-md:me-5 bg-black text-white text-lg font-light' href='/boards/create'>Create Board</Link>
          </div>
          <div className="sm:hidden descrip-title text-start mx-5 mt-4">
            <p className='text-lg font-semibold'>Celebrate {occasion} emotion with Praise Board</p>
            <p className='text-md font-medium'>Drive employee happiness by celebrating milestones with online {occasion} posts by Praise Board</p>
          </div>
        </header>

        <div className='' data-offset='0' data-aos="fade-down"  data-aos-easing="ease-in-back" data-aos-duration="1000" >

          <div className="selected-title bg-gray-200 mt-[105px] py-10">
              <p className='text-xl sm:text-3xl py-1 sm:py-2 text-center text-black'>{title}</p>
          </div>
           
          <div className="image-section " data-offset='0' data-aos="fade"  data-aos-easing="ease-in-back" data-aos-duration="1000">

             <div className="image flex items-start justify-center flex-wrap py-2" >

                  { posts.map((post,index) => {
                        
                        return (
                            <>
                                {
                                
                                <div className="preview-posts  bg-[#202459] mt-3 mx-3 rounded-lg shadow-md" key={post._id}>
                                    
                                    <div className="post-image">
                                       
                                        { post.image ? 
                                            (<Image className='preview-image rounded-t-lg'
                                              sizes='(max-width: 200px) 100vw, 33vw'
                                              src={`${process.env.basePath}/images/${post.image}`}
                                              alt="Post image"  width={0} height={0}/>)
                                           
                                            : post.gif ?

                                           ( <img className='preview-gif rounded-t-lg' src={`${process.env.basePath}/images/${post.gif}`} alt="GIF" />)
                                          
                                            : (
                                              <video className='preview-video rounded-t-lg' autoPlay controls preload="none" >
                                                <source src={`${process.env.basePath}/images/${post.video}`} type="video/mp4" />
                                                  Your browser does not support the video tag.
                                              </video>
                                              )
                                        }
                                    </div>

                                    <div className="message py-4">
                                        <p className='text-lg mx-5 text-white'>{post.message}</p>
                                        <p className='text-sm flex flex-1 pe-4 items-end justify-end mt-4  text-white'>{post.creator ? `Added by ${post.creator}` : "Anonymous"}</p>
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