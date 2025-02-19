import React from 'react'
import Logo from '../../../assets/logo.png'
import Phone from '../../../assets/phone.svg'
import pass from '../../../assets/pass.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {

const {register,formState:{errors},handleSubmit}=useForm()
const navigate=useNavigate();

const OnSubmit=async(data)=>{
  console.log(data);

//success
try{
const response=await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data)
console.log(response);
toast.success('Data Sent Successfully', {
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
      <div className='auth-container '>
        <div className='container-fluid bg-overlay '>
         
              <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-10 col-md-8 col-lg-6 bg-white rounded">

              <div className=' mx-5 my-5 ' >
                <div className='text-center' >
                  <img className="w-50 "src={Logo} alt='Logo'/> 
                </div>
                
                <div className="mt-4">
                  <h3 className="inter-font fw-bold fs-4 lh-base">Log In</h3>
                  <p className="inter-font text-secondary fw-normal fs-6 lh-sm">
                    Welcome Back! Please enter your details
                  </p>
                </div>


                <form onSubmit={handleSubmit(OnSubmit)}>
                <div className="input-group mt-4">
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

                    <div className="input-group mt-4">
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


                <div className='d-flex justify-content-between mt-3'>
                <a  className='text-dark text-decoration-none' href='register'><p >Register Now?</p></a>
                 <a className='base-color text-decoration-none'  href='forgetpass'><p >Forgot Password?</p></a> 
                </div>
                <button className='base-button '>
                  Login
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

export default Login
