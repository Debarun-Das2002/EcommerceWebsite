import { useState } from 'react'

import { Routes, Route } from "react-router-dom"

import './index.css'

import Navbar from './components/Navbar/Navbar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Dashbord from './dashboard/Dashbord'
import CreateProduct from './pages/CreateProduct/CreateProduct'
import EditProduct from './pages/EditProduct/EditProduct';
import Orders from './pages/Orders/Orders'
import OrderData from './components/orderdata/OrderData'

function App() {
 

  return (
    <div>
      
     
      
      <Routes>
        <Route path='/' element={<Navbar/>} >
        
          <Route path="/login" element={ <Login/> } />
          <Route path="/signup" element={ <Signup/> } /> 
          <Route path="/dash" element={<Dashbord/>}  />
          <Route path="/createProduct" element={<CreateProduct/>} />
          <Route path="/editProduct" element={<EditProduct/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/orderData/:oid/:id" element={<OrderData/>} />

        </Route>
       
      </Routes>

    </div>
  )
}


export default App

