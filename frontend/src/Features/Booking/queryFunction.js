// import axios from "axios";
// const API_URL_BASE = import.meta.env.VITE_BASE_URL
// // import.meta.env.VITE_BASE_URL
// export async function GetMyBookings(){
//     const res = await axios({
//         method:'get',
//         url:`${API_URL_BASE}/api/v1/bookings/get-all-bookings`,
//         headers:{
//             'Content-Type':'application/json'
//         },
//         withCredentials:true
//     })
    
//     return res.data
// }

// export async function GetAllBookingsForDashboard(){
//     const res = await axios({
//         method:'get',
//         url:`${API_URL_BASE}/api/v1/bookings/get-all-bookings-for-dashboard`,
//         headers:{
//             'Content-Type':'application/json'
//         },
//         withCredentials:true
//     })
    
//     return res.data.data;
// }

// export async function CancelBooking(bookingId){
//     const res = await axios({
//         method:'patch',
//         url:`${API_URL_BASE}/api/v1/bookings/cancel-booking/${bookingId}`,
//         headers:{
//             'Content-Type':'application/json'
//         },
//         data:{
//             status:'cancelled by user'
//         },
//         withCredentials:true
//     })
    
//     return res.data;
// }

// export const GetSlotAvailability = async(date, productId) => {
//     const res = await axios({
//         method:'get',
//         url:`${API_URL_BASE}/api/v1/bookings/get-slot-availability?date=${date}&productId=${productId}&city=${localStorage.getItem("currentCity")}`,
//         headers:{
//             'Content-Type':'application/json'
//         },
//         withCredentials:true
//     })
    
//     return res.data;
// }

import axios from "axios";
const API_URL_BASE = import.meta.env.VITE_BASE_URL;

export async function GetMyBookings() {
  const res = await axios({
    method: "get",
    url: `${API_URL_BASE}/api/v1/bookings/get-all-bookings`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data;
}

export async function GetAllBookingsForDashboard() {
  const res = await axios({
    method: "get",
    url: `${API_URL_BASE}/api/v1/bookings/get-all-bookings-for-dashboard`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data.data;
}

export async function CancelBooking(bookingId) {
  const res = await axios({
    method: "patch",
    url: `${API_URL_BASE}/api/v1/bookings/cancel-booking/${bookingId}`,
    headers: { "Content-Type": "application/json" },
    data: { status: "cancelled by user" },
    withCredentials: true,
  });
  return res.data;
}

export const GetSlotAvailability = async (date, productId) => {
  const res = await axios({
    method: "get",
    url: `${API_URL_BASE}/api/v1/bookings/get-slot-availability?date=${date}&productId=${productId}&city=${localStorage.getItem("currentCity")}`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  console.log(res.data);
  return res.data;
};

/**
 * Fetch all packages for the user's current city.
 * Used in BookingModal so each pet can independently pick a package.
 * Hits: GET /api/v1/packages/:city  →  { status, data: Package[] }
 */
export const GetAllPackages = async () => {
  const city = localStorage.getItem("currentCity");
  const res = await axios({
    method: "get",
    url: `${API_URL_BASE}/api/v1/packages/${city}`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data.data; // Package[]
};