import React from 'react';
import SideBar from '../../components/sidebar/SideBar';
import Navbar from '../../components/navbar/Navbar';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../baseURL.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddCupon = () => {
  const token = localStorage.getItem('adminLogin');
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    cuponName: Yup.string().required('Coupon Name is required'),
    cuponCode: Yup.string().required('Coupon Code is required'),
    description: Yup.string().required('Description is required'),
    discountType: Yup.string().required('Discount Type is required'),
    discountValue: Yup.number().required('Discount Value is required'),
    validFrom: Yup.date().required('Valid From date is required'),
    validUntil: Yup.date().required('Valid Until date is required'),
    usageLimit: Yup.number().required('Usage Limit is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${baseUrl}/api/v1/admin/createCupon`, values, {
        headers: { Authorization: token }
      });

      if (res.status === 200) {
        Swal.fire({
          text: res.data.message,
          icon: "success"
        });
        navigate('/admin/cupons');
      }
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error"
      });
    }
  };

  return (
    <div className='flex bg-[#F5F5F9] '>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full rounded-lg flex justify-evenly'>
          <div className='w-[98%] h-full rounded-lg flex justify-center items-center'>
            <div className=' h-full w-[50%] flex flex-col justify-center items-center gap-4 overflow-auto rounded-lg border shadow-lg'>
              <div className='font-Playfair font-bold mt-5'>ADD COUPON</div>
              <Formik
                initialValues={{
                  cuponName: '',
                  cuponCode: '',
                  description: '',
                  discountType: '',
                  discountValue: '',
                  validFrom: '',
                  validUntil: '',
                  usageLimit: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className='flex flex-col gap-2 w-[80%]'>
                      <div className='font-Playfair font-bold text-[13px] '>Coupon Name</div>
                      <Field
                        type='text'
                        name='cuponName'
                        placeholder='Enter Coupon Name...'
                        className={'bg-[#FAFAFA] border h-[40px] rounded-lg'}
                      />
                      <ErrorMessage name='cuponName' component='div' className='error  text-red-600 text-[12px]' />
                    </div>

                    <div className='flex flex-col gap-2 w-[80%]'>
                      <div className='font-Playfair font-bold text-[13px] '>Coupon Code</div>
                      <Field
                        type='text'
                        name='cuponCode'
                        placeholder='Coupon Code'
                        className={'bg-[#FAFAFA] border h-[40px] rounded-lg'}
                      />
                      <ErrorMessage name='cuponCode' component='div' className='error text-red-600 text-[12px]' />
                    </div>

                    <div className='flex flex-col gap-2 w-[90%]'>
                      <div className='font-Playfair font-bold text-[13px] '>Description</div>
                      <Field
                        type='text'
                        name='description'
                        placeholder='Description'
                        className={'bg-[#FAFAFA] border h-[40px] rounded-lg'}
                      />
                      <ErrorMessage name='description' component='div' className='error text-red-600 text-[12px]' />
                    </div>

                    <div className='flex flex-col gap-2 w-[60%] mr-[30%]'>
                      <div className='font-Playfair font-bold text-[13px] '>Discount Type</div>
                      <Field
                        as="select"
                        name="discountType"
                        className={'bg-[#FAFAFA] border h-[40px] rounded-lg'}
                      >
                        <option value="">Select Discount Type</option>
                        <option value="Percentage">Percentage</option>
                        <option value="FixedAmount">FixedAmount</option>
                      </Field>
                      <ErrorMessage name='discountType' component='div' className='error text-red-600 text-[12px]' />
                    </div>

                    <div className='flex flex-col gap-2 w-[50%]'>
                      <div className='font-Playfair font-bold text-[13px] '>Discount Value</div>
                      <Field
                        type='number'
                        name='discountValue'
                        placeholder='Discount Value'
                        className={'bg-[#FAFAFA] border h-[40px] rounded-lg'}
                      />
                      <ErrorMessage name='discountValue' component='div' className='error text-red-600 text-[12px]' />
                    </div>

                    <div className='flex gap-2 w-[100%]'>
                      <div className='flex flex-col w-1/2'>
                        <div className='font-Playfair font-bold text-[13px] '>VALID FROM</div>
                        <Field
                          type='date'
                          name='validFrom'
                          className={'bg-[#FAFAFA] border h-[40px] w-[100%] rounded-lg'}
                        />
                        <ErrorMessage name='validFrom' component='div' className='error text-red-600 text-[12px]' />
                      </div>
                      <div className='flex flex-col w-1/2'>
                        <div className='font-Playfair font-bold text-[13px] '>VALID UNTIL</div>
                        <Field
                          type='date'
                          name='validUntil'
                          className={'bg-[#FAFAFA] border h-[40px] w-[100%] rounded-lg'}
                        />
                        <ErrorMessage name='validUntil' component='div' className='error text-red-600 text-[12px]' />
                      </div>
                    </div>

                    <div className='flex flex-col gap-2 w-[50%]'>
                      <div className='font-Playfair font-bold text-[13px] '>Usage Limit</div>
                      <Field
                        type='number'
                        name='usageLimit'
                        placeholder='Usage Limit'
                        className={'bg-[#FAFAFA] border h-[40px] rounded-lg'}
                      />
                      <ErrorMessage name='usageLimit' component='div' className='error text-red-600 text-[12px]' />
                    </div>

                    <div className='flex mt-3'>
                      <button
                        type='submit'
                        className='w-[100px] h-[40px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair cursor-pointer'
                        disabled={isSubmitting}
                      >
                        ADD
                      </button>

                      <button
                        type='button'
                        onClick={() => navigate('/')}
                        className='w-[100px] h-[40px] flex justify-center items-center bg-[#FFFF] border-2 text-[#1c1c1c] rounded-md mr-5 font-Playfair cursor-pointer'
                      >
                        CLOSE
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCupon;
