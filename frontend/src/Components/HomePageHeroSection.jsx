// import { Link } from "react-router-dom";
// import { PawPrint } from "lucide-react";

// export default function HomePageHeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
//       {/* Decorative Background Paws */}
//       <div className="absolute inset-0 bg-[url('/paw-pattern.png')] opacity-[0.05] bg-repeat"></div>

//       <div className="relative max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//         {/* Left Content */}
//         <div className="animate-fadeUp">
//           <div className="flex items-center gap-2 mb-4">
//             <div className="bg-orange-100 text-orange-600 p-2 rounded-full shadow-inner">
//               <PawPrint size={20} />
//             </div>
//             <span className="text-sm font-medium text-orange-600 tracking-wide uppercase">
//               Your Pet, Our Priority
//             </span>
//           </div>

//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
//             Premium <span className="text-orange-600">Grooming</span> Packages
//             <br />
//             for Dogs & Cats
//           </h1>

//           <p className="mt-4 text-2xl font-semibold text-orange-600">
//             Because They’re Family Too ❤️
//           </p>

//           <p className="mt-6 text-lg text-gray-600 max-w-lg leading-relaxed">
//             Pamper your furry friend with our curated grooming experiences —
//             gentle care, trusted professionals, and a stress-free booking
//             process. Designed for comfort, love, and hygiene.
//           </p>

//           {/* CTA Buttons */}
//           {/* <div className="mt-10 flex flex-wrap gap-4">
//             <Link
//               to="/groomers"
//               className="px-8 py-3 bg-orange-600 text-white rounded-full font-semibold shadow-md hover:bg-orange-700 hover:shadow-lg transition-all transform hover:-translate-y-[2px]"
//             >
//               Book Now
//             </Link>

//             <Link
//               to="/grooming-packages"
//               className="px-8 py-3 border-2 border-orange-500 text-orange-600 bg-white rounded-full font-semibold hover:bg-orange-50 transition-all"
//             >
//               View Packages
//             </Link>
//           </div> */}
//         </div>

//         {/* Right Illustration */}
//         <div className="relative flex justify-center md:justify-end animate-slideUp">
//           <div className="relative w-[90%] md:w-[80%]">
//             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-100 via-amber-50 to-transparent blur-3xl opacity-70"></div>
//             <img
//               src="/puppy.png"
//               alt="Pet Grooming"
//               className="relative w-full max-w-md mx-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import { PawPrint, Sparkles, Heart } from "lucide-react";

export default function HomePageHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-white to-amber-100">
      {/* Glow Orbs */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6 animate-fadeUp">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-orange-200">
            <PawPrint size={18} className="text-orange-600" />
            <span className="text-sm font-semibold text-orange-700 tracking-wide">
              Trusted • Gentle • Professional
            </span>
          </div>

          {/* Glass Title Card */}
          <div className="p-6 rounded-3xl bg-white/50 backdrop-blur-xl shadow-lg border border-white/40 max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Premium <span className="text-orange-600">Pet Grooming</span>
              <br />
              At Your Home
            </h1>

            <p className="mt-4 text-xl font-medium text-orange-700 flex items-center gap-2">
              <Heart className="text-orange-500" /> Because they deserve the BEST.
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-gray-700 max-w-lg leading-relaxed">
            Our expert groomers provide stress-free, hygienic and loving
            grooming sessions — right at your doorstep. Designed for comfort,
            convenience & pure happiness.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#grooming-category"
              className="px-8 py-3 rounded-full bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:bg-orange-700 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Book Grooming Now
            </a>

            <a
              href= "#grooming-category"
              className="px-8 py-3 rounded-full border-2 border-orange-600 text-orange-600 font-semibold hover:bg-orange-50 transition-all"
            >
              Explore Packages
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE FRAME */}
        <div className="relative flex justify-center md:justify-end animate-slideUp">
          {/* Glow Layer */}
          <div className="absolute inset-0 w-[90%] mx-auto rounded-full bg-gradient-to-br from-orange-200 via-white to-transparent blur-3xl opacity-70"></div>

          {/* Floating Card */}
          <div className="relative p-6 bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30">
            <img
              src="/puppy.png"
              alt="Pet Grooming"
              className="w-full max-w-md drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] animate-floating"
            />

            {/* Floating Icons */}
            <Sparkles className="absolute -top-4 -left-4 text-orange-500 animate-pulse" size={32} />
            <PawPrint className="absolute -bottom-4 right-4 text-orange-400 animate-bounce" size={30} />
          </div>
        </div>
      </div>
    </section>
  );
}
