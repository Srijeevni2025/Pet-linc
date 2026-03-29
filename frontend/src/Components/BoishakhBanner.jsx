// // BoishakhBanner.jsx
// Uses your REAL packages from the API — grooming only, no boarding/walk fiction
// Place between <HomePageHeroSection /> and <GroomingCategory /> in HomePage.jsx
// Remove after April 20, 2025

import { useState, useEffect } from "react";

// ── Alpona SVG ───────────────────────────────────────────────────────────────
const AlponaSVG = () => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 top-0 h-full w-auto pointer-events-none select-none"
    style={{ opacity: 0.11 }} aria-hidden="true">
    <circle cx="270" cy="170" r="115" fill="white" />
    <circle cx="270" cy="170" r="90"  fill="#C0392B" />
    <circle cx="270" cy="170" r="65"  fill="white" />
    <circle cx="270" cy="170" r="40"  fill="#C0392B" />
    <circle cx="270" cy="170" r="17"  fill="white" />
    {[0,45,90,135,180,225,270,315].map((deg, i) => {
      const r = (deg * Math.PI) / 180;
      return <ellipse key={i} cx={270 + Math.cos(r)*115} cy={170 + Math.sin(r)*115}
        rx="13" ry="26" transform={`rotate(${deg} ${270+Math.cos(r)*115} ${170+Math.sin(r)*115})`} fill="white"/>;
    })}
    {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((deg, i) => {
      const r = (deg * Math.PI) / 180;
      return <ellipse key={i} cx={270 + Math.cos(r)*77} cy={170 + Math.sin(r)*77}
        rx="8" ry="16" transform={`rotate(${deg} ${270+Math.cos(r)*77} ${170+Math.sin(r)*77})`} fill="white"/>;
    })}
    {/* Bengali fish motif */}
    <ellipse cx="80" cy="300" rx="55" ry="22" fill="white" />
    <path d="M135 300 L168 280 L168 320 Z" fill="white" />
    <circle cx="62" cy="293" r="5" fill="#C0392B" />
    <path d="M85 308 Q108 317 132 306" stroke="#C0392B" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    {Array.from({length:16},(_,i) => (
      <circle key={i} cx={20+i*22} cy={388} r={i%2===0?5:3} fill="white"/>
    ))}
    <rect x="10" y="398" width="370" height="3" rx="1.5" fill="white"/>
    <ellipse cx="38" cy="58" rx="8" ry="22" fill="white"/>
    <ellipse cx="22" cy="72" rx="8" ry="18" transform="rotate(-30 22 72)" fill="white"/>
    <ellipse cx="54" cy="72" rx="8" ry="18" transform="rotate(30 54 72)" fill="white"/>
    <circle cx="38" cy="40" r="8" fill="white"/>
  </svg>
);

