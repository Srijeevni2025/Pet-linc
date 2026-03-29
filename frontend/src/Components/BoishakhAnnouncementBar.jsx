// // BoishakhAnnouncementBar.jsx
// // Drop this ABOVE <Navbar /> in HomePage.jsx
// // Remove after April 20, 2025

// import { useState } from "react";

// const PROMO_CODE = "NABOBARSHO";

// export default function BoishakhAnnouncementBar() {
//   const [dismissed, setDismissed] = useState(false);
//   const [copied, setCopied] = useState(false);

//   if (dismissed) return null;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(PROMO_CODE).catch(() => {});
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div
//       className="relative w-full z-[60] flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium"
//       style={{
//         background: "linear-gradient(90deg, #7B1113 0%, #C0392B 40%, #E67E22 75%, #C0392B 100%)",
//         backgroundSize: "200% 100%",
//         animation: "shimmer 4s ease infinite",
//       }}
//     >
//       <style>{`
//         @keyframes shimmer {
//           0%   { background-position: 200% center; }
//           100% { background-position: -200% center; }
//         }
//         @keyframes sway {
//           0%, 100% { transform: rotate(-8deg); }
//           50%       { transform: rotate(8deg); }
//         }
//         .sway { display: inline-block; animation: sway 2s ease-in-out infinite; }
//       `}</style>

//       {/* Left flowers */}
//       <span className="sway text-base select-none hidden sm:inline" aria-hidden>🌸</span>

//       {/* Message */}
//       <span className="text-white/90 tracking-wide text-xs sm:text-sm">
//         🎉 <span className="font-bold text-amber-300">শুভ নববর্ষ!</span>{" "}
//         Up to <span className="font-bold text-white">25% off</span> on grooming & boarding — Poila Boishakh special
//       </span>

//       {/* Promo chip */}
//       <button
//         onClick={handleCopy}
//         className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full px-3 py-1 text-white text-xs font-bold tracking-widest transition-all cursor-pointer"
//       >
//         <span className="font-mono">{PROMO_CODE}</span>
//         <span className="text-white/60 font-normal">
//           {copied ? "✓ Copied" : "Copy"}
//         </span>
//       </button>

//       {/* Right flowers */}
//       <span className="sway text-base select-none hidden sm:inline" aria-hidden style={{ animationDelay: "0.5s" }}>🌺</span>

//       {/* Dismiss */}
//       <button
//         onClick={() => setDismissed(true)}
//         aria-label="Dismiss"
//         className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-lg leading-none transition-colors"
//       >
//         ×
//       </button>
//     </div>
//   );
// }

// BoishakhAnnouncementBar.jsx
// Remove after April 20, 2025

import { useState } from "react";

const PROMO = "NABOBARSHO15";

export default function BoishakhAnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (dismissed) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMO).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full z-[60] flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium flex-wrap"
      style={{
        background: "linear-gradient(90deg, #7B1113 0%, #C0392B 40%, #E67E22 75%, #C0392B 100%)",
        backgroundSize: "200% 100%",
        animation: "barShimmer 4s ease infinite",
      }}>
      <style>{`
        @keyframes barShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes sway {
          0%,100% { transform: rotate(-8deg); }
          50%      { transform: rotate(8deg); }
        }
        .bar-sway { display:inline-block; animation: sway 2s ease-in-out infinite; }
      `}</style>

      <span className="bar-sway text-base select-none hidden sm:inline" aria-hidden>🌸</span>

      <span className="text-white/90 text-xs sm:text-sm tracking-wide text-center">
        🎉 <span className="font-bold text-amber-300">শুভ নববর্ষ!</span>{" "}
        Flat <span className="font-bold text-white">15% off</span> on all grooming packages · Poila Boishakh special
      </span>

      <button onClick={handleCopy}
        className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full px-3 py-1 text-white text-xs font-bold tracking-widest transition-all cursor-pointer">
        <span className="font-mono">{PROMO}</span>
        <span className="text-white/60 font-normal">{copied ? "✓ Copied" : "Copy"}</span>
      </button>

      <span className="bar-sway text-base select-none hidden sm:inline" aria-hidden style={{ animationDelay:"0.5s" }}>🌺</span>

      <button onClick={() => setDismissed(true)} aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-lg leading-none transition-colors">
        ×
      </button>
    </div>
  );
}
