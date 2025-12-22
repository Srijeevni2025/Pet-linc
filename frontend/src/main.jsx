import React from "react";
import reactDOM from 'react-dom/client'

import App from "./App";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Signin";
import queryClient from "./Store/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import ContextProvider from "./Store/Context";
import BookingSuccess from "./Components/BookingSuccess";
import MyBookings from "./Pages/MyBookings";
import { Toaster } from "react-hot-toast";
import MyProfile from "./Pages/MyProfile";
import Signup from "./Pages/Signup";
import AboutUs from "./Pages/AboutUs";
import Careers from "./Pages/Careers";
import CustomerPolicy from "./Pages/CustomerPolicy";
import FAQs from "./Pages/FAQs";
import SupportPage from "./Pages/Support";
import BecomePartner from "./Components/BecomeGroomerForm";
import AdminDashboard from "./Pages/AdminDashboard";
import BookingDetails from "./Pages/BookingDetails";
import { SpeedInsights } from "@vercel/speed-insights/react"
import ProtectedRoute from "./Components/Protect";





const root = reactDOM.createRoot(document.getElementById('root'));
root.render(//<React.StrictMode>
<ContextProvider>
<QueryClientProvider client = {queryClient}>
<ReactQueryDevtools initialIsOpen = {true}/>

<BrowserRouter>
    <Routes>
        <Route index element = {<App/>}/>
        <Route path = "/signin" element = {<SignIn/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/my-bookings" element = {<MyBookings/>}/>
        <Route path = "/my-profile" element = {<MyProfile/>}/>
        <Route path = "/about" element = {<AboutUs/>}/>
        <Route path = "/careers" element = {<Careers/>}/>
        <Route path = "/customerpolicy" element = {<CustomerPolicy/>}/>
        <Route path = "/faq" element = {<FAQs/>}/>
        <Route path = "/support" element = {<SupportPage/>}/>
        <Route path = "/becomepartner" element = {<BecomePartner/>}/>
        <Route path = "/admin-dashboard" element = {<AdminDashboard/>}/>
        <Route path = "/my-bookings/:id"  element = {<BookingDetails/>}/>
        
    </Routes>
</BrowserRouter>

</QueryClientProvider>
<Toaster position = "top-center" gutter = {12}
      containerStyle = {{margin:"8px"}}
      toastOptions = {{
        success:{
          duration:1000
        },
        error:{
          duration:2000
        },
        style:{
          fontSize:'16px',
          
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor:"white",
          color:"orange"
        }
      }}
    />
</ContextProvider>
    
//</React.StrictMode>
)