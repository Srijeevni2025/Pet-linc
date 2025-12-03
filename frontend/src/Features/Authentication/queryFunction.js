import axios from "axios";


export async function GetLoggedInUser(){
    const res = await axios({
        method:'get',
        url:`http://localhost:4000/api/v1/users/get-me`,
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
       
        
    })
    console.log(res.data)
    return res.data;
}