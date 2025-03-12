import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/logo.png'
import pass from '../../../assets/pass.svg'
import { useForm } from 'react-hook-form'
import { PASSWORD_VALIDATION } from '../../../Services/validations'
import { CONFIRMPASSWORD_VALIDATION } from '../../../Services/validations'
import axios from 'axios'
import { baseUrl, privateAxiosInstance, USER_URLS } from '../../../Services/urls'
import { toast } from 'react-toastify'

const ChangePassModal = ({ closeModal }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, formState: { errors, isSubmitting }, handleSubmit, watch, trigger } = useForm({ mode: 'onChange' })
  
  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");
  
  useEffect(() => {
    if (confirmNewPassword) {
      trigger('confirmNewPassword')
    }
  }, [newPassword, confirmNewPassword, trigger])
  
  const OnSubmit = async (data) => {
    console.log(data);
    // try {
    //   const response = await axios.put(`${baseUrl}/Users/ChangePassword`, data,
    //     { headers: { Authorization: localStorage.getItem('token') } }
    //   );
    //   toast.success("Password has been updated successfully");
    // }
    try {
      const response = await privateAxiosInstance.put(USER_URLS.CHANGE_PASSWORD, data);
      toast.success("Password has been updated successfully");
    }
    catch (error) {
      toast.error(error.response?.data.error || "An error occurred");
    }
  }

  return (
    <div className="modal show d-flex justify-content-center align-items-center min-vh-100" tabIndex="-1" >
      <div className="modal-dialog">
        <div className="modal-content px-5 py-3">
          <div className='text-center'>
            <img className="w-50" src={Logo} alt='Logo' />
          </div>
          <div className="modal-header border-0">
            <div className='modal-title mt-4'>
              <h3 className="inter-font fw-bold fs-4 lh-base"> Change Your Password</h3>
              <p className="inter-font text-secondary fw-normal fs-6 lh-sm">Enter your details below </p>
            </div>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <form onSubmit={handleSubmit(OnSubmit)}>
            {/* old password */}
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <img src={pass} alt="Password" />
              </span>
              <input
                {...register("oldPassword", PASSWORD_VALIDATION)}
                type={showOldPassword ? "text" : "password"}
                className="form-control"
                placeholder="Old Password"
                aria-label="Old Password"
                aria-describedby="basic-addon1"
              />
              <span
                className='btn btn-outline-secondary border-start-0 border-secondary-subtle'
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                <i className={`fas ${showOldPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
            {errors.oldPassword && <span className='text-danger'>{errors.oldPassword.message}</span>}

            {/* New password */}
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <img src={pass} alt="Password" />
              </span>
              <input
                {...register("newPassword", PASSWORD_VALIDATION)}
                type={showNewPassword ? "text" : "password"}
                className="form-control"
                placeholder="New Password"
                aria-label="New Password"
                aria-describedby="basic-addon1"
              />
              <span
                className='btn btn-outline-secondary border-start-0 border-secondary-subtle'
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <i className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
            {errors.newPassword && <span className='text-danger'>{errors.newPassword.message}</span>}

            {/* Confirm password */}
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <img src={pass} alt="Password" />
              </span>
              <input
                {...register("confirmNewPassword", {
                  ...CONFIRMPASSWORD_VALIDATION,
                  validate: (confirmNewPassword) =>
                    confirmNewPassword === watch("newPassword") || "Passwords do not match"
                })}
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm New Password"
                aria-label="Confirm New Password"
                aria-describedby="basic-addon1"
              />
              <span
                className='btn btn-outline-secondary border-start-0 border-secondary-subtle'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
            {errors.confirmNewPassword && <span className='text-danger'>{errors.confirmNewPassword.message}</span>}

            <div className="modal-footer border-0">
              <button type="submit" className='base-button mt-4 ' disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Change Password"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassModal;
