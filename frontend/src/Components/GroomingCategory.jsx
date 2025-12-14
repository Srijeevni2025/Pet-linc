import { CheckCircle2, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";

import { GlobalContext } from "../Store/Context";
import { useContext } from "react";
import BookingModal from "./BookingModal";
import { GetAllPackages } from "../Features/Packages/queryFunction";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

export default function GroomingPackagesPage() {
  const {
    showBookingModal,
    setShowBookingModal,
    setSelectedPackage,
    setStepBookingModal,
   
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
    return <Loader/>;
  }

  const addons = [
    { name: "Anti Tick & Flea (Ridd)", price: "₹250" },
    { name: "Anti Tick & Flea (Spot On)", price: "₹500" },
    { name: "Oil Massage", price: "₹300" },
    { name: "Anal Gland Cleaning", price: "₹300" },
    { name: "De-Shedding", price: "₹400" },
    { name: "De-Matting", price: "₹500" },
  ];

  return (
    <div id = "grooming-category" className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20">
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
  className="
    relative flex flex-col h-full
    bg-white/60 backdrop-blur-2xl 
    p-8 rounded-3xl border border-white/30 
    shadow-[0_8px_20px_rgba(255,150,80,0.25)]
    hover:shadow-[0_18px_40px_rgba(255,120,40,0.35)]
    transition-all hover:-translate-y-3 hover:scale-[1.02]
    hover:border-orange-300
  "
  style={{
    transformStyle: "preserve-3d",
    perspective: "1200px",
  }}
>
  {/* ANIMATED TOP RIBBON */}
  <div className="absolute -top-3 -right-3">
    <div className="
      px-3 py-1 text-xs font-semibold 
      bg-gradient-to-r from-orange-600 to-amber-500 
      text-white rounded-full shadow-lg animate-pulse
    ">
      ⭐ Best Offer
    </div>
  </div>

  {/* FLOATING SPARKLES */}
  <div className="absolute -top-4 left-2 animate-ping text-orange-400 text-xl">
    ✨
  </div>
  <div className="absolute bottom-4 -right-3 animate-pulse text-amber-500 text-lg">
    ✨
  </div>

  {/* TOP CONTENT */}
  <div className="z-[2]">
    {/* Emoji + Tag */}
    <div className="flex justify-between items-center mb-5">
      <span className="text-5xl drop-shadow">{pkg.emoji}</span>

      <span className="
        px-3 py-1 text-xs 
        bg-gradient-to-r from-orange-500 to-amber-400 
        text-white rounded-full shadow 
      ">
        {pkg.tag || "Premium"}
      </span>
    </div>

    {/* Title */}
    <h3 className="text-2xl font-extrabold mb-4 text-gray-900 tracking-tight">
      {pkg.name}
    </h3>

    {/* Features */}
    <ul className="space-y-3 mb-5">
      {pkg.features.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-gray-700">
          <CheckCircle2 className="w-4 h-4 text-orange-500" />
          {item}
        </li>
      ))}
    </ul>

    {/* Free Services */}
    {pkg.freeServices?.length > 0 && (
      <div className="
        mt-4 p-4 bg-gradient-to-br from-orange-50 to-amber-50 
        border border-orange-200 rounded-2xl shadow-inner
      ">
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

  {/* PRICE + CTA */}
  <div className="mt-auto pt-8 flex items-center justify-between z-[2]">

    {/* PRICE BLOCK */}
    <div className="flex flex-col">

      {/* MRP (Slashed) */}
      {pkg.originalPrice && (
        <span className="
          text-sm text-gray-500 line-through 
          decoration-red-500 decoration-2
        ">
          MRP: ₹{pkg.originalPrice}
        </span>
      )}

      {/* OFFER PRICE */}
      <span className="
        text-4xl font-extrabold 
        bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 
        bg-clip-text text-transparent 
        drop-shadow-[0_4px_10px_rgba(255,150,40,0.45)]
      ">
        ₹{pkg.price}
      </span>

      <span className="
        mt-1 text-xs text-orange-700 font-semibold 
        bg-orange-100 px-2 py-1 rounded-full w-fit shadow-sm
        animate-bounce
      ">
        Limited Time Offer
      </span>
    </div>

    {/* CTA BUTTON */}
    <button
      onClick={() => openModal(pkg)}
      className="
        px-7 py-3 
        rounded-full font-semibold text-sm 
        bg-gradient-to-r from-orange-600 to-amber-500 
        text-white shadow-lg 
        hover:shadow-[0_10px_20px_rgba(255,120,40,0.45)]
        hover:scale-110 transition-all
      "
    >
      Book Now
    </button>
  </div>

  {/* 3D GLOW BORDER */}
  <div className="
    absolute inset-0 rounded-3xl 
    opacity-0 hover:opacity-100 
    transition-all duration-500 
    pointer-events-none 
    bg-gradient-to-r from-orange-400/40 to-amber-400/40 
    blur-2xl
  "></div>
</div>


          // adding the new card
              

          // new card ends here
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
