
import React from 'react'
import Logo from '../../../assets/logo.png'
import Phone from '../../../assets/phone.svg'
import pass from '../../../assets/pass.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { baseUrl, privateAxiosInstance, USER_URLS } from '../../../Services/urls'

const Register = () => {

const {register,formState:{errors},handleSubmit}=useForm()
const navigate=useNavigate();

const OnSubmit=async(data)=>{
  console.log(data);

//success
try{
// const response=await axios.post(`${baseUrl}/Users/Create`,data)
const response=await privateAxiosInstance.post(USER_URLS.REGISTER,data)

console.log(response);
toast.success('register Successfully', {
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
  setTimeout(() => {
    navigate("/verifyaccount");
  }, 2000);

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
   
                <div className='mt-4' >
                  <h3 className="inter-font fw-bold fs-4 lh-base">Register</h3>
                  <p className="inter-font text-secondary fw-normal fs-6 lh-sm">Welcome Back! Please enter your details</p>
                </div>

                <form onSubmit={handleSubmit(OnSubmit)}>
                  <div className='row sm-text-center'>

                  <div className='left-content col-12 col-md-6 d-grid gap-2'>
                    {/* UserName */}
                    <div className="input-group mt-1 mt-md-4">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={Phone} alt="Phone" />
                      </span>
                      <input
                        {...register("userName", {
                          required: "Username is required",
                          pattern: {
                            value: /^(?=.*[A-Za-z])[A-Za-z0-9]*[0-9]$/,
                            message: "Username must contain letters and end with a number without spaces"
                          }
                          
                        })}
                        type="text"
                        className="form-control"
                        placeholder="UserName "
                        aria-label="userName "
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {errors.userName&& <span className="text-danger">{errors.userName.message}</span>}

                    {/* country */}
                    <div className="input-group mt-1 mt-md-4">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={pass} alt="Password" />
                      </span>
                      <input
                        {...register("country", {
                          required: "country  is required",
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Country must contain only letters and spaces",
                          },
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        aria-label="Country"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {errors.country && <span className="text-danger">{errors.country.message}</span>}
                     {/* Password */}
                    <div className="input-group mt-1 mt-md-4">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={pass} alt="Password" />
                      </span>
                      <input
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).{6,}$/,
                            message: "Password must be at least 6 characters and include letters, numbers, and special characters",
                          },
                        })}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}

                  </div>
                    <div className='right-content col-12 col-md-6 d-grid gap-2'>
                      {/* email */}
                <div className="input-group mt-1 mt-md-4">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={Phone} alt="Phone" />
                      </span>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: "Please enter a correct email",
                          },
                        })}
                        type="email"
                        className="form-control"
                        placeholder="Enter your E-mail"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    {/* phone */}
                    <div className="input-group mt-1 mt-md-4">
                    <span className="input-group-text" id="basic-addon1">
                      <img src={Phone} alt="Phone" />
                    </span>
                    <input
                      {...register("phoneNumber", {
                        required: "Phone is required",
                        pattern: {
                          value: /^\(?([0-9]{4})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
                          message: "Please enter a valid phone number in the format (123) 456-7890",                        },
                      })}
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      aria-label="Phone"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}

                     {/* confirmpass */}
                   <div className="input-group mt-1 mt-md-4">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={pass} alt="Password" />
                      </span>
                      <input
                        {...register("confirmPassword", {
                          required: "confirmPassword is required",
                          pattern: {
                            value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).{6,}$/,
                            message: "confirmPassword must match Password ",
                          },
                        })}
                        type="password"
                        className="form-control"
                        placeholder=" Confirm New Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                      />
                  </div>
                  {errors.confirmPassword&&<span className="text-danger ">{errors.confirmPassword.message}</span>}
                    </div>
                  </div>
                  
                <div className='d-flex justify-content-end mt-2 '>
                 <a className='base-color text-decoration-none'  href='/'><p >Login Now?</p></a> 
                </div>
                <button className='base-button '>
                Register
                </button>
                </form>
             
    </>
  )
}

export default Register
