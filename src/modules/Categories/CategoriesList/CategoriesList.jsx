import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import userHeader from '../../../assets/userheader.png'
import axios from 'axios'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NoData from '../../Shared/NoData/NoData'
import { baseUrl, CATEGORIES_LIST, privateAxiosInstance, publicAxiosInstance } from '../../../Services/urls'
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation'
import { useForm } from 'react-hook-form'
import AddModal from '../../Shared/AddModal/AddModal';
import Pagination from '../../Shared/Pagination/Pagination'
const CategoriesList = () => {

const[categoriesList,setcategoriesList]=useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const[loading,setLoading]=useState(true);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const[arrayOfPages,setArrayOfPages]=useState([]);
  const[name,SetName]=useState("");
const{register,formState:{errors,isSubmitting},handleSubmit,setValue,reset}=useForm()

const OnSubmit=async(data)=>{
console.log(data);
try{
  if(categoryToEdit){
    //Edit Category
      const response =await privateAxiosInstance.put(`/Category/${categoryToEdit}`,data);
      toast.success(response.data.message);
    }else{
      //add Category
      const response=await privateAxiosInstance.post('/Category/',data);
      toast.success(response.data.message)
    }
  GetAllCategories();
  setShowAddModal(false);
  reset();

}catch(error){
  toast.error(error.response.data.message)
}
}

//Get Categories
const GetAllCategories=async(pageSize,pageNumber,name)=>{
  try{
    const response=await privateAxiosInstance.get(CATEGORIES_LIST.GET_CATEGORIES,{
      params:{
        pageSize:pageSize,
        pageNumber:pageNumber,
        name:name
      }
    }
    )
    console.log("Categories response",response.data.data);
    setcategoriesList(response.data.data);
    setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,index)=>index+1))
  }
  catch(error){
  toast.error(error.response.data.message)
  }
  finally {
    setLoading(false);
  }
}

//delete Categories
const deleteCategory=async()=>{ 
  if(categoryToDelete){
    try{
      const response=await privateAxiosInstance.delete(CATEGORIES_LIST.DELETE_CATEGORY(categoryToDelete) )
      console.log(response.data);
      GetAllCategories();
      setShowDeleteConfirmation(false);
     toast.success(`Category of id ${categoryToDelete} delete Successfully`);
    
    }
    catch(error){
    toast.error(response.data.error);
    }
  }
  }


useEffect(()=>{
  GetAllCategories(4,1);
},[]);
//pagination
const handlePageChange = (pageNumber) => {
  GetAllCategories(4, pageNumber);
};
const getNameValue=(e)=>{
  const value=(e.target.value);
  SetName(value);
  if(value.trim===""){
    GetAllCategories(4,1,"");

  }else{
    GetAllCategories(4,1,value);

  }
}
  return (
    <div >
      <Header title={'Categories'}span={'Item'} description={'You can now add your items that any user can order it from the Application and you can edit'} img={userHeader}/>
      <div className='d-flex justify-content-between my-5 text-md-start flex-md-row flex-column text-center '>
        <div className='content'>
          <h3>Categories Table Details</h3>
          <p>You can check all details</p>
        </div>
        <div className='button '>
          <button className='base-button px-5' onClick={()=>{setShowAddModal(true);reset();}}>Add New category</button>
        </div>

      </div>
      {/*  Search Bar */}
      <div className="input-group w-auto mb-3 ">
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
      <div className='data-container'>
      <table className="table">
        <thead >
          <tr >
            <th  scope="col" >Id</th>
            <th scope="col">Name</th>
            <th scope="col">Creation Date</th>
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
              categoriesList.length>0?categoriesList.map((category)=>
                <tr key={category.id || index}>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>{category.creationDate}</td>
                <td>
                <div className="dropdown">
                <button className="btn dropdown border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
    
                  <ul className="dropdown-menu   ">
                    <li><button className="dropdown-item" type="button"><i className="fa-solid fa-eye text-success"></i> View Category</button></li>
                    <li><button className="dropdown-item" type="button" onClick={()=>{setShowDeleteConfirmation(true);setCategoryToDelete(category.id);}}> <i className="fa-solid fa-trash text-danger"></i> Delete Category</button></li>
                    <li><button className="dropdown-item" type="button" onClick={()=>{setCategoryToEdit(category.id);setValue('name', category.name);setShowAddModal(true);}}><i className="fa-solid fa-pen-to-square text-warning"  ></i> Edit Category</button></li>
                  </ul>
                </div>
    
                </td>
              </tr>
              ):<tr><td colSpan="4" className='text-center'><NoData /></td></tr>
              } 
     
        </tbody>
    </table>

    
      </div>
       {/* add&&Edit modal */}
       {showAddModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog d-flex justify-content-center align-items-center min-vh-100">
            <div className="modal-content px-3 py-2">
              <div className="modal-header border-0">
                <h5 className="modal-title">{categoryToEdit ? 'Edit Category' : 'Add Category'}</h5>
                <button
                  type="button"
                  className="btn-close-delete"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {setCategoryToEdit(null);setShowAddModal(false);reset()}}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit(OnSubmit)}>
                <div className="modal-body">
                  <input
                    {...register("name", { required: "The name field is required." })}
                    type="text"
                    className="form-control bg-body-tertiary border-0 mt-5 mb-3 px-2 py-2"
                    placeholder="Category Name"
                    aria-label="Category Name"
                    aria-describedby="basic-addon1"
                  />
                  {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <div className="modal-footer">
                  <button type="submit" className="base-button w-25" disabled={isSubmitting}>
                    {categoryToEdit?(isSubmitting ? "Editing..." : "Edit"):(isSubmitting ? "Saving..." : "Save")}
                    {/* {isSubmitting ? "Saving..." : "Save"} */}
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
      )}
      


      {showDeleteConfirmation&&(<DeleteConfirmation
      closeModal={() => setShowDeleteConfirmation(false)}
          onConfirm={deleteCategory}
      />)}

    {/* pagination */}
    <Pagination arrayOfPages={arrayOfPages} onPageChange={handlePageChange}/>
    </div>
    
  )
}

export default CategoriesList

