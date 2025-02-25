import React, { useEffect, useState } from 'react'
import userHeader from '../../../assets/userheader.png'
import Header from '../../Shared/Header/Header'
import axios from 'axios';
import NoData from '../../Shared/NoData/NoData';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../Services/urls';
const RecipesList = () => {

  const[recipesList,setrecipesList]=useState([]);
  //GetRecipes
  const GetRecipes=async()=>{
    try{
      const response=await axios.get(`${baseUrl}/Recipe/?pageSize=10&pageNumber=1`,
        {headers:{Authorization:localStorage.getItem('token')}}
      );
      console.log("GetRecipes response",response.data);
      setrecipesList(response.data.data);
    }
    catch(error){
  toast.error(error.response.data.message);

    }
  }
  //deleteRecipe
const deleteRecipe=async(id)=>{
  try{
    const response=await axios.delete(`${baseUrl}/Recipe/${id}`,
      {headers:{Authorization:localStorage.getItem('token')}})
      GetRecipes();
  }
  catch(error){
    toast.error(response.data.error);
  }
}


  useEffect(()=>{
    GetRecipes();
  },[])

  return (
    <div>
      <Header title={'Recipes'}span={'Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} img={userHeader}/>
      <div className='d-flex justify-content-between my-5 '>
        <div className='content'>
          <h3>Recipe Table Details</h3>
          <p>You can check all details</p>
        </div>
        <div className='button '>
          <button className='base-button'>Add New Item</button>
        </div>

      </div>
      <div className='data-container'>
      <table className="table">
        <thead >
          <tr >
            <th  scope="col" >Id</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
            {recipesList.length > 0 ? recipesList.map((recipe) => (
              <tr key={recipe.id}>
                <th scope="row">{recipe.id}</th>
                <td>{recipe.name}</td>
                <td>
                {recipe.imagePath ? 
                  // <img 
                  //   className='img-fluid ' 
                  //   style={{ maxWidth: '100px', maxheight: '100px' }} 
                  //   src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`} 
                  //   alt='recipe photo' 
                  // />
                  <img 
                  className='img-fluid recipeImg' 
                  src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`} 
                  alt='recipe photo' 
                />
                  : <span>No Image</span>
                }
              </td>

                <td>{recipe.price}</td>
                <td>{recipe.description}</td>
                <td>
                  <div className="dropdown">
                    <button className="btn dropdown border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" type="button"><i className="fa-solid fa-eye text-success"></i></button></li>
                      <li><button className="dropdown-item" type="button" onClick={()=>{deleteRecipe(recipe.id)}}> <i className="fa-solid fa-trash text-danger"></i> </button></li>
                      <li><button className="dropdown-item" type="button"><i className="fa-solid fa-pen-to-square text-warning"></i></button></li>
                    </ul>
                  </div>
                </td>
              </tr>
            )) : <tr><td colSpan="6" className='text-center'><NoData /></td></tr>}
          </tbody>
        </table>
      </div>   
        </div>
  )
}

export default RecipesList
