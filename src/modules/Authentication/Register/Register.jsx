
import React from 'react'
import Logo from '../../../assets/logo.png'
import Phone from '../../../assets/phone.svg'
import pass from '../../../assets/pass.svg'
import { useForm } from 'react-hook-form'
import { useLocation,useNavigate } from 'react-router-dom'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { baseUrl, privateAxiosInstance, publicAxiosInstance, USER_URLS } from '../../../Services/urls'
import { USER_NAME_VALIDATION,COUNTRY_VALIDATION,CONFIRMPASSWORD_VALIDATION,EMAIL_VALIDATION,PASSWORD_VALIDATION ,PHONE_VALIDATION} from '../../../Services/validations'
import { useState ,useEffect} from 'react'
const Register = () => {
  const[showPassword,setShowPassword]=useState(false);
  const[showConfirmPassword,setShowConfirmPassword]=useState(false);
  const {state}=useLocation();
const {register,formState:{errors,isSubmitting},handleSubmit,watch,trigger}=useForm({mode:'onChange'})
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
// const response=await axios.post(`${baseUrl}/Users/Create`,data)
const response=await publicAxiosInstance.post(USER_URLS.REGISTER,data)

console.log(response);
toast.success(response.data.message||'register Successfully');
  setTimeout(() => {
    navigate("/verifyaccount");
  }, 2000);

}
//error
catch(error){
  toast.error(error.response.data.message);
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
                        {...register("userName", USER_NAME_VALIDATION)}
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
                        {...register("country", COUNTRY_VALIDATION)}
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
                        {...register("password", PASSWORD_VALIDATION)}
                        type={showPassword?"text":"password"}
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                      />
                    <span className='btn btn-outline-secondary border-start-0 border-secondary-subtle'
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
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
                        {...register("email", EMAIL_VALIDATION)}
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
                      {...register("phoneNumber", PHONE_VALIDATION)}
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
                        {...register("confirmPassword",{...CONFIRMPASSWORD_VALIDATION,
                          validate: (confirmPassword) => 
                            confirmPassword === watch("password") || "Passwords do not match",
                        }
            
                        )}
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
                    </div>
                  </div>
                  
                <div className='d-flex justify-content-end mt-2 '>
                 <a className='base-color text-decoration-none'  href='/'><p >Login Now?</p></a> 
                </div>
                <button disabled={isSubmitting} className='base-button '>
                {isSubmitting?"Loading...":"Register"}
                </button>
                </form>
             
    </>
  )
}

export default Register
