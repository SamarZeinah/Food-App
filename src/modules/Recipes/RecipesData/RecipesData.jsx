import { useNavigate } from 'react-router-dom'
import FileUploader from '../../Shared/Fileupload/FileUpload';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CATEGORIES_LIST, privateAxiosInstance, Tags,baseUrl,  Photo_baseUrl } from '../../../Services/urls';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Fallback_img from '../../../assets/fallback image.jpg'

const RecipesData = () => {
    const params=useParams();
    const recipeId=params.recipeId;
    const navigate=useNavigate();
    const { register, formState: { errors,isSubmitting }, handleSubmit ,setValue} = useForm();
    
    const[categories,SetCategories]=useState();
    const[tags,SetTags]=useState(); 
    const[loading,setLoading]=useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const[tagValue,SetTagValue]=useState("")
    const[categoryValue,SetCategoryValue]=useState("")
    const [recipeImage, setRecipeImage] = useState(null);
      const [fileObjects, setFileObjects] = useState([]); 
    

    console.log("categories",categories);
    console.log("tags",tags);
    console.log("recipeId",recipeId)

      const handleImageUpload = (files) => {
        if (files.length > 0) {
          setRecipeImage(files[0]);
          console.log("Uploaded image:", files[0]); 
        }
      };
  

      const OnSubmit = async (data) => {
        try {
          if (!recipeImage) {
            toast.error("Please upload an image.");
            return;
          }

          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("description", data.description);
          formData.append("price", data.price);
          formData.append("tagId", data.tagId);
          formData.append("categoriesIds", data.categoriesIds);
          formData.append("recipeImage", recipeImage);

          for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }

          const response = await privateAxiosInstance.post(`${baseUrl}/Recipe/`, formData);
          toast.success(response.data.message || "Recipe Created successfully");
          navigate('/dashboard/recipes');
        } catch (error) {
          console.error("Error during recipe creation:", error.message);
          toast.error(error.message || 'Failed to Create recipe');
        }
      };
      
     //update recipe
    const UpdateRecipe = async (data) => {
      try {
          if (!recipeImage) {
              toast.error("Please upload an image.");
              return;
          }
  
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("description", data.description);
          formData.append("price", data.price);
          formData.append("tagId", data.tagId);
          formData.append("categoriesIds", data.categoriesIds);
          formData.append("recipeImage", recipeImage);
  
          for (let [key, value] of formData.entries()) {
              console.log(`${key}:`, value);
          }
  
          // If recipeId is available, we are updating an existing recipe
          const response = await privateAxiosInstance.put(
              `${baseUrl}/Recipe/${recipeId}`, 
              formData
          );
  
          toast.success(response.data.message || "Recipe updated successfully");
          navigate('/dashboard/recipes');
      } catch (error) {
          console.error("Error during recipe update:", error.message);
          toast.error(error.message || 'Failed to update recipe');
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
      useEffect(() => {
        const fetchData = async () => {
            try {
                await GetAllTags();
                await GetAllCategories();
    
                if (recipeId !== "new-recipe") {
                    console.log("recipeId !== new-recipe");
                    const cleanId = recipeId.replace(':', '');
                    const response = await axios.get(
                        `https://upskilling-egypt.com:3006/api/v1/Recipe/${cleanId}`
                    );
                    
                    const recipe = response.data;
                    console.log("Recipe data:", recipe);
    
                    if (recipe) {
                    setValue("name", recipe.name);
                    setValue("tagId", recipe.tag.id);
                    setValue("price", recipe.price);
                    setValue("categoriesIds", recipe?.category?.[0].id);
                    setValue("description", recipe?.description);


                                      // Update img
                  // const fileUrl = recipe?.imagePath 
                  //     ? `${Photo_baseUrl}/${recipe.imagePath}` 
                  //     : "default-image.jpg";
                  //     const fakeFile = {
                  //       recipe: fileUrl, 
                  //       file: new File([], "preview.jpg"), 
                  //     };
                  //     // console.log(fakeFile);
                  //     setFileObjects([fakeFile]);
                  //     setValue("recipeImage", fileUrl)
                  
                            
                          }
                        }
            } catch (error) {
                console.error("Error during fetching data:", error.message);
                toast.error(error.message || "Failed to fetch data");
            }
        };
    
        fetchData();
    }, [setValue, recipeId]);
    
      

        const handleTagSelect = (e) => {
          const selectedTagId = e.target.value;
            SetTagValue(e.target.value);
    
          const selectedTagObj = tags.find(tag => tag.id === parseInt(selectedTagId));
            setSelectedTag(selectedTagObj); 
    
        };
      
        const handleCategorySelect = (e) => {
          const selectedCategoryId = e.target.value;
            SetCategoryValue(e.target.value);
    
          const selected = categories.find((category) => category.id === parseInt(selectedCategoryId));
              setSelectedCategory(selected);
          
        };

        
        
      
  return (
    <>
    {/* <h1>{params.recipeId}</h1> */}
           <div className='base-light-bg rounded d-flex justify-content-between my-5 text-md-start flex-md-row flex-column text-center p-5 '>
        <div className='content'>
          <h3>Fill the <span className='base-color'>Recipes</span> !</h3>
          <p>you can now fill the meals easily using the table and form ,<br/>
             click here and sill it with the table !</p>
        </div>
        <div className='button'>
          <button onClick={()=>navigate('/dashboard/recipes')} className='base-button px-5 text-nowrap'>All Recipes <i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
      <form onSubmit={handleSubmit(OnSubmit)}>
      <div className='d-flex flex-column col-10 mx-auto align-items-center justify-content-center '>
            <input
                type="text" 
                className="form-control bg-body-tertiary border-0 mb-3 px-2 py-2 mt-5"
                placeholder="Recipe Name "
                aria-label="Recipe Name"
                aria-describedby="basic-addon1"
                {...register('name',{required:'name required '})}
                />
                {errors.name&&<span className='text-danger'>{errors.name.message}</span>}

             {/*Select Tag */}
            <div className="form-control bg-body-tertiary border-0 mb-3 px-2 py-2">
              <select 
                className="form-select"
                aria-label="Select Tag"
                value={selectedTag?.id || ""}
                {...register('tagId', { required: 'Tag is required' })}
                onChange={handleTagSelect}
              >
                <option value="">Select a Tag</option>
                {tags?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>

            </div>
            {errors.tagId&&<span className='text-danger'>{errors.tagId.message}</span>}

                <input
                type="number" 
                className="form-control bg-body-tertiary border-0 mb-3 px-2 py-2"
                placeholder="Price"
                aria-label="Price"
                aria-describedby="basic-addon1"
                {...register('price',{required:'price required '})}
                />
                {errors.price&&<span className='text-danger'>{errors.price.message}</span>}
                {/* Select Category */}
                <div className="form-control bg-body-tertiary border-0 mb-3 px-2 py-2">
    
                  <select
                    className="form-select"
                    aria-label="Select Category"
                    value={selectedCategory?.id || ""}
                    {...register('categoriesIds', { required: 'Category is required' })}
                    onChange={handleCategorySelect}
                      >
                    <option value="">{selectedCategory ? selectedCategory.name : "Category"}</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
          
                </div>
                {errors.categoriesIds&&<span className='text-danger'>{errors.categoriesIds.message}</span>}
                <textarea {...register('description',{required:'description required '})} className="form-control bg-body-tertiary border-0 mb-3" placeholder="Description *" id="floatingTextarea2"></textarea>
                {errors.description&&<span className='text-danger'>{errors.description.message}</span>}
                
      
                <FileUploader onChange={handleImageUpload}
                 initialFiles={recipeImage ? [recipeImage] : []}
                 fileObjects={fileObjects}
                 />

                {errors.recipeImage && <span className='text-danger'>{errors.recipeImage.message}</span>}
              </div>
                <div className='d-flex justify-content-end gap-3 mx-5 mt-5' >
                <button  type="button" className="border border-2 border-success rounded bg-white px-5 py-2 cancel-btn text-success"onClick={()=>navigate('/dashboard/recipes')}>cancel</button>
                <button disabled={isSubmitting} className="base-bg-color text-white rounded border-0 px-4 py-2 save-btn" >{isSubmitting?"Loading...":"Save"}</button>
                </div>
      </form>
    </>
  )
}

export default RecipesData


