import React from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import AddProductPage from './pages/addproductpage/AddProductPage'
import UserListingPage from './pages/userlisting/UserListingPage'
import LoginPage from './pages/LoginPage.jsx'
import CategoryList from './pages/categorylisting/CategoryList.jsx'
import AddCategoryPopUP from './pages/addCategoryPopup/AddCategoryPopUP.jsx'
import BaseProducts from './pages/baseproducts/BaseProducts.jsx'
import VarientListingPage from './pages/varientListingpage/VarientListingPage.jsx'
import { Outlet } from 'react-router-dom'
import EditProductVarient from './pages/editProductVarient/EditProductVarient.jsx'
import OrderListing from './pages/orderlisting/OrderListing.jsx'
import OfferListingPage from './pages/offerListingPage/OfferListingPage.jsx'
import CuponListingPage from './pages/cuponListingPage/CuponListingPage.jsx'
import Invoice from './components/invoice/Invoice.jsx'
import AddCupon from './pages/addCuponPage/AddCupon.jsx'
import OrderDetailsPage from './pages/orderDetailsPage/OrderDetailsPage.jsx'

const QuilonWebsite = () => {
  const Protected = () => {
    const token = localStorage.getItem('adminLogin')
    return token ? <Outlet /> : <Navigate to='/admin/login' />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protected />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/customers' element={<UserListingPage />} />
          <Route path='/admin/add-product' element={<AddProductPage />} />
          <Route path='/admin/categories' element={<CategoryList />} />
          <Route path='/admin/add-category' element={<AddCategoryPopUP />} />
          <Route path='/admin/base-products' element={<BaseProducts />} />
          <Route path='/admin/varients' element={<VarientListingPage />} />
          <Route path='/admin/edit-productVarient' element={< EditProductVarient/>} />
          <Route path='/admin/orders' element={<OrderListing/>} />
          <Route path='/admin/offers' element={<OfferListingPage/>} />
          <Route path='/admin/sales-report' element={<Invoice/>}/>
          <Route path='/admin/cupons' element={<CuponListingPage/>}/>
          <Route path='/admin/addCupon' element={<AddCupon/>}/>
          <Route path='/admin/order/:id' element={<OrderDetailsPage/>}/>
          <Route />
        </Route>
        <Route path='/admin/login' element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default QuilonWebsite
