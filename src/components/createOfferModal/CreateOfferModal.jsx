import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { baseUrl } from '../../../baseURL.js'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { offerSchema } from '../../../formValidation/offerSchema.js'
import { setOffers } from '../../../redux/reducers/OfferSlice.js'
import Swal from 'sweetalert2'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
}

//taking admin token from local storage
const token = localStorage.getItem('adminLogin')

const CreateOfferModal = ({ triggered }) => {
  const [created, setCreated] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  //selection box
  const [discountType, setDiscountType] = useState('')

  const handleChangeSelectionBar = (event) => {
    setDiscountType(event?.target?.value)
  }

  //selection box for offer type
  const [offerType, setOfferType] = useState('')

  const handleChangeOfferType = (event) => {
    setOfferType(event?.target?.value)
  }

  // formik validation
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      offerName: '',
      description: '',
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: new Date().toISOString().split('T')[0],
    },
    validationSchema: offerSchema,
    onSubmit: (values) => {
      const offer = {
        offerName: values?.offerName,
        description: values?.description,
        discountValue: values?.discountValue,
        validFrom: values?.validFrom,
        validUntil: values?.validUntil,
        offerType: offerType,
        discountType: discountType,
      }

      axios
        .post(`${baseUrl}/api/v1/admin/createOffer`, offer, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(setOffers(res?.data?.offers))
            setCreated(!created)
            triggered(created)
            Swal.fire({
              text: res?.data?.message,
              icon: "success"
            });
            resetForm()
            handleClose()
          }
        })
        .catch((error) => {
          Swal.fire({
            text: error?.response?.data?.message,
            icon: "error"
          });
          console.error('Error adding category:', error)
        })
    },
  })

  return (
    <div>
      <button
        className='w-[100px] h-[40px] bg-[#696CFF] font-Playfair text-[#ffff] font-semibold rounded-lg mb-1 '
        onClick={handleOpen}
      >
        Add Offer
      </button>
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
              <div className='flex flex-col gap-2 w-[80%] '>
                <div className='font-Josefin font-bold'>OFFER NAME</div>
                <input
                  id='offerName'
                  type='text'
                  placeholder='Enter offerName...'
                  className={`bg-[#FAFAFA] border h-[40px] w-[90%] rounded-lg ${
                    errors.offerName && touched.offerName
                      ? 'outline-red-400 '
                      : 'outline-none'
                  }`}
                  value={values?.offerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.offerName && touched.offerName && (
                  <div className='text-red-500'>{errors.offerName}</div>
                )}
              </div>
              <div className='flex flex-col gap-2 w-[80%] '>
                <div className='font-Josefin font-bold'>DESCRIPTION</div>
                <input
                  id='description'
                  type='text'
                  placeholder='Description...'
                  className={`bg-[#FAFAFA] border h-[50px] w-[90%] rounded-lg ${
                    errors.description && touched.description
                      ? 'outline-red-400 '
                      : 'outline-none'
                  }`}
                  value={values?.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description && (
                  <div className='text-red-500'>{errors.description}</div>
                )}
              </div>
              <div className='flex flex-col gap-2 w-[50%] mr-[30%]'>
                <div className='font-Josefin font-bold'>DISCOUNT TYPE</div>
                {/*Selection box */}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={discountType}
                      label='Discount Type'
                      onChange={handleChangeSelectionBar}
                    >
                      <MenuItem value={'Percentage'}>Percentage</MenuItem>
                      <MenuItem value={'FixedAmount'}>FixedAmount</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className='flex flex-col gap-2 w-[80%] '>
                <div className='font-Josefin font-bold'>DISCOUNT</div>
                <input
                  id='discountValue'
                  type='number'
                  placeholder='Discount Value...'
                  className={`bg-[#FAFAFA] border h-[50px] w-[50%] rounded-lg ${
                    errors.discountValue && touched.discountValue
                      ? 'outline-red-400 '
                      : 'outline-none'
                  }`}
                  value={values?.discountValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.discountValue && touched.discountValue && (
                  <div className='text-red-500'>{errors.discountValue}</div>
                )}
              </div>

              <div className='flex gap-2 w-[80%]'>
                <div>
                  <div className='font-Josefin font-bold'>VALID FROM</div>
                  <input
                    id='validFrom'
                    type='date'
                    placeholder='YYYY-MM-DD' // Placeholder format for date
                    className={`bg-[#FAFAFA] border h-[50px] w-[100%] rounded-lg ${
                      errors.validFrom && touched.validFrom
                        ? 'outline-red-400'
                        : 'outline-none'
                    }`}
                    value={values.validFrom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.validFrom && touched.validFrom && (
                    <div className='text-red-500'>{errors.validFrom}</div>
                  )}
                </div>

                <div>
                  <div className='font-Josefin font-bold'>VALID UNTIL</div>
                  <input
                    id='validUntil'
                    type='date'
                    placeholder='YYYY-MM-DD'
                    className={`bg-[#FAFAFA] border h-[50px] w-[100%] rounded-lg ${
                      errors.validUntil && touched.validUntil
                        ? 'outline-red-400'
                        : 'outline-none'
                    }`}
                    value={values?.validUntil}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.validUntil && touched.validUntil && (
                    <div className='text-red-500'>{errors.validUntil}</div>
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-2 w-[50%] mr-[30%]'>
                <div className='font-Josefin font-bold'>OFFER TYPE</div>
                {/*Selection box */}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={offerType}
                      label='offerType'
                      onChange={handleChangeOfferType}
                    >
                      <MenuItem value={'Product'}>Product</MenuItem>
                      <MenuItem value={'Category'}>Category</MenuItem>
                      <MenuItem value={'Referral'}>Referral</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <div className='flex'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-[100px] h-[40px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair cursor-pointer'
                >
                  ADD
                </button>

                <button
                  onClick={() => handleClose()}
                  className='w-[100px] h-[40px] flex justify-center items-center bg-[#FFFF] border-2 text-[#1c1c1c] rounded-md mr-5 font-Playfair cursor-pointer'
                >
                  CLOSE
                </button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default CreateOfferModal
