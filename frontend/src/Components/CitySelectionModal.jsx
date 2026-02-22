// import { useContext } from "react";
// import { GlobalContext } from "../Store/Context";
// import { useNavigate } from "react-router";


// export default function CityModal() {

//   const SUPPORTED_CITIES = ['mumbai', 'kolkata'];
//   const { setCurrentCity, setCityModalOpen}=useContext(GlobalContext);
//   const navigate = useNavigate();
//   function handleSubmit(city){
//     setCurrentCity(city);
//     setCityModalOpen(false);
//     navigate('/');
//     localStorage.setItem("currentCity",city);
//   }
//   return (
//     <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
//       <h1 className="text-2xl font-semibold mb-6">
//         Select Your City
//       </h1>

//       <div className="space-y-4 w-64">
//         {SUPPORTED_CITIES.map(city => (
//           <button
//             key={city}
//             onClick={() => handleSubmit(city)}
//             className="w-full py-3 border rounded-lg text-lg hover:bg-orange-50"
//           >
//             {city.charAt(0).toUpperCase() + city.slice(1)}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useContext } from "react";
import { GlobalContext } from "../Store/Context";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router";

export default function CityModal() {
  const SUPPORTED_CITIES = ["mumbai", "kolkata"];
  const { setCurrentCity, setCityModalOpen } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleSubmit(city) {
    localStorage.setItem("currentCity", city);
    setCurrentCity(city);
    setCityModalOpen(false);
    navigate("/");
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-white to-orange-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-orange-100 p-6 text-center">

        {/* Icon */}
        <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 mb-4">
          <MapPin className="text-orange-600" size={26} />
        </div>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-gray-800">
          Select Your City
        </h1>

        {/* Sub text */}
        <p className="text-sm text-gray-500 mt-2 mb-6">
          We show services, pricing and availability based on your city
        </p>

        {/* City Buttons */}
        <div className="space-y-3">
          {SUPPORTED_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => handleSubmit(city)}
              className="w-full py-3 rounded-xl border border-gray-200 text-base font-medium text-gray-700
                         hover:border-orange-500 hover:bg-orange-50 transition
                         focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </button>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-400 mt-6">
          You can change your city anytime from the menu
        </p>
      </div>
    </div>
  );
}