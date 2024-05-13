import React, { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import { baseUrl } from '../../../baseURL'
import CreateOfferModal from '../../components/createOfferModal/CreateOfferModal'
import { MdDelete } from 'react-icons/md'

const OfferListingPage = () => {
  const [offers, setOffers] = useState([])
  const [created, setCreated] = useState('')
  const triggered = (value) => {
    setCreated(value)
  }

  const token = localStorage.getItem('adminLogin')
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/admin/getAllOffers`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          setOffers(res?.data?.offers)
        }
      })
      .catch((error) => {
        console.error('Error adding category:', error)
      })
  }, [created])

  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = 8
  const firstIndex = (currentPage - 1) * recordPerPage
  const lastIndex = currentPage * recordPerPage
  const records = offers.slice(firstIndex, lastIndex)
  const npage = Math.ceil(offers.length / recordPerPage)
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
      .delete(`${baseUrl}/api/v1/admin/deleteOffer`, {
        params: {
          id,
        },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setOffers(res?.data?.offers)
          setCreated(true)
        }
      })
      .catch((error) => {
        console.error('Error adding category:', error)
      })
  }

  return (
    <div className='flex bg-[#F5F5F9] '>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full rounded-lg flex justify-evenly'>
          <div className='w-[98%] h-full rounded-lg'>
            <CreateOfferModal triggered={triggered} />
            <table className='table'>
              <thead>
                <tr>
                  <th>OFFER NAME</th>
                  <th>DESCRIPTION</th>
                  <th>DISCOUNT VALUE</th>
                  <th>IS ACTIVE</th>
                  <th>OFFER TYPE</th>
                  <th>VALID FROM</th>
                  <th>VALID UNTIL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {offers?.map((offer) => (
                  <tr key={offer?._id}>
                    <td>{offer?.offerName}</td>
                    <td>{offer?.description}</td>
                    <td>
                      {offer?.discountType === 'Percentage'
                        ? `${offer.discountValue}%`
                        : `${offer.discountValue} ₹`}
                    </td>

                    <td>
                      <div
                        className={`w-[10px] h-[10px] rounded-full ${
                          offer.isActive ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      ></div>
                    </td>
                    <td>{offer?.offerType}</td>
                    <td>
                      {new Date(offer.validFrom).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td>
                      {new Date(offer.validUntil).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td>
                      <MdDelete
                        className='text-[25px] cursor-pointer'
                        onClick={() => handleDelete(offer._id)}
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

export default OfferListingPage
