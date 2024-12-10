
import { useEffect, useState } from "react";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
export default function({i,data,index}){
const [show,setShow] = useState(false);

let d =  new Date(i.updatedAt);
d = d.toDateString();

    return(
        <>
  
        <li className="card-body p-3" id="myOrdersCard" onClick={
            ()=>{
                
               // console.log(data[index].cart);      
               if(show == false){
                   setShow(true);
                  
               }
               else{
                setShow(false);
               }
            }
        }>
        <h2 className="card-title">Payment Method :  {i.payment}</h2>
        <h2 className="card-title">Order Status:  {i.status}</h2>
        <h2 className="card-text">TotalAmouont:  {i.total}</h2>
        
        <div className="orderDate" >
            
            <h3>{d}</h3>

        </div>
            { show == true?
                <OrderDetails data={data} index = {index}   />
                :
                <div></div>
            }
        </li>

        </>
    )
}