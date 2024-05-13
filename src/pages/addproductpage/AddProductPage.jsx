import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import SideBar from '../../components/sidebar/SideBar'
import FileInput from '../../components/imagecrop/FileInput.jsx'
import ImageCropper from '../../components/imagecrop/ImageCropper.jsx'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import { baseUrl } from '../../../baseURL.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddProductPage = () => {
  const navigate = useNavigate()
  // Initialize imgArray and setImgArray to update its state
  const [imgArray, setImgArray] = useState([])
  // Initialize other state variables
  const [image, setImage] = useState('')
  const [currentPage, setCurrentPage] = useState('choose-img')
  const [imgAfterCrop, setImgAfterCrop] = useState('')

  //specification state
  const [specName, setSpecName] = useState('')
  const [specValue, setSpecValue] = useState('')
  const [specs, setSpecs] = useState([])

  // Function to add specifications
  function addSpecs() {
    const newSpec = { specName: specName, specValue: specValue }
    setSpecs([...specs, newSpec])
    setSpecName('')
    setSpecValue('')
  }

  // Callback function when an image is selected
  const onImageSelected = (selectedImage) => {
    setImage(selectedImage)
    setCurrentPage('crop-img')
  }

  // Callback function when cropping is done
  const onCropDone = (imgCroppedArea) => {
    // Create a canvas element to crop the image
    const canvasEle = document.createElement('canvas')
    canvasEle.width = imgCroppedArea.width
    canvasEle.height = imgCroppedArea.height
    const context = canvasEle.getContext('2d')

    // Load the selected Image
    let imageObj1 = new Image()
    imageObj1.src = image
    imageObj1.onload = function () {
      // Draw the cropped portion of the image onto the canvas
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      )
      // Convert the canvas content to a data URL (JPEG format)
      const dataURL = canvasEle.toDataURL('image/jpeg')
      // Update imgArray with the new cropped image
      setImgArray((prevArray) => [...prevArray, dataURL])
      // Set imgAfterCrop to the latest cropped image
      setImgAfterCrop(dataURL)
      // Set currentPage to "img-cropped"
      setCurrentPage('img-cropped')
    }
  }

  //callback fucntion when cropping is cancelled
  const onCropCancel = () => {
    setCurrentPage('choose-img')
    setImage('')
  }

  const handleRemove = (index) => {
    const imgArr = [...imgArray]
    imgArr.splice(index, 1)
    setImgArray(imgArr)
  }
  //form submission
  const [productVarient, setProductVarient] = useState('')
  const [color, setColor] = useState('')
  const [stock, setStock] = useState(0)
  const [regularPrice, setRegularPrice] = useState(0)
  const [salePrice, setSalePrice] = useState(0)

  //takig baseproduct id
  const baseProductId = useSelector((state) => state.baseProducts.productId)
  const token = localStorage.getItem('adminLogin')
  const handleSubmit = async (e) => {
    try {
      const productVarientdetails = {
        id: baseProductId,
        productVarient,
        color,
        stock,
        regularPrice,
        salePrice,
        specification: specs,
        images: imgArray,
      }

if(productVarientdetails.specification.length==0){
  Swal.fire({
    text: 'Please fill in all fields.',
    icon: 'error',
  })
}

      axios
        .post(
          `${baseUrl}/api/v1/admin/addProductVarient`,
          productVarientdetails,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            navigate('/varients')
             Swal.fire({
                 text: res.data.message,
                 icon: "success"
          });
          } else {
            navigate('/admin/base-products')
             Swal.fire({
                 text: res.data.message,
                 icon: "error"
          });
          }
        })
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  //handleRemoveSpecs
  function handleRemoveSpec(index) {}

  return (
    <div className='flex bg-[#F5F5F9] '>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full rounded-lg flex justify-evenly'>
          {/*form for submission */}
          <div className='bg-[#FFFF] w-[68%] '>
            <div className='ml-20 flex flex-col gap-4'>
              <div className='font-Playfair text-[18px] text-[#566A7F] mt-4 '>
                Product Information
              </div>
              {/*two boxes */}
              <div className='flex'>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    PRODUCT VARIENT
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                    onChange={(e) => setProductVarient(e.target.value)}
                  />
                </div>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    COLOR
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>
              {/*two boxes */}
              <div className='flex'>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    STOCK
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    REGULAR PRICE
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                    onChange={(e) => setRegularPrice(e.target.value)}
                  />
                </div>
              </div>
              {/*two boxes */}
              <div className='flex'>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    SALE PRICE
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>
                {/*BUTTON*/}
                <div className='w-[35%] flex justify-evenly mt-4 '>
                  <button className='bg-[#EBEEF0] w-[48%] h-[50px] rounded-lg text-[#566A7F]'>
                    Discard
                  </button>
                  <button
                    className=' w-[48%] h-[50px] rounded-lg bg-[#696CFF] text-[#ffff]'
                    onClick={handleSubmit}
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[30%] justify-between'>
            {/*Image adding section */}
            <div className='bg-[#FFFFFF] w-[100%]  h-[50%] rounded-md flex flex-col items-center gap-2 '>
              <div className='font-Playfair mt-3'>Add images</div>
              <div className='h-[250px] w-[100%] overflow-auto'>
                <div className='flex flex-wrap justify-evenly  items-center gap-3 mt-3 mb-4'>
                  {/*Conatiner for select image */}
                  <div className='h-full w-[100%] flex justify-center'>
                    {currentPage === 'choose-img' ||
                    currentPage === 'img-cropped' ? (
                      <FileInput onImageSelected={onImageSelected} />
                    ) : currentPage === 'crop-img' ? (
                      <ImageCropper
                        image={image}
                        onCropDone={onCropDone}
                        onCropCancel={onCropCancel}
                      />
                    ) : (
                      <div>
                        <img src={imgAfterCrop} alt='' />
                      </div>
                    )}
                  </div>

                  <div className='w-[100%] flex flex-wrap justify-center items-center gap-3 overflow-auto'>
                    {imgArray?.map((image, index) => (
                      <div
                        className='w-[100px] h-[100px] flex items-center justify-center rounded-md relative'
                        key={index}
                      >
                        <img
                          src={image}
                          alt=''
                          className='w-[90px] h-[90px] rounded-md absolute'
                        />
                        <button onClick={() => handleRemove(index)}>
                          <ImCross className='absolute right-2 top-2 text-[#000000] text-[12px]' />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/*specification section */}
            <div className='bg-[#FFFFFF] w-[100%] h-[48%] rounded-md flex flex-col gap-2 mt-3 '>
              <div className='font-Playfair mt-3 ml-5 '>Add Specification</div>
              <div className='w-[100%] h-full flex flex-col justify-center items-center mb-3'>
                <div className='h-full  w-[100%] overflow-auto justify-center items-center '>
                  <div className='flex justify-evenly'>
                    <div className='font-Playfair font-bold text-[13px]'>
                      Specification Name
                    </div>
                    <div className='font-Playfair font-bold text-[13px]'>
                      Specification Value
                    </div>
                  </div>
                  {specs?.map((value, index) => (
                    <div
                      key={index}
                      className='flex justify-evenly ml-3 items-center mt-1 '
                    >
                      <div className='flex font-Josefin font-bold'>
                        {value.specName}
                      </div>
                      <div className='flex font-Josefin font-bold'>
                        {value.specValue}
                      </div>
                      <button onClick={() => handleRemoveSpec(index)}>
                        <ImCross className='right-2 top-2 text-[#000000] text-[12px]' />
                      </button>
                    </div>
                  ))}
                </div>
                {/*two boxes */}
                <div className='flex w-[100%] justify-center items-center '>
                  {/*input box */}
                  <div className='w-[44%]'>
                    <div className='font-Josefin text-[14px] text-[#566A7F]'>
                      Specification
                    </div>
                    <input
                      type='text'
                      className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                      onChange={(e) => setSpecName(e.target.value)}
                      value={specName}
                    />
                  </div>
                  {/*input box */}
                  <div className='w-[44%]'>
                    <div className='font-Josefin text-[14px] text-[#566A7F]'>
                      Value
                    </div>
                    <input
                      type='text'
                      className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                      onChange={(e) => setSpecValue(e.target.value)}
                      value={specValue}
                    />
                  </div>
                  <button
                    className='w-[40px] h-[20x] bg-[#696CFF] text-[#ffff] text-[14px] rounded-md mt-4 mr-2'
                    onClick={addSpecs}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProductPage
