import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";



export default function Orders(){
const [orderss,setOrders] = useState([]);
const navigate = useNavigate();
useEffect(()=>{
    let he = Cookies.get('token');
    let rol = Cookies.get('role');
    axios.get("http://localhost:8000/products/allOrders",{
        headers:{
            'Authorization': he,
            'Role' : rol
        }
    })
    .then((res)=>{
        setOrders(res.data.orders)
        console.log(res.data.orders);
    })
},[])


function showDate(e) {
    let date = new Date(e); // Ensure e is converted to a Date object
    date = date.toDateString();
    return date
}

    return(
        <div>
            <h1>Orders</h1>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">orderId</th>
                <th scope="col">total</th>
                <th scope="col">payment</th>
                <th scope="col">status</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>

                    {orderss.map((i,index)=>{
                        let date = showDate(i.updatedAt);
                      
                        
                        return(
                        <tr key={index} onClick={()=>{
                            navigate(`/orderData/${i.orderId}/${i.userId}`)
                        }}  >
                            <th scope="row">{i.orderId}</th>
                            <td>{i.total}</td>
                            <td>{i.payment}</td>
                            <td>{i.status}</td>
                            <td>{date}</td>
                        </tr>
                    
                        )
                    })

                    }
                </tbody>
            </table>    
          
        </div>
    )


}