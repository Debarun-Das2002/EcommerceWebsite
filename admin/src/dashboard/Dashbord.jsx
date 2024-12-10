import { useEffect, useState } from 'react';
import './Dashbord.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Dashbord(){
const [productss,setProducts] = useState([]);
const navigate = useNavigate();

let he = Cookies.get('token');
let rol = Cookies.get('role');

useEffect(()=>{
    console.log(he);
    axios.get('http://localhost:8000/products/getProducts',{
        headers:{
            'Authorization' : he,
            'Role' : rol
        }
    })
    .then((res)=>{
       // console.log(res.data.user);
        setProducts(res.data.user);
    })
    
},[])

function handleAddProduct(){
   navigate('/createProduct' );
}



    return(
        <div className='dash_container' >
            <center><h1>All Products</h1> </center>
            <button id="addbtn" type="button" onClick={handleAddProduct} class="btn btn-success"><h3>Add <br></br>+</h3></button>

            <table className=" p-3 table " id="orderDataTable">   
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
                    
                  

                    {productss.map((i,index)=>{
                        let path = `http://localhost:8000/images/${i.img}`;
                        let id = `${i._id}`;
                        return(
                            <tr key = {i}>
                            <th scope="col">
                                <img className="img" src={path}  alt="Card image cap"/>
                            </th>
                            <th scope="col">{i.name}</th>
                            <th scope="col">{i.price}</th>
                            <th scope="col">{i.description}</th>
                            <th scope="col" id="dashbtn">
                                <button type="button" class="btn btn-secondary" onClick={()=>{
                                        navigate('/editProduct',{state: {id: i._id}});
                                }}>Edit</button>
                                    
                                    <button type="button" class="btn btn-danger" onClick={()=>{
                                        axios.delete(`http://localhost:8000/products/deleteProduct/${i._id}`,{
                                            headers:{
                                                'Authorization' : `${he}`,
                                                'Role' :`${rol}`
                                            }
                                        })
                                        .then((res)=>{
                                            console.log(res.data);
                                            window.location.reload();
                                        })

                                    }}>Delete</button>

                            </th>
                            </tr>
                        )

                    })

                    }
                    
                    
                  
                </tbody>


                </table>
            
                

           
        </div>
    )


}

export default Dashbord;