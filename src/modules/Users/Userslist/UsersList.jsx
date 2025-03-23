import React, { useEffect, useState } from 'react';
import userHeader from '../../../assets/userheader.png';
import Header from '../../Shared/Header/Header';
import axios from 'axios';
import NoData from '../../Shared/NoData/NoData';
import Fallback_img from '../../../assets/fallback image.jpg'
import Profile_img from '../../../assets/profile.webp'
import { toast } from 'react-toastify';
import { baseUrl, Photo_baseUrl, privateAxiosInstance, RECIPES_LIST } from '../../../Services/urls';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';
import Pagination from '../../Shared/Pagination/Pagination';
import ViewUser from './ViewUser';

const UsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const[loading,setLoading]=useState(true);
  console.log("usersList",usersList);
  const[arrayOfPages,setArrayOfPages]=useState([]);
  const[nameValue,setNameValue]=useState("");
  const[emailValue,setEmailValue]=useState("");
  const[groupValue,setGroupValue]=useState("");
  const[countryValue,setCountryValue]=useState("");
  const[viewUserId,setViewUserId]=useState("")
  const[showUser,setShowUser]=useState(false);
  console.log("viewUserId",viewUserId);
  // Fetch Users
  const GetUsers = async (pageSize,pageNumber,userName,email,country,groups) => {
    try {
      const response = await privateAxiosInstance.get(`/Users/`, {
        params:{
          pageSize:pageSize,
          pageNumber:pageNumber,
          userName:userName,
          email:email,
          country:country,
          groups:groups

        }
      });
      setUsersList(response.data.data);
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,index)=>index+1))

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch Users');
    }finally{
      setLoading(false);
    }
  };

  // Delete User
  const deleteUser = async () => {
    if (userToDelete) {
      try {
        await privateAxiosInstance.delete(`/Users/${userToDelete}`);
        GetUsers(); // Refresh the list after deletion
        setShowDeleteConfirmation(false); // Close the modal after deletion
        toast.success(`User of id ${userToDelete} delete Successfully`);
        
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to delete User');
      }
    }
  };

  useEffect(() => {
    GetUsers(4,1);
  }, []);

  //pagination
  const handlePageChange = (pageNumber) => {
    GetUsers(4, pageNumber);
  };
  // Filteration
  const handleNameValue=(e)=>{
    // const value=(e.target.value)
    setNameValue(e.target.value)
    GetUsers(4,1,e.target.value,emailValue,countryValue,groupValue) 
  }
  const handleEmailValue=(e)=>{
    // const value=(e.target.value)
    setEmailValue(e.target.value)
    GetUsers(4,1,nameValue,e.target.value,countryValue,groupValue) 
  }
  const handleCountryValue=(e)=>{
    // const value=(e.target.value)
    setCountryValue(e.target.value)
    GetUsers(4,1,nameValue,emailValue,e.target.value,groupValue) 
  }
  const handleGroupValue=(e)=>{
    // const value=(e.target.value)
    setGroupValue(e.target.value)
    GetUsers(4,1,nameValue,emailValue,countryValue,e.target.value) 
  }
 

  return (
    <div>
      <Header title={'Users'}span={'List!'} description={'You can now add your items that any user can order it from the Application and you can edit'} img={userHeader}/>
      <div className='d-flex justify-content-between my-5 text-md-start flex-md-row flex-column text-center '>
        <div className='content'>
          <h3>Users Table Details</h3>
          <p>You can check all details</p>
        </div>
      </div>

      
      <div className='data-container'>
          {/* filteration */}
      <div className="d-flex align-items-center gap-4 me-5 mb-3">
        
        {/*  Search Bar name*/}
        <div className="input-group w-25 ">
          <span className="input-group-text" id="basic-addon1">
          <i className="fa-solid fa-user"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="name" 
            aria-label="name" 
            aria-describedby="basic-addon1"
            onChange={handleNameValue}
          />
        </div>
           {/*  Search Bar Email*/}
           <div className="input-group w-25 ">
          <span className="input-group-text" id="basic-addon1">
          <i className="fa-solid fa-envelope"></i>
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Email" 
            aria-label="Search" 
            aria-describedby="basic-addon1"
            onChange={handleEmailValue}
          />
        </div>
           {/*  Search Bar Group*/}
           <div className="input-group w-25 ">
          <span className="input-group-text" id="basic-addon1">
          <i className="fa-solid fa-users"></i>
          </span>
          <input
            type="number"
            className="form-control"
            placeholder="Group" 
            aria-label="Search" 
            aria-describedby="basic-addon1"
            onChange={handleGroupValue}
          />
        </div>
           {/*  Search Bar Country*/}
           <div className="input-group w-25 ">
          <span className="input-group-text" id="basic-addon1">
          <i className="fa-solid fa-earth-americas"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Country" 
            aria-label="Search" 
            aria-describedby="basic-addon1"
            onChange={handleCountryValue}
          />
        </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
              <th scope="col">Group</th>
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
            usersList.length > 0 ? (
              usersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>
                    {user.imagePath ? (
                      <img
                        className=' rounded-circle recipeImg'
                        src={`${Photo_baseUrl}/${user.imagePath}`}
                        alt='user photo'
                      />
                    ) : (
                      <span><img 
                      className='rounded-circle recipeImg'
                      src={Profile_img}/></span>
                    )}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>{user.group.name}</td>

                  <td>
                    <div className="dropdown">
                      <button className="btn dropdown border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button" onClick={()=>{setViewUserId(user.id);setShowUser(true)}}><i className="fa-solid fa-eye text-success"></i> View User</button></li>

                        <li><button className="dropdown-item" type="button" onClick={() => { setShowDeleteConfirmation(true); setUserToDelete(user.id); }}> 
                          <i className="fa-solid fa-trash text-danger"></i> Delete User </button></li>
                        {/* <li><button className="dropdown-item" type="button"><i className="fa-solid fa-pen-to-square text-warning"></i> Edit User</button></li> */}
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
          onConfirm={deleteUser}
        />
      )}
      {/* pagination */}
  <Pagination arrayOfPages={arrayOfPages} onPageChange={handlePageChange}/>
 {/* view User */}
 {showUser&&<ViewUser 
    // onConfirm={AddToFavourite} 
    closeModal={()=>setShowUser(false)} 
    show={showUser} 
    UserId={viewUserId}   />}
    </div>
  );
};

export default UsersList;
