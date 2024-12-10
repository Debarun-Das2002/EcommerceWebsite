import React,{useEffect} from "react"
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Cookies from 'js-cookies';
import { FaCartShopping } from "react-icons/fa6";

import './Navbar.css';

// react-redux hook
import { useSelector } from "react-redux";


function Navbar(){
    let token = Cookies.getItem('token');

    const cartProducts = useSelector(state => state.cart);

    return(
        <>
        
        <nav  className="navbar navbar-expand-lg text-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink to='/' className="navbar-brand text-light" ><b>User</b></NavLink>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink to={'/home'} className="nav-link active text-light" aria-current="page" >Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/orders">MyOrders</NavLink>
                    </li>
                    <li className="nav-item">
                    <a   className="nav-link disabled text-light" aria-disabled="false">Disabled</a>
                    </li>
                </ul>
             
                    {
                        token?
                          <>
                          
                         <NavLink to='/cart' className="btn m-2 btn-outline text-light      
                         " >  <FaCartShopping />{cartProducts.length}</NavLink>
                         <button type="button" className="btn btn-light" onClick={()=>{
                            Cookies.removeItem('token'),
                            Cookies.removeItem('role'),
                            Cookies.removeItem('id'),
                            localStorage.clear(),
                            window.location.reload(false);

                            }}>Logout</button>
                          </>
                        :
                        <>
                        <NavLink to='/login' className="btn m-2 btn-light " >Login</NavLink>
                        
                        <NavLink to='/signup' className="btn m-2 btn-light " >Signup</NavLink>
                        </>

                    }
                  
                   
                    
                
                </div>
            </div>
        </nav>
        <Outlet/>
        </>
    )

}

export default Navbar;