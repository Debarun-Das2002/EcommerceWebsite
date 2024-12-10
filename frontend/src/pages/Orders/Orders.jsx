import { useState ,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookies'
import axios from 'axios'

import "./Orders.css"
import OrderCard from "../../components/OrderCard/OrderCard";


export default function Orders(){
    const id  = Cookies.getItem('id');
    const [data,setData] = useState([]);
 
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/user/myOrders/${id}`)
        .then((res)=>{
            setData(res.data.user.orderHistory);

            //console.log(res.data.user.orderHistory);
        })
    },[]) 



    return(
        <div>
            <h1>My Orders</h1>
               

            <ol id="cardBody">
                {data.map(a=>a).reverse().map((i,index)=>{

                    return(
                       

                       <OrderCard i = {i}   data = {data} index={index}/>
                        
                    )
                })

                }
                        
            </ol>
            
        </div>
    )
}