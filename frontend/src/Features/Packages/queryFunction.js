import axios from 'axios'


const API_URL_BASE =  import.meta.env.VITE_BASE_URL
//import.meta.env.VITE_BASE_URL ||

export async function GetAllPackages(){
    
    const res = await axios({
        method:'get',
        url:`${API_URL_BASE}/api/v1/packages/get-all-packages/${localStorage.getItem("currentCity")}`,
        headers:{
            'Content-Type':'application/json'
        },
        
        
        

    })
    
    return res.data.data
}

export async function GetAddOns(){
    const res = await axios({
        method:'get',
        url:`${API_URL_BASE}/api/v1/bookings/get-all-addons/${localStorage.getItem("currentCity")}`,
        headers:{
            'Content-Type':'application/json'
        }
    })
    
    return res.data
}