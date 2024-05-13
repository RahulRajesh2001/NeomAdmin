import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import SideBar from '../../components/sidebar/SideBar'
import 'bootstrap/dist/css/bootstrap.css'
import AddCategoryPopUP from '../addCategoryPopup/AddCategoryPopUP'
import axios from 'axios'
import { baseUrl } from '../../../baseURL'
import EditCategory from '../editCategory/EditCategory'
import { setCategory } from '../../../redux/reducers/CategorySlice.js'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import ShowCategoryOffer from '../../components/showCategoryOffers/ShowCategoryOffer.jsx'

const CategoryList = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('adminLogin')
  const productCategory = useSelector((state) => state?.category?.category)

  const [currentPage, setCurrentPage] = useState(1)
  const categoriesPerPage = 12
  const indexOfLastCategory = currentPage * categoriesPerPage
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage
  const currentCategories = productCategory.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  )

  const totalPages = Math.ceil(productCategory.length / categoriesPerPage)
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/v1/admin/categories`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          dispatch(setCategory(res?.data?.categories))
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }, [status])

  //category delete
  const handleDelete = (id) => {
    axios
      .get(`${baseUrl}/api/v1/admin/deleteCategory`, {
        params: { id },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("deleting category",res)
        dispatch(setCategory(res?.data?.categories))
        Swal.fire({
          text: res.data.message,
          icon: 'success',
        })
      })
  }

  return (
    <div className='flex bg-[#F5F5F9]'>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full rounded-lg flex flex-col'>
          <div className='flex justify-end mr-20 w-[100%] mb-2 '>
            <div className='w-[150px] h-[50px] flex justify-center items-center'>
              <AddCategoryPopUP />
            </div>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th></th>
                <th>CATEGORIES</th>
                <th>DESCRIPTION</th>
                <th>OFFERS</th>
                <th></th>
                <th></th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {productCategory?.map((category, index) =>

                  <tr key={category?._id}>
                    <td>{index + 1}</td>
                    <td></td>
                    <td>{category?.title}</td>
                    <td>{category?.description}</td>
                    <td>
                      <ShowCategoryOffer categoryId={category?._id} />
                    </td>
                    <td></td>
                    <td></td>
                    <td className='flex gap-4'>
                      <div className='mt-2'>
                        <EditCategory id={category?._id} />
                      </div>
                      <td onClick={() => handleDelete(category?._id)}>
                    {category?.isDeleted ? (
                      <button className=' bg-red-500  w-[60px] h-[30px] rounded-lg text-white font-semibold'>
                        Unlist
                      </button>
                    ) : (
                      <button className='bg-green-400 w-[60px] h-[30px] rounded-lg text-white font-semibold'>
                        List
                      </button>
                    )}
                  </td>
                    </td>
                  </tr>
                
              )}
            </tbody>
          </table>
          <nav>
            <ul className='pagination'>
              <li className='page-item'>
                <button
                  className='page-link'
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
              </li>
              {pageNumbers?.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? 'active' : ''
                  }`}
                >
                  <button
                    className='page-link'
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li className='page-item'>
                <button
                  className='page-link'
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default CategoryList
