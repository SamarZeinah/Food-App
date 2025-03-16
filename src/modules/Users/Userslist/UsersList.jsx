import React, { useEffect, useState } from 'react';
import userHeader from '../../../assets/userheader.png';
import Header from '../../Shared/Header/Header';
import axios from 'axios';
import NoData from '../../Shared/NoData/NoData';
import Fallback_img from '../../../assets/fallback image.jpg'
import { toast } from 'react-toastify';
import { baseUrl, Photo_baseUrl, privateAxiosInstance, RECIPES_LIST } from '../../../Services/urls';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';
import Pagination from '../../Shared/Pagination/Pagination';


const UsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const[loading,setLoading]=useState(true);
  console.log("usersList",usersList);
  const[arrayOfPages,setArrayOfPages]=useState([]);
  // Fetch Users
  const GetUsers = async (pageSize,pageNumber) => {
    try {
      const response = await privateAxiosInstance.get(`/Users/`, {
        params:{
          pageSize:pageSize,
          pageNumber:pageNumber
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
        toast.success(`User of id ${recipeToDelete} delete Successfully`);
        
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
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Country</th>
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
                  <th scope="row">{user.id}</th>
                  <td>{user.userName}</td>
                  <td>
                    {user.imagePath ? (
                      <img
                        className='img-fluid recipeImg'
                        src={`${Photo_baseUrl}/${user.imagePath}`}
                        alt='user photo'
                      />
                    ) : (
                      <span><img 
                      className='img-fluid recipeImg'
                      src={Fallback_img}/></span>
                    )}
                  </td>
                  <td>{user.country}</td>
                  <td>
                    <div className="dropdown">
                      <button className="btn dropdown border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button"><i className="fa-solid fa-eye text-success"></i> View User</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => { setShowDeleteConfirmation(true); setUserToDelete(user.id); }}> 
                          <i className="fa-solid fa-trash text-danger"></i> Delete User </button></li>
                        <li><button className="dropdown-item" type="button"><i className="fa-solid fa-pen-to-square text-warning"></i> Edit User</button></li>
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

    </div>
  );
};

export default UsersList;
