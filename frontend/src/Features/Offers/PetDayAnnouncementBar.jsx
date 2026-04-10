// import { useState } from "react";
// import { GetAddOns } from "../Packages/queryFunction";


// export default function PetDayAnnouncementBar() {
//   const [dismissed, setDismissed] = useState(false);
//   const [copied, setCopied] = useState(false);
  

//   const {data:addOns} = useQuery({
//     queryKey:['addOns'],
//     queryFn:GetAddOns
//   })
//   if (dismissed) return null;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(addOns?.[0]?.promoCode || "").catch(() => {});
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="relative w-full z-[60] flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium flex-wrap"
//       style={{
//         background: "linear-gradient(90deg, #ff6b6b 0%, #ff8e53 50%, #ff6b6b 100%)",
//         backgroundSize: "200% 100%",
//         animation: "barShimmer 4s ease infinite",
//       }}>

//       <style>{`
//         @keyframes barShimmer {
//           0%   { background-position: 200% center; }
//           100% { background-position: -200% center; }
//         }
//         @keyframes bounce {
//           0%,100% { transform: translateY(0); }
//           50%     { transform: translateY(-4px); }
//         }
//         .pet-emoji { animation: bounce 1.5s infinite; }
//       `}</style>

//       <span className="pet-emoji">🐶</span>

//       <span className="text-white text-xs sm:text-sm tracking-wide text-center">
//         🎉 Pet Day Special! Flat <span className="font-bold">10% OFF</span> on Grooming
//       </span>

//       <button onClick={handleCopy}
//         className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full px-3 py-1 text-white text-xs font-bold tracking-widest">
//         <span className="font-mono">{PROMO}</span>
//         <span className="text-white/60">{copied ? "✓ Copied" : "Copy"}</span>
//       </button>

//       <span className="pet-emoji">🐾</span>

//       <button onClick={() => setDismissed(true)}
//         className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-lg">
//         ×
//       </button>
//     </div>
//   );
// }