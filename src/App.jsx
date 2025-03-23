import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/Shared/AuthLayout/AuthLayout'
import Login from './modules/Authentication/Login/Login'
import Register from './modules/Authentication/Register/Register'
import ResetPass from './modules/Authentication/Reset-pass/ResetPass'
import ChangePass from './modules/Authentication/Change-pass/ChangePass'
import ForgetPass from './modules/Authentication/Forget-pass/ForgetPass'
import VerifyAccount from './modules/Authentication/Verify-account/VerifyAccount'
import NotFound from './modules/Shared/Notfound/NotFound'
import MasterLayout from './modules/Shared/MasterLayout/MasterLayout'
import Dashboard from './modules/Dashboard/Dashboard'
import RecipesList from './modules/Recipes/RecipesList/RecipesList'
import RecipesData from './modules/Recipes/RecipesData/RecipesData'
import CategoriesList from './modules/Categories/CategoriesList/CategoriesList'
import CategoriesData from './modules/Categories/CategoriesData/CategoriesData'
import UsersList from './modules/Users/Userslist/UsersList'
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './modules/Shared/ProtectedRoute/ProtectedRoute'
import Favorites from './modules/Favorites/Favorites'
import Profile from './modules/profile/Profile'
function App() {
// const[loginData,setloginData]=useState(null);
const[loginData,setloginData]=useState(()=>{
  let token=localStorage.getItem('token');
  return token?jwtDecode(token):null;
});


const saveLoginData=()=>{
  const encodedToken=localStorage.getItem('token');
  const decodedToken=jwtDecode(encodedToken);
  localStorage.setItem('decodedToken',JSON.stringify(decodedToken));
  // setloginData(decodedToken);
}
const getLoginData=()=>{
  const token=localStorage.getItem('token');
  return token?jwtDecode(token):null;
}
useEffect(()=>{
  if(localStorage.getItem('token')){
    saveLoginData();
  }
},[])

  const routes = createHashRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Login saveLoginData={saveLoginData}/> },
        { path: 'login', element: <Login saveLoginData={saveLoginData}/>  },
        { path: 'register', element: <Register /> },
        { path: 'resetpass', element: <ResetPass /> },
        // { path: 'changepass', element: <ChangePass /> },
        { path: 'forgetpass', element: <ForgetPass /> },
        { path: 'verifyaccount', element: <VerifyAccount /> }
      ]
    },

    {
      path: 'dashboard',
      element: <ProtectedRoute><MasterLayout getLoginData={getLoginData} /></ProtectedRoute>,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Dashboard getLoginData={getLoginData}/> },
        { path: 'recipes', element: <RecipesList /> },
        { path: 'recipedata/new-recipe', element: <RecipesData /> },
        { path: 'recipedata/:recipeId', element: <RecipesData /> },
        { path: 'categories', element: <CategoriesData /> },
        { path: 'category', element: <CategoriesList /> },
        { path: 'favorites', element: <Favorites /> },
        { path: 'users', element: <UsersList /> },
        { path: 'profile', element: <Profile getLoginData={getLoginData}/> },
      ]
    },
  
  ])

  return<>
    <RouterProvider router={routes} />
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
  </>
}

export default App
