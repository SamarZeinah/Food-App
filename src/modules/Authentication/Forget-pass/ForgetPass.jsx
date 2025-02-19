import React from 'react'
import Logo from '../../../assets/logo.png'
import Phone from '../../../assets/phone.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const ForgetPass = () => {
  const{register,formState:{errors},handleSubmit}=useForm();
  const navigate=useNavigate();
  const OnSubmit=async(data)=>{
    console.log(data);
    //success
    try{
     const response=await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data);
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
      navigate('/resetpass')
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
      <div className='auth-container'>
        <div className='container-fluid bg-overlay'>
            <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6 bg-white rounded">
              <div className='mx-5 my-5'>
                  <div className='text-center' >
                  <img className="w-50 "src={Logo} alt='Logo'/> 
                </div>
                <div className='mt-4' >
                  <h3 className="inter-font fw-bold fs-4 lh-base">Forgot Your Password?</h3>
                  <p className="inter-font text-secondary fw-normal fs-6 lh-sm">No worries! Please enter your email and we will send a password reset link </p>
                </div>
                <form onSubmit={handleSubmit(OnSubmit)} >
                <div className="input-group mt-4">
                    <span className="input-group-text" id="basic-addon1"><img src={Phone} alt="Phone" /></span>
                    <input {...register('email',
                      {
                        required:"Email is required",
                        pattern:{
                          value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                          message:"Please enter a correct email"
                        }
                      }
                    )} type="email" className="form-control" placeholder="Enter Your Email" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {errors.email&&<span className="text-danger ">{errors.email.message}</span>}
                <button className='base-button mt-4 '>
                  Submit
                </button>
                </form>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default ForgetPass
