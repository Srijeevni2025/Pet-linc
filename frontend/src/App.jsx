
import { useContext } from "react"
import CitySelectionModal from "./Components/CitySelectionModal"
import Loader from "./Components/Loader"
import { GetCity } from "./Features/User/queryFunction"
import HomePage from "./Pages/HomePage" 
import Packages from "./Pages/Packages"

import { GlobalContext } from "./Store/Context"

export default function App(){

  const {cityModalOpen} = useContext(GlobalContext);
  if(cityModalOpen){
    return <CitySelectionModal/>
  }
  return (
      <>

      
 
  

  <HomePage/>
      </>
      
   
    
  )
}