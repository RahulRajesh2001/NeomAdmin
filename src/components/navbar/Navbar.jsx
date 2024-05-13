import React from 'react'
import profile1 from '../../assets/profile1.jpg'

const Navbar = () => {
  return (
    <div className='bg-[#FFFFFF] h-[50px] rounded-md flex justify-end items-center w-[98%] ml-2 mr-2 mt-2 mb-2'>
   
      <div className='mr-[50px] flex  justify-center items-center gap-5'>
        <div className='font-Playfair text-[15px]'>Admin</div>
        <img src={profile1} alt='' className='rounded-full w-[40px] h-[40px]' />
      </div>
    </div>
  )
}

export default Navbar
