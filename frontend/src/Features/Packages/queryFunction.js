import axios from 'axios'
const API_URL_BASE =  "http://localhost:4000"
//import.meta.env.VITE_BASE_URL ||
console.log(API_URL_BASE)
export async function GetAllPackages(){
    console.log("Get packages function is called.")
    const res = await axios({
        method:'get',
        url:`${API_URL_BASE}/api/v1/packages/get-all-packages`,
        headers:{
            'Content-Type':'application/json'
        },
        
        
        

    })
    console.log(res.data.data);
    return res.data.data
}

export async function GetAddOns(){
    const res = await axios({
        method:'get',
        url:`${API_URL_BASE}/api/v1/bookings/get-all-addons`,
        headers:{
            'Content-Type':'application/json'
        }
    })
    console.log(res.data)
    return res.data
}