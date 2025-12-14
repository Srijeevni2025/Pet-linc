import axios from "axios";
const API_URL_BASE = "import.meta.env.VITE_BASE_URL"
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