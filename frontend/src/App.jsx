import { useState } from 'react'

import './index.css'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/cart/Cart.jsx'
import Checkout from './pages/checkout/Checkout.jsx'
import Orders from './pages/Orders/Orders.jsx'
import OrderDetails from './components/OrderDetails/OrderDetails.jsx'
import Footer from './components/Footer/Footer.jsx'

import {Routes,Route} from  'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
function App() {
  

  return (
    <Provider store={store}>
      
     
      <Routes >
        <Route path='/' element={<Navbar/>} >
          <Route path='/home' element={<Home/>} />
          <Route path="/login" element={ <Login/> } />
          <Route path="/signup" element={ <Signup/> } /> 
          <Route path='/cart' element={<Cart/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/orderDetails' element={<OrderDetails/>} />
         
        </Route>
          <Route path='/checkout' element={<Checkout/>} />
       
      </Routes>

      <Footer/> 
      
    </Provider>
  )
}

export default App
