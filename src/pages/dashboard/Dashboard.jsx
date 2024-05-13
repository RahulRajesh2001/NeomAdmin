import React, { useState, useEffect } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import SaleChart from '../../components/chart/SaleChart.jsx'
import axios from 'axios'
import { baseUrl } from '../../../baseURL.js'
import { useDispatch } from 'react-redux'
import { setSalesReport } from '../../../redux/reducers/ProductSlice.js'
import { Link } from 'react-router-dom'
import brandimg from '../../assets/brandimg.png'
import electronics from '../../assets/electronics.jpeg'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [data, setData] = useState([])
  const [total, setTotal] = useState({})

  const token = localStorage.getItem('adminLogin')
  useEffect(() => {
    const fetchDefaultData = () => {
      const defaultStartDate = new Date()
      const defaultEndDate = new Date()
      defaultStartDate.setDate(defaultStartDate.getDate() - 1)
      const formattedStartDate = defaultStartDate.toISOString()
      const formattedEndDate = defaultEndDate.toISOString()
      fetchSalesData(formattedStartDate, formattedEndDate)
    }

    fetchDefaultData()
  }, [])

  const fetchSalesData = (formattedStartDate, formattedEndDate) => {
    axios
      .get(
        `${baseUrl}/api/v1/admin/getSales/?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      )
      .then((res) => {
        setTotal(res?.data)
        dispatch(setSalesReport(res?.data))
        setData(res?.data?.salesData)
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error)
      })
  }

  const submitHandler = () => {
    const formattedStartDate = startDate.toISOString()
    const formattedEndDate = endDate.toISOString()
    fetchSalesData(formattedStartDate, formattedEndDate)
  }

  const handleButtonClick = (type) => {
    let endDate = new Date()
    let startDate = new Date()

    switch (type) {
      case 'day':
        startDate = new Date(endDate)
        break
      case 'week':
        startDate = new Date(endDate)
        startDate.setDate(startDate.getDate() - 7)
        break
      case 'month':
        startDate = new Date(endDate)
        startDate.setMonth(startDate.getMonth() - 1)
        break
      case 'year':
        startDate = new Date(endDate)
        startDate.setFullYear(startDate.getFullYear() - 1)
        break
      default:
        break
    }

    setStartDate(startDate)
    setEndDate(endDate)
    const formattedStartDate = startDate.toISOString()
    const formattedEndDate = endDate.toISOString()
    fetchSalesData(formattedStartDate, formattedEndDate)
  }

  //top 10 product
  const [topTenProduct, setTopTenProduct] = useState([])
  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/v1/admin/topTenProducts`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data)
          setTopTenProduct(res?.data)
        })
    } catch (err) {
      console.log(err)
    }
  }, [])

  const [brand, setBrand] = useState([])
  const [category, setCategory] = useState([])

  useEffect(() => {
    const fetchBrandAndCategoryNames = async () => {
      try {
        const newBrandNames = []
        const newCategoryNames = []
        for (const product of topTenProduct) {
          const id = product?._id.productId
          const response = await axios.get(
            `${baseUrl}/api/v1/admin/getBaseProduct`,
            {
              params: { id },
              headers: {
                Authorization: token,
              },
            }
          )
          const brandName = response.data.products[0].brand
          const categoryName = response.data.products[0].category
          if (!newBrandNames.includes(brandName)) {
            newBrandNames.push(brandName)
          }
          if (!newCategoryNames.includes(categoryName)) {
            newCategoryNames.push(categoryName)
          }
        }
        setBrand(newBrandNames)
        setCategory(newCategoryNames)
      } catch (error) {
        console.error('Error fetching brand and category names:', error)
      }
    }

    fetchBrandAndCategoryNames()
  }, [topTenProduct])

  return (
    <div className='bg-[#F5F5F9] flex w-[100%]'>
      <SideBar />
      <div className='w-[100%] '>
        <Navbar />
        <div className='flex justify-center items-center '>
          <div className='mb-3 me-4'>
            <label className='form-label d-block'>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label className='form-label d-block'>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className='form-control'
            />
          </div>

          <button
            onClick={submitHandler}
            className=' bg-orange-400 font-semibold flex justify-center items-center text-[#ffff] rounded-lg h-[30px] w-[60px] ms-4 mt-3 px-5'
          >
            Custom
          </button>
          <div className='flex justify-center items-center '>
            <button
              onClick={() => handleButtonClick('day')}
              className=' bg-orange-400 font-semibold flex justify-center items-center text-[#ffff] rounded-lg h-[30px] w-[60px] ms-4 mt-3 px-5'
            >
              Day
            </button>
            <button
              onClick={() => handleButtonClick('week')}
              className=' bg-orange-400 font-semibold flex justify-center items-center text-[#ffff] rounded-lg h-[30px] w-[60px] ms-4 mt-3 px-5'
            >
              Week
            </button>
            <button
              onClick={() => handleButtonClick('month')}
              className=' bg-orange-400 font-semibold flex justify-center items-center text-[#ffff] rounded-lg h-[30px] w-[60px] ms-4 mt-3 px-5'
            >
              Month
            </button>
            <button
              onClick={() => handleButtonClick('year')}
              className=' bg-orange-400 font-semibold flex justify-center items-center text-[#ffff] rounded-lg h-[30px] w-[60px] ms-4 mt-3 px-5'
            >
              Year
            </button>
            <Link to={'/admin/sales-report'}>
              <button
                onClick={() => handleButtonClick('year')}
                className=' bg-green-500 font-semibold flex justify-center items-center text-[#ffff] rounded-lg h-[30px] w-[60px] ms-4 mt-3 px-5'
              >
                Report
              </button>
            </Link>
          </div>
          <div></div>
        </div>

        <div className='flex justify-center items-center mt-2 '>
          <div className='col-xl-6 col-sm-12 mb-3 flex justify-center '>
            <div className='card text-white bg-success o-hidden h-100 w-[60%]'>
              <div className='card-body'>
                <div className='text-center card-font-size'>
                  Sales
                  <br />
                  <b>₹ {total?.totalSales}</b>
                </div>
              </div>
            </div>
          </div>

          <div className='col-xl-6 col-sm-12 mb-3 flex justify-center '>
            <div className='card text-white bg-danger o-hidden h-100 w-[60%]'>
              <div className='card-body'>
                <div className='text-center card-font-size'>
                  Orders
                  <br />
                  <b>{total?.totalNumOrders}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='h-[480px] w-[100%] flex justify-center items-center'>
          <SaleChart salesData={data} />
        </div>
        <div className=' w-[100%] h-[500px] flex justify-evenly items-center'>
          <div className='flex flex-col justify-center items-center gap-3 '>
            <div className='font-Playfair font-semibold'>TOP 10 PRODUCTS</div>
            <div className=' w-[300px]  h-[400px] flex flex-col  gap-2 overflow-auto'>
              {topTenProduct?.map((product) => (
                <div
                  key={product?._id}
                  className='h-[20%] flex justify-evenly items-center'
                >
                  <div className=' w-[60px] h-[60px] rounded-lg border'>
                    <img
                      src={product?._id.images[0]}
                      className='rounded-lg h-full'
                    />
                  </div>
                  <div className='font-Playfair'>{product?._id.varientName}</div>
                  <div className='font-Playfair'>
                    {product?.totalQuantitySold} - Products Sold
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col justify-center items-center gap-3 '>
            <div className='font-Playfair font-semibold'>TOP 10 BRANDS</div>
            <div className=' w-[300px]  h-[400px] flex flex-col  gap-2 overflow-auto'>
              {brand?.map((item, index) => (
                <div
                  key={index}
                  className='h-[20%] flex justify-evenly items-center'
                >
                  <div className=' w-[60px] h-[60px] rounded-lg border'>
                    <img src={brandimg} className='rounded-lg h-full' />
                  </div>
                  <div className='font-Playfair'>{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col justify-center items-center gap-3 '>
            <div className='font-Playfair font-semibold'>TOP 10 CATEGORIES</div>
            <div className=' w-[300px]  h-[400px] flex flex-col  gap-2 overflow-auto'>
              {category?.map((item, index) => (
                <div
                  key={index}
                  className='h-[20%] flex justify-evenly items-center'
                >
                  <div className=' w-[60px] h-[60px] rounded-lg border'>
                    <img src={electronics} className='rounded-lg h-full' />
                  </div>
                  <div className='font-Playfair'>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
