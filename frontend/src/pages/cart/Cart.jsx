import { useEffect, useState } from "react"

import axios from 'axios'
import Cookies from 'js-cookies'
import './Cart.css'
import { MdOutlinePayments } from "react-icons/md";
// react -redux hook
import { useSelector,useDispatch } from "react-redux"
import {remove,increaseCart,decreaseCart} from '../../store/cartSlice'

import { useNavigate } from "react-router-dom";
export default function Cart(){

    //const [cart,setCart] = useState([]);

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const total = localStorage.getItem("totalPrice");

useEffect(()=>{
    console.log(cart);
},[cart])

// useEffect(()=>{
//     let id = Cookies.getItem('id');
  
//      axios.get(`http://localhost:8000/user/Cart/${id}`)
//     .then((res)=>{
//           setCart(res.data.user.cart.items);
//     })
    

   

// },[])

// function getdata(){
//     let id = Cookies.getItem('id');
  
//      axios.get(`http://localhost:8000/user/Cart/${id}`)
//     .then((res)=>{
//           setCart(res.data.user.cart.items);
//     })
    
// }



// function addtoCart(e){
//     const uid = Cookies.getItem("id");
//     console.log(uid);
//     console.log(e); 
    
//     axios.put(`http://localhost:8000/user/addtoCart/${e}`,{uid})
//     .then((res)=>{
//         console.log(res.data)
//         window.location.reload(false);
//     })
  
// }
//  function removeCart(e){
//     const uid = Cookies.getItem("id");
//     console.log(uid);
//     console.log(e); 
    
//     axios.put(`http://localhost:8000/user/removeCart/${e}`,{uid})
//     .then((res)=>{
//         console.log(res.data)
//         window.location.reload(false);
//     })
  
// }


const removeFromCart = (id) => {
    dispatch(remove(id));

}

const increaseToCart = (id) => {
    dispatch(increaseCart(id));
}
const decreaseToCart = (id) => {
    dispatch(decreaseCart(id));
}


    return(
        <div>
            <div>
                <h1>cart</h1>
            
               
            </div>
            <div>
            <table className="table">
                <thead>
                    <tr>
                    
                    <th scope="col" ></th>
                    <th scope="col" >
                        <div className="quantity_editor">
                           quantity
                        </div>
                    </th>
                    <th scope="col" >price</th>
                    <th scope="col" >-</th>
                    </tr>
                </thead>
                <tbody>
                    
                  
                  {cart.map((i,idex)=>{
                  
                  let path = `http://localhost:8000/images/${i.img}`;
                    return(
                        <>
                        <tr>

                        <td><img className="cartImg" src={path} />
                        <h5>{i.name}</h5>
                        </td>
                        <td>
                            <div className="quantity_editor">
                            <button className=" editbtn btn btn-secondary" onClick={()=>{decreaseToCart(i._id)}}  > - </button>
                            <label>{i.quantity}</label>
                            <button className="editbtn btn btn-secondary " onClick={()=>{increaseToCart(i._id)}}  > + </button>
                            </div>
                        </td>
                        <td>{i.price}</td>
                        <td>
                        </td>
                        <td>
                        <button type="button" class="btn btn-danger"onClick={()=> {removeFromCart(i._id)}} >remove</button>
                      
                        </td>
                        
                        </tr>
                        </>
                    )
                    
                    
                })
                
            }
                </tbody>
          
                </table>
                <div className="total">
                        
                    <h3>totalAmount <span> =  {total} </span></h3>
                    
                    <button className="payment_button btn btn-success" onClick={
                        () =>{
                            navigate('/checkout');
                        }}>
                        <MdOutlinePayments id="icon"/>
                        Checkout
                    </button>
                </div>
            </div>

        </div>
        
    )

}