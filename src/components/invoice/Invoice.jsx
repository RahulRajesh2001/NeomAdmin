import React, { useEffect, useState } from 'react'
import './invoice.css'
import Icon from '../../assets/Icon.png'
import { useSelector } from 'react-redux'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { date } from 'yup'

const Invoice = () => {
  const salesReport = useSelector((state) => state?.products?.salesReport)

  let orders = []
  salesReport?.salesData?.map((item) => {
    if (item.orders.length > 0) {
      orders.push(item?.orders)
    }
  })
  let Orders = []
  orders.map((item) => {
    item.map((order) => {
      Orders.push(order)
    })
  })

  console.log('mappppppa', Orders)

  let subtotal = 0
  Orders.map((item) => {
    subtotal = subtotal + item?.totalAmount
  })

  const handleDownload = () => {
    const input = document.getElementById('order_invoice')
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      const pdfWidth = pdf.internal.pageSize.getWidth()
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0)
      pdf.save(`invoice_${'unknown'}.pdf`)
    })
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='order-invoice my-5 '>
        <div className='row d-flex justify-content-center mb-5'>
          <button
            onClick={() => handleDownload()}
            className='btn btn-success col-md-5 w-[200px] font-semibold font-Josefin'
          >
            <i className='fa fa-print'></i> Download Invoice
          </button>
        </div>
        <div id='order_invoice' className='p-3 border border-secondary'>
          <header className='clearfix'>
            <div
              id='logo'
              className='flex justify-center flex-col  items-center gap-3'
            >
              <div className='font-Playfair text-[20px]  font-semibold'>
                Neom
              </div>
              <img
                src={Icon}
                className='bg-orange-300 rounded-full'
                alt='Company Logo'
              />
            </div>
            <div className=' flex  justify-around items-center'>
              <div className='font-semibold font-Playfair text-[20px]'>
                Total Orders :{salesReport.totalNumOrders}
              </div>
              <div className='font-semibold font-Playfair text-[20px]'>
                Total Sales : ₹ {salesReport.totalSales}
              </div>
            </div>
            <div className='flex flex-col mt-3 gap-2'>
              <div className='font-Playfair '>From :</div>
              <div className='font-Playfair '>Until :</div>
            </div>
          </header>
          <main>
            <table className='mt-5'>
              <thead>
                <tr>
                  <th className='service font-Playfair font-semibold'>ID</th>
                  <th className='font-Playfair font-semibold '>
                    TOTAL PRODUCTS ORDERED
                  </th>
                  <th className='font-Playfair font-semibold '>
                    ORDER DETAILS
                  </th>
                  <th className='font-Playfair font-semibold '>
                    OFFER APPLIED
                  </th>
                  <th className='font-Playfair font-semibold '>
                    CUPON APPLIED
                  </th>
                  <th className='font-Playfair font-semibold '>TOTAL AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {Orders?.map((order, index) => (
                  <tr key={index}>
                    <td className='service'>{index + 1}</td>
                    <td className='w-[50px] h-[50px] '>
                      <div className='mr-[50%]'>
                        {order?.orderedItems?.map((item) => item.quantity)}
                      </div>
                    </td>
                    <td className='desc'>
                      {/* One product */}
                      <div className='flex flex-col gap-3 '>
                        <div>
                          <div className='font-Playfair font-bold text-[16px]'>
                            User Details
                          </div>
                          <div className='font-Playfair text-[15px]'>
                            name : {order?.shippingAddress?.fullName}
                          </div>
                          <div>Address : {order?.shippingAddress?.address}</div>
                        </div>
                        <div>
                          <div className='font-Playfair font-bold text-[16px] flex flex-col'>
                            Product Details
                          </div>

                          {order?.orderedItems?.map((item) => (
                            <div>
                              <div className='font-Playfair text-[15px] mt-2'>
                                name :{item.product.varientName}
                              </div>
                              <div className='font-Playfair text-[15px]'>
                                ₹ : {item?.product?.salePrice}
                              </div>
                            </div>
                          ))}
                          {order?.orderedItems?.map((item) => (
                            <div>
                              <div className='font-Playfair font-bold text-[16px]'>
                                Order Details
                              </div>
                              <div>
                                <div className='font-Playfair text-[15px]'>
                                  Payment : {item?.paymentStatus}
                                </div>
                                <div className='font-Playfair text-[15px]'>
                                  Order : {item?.orderStatus}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
               
                    <td className='desc'>
                      {order?.orderedItems?.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          {item?.product?.offers.length > 0 &&
                            `${item.product.offers[0].offerAmount}`}
                        </div>
                      ))}
                    </td>

                    <td className='desc'>{order?.coupons ? order?.coupons :<div>No coupon</div> }</td>
                    <td className='desc'>{order?.totalAmount}</td>
                    
                  </tr>
                ))}

                <tr>
                  <td colspan='4'>
                    <b>SUBTOTAL</b>
                  </td>
                  <td></td>
                  <td className='total'>₹ {subtotal}</td>
                  <td></td>
                </tr>

                <tr>
                  <td className='desc'></td>
                  <td colspan='4' className='grand total'>
                    <b>GRAND TOTAL</b>
                  </td>
                  <td className='grand total'>₹ {subtotal}</td>
                </tr>
              </tbody>
            </table>
            <div id='notices'>
              <div className='font-bold'>NOTICE :</div>
              <div className='notice font-Josefin text-[10px]'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Consequatur distinctio neque nulla quo ipsa vel quisquam
                laboriosam at, quod corporis?
              </div>
            </div>
          </main>
          <footer className='font-Playfair font-semibold text-[10px]'>
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Invoice
