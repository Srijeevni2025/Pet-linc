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