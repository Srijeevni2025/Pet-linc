/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";


const API_URL_BASE = import.meta.env.VITE_BASE_URL


export async function Login({email, password}){
    const res = await axios({
        method:'post',
        url:`${API_URL_BASE}/api/v1/users/login`,
        headers:{
            'Content-Type':'application/json'
        },
        data:{
            email,
            password
        },
        withCredentials:true
    });
    
    return res.data;
}

export async function Logout(){
    const res = await axios({
        method:'post',
        url:`${API_URL_BASE}/api/v1/users/logout`,
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return res.data
}
