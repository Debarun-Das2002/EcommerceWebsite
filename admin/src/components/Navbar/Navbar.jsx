import React,{useEffect} from "react"
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


function Navbar(){

let tokken = Cookies.get('token');
const navigate = useNavigate();

function handleLogout(){
    Cookies.remove('token');
    navigate('/login');
}

    return(
        <>
        
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink to='/' className="navbar-brand" ><b>Admin</b></NavLink>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink to={'/dash'} className="nav-link active" aria-current="page" >Dashbord</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/orders">Orders</NavLink>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
             
                    {
                        tokken?
                        <button type="button" className="btn btn-dark" onClick={handleLogout} >LogOut</button>
                    : <>
                    <NavLink to='/login' className="btn m-2 btn-outline-success" >Login</NavLink>
                    
                    <NavLink to='/signup' className="btn m-2 btn-outline-success" >Signup</NavLink>
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