// import { Link } from "react-router-dom";
// import { PawPrint } from "lucide-react";

// export default function GroomingCategory() {
//   const packages = [
//     {
//       name: "Basic Hygiene - Bath and Groom",
//       desc: [
//         "Bathing",
//         "Conditioning",
//         "Blow Dry",
//         "Combing/Brushing",
//         "Nail Clipping",
//         "Ear Cleaning",
//         "Eyes Cleaning",
//         "Paw Massage",
//       ],
//       price: "₹699",
//       emoji: "🛁",
//     },
//     {
//       name: "Standard - Bath, Hair and Body",
//       desc: [
//         "Bathing",
//         "Conditioning",
//         "Blow Dry",
//         "Combing/Brushing",
//         "Nail Clipping",
//         "Ear Cleaning",
//         "Eyes Cleaning",
//         "Paw Massage",
//         "Teeth Cleaning",
//         "Full Body Trimming",
//         "Sanitary Cleaning",
//         "Body Massage",
//       ],
//       price: "₹1499",
//       emoji: "✂️",
//     },
//     {
//       name: "Premium - Full Service and Treatment",
//       desc: [
//         "Bathing",
//         "Conditioning",
//         "Blow Dry",
//         "Combing/Brushing",
//         "Nail Clipping",
//         "Ear Cleaning",
//         "Eyes Cleaning",
//         "Paw Massage",
//         "Teeth Cleaning",
//         "Full Body Trimming",
//         "Hair Styling",
//         "De-Matting",
//         "Tick Removal",
//         "Anti-Tick Treatment",
//         "Sanitary Cleaning",
//         "Body Massage",
//       ],
//       price: "₹2499",
//       emoji: "💆‍♂️",
//     },
//   ];

//   return (
//     <section
//       id="grooming-packages"
//       className="relative bg-gradient-to-b from-orange-50 via-white to-orange-50 py-20 overflow-hidden"
//     >
//       {/* Background soft glow */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/30 blur-3xl rounded-full -z-10"></div>
//       <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100/30 blur-3xl rounded-full -z-10"></div>

//       <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
//         {/* Header */}
//         <div className="mb-10">
//           <div className="inline-flex items-center justify-center bg-orange-100 w-16 h-16 rounded-full shadow-sm mb-4">
//             <PawPrint className="text-orange-600 w-8 h-8" />
//           </div>
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
//             Petlinc Exclusive Packages 🧴
//           </h2>
//           <p className="mt-3 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
//             Choose from our curated grooming plans designed to pamper your pet —
//             because every tail deserves to shine ✨
//           </p>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
//           {packages.map((pkg, idx) => (
//             <div
//               key={idx}
//               className="relative group bg-white/90 border border-orange-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 backdrop-blur-md flex flex-col"
//             >
//               {/* Floating Emoji Badge */}
//               <div className="absolute -top-6 left-6 bg-orange-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl shadow-lg group-hover:rotate-6 transition-transform">
//                 {pkg.emoji}
//               </div>

//               {/* Content */}
//               <div className="mt-8 text-left flex-grow">
//                 <h3 className="font-extrabold text-lg text-gray-800 mb-3">
//                   {pkg.name}
//                 </h3>
//                 <ul className="space-y-1">
//                   {pkg.desc.map((val) => (
//                     <li
//                       key={val}
//                       className="text-sm text-gray-600 flex items-center"
//                     >
//                       <span className="text-orange-500 mr-2">•</span> {val}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Bottom CTA - Stays aligned */}
//               <div className="mt-auto pt-6 border-t border-orange-100 flex items-center justify-between">
//                 <p className="text-lg font-semibold text-gray-800">
//                   <span className="text-sm font-medium text-gray-500">
//                     Starting at
//                   </span>{" "}
//                   {pkg.price}
//                 </p>
//                 <Link
//                   to="/GroomingCenterBooking"
//                   className="bg-orange-600 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-orange-700 hover:shadow-md transition-transform hover:scale-[1.03]"
//                 >
//                   Book Now
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Decorative Divider */}
//         <div className="mt-16 mx-auto w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
//       </div>
//     </section>
//   );
// }
// import { Link } from "react-router-dom";
// import { PawPrint, CheckCircle2 } from "lucide-react";

