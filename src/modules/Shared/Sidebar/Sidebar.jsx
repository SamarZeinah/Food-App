import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import dashlogo from '../../../assets/dashlogo.png'


const SideBar = () => {
  let navigate=useNavigate()
  const LogOut=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  const[isCollapsed,setisCollapsed]=useState(false)
  const collapsedfun=()=>{
    setisCollapsed(!isCollapsed);
  }
  return (
    <>
<div className='sidebar-container'>
    <Sidebar collapsed={isCollapsed}>
      <Menu>
        <MenuItem icon={<img onClick={collapsedfun} src={dashlogo} alt='dashlogo'/>}className='logo-li my-3'> </MenuItem>
        <MenuItem component={<Link to="/dashboard"/>} icon={<i className="fa-solid fa-house"  ></i>}> Home </MenuItem>
        <MenuItem  component={<Link to={"/dashboard/users"}/>}icon={<i className="fa-solid fa-users"  ></i>} >users </MenuItem>
        <MenuItem  component={<Link to={"/dashboard/recipes"}/>}icon={<i className="fa-solid fa-house"  ></i>}> Recipes </MenuItem>
        <MenuItem  component={<Link to={"/dashboard/category"}/>}icon={<i className="fa-solid fa-calendar-days"  ></i>}> Categories </MenuItem>
        <MenuItem className='mt-5' onClick={LogOut} icon={<i className="fa-solid fa-right-from-bracket"  ></i>}> Logout </MenuItem>
      </Menu>
    </Sidebar>
</div>

    </>
  )
}

export default SideBar
