import axios from 'axios';
import React, {useEffect, useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { FileUploader } from "react-drag-drop-files"; 
import { IoMdArrowRoundBack } from "react-icons/io";
import Swal from 'sweetalert2'
import { BsCloudUpload } from "react-icons/bs";
import {  motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
// import { getBoardApi } from '../api/getBoardApi';

function BackgroundImageTab({setImageUrl, boardId, imageUrl, setUploadedImage, setOpenNav, setSideComponent,setAnimateModal}) {
  const [imageData, setImageData] = useState([]);
  const [imageSearchValue, setImageSearchValue] = useState('');
  const [imageSection, setImageSection] = useState(false);
  const [uploadImageCompo, setUploadImageCompo] = useState(false);
  const [debounceTimerForImage, setDebounceTimerForImage] = useState(0)
  const [imagePage, setImagePage] = useState(1);
  const [image,setImage] = useState(null)
  
  const params = {
    query: imageSearchValue,
    page:  imagePage,
    per_page: 12,
    client_id: process.env.clientId,
    orientation: 'portrait',
};

  useEffect(()=>{
    if(imageSearchValue){
      setImageSection(true)
        clearTimeout(debounceTimerForImage);
        const newDebounceTimer = setTimeout(() => {
          fetchImages()
            }, 500);
            setDebounceTimerForImage(newDebounceTimer);
          }else{
              setImageData("")
            }
            
            return () => {
                if (debounceTimerForImage) {
                    clearTimeout(debounceTimerForImage);
                    setImageData("")
        }};

   
}, [imageSearchValue])

 const fetchImages = () =>{
  setImagePage((imgPg) => imgPg + 1 )
  axios.get(process.env.unsplashUrl, { params })
  .then(response => {
      setImageData(response.data.results)
      console.log(response.data.results);
  })
  .catch(error => console.error('Error:', error))
 }

const handleBackground = (backgroundImage) => {
    setImageUrl(backgroundImage)
    document.body.style.backgroundAttachment = "fixed"
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundPosition = "center"
}

const updateBackground = () => {
    const formData = new FormData();
    
    if(image){
      formData.append('uploaded_image', image)
      }
    if(imageUrl){
        formData.append('unsplashImage', imageUrl)
    }
      formData.append('boardId', boardId)
  
      axios.post(`${process.env.basePath}/boards/updateBackground`, formData, {
        headers:{
            "Content-Type": "multipart/form-data"
            }
      })
      .then((res) => {
          console.log(res);
          if(res.status === 200){
            setAnimateModal(true)
            setOpenNav(false)
            setSideComponent('color')
            console.log("Image true");
            getBoard()
            const selectImage = document.getElementById('upload_image')
            selectImage.textContent = "drag and drop your image file here or click to select a file"
          }
            
      }).catch((err) => {
          console.log(err);
      })
}

const getBoard = () =>{
  axios.get(`${process.env.basePath}/boards/${boardId}`)
  .then((res) => {
    console.log(res);
    const boardImage = Buffer.from(res.data.board.uploaded_image.data)
    setUploadedImage(`${process.env.basePath}/images/${boardImage}`)
  })
  .catch((err) => {
    console.log(err);
  })
}

  useEffect(()=>{
    const selectImage = document.getElementById('upload_image')
    if(image){
        selectImage.textContent = `File saved - (${image.name})`
    }

}, [image])

const handleUploadFiles = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImage(file);
  }
};

  return (

    <div data-offset='0' data-aos="fade-left"  data-aos-easing="ease-in-back" data-aos-duration="300">
        <div className='h-full'>

        {uploadImageCompo ? 
        
        <div className='edit-board text-center'>
            <div>
              <IoMdArrowRoundBack onClick={() => {setUploadImageCompo(false)}} className='text-black text-2xl cursor-pointer'/>
              <p className='font-light text-md text-black mt-2'>Please upload image that are appropriate for all audiences. We reserve the right to remove content without notice!</p>
              <label htmlFor="file" className="labelFile border-2 border-gray-300 rounded-lg px-4 "><span><BsCloudUpload className="text-2xl" /></span>
                  <div className='mt-2 w-full'>
                      <p id='upload_image'>drag and drop your image file here or click to select a file</p>
                      <p className='text-end text-xs font-semibold mt-3' >JPG, PNG, JPEG</p>
                  </div>
              </label>                         
              <input accept='.png,.jpg,.jpeg' className="upload-input" name="uploaded_image" id="file" type="file" onChange={handleUploadFiles} />
              
            </div>  
            <div className="flex items-center justify-center ">
              <motion.button disabled={image ? false : true} whileTap={{ scale: 0.9 }} onClick={updateBackground} className='p-3 text-sm font-semibold rounded-md text-gray-600 border border-gray-400 mt-4' >Apply changes</motion.button>
          </div>
        </div>
        
        :

        <div className='transition-all ease-linear h-full'>
          
          <div>
              <p className='font-light text-md text-black text-center '>Search Image that are appropriate for all audiences. We reserve the right to remove content without notice! </p>
              <input name='image' type="search" className="mt-3 text-black outline-none px-3 py-3 rounded-md bg-transparent text-sm border border-gray-400 w-full" value={imageSearchValue} placeholder={`Search...`} onChange={(e) => setImageSearchValue(e.target.value)} /> 
          </div>
          
            {
              imageSection && imageSearchValue &&
                  <div style={{maxHeight:"220px"}} className="flex my-3 splashImages-container flex-wrap overflow-auto items-start justify-center">
                    {imageData.length > 0 && <p className='text-sm text-black'>Select image and apply changes</p>}
                  
                      {imageSearchValue && imageData.length ?  
                          imageData.map((img, index) => { 
                              return(
                                  <div key={index} className='mx-1 mt-2 cursor-pointer' style={{width:"80px", height:"100px"}} 
                                      onClick={() => handleBackground(img.urls.full)}>
                                      <img style={{ border: img.urls.full === imageUrl ? "2px solid black" : "none"}}  className={`btn p-0 m-0 border-none bg-transparent hover:bg-transparent h-full w-full`} src={img.urls.thumb} alt="IMAGE URL" />
                                  </div> 
                              )})
                          : imageSearchValue && !imageData ? <div className='mt-2 font-semibold text-sm'>Searching...</div> 
                          : <div className='mt-2 font-semibold text-sm' >No images found for "{imageSearchValue}"</div>}
                          {imageData.length > 0 && <motion.button whileTap={{ scale: 0.9 }} onClick={fetchImages} className='border text-sm my-1 px-2 py-1 rounded-md border-black text-black'>Load more</motion.button>}
                  </div>
            }

          <div className="mt-4 flex items-end justify-evenly">
            <motion.button whileTap={{ scale: 0.9 }} onClick={updateBackground} className='border border-gray-400 p-3 rounded-md text-sm font-semibold text-gray-600' >Apply changes</motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setUploadImageCompo(true)} className='border-b text-indigo-950 border-indigo-950 text-sm'>Want to upload?</motion.button>
          </div>

        </div>
        }
        </div>

        {/* {animatedModal ?
          <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpenErrorModal(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-green-400 to-green-700 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                    <FiAlertCircle className="text-white/10 rotate-12 text-[250px]  absolute z-0 -top-24 -left-24" />
                    <div className="relative z-10">
                        <div className="bg-green-400 w-16 h-16 mb-2 rounded-full text-3xl text-white grid place-items-center mx-auto">
                            <FiAlertCircle />
                        </div>
                        <h3 className="text-3xl font-bold text-center mb-2">Background updated</h3>
                        <p className="text-center mb-6">Your background is set successfully</p>
                        <div className="flex gap-2">
                            <button onClick={() => setAnimateModal(false)} className="bg-transparent hover:bg-white/10 transition-colors
                            text-white font-semibold w-full py-2 rounded"> Close </button>
                        </div>
                    </div>
                    </motion.div>
                </motion.div>
          </AnimatePresence> : ""} */}
    </div>
  )
}

export default BackgroundImageTab