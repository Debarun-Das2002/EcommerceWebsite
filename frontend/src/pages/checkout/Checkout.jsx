
import "./Checkout.css";
import { FaCreditCard } from "react-icons/fa";
import Cookies from 'js-cookies'
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import {emptyCart} from '../../store/cartSlice'





export default function Checkout(){

    const cart = useSelector(state=> state.cart);
    const total = localStorage.getItem("totalPrice");
    const id = Cookies.getItem('id');
    const dispatch = useDispatch();

const navigate = useNavigate();

function handlepayment(e){
      

       const payment = e;
      
    const data = {
        total,
        payment,
        cart    
    } 

   // console.log(cart);
    console.log(`http://localhost:8000/user/addtoCart/${id}`);
    axios.post(`http://localhost:8000/user/addtoCart/${id}`,data)
    .then((res)=>{
        console.log(res.data);
        if(res.data.success == "true"){
            toast.success("Order placed");
            dispatch(emptyCart());
            localStorage.clear();

            setTimeout(()=>{
                navigate('/orders')
            }, 1500)
        }
    })
    
    
}

    return(
        <div className="checkborder">
            <div className="checkbox">
                <h3>
                        Select Payment Method   
                </h3>
                <div className="chebtn">
                   
                    <button type="button" className="btn btn-success" value = "cash" onClick={()=> handlepayment("cash")}>Cash on Delivery</button>
                    <button type="button" className="che btn btn-success "><span> < FaCreditCard /></span> card   </button>

                </div>
                
            </div>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition: Bounce />
        </div>
    )

}