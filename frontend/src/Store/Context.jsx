import { createContext, useRef, useEffect } from "react";
import { useState } from "react";
export const GlobalContext =  createContext();

function ContextProvider({children}){
    

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [stepBookingModal, setStepBookingModal] = useState(1);
    const isLoggedInRef = useRef(false);
    const [selectedProduct, setSelectedProduct] = useState('')  //
    const [currentCity, setCurrentCity] = useState(localStorage.getItem("currentCity"));
    const [cityModalOpen, setCityModalOpen] = useState(localStorage.getItem("currentCity")!==null?false:true);

      const [form, setForm] = useState({
    productId: "",
    petName: "",
    type: "",
    breed: "",
    age: "",
    weight: "",
    aggression: "",
    notes: "",
    mobile:"",
    address: "",
    pincode:"",
    city:"",
    lat:"",
    lng:"",
    date: "",
    timeSlot: "",
    // addons: [],
    coupan:"",
    coupanId:"",
    discount:"",
    agreedToTerms: false,
  });

   


    return (
        <GlobalContext.Provider value = {{
            showBookingModal,
            setShowBookingModal,
            selectedPackage,
            setSelectedPackage,
            stepBookingModal,
            setStepBookingModal,
            selectedProduct, 
            setSelectedProduct,
            isLoggedInRef,
            form,
            setForm,
            currentCity,
            setCurrentCity,
            cityModalOpen,
            setCityModalOpen
        
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default ContextProvider;