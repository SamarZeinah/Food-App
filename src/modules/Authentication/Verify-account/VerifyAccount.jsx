import React from 'react'
import Logo from '../../../assets/logo.png'
import Phone from '../../../assets/phone.svg'
import pass from '../../../assets/pass.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { baseUrl, publicAxiosInstance, USER_URLS } from '../../../Services/urls'
import { OTP_VALIDATION ,EMAIL_VALIDATION} from '../../../Services/validations'
const VerifyAccount = () => {
  const{register,formState:{errors,isSubmitting},handleSubmit}=useForm();
  const navigate=useNavigate()
  const OnSubmit=async(data)=>{
    console.log(data);
    //success
    try{
    //  const response=await axios.put(`${baseUrl}/Users/verify`,data);
    const response=await publicAxiosInstance.put(USER_URLS.VERIFY_ACCOUNT,data);
     toast.success(response.data.message||'Password has been updated successfully');
      setTimeout(() => {
        navigate('/login');
      }, 4000);    }
    //error
    catch(error){
      toast.error(error.response.data.message);
    }
    }
  return (
    <>
                <div className='mt-4' >
                  <h3 className='inter-font' style={{ weight:'700',fontSize:'25px', lineHeight:'30.26px'}}>  Verify Account  </h3>
                  <p className='inter-font text-secondary' style={{ weight:'400',fontSize:'16px', lineHeight:'19.36px'}}>Please Enter Your Otp  or Check Your Inbox </p>
                </div>
                <form onSubmit={handleSubmit(OnSubmit)} >
                  {/* Email */}
                <div className="input-group mt-4">
                    <span className="input-group-text" id="basic-addon1"><img src={Phone} alt="Phone" /></span>
                    <input {...register('email',EMAIL_VALIDATION)} 
                    type="email" className="form-control" placeholder="Enter Your Email" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {errors.email&&<span className="text-danger ">{errors.email.message}</span>}

                  {/* OTP */}
                <div className="input-group mt-4">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={pass} alt="Password" />
                  </span>
                  <input
                    {...register("code", OTP_VALIDATION)}
                    type="text"
                    className="form-control"
                    placeholder=" OTP"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.seed&&<span className="text-danger ">{errors.seed.message}</span>}
                

                <button disabled={isSubmitting} className='base-button mt-4 '>
                {isSubmitting?"Loading...":"Send"}
                </button>
                </form>
            
    </>
  )
}

export default VerifyAccount

