import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import CategoryDropdown from '../../components/categoryDropdown/CategoryDropdown.jsx'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setBaseProducts } from '../../../redux/reducers/BaseProductSlice.js'
import { baseUrl } from '../../../baseURL.js'

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

const AddBaseProduct = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({
    title: '',
    description: '',
    brand: '',
  })
  const [selectedCategory, setSelectedCategory] = useState('')
  const [errors, setErrors] = useState({})

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const token = localStorage.getItem('adminLogin')

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    })

    // Clear error message when user starts typing
    setErrors({
      ...errors,
      [event.target.id]: '',
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Basic validation
    if (
      !values.title ||
      !selectedCategory ||
      !values.brand ||
      !values.description
    ) {
      setErrors({
        title: !values.title ? 'Title is required' : '',
        category: !selectedCategory ? 'Category is required' : '',
        brand: !values.brand ? 'Brand is required' : '',
        description: !values.description ? 'Description is required' : '',
      })
      return
    }

    const category = {
      title: values.title,
      description: values.description,
      category: selectedCategory,
      brand: values.brand,
    }

    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/admin/addBaseProduct`,
        category,
        {
          headers: {
            Authorization: token,
          },
        }
      )

      dispatch(setBaseProducts(res?.data?.products))

      if (res.status === 201) {
        Swal.fire({
          text: res.data.message,
          icon: 'success',
        })
      } else {
        Swal.fire({
          text: res.data.message,
          icon: 'error',
        })
      }
    } catch (err) {
      console.log(err)
      Swal.fire({
        text: 'An error occurred while adding the base product.',
        icon: 'error',
      })
    }

    handleClose()
  }

  const categoryChange = (value) => {
    setSelectedCategory(value)

    // Clear error message when category changes
    setErrors({
      ...errors,
      category: '',
    })
  }

  return (
    <div>
      <div>
        <Button onClick={handleOpen}>ADD BASE PRODUCT</Button>
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
                  ADD BASE PRODUCT
                </div>
                <div className='flex flex-col gap-2 w-[80%] '>
                  <div className='font-Josefin font-bold'>Name</div>
                  <input
                    id='title'
                    type='text'
                    placeholder='Enter title...'
                    className={`bg-[#FAFAFA] border h-[40px] w-[90%] rounded-lg ${
                      errors.title ? 'outline-red-400 ' : 'outline-none'
                    }`}
                    value={values.title}
                    onChange={handleChange}
                  />
                  {errors.title && (
                    <div className='text-red-500'>{errors.title}</div>
                  )}
                </div>
                <div className='flex flex-col gap-2 w-[80%] '>
                  <div className='font-Josefin font-bold'>Category</div>
                  <CategoryDropdown category={categoryChange} />
                  {errors.category && (
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
                      errors.brand ? 'outline-red-400 ' : 'outline-none'
                    }`}
                    value={values.brand}
                    onChange={handleChange}
                  />
                  {errors.brand && (
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
                      errors.description ? 'outline-red-400 ' : 'outline-none'
                    }`}
                    value={values.description}
                    onChange={handleChange}
                  />
                  {errors.description && (
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

export default AddBaseProduct
