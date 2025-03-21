import React, { useEffect, useState } from 'react'
import Header from '../Shared/Header/Header'
import userHeader from '../../../src/assets/userheader.png';
import { baseUrl, Photo_baseUrl, privateAxiosInstance } from '../../Services/urls';
import { toast } from 'react-toastify';
import Fallback_img from '../../assets/fallback image.jpg'
import NoData from '../Shared/NoData/NoData';
const Favorites = () => {
  const [favData, setFavData] = useState([]);
  const[deleteFav,setDeleteFav]=useState();
    const[loading,setLoading]=useState(true);
  
  console.log("favData",favData);
  console.log("deleteFav",deleteFav);



  //GetFavRecipe
  const GetFavRecipe=async()=>{
 
    try{
      const response=await privateAxiosInstance.get(`${baseUrl}/userRecipe/?pageSize=10&pageNumber=1`);
      console.log("response.data.data",response.data.data)
      setFavData(response.data.data);
    }catch(error){
      toast.error(error.response.data.message)
    }finally {
      setLoading(false);
    }
  }
  //DeleteFavRecipe
  const DeleteFavRecipe = async (favId) => {
    try {
      const response = await privateAxiosInstance.delete(`${baseUrl}/userRecipe/${favId}`);
      console.log("DeleteFavRecipe response", response.data.data);
      toast.success(response.data.message || " deleting Successfully!");
      GetFavRecipe(); // Refresh list after deletion
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting favorite");
    }
  };
  
  useEffect(()=>{
    GetFavRecipe();
  },[])
  return (
    <>
      <Header title={'Favorite'} span={'Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} img={userHeader} />

      <div className="comp container mt-4">
        <div className="row px-5">

        {loading?(
             
              <p colSpan="4" className="text-center">
                <span>Loading...</span>
              </p>
           
            ): 
             favData.length>0? (favData.map((fav) => (
        <div key={fav.id} className="col-md-6 col-sm-12 col-lg-4 mb-3">
          <div className="card shadow-sm">
          <img 
        src={fav.recipe?.imagePath ? `${Photo_baseUrl}/${fav.recipe.imagePath}` : Fallback_img} 
        className="card-img-top img-fluid fav_img" 
        alt={fav.recipe?.name || "Default Image"} 
      />

            
            {/* icon*/}
            <button  className="icon" onClick={()=>DeleteFavRecipe(fav.id)} > <i className="fas fa-heart"></i> </button>

            <div className="card-body text-center">
            <h5 className="card-title">{fav.recipe?.name || "No Name Available"}</h5>
          <p className="card-text text-muted">{fav.recipe?.description || "No Description Available"}</p>
          <p className="card-text text-muted">{fav.recipe?.tag.name || "No Tag Available"}</p>
          <p className="card-text text-muted">{fav.recipe?.price || "No Price Available"}</p>



            </div>
          </div>
        </div>
      ))): (
        <p colSpan="6" className='text-center'><NoData /></p>
      )}

        </div>
      </div>






    </>
  )
}

export default Favorites
