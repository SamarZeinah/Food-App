import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
const MasterLayout = () => {
  return (
    <>
      <div className='d-flex'>
        <div className='w-25 bg-info'>
          <Sidebar/>
        </div>
        <div className='w-75 bg-warning'>
          <Header/>
          <Navbar/>
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default MasterLayout
