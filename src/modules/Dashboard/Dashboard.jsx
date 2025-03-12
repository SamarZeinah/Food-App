import React from 'react'
import Header from '../Shared/Header/Header'
import Headerimg from '../../assets/Headerimg.png'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate=useNavigate();
  return (
    <>
      <Header title={'Welcome'}span={'Upskilling!'} description={'This is a welcoming screen for the entry of the application ,you can now see the options'} img={Headerimg}/>
      <div className='base-light-bg rounded d-flex justify-content-between my-5 text-md-start flex-md-row flex-column text-center p-5 '>
        <div className='content'>
          <h3>Fill the <span className='base-color'>Recipes</span> !</h3>
          <p>you can now fill the meals easily using the table and form ,<br/>
             click here and sill it with the table !</p>
        </div>
        <div className='button'>
          <button onClick={()=>navigate('/dashboard/FillRecipes')} className='base-button px-5 text-nowrap'>Fill Recipes <i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    </>
  )
}

export default Dashboard
