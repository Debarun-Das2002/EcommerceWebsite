import axios from "axios";
import React, { useEffect, useState } from "react"
import './Home.css'
import { useParams } from "react-router-dom";
import Cookies from 'js-cookies'
import { FaCartPlus } from "react-icons/fa";

// react-redux hook
import { useDispatch } from "react-redux";
import {add} from '../../store/cartSlice'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../../components/Header/Header";
export default function Home(){
const[products,setProducts] = useState([]);



useEffect(()=>{
    axios.get("http://localhost:8000/products/getProducts")
    .then((res)=>{
       // console.log(res.data.user);
        setProducts(res.data.user)
    })
},[])

//  function addtoCart(e){
//     const uid = Cookies.getItem("id");
//     console.log(uid);
//     console.log(e); 
    
//     axios.put(`http://localhost:8000/user/addtoCart/${e}`,{uid})
//     .then((res)=>{
//         console.log(res.data)
//     })
  
// }
//  function removeCart(e){
//     const uid = Cookies.getItem("id");
//     console.log(uid);
//     console.log(e); 
    
//     axios.put(`http://localhost:8000/user/removeCart/${e}`,{uid})
//     .then((res)=>{
//         console.log(res.data)
//     })
  
// }



const dispatch = useDispatch();


const addToCart = (product) => {
    // dispatch an add action
    toast.success("added To Cart")
    dispatch(add(product));

}

    return(
        <div className="container">
           

            <Header/>   
            
           
     


            <div className="products">

            {products.map((i,index)=>{
                let path = `http://localhost:8000/images/${i.img}`;
                return(<>
                    <div key={index} className="cardtile">
                        <div className="cardImage">
                            <img src={path} />
                        </div>
                        <div className="pInfo">
                            <top>
                                <h3 id="title">{i.name}</h3>
                                <h6>${i.price}</h6>
                            </top>
                            <bottom>
                                <p>{i.description}</p>  
                                <div>
                                    
                                    <button className="addbtn" onClick={()=>{addToCart(i) }}  > <FaCartPlus /> </button>
                                    
                                </div>
                            </bottom>
                        </div>
                    </div>
                    
                   </>
                )
            })

            }
          
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
            transition: Bounce
            />
        </div>

    )


}
