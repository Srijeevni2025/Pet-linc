import { createContext } from "react";
import { useState } from "react";
export const GlobalContext = new createContext();

function ContextProvider({children}){
    

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [stepBookingModal, setStepBookingModal] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('')  //

    return (
        <GlobalContext.Provider value = {{
            showBookingModal,
            setShowBookingModal,
            selectedPackage,
            setSelectedPackage,
            stepBookingModal,
            setStepBookingModal,
            selectedProduct, 
            setSelectedProduct
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default ContextProvider;