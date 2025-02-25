import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
const MasterLayout = ({loginData}) => {
  return (
    <>
     <div className='d-flex vh-100 ' >
        
          <SideBar/>
        
        <div className='w-100 mx-4 d-flex flex-column'>
          <Navbar loginData={loginData}/>
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