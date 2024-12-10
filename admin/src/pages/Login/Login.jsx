import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPasswrod] = useState("");
    const Navigate = useNavigate();

  async  function handleSubmit(){
       await axios.post('http://localhost:8000/auth/login',{email,password})
       .then((req)=>{
            console.log(req.data);
            if(req.data.token){
                Cookies.set('token',req.data.token,{expires: 14,secure: true})
                Cookies.set('role',req.data.role,{expires: 14,secure: true})
                
                Navigate('/dash');
            }
       })
    }



    return(
        <section class="bg-light py-3 py-md-5">
            <div class="container">
                <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                    <div class="card border border-light-subtle rounded-3 shadow-sm">
                    <div class="card-body p-3 p-md-4 p-xl-5">
                        
                        <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                        <form action="#!">
                        <div class="row gy-2 overflow-hidden">
                            <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" name="email" id="email"  onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" required/>
                                <label for="email" class="form-label">Email</label>
                            </div>
                            </div>
                            <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" name="password" id="password"  onChange={(e)=>setPasswrod(e.target.value)} placeholder="Password" required/>
                                <label for="password" class="form-label">Password</label>
                                
                            </div>
                            </div>
                            <div class="col-12">
                            <div class="d-flex gap-2 justify-content-between">
                                <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" name="rememberMe" id="rememberMe"/>
                                <label class="form-check-label text-secondary" for="rememberMe">
                                    Keep me logged in
                                </label>
                                </div>
                                <a href="#!" class="link-primary text-decoration-none">Forgot password?</a>
                            </div>
                            </div>
                            <div class="col-12">
                            <div class="d-grid my-3">
                                <button class="btn btn-primary btn-lg" onClick={handleSubmit}>Log in</button>
                            </div>
                            </div>
                            <div class="col-12">
                            <p class="m-0 text-secondary text-center">Don't have an account? <a href="#!" class="link-primary text-decoration-none">Sign up</a></p>
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

export default Login;