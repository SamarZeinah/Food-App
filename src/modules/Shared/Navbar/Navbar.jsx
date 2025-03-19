import React from 'react'
import { useNavigate } from 'react-router-dom';
import ChangePassModal from '../../Authentication/Change-pass/ChangePass';
import { useState } from 'react';
const Navbar = ({loginData}) => {
  console.log("logindata from sidebar",loginData);
  const navigate=useNavigate();
  const[showChangePass,setShowChangePass]=useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded my-3">
  <div className="container-fluid mx-5">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" >{loginData?.userName}</a>
        </li>
        <li className="nav-item dropdown  ">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><a className="dropdown-item "><i className="fa-solid fa-user"></i> Profile</a></li>
            <li><a className="dropdown-item" onClick={()=>setShowChangePass(true)}><i className="fa-solid fa-lock-open"></i> ChangePassword</a></li>
            <li><a className="dropdown-item" onClick={()=>navigate('/login')}><i className="fa-solid fa-right-from-bracket"  ></i> LogOut </a></li>
          </ul>
        </li>
        <li className=" nav-link">
        <i className="fa-solid fa-bell"></i>
        </li>
        
      
      </ul>
      
     
    </div>
  </div>
</nav>
{showChangePass&&<ChangePassModal closeModal={()=>setShowChangePass(false)}/>}

    </>
  )
}

export default Navbar
