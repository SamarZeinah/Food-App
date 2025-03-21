import React, { useEffect ,useState} from 'react'
import { privateAxiosInstance,Photo_baseUrl, baseUrl } from '../../../Services/urls'
import { toast } from 'react-toastify'

const ViewRecipe = ({onConfirm,closeModal,show,RecipeId}) => {
    const [recipeData, setRecipeData] = useState(null);
    console.log("recipeData",recipeData);
    console.log("RecipeId form viewRecipe",RecipeId);


    //viewrecipe
    const viewrecipe=async()=>{
      try{
          const response=await privateAxiosInstance.get(`${baseUrl}/Recipe/${RecipeId}`);
          console.log(response.data);
          setRecipeData(response.data);
          // toast.success(response.data.message||"Recipe fetched successfully!");
      }catch(error){
          toast.error(error.response.data.message||"Failed to fetched Recipe");

      }
  }
  
  //add Recipe To fav
  const AddFavRecipe=async()=>{
    try{
        const response=await privateAxiosInstance.post(`${baseUrl}/userRecipe/`,{
          "recipeId": RecipeId
        });
        toast.success(response.data.message||"Recipe Added successfully!");
        closeModal();
    }catch(error){
        toast.error(error.response.data.message||"Failed to Add Recipe");

    }
}
    useEffect(()=>{
        viewrecipe()
    },[RecipeId])

  return (
<div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header border-0">
        {recipeData ? (
          <h3 className="modal-title fw-bold text-dark">{recipeData.name}</h3>
        ) : (
          <p>Loading...</p>
        )}
        <button type="button" className="btn-close-delete" aria-label="Close" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="modal-body text-center">
        {recipeData ? (
          <>
            <img className="w-50 rounded mb-2" src={`${Photo_baseUrl}/${recipeData.imagePath}`} alt="Recipe Image" />
            <h5>
              <span className="text-muted fw-normal">Description:</span>
              <span className="fw-bold text-dark">{recipeData.description}</span>
            </h5>
            <h5>
              <span className="text-muted fw-normal">Price:</span>
              <span className="fw-bold text-dark">{recipeData.price}</span>
            </h5>
            <h5>
              <span className="text-muted fw-normal">Category:</span>
              <span className="fw-bold text-dark">{recipeData.category?.[0].name}</span>
            </h5>
            <h5>
              <span className="text-muted fw-normal">Tag:</span>
              <span className="fw-bold text-dark">{recipeData.tag.name}</span>
            </h5>
          </>
        ) : (
          <p className="text-muted">Loading...</p>
        )}
      </div>
      <div className="modal-footer border-0">
        <button type="button" className="btn btn-outline-dark" onClick={() => { 
    onConfirm(); 
    AddFavRecipe(); 
  }}>
          Favorite
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default ViewRecipe
