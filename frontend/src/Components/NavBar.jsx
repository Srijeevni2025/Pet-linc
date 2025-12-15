// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MapPin, Search, ChevronDown, Menu, X } from "lucide-react";
// import toast from "react-hot-toast";

// // IMPORT IMAGES (correct industry standard)
// import Logo from "/images/Navbar/PetlincLogo.png";
// import { GetLoggedInUser } from "../Features/Authentication/queryFunction";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { Logout } from "../Features/Authentication/mutationFunction";
// import queryClient from "../Store/queryClient";
// import { GetAllPackages } from "../Features/Packages/queryFunction";


// export default function Navbar() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [pincode, setPincode] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navigate = useNavigate();
 

  
//   const menuRef = useRef(null);




//   const {data:userData} = useQuery({
//     queryKey:["userData"],
//     queryFn:GetLoggedInUser,

//   })
 
   

//   // logging out function
//   const { mutate} = useMutation({
//     mutationFn:Logout,
//     onSuccess:async()=>{
//         toast.success("Successfully logged out.");
//        // await queryClient.cancelQueries({queryKey: ["userData"]})
//             queryClient.removeQueries({queryKey:['userData'], exact:true})
//            //await queryClient.ensureQueryData({queryKey:["packages"], queryFn:GetAllPackages})
            
//           navigate('/', {replace:true, })
        
//     }
//   })

//   function handleLogout(){
//     mutate();
    
//   }
//   // CLOSE MENU IF CLICKED OUTSIDE
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">

//           {/* LOGO */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <img src={Logo} alt="Petlinc" className="w-44 object-contain" />
//           </Link>

//           {/* DESKTOP SEARCH */}
//           <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 w-1/2 border border-gray-200 focus-within:ring-2 focus-within:ring-orange-500">
//             <Search className="text-gray-500 mr-2" size={18} />
//             <input
//               type="text"
//               placeholder="Search grooming packages..."
//               className="bg-transparent flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
//             />
//             {/* <select className="ml-3 px-3 py-1 text-sm rounded-full bg-white border border-gray-300 focus:ring-orange-500">
//               <option>Dog</option>
//               <option>Cat</option>
//             </select> */}
//           </div>

//           {/* RIGHT SECTION DESKTOP */}
//           <div className="hidden md:flex items-center gap-6">

//             {/* PINCODE BUTTON */}
//             <button
//               onClick={() => setModalOpen(true)}
//               className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-orange-600 transition"
//             >
//               <MapPin size={16} className="text-orange-600" />
//               {pincode || "Enter Pincode"}
//             </button>

//             {/* AUTH SECTION */}
//             {userData ? (
//               <div className="relative" ref={menuRef}>
//                 <button
//                   onClick={() => setMenuOpen((prev) => !prev)}
//                   className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600"
//                 >
//                   <img
//                     src={userData.avatar}
//                     alt={userData.name}
//                     className="w-8 h-8 rounded-full border border-orange-200"
//                   />
//                   <span>{userData.name}</span>
//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${
//                       menuOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {menuOpen && (
//                   <div className="absolute right-0 mt-3 w-40 bg-white border border-orange-100 rounded-xl shadow-lg py-2 z-50">
//                     <Link to="/MyProfile" className="block px-4 py-2 hover:bg-orange-50">
//                       My Profile
//                     </Link>
//                     <Link to="/my-bookings" className="block px-4 py-2 hover:bg-orange-50">
//                       My Bookings
//                     </Link>
//                     <hr className="my-1 border-orange-100" />
//                     <button
//                       onClick={handleLogout}
                      
//                       className="w-full text-left px-4 py-2 text-red-600 hover:bg-orange-50"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex rounded-full border border-orange-500 overflow-hidden text-sm font-medium">
//                 <Link
//                   to="/signin"
//                   className="px-4 py-2 text-orange-600 hover:bg-orange-50"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             onClick={() => setMobileMenuOpen((prev) => !prev)}
//             className="md:hidden text-orange-600"
//           >
//             {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white border-t border-orange-100 shadow-md animate-slideDown px-5 py-4 space-y-4">
//             {/* Search */}
//             <div className="flex items-center bg-gray-50 rounded-full px-3 py-2 border border-gray-200">
//               <Search className="text-gray-500 mr-2" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="bg-transparent flex-1 outline-none text-sm text-gray-700"
//               />
//             </div>

//             {/* Location */}
//             <button
//               onClick={() => setModalOpen(true)}
//               className="flex items-center gap-2 text-sm text-gray-700"
//             >
//               <MapPin size={16} className="text-orange-600" />
//               {pincode || "Enter Pincode"}
//             </button>

