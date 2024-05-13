import React, { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import { baseUrl } from '../../../baseURL'
import personimage from '../../assets/personimage.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../../../redux/reducers/UserSlice.js'
import Swal from 'sweetalert2'

const UserListingPage = () => {
  const dispatch = useDispatch()
  const Users = useSelector((state) => state.users.users)

  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = 8
  const firstIndex = (currentPage - 1) * recordPerPage
  const lastIndex = currentPage * recordPerPage
  const records = Users.slice(firstIndex, lastIndex)
  const npage = Math.ceil(Users.length / recordPerPage)
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

  //block or unblock user

  const token = localStorage.getItem('adminLogin')

  function Block(id, userStatus) {
    axios
      .get(`${baseUrl}/api/v1/admin/blockUnblock`, {
        params: { id, userStatus },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setUsers(res?.data?.users))
        if (res.status == 200) {
          Swal.fire({
            text: res?.data?.message,
            icon: 'success',
          })
        } else {
          Swal.fire({
            text: res.data.message,
            icon: 'error',
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          text: err.data.message,
          icon: 'error',
        })
      })
  }

  function UnBlock(id, userStatus) {
    axios
      .get(`${baseUrl}/api/v1/admin/blockUnblock`, {
        params: { id, userStatus },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setUsers(res?.data?.users))
        if (res.status == 200) {
          Swal.fire({
            text: res?.data?.message,
            icon: 'success',
          })
        } else {
          Swal.fire({
            text: res.data.message,
            icon: 'error',
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          text: err.data.message,
          icon: 'error',
        })
      })
  }
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/admin/getUsers`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setUsers(res?.data?.users))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='flex bg-[#F5F5F9] '>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full rounded-lg flex justify-evenly'>
          <div className='w-[98%] h-full rounded-lg'>
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>PRO-IMG</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ACTION</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Users?.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={personimage}
                        className='w-[50px] h-[50px] rounded-sm'
                      />
                    </td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>
                      <div
                        className={`w-[100px] h-[40px] rounded-md bg-red-500 flex justify-center items-center font-bold text-[#ffff] cursor-pointer`}
                        onClick={() => {
                          if (user.isBlocked) {
                            UnBlock(user?._id, false)
                          } else {
                            Block(user?._id, true)
                          }
                        }}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </div>
                    </td>

                    <td></td>
                    <td></td>
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

export default UserListingPage
