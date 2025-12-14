export default function MyBookingsLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center
                    bg-gradient-to-b from-orange-50 via-white to-amber-50 
                    backdrop-blur-xl">

      {/* Animated Paw Icon */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="w-28 h-28 rounded-full bg-orange-200/40 blur-xl animate-pulse"></div>

        <div className="absolute text-6xl animate-bounce drop-shadow-md">
          🐶
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
        Fetching Your Bookings…
      </h2>

      {/* Subtext */}
      <p className="text-gray-500 mt-2 text-sm">
        Bringing all your grooming appointments here 🐾
      </p>

      {/* Loading Bar */}
      <div className="mt-10 w-56 h-2 bg-orange-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 
                        rounded-full animate-[loadingBar_1.4s_ease_in_out_infinite]"></div>
      </div>

      {/* Shine animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-full h-20 bg-gradient-to-r 
                        from-transparent via-white/30 to-transparent 
                        animate-[shine_2s_linear_infinite]"></div>
      </div>

      <style>
        {`
        @keyframes loadingBar {
          0%   { width: 0%; }
          50%  { width: 80%; }
          100% { width: 0%; }
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        `}
      </style>
    </div>
  );
}
