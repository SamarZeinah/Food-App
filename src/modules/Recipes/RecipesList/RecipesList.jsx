import React, { useEffect, useState } from 'react';
import userHeader from '../../../assets/userheader.png';
import Header from '../../Shared/Header/Header';
import axios from 'axios';
import NoData from '../../Shared/NoData/NoData';
import Fallback_img from '../../../assets/fallback image.jpg'
import { toast } from 'react-toastify';
import { baseUrl, Photo_baseUrl, privateAxiosInstance, RECIPES_LIST } from '../../../Services/urls';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';

const RecipesList = () => {
  const [recipesList, setRecipesList] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const[loading,setLoading]=useState(true);
  // Fetch Recipes
  const GetRecipes = async () => {
    try {
      const response = await privateAxiosInstance.get(RECIPES_LIST.GET_RECIPES, {
      });
      setRecipesList(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch recipes');
    }finally{
      setLoading(false);
    }
  };

  // Delete Recipe
  const deleteRecipe = async () => {
    if (recipeToDelete) {
      try {
        await privateAxiosInstance.delete(RECIPES_LIST.DELETE_RECIPES(recipeToDelete));
        GetRecipes(); // Refresh the list after deletion
        setShowDeleteConfirmation(false); // Close the modal after deletion
        toast.success(`recipe of id ${recipeToDelete} delete Successfully`);
        
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to delete recipe');
      }
    }
  };

  useEffect(() => {
    GetRecipes();
  }, []);

  return (
    <div>
      <Header title={'Recipes'} span={'Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} img={userHeader} />
      <div className='d-flex justify-content-between my-5 text-md-start flex-md-row flex-column text-center '>
        <div className='content'>
          <h3>Recipe Table Details</h3>
          <p>You can check all details</p>
        </div>
        <div className='button'>
          <button className='base-button px-5'>Add New Item</button>
        </div>
      </div>
      <div className='data-container'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading?(
              <tr>
              <td colSpan="4" className="text-center">
                <span>Loading...</span>
              </td>
            </tr>
            ):
            recipesList.length > 0 ? (
              recipesList.map((recipe) => (
                <tr key={recipe.id}>
                  <th scope="row">{recipe.id}</th>
                  <td>{recipe.name}</td>
                  <td>
                    {recipe.imagePath ? (
                      <img
                        className='img-fluid recipeImg'
                        src={`${Photo_baseUrl}/${recipe.imagePath}`}
                        alt='recipe photo'
                      />
                    ) : (
                      <span><img 
                      className='img-fluid recipeImg'
                      src={Fallback_img}/></span>
                    )}
                  </td>
                  <td>{recipe.price}$</td>
                  <td>{recipe.description}</td>
                  <td>
                    <div className="dropdown">
                      <button className="btn dropdown border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button"><i className="fa-solid fa-eye text-success"></i> View Recipe</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => { setShowDeleteConfirmation(true); setRecipeToDelete(recipe.id); }}> 
                          <i className="fa-solid fa-trash text-danger"></i> Delete Recipe </button></li>
                        <li><button className="dropdown-item" type="button"><i className="fa-solid fa-pen-to-square text-warning"></i> Edit Recipe</button></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className='text-center'><NoData /></td></tr>
            )}
          </tbody>
        </table>
      </div>
      {showDeleteConfirmation && (
        <DeleteConfirmation
          closeModal={() => setShowDeleteConfirmation(false)}
          onConfirm={deleteRecipe}
        />
      )}
    </div>
  );
};

export default RecipesList;
