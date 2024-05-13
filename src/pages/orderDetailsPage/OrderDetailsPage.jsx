import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../../baseURL'
import Navbar from '../../components/navbar/Navbar'
import SideBar from '../../components/sidebar/SideBar'
import SelectionBox from '../../components/selectionBox/SelectionBox'

const OrderDetailsPage = () => {
  const token = localStorage.getItem('adminLogin')
  const { id } = useParams()

  const [Order, setOrder] = useState({})
  const [shippingAddress, setShippingAddress] = useState({})
  const [orderedItems, setOrderedItems] = useState([])
  const [state,setState]=useState(true)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/admin/getOrderDetails`,
          {
            params: { id },
            headers: { Authorization: token },
          }
        )
        const {
          order,
          order: { shippingAddress, orderedItems },
        } = response.data
        setOrder(order)
        setShippingAddress(shippingAddress)
        setOrderedItems(orderedItems)
      } catch (err) {
        console.error(err)
      }
    }

    fetchOrderDetails()
  }, [id, token,state])

  //fetching product varient informations of the product
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProductVarientDetails = async () => {
      try {
        const productPromises = orderedItems.map((item) =>
          axios.get(`${baseUrl}/api/v1/admin/productVarientDetails`, {
            params: { id: item?.product },
            headers: { Authorization: token },
          })
        )

        const responses = await Promise.all(productPromises)
        const productData = responses.map((res) => res.data?.product)
        setProducts(productData)
      } catch (err) {
        console.log(err)
      }
    }
    if (orderedItems.length > 0) {
      fetchProductVarientDetails()
    }
  }, [orderedItems])

  console.log(Order)

  //changing the order status

  const getState = (status, orderId, varientId) => {
    console.log('staus and orderid', status, orderId, varientId)
    const token = localStorage.getItem('adminLogin')
    try {
      axios
        .put(
          `${baseUrl}/api/v1/admin/editPaymentStatus/${orderId}`,
          { paymentStatus: status[0], varientId },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          console.log('this is res', res.data.orders)
          setOrder(res?.data?.orders)
          setState(!state)
        })
        .catch((err) => {
          console.log(err?.response?.data?.message)
        })
    } catch (err) {
      console.log(err)
    }
  }

  console.log('this si', products)

  console.log('ordeted Items', orderedItems)

  return (
    <div className='flex bg-[#F5F5F9] '>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full  rounded-lg'>
          <div className='h-[900px] flex items-center justify-evenly'>
            <div className='h-[850px] w-[100%] rounded-md flex flex-col items-center border gap-4'>
              <div className='w-[100%] h-[60px] flex items-center justify-around border-b '>
                <div className='text-[16px] font-Playfair font-semibold '>
                  ORDER DETAILS
                </div>
              </div>
              {/*order section one */}
              <div className='w-[95%] h-[100px] bg-[#FDFAE7] border  mt-4 rounded-md flex items-center justify-between p-10'>
                <div className='flex flex-col gap-3'>
                  <div className='text-[#191C1F] text-[20px] font-semibold'>
                    # {Order?._id}
                  </div>
                  <div className='flex gap-2'>
                    <div className='text-[#475156] font-semibold'>
                      {orderedItems.length} Products
                    </div>
                  </div>
                </div>
                <div className='text-[#2DA5F3] font-semibold text-[20px]'>
                  ₹ {Order?.totalAmount}
                </div>
              </div>
              {/*ordered product*/}

              <div className=' h-[400px] w-[100%] overflow-auto flex flex-col gap-4'>
                {/* <div className='text-[20px] ml-10'>Products ({order.length})</div> */}
                <div className='h-[50px] bg-[#F2F4F5] w-[100%] flex'>
                  {/*second section left side */}
                  <div className='w-[40%] flex justify-center items-center'>
                    <div className='text-[#475156] text-[15px] font-Playfair'>
                      PRODUCTS
                    </div>
                  </div>
                  {/*second section right side */}
                  <div className='w-[60%] flex justify-evenly items-center'>
                    <div className='text-[#475156] text-[15px] font-Playfair'>
                      PRICE
                    </div>
                    <div className='text-[#475156] text-[15px] font-Playfair'>
                      QUANTITY
                    </div>
                    <div className='text-[#475156] text-[15px] font-Playfair'>
                      SUB-TOTAL
                    </div>
                    <div className='text-[#475156] text-[15px] font-Playfair'>
                      PAYMENT STATUS
                    </div>
                    <div className='text-[#475156] text-[15px] font-Playfair'>
                      ORDER STATUS
                    </div>
                    <div className='text-[#475156] text-[15px] font-Playfair'>
                      ACTION
                    </div>
                  </div>
                </div>

                {orderedItems?.map((item) =>
                  products
                    ?.filter((product) => item?.product === product?._id)
                    ?.map((product) => (
                      <div
                        key={item?._id}
                        className='w-[100%] flex justify-evenly items-center bg-[#FFFFFF] h-[80px] '
                      >
                        <div className='w-[40%] flex justify-evenly items-center '>
                          <img
                            src={product?.images[0]}
                            className='h-[50px] w-[50px]'
                          />
                          <div className='w-[50%] text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                            {product?.varientName}
                          </div>
                        </div>
                        <div className='w-[60%]  flex justify-evenly items-center'>
                          <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                            {product?.salePrice -
                              product?.offers[0]?.offerAmount}
                          </div>
                          <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                            <div className='text-[15px] font-semibold cursor-pointer mt-1'>
                              {item?.quantity}
                            </div>
                          </div>
                          <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                            <div className='text-[15px] font-semibold cursor-pointer mt-1'>
                              ₹{' '}
                              {item?.quantity * product?.salePrice -
                                product?.offers[0]?.offerAmount}
                            </div>
                          </div>
                          <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                            {item?.paymentStatus}
                          </div>
                          <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                            {item?.orderStatus}
                          </div>
                          <div>
                            <SelectionBox
                              orderId={Order?._id}
                              varientId={item?._id}
                              getState={getState}
                              states={[
                                'Pending',
                                'Processing',
                                'Shipped',
                                'Delivered',
                                'Cancelled',
                                'Returned',
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>

              {/*Address part */}
              <div className='w-[100%] h-[300px] flex  border-t-2'>
                <div className='w-[300px] h-[300px] ml-[100px] flex flex-col justify-center  items-center gap-3 border-r-2'>
                  <div className=' font-Playfair underline'>
                    Shipping Address
                  </div>
                  <div>
                    <div className='font-Josefin font-semibold'>
                      {shippingAddress?.fullName}
                    </div>
                    <div className='font-Josefin font-semibold text-[#5F6C72]'>
                      {shippingAddress?.address}
                    </div>
                    <div className='font-Josefin font-semibold text-[#5F6C72]'>
                      {shippingAddress?.pincode}
                    </div>
                    <div className='font-Josefin font-semibold text-[#5F6C72]'>
                      {shippingAddress?.phone1}
                    </div>
                    <div className='font-Josefin font-semibold text-[#5F6C72]'>
                      {shippingAddress?.phone2}
                    </div>
                    <div className='font-Josefin font-semibold text-[#5F6C72]'>
                      {shippingAddress?.street}
                    </div>
                    <div className='font-Josefin font-semibold text-[#5F6C72]'>
                      {shippingAddress?.state}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage
