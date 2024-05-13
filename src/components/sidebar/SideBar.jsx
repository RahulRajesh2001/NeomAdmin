import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate=useNavigate()
  const  handleLogout=()=>{
    localStorage.removeItem('adminLogin')
    navigate('/admin/login')
  }
  return (
    <div className='h-screen w-[20%] bg-[#FFFFFF] flex flex-col gap-5 justify-start '>
      <div className='flex  items-center gap-4 mt-10  w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/admin/dashboard">
        <div className='font-Playfair '>Dashboard</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/admin/customers">
        <div className='font-Playfair '>Customers</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/admin/base-products">
        <div className='font-Playfair '>Products</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/admin/categories">
        <div className='font-Playfair '>Categories</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/admin/orders">
        <div className='font-Playfair '>Orders</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/admin/offers">
        <div className='font-Playfair '>Offers</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/admin/cupons">
        <div className='font-Playfair '>Cupons</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%] cursor-pointer'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <div className='font-Playfair ' onClick={()=>handleLogout()}>Logout</div>
      </div>
    </div>


  )
}

export default SideBar
