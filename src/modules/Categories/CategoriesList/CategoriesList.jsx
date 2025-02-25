import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import userHeader from '../../../assets/userheader.png'
import axios from 'axios'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NoData from '../../Shared/NoData/NoData'
import { baseUrl } from '../../../Services/urls'

const CategoriesList = () => {

const[categoriesList,setcategoriesList]=useState([]);
//Get Categories
const GetAllCategories=async()=>{
  try{
    const response=await axios.get(`${baseUrl}/Category/?pageSize=10&pageNumber=1`,
      { headers: { Authorization: localStorage.getItem('token') } }
    )
    console.log("Categories response",response.data.data);
    setcategoriesList(response.data.data);
  }
  catch(error){
  toast.error(error.response.data.message)
  }
}

//delete Categories
const deleteCategory=async(id)=>{ 
  // alert(id);
try{
  const response=await axios.delete(`${baseUrl}/Category/${id}`,
   { headers:{Authorization:localStorage.getItem('token')}}
  )
  console.log(response.data);
  GetAllCategories();
  // setcategoriesList(response.data);
  toast.success(`Category of id ${id} delete Successfully`);

}
catch(error){
toast.error(response.data.error);
}
}


useEffect(()=>{
  GetAllCategories();
},[]);

  return (
    <div >
      <Header title={'Categories'}span={'Item'} description={'You can now add your items that any user can order it from the Application and you can edit'} img={userHeader}/>
      <div className='d-flex justify-content-between my-5 '>
        <div className='content'>
          <h3>Categories Table Details</h3>
          <p>You can check all details</p>
        </div>
        <div className='button '>
          <button className='base-button'>Add New category</button>
        </div>

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
          
          {categoriesList.length>0?categoriesList.map((category)=>
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
                <li><button className="dropdown-item" type="button"><i className="fa-solid fa-eye text-success"></i></button></li>
                <li><button className="dropdown-item" type="button" onClick={()=>deleteCategory(category.id)}> <i className="fa-solid fa-trash text-danger"></i> </button></li>
                <li><button className="dropdown-item" type="button"><i className="fa-solid fa-pen-to-square text-warning"  ></i></button></li>
              </ul>
            </div>

            </td>
          </tr>
          ):<tr><td colSpan="4" className='text-center'><NoData /></td></tr>}
        </tbody>
    </table>
      </div>
    </div>
  )
}

export default CategoriesList
