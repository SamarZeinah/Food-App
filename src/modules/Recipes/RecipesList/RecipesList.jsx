import React, { useEffect, useState } from 'react';
import userHeader from '../../../assets/userheader.png';
import Header from '../../Shared/Header/Header';
import axios from 'axios';
import NoData from '../../Shared/NoData/NoData';
import Fallback_img from '../../../assets/fallback image.jpg'
import { toast } from 'react-toastify';
import { baseUrl, Photo_baseUrl,CATEGORIES_LIST, privateAxiosInstance, RECIPES_LIST, Tags } from '../../../Services/urls';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';
import Pagination from '../../Shared/Pagination/Pagination';
import { useNavigate } from 'react-router-dom'
import ViewRecipe from './ViewRecipe';

const RecipesList = () => {
  const [recipesList, setRecipesList] = useState([]);
  console.log("recipesList",recipesList);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const[loading,setLoading]=useState(true);
  const[arrayOfPages,setArrayOfPages]=useState([]);
  const[categories,SetCategories]=useState();
  const[tags,SetTags]=useState(); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const[name,SetName]=useState("");
  const[tagValue,SetTagValue]=useState("")
  const[categoryValue,SetCategoryValue]=useState("")
  const[viewRecipeId,setViewRecipeId]=useState("")
  const[showRecipe,setShowRecipe]=useState(false);
  const[loginData,setLoginData]=useState(null);
console.log("showRecipe",showRecipe)
  const navigate=useNavigate();
  

  console.log("arrayOfPages",arrayOfPages);
  console.log("categories",categories);
  console.log("tags",tags);
  console.log("name",name);
  console.log("tagValue",tagValue);
  console.log("categoryValue",categoryValue);
  console.log("viewRecipeId",viewRecipeId);


  // Fetch Recipes
  const GetRecipes = async (pageSize,pageNumber,name,tagId,categoryId) => {
    try {
      // const response = await privateAxiosInstance.get(`/Category/?pageSize=10&pageNumber=1`, {
      const response = await privateAxiosInstance.get(RECIPES_LIST.GET_RECIPES, {
        params:{
          pageSize:pageSize,
          pageNumber:pageNumber,
          name:name,
          tagId:tagId,
          categoryId:categoryId
        }
      });
      setRecipesList(response.data.data);
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,index)=>index+1))
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch recipes');
    }finally{
      setLoading(false);
    }
  };

  //Get Categories
  const GetAllCategories=async(pageSize,pageNumber)=>{
    try{
      const response=await privateAxiosInstance.get(CATEGORIES_LIST.GET_CATEGORIES,{
      }
      )
      console.log("Categories response",response.data.data);
      SetCategories(response.data.data);
    }
    catch(error){
    toast.error(error.response.data.message)
    }
    finally {
      setLoading(false);
    }
  }
   //Get Tags
   const GetAllTags=async()=>{
    try{
      const response=await privateAxiosInstance.get(Tags.GET_TAGS,{
      }
      )
      console.log("Categories response",response.data.data);
      SetTags(response.data);
    }
    catch(error){
    toast.error(error.response.data.message)
    }
    finally {
      setLoading(false);
    }
  }
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
    GetRecipes(4,1);
    GetAllTags();
    GetAllCategories();
    console.log( "decodedToken from recipelist", JSON.parse(localStorage.getItem('decodedToken')) )
    setLoginData(JSON.parse(localStorage.getItem('decodedToken')) );
  }, []);

  //pagination
    const handlePageChange = (pageNumber) => {
      GetRecipes(4, pageNumber);
    };
    
    const getNameValue = (e) => {
      const value = e.target.value;
        SetName(value); 
    
      if (value.trim() === "") {
        GetRecipes(4, 1, "",tagValue,categoryValue);
      } else {
        GetRecipes(4, 1, value,tagValue,categoryValue);
      }
    };

    const handleTagSelect = (e) => {
      const selectedTagId = e.target.value;
        SetTagValue(e.target.value);

      const selectedTagObj = tags.find(tag => tag.id === parseInt(selectedTagId));
        setSelectedTag(selectedTagObj); 

      if(selectedTagId.trim()===""){
        GetRecipes(4, 1, name, "",categoryValue);
      }else{
        GetRecipes(4, 1, name, selectedTagId,categoryValue);
      }

    };
  
    const handleCategorySelect = (e) => {
      const selectedCategoryId = e.target.value;
        SetCategoryValue(e.target.value);

      const selected = categories.find((category) => category.id === parseInt(selectedCategoryId));
          setSelectedCategory(selected);
      
      if(selectedCategoryId.trim()===""){
        GetRecipes(4, 1, name, tagValue,"");
      }else{
        GetRecipes(4, 1, name,tagValue,categoryValue);
      }
    };
  //add Recipe To fav
  const AddToFavourite = async (recipeId) => {
    console.log("AddToFavourite")
  };
  

  return (
    <div>
      <Header title={'Recipes'} span={'Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} img={userHeader} />
      <div className='d-flex justify-content-between my-5 text-md-start flex-md-row flex-column text-center '>
        <div className='content'>
          <h3>Recipe Table Details</h3>
          <p>You can check all details</p>
        </div>
        {loginData?.userGroup!='SystemUser'?
        <div className='button'>
          <button className='base-button px-5' onClick={()=>navigate("/dashboard/recipedata/new-recipe")}>Add New Item</button>
        </div>:''}
       
      </div>
     {/* filteration */}
      <div className="d-flex align-items-center gap-4 me-5 mb-3">
        
        {/*  Search Bar */}
        <div className="input-group w-50 ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search here ..." 
            aria-label="Search" 
            aria-describedby="basic-addon1"
            onChange={getNameValue}
          />
        </div>

        {/*Select Tag */}
        <div className="w-25">
          <select 
            className="form-select"
            aria-label="Select Tag"
            value={selectedTag?.id || ""}
            onChange={ handleTagSelect  }
          >
            <option value="">{selectedTag ? selectedTag.name : "Tag"}</option>
            {tags?.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Category */}
        <div className="w-25">
          <select 
            className="form-select"
            aria-label="Select Category"
            value={selectedCategory?.id || ""}
            onChange={ handleCategorySelect}
          >
            <option value="">{selectedCategory ? selectedCategory.name : "Category"}</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

      </div>


      <div className='data-container'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Tag</th>
              <th scope="col">Category</th>
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
                  <td>{recipe.tag.name}</td>
                  <td>{recipe.category[0].name}</td>

                  <td>
                    <div className="dropdown">
                      <button className="btn dropdown border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button" onClick={()=>{setViewRecipeId(recipe.id);setShowRecipe(true)}}><i className="fa-solid fa-eye text-success"></i> View Recipe</button></li>
                        {/* Delete allow for admin */}
                          {loginData?.userGroup!='SystemUser'?
                          <li>
                            <button className="dropdown-item" type="button" onClick={() => { setShowDeleteConfirmation(true); setRecipeToDelete(recipe.id); }}> 
                          <i className="fa-solid fa-trash text-danger"></i> Delete Recipe </button>
                          </li>
                          :''}

                           {/* Edit allow for admin */}
                          {loginData?.userGroup!='SystemUser'?
                        <li>
                          <button className="dropdown-item" type="button" onClick={()=>navigate(`/dashboard/recipedata/:${recipe.id}`)}>
                          <i className="fa-solid fa-pen-to-square text-warning"></i> Edit Recipe</button>
                          </li>:''}
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
      
  {/* pagination */}
  <Pagination arrayOfPages={arrayOfPages} onPageChange={handlePageChange}/>
  {/* view Recipe */}
    {showRecipe&&<ViewRecipe 
    onConfirm={AddToFavourite} 
    closeModal={()=>setShowRecipe(false)} 
    show={showRecipe} 
    RecipeId={viewRecipeId}   />}
    </div>
  );
};

export default RecipesList;