// export default function GroomingPackages() {
//   const packages = [
//     {
//       name: "Basic Hygiene",
//       tag: "Most Affordable",
//       desc: [
//         "Bathing & Conditioning",
//         "Blow Dry & Brushing",
//         "Nail Clipping",
//         "Ear & Eye Cleaning",
//         "Paw Massage",
//       ],
//       price: "₹699",
//       color: "from-orange-400/90 to-orange-600/90",
//       emoji: "🛁",
//     },
//     {
//       name: "Standard Grooming",
//       tag: "Best Seller",
//       desc: [
//         "All Basic Hygiene Services",
//         "Teeth Cleaning",
//         "Full Body Trimming",
//         "Sanitary Cleaning",
//         "Body Massage",
//       ],
//       price: "₹1499",
//       color: "from-amber-400/90 to-orange-500/90",
//       emoji: "✂️",
//     },
//     {
//       name: "Premium Spa & Treatment",
//       tag: "Luxury Experience",
//       desc: [
//         "All Standard Services",
//         "Professional Hair Styling",
//         "De-Matting Treatment",
//         "Tick Removal",
//         "Anti-Tick Bath",
//       ],
//       price: "₹2499",
//       color: "from-orange-600/90 to-red-500/90",
//       emoji: "💆‍♂️",
//     },
//   ];

//   return (
//     <section
//       id="grooming-packages"
//       className="relative overflow-hidden py-28 bg-gradient-to-br from-orange-50 via-white to-amber-50"
//     >
//       {/* Soft decorative pattern */}
//       <div className="absolute inset-0 bg-[url('/paw-pattern.png')] opacity-[0.05] bg-repeat"></div>

//       {/* Blurred orbs */}
//       <div className="absolute top-10 left-10 w-80 h-80 bg-orange-300/20 blur-[120px] rounded-full -z-10"></div>
//       <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-amber-200/30 blur-[130px] rounded-full -z-10"></div>

//       <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
//         {/* Section Header */}
//         <div className="mb-16">
//           <div className="inline-flex items-center justify-center bg-orange-100 w-20 h-20 rounded-3xl shadow-inner mb-4">
//             <PawPrint className="w-10 h-10 text-orange-600" />
//           </div>

//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
//             Grooming Packages
//           </h2>

//           <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
//             Industry-grade grooming with premium comfort. Designed to give your pet the love they deserve.
//           </p>
//         </div>

//         {/* Packages Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
//           {packages.map((pkg, idx) => (
//             <div
//               key={idx}
//               className="group relative bg-white/60 backdrop-blur-xl border border-orange-100 rounded-3xl p-10 shadow-lg
//                          hover:shadow-2xl transition-all hover:-translate-y-2 hover:bg-white/80"
//             >
//               {/* Gradient Badge */}
//               <div
//                 className={`absolute -top-6 left-6 bg-gradient-to-r ${pkg.color} text-white w-14 h-14
//                             flex items-center justify-center rounded-2xl text-3xl shadow-lg`}
//               >
//                 {pkg.emoji}
//               </div>

//               {/* Tag */}
//               <div className="absolute right-6 -top-4 bg-orange-600 text-white text-xs tracking-wide px-3 py-1 rounded-full shadow-md">
//                 {pkg.tag}
//               </div>

//               {/* Title */}
//               <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">
//                 {pkg.name}
//               </h3>

//               {/* List */}
//               <ul className="space-y-3 text-left">
//                 {pkg.desc.map((val) => (
//                   <li key={val} className="flex items-start gap-2 text-gray-700">
//                     <CheckCircle2 className="w-5 h-5 text-orange-500 mt-[2px]" />
//                     <span className="text-sm leading-relaxed">{val}</span>
//                   </li>
//                 ))}
//               </ul>

//               {/* Divider */}
//               <div className="my-6 border-t border-orange-100"></div>

//               {/* Price + CTA */}
//               <div className="flex items-center justify-between">
//                 <p className="text-2xl font-bold text-gray-900">{pkg.price}</p>
//                 <Link
//                   to="/GroomingCenterBooking"
//                   className="px-6 py-2 bg-orange-600 text-white rounded-full text-sm font-semibold
//                              shadow-md hover:shadow-lg hover:bg-orange-700 transition-transform hover:scale-[1.07]"
//                 >
//                   Book Now
//                 </Link>
//               </div>

