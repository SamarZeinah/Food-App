import React from 'react'
import Logo from '../../../assets/logo.png'
import Phone from '../../../assets/phone.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { baseUrl, publicAxiosInstance, USER_URLS } from '../../../Services/urls'
import { EMAIL_VALIDATION } from '../../../Services/validations'
const ForgetPass = () => {
  const{register,formState:{errors,isSubmitting},handleSubmit}=useForm();
  const navigate=useNavigate();
  const OnSubmit=async(data)=>{
    console.log(data);
    //success
    try{
    //  const response=await axios.post(`${baseUrl}/Users/Reset/Request`,data);
    const response=await publicAxiosInstance.post(USER_URLS.FORGET_PASSWORD,data);
     toast.success('Your request is being processed, please check your email', {
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
      navigate('/resetpass',{state:{email:data.email}})
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
                  <h3 className="inter-font fw-bold fs-4 lh-base">Forgot Your Password?</h3>
                  <p className="inter-font text-secondary fw-normal fs-6 lh-sm">No worries! Please enter your email and we will send a password reset link </p>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit(OnSubmit)} >
                <div className="input-group mt-4">
                    <span className="input-group-text" id="basic-addon1"><img src={Phone} alt="Phone" /></span>
                    <input {...register('email',EMAIL_VALIDATION)} type="email" className="form-control" placeholder="Enter Your Email" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {errors.email&&<span className="text-danger ">{errors.email.message}</span>}
                <button disabled={isSubmitting} className='base-button mt-4 '>
                  {isSubmitting?"Loading...":"Submit"}
                </button>
                </form>
    </>
  )
}

export default ForgetPass
