import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Orders.css'

export default function(){
const {id,oid} = useParams();
const [data,setData] = useState([{}]);
const [cart,setCart] = useState([]);
const navigate = useNavigate();

let he = Cookies.get('token');
let rol = Cookies.get('role');

useEffect(()=>{
    axios.post(`http://localhost:8000/products/orders/${id}`,{oid:`${oid}`},{
        headers:{
            'Authorization' : he,
            'Role' : rol
        }
    })
    .then((res)=>{
        
       // console.log(res.data.result.cart);
        
        setCart(res.data.result.cart.cart);
        setData(res.data.result);
       
    })
},[])

function handleOrder(e){
    axios.post(`http://localhost:8000/user/editOrder/${id}`,{oid:`${oid}`,status: e},{
        headers:{
            'Authorization' : he,
            'Role' : rol
        }
    })
    .then((res)=>{
        console.log(res.data);

        if(res.data.success == 'true'){
            if(e == "accepted"){
                toast.success(`Order ${e}`)

            }
            else{
                toast.warn(`Order ${e}`)
            }

            setTimeout(()=>{
                navigate('/orders')
            }, 1500);
           // navigate('/orders');
        }        
        
    })
}



    return(
        <div>
            <div>
            <table class="table" id="orderDataTable">   
                <thead>
                    <tr>
                    <th scope="col">image</th>
                    <th scope="col">name</th>
                    <th scope="col">price</th>
                    <th scope="col">quantity</th>
                    <th scope="col">add</th>
                    </tr>
                </thead>
                <tbody>
                    

                    {cart.map((i,index)=>{
                          let path = `http://localhost:8000/images/${i.img}`; 
                        return(
                            <tr>
                            <th scope="row"><img id="orderid" src={path} /></th>
                            <th scope="row">{i.name}</th>
                            <th scope="row">{i.price}</th>
                            <th scope="row">{i.quantity}</th>
                            <th scope="row">
                                <input type="checkbox" id="ordercheckbox" />
                            </th>
                            
                            </tr>

                        )
                    })
                    }
                  
                </tbody>


                </table>

                <div id="dataCard">
                    <div className="card text-center">
                    
                    <div className="card-body">
                        <h5 className="card-title">{data.email}</h5>
                        <h4 className="card-title">{data.phone}</h4>
                        <p className="card-text">{data.address}</p>
                        <button className="card-link btn btn-danger" onClick={()=>handleOrder("cancled")}>Cancle Order</button>
                        <button className="card-link btn btn-success" onClick={()=>handleOrder("accepted")} >Accept Order</button>
                    </div>
                    
                    </div>
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