import React from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../../../assets/logo.png'


const AuthLayout = () => {
  return (
       <div className='auth-container '>
            <div className='container-fluid bg-overlay '>
                  <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6 bg-white rounded">
                      <div className=' mx-5 my-5 ' >
                        <div className='text-center' >
                          <img className="w-50 "src={Logo} alt='Logo'/> 
                        </div>
    
                        <Outlet/>

                  </div>
                </div>
              </div>
    
            </div>
    
          </div>
  )
}

export default AuthLayout
