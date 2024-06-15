import axios from 'axios';
import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { FileUploader } from "react-drag-drop-files"; 
import { IoMdArrowRoundBack } from "react-icons/io";
import Swal from 'sweetalert2'
import { motion} from 'framer-motion'

function BackgroundImageTab({setImageUrl, boardId, imageUrl, setUploadedImage, setOpenNav}) {
  const [imageData, setImageData] = React.useState([]);
  const [imageSearchValue, setImageSearchValue] = React.useState('');
  const [imageSection, setImageSection] = React.useState(false);
  const [uploadImageCompo, setUploadImageCompo] = React.useState(false);
  const [debounceTimerForImage, setDebounceTimerForImage] = React.useState(0)
  const [imagePage, setImagePage] = React.useState(1);
  const [image,setImage] = React.useState(null)
  const imageTypes = ["JPG", "PNG", "JPEG"];
  
  const params = {
    query: imageSearchValue,
    page:  imagePage,
    per_page: 12,
    client_id: process.env.clientId,
    orientation: 'portrait',
};

  React.useEffect(()=>{
    if(imageSearchValue){
      setImagePage((imgPg) => imgPg + 1 )
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
          console.log(res.data);
          if(res.status === 200){
            setOpenNav(false)
            getBoard()
            }
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
      }).catch((err) => {
          console.log(err);
      })
}

const getBoard = () =>{
  axios.get(`${process.env.basePath}/boards/${boardId}`)
  .then((res) => {
    const boardImage = Buffer.from(res.data.board.uploaded_image.data)
    setUploadedImage(`${process.env.basePath}/images/${boardImage}`)
  })
  .catch((err) => {
    console.log(err);
  })
}

  React.useEffect(()=>{
    const selectImage = document.getElementsByClassName('kFhUBM')[0]
    if(image){
        selectImage.textContent = `File saved - (${image.name})`
    }

}, [image])

  return (

    <div data-offset='0' data-aos="fade-left"  data-aos-easing="ease-in-back" data-aos-duration="300">
        <div className='flex flex-1 flex-col'>
        {uploadImageCompo ? 
        
        <div className='edit-board text-center'>
            <div>
              <IoMdArrowRoundBack onClick={() => {setUploadImageCompo(false)}} className='text-black text-2xl cursor-pointer'/>
              <p className='font-light text-md text-black mt-2'>Please upload image that are appropriate for all audiences. We reserve the right to remove content without notice!</p>
              <FileUploader  
                  handleChange={(file) => setImage(file)}  
                  name="uploaded_image" 
                  type="file"
                  accept='image/JPG,PNG,JPEG'
                  types={imageTypes}
                  label="Drag or Upload an image file"
              /> 
            </div>  
            <div className="flex items-center justify-center ">
              <motion.button whileTap={{ scale: 0.9 }} onClick={updateBackground} className='p-3 text-sm font-semibold rounded-md text-gray-600 border border-gray-400 mt-4' >Apply changes</motion.button>
          </div>
        </div>
        
        :

        <div className='transition-all ease-linear'>
          <div>
              <p className='font-light text-md text-black text-center '>Search Image that are appropriate for all audiences. We reserve the right to remove content without notice! </p>
              <input name='image' type="search" className="mt-3 text-black outline-none px-3 py-3 rounded-md bg-transparent text-sm border border-gray-400 w-full" value={imageSearchValue} placeholder={`Search...`} onChange={(e) => setImageSearchValue(e.target.value)} /> 
          </div>
          {
            imageSection && imageSearchValue &&
                <div style={{maxHeight:"220px"}} className="my-3 splashImages-container flex flex-wrap overflow-auto items-start justify-center">
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
        
          <div className="flex items-end justify-evenly">
            <motion.button whileTap={{ scale: 0.9 }} onClick={updateBackground} className='border border-gray-400 p-3 rounded-md text-sm font-semibold text-gray-600 mt-4' >Apply changes</motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setUploadImageCompo(true)} className='border-b text-indigo-950 border-indigo-950 text-sm'>Want to upload?</motion.button>
          </div>
        </div>
        }
          </div>
    </div>
  )
}

export default BackgroundImageTab