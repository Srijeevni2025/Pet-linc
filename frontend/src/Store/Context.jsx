import { createContext, useRef, useEffect } from "react";
import { useState } from "react";
export const GlobalContext =  createContext();

function ContextProvider({children}){
    

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [stepBookingModal, setStepBookingModal] = useState(1);
    const isLoggedInRef = useRef(false);
    const [selectedProduct, setSelectedProduct] = useState('')  //

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
    date: "",
    timeSlot: "",
    addons: [],
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
            setForm
        
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default ContextProvider;