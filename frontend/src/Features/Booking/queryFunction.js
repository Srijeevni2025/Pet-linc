import axios from "axios";
const API_URL_BASE = import.meta.env.VITE_BASE_URL
// import.meta.env.VITE_BASE_URL
export async function GetMyBookings(){
    const res = await axios({
        method:'get',
        url:`${API_URL_BASE}/api/v1/bookings/get-all-bookings`,
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    
    return res.data
}

export async function GetAllBookingsForDashboard(){
    const res = await axios({
        method:'get',
        url:`${API_URL_BASE}/api/v1/bookings/get-all-bookings-for-dashboard`,
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    console.log(res.data.data)
    return res.data.data;
}