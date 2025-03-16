// import React from 'react'

// const VerifyAccount = () => {
//   return (
//     <div>
//       VerifyAccount
//     </div>
//   )
// }

// export default VerifyAccount
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

const VerifyAccount = () => {
  const{register,formState:{errors},handleSubmit}=useForm();
  const navigate=useNavigate()
  const OnSubmit=async(data)=>{
    console.log(data);
    //success
    try{
    //  const response=await axios.put(`${baseUrl}/Users/verify`,data);
    const response=await publicAxiosInstance.put(USER_URLS.VERIFY_ACCOUNT,data);
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
      navigate('/verifyaccount')
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
      {/* <div className='auth-container'>
        <div className='container-fluid bg-overlay'>
          <div className='row vh-100 justify-content-center align-items-center'>
            <div className='ol-8 col-md-5 bg-white rounded'>
              <div className='mx-5 my-5'> */}
                  {/* <div className='text-center' >
                  <img className="w-50 "src={Logo} alt='Logo'/> 
                </div> */}
                <div className='mt-4' >
                  <h3 className='inter-font' style={{ weight:'700',fontSize:'25px', lineHeight:'30.26px'}}>  Verify Account  </h3>
                  <p className='inter-font text-secondary' style={{ weight:'400',fontSize:'16px', lineHeight:'19.36px'}}>Please Enter Your Otp  or Check Your Inbox </p>
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


                <div className="input-group mt-4">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={pass} alt="Password" />
                  </span>
                  <input
                    {...register("code", {
                      required: "OTP is required",
                      pattern: {
                        value: /^[a-zA-Z0-9]{4,}$/,
                        message: "OTP must be at least 4 characters and contain only letters or numbers",
                      },
                    })}
                    type="password"
                    className="form-control"
                    placeholder=" OTP"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.seed&&<span className="text-danger ">{errors.seed.message}</span>}



                <button className='base-button mt-4 '>
                Send
                </button>
                </form>
              {/* </div>
            </div>
          </div>

        </div>

      </div> */}
    </>
  )
}

export default VerifyAccount

