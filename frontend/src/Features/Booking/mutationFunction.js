import axios from "axios";
const API_URL_BASE = "http://localhost:4000"
// import.meta.env.VITE_BASE_URL
export async function CreateBooking(formData){
    
    const res = await axios({
        method:'post',
        url:`${API_URL_BASE}/api/v1/bookings/create-new-booking`,
        headers:{
            'Content-Type':'application/json'
        },
        data:formData,
        withCredentials:true
        
    })

    return res.data;
}