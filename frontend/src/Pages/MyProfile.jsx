

// // import { Phone, Mail, MapPin, PawPrint, Calendar, Award, LogOut } from "lucide-react";
// // import { Link } from "react-router-dom";

// // export default function MyProfile() {
// //   const user = {
// //     name: "Rajan",
// //     email: "rajan@example.com",
// //     phone: "+91 9876543210",
// //     pincode: "221002",
// //     pets: [{ name: "Bruno", type: "Dog", breed: "Labrador", age: "2 years" }],
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex">

// //       {/* SIDEBAR */}
// //       <aside className="w-64 bg-white border-r border-gray-200 p-8 hidden md:block">
// //         <div className="flex flex-col items-center">
// //           <img
// //             src={`https://ui-avatars.com/api/?name=${user.name}&background=FF6B00&color=fff`}
// //             className="w-20 h-20 rounded-xl shadow"
// //             alt=""
// //           />
// //           <h2 className="text-lg font-semibold mt-4">{user.name}</h2>
// //         </div>

// //         <nav className="mt-10 space-y-3 text-gray-700 text-[15px]">
// //           <Link className="block px-3 py-2 rounded-lg hover:bg-gray-100">
// //             Dashboard
// //           </Link>
// //           <Link className="block px-3 py-2 rounded-lg hover:bg-gray-100">
// //             My Bookings
// //           </Link>
// //           <Link className="block px-3 py-2 rounded-lg hover:bg-gray-100">
// //             Pets
// //           </Link>
// //           <Link className="block px-3 py-2 rounded-lg hover:bg-gray-100">
// //             Settings
// //           </Link>
// //         </nav>

// //         <button className="flex items-center gap-2 text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 mt-8">
// //           <LogOut size={18} /> Logout
// //         </button>
// //       </aside>

// //       {/* MAIN CONTENT */}
// //       <main className="flex-1 p-10">
        
// //         {/* PROFILE CARD */}
// //         <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
// //           <h3 className="text-xl font-semibold text-gray-900">Profile Overview</h3>

// //           <div className="mt-6 grid sm:grid-cols-2 gap-6">
// //             <p className="flex items-center gap-3 text-gray-700">
// //               <Mail size={20} className="text-orange-600" /> {user.email}
// //             </p>

// //             <p className="flex items-center gap-3 text-gray-700">
// //               <Phone size={20} className="text-orange-600" /> {user.phone}
// //             </p>

// //             <p className="flex items-center gap-3 text-gray-700">
// //               <MapPin size={20} className="text-orange-600" /> {user.pincode}
// //             </p>
// //           </div>
// //         </div>

// //         {/* STATS ROW */}
// //         <div className="grid sm:grid-cols-3 gap-6 mt-10">
// //           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
// //             <Calendar size={35} className="text-orange-500" />
// //             <div>
// //               <div className="text-xl font-bold">12</div>
// //               <div className="text-sm text-gray-600">Bookings</div>
// //             </div>
// //           </div>

// //           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
// //             <PawPrint size={35} className="text-orange-500" />
// //             <div>
// //               <div className="text-xl font-bold">{user.pets.length}</div>
// //               <div className="text-sm text-gray-600">Pets Added</div>
// //             </div>
// //           </div>

// //           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
// //             <Award size={35} className="text-orange-500" />
// //             <div>
// //               <div className="text-xl font-bold">Gold</div>
// //               <div className="text-sm text-gray-600">Loyalty Tier</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* PETS LIST */}
// //         <div className="mt-12">
// //           <h3 className="text-xl font-semibold text-gray-900">Your Pets</h3>

// //           <div className="grid sm:grid-cols-2 gap-6 mt-6">
// //             {user.pets.map((pet, i) => (
// //               <div
// //                 key={i}
// //                 className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition"
// //               >
// //                 <p className="text-lg font-semibold flex items-center gap-2 text-gray-900">
// //                   <PawPrint size={18} className="text-orange-600" /> {pet.name}
// //                 </p>

// //                 <div className="mt-3 space-y-1 text-sm text-gray-700">
// //                   <p><strong>Type:</strong> {pet.type}</p>
// //                   <p><strong>Breed:</strong> {pet.breed}</p>
// //                   <p><strong>Age:</strong> {pet.age}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //       </main>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import {
//   Phone,
//   Mail,
//   MapPin,
//   PawPrint,
//   Calendar,
//   Award,
//   LogOut,
//   Edit2,
//   Menu,
//   UploadCloud,
//   X,
// } from "lucide-react";

// /* ---------- Fake API (Replace with Axios later) ---------- */

