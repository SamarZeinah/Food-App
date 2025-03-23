import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import dashlogo from '../../../assets/dashlogo.png'
import ChangePassModal from '../../Authentication/Change-pass/ChangePass';
import columnsgap from '../../../assets/columns-gap.png'

const SideBar = ({getLoginData}) => {
  const loginData=getLoginData();
  console.log("logindata from sidebar",loginData?.userGroup);

  let navigate=useNavigate()
  const LogOut=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  const[isCollapsed,setisCollapsed]=useState(false)
  const collapsedfun=()=>{setisCollapsed(!isCollapsed);}

  const[showChangePass,setShowChangePass]=useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 824) {
        setisCollapsed(true); 
      } else {
        setisCollapsed(false);  
      }
    };

    handleResize(); 

    window.addEventListener('resize', handleResize); 

    return () => window.removeEventListener('resize', handleResize); 
  }, []);
  
  return (
    <>
<div className='sidebar-container'>
    <Sidebar collapsed={isCollapsed}  >
      <Menu>
        <MenuItem icon={<img onClick={collapsedfun} src={dashlogo} alt='dashlogo'/>}className='logo-li my-3'> </MenuItem>
        <MenuItem component={<Link to="/dashboard"/>} icon={<i className="fa-solid fa-house"  ></i>}> Home </MenuItem>

        {/* users allow for admin */}
        {loginData?.userGroup!='SystemUser'?
        
          <MenuItem  component={<Link to={"users"}/>}icon={<i className="fa-solid fa-users"  ></i>} >users </MenuItem>
        :''}

        <MenuItem  component={<Link to={"recipes"}/> }icon={<i className="fa-solid fa-calendar-days"  ></i>}>Recipes </MenuItem>
        
        {/* Categories allow for admin */}
        {loginData?.userGroup!='SystemUser'?
                <MenuItem  component={<Link to={"category"}/>}icon={<i className="fa-solid fa-calendar-days"  ></i>}> Categories </MenuItem>
          :''}

        {/* Fav allow for user */}
        {loginData?.userGroup=='SystemUser'?
                <MenuItem  component={<Link to={"favorites"}/>}icon={<i className="fa-solid fa-heart"  ></i>}> Favorites </MenuItem>
            :''}
          

        <MenuItem onClick={()=>setShowChangePass(true)} icon={<i className="fa-solid fa-lock-open"></i>}> Change Password </MenuItem>
        <MenuItem className='mt-5' onClick={LogOut} icon={<i className="fa-solid fa-right-from-bracket"  ></i>}> Logout </MenuItem>
      </Menu>
    </Sidebar>
</div>
    {showChangePass&&<ChangePassModal closeModal={()=>setShowChangePass(false)}/>}
    </>
  )
}

export default SideBar

