import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import SideBar from '../../components/sidebar/SideBar'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../../baseURL'
import AddBaseProduct from '../addBaseproduct/AddBaseProduct'
import {
  setBaseProductId,
  setBaseProducts,
} from '../../../redux/reducers/BaseProductSlice.js'
import { useDispatch } from 'react-redux'
import EditBaseProductPage from '../editBaseProductPage/EditBaseProductPage'
import Swal from 'sweetalert2'

const BaseProducts = () => {
  const [baseproducts, setbaseproducts] = useState([])

  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = 8
  const firstIndex = (currentPage - 1) * recordPerPage
  const lastIndex = currentPage * recordPerPage
  const records = baseproducts.slice(firstIndex, lastIndex)
  const npage = Math.ceil(baseproducts.length / recordPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  useEffect(() => {
    fetchProducts()
  }, [baseproducts])

  // Fetch products from the API
  const token = localStorage.getItem('adminLogin')
  const fetchProducts = async () => {
    try {
      await axios
        .get(`${baseUrl}/api/v1/admin/getBaseProducts`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setbaseproducts(res?.data?.products)
          dispatch(setBaseProducts(res?.data?.products))
        })
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const changeCurrentPage = (n) => {
    setCurrentPage(n)
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(baseproducts.length / recordPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSetBaseProductId = (id) => {
    dispatch(setBaseProductId(id))
  }

  //handle Delete
  const handleDelete = async (id) => {
    await axios
      .get(`${baseUrl}/api/v1/admin/deleteBaseProduct`, {
        params: { id },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.savedProduct)
        setbaseproducts(res.data.savedProduct)
        dispatch(setBaseProducts(res?.data?.savedProduct))
        if (res.status === 200) {
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
      })
  }

  return (
    <div className='flex bg-[#F5F5F9]'>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full rounded-lg flex flex-col'>
          <div className='flex justify-end mr-20  w-[100%] mb-2 '>
            <AddBaseProduct />
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th></th>
                <th>ADD VARIENTS</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {baseproducts?.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product?.name}</td>
                  <td>{product?.category}</td>
                  <td></td>

                  <td>
                    <Link to='/admin/varients'>
                      <div
                        onClick={() => handleSetBaseProductId(product?._id)}
                        className='w-[150px] h-[50px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair'
                      >
                        VARIANTS
                      </div>
                    </Link>
                  </td>
                  <td className='text-[25px] cursor-pointer'>
                    <EditBaseProductPage id={product?._id} />
                  </td>
                  <td onClick={() => handleDelete(product?._id)}>
                    {product?.isDeleted ? (
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
              {[
                ...Array(Math.ceil(baseproducts.length / recordPerPage)).keys(),
              ].map((n, i) => (
                <li
                  className={`page-item ${
                    currentPage === n + 1 ? 'active' : ''
                  }`}
                  key={i}
                >
                  <a
                    href='#'
                    className='page-link'
                    onClick={() => changeCurrentPage(n + 1)}
                  >
                    {n + 1}
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
  )
}

export default BaseProducts