// const simulateFetch = () =>
//   new Promise((resolve) =>
//     setTimeout(
//       () =>
//         resolve({
//           user: {
//             name: "Rajan",
//             email: "rajan@example.com",
//             phone: "+91 9876543210",
//             pincode: "221002",
//             avatarUrl: `https://ui-avatars.com/api/?name=Rajan&background=FF6B00&color=fff`,
//             pets: [{ name: "Bruno", type: "Dog", breed: "Labrador", age: "2 years" }],
//           },
//           stats: { bookings: 12, pets: 1, tier: "Gold" },
//         }),
//       400
//     )
//   );

// const simulateUpload = (file) =>
//   new Promise((res) =>
//     setTimeout(
//       () => res({ ok: true, url: URL.createObjectURL(file) }),
//       700
//     )
//   );

// /* ---------- COMPONENT ---------- */

// export default function MyProfile() {
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [user, setUser] = useState(null);
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     simulateFetch().then((res) => {
//       setUser(res.user);
//       setStats(res.stats);
//       setLoading(false);
//     });
//   }, []);

//   const handleAvatarUpload = async (files) => {
//     const file = files[0];
//     const res = await simulateUpload(file);
//     if (res.ok) setUser((u) => ({ ...u, avatarUrl: res.url }));
//   };

//   if (loading)
//     return <div className="p-10 text-center text-gray-600">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* -------- TOP MOBILE NAV -------- */}
//       <div className="md:hidden bg-white px-5 py-3 border-b border-gray-200 flex items-center justify-between shadow-sm">
//         <div className="text-lg font-semibold">My Profile</div>
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="p-2 rounded-md border border-gray-300"
//         >
//           <Menu size={20} />
//         </button>
//       </div>

//       {/* -------- MOBILE SIDEBAR OVERLAY -------- */}
//       {sidebarOpen && (
//         <div
//           className="md:hidden fixed inset-0 bg-black/40 z-40"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* -------- MOBILE SLIDE-IN SIDEBAR -------- */}
//       <div
//         className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 z-50 transform transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-5 flex items-center justify-between border-b">
//           <h2 className="text-lg font-semibold">Menu</h2>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="p-2 rounded-md hover:bg-gray-100"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="p-4 flex flex-col gap-3">
//           <Link className="py-2 px-3 rounded-md hover:bg-gray-100">Dashboard</Link>
//           <Link className="py-2 px-3 rounded-md hover:bg-gray-100">My Bookings</Link>
//           <Link className="py-2 px-3 rounded-md hover:bg-gray-100">Pets</Link>
//           <Link className="py-2 px-3 rounded-md hover:bg-gray-100">Settings</Link>

//           <button className="py-2 px-3 rounded-md text-red-600 hover:bg-red-100 flex gap-2 items-center mt-4">
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>

//       {/* -------- MAIN CONTENT LAYOUT -------- */}
//       <div className="max-w-7xl mx-auto p-4 md:p-6 flex gap-6">

//         {/* -------- DESKTOP SIDEBAR -------- */}
//         <aside className="hidden md:block w-72 shrink-0">
//           <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

//             {/* AVATAR TOP */}
//             <div className="flex items-center gap-4">
//               <img
//                 src={user.avatarUrl}
//                 className="w-16 h-16 rounded-xl object-cover"
//               />
//               <div>
//                 <div className="text-lg font-semibold">{user.name}</div>
//                 <div className="text-xs text-gray-500">Member since 2023</div>
//               </div>
//             </div>

//             {/* SIDEBAR LINKS */}
//             <div className="mt-6 space-y-2">
//               <label
//                 htmlFor="sidebar-avatar"
//                 className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 flex items-center gap-2"
//               >
//                 <UploadCloud size={14} /> Change Avatar
//               </label>
//               <input
//                 id="sidebar-avatar"
//                 type="file"
//                 className="hidden"
//                 onChange={(e) => handleAvatarUpload(e.target.files)}
//               />

//               <Link className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100">
//                 My Bookings
//               </Link>

//               <button className="w-full px-3 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50 flex items-center gap-2">
//                 <LogOut size={14} /> Logout
//               </button>
//             </div>

//           </div>
//         </aside>

//         {/* -------- MAIN CONTENT -------- */}
//         <main className="flex-1 space-y-6">

//           {/* PROFILE OVERVIEW */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
//             <div className="flex flex-col sm:flex-row gap-6">

//               {/* AVATAR */}
//               <div className="relative mx-auto sm:mx-0">
//                 <img
//                   src={user.avatarUrl}
//                   className="w-28 h-28 rounded-xl object-cover"
//                 />

//                 <label
//                   htmlFor="top-avatar"
//                   className="absolute right-1 bottom-1 bg-white border border-gray-200 p-1 rounded-md shadow cursor-pointer"
//                 >
//                   <UploadCloud size={18} />
//                 </label>

//                 <input
//                   id="top-avatar"
//                   type="file"
//                   className="hidden"
//                   onChange={(e) => handleAvatarUpload(e.target.files)}
//                 />
//               </div>

//               {/* INFO */}
//               <div className="flex-1 space-y-4">
//                 <div className="flex flex-col sm:flex-row justify-between gap-3">
//                   <div>
//                     <h1 className="text-xl sm:text-2xl font-semibold">{user.name}</h1>
//                     <p className="text-sm text-gray-500">{user.email}</p>
//                   </div>

//                   <div className="flex gap-3">
//                     <button className="px-4 py-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700">
//                       Edit
//                     </button>
//                     <button className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-100">
//                       Logout
//                     </button>
//                   </div>
//                 </div>

//                 {/* DETAILS ROW */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
//                   <div className="flex items-center gap-3">
//                     <Mail className="text-orange-600" /> {user.email}
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Phone className="text-orange-600" /> {user.phone}
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <MapPin className="text-orange-600" /> {user.pincode}
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* -------- STATS ROW -------- */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <StatCard icon={<Calendar />} label="Bookings" value={stats.bookings} />
//             <StatCard icon={<PawPrint />} label="Pets" value={stats.pets} />
//             <StatCard icon={<Award />} label="Tier" value={stats.tier} />
//           </div>

//           {/* -------- PETS LIST -------- */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Your Pets</h2>
//               <button className="px-3 py-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700">
//                 Add Pet
//               </button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
//               {user.pets.map((pet, i) => (
//                 <div
//                   key={i}
//                   className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition"
//                 >
//                   <div className="flex justify-between">
//                     <div>
//                       <div className="flex items-center gap-2 font-medium text-gray-900">
//                         <PawPrint className="text-orange-600" />
//                         {pet.name}
//                       </div>
//                       <div className="mt-2 text-sm text-gray-600">
//                         <p><strong>Type:</strong> {pet.type}</p>
//                         <p><strong>Breed:</strong> {pet.breed}</p>
//                         <p><strong>Age:</strong> {pet.age}</p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <button className="px-2 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
//                         Edit
//                       </button>
//                       <button className="px-2 py-1 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50">
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// /* ------- Small reusable components -------- */

// function StatCard({ icon, label, value }) {
//   return (
//     <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
//       <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
//         {icon}
//       </div>
//       <div>
//         <div className="text-sm text-gray-500">{label}</div>
//         <div className="text-lg font-semibold">{value}</div>
//       </div>
//     </div>
//   );
// }


import { Mail, CalendarCheck, LogOut, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Simple My Profile Page
 * Clean • Premium • Focused
 */
export default function MyProfile() {
  const navigate = useNavigate();

  // Replace with real data later
  const user = {
    name: "Rajan Chouhan",
    email: "rajan@example.com",
    totalBookings: 12,
  };

  function handleLogout() {
    // clear auth token / context here
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-orange-100 p-8">
        
        {/* AVATAR */}
        <div className="flex justify-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=FF7A00&color=fff&size=128`}
            alt="avatar"
            className="w-24 h-24 rounded-2xl shadow-md"
          />
        </div>

        {/* NAME */}
        <h1 className="text-2xl font-extrabold text-center text-gray-900">
          {user.name}
        </h1>

        {/* EMAIL */}
        <div className="flex items-center justify-center gap-2 text-gray-600 mt-2">
          <Mail size={16} />
          <span className="text-sm">{user.email}</span>
        </div>

        {/* STATS CARD */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center">
            <CalendarCheck />
          </div>

          <div>
            <div className="text-sm text-gray-600">Total Bookings</div>
            <div className="text-2xl font-bold text-gray-900">
              {user.totalBookings}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/my-bookings")}
            className="
              w-full flex items-center justify-center gap-2
              px-6 py-3 rounded-full
              bg-orange-600 text-white font-semibold
              hover:bg-orange-700 transition
              shadow-md
            "
          >
            View My Bookings
            <ArrowRight size={18} />
          </button>

          <button
            onClick={handleLogout}
            className="
              w-full flex items-center justify-center gap-2
              px-6 py-3 rounded-full
              border border-red-300
              text-red-600 font-semibold
              hover:bg-red-50 transition
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
