// export default function Loader() {
//   return (
//     <div className="w-full flex flex-col items-center justify-center py-20">
//       {/* Shimmer Blob */}
//       <div className="relative">
//         <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-500 animate-pulse blur-sm"></div>
//         <div className="absolute inset-0 w-20 h-20 rounded-3xl bg-orange-100/30 animate-ping"></div>
//       </div>

//       {/* Text */}
//       <p className="mt-5 text-gray-600 text-lg font-medium animate-pulse tracking-wide">
//         Fetching grooming packages…
//       </p>

//       {/* Loading bars */}
//       <div className="mt-6 space-y-2 w-40">
//         <div className="h-2 rounded-full bg-orange-200 animate-pulse"></div>
//         <div className="h-2 rounded-full bg-orange-300 animate-pulse delay-150"></div>
//         <div className="h-2 rounded-full bg-orange-400 animate-pulse delay-300"></div>
//       </div>
//     </div>
//   );
// }


export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center 
                    bg-gradient-to-br from-orange-50 via-white to-amber-50
                    backdrop-blur-xl">

      {/* Glowing Logo Shape */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-3xl 
                        bg-gradient-to-br from-orange-500 to-amber-400
                        animate-pulse blur-md">
        </div>

        {/* Paw or Emoji */}
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          🐾
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="text-2xl font-semibold text-gray-700 tracking-wide animate-pulse">
        Loading Petlinc…
      </h2>

      {/* Animated Bars */}
      <div className="mt-8 w-48 space-y-2">
        <div className="h-2 rounded-full bg-orange-200 animate-[pulse_1.2s_ease_in_out_infinite]"></div>
        <div className="h-2 rounded-full bg-orange-300 animate-[pulse_1.4s_ease_in_out_infinite]"></div>
        <div className="h-2 rounded-full bg-orange-400 animate-[pulse_1.6s_ease_in_out_infinite]"></div>
      </div>

      {/* Shine Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-full h-32 bg-gradient-to-r 
                        from-transparent via-white/40 to-transparent 
                        animate-[shine_2s_linear_infinite]"></div>
      </div>

      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}
