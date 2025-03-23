
import React, { useEffect, useState } from 'react';
import { privateAxiosInstance, Photo_baseUrl, baseUrl } from '../../../Services/urls';
import { toast } from 'react-toastify';

const ViewCategory = ({ closeModal, show, CategoryId }) => {
  const [CategoryData, setCategoryData] = useState(null);
  console.log("CategoryData", CategoryData);
  console.log("CategoryId from ViewCategory", CategoryId);

  const viewCategory = async () => {
    try {
      const response = await privateAxiosInstance.get(`${baseUrl}/Category/${CategoryId}`);
      console.log(response.data);
      setCategoryData(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Category");
    }
  };

  useEffect(() => {
    if (CategoryId) {
      viewCategory(); 
    }
  }, [CategoryId]);

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            {CategoryData ? (
              <h3 className="modal-title fw-bold text-dark">Category Data</h3>
            ) : (
              <p>Loading...</p>
            )}
            <button type="button" className="btn-close-delete" aria-label="Close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body text-center my-5">
            {CategoryData ? (
              <>
              <h5>
              <span className="text-muted fw-normal">Name:</span>
                  <span className="fw-bold text-dark">{CategoryData.name}</span>
                </h5>
                <h5>
                  <span className="fw-bold text-dark">{CategoryData.description}</span>
                </h5>
                <h5>
                  <span className="text-muted fw-normal">Creation date:</span>
                  <span className="fw-bold text-dark">
                    {new Date(CategoryData.creationDate).toLocaleString()}
                  </span>
                </h5>
                <h5>
                  <span className="text-muted fw-normal">Modification date:</span>
                  <span className="fw-bold text-dark">
                    {new Date(CategoryData.modificationDate).toLocaleString()}
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

export default ViewCategory;
