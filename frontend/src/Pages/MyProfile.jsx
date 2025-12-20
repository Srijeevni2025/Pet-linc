

import { useMutation, useQuery } from "@tanstack/react-query";
import { Mail, CalendarCheck, LogOut, ArrowRight, LoaderPinwheel, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { GlobalContext } from "../Store/Context";
import queryClient from "../Store/queryClient";
import { GetLoggedInUser } from "../Features/Authentication/queryFunction";
import MyProfileLoader from "./../Components/MyProfileLoader"
import { GetMyBookings } from "../Features/Booking/queryFunction";
import { Logout } from "./../Features/Authentication/mutationFunction";

/**
 * Simple My Profile Page
 * Clean • Premium • Focused
 */
export default function MyProfile() {
  const navigate = useNavigate();

  // Replace with real data later
  // const user = {
  //   name: "Rajan Chouhan",
  //   email: "rajan@example.com",
  //   totalBookings: 12,
  // };
  const {isLoggedInRef} = useContext(GlobalContext);


  const {data:userData, isPending} = useQuery({
    queryKey:["userData"],
    queryFn:GetLoggedInUser
  })

  const { data:myBookings } = useQuery({
      queryKey: ["myBookings"],
      queryFn: GetMyBookings,
    });
  
  const {mutate} = useMutation({
    mutationFn:Logout,
    onSuccess: async()=>{
      toast.success("Successfully logged out.");
        
       // await queryClient.cancelQueries({queryKey: ["userData"]})
            queryClient.removeQueries({queryKey:['userData'], exact:true})
           //await queryClient.ensureQueryData({queryKey:["packages"], queryFn:GetAllPackages})
            isLoggedInRef.current = false;
          navigate('/', {replace:true})
    }
  })
  function handleLogout() {
    // clear auth token / context here
    mutate();
  }
  if(isPending){
    return <MyProfileLoader/>
  }
  {console.log(myBookings)}
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-orange-100 p-8">
        
        {/* AVATAR */}
        <div className="flex justify-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${userData?.user?.name}&background=FF7A00&color=fff&size=128`}
            alt="avatar"
            className="w-24 h-24 rounded-2xl shadow-md"
          />
        </div>

        {/* NAME */}
        <h1 className="text-2xl font-extrabold text-center text-gray-900">
          {userData?.user?.name}
        </h1>

        {/* EMAIL */}
        <div className="flex items-center justify-center gap-2 text-gray-600 mt-2">
          <Mail size={16} />
          <span className="text-sm">{userData?.user?.email}</span>
        </div>

        {/* STATS CARD */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center">
            <CalendarCheck />
          </div>

          <div>
            <div className="text-sm text-gray-600">Total Bookings</div>
            <div className="text-2xl font-bold text-gray-900">
              {myBookings?.data?.length} 
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/my-bookings")}
            className="
              w-full flex items-center justify-center gap-2
              px-6 py-3 rounded-full
              bg-orange-600 text-white font-semibold
              hover:bg-orange-700 transition
              shadow-md
            "
          >
            View My Bookings
            <ArrowRight size={18} />
          </button>

          <button
            onClick={handleLogout}
            className="
              w-full flex items-center justify-center gap-2
              px-6 py-3 rounded-full
              border border-red-300
              text-red-600 font-semibold
              hover:bg-red-50 transition
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
