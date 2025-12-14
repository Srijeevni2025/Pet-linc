import axios from "axios";
const API_URL_BASE = "http://localhost:4000"
// import.meta.env.VITE_BASE_URL
export async function GetLoggedInUser(){
    const res = await axios({
        method:'get',
        url:`${API_URL_BASE}/api/v1/users/get-me`,
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
       
        
    })
    console.log(res.data)
    return res.data;
}