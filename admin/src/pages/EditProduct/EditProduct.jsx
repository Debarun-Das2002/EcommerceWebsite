import React, { useState ,useEffect} from "react";
import './EditProduct.css';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'


function EditProduct(){
const[name,setName] = useState();
const[description,setDes] = useState();
const[img,setImg] = useState();
const[category,setCategory] = useState();
const[price,setPrice] = useState();
const [flag,setflag] = useState(false);


const navigate = useNavigate();
const location = useLocation();
const id = location.state.id;


let he = Cookies.get('token');
let rol = Cookies.get('role');


useEffect(()=>{
     he = Cookies.get('token');
     rol = Cookies.get('role');
    axios.get(`http://localhost:8000/products/getOneProduct/${id}`,{
        headers:{
            'Authorization' : he,
            'Role' : rol
        }
    })
    .then((response)=>{
        console.log(response.data.user);

          setPrice(response.data.user.price);   
          setName(response.data.user.name);
          setDes(response.data.user.description);
          setCategory(response.data.user.data.category);
          setImg(response.data.user.img);

        
    })
},[])


    function handleOnSubmit(e){
        e.preventDefault(); 
       
             axios
            .put(`http://localhost:8000/products/updateProduct/${id}`, {
                price: `${price}`,
                name:`${name}`,
                description :`${description}`,
                category:`${category}`,
                img:`${img}`,

                

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
            <button  onClick={()=>{
                console.log(price);
            }
            }>sdfjsldkfj   </button>
            <div className="formContainer">
                  <center> <h1>Edit Product</h1></center> 
                <form className="mainform" >
                    <div className="details">
                        <label >name</label>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required />
                        
                    </div>  
                    <div className="details">
                        <label >Upload Product Image</label>
                        <form action="http://localhost:8000/products/uploadImage" method="POST" enctype="multipart/form-data">
                            <input type="file" name="file"  onChange={(e)=>{
                                    const files = e.target.files;
                                    const fileName = files[0].name;
                                    setImg(fileName);
                            }} required/>
                            
                            <button type="submit" onClick={(e)=>{setflag(true); console.log(flag)}}>upload</button>
                        </form>  
                         
                    </div>

                    <div className="details">
                        <label >description</label>
                        <textarea type="text" value={description} onChange={(e)=>setDes(e.target.value)} required  rows='3' />
                    </div>  

                    <div className="details">
                        <label >price</label>
                        <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}  required />
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

                      

export default EditProduct;