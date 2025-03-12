import React, { useEffect, useState } from 'react'
import Phone from '../../../assets/phone.svg'
import pass from '../../../assets/pass.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { baseUrl, publicAxiosInstance, USER_URLS } from '../../../Services/urls'
import { CONFIRMPASSWORD_VALIDATION, EMAIL_VALIDATION, OTP_VALIDATION, PASSWORD_VALIDATION } from '../../../Services/validations'

const ResetPass = () => {
  const[showPassword,setShowPassword]=useState(false);
  const[showConfirmPassword,setShowConfirmPassword]=useState(false);
  const {state}=useLocation();
  const{register,formState:{errors,isSubmitting},handleSubmit,watch,trigger}=useForm({defaultValues:{email:state?.email}},{mode:'onChange'});
  const password=watch("password");
  const confirmPassword=watch("confirmPassword");
  useEffect(()=>{
    if(confirmPassword){
      trigger("confirmPassword")
    }
  },[password,confirmPassword,trigger])

  const navigate=useNavigate();

  const OnSubmit=async(data)=>{
    console.log(data);
    //success
    try{
    //  const response=await axios.post(`${baseUrl}/Users/Reset`,data);
    const response=await publicAxiosInstance.post(USER_URLS.RESET_PASSWORD,data);
     toast.success('Password has been updated successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
      navigate('/')
    }
    //error
    catch(error){
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    }

  return (
    <>
      
                {/* title */}
                <div className='mt-4' >
                  <h3 className="inter-font fw-bold fs-4 lh-base"> Reset  Password</h3>
                  <p className="inter-font text-secondary fw-normal fs-6 lh-sm">Please Enter Your Otp  or Check Your Inbox </p>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit(OnSubmit)} >

                <div className="input-group mt-4">
                    <span className="input-group-text" id="basic-addon1"><img src={Phone} alt="Phone" /></span>
                    <input {...register('email',EMAIL_VALIDATION)} type="email" className="form-control" placeholder="Enter Your Email" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {errors.email&&<span className="text-danger ">{errors.email.message}</span>}


                <div className="input-group mt-4">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={pass} alt="Password" />
                  </span>
                  <input
                    {...register("seed", OTP_VALIDATION)}
                    type="text"
                    className="form-control"
                    placeholder=" OTP"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.seed&&<span className="text-danger ">{errors.seed.message}</span>}


                <div className="input-group mt-4">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={pass} alt="Password" />
                  </span>
                  <input
                    {...register("password",PASSWORD_VALIDATION)}            
                    type={showPassword?"text":"password"}
                    className="form-control"
                    placeholder=" New Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                 <span className='btn btn-outline-secondary border-start-0 border-secondary-subtle'
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>

                </div>
                {errors.password&&<span className="text-danger ">{errors.password.message}</span>}


                <div className="input-group mt-4">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={pass} alt="Password" />
                  </span>
                  <input
                    {...register("confirmPassword", {
                      ...CONFIRMPASSWORD_VALIDATION,
                      validate: (confirmPassword) => 
                        confirmPassword === watch("password") || "Passwords do not match",
                    })}

                    type={showConfirmPassword?"text":"password"}
                    className="form-control"
                    placeholder=" Confirm New Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                   <span className='btn btn-outline-secondary border-start-0 border-secondary-subtle'
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
                </div>

                {errors.confirmPassword&&<span className="text-danger ">{errors.confirmPassword.message}</span>}

                <button disabled={isSubmitting} className='base-button mt-4 '>
                {isSubmitting?"Loading...":"Reset Password"}
                </button>
                </form>
              
    </>
  )
}

export default ResetPass

