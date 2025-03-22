import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Logo from '../../assets/logo.png';
import Phone from '../../assets/phone.svg';
import pass from '../../assets/pass.svg';
import { 
  USER_NAME_VALIDATION, 
  COUNTRY_VALIDATION, 
  EMAIL_VALIDATION, 
  PASSWORD_VALIDATION, 
  PHONE_VALIDATION, 
  CONFIRMPASSWORD_VALIDATION
} from '../../Services/validations';
import { ImageUpload } from '../Shared/ImageUpload/Imageupload';
import { baseUrl, Photo_baseUrl, privateAxiosInstance } from '../../Services/urls';
import { toast } from 'react-toastify';

const Profile = ({getLoginData}) => {
  const loginData=getLoginData();

  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(""); 
  console.log("profileImage",profileImage);
  const { 
    register, 
    formState: { errors, isSubmitting }, 
    handleSubmit,
    setValue
  } = useForm({
    mode: "onChange",
  });

  // Fetch current user data
  
    const GetCurrentUser = async () => {
      try {
        const response = await privateAxiosInstance(`${baseUrl}/Users/currentUser`);
        console.log("response.data", response.data);
        if (response.data) {
          setUserData(response.data);
          setProfileImage(`${Photo_baseUrl}/${response.data.imagePath}` || ""); 
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    useEffect(() => {
        GetCurrentUser();
    }, []);
    

  // Set default values once data is available
  useEffect(() => {
    if (userData) {
      setValue("userName", userData.userName || "");
      setValue("country", userData.country || "");
      setValue("email", userData.email || "");
      setValue("phoneNumber", userData.phoneNumber || "");
    }
  }, [userData, setValue]);

  const [showPassword, setShowPassword] = useState(false);

const onSubmit = async (data) => {
  const formData = new FormData();

  formData.append("userName", data.userName);
  formData.append("country", data.country);
  formData.append("email", data.email);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("confirmPassword", data.confirmPassword);


  if (profileImage) {
    formData.append("profileImage", profileImage); 
  } else {
    formData.append("profileImage", userData.imagePath); 
  }

  console.log('Updated Form Data:', formData);

  try {
    const response = await privateAxiosInstance.put(`${baseUrl}/Users/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success(response.data.message || "User Updated Successfully!");
    await GetCurrentUser();
    } catch (error) {
    console.error("Error Updating user data:", error);
  }
};


  return (
    <>
      <div className="text-center mb-4">
        <ImageUpload defaultImage={profileImage} onChange={setProfileImage} />
        </div>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <div className='row'>
          {/* UserName */}
          <div className="col-md-6">
            <div className="input-group mt-3">
              <span className="input-group-text">
                <img src={Phone} alt="User" />
              </span>
              <input
                {...register("userName", USER_NAME_VALIDATION)}
                type="text"
                className="form-control"
                placeholder="UserName"
              />
            </div>
            {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
          </div>

          {/* Country */}
          <div className="col-md-6">
            <div className="input-group mt-3">
              <span className="input-group-text">
                <img src={pass} alt="Country" />
              </span>
              <input
                {...register("country", COUNTRY_VALIDATION)}
                type="text"
                className="form-control"
                placeholder="Country"
              />
            </div>
            {errors.country && <span className="text-danger">{errors.country.message}</span>}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <div className="input-group mt-3">
              <span className="input-group-text">
                <img src={Phone} alt="Email" />
              </span>
              <input
                {...register("email", EMAIL_VALIDATION)}
                type="email"
                className="form-control"
                placeholder="Enter your E-mail"
              />
            </div>
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>

          {/* Phone */}
          <div className="col-md-6">
            <div className="input-group mt-3">
              <span className="input-group-text">
                <img src={Phone} alt="Phone" />
              </span>
              <input
                {...register("phoneNumber", PHONE_VALIDATION)}
                type="tel"
                className="form-control"
                placeholder="Phone Number"
              />
            </div>
            {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}
          </div>

          {/* Password (Full Width) */}
          <div className="col-12">
            <div className="input-group mt-3">
              <span className="input-group-text">
                <img src={pass} alt="Password" />
              </span>
              <input
                {...register("confirmPassword", CONFIRMPASSWORD_VALIDATION)}
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
              />
              <button 
                type="button" 
                className="btn btn-outline-secondary border-start-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {errors.password && <span className="text-danger">{errors.password.message}</span>}
          </div>

          {/* Submit Button (Centered) */}
          <div className="col-12 text-center mt-4">
            <button type="submit" className="base-button px-4" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>

        </div>
      </form>
    </>
  );
};

export default Profile;



