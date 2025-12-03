import axios from "axios";

export async function GetMyBookings(){
    const res = await axios({
        method:'get',
        url:`http://localhost:4000/api/v1/bookings/get-all-bookings`,
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return res.data
}