// import { useContext } from "react";
// import { GlobalContext } from "../Store/Context";
// import {Navigate, useNavigate} from "react-router-dom";
// import toast from 'react-hot-toast';

// export default function Protect({children}){
//     const navigate = useNavigate();
//     const {isLoggedIn} = useContext(GlobalContext);

//     if(isLoggedIn){
//         return children
//     }
//     toast.error("You are not signed in. Please sign in to continue...");
//     navigate
// }

import { Navigate, useNavigate } from "react-router-dom";


import toast from "react-hot-toast";
import { useContext, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Store/Context";
import { useQuery } from "@tanstack/react-query";
import { GetLoggedInUser } from "../Features/Authentication/queryFunction";
export default function ProtectedRoute({children}){

  
    const navigate = useNavigate();
    //const {data:user, isPending, error, isFetching} = useUser();
    const {isLoggedInRef} = useContext(GlobalContext);
    const user = isLoggedInRef.current;
    const {data:userData, isPending}=useQuery({
        queryKey:["userData"],
        queryFn:GetLoggedInUser
    })
    const location = useLocation(); /// to remember where user came from 
    
    useEffect(()=>{
        
        if( !user ){
            toast.error("You are not signed in. Please sign in to continue...")
       
         navigate("/signin",  {replace: true, state: {from:location.pathname}});
        }
        else if(location.pathname === "/admin-dashboard" && userData?.user?.email !== 'developer.srijeevni@gmail.com'){
            toast.error("You are not authorized.")
            navigate("/", {replace: true})
        }
    }, [user,  navigate, location])

   

    
    return children

}