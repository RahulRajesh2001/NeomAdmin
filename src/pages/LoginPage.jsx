import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { loginSchema } from '../../formValidation/loginFormValidation.js';
import axios from 'axios'
import {baseUrl} from '../../baseURL.js'
import Swal from 'sweetalert2';

const LoginPage = () => {
  const navigate=useNavigate()
  const onSubmit = (values, actions) => {
    const admin={
      email: values.email,
      password: values.password,
    }
        axios.post(`${baseUrl}/api/v1/admin/adminlogin`,admin).then((res)=>{
          if(res.status ==200){
            localStorage.setItem('adminLogin',res?.data?.token)
          navigate('/admin/dashboard')
          Swal.fire({
            title: res.data.message,
            icon: "success"
          });
          }else{
            alert(res.data.message)
          }
        }).catch((err)=>{
          console.log(err)
        })
  };

  // formik validation
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:loginSchema,
    onSubmit,
  });

  return (
    <div className='bg-[#F5F5F9] h-screen flex justify-center items-center'>
      {/* Container */}
      <form className='bg-[#FFFFFF] h-[50%] w-[35%] flex flex-col justify-center items-center gap-8 rounded-md' onSubmit={handleSubmit}>
        <div className='text-[25px] font-Playfair'>Admin Login</div>
        <div className='w-[100%] flex flex-col justify-center items-center'>
          <div className='font-Josefin font-bold text-[15px]'>Email</div>
          <input
            id='email'
            name='email' 
            type='email'
            className={`bg-[#FAFAFA] border h-[40px] w-[70%] rounded-lg ${
              errors.email ? 'outline-red-400 ' : 'outline-none'
            }`}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur} 
          />
          {errors.email ? <p className='text-[10px] '>{errors.email}</p> : ''}
        </div>
        <div className='w-[100%] flex flex-col justify-center items-center'>
          <div className='font-Josefin font-bold text-[15px]'>Password</div>
          <input
            id='password'
            name='password' 
            type='password'
            className={`bg-[#FAFAFA] border h-[40px] w-[70%] rounded-lg ${
              errors.password ? 'outline-red-400 ' : 'outline-none'
            }`}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password ? <p className='text-[10px] '>{errors.password}</p> : ''}
        </div>
        {/* Button */}
        <button className='bg-[#E7AB3C] w-[70%] h-[40px] rounded-md font-Playfair  text-[#ffff]' type='submit'>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
