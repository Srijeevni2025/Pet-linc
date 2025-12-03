import axios from "axios";


export async function CreateBooking(formData){
    
    const res = await axios({
        method:'post',
        url:`http://localhost:4000/api/v1/bookings/create-new-booking`,
        headers:{
            'Content-Type':'application/json'
        },
        data:formData,
        withCredentials:true
        
    })

    return res.data;
}