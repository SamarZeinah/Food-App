import axios from "axios";

export const baseUrl="https://upskilling-egypt.com:3006/api/v1";
export const Photo_baseUrl="https://upskilling-egypt.com:3006";
//public    Dont need Token
export const publicAxiosInstance=axios.create({
    baseURL:baseUrl,
})
//private   need Token after login
export const privateAxiosInstance=axios.create({
    baseURL:baseUrl,
    headers: { Authorization: localStorage.getItem('token') }
})
export const USER_URLS={
    LOGIN:`/Users/Login`,
    REGISTER:`/Users/Create`,
    FORGET_PASSWORD:`/Users/Reset/Request`,
    RESET_PASSWORD:`/Users/Reset`,
    CHANGE_PASSWORD:`/Users/ChangePassword`,
    VERIFY_ACCOUNT:`/Users/verify`,
}

export const RECIPES_LIST={
    GET_RECIPES:`/Recipe/?pageSize=10&pageNumber=1`,
    DELETE_RECIPES:(id)=>`/Recipe/${id}`

}
export const CATEGORIES_LIST={
    GET_CATEGORIES:`/Category/?pageSize=10&pageNumber=1`,
    DELETE_CATEGORY: (id) => `/Category/${id}`,

}