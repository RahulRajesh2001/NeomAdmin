import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { baseUrl } from '../../../baseURL.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import { cuponSchema } from '../../../formValidation/cuponSchema.js';
import axios from 'axios';

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
};

const token = localStorage.getItem('adminLogin');

const CreateCuponModal = ({ triggered }) => {
  const [created, setCreated] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //selection box
  const [discountType, setDiscountType] = useState('');

  const handleChangeSelectionBar = (event) => {
    setDiscountType(event.target.value);
  };

  // formik validation
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      cuponCode: '',
      cuponName: '',
      description: '',
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: new Date().toISOString().split('T')[0],
      usageLimit: '',
      discountValue: '',
    },
    validationSchema: cuponSchema,
    onSubmit: (values) => {
      const cupon = {
        cuponCode: values?.cuponCode,
        cuponName: values?.cuponName,
        description: values?.description,
        discountValue: values?.discountValue,
        validFrom: values?.validFrom,
        validUntil: values?.validUntil,
        discountType: discountType,
        usageLimit: values?.usageLimit,
      };

      axios
        .post(`${baseUrl}/api/v1/admin/createCupon`, cupon, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.status ==200) {
            setCreated(!created);
            triggered(created);
            handleClose();
            resetForm();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <div>
      <Button onClick={handleOpen}>Add Cupon</Button>
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
              <form onSubmit={handleSubmit}
                className='w-[100%] h-full flex flex-col justify-center items-center gap-4 overflow-auto'>
                <div className='overflow-auto w-[100%]  flex flex-col items-center justify-center gap-2'>
                {/*Cupon Code */}
                <div className='flex flex-col gap-2 w-[80%] '>
                  <div className='font-Josefin font-bold'>CUPON CODE</div>
                  <input
                    id='cuponCode'
                    type='text'
                    placeholder='Enter cuponCode...'
                    className={`bg-[#FAFAFA] border h-[40px] w-[90%] rounded-lg ${
                      errors.cuponCode && touched.cuponCode
                        ? 'outline-red-400 '
                        : 'outline-none'
                    }`}
                    value={values?.cuponCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cuponCode && touched.cuponCode && (
                    <div className='text-red-500'>{errors.cuponCode}</div>
                  )}
                </div>
                <div className='flex flex-col gap-2 w-[80%] '>
                  <div className='font-Josefin font-bold'>CUPON NAME</div>
                  <input
                    id='cuponName'
                    type='text'
                    placeholder='Enter cuponName...'
                    className={`bg-[#FAFAFA] border h-[40px] w-[90%] rounded-lg ${
                      errors.cuponName && touched.cuponName
                        ? 'outline-red-400 '
                        : 'outline-none'
                    }`}
                    value={values?.cuponName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cuponName && touched.cuponName && (
                    <div className='text-red-500'>{errors.cuponName}</div>
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
                      <InputLabel id='demo-simple-select-label'>
                        Type
                      </InputLabel>
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
                      placeholder='YYYY-MM-DD'
                      className={`bg-[#FAFAFA] border h-[50px] w-[100%] rounded-lg ${
                        errors.validFrom && touched.validFrom
                          ? 'outline-red-400'
                          : 'outline-none'
                      }`}
                      value={values?.validFrom}
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

                <div className='flex flex-col gap-2 w-[80%] '>
                  <div className='font-Josefin font-bold'>USAGE LIMIT</div>
                  <input
                    id='usageLimit'
                    type='number'
                    placeholder='Usage Limit...'
                    className={`bg-[#FAFAFA] border h-[50px] w-[50%] rounded-lg ${
                      errors.usageLimit && touched.usageLimit
                        ? 'outline-red-400 '
                        : 'outline-none'
                    }`}
                    value={values.usageLimit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.usageLimit && touched.usageLimit && (
                    <div className='text-red-500'>{errors.usageLimit}</div>
                  )}
                </div>

                <div>
                  hhe Click me
                </div>
              </div>
              </form>
              
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateCuponModal;
