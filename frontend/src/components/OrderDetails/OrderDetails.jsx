import { useEffect } from "react"
import "./OrderDetails.css"


export default function OrderDetails({data,index}){
    const cart = data[index].cart;



    return(
        <div className="OrderList" >
                {cart.map((i,index)=>{
                    let path = `http://localhost:8000/images/${i.img}`;
                    return(
                       <div className="myOrderbox"> 
                       <div>
                            <img src={path} className="myOrderImage" />
                            <h5>Qty:{i.quantity}</h5>
                        </div>
                        <div>
                            <h3>{i.name}</h3>
                            <h3>{i.description}</h3>
                            <h3>{i.price}</h3>
                        </div>
                       </div>
                    )
                })

                }
        </div>

    )

}