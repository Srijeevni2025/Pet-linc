import axios from "axios"

const API_URL_BASE = import.meta.env.VITE_BASE_URL;

export async function RegisterGroomer(data){
    const res = await axios({
        method:'post',
        url:`${API_URL_BASE}/api/v1/groomers/register-groomer`,
        headers:{
            "Content-Type":'application/json'
        },
        data:{data},
        withCredentials:true
    })

    return res.data;
}