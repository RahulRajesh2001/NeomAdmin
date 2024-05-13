import React, { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import { baseUrl } from '../../../baseURL.js'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const CuponListingPage = () => {
  const navigate=useNavigate()
  const [cupons, setCupons] = useState([])
  const [created, setCreated] = useState('')
  const triggered = (value) => {
    setCreated(value)
  }

  const token = localStorage.getItem('adminLogin')
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/admin/getCupons`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status ==200) {
          console.log(res)
          setCupons(res?.data?.cupons)
          setCreated(true)
        }
      })
      .catch((error) => {
        console.error("this is error",error)
      })
  }, [created])

  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = 8
  const firstIndex = (currentPage - 1) * recordPerPage
  const lastIndex = currentPage * recordPerPage
  const records = cupons.slice(firstIndex, lastIndex)
  const npage = Math.ceil(cupons.length / recordPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  function changeCurrentPage(n) {
    setCurrentPage(n)
  }

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  //delete offer
  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/v1/admin/deleteCupons`, {
        params: {
          id,
        },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCupons(res?.data?.cupons)
          setCreated(true)
        }
      })
      .catch((error) => {
        console.error('Error adding category:', error)
      })
  }

//editing the offer date or expanding the validity
const [updateDate,setUpdateDate]=useState('')
const [id,setCuponId]=useState('')
const handleEditDate=(e)=>{
    e.preventDefault()
    try{
        axios
        .post(`${baseUrl}/api/v1/admin/updateCupon`,{date:updateDate}, {
          params: {
            id,
          },
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setCupons(res?.data?.cupons)
            setCreated(true)
          }
        })
        .catch((error) => {
          console.error('Error adding category:', error)
        })

    }catch(err){
        console.log(err)
    }

}

  return (
    <div className='flex bg-[#F5F5F9] '>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full rounded-lg flex justify-evenly'>
          <div className='w-[98%] h-full rounded-lg'>
            <button onClick={()=>navigate('/addCupon')} className='w-[100px] h-[40px] bg-[#696CFF] rounded-lg mb-2 text-white font-Playfair'>Add Coupon</button>
            <table className='table'>
              <thead>
                <tr>
                  <th>CUPON NAME</th>
                  <th>CUPON CODE</th>
                  <th>DESCRIPTION</th>
                  <th>DISCOUNT VALUE</th>
                  <th>IS ACTIVE</th>
                  <th>VALID FROM</th>
                  <th>VALID UNTIL</th>
                  <th>EXPAND VALIDITY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cupons?.map((cupon) => (
                  <tr key={cupon?._id}>
                    <td>{cupon?.cuponName}</td>
                    <td>{cupon?.code}</td>
                    <td>{cupon?.description}</td>
                    <td>
                      {cupon?.discountType === 'Percentage'
                        ? `${cupon.discountValue}%`
                        : `${cupon.discountValue} ₹`}
                    </td>

                    <td>
                      <div
                        className={`w-[10px] h-[10px] rounded-full ${
                          cupon.isActive ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      ></div>
                    </td>
                    <td>
                      {new Date(cupon.validFrom).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td>
                      {new Date(cupon.validUntil).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    
                    <td className='flex justify-center items-center'>
                    <form onSubmit={handleEditDate} className='flex flex-col justify-center items-center gap-1'>
                    <input
                      id='validUntil'
                      type='date'
                      placeholder='YYYY-MM-DD'
                      className={`bg-[#FAFAFA] border h-[50px] w-[100%] rounded-lg`}
                      onChange={(e)=>setUpdateDate(e.target.value)}
                    />
                    <button onClick={()=>setCuponId(cupon?._id)} type='submit' className='bg-green-400 w-[50px] h-[30px] rounded-lg text-[#ffff] font-semibold'>Edit</button>
                  </form>
                    </td>
                    <td>
                      <MdDelete
                        className='text-[25px] cursor-pointer'
                        onClick={() => handleDelete(cupon?._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav>
              <ul className='pagination'>
                <li className='page-item'>
                  <a href='#' className='page-link' onClick={prePage}>
                    Prev
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li
                    className={`page-item ${currentPage === n ? 'active' : ''}`}
                    key={i}
                  >
                    <a
                      href='#'
                      className='page-link'
                      onClick={() => changeCurrentPage(n)}
                    >
                      {n}
                    </a>
                  </li>
                ))}
                <li className='page-item'>
                  <a href='#' className='page-link' onClick={nextPage}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CuponListingPage
