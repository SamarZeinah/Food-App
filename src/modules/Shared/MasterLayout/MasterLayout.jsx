import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
const MasterLayout = ({loginData}) => {
  return (
    <>
     <div className='d-flex ' >
        <div >
          <SideBar/>
        </div>
        <div className='w-100 mx-4 '>
          <Navbar loginData={loginData}/>
          {/* <Header/> */}

          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default MasterLayout
