import React, { useState } from 'react'
import Phone from '../../../assets/phone.svg'
import pass from '../../../assets/pass.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {  publicAxiosInstance, USER_URLS } from '../../../Services/urls'
import { EMAIL_VALIDATION } from '../../../Services/validations'
import { PASSWORD_VALIDATION } from '../../../Services/validations'

const Login = ({saveLoginData}) => {

const {register,formState:{errors,isSubmitting},handleSubmit}=useForm()
const navigate=useNavigate();
const[showPassword,setShowPassword]=useState(false);


const OnSubmit=async(data)=>{
  console.log(data);

//success
try{
// const response=await axios.post(`${baseUrl}/Users/Login`,data)
const response=await publicAxiosInstance.post(USER_URLS.LOGIN,data)

console.log(response);
localStorage.setItem('token',response.data.token);
localStorage.setItem("user", JSON.stringify(response.data.user));

  toast.success(response.data.message||"Logged Successfully", {
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
  saveLoginData();
  navigate('/dashboard')

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
console.log(error.response.data.message);
}
}

  return (
    <>
     

                {/* title */}
                <div className="mt-4">
                  <h3 className="inter-font fw-bold fs-4 lh-base">Log In</h3>
                  <p className="inter-font text-secondary fw-normal fs-6 lh-sm">
                    Welcome Back! Please enter your details
                  </p>
                </div>
                {/* form */}
                <form  onSubmit={handleSubmit(OnSubmit)}>
                <div className="input-group mt-4">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={Phone} alt="Phone" />
                      </span>
                      <input
                        {...register("email", EMAIL_VALIDATION
                        )}
                        type="email"
                        className="form-control"
                        placeholder="Enter your E-mail"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}

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


                <div className='d-flex justify-content-between mt-3'>
                <a  className='text-dark text-decoration-none' href='register'><p >Register Now?</p></a>
                 <a className='base-color text-decoration-none'  href='forgetpass'><p >Forgot Password?</p></a> 
                </div>
                <button disabled={isSubmitting} className='base-button '>
                  {isSubmitting?"Loading...":"Login"}
                </button>
                </form>
    </>
  )
}

export default Login