//               {/* Glow Hover Effect */}
//               <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-3xl
//                               bg-gradient-to-br from-orange-200/40 to-transparent blur-2xl"></div>
//             </div>
//           ))}
//         </div>

//         {/* Divider Line */}
//         <div className="mt-20 mx-auto w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
//       </div>
//     </section>
//   );
// }

import { CheckCircle2, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";

import { GlobalContext } from "../Store/Context";
import { useContext } from "react";
import BookingModal from "./BookingModal";
import { GetAllPackages } from "../Features/Packages/queryFunction";
import { useQuery } from "@tanstack/react-query";

export default function GroomingPackagesPage() {
  const {
    showBookingModal,
    setShowBookingModal,
    setSelectedPackage,
    setStepBookingModal,
    selectedPackage,
  } = useContext(GlobalContext);

  const openModal = (pkg) => {
    setSelectedPackage(() => pkg);
    setShowBookingModal(true);
    setStepBookingModal(1);
  };

  const { data: packages, isPending } = useQuery({
    queryKey: ["packages"],
    queryFn: GetAllPackages,
    
  });
  if (isPending) {
    return <h1>loadiinggggggg</h1>;
  }

  // const packages = [
  //   {
  //     name: "Full Makeover Grooming Package",
  //     price: "₹1299",
  //     emoji: "🐶✨",
  //     tag: "Most Popular",
  //     features: [
  //       "Full Bath (PetSafe Shampoo & Conditioner)",
  //       "Full Body Haircut (Zero Cut / Trim / Styling)",
  //       "Hygiene Cut (Underface, Underpaws, Sanitary Area)",
  //       "Ear Clean • Eye Clean",
  //       "Dental Clean / Mouth Spray",
  //       "Paw Cleaning & Butter Massage",
  //       "Nail Clipping",
  //       "Brushing & Blow Dry",
  //       "Finishing Perfume",
  //     ],
  //   },
  //   {
  //     name: "Clean & Cute Grooming Package",
  //     price: "₹899",
  //     emoji: "🛁🐾",
  //     tag: "Best Value",
  //     features: [
  //       "Bath with PetSafe Shampoo & Conditioner",
  //       "Hygiene Cut (Underface, Underpaws, Sanitary Area)",
  //       "Ear Clean • Eye Clean",
  //       "Dental Clean / Mouth Spray",
  //       "Paw Cleaning & Butter Massage",
  //       "Nail Clipping",
  //       "Brushing & Blow Dry",
  //       "Finishing Perfume",
  //     ],
  //   },
  //   {
  //     name: "Spa Bath Grooming Package",
  //     price: "₹799",
  //     emoji: "🧴🧼",
  //     tag: "Relaxing Bath",
  //     features: [
  //       "Bath with PetSafe Shampoo & Conditioner",
  //       "Ear Clean • Eye Clean",
  //       "Dental Clean / Mouth Spray",
  //       "Paw Cleaning & Butter Massage",
  //       "Nail Clipping",
  //       "Brushing & Blow Dry",
  //       "Finishing Perfume",
  //     ],
  //   },
  //   {
  //     name: "Stylish Trim Grooming Package",
  //     price: "₹850",
  //     emoji: "",
  //     tag: "No Bath",
  //     features: [
  //       "Full Body Haircut (Zero Cut / Trim / Styling)",
  //       "Hygiene Cut (Underface, Underpaws, Sanitary Area)",
  //       "Ear Clean • Eye Clean",
  //       "Dental Clean / Mouth Spray",
  //       "Paw Cleaning & Butter Massage",
  //       "Nail Clipping",
  //       "Brushing & Blow Dry",
  //       "Finishing Perfume",
  //     ],
  //   },
  //   {
  //     name: "Hygiene Touch-Up Package",
  //     price: "₹750",
  //     emoji: "🧼🐾",
  //     tag: "Quick Clean",
  //     features: [
  //       "Hygiene Cut (Underface, Underpaws, Sanitary Area)",
  //       "Ear Clean • Eye Clean",
  //       "Dental Clean / Mouth Spray",
  //       "Paw Cleaning & Butter Massage",
  //       "Nail Clipping",
  //       "Brushing & Blow Dry",
  //       "Finishing Perfume",
  //     ],
  //   },
  //   {
  //     name: "The Ultimate Grooming Package",
  //     price: "₹1799",
  //     emoji: "👑🐩",
  //     tag: "Luxury",
  //     features: [
  //       "Full Bath (PetSafe Shampoo & Conditioner)",
  //       "Full Body Haircut (Trim/Styling)",
  //       "Hygiene Cut",
  //       "Body Massage",
  //       "Anti-Tick Treatment",
  //       "Ear Clean • Eye Clean",
  //       "Dental Clean / Mouth Spray",
  //       "Paw Cleaning & Butter Massage",
  //       "Nail Clipping",
  //       "Brushing & Blow Dry",
  //       "Finishing Perfume",
  //     ],
  //   },
  //   {
  //     name: "Dry Bath & Basic Hygiene (Baby Groom)",
  //     price: "₹750",
  //     emoji: "🐶🍼",
  //     tag: "For Puppies",
  //     features: [
  //       "Dry Bath (Foam/Waterless Shampoo)",
  //       "Hygiene Cut",
  //       "Ear Clean • Eye Clean",
  //       "Dental Clean / Mouth Spray",
  //       "Paw Cleaning & Butter Massage",
  //       "Nail Clipping",
  //       "Brushing & Blow Dry",
  //       "Finishing Perfume",
  //     ],
  //   },
  //   {
  //     name: "Dry Spa Baby Groom Package",
  //     price: "₹700",
  //     emoji: "🐾🧼",
  //     tag: "Baby Spa",
  //     features: [
  //       "Dry Bath with Waterless Shampoo",
  //       "Ear Clean • Eye Clean",
  //       "Dental Clean / Mouth Spray",
  //       "Paw Cleaning & Butter Massage",
  //       "Nail Clipping",
  //       "Brushing & Blow Dry",
  //       "Finishing Perfume",
  //     ],
  //   },
  // ];

  const addons = [
    { name: "Anti Tick & Flea (Ridd)", price: "₹250" },
    { name: "Anti Tick & Flea (Spot On)", price: "₹500" },
    { name: "Oil Massage", price: "₹300" },
    { name: "Anal Gland Cleaning", price: "₹300" },
    { name: "De-Shedding", price: "₹400" },
    { name: "De-Matting", price: "₹500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20">
      {/* ---------------- HEADER ---------------- */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center bg-orange-100 w-20 h-20 rounded-3xl shadow-inner mb-4">
          <PawPrint className="w-10 h-10 text-orange-600" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Petlinc Grooming Packages
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Choose the perfect package for your furry friend 🐾
        </p>
      </div>

      

       
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
  {packages.map((pkg) => (
    <div
      key={pkg._id}
      className="flex flex-col h-full bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-orange-200 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
    >
      {/* Top section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl">{pkg.emoji}</span>
          <span className="px-3 py-1 text-xs bg-orange-600 text-white rounded-full shadow">
            {pkg.tag}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-4 text-gray-900">
          {pkg.name}
        </h3>

        {/* Regular Features */}
        <ul className="space-y-3 mb-5">
          {pkg.features.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-orange-500" />
              {item}
            </li>
          ))}
        </ul>

        {/* Free Services Section */}
        {pkg.freeServices?.length > 0 && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
            <h4 className="text-sm font-semibold text-orange-700 mb-3 flex items-center gap-2">
              🎁 Free Services Included
            </h4>

            <ul className="space-y-2">
              {pkg.freeServices.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom section */}
      <div className="mt-auto pt-6 flex items-center justify-between">
        <p className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
          ₹{pkg.price}
        </p>

        <button
          onClick={() => openModal(pkg)}
          className="px-6 py-2 bg-orange-600 text-white rounded-full text-sm font-semibold shadow hover:bg-orange-700 hover:scale-105 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  ))}
</div>


      {/* ---------------- ADD-ONS ---------------- */}
      <div className="max-w-4xl mx-auto mt-24 bg-white/80 backdrop-blur-xl p-10 rounded-3xl border border-orange-200 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Add-On Services
        </h2>

        {addons.map((a, i) => (
          <div
            key={i}
            className="flex justify-between py-3 border-b last:border-none border-orange-200"
          >
            <span className="text-gray-700">{a.name}</span>
            <span className="font-semibold text-gray-900">{a.price}</span>
          </div>
        ))}
      </div>

      {showBookingModal && <BookingModal />}
    </div>
  );
}
