import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { FileUploader } from "react-drag-drop-files"; 
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsCloudUpload } from "react-icons/bs";
import {  motion } from "framer-motion";
import Image from 'next/image';
import { MdDelete } from "react-icons/md";
import Loader from './Loader';

function BackgroundImageTab({setImageUrl, boardId, imageUrl, setUploadedImage, setOpenNav, setSideComponent,setAnimateModal, fetchBoard, handleBackground}) {
  const [imageData, setImageData] = useState([]);
  const [imageSearchValue, setImageSearchValue] = useState('');
  const [imageSection, setImageSection] = useState(false);
  const [uploadImageCompo, setUploadImageCompo] = useState(false);
  const [debounceTimerForImage, setDebounceTimerForImage] = useState(0)
  const [imagePage, setImagePage] = useState(1);
  const [image,setImage] = useState(null)
  const [loading, setLoading] = React.useState(false)
  const [uploadedImagePreview, setUploadedImagePreview] = useState("");
  const [previewImageComponent, setImagePreviewComponent] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)
  const borderColor = loading ? 'border-[#FF9669]' : 'border-gray-600';
  
  const unsplashParams = {
    query: imageSearchValue,
    page:  imagePage,
    per_page: 12,
    client_id: process.env.clientId,
    orientation: 'landscape',
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

const fetchImages = async () => {

  try {
    setImagePage((imgPg) => imgPg + 1 )
    const response = await axios.get(process.env.unsplashUrl, { params: unsplashParams })
    setImageData(response.data.results)
    console.log(response.data.results);
  } catch (error) {
      console.error('Error:', error)
  }
  
 }

const updateBackground = async () => {
    setLoading(true)
    const formData = new FormData();
    
    if(uploadedImagePreview){
      formData.append('uploaded_image', image)
      }
    if(imageUrl){
        formData.append('unsplashImage', imageUrl)
    }
      formData.append('boardId', boardId)
    try {
      
        const res = await axios.post(`${process.env.basePath}/boards/updateBackground`, formData, {
          headers:{
            "Content-Type": "multipart/form-data"
            }
          })
          if(res.status === 200){

            setOpenNav(false)
            setSideComponent('color')
            
            if(uploadedImagePreview || image){
              await fetchBoard(boardId)
            }
          }
          
          setAnimateModal(true)
          setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
    }
      
}

useEffect( ()=>{

  image && uploadImage()
  
}, [image])

  const uploadImage = async () => {
    setImagePreviewComponent(true)
    setImageLoading(true)
    const formData = new FormData();
    formData.append('uploaded_image', image)
    try {
      
      const res = await axios.post(`${process.env.basePath}/boards/upload`, formData ,{
        headers:{
          "Content-Type": "multipart/form-data"
          }
        })
        setUploadedImagePreview(`${process.env.basePath}/images/${res.data.uploadedImage}`)
        setImageLoading(false)
    } catch (error) {
      console.error(error);
    }
}

const deleteImage = async () => {
  setDeleteLoader(true)
  try {
    
    const response = await axios.post(`${process.env.basePath}/boards/delete`, {image: image.name})
    if(response.status === 200){
      setDeleteLoader(false)
      setUploadedImagePreview("");
      setImagePreviewComponent(false);
    }
  } catch (error) {
    console.log(error);
  }
}

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
          
            <div className='edit-board'>

                <div>
                    <IoMdArrowRoundBack onClick={() => {setUploadImageCompo(false)}} className='text-black text-2xl cursor-pointer'/>
                    {
                      previewImageComponent ? 
                  
                      <div className="mt-3 h-full">
                          <p className='text-center text-lg font-semibold text-black'>Preview your image</p>
                          
                          { imageLoading ? 
                          
                              <div className='flex items-end justify-center mt-10 py-20 flex-1 ' >
                                <Loader color="#FF9669" size="md" text="Loading preview" margin="2" font="md" />
                              </div>
                              : 
                              <>
                                <button onClick={() => {deleteImage()}} className='bg-black relative top-9 left-2 p-1 rounded-lg'>
                                    <MdDelete className=' text-white text-lg hover:text-gray-400'/>
                                </button>
                                <Image src={uploadedImagePreview} className='rounded-lg' alt='Your image' width={300} height={300} /> 
                              </>
                            }
                      </div>
                      : !previewImageComponent ?
                      <>
                          <p className='font-light text-md text-black mt-2 text-center'>Please upload image that are appropriate for all audiences. We reserve the right to remove content without notice!</p>
                          <label htmlFor="file" className="labelFile border-2 border-gray-300 rounded-lg px-4 "><span><BsCloudUpload className="text-2xl" /></span>
                              <div className='mt-2 w-full'>
                                  <p id='upload_image'>drag and drop your image file here or click to select a file</p>
                                  <p className='text-end text-xs font-semibold mt-3' >JPG, PNG, JPEG</p>
                              </div>
                          </label>                         
                          <input accept='.png,.jpg,.jpeg' className="upload-input" name="uploaded_image" id="file" type="file" onChange={handleUploadFiles} />
                      </>
                      
                      : deleteLoader ?  
                      
                          <div className='flex items-end justify-center mt-10 py-20 flex-1 ' >
                              <Loader color="#FF9669" size="md" />
                              <span className='text-md ms-2 text-[#FF9669]' >Deleting preview</span> 
                          </div>

                      : ""
                      }
                </div> 

                <div className="flex items-center justify-center ">
                  <motion.button 
                    disabled={uploadedImagePreview ? false : true} 
                    whileTap={{ scale: 0.9 }} onClick={updateBackground} 
                    className={`p-3 text-sm font-semibold rounded-md text-gray-600 border ${borderColor} mt-4`} >
                  { loading ? 

                    <div className='flex items-center'>
                      <Loader color="#FF9669" size="xs" />
                      <span className="text-[#FF9669] ms-2">Saving...</span>
                    </div>

                    : "Apply changes"
                    }
                  </motion.button>
              </div>
            </div>
            
            :

            <div className='transition-all ease-linear h-full'>
              
              <div>
                  <p className='font-light text-md text-black text-center '>Search Image that are appropriate for all audiences. We reserve the right to remove content without notice! </p>
                  <input name='image' type="search" 
                    className="unsplash-image-search-input" 
                    value={imageSearchValue} 
                    placeholder={`Search...`} 
                    onChange={(e) => setImageSearchValue(e.target.value)} /> 
              </div>
              
                {
                  imageSection && imageSearchValue &&
                      <div style={{maxHeight:"220px"}} className="unsplash-image-section">
                        {imageData.length > 0 && <p className='text-sm text-black'>Select image and apply changes</p>}
                      
                          {imageSearchValue && imageData.length ?  
                              imageData.map((img, index) => { 
                                  return(
                                      <div key={index} className='mx-1 mt-2 cursor-pointer' style={{width:"90px", height:"115px"}} 
                                          onClick={() => handleBackground(img.urls.full)}>
                                          <img style={{ border: img.urls.full === imageUrl ? "2px solid black" : "none"}}  
                                            className={`unsplash-section-image`} src={img.urls.small} alt="IMAGE URL" />
                                      </div> 
                                  )})
                              : imageSearchValue && !imageData ? <div className='mt-2 font-semibold text-sm'>Searching...</div> 
                              : <div className='mt-2 font-semibold text-sm' >No images found for "{imageSearchValue}"</div>}
                              {imageData.length > 0 && 
                                <motion.button whileTap={{ scale: 0.9 }} onClick={fetchImages} 
                                className='unsplash-load-more-button'>Load more</motion.button>}
                      </div>
                }

              <div className="mt-4 flex items-end justify-evenly">
                <motion.button whileTap={{ scale: 0.9 }} onClick={updateBackground} 
                className={`border ${borderColor} p-3 rounded-md text-sm font-semibold text-gray-600`} >
                { loading ? 

                    <div className='flex items-center'>
                      <Loader color="#FF9669" size="xs" margin="ms-2" text="Saving..." />
                    </div>

                    : "Apply changes"
                    }

                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setUploadImageCompo(true)} 
                  className='border-b text-indigo-950 border-indigo-950 text-sm'>Want to upload?
                </motion.button>
              </div>

            </div>
          }
        </div>
    </div>
  )
}

export default BackgroundImageTab
