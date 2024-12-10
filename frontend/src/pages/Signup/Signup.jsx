import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Signup(){
const [phone,setPhone] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");    
const [address,setAddress] = useState("");    
const Navigate = useNavigate();

   async function handleSubmit(){
   
        
           await axios.post('http://localhost:8000/auth/register',{
                email : email,
                phone: phone,
                password: password,
                address: address
            })
            .then((res)=>{
                console.log(res.data.message);

                if(res.data.message){
                    Navigate("/login");
                }
                
            })

        
    }

    return(
        
        <section className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                    <div className="card border border-light-subtle rounded-3 shadow-sm">
                    <div className="card-body p-3 p-md-4 p-xl-5">
                        
                        <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
                        <form action="#!">
                        <div className="row gy-2 overflow-hidden">
                            <div className="col-12">
                            
                            </div>
                            <div className="col-12">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="lastName" id="lastName" onChange={(e)=>setPhone(e.target.value)} placeholder="Last Name" required/>
                                <label for="lastName" className="form-label">Phone No</label>
                            </div>
                            </div>
                            <div className="col-12">
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" required/>
                                <label for="email" className="form-label">Email</label>
                            </div>
                            </div>
                            <div className="col-12">
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required/>
                                <label for="password" className="form-label">Password</label>
                            </div>
                            </div>
                            <div className="col-12">
                            <div className="form-floating mb-3">
                                <textarea type="text" className="form-control" name="address" id="password" onChange={(e)=>setAddress(e.target.value)} placeholder="Password" required/>
                                <label for="password" className="form-label">Address</label>
                            </div>
                            </div>
                            <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" name="iAgree" id="iAgree" required/>
                                <label className="form-check-label text-secondary" for="iAgree">
                                I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                                </label>
                            </div>
                            </div>
                            <div className="col-12">
                            <div className="d-grid my-3">
                                <button className="btn btn-primary btn-lg" onClick={handleSubmit}>Sign up</button>
                            </div>
                            </div>
                            <div className="col-12">
                            <p className="m-0 text-secondary text-center">Already have an account? <Link to='login' className="link-primary text-decoration-none">Log in</Link></p>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Signup;