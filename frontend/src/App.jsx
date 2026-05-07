
import { useContext } from "react"
import CitySelectionModal from "./Components/CitySelectionModal"
import Loader from "./Components/Loader"
import { GetCity } from "./Features/User/queryFunction"
import HomePage from "./Pages/HomePage" 
import Packages from "./Pages/Packages"

import { GlobalContext } from "./Store/Context"

export default function App({city}){

  const {cityModalOpen, setCurrentCity} = useContext(GlobalContext);


  if(cityModalOpen && city == ""){
    return <CitySelectionModal/>
  }

  const savedCity = localStorage.getItem("currentCity");
  if(savedCity == "" ){
  localStorage.setItem("currentCity",city);
  }
  if(city != ""){
    setCurrentCity(city);
  }

  return (
      <>

      
 
  

  <HomePage/>
      </>
      
   
    
  )
}