import React, { useState } from "react";
import './CreateProduct.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

function CreateProduct(){
const[name,setName] = useState();
const[description,setDes] = useState();
const[price,setPrice] = useState();
const[img,setImg] = useState("tempimg");
const[category,setCategory] = useState();

const [flag,setflag] = useState(false);

const navigate = useNavigate();

let he = Cookies.get('token');
let rol = Cookies.get('role');
   async function handleOnSubmit(e){
        e.preventDefault(); 
       
         he = Cookies.get('token');
         rol = Cookies.get('role');
             await axios
            .post("http://localhost:8000/products/createProduct", {
                name:`${name}`,
                description :`${description}`,
                category:`${category}`,
                img:`${img}`,
                price: `${price}`
            },
            {
                headers:{
                    'Authorization' : `${he}`,
                    'Role' : `${rol}`
                }
            }
        )
            .then((response) => {
              if(response.data.success){
                navigate('/dash');
              }
            })
            .catch(function (error) {
                console.log(error);
            });

       
    
    }

    return(
        <div className="addContainer" >
            
            <div className="formContainer">
                  <center> <h1>Create New Product</h1></center> 
                <form className="mainform" >
                    <div className="details">
                        <label >name</label>
                        <input type="text" onChange={(e)=>setName(e.target.value)} required />
                    </div>  
                    <div className="details">
                        <label >Upload Product Image</label>
                        <form action="http://localhost:8000/products/uploadImage" method="POST" enctype="multipart/form-data">
                            <input type="file" name="file" onChange={(e)=>{
                                    const files = e.target.files;
                                    const fileName = files[0].name;
                                    setImg(fileName);
                            }} required/>
                            
                            <button type="submit" onClick={(e)=>{setflag(true); console.log(flag)}}>upload</button>
                        </form>  
                         
                    </div>

                    <div className="details">
                        <label >description</label>
                        <textarea type="text" onChange={(e)=>setDes(e.target.value)} required  rows='3' />
                    </div>  

                    <div className="details">
                        <label >price</label>
                        <input type="text" required onChange={(e)=>setPrice(e.target.value)}   />
                    </div>  

                    <div className="details">
                        <label >category</label>
                        <select className="form-select"onChange={(e)=>setCategory(e.target.value)} aria-label="Default select example">
                            <option required defaultValue="n/a">Open this select menu</option>
                            <option value="tech">Tech</option>
                            <option value="cloths">Cloths</option>
                            <option value="kitchen">Kitchen</option>
                        </select>
                        <p>{category}</p>
                    </div>  

                    <button onClick={handleOnSubmit}> submit</button>
                </form>

            </div>

        </div>
    )
}

                      

export default CreateProduct;