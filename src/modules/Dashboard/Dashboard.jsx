import React from 'react'
import Header from '../Shared/Header/Header'
import Headerimg from '../../assets/Headerimg.png'

const Dashboard = () => {
  return (
    <>
      <Header title={'Welcome'}span={'Upskilling!'} description={'This is a welcoming screen for the entry of the application ,you can now see the options'} img={Headerimg}/>
      Dashboard
    </>
  )
}

export default Dashboard
