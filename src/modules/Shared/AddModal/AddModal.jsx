import React from 'react'
import { useForm } from 'react-hook-form'

const AddModal = ({ closeModal, onConfirm }) => {
    const{register,formState:{errors,isSubmitting},handleSubmit}=useForm()
  return (
    <>
        <div className="modal d-flex justify-content-center align-items-center min-vh-100">
          <div className="modal-dialog ">
            <div className="modal-content px-3 py-2">
              <div className="modal-header border-0">
                <h5 className="modal-title">Add Category</h5>
                <button
                  type="button"
                  className="btn-close-delete"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={onConfirm}>
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
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
    </>
  )
}

export default AddModal




