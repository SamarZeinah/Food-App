import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/sidebar'
const MasterLayout = ({getLoginData}) => {
  console.log("getLoginData from masterlayout",getLoginData);
  return (
    <>
     <div className='d-flex vh-100 ' >
        
          <SideBar  getLoginData={getLoginData}/>
        
        <div className='w-100 mx-4 d-flex flex-column'>
          <Navbar getLoginData={getLoginData}/>
          {/* <Header/> */}
          <div className='overflow-y-auto'> 
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  )
}

export default MasterLayout