//             {/* Auth */}
//             {userData ? (
//               <>
//                 <Link to="/my-profile" replace className="block text-sm text-gray-700">
//                   My Profile
//                 </Link>
//                 <Link to="/my-bookings" className="block text-sm text-gray-700">
//                   My Bookings
//                 </Link>
//                 <button onClick={handleLogout} className="text-red-600">
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <div className="flex gap-3">
//                 <Link
//                   to="/signin"
//                   className="flex-1 py-2 text-center border border-orange-500 rounded-full text-orange-600 hover:bg-orange-50"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="flex-1 py-2 text-center bg-orange-600 text-white rounded-full hover:bg-orange-700"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* PINCODE MODAL */}
//       {modalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[999]">
//           <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-3">
//               Enter Your Pincode
//             </h2>
//             <input
//               type="text"
//               value={pincode}
//               onChange={(e) => setPincode(e.target.value)}
//               placeholder="e.g. 221002"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
//             />

//             <div className="mt-6 flex justify-end gap-3">
//               <button onClick={() => setModalOpen(false)} className="px-4 py-2">
//                 Cancel
//               </button>
//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Search, ChevronDown, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

import Logo from "/images/Navbar/PetlincLogo.png";
import { GetLoggedInUser } from "../Features/Authentication/queryFunction";
import { Logout } from "../Features/Authentication/mutationFunction";
import queryClient from "../Store/queryClient";

export default function Navbar() {
  const navigate = useNavigate();

  const [pincode, setPincode] = useState("");
  const [pincodeModal, setPincodeModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuRef = useRef(null);

  /* ---------------- USER QUERY ---------------- */
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: GetLoggedInUser,
    retry: true,
    
  });

  /* ---------------- LOGOUT ---------------- */
  const { mutate: logout } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.removeQueries({ queryKey: ["userData"], exact: true });
      navigate("/", { replace: true });
    },
  });
 
  /* ---------------- OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="Petlinc"
              className="w-40 sm:w-44 object-contain hover:opacity-90 transition"
            />
          </Link>

          {/* SEARCH (DESKTOP) */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-[420px] focus-within:ring-2 focus-within:ring-orange-500">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search grooming packages..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* RIGHT DESKTOP */}
          <div className="hidden md:flex items-center gap-6">

            {/* PINCODE */}
            <button
              onClick={() => setPincodeModal(true)}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-orange-600 transition"
            >
              <MapPin size={16} className="text-orange-600" />
              {pincode || "Enter Pincode"}
            </button>

            {/* AUTH */}
            {userData ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((s) => !s)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600"
                >
                  <img
                    src={
                      userData.avatar ||
                      `https://ui-avatars.com/api/?name=${userData?.user?.name}`
                    }
                    className="w-8 h-8 rounded-full border border-orange-200 object-cover"
                  />
                  <span className="max-w-[100px] truncate">
                    {userData?.user?.name}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white border border-orange-100 rounded-xl shadow-xl overflow-hidden animate-fadeIn">
                    <Link
                      to="/my-profile"
                      className="block px-4 py-2 text-sm hover:bg-orange-50"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-bookings"
                      className="block px-4 py-2 text-sm hover:bg-orange-50"
                    >
                      My Bookings
                    </Link>
                    <div className="h-px bg-orange-100 my-1" />
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex rounded-full border border-orange-500 overflow-hidden text-sm font-semibold">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-orange-600 hover:bg-orange-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU ICON */}
          <button
            onClick={() => setMobileMenuOpen((s) => !s)}
            className="md:hidden text-orange-600"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-orange-100 px-5 py-4 space-y-4 shadow-lg animate-slideDown">

            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-2">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                placeholder="Search..."
                className="bg-transparent outline-none text-sm flex-1"
              />
            </div>

            <button
              onClick={() => setPincodeModal(true)}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <MapPin size={16} className="text-orange-600" />
              {pincode || "Enter Pincode"}
            </button>

            {userData ? (
              <>
                <Link to="/my-profile" className="block text-sm">
                  My Profile
                </Link>
                <Link to="/my-bookings" className="block text-sm">
                  My Bookings
                </Link>
                <button onClick={logout} className="text-sm text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/signin"
                  className="flex-1 py-2 text-center border border-orange-500 rounded-full text-orange-600"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 py-2 text-center bg-orange-600 text-white rounded-full"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ================= PINCODE MODAL ================= */}
      {pincodeModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-2xl shadow-2xl w-80 p-6">
            <h2 className="text-lg font-semibold mb-3">Enter Your Pincode</h2>
            <input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="e.g. 221002"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => setPincodeModal(false)}>Cancel</button>
              <button
                onClick={() => setPincodeModal(false)}
                className="px-4 py-2 bg-orange-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
