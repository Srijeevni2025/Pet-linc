
// import { Link } from "react-router-dom";

// export default function GroomerCTA() {
//   return (
//     <section className="relative mt-20 py-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center overflow-hidden">
//       {/* Background Glow */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-white/10 blur-3xl rounded-full opacity-40"></div>
//       </div>

//       <div className="relative z-10 max-w-3xl mx-auto px-6">
//         {/* Heading */}
//         <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
//           Are You a Pet Groomer?
//         </h2>

//         {/* Subtext */}
//         <p className="mt-4 text-orange-100 text-lg leading-relaxed max-w-2xl mx-auto">
//           Join <span className="font-semibold text-white">Petlinc</span> and connect with thousands
//           of pet parents looking for professional and trusted grooming services.
//         </p>

//         {/* CTA Button */}
//         <Link
//           to="/becomepartner"
//           className="mt-8 inline-block bg-white text-orange-600 px-10 py-3 rounded-full font-semibold text-base shadow-md hover:bg-orange-50 hover:scale-[1.02] transition-transform"
//         >
//           Become a Partner
//         </Link>
//       </div>

//       {/* Bottom decorative wave */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
//         <svg
//           className="relative block w-full h-12"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M985.66,83.15c-65.07-20.25-149.3-36.46-244.08-28.5C575.44,67.91,446.25,115.72,307.22,106.13,172.56,96.96,93.85,56.15,0,34.25V120H1200V95.8C1134.72,98.87,1066.56,95.68,985.66,83.15Z"
//             className="fill-white"
//           ></path>
//         </svg>
//       </div>
//     </section>
//   );
// }


import { Link } from "react-router-dom";
import { Scissors, Wallet, Clock } from "lucide-react";

export default function GroomerCTA() {
  return (
    <section className="relative mt-24 py-28 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white text-center overflow-hidden rounded-t-[40px] shadow-inner">
      {/* Soft Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/paw-pattern.png')] opacity-[0.08] bg-repeat"></div>
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
          Calling All Professional Groomers
        </h2>

        <p className="mt-5 text-orange-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Grow your grooming career with{" "}
          <span className="font-bold text-white">Petlinc</span> — get more clients, flexible schedules,
          and a platform built to support your business.
        </p>

        {/* TRUST BADGES */}
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          <div className="bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 flex items-center gap-3">
            <Wallet className="w-6 h-6 text-white" />
            <span className="font-medium">Earn More Per Grooming</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 flex items-center gap-3">
            <Clock className="w-6 h-6 text-white" />
            <span className="font-medium">Flexible Working Hours</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 flex items-center gap-3">
            <Scissors className="w-6 h-6 text-white" />
            <span className="font-medium">Showcase Your Expertise</span>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            to="/becomepartner"
            className="bg-white text-orange-600 px-10 py-3 rounded-full font-semibold text-base shadow-md hover:bg-orange-50 hover:scale-[1.04] transition-all"
          >
            Become a Partner
          </Link>

          <Link
            to="/support"
            className="px-10 py-3 rounded-full border border-white/40 text-white font-medium hover:bg-white/10 transition"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-14"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0L50 6C100 11 200 23 300 36C400 49 500 62 600 58C700 53 800 32 900 26C1000 21 1100 32 1150 38L1200 44V120H0V0Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
}
