import React, { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { baseUrl } from '../../../baseURL'
import {setProductVarientId,setVarients,
} from '../../../redux/reducers/ProductSlice.js'
import ShowOfferModal from '../../components/showOffersModal/ShowOfferModal.jsx'

const VarientListingPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Fetching id from state
  const id = useSelector((state) => state?.baseProducts?.productId)

  //fetching the baseproduct data
  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/v1/admin/productVarients`, {
          params: { id },
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          dispatch(setVarients(res?.data?.productVarients))
        })
    } catch (err) {
      console.log(err)
    }
  }, [])

  const productVarients = useSelector((state) => state?.products?.varients)

  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = 8
  const firstIndex = (currentPage - 1) * recordPerPage
  const lastIndex = currentPage * recordPerPage
  const records = productVarients.slice(firstIndex, lastIndex)
  const npage = Math.ceil(productVarients.length / recordPerPage)
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

  const token = localStorage.getItem('adminLogin')

  //for edint the varient
  const handleDelete = async (id) => {
    await axios
      .get(`${baseUrl}/api/v1/admin/deleteVarient`, {
        params: { id },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.updatedVarients)
        dispatch(setVarients(res?.data?.updatedVarients))
        if (res.status == 200) {
          alert(res.data.message)
        }
      })
  }

  const handleEdit = (id) => {
    dispatch(setProductVarientId(id))
    navigate('/admin/edit-productVarient')
  }


  return (
    <div className='flex bg-[#F5F5F9] '>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full rounded-lg flex justify-evenly'>
          <div className='w-[98%] h-full rounded-lg '>
            <div className='w-[150px] h-[50px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair mb-2 a'>
              <Link to='/admin/add-product'>ADD VARIANTS</Link>
            </div>

            <table className='table'>
              <thead>
                <tr>
                  <th>IMG</th>
                  <th>NAME</th>
                  <th>SALE ₹</th>
                  <th>OFFER</th>
                  <th>REGULAR ₹</th>
                  <th>STOCK</th>
                  <th>COLOR</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {productVarients?.map(
                  (variant) =>
                      <tr key={variant?._id}>
                        <td>
                          <img
                            src={variant?.images[0]}
                            className='w-[50px] h-[50px] rounded-sm'
                          />
                        </td>
                        <td>{variant?.varientName}</td>
                        <td>{variant?.salePrice}</td>
                        <td><ShowOfferModal  varientId={variant?._id} /></td>
                        <td>{variant?.regularPrice}</td>
                        <td>{variant?.stock}</td>
                        <td>{variant?.color}</td>
                        <td>
                          <FaRegEdit
                            className='text-[25px] cursor-pointer'
                            onClick={() => handleEdit(variant?._id)}
                          />
                        </td>
                        <td onClick={() => handleDelete(variant?._id)}>
                    {variant?.isDeleted ? (
                      <button className=' bg-red-500  w-[60px] h-[30px] rounded-lg text-white font-semibold'>
                        Unlist
                      </button>
                    ) : (
                      <button className='bg-green-400 w-[60px] h-[30px] rounded-lg text-white font-semibold'>
                        List
                      </button>
                    )}
                  </td>
                      </tr>
                    
                )}
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

export default VarientListingPage
