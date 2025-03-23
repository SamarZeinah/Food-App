
import React, { useEffect, useState } from 'react';
import { privateAxiosInstance, Photo_baseUrl, baseUrl } from '../../../Services/urls';
import { toast } from 'react-toastify';

const ViewUser = ({ closeModal, show, UserId }) => {
  const [userData, setUserData] = useState(null);
  console.log("UserData", userData); 
  console.log("UserId from ViewUser", UserId);

  const viewUser = async () => {
    try {
      const response = await privateAxiosInstance.get(`${baseUrl}/Users/${UserId}`);
      console.log(response.data);
      setUserData(response.data); 
    }catch(error){
        toast.error(error.response?.data?.message || "Failed to fetch User");
    }
  };

  useEffect(() => {
    if (UserId) {
      viewUser(); 
    }
  }, [UserId]);

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            {userData ? (
              <h3 className="modal-title fw-bold text-dark">{userData.userName}</h3> 
            ) : (
              <p>Loading...</p>
            )}
            <button type="button" className="btn-close-delete" aria-label="Close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body text-center">
            {userData ? (
              <>
                <img
                  className=" user-image"
                  src={`${Photo_baseUrl}/${userData.imagePath}`} 
                  alt="User Image"
                />
                <h5>
                  <span className="text-muted fw-normal">Email:</span>
                  <span className="fw-bold text-dark">{userData.email}</span> 
                </h5>
                <h5>
                  <span className="text-muted fw-normal">Country:</span>
                  <span className="fw-bold text-dark">{userData.country}</span> 
                </h5>
                <h5>
                  <span className="text-muted fw-normal">Phone:</span>
                  <span className="fw-bold text-dark">{userData.phoneNumber}</span> 
                </h5>
                <h5>
                  <span className="text-muted fw-normal">Group:</span>
                  <span className="fw-bold text-dark">{userData.group?.name}</span> 
                </h5>
                <h5>
                  <span className="text-muted fw-normal">Creation date:</span>
                  <span className="fw-bold text-dark">
                    {new Date(userData.creationDate).toLocaleString()}
                  </span>
                </h5>
                <h5>
                  <span className="text-muted fw-normal"> Modification date:</span>
                  <span className="fw-bold text-dark">
                    {new Date(userData.modificationDate).toLocaleString()}
                  </span> 
                </h5>
              </>
            ) : (
              <p className="text-muted">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