// ── Countdown ────────────────────────────────────────────────────────────────
function useCountdown(targetISO) {
  const calc = () => {
    const diff = Math.max(0, new Date(targetISO) - Date.now()) / 1000;
    return {
      d: Math.floor(diff / 86400),
      h: Math.floor((diff % 86400) / 3600),
      m: Math.floor((diff % 3600) / 60),
      s: Math.floor(diff % 60),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

// ── Your REAL packages with festival discount applied ────────────────────────
// Discount: 15% off on all packages for Poila Boishakh
// Using Math.round to get clean numbers
const DISCOUNT_PCT = 15;

const PACKAGES = [
  {
    id: "692ad99e470f9596bd38b46d",
    emoji: "🧴🧼",
    name: "SPA BATH",
    tag: "Relaxing Bath",
    originalPrice: 899,
    highlight: "Bath + 6 free services",
  },
  {
    id: "692ad9aa470f9596bd38b46f",
    emoji: "🛁🐾",
    name: "Clean & Cute",
    tag: "Best Value",
    originalPrice: 999,
    highlight: "Bath + Hygiene Cut + 6 free services",
  },
  {
    id: "692ad9b3470f9596bd38b471",
    emoji: "🐶✨",
    name: "Full Makeover",
    tag: "Most Popular",
    originalPrice: 1449,
    highlight: "Bath + Full Haircut + Hygiene Cut",
    featured: true,
  },
  {
    id: "692ada0f470f9596bd38b473",
    emoji: "✂️🐕",
    name: "Stylish Trim",
    tag: "No Bath",
    originalPrice: 949,
    highlight: "Full Haircut + Hygiene Cut only",
  },
  {
    id: "692ada5b470f9596bd38b475",
    emoji: "🧼🐾",
    name: "Hygiene Touch-Up",
    tag: "Quick Clean",
    originalPrice: 849,
    highlight: "Hygiene Cut + 6 free services",
  },
  {
    id: "692adb31470f9596bd38b477",
    emoji: "👑🐩",
    name: "The Ultimate",
    tag: "Luxury",
    originalPrice: 1999,
    highlight: "Full groom + Anti-Tick + Body Massage",
    featured: true,
  },
  {
    id: "692adb97470f9596bd38b479",
    emoji: "🐶🍼",
    name: "Baby Groom",
    tag: "For Puppies",
    originalPrice: 849,
    highlight: "Dry Bath + Hygiene Cut — puppy safe",
  },
  {
    id: "692adbe1470f9596bd38b47b",
    emoji: "🐾🧼",
    name: "Dry Spa Baby",
    tag: "Baby Spa",
    originalPrice: 799,
    highlight: "Waterless Dry Bath — gentle for pups",
  },
];

const discounted = (price) => Math.round(price * (1 - DISCOUNT_PCT / 100));

// ── Every package includes these free ────────────────────────────────────────
const FREE_ALWAYS = [
  "Ear & Eye Clean",
  "Dental Clean / Mouth Spray",
  "Paw Butter Massage",
  "Nail Clipping",
  "Brushing & Blow Dry",
  "Finishing Perfume",
];

// ── CountdownUnit ─────────────────────────────────────────────────────────────
const Unit = ({ n, label }) => (
  <div className="flex flex-col items-center min-w-[40px]">
    <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums leading-none">
      {String(n).padStart(2, "0")}
    </span>
    <span className="text-[9px] uppercase tracking-widest text-white/40 mt-1">{label}</span>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
export default function BoishakhBanner() {
  const { d, h, m, s } = useCountdown("2025-04-20T23:59:59");
  const [copied, setCopied] = useState(null);

  const copy = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const PROMO = "NABOBARSHO15";

  return (
    <section className="w-full bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Hero Banner ──────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl px-8 py-10 md:px-14 md:py-14 shadow-xl shadow-red-900/20"
          style={{ background: "linear-gradient(135deg, #7B1113 0%, #C0392B 55%, #922B21 100%)" }}>
          <AlponaSVG />

          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            {["🌸","🌺","🌼","🌸","🌺"].map((p, i) => (
              <span key={i} className="absolute text-xl opacity-20 animate-bounce select-none"
                style={{ left:`${8+i*18}%`, top:`${12+(i%3)*22}%`,
                  animationDelay:`${i*0.4}s`, animationDuration:`${2.4+i*0.3}s` }}>
                {p}
              </span>
            ))}
          </div>

          <div className="relative z-10 max-w-lg">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 shadow">
              🌼 Poila Boishakh 1432 · Grooming Special
            </div>
            <h2 className="text-white font-extrabold leading-tight mb-2"
              style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(26px,5vw,46px)" }}>
              Shubho Nababarsha!
            </h2>
            <p className="text-amber-200 mb-3"
              style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(16px,2.5vw,22px)", fontStyle:"italic" }}>
              শুভ নববর্ষ — Happy Bengali New Year
            </p>

            {/* The actual offer — honest and specific */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl font-extrabold text-white">{DISCOUNT_PCT}% off</span>
              <span className="text-white/70 text-sm">on all grooming packages</span>
            </div>
            <p className="text-white/60 text-xs mb-6">
              All 8 packages included · Valid in Kolkata · Till 20 April 2025
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#grooming-category"
                className="inline-block bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all text-amber-900 font-bold text-sm px-7 py-3 rounded-full shadow-lg shadow-amber-500/30">
                See All Packages →
              </a>
              <button onClick={() => copy(PROMO)}
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full px-4 py-2.5 transition-all">
                <span className="font-mono text-white text-xs font-bold tracking-widest">{PROMO}</span>
                <span className="text-white/50 text-xs">{copied === PROMO ? "✓ Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── What's always free ───────────────────────────────────────── */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-orange-200 px-6 py-5
          shadow-[0_4px_16px_rgba(255,150,80,0.12)]">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-3">
            🎁 Included free with every package
          </p>
          <div className="flex flex-wrap gap-2">
            {FREE_ALWAYS.map((item) => (
              <span key={item}
                className="text-xs font-medium bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1.5 rounded-full">
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Package cards ────────────────────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            All packages — {DISCOUNT_PCT}% off this Poila Boishakh
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {PACKAGES.map((pkg) => {
              const sale = discounted(pkg.originalPrice);
              const saving = pkg.originalPrice - sale;
              return (
                <div key={pkg.id}
                  className={`relative bg-white/60 backdrop-blur-xl rounded-2xl border p-4 flex flex-col gap-2
                    shadow-[0_4px_16px_rgba(255,150,80,0.12)] hover:shadow-[0_8px_24px_rgba(255,120,40,0.22)]
                    hover:-translate-y-1 transition-all
                    ${pkg.featured
                      ? "border-orange-400 border-2 shadow-[0_4px_20px_rgba(255,120,40,0.25)]"
                      : "border-white/40"}`}>

                  {pkg.featured && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-amber-500
                      text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow whitespace-nowrap">
                      ⭐ {pkg.tag}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-1 mt-1">
                    <span className="text-2xl">{pkg.emoji}</span>
                    {!pkg.featured && (
                      <span className="text-[10px] font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                        {pkg.tag}
                      </span>
                    )}
                  </div>

                  <div className="text-sm font-extrabold text-gray-900 leading-tight">{pkg.name}</div>
                  <div className="text-[11px] text-gray-500 leading-relaxed flex-1">{pkg.highlight}</div>

                  <div className="flex items-end justify-between mt-1 flex-wrap gap-1">
                    <div>
                      <div className="text-xs text-gray-400 line-through">₹{pkg.originalPrice}</div>
                      <div className="text-xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                        ₹{sale}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      Save ₹{saving}
                    </span>
                  </div>

                  <a href="#grooming-category"
                    className="mt-1 w-full text-center text-xs font-bold bg-gradient-to-r from-orange-600 to-amber-500
                      text-white py-2 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all">
                    Book Now
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Promo code + Countdown ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Promo code card */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-orange-200
            shadow-[0_4px_16px_rgba(255,150,80,0.15)] p-6 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
                Festival promo code
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Apply at checkout to get <span className="font-bold text-gray-900">{DISCOUNT_PCT}% off</span> on
                any grooming package. Works on all 8 packages in Kolkata.
              </p>
            </div>
            <button onClick={() => copy(PROMO)}
              className="flex items-center justify-between bg-orange-50 border-2 border-dashed border-orange-400
                rounded-xl px-5 py-4 hover:bg-orange-100 transition-colors group w-full">
              <span className="font-mono text-xl font-extrabold text-orange-600 tracking-widest">{PROMO}</span>
              <span className="text-xs font-semibold text-orange-400 group-hover:text-orange-600 transition-colors">
                {copied === PROMO ? "✓ Copied!" : "Tap to copy"}
              </span>
            </button>
          </div>

          {/* Countdown */}
          <div className="rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-xl"
            style={{ background:"linear-gradient(135deg, #3D1F0D 0%, #5C2E10 100%)" }}>
            <div className="text-white/50 text-xs uppercase tracking-widest font-semibold">
              Offer ends in
            </div>
            <div className="flex items-center gap-2">
              <Unit n={d} label="days" />
              <span className="text-amber-400 text-2xl font-light mb-4">:</span>
              <Unit n={h} label="hrs" />
              <span className="text-amber-400 text-2xl font-light mb-4">:</span>
              <Unit n={m} label="min" />
              <span className="text-amber-400 text-2xl font-light mb-4">:</span>
              <Unit n={s} label="sec" />
            </div>
            <div className="text-white/40 text-xs leading-relaxed">
              Valid on all grooming packages · Kolkata only · 14–20 April 2025
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
