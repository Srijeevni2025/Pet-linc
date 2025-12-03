import axios from 'axios'

export async function GetAllPackages(){
    const res = await axios({
        method:'get',
        url:`http://localhost:4000/api/v1/packages/get-all-packages`,
        headers:{
            'Content-Type':'application/json'
        },
        
        
        

    })
    console.log(res.data.data);
    return res.data.data;
}

export async function GetAddOns(){
    const res = await axios({
        method:'get',
        url:`http://localhost:4000/api/v1/bookings/get-all-addons`,
        headers:{
            'Content-Type':'application/json'
        }
    })
    console.log(res.data)
    return res.data.data
}