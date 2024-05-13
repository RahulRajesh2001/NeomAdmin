import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { productSchema } from '../../../formValidation/productSchema.js'
import { baseUrl } from '../../../baseURL.js'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBaseProducts } from '../../../redux/reducers/BaseProductSlice.js'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const EditBaseProductPage = ({ id }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [product, setProduct] = useState({})

  // Taking base product
  const baseProducts = useSelector((state) => state?.baseProducts?.baseProducts)
  useEffect(() => {
    const foundProduct = baseProducts.find(
      (baseProduct) => baseProduct?._id === id
    )
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [baseProducts, id])
  const token = localStorage.getItem('adminLogin')
  // formik validation
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        title: '',
        description: '',
        category: '',
        brand: '',
      },
      validationSchema: productSchema,
      onSubmit: (values) => {
        const baseProduct = {
          name: values.title,
          description: values.description,
          category: values.category,
          brand: values.brand,
        }

        try {
          const response = axios.post(
            `${baseUrl}/api/v1/admin/editBaseProduct`,
            baseProduct,
            {
              params: { id },
              headers: {
                Authorization: token,
              },
            }
          )
          response.then((res) => {
            if (res.status === 200) {
              dispatch(setBaseProducts(res?.data?.products))
              alert(res.data.message)
            } else {
              alert(res.data.message)
            }
          })
        } catch (err) {
          console.log(err)
        }

        handleClose()
      },
    })

  return (
    <div>
      <div>
        <Button onClick={handleOpen}>EDIT</Button>
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <form
                onSubmit={handleSubmit}
                className='w-[100%] h-full flex flex-col justify-center items-center gap-4'
              >
                <div className='font-Playfair font-bold text-[18px]'>
                  ADD CATEGORY
                </div>
                <div className='flex flex-col gap-2 w-[80%] '>
                  <div className='font-Josefin font-bold'>Name</div>
                  <input
                    id='title'
                    type='text'
                    placeholder='Enter title...'
                    className={`bg-[#FAFAFA] border h-[40px] w-[90%] rounded-lg ${
                      errors.title && touched.title
                        ? 'outline-red-400 '
                        : 'outline-none'
                    }`}
                    value={values.title || product.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title && (
                    <div className='text-red-500'>{errors.title}</div>
                  )}
                </div>
                <div className='flex flex-col gap-2 w-[80%] '>
                  <div className='font-Josefin font-bold'>Category</div>
                  <input
                    id='category'
                    type='text'
                    placeholder='Category'
                    className={`bg-[#FAFAFA] border h-[40px] w-[90%] rounded-lg ${
                      errors.category && touched.category
                        ? 'outline-red-400 '
                        : 'outline-none'
                    }`}
                    value={values.category || product.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.category && touched.category && (
                    <div className='text-red-500'>{errors.category}</div>
                  )}
                </div>

                <div className='flex flex-col gap-2 w-[80%] '>
                  <div className='font-Josefin font-bold'>Brand</div>
                  <input
                    id='brand'
                    type='text'
                    placeholder='Brand'
                    className={`bg-[#FAFAFA] border h-[40px] w-[90%] rounded-lg ${
                      errors.brand && touched.brand
                        ? 'outline-red-400 '
                        : 'outline-none'
                    }`}
                    value={values.brand || product.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.brand && touched.brand && (
                    <div className='text-red-500'>{errors.brand}</div>
                  )}
                </div>

                <div className='flex flex-col gap-2 w-[80%] '>
                  <div className='font-Josefin font-bold'>DESCRIPTION</div>
                  <input
                    id='description'
                    type='text'
                    placeholder='Description...'
                    className={`bg-[#FAFAFA] border h-[90px] w-[90%] rounded-lg ${
                      errors.description && touched.description
                        ? 'outline-red-400 '
                        : 'outline-none'
                    }`}
                    value={values.description || product.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.description && touched.description && (
                    <div className='text-red-500'>{errors.description}</div>
                  )}
                </div>

                <button
                  type='submit'
                  className='w-[100px] h-[40px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair cursor-pointer'
                >
                  ADD
                </button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  )
}

export default EditBaseProductPage
