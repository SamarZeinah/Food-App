import React from 'react';
import deleteimg from '../../../assets/nodata.png';

const DeleteConfirmation = ({ closeModal, onConfirm }) => {
  return (
    <div className="modal d-flex justify-content-center align-items-center " tabIndex="-1" >
      <div className="modal-dialog">
        <div className="modal-content align-items-center py-2">
          <img className="w-50" src={deleteimg} alt="Delete" />
          <div className="modal-header border-0">
            <h5 className="modal-title">Delete This Item?</h5>
            <button type="button" className="btn-close-delete" aria-label="Close" onClick={closeModal}>  <i className="fas fa-times"></i></button>
          </div>
          <div className="modal-body">
            <p className="text-secondary text-center border-bottom pb-2 ">
              Are you sure you want to delete this item? If you are sure, just click on "Delete This Item".
            </p>
          </div>
          <div className="modal-footer border-0 ms-auto">
            <button
              type="button"
            className='base-delete-button'
              onClick={onConfirm}
            >
              Delete This Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
