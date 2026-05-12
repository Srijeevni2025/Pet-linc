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

// import { Link } from "react-router-dom";
// import { PawPrint, Sparkles, Heart } from "lucide-react";

// export default function HomePageHeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-white to-amber-100">
//       {/* Glow Orbs */}
//       <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl"></div>

//       <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

//         {/* LEFT CONTENT */}
//         <div className="space-y-6 animate-fadeUp">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-orange-200">
//             <PawPrint size={18} className="text-orange-600" />
//             <span className="text-sm font-semibold text-orange-700 tracking-wide">
//               Trusted • Gentle • Professional
//             </span>
//           </div>

//           {/* Glass Title Card */}
//           <div className="p-6 rounded-3xl bg-white/50 backdrop-blur-xl shadow-lg border border-white/40 max-w-xl">
//             {/* <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
//               Premium <span className="text-orange-600">Pet Grooming</span>
//               <br />
//               At Your Home
//             </h1> */}
//             <h1 className="text-5xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
//   Professional <span className="text-orange-600">Pet Grooming Services</span>
//   <br />
//    At Your Doorstep
// </h1>


//             <p className="mt-4 text-xl font-medium text-orange-700 flex items-center gap-2">
//               <Heart className="text-orange-500" /> Because they deserve the BEST.
//             </p>
//           </div>

//           {/* Subtitle */}
//           <p className="text-lg text-gray-700 max-w-lg leading-relaxed">
//             Our expert groomers provide stress-free, hygienic and loving
//             grooming sessions — right at your doorstep. Designed for comfort,
//             convenience & pure happiness.
//           </p>
//           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mt-2">
//   <span className="flex items-center gap-1">⭐ 4.8 Rated</span>
//   <span>•</span>
//   <span>125+ Orders Last Month</span>
//   <span>•</span>
//   <span>Verified Groomers</span>
// </div>


//           {/* CTA Buttons */}
//           <div className="mt-6 flex flex-wrap gap-4">
//             <a
//               href="#grooming-category"
//               className="px-8 py-3 rounded-full bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:bg-orange-700 hover:shadow-xl transition-all hover:-translate-y-1"
//             >
//               Book Grooming Now
//             </a>

//             <a
//               href= "#grooming-category"
//               className="px-8 py-3 rounded-full border-2 border-orange-600 text-orange-600 font-semibold hover:bg-orange-50 transition-all"
//             >
//               Explore Packages
//             </a>
//           </div>
//         </div>

//         {/* RIGHT IMAGE FRAME */}
//         <div className="relative flex justify-center md:justify-end animate-slideUp">
//           {/* Glow Layer */}
//           <div className="absolute inset-0 w-[90%] mx-auto rounded-full bg-gradient-to-br from-orange-200 via-white to-transparent blur-3xl opacity-70"></div>

//           {/* Floating Card */}
//           <div className="relative p-6 bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30">
//             <img
//               src="/puppy.png"
//               alt="Pet Grooming"
//               className="w-full max-w-md drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] animate-floating"
//             />

//             {/* Floating Icons */}
//             <Sparkles className="absolute -top-4 -left-4 text-orange-500 animate-pulse" size={32} />
//             <PawPrint className="absolute -bottom-4 right-4 text-orange-400 animate-bounce" size={30} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useEffect, useRef } from "react";

export default function HomePageHeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 22 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.45 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,146,60,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>

      {/* ── SPLIT BG ── */}
      <div className="absolute inset-0 flex">
        <div className="w-full md:w-1/2 bg-gray-950" />
        <div className="hidden md:block w-1/2 bg-orange-50" />
      </div>

      {/* ── DIAGONAL SLICE ── */}
      <div
        className="hidden md:block absolute top-0 right-0 h-full z-[2]"
        style={{
          width: "38%",
          background: "#030712",
          clipPath: "polygon(38% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />
      <div
        className="hidden md:block absolute top-0 right-0 h-full z-[3]"
        style={{
          width: "38%",
          background: "#fff7ed",
          clipPath: "polygon(62% 0, 100% 0, 100% 100%, 24% 100%)",
        }}
      />

      {/* ── PARTICLES ── */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 h-full pointer-events-none z-[1]"
        style={{ width: "50%", opacity: 0.65 }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-0">

        {/* ══ LEFT ══ */}
        <div className="flex flex-col justify-center gap-4 py-8 md:py-0 md:pr-8">

          {/* Pills */}
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase bg-orange-500 text-white shadow-[0_0_16px_rgba(249,115,22,0.45)]">
              Grooming
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase border border-orange-500/60 text-orange-400">
              Training — New!
            </span>
          </div>

          {/* Headline — tighter, uses clamp so it never overflows */}
          <h1
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", lineHeight: 1.05 }}
          >
            Your Pet
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #f97316" }}>
              Deserves
            </span>
            <br />
            <span className="text-orange-400">The Best.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 leading-relaxed max-w-sm" style={{ fontSize: "clamp(0.8rem, 1.4vw, 1rem)" }}>
            Premium at-home grooming &amp; professional dog training — by Kolkata &amp; Mumbai's most trusted pet care team.
          </p>

          {/* Stats row — now always visible */}
          <div className="flex gap-6 ">
            {[
              { num: "4.8★", label: "Rating" },
              { num: "5000+", label: "Families" },
              { num: "100%", label: "Verified" },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-black text-orange-400" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>{s.num}</p>
                <p className="text-gray-500 uppercase tracking-wider" style={{ fontSize: "0.65rem" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#grooming-category"
              className="group inline-flex items-center gap-2 rounded-xl font-black text-white transition-all hover:scale-105"
              style={{
                padding: "10px 24px",
                fontSize: "clamp(0.75rem, 1.3vw, 0.875rem)",
                background: "linear-gradient(135deg,#f97316,#f59e0b)",
                boxShadow: "0 0 28px rgba(249,115,22,0.4)",
              }}
            >
              Book Grooming
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#dog-training"
              className="inline-flex items-center gap-2 rounded-xl font-black text-white border border-white/20 hover:bg-white/10 transition-all hover:scale-105"
              style={{
                padding: "10px 24px",
                fontSize: "clamp(0.75rem, 1.3vw, 0.875rem)",
              }}
            >
              Explore Training
              <span className="text-orange-400">→</span>
            </a>
          </div>

          {/* Social proof — compact */}
          <div className="inline-flex items-center gap-3 self-start bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
            <div className="flex -space-x-2">
              {[
                { bg: "#fb923c", t: "R" },
                { bg: "#fbbf24", t: "S" },
                { bg: "#f97316", t: "M" },
                { bg: "#fde68a", t: "A" },
              ].map((a, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-gray-950 flex items-center justify-center text-white font-black"
                  style={{ backgroundColor: a.bg, fontSize: "0.6rem" }}
                >
                  {a.t}
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-bold" style={{ fontSize: "0.75rem" }}>5000+ families trust Petlinc</p>
              <p className="text-gray-500" style={{ fontSize: "0.65rem" }}>Kolkata &amp; Mumbai 🐾</p>
            </div>
          </div>
        </div>

        {/* ══ RIGHT ══ */}
        <div className="hidden md:flex flex-col items-center justify-center gap-5 h-full">

          {/* Illustration — scaled down to fit */}
          <div className="relative flex items-center justify-center" style={{ flex: 1 }}>

            {/* Spinning rings */}
            <div
              className="absolute rounded-full border-2 border-dashed border-orange-300/40 animate-spin pointer-events-none"
              style={{ width: 290, height: 290, animationDuration: "25s" }}
            />
            <div
              className="absolute rounded-full border border-orange-200/30 animate-spin pointer-events-none"
              style={{ width: 330, height: 330, animationDuration: "40s", animationDirection: "reverse" }}
            />

            {/* Circle frame */}
            <div
              className="relative rounded-full flex items-center justify-center overflow-hidden"
              style={{
                width: 250,
                height: 250,
                background: "linear-gradient(145deg,#ffedd5,#fef3c7)",
                boxShadow: "0 20px 60px rgba(249,115,22,0.22), 0 0 0 6px rgba(249,115,22,0.07)",
              }}
            >
              <svg viewBox="0 0 300 300" width="260" height="260" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="150" cy="262" rx="90" ry="14" fill="#fed7aa" opacity="0.5" />
                <ellipse cx="150" cy="200" rx="62" ry="52" fill="#fbbf24" />
                <circle cx="150" cy="132" r="48" fill="#fbbf24" />
                <ellipse cx="110" cy="112" rx="17" ry="28" fill="#f59e0b" transform="rotate(-15 110 112)" />
                <ellipse cx="190" cy="112" rx="17" ry="28" fill="#f59e0b" transform="rotate(15 190 112)" />
                <ellipse cx="110" cy="114" rx="9" ry="18" fill="#fde68a" transform="rotate(-15 110 114)" />
                <ellipse cx="190" cy="114" rx="9" ry="18" fill="#fde68a" transform="rotate(15 190 114)" />
                <circle cx="134" cy="124" r="9" fill="#111827" />
                <circle cx="166" cy="124" r="9" fill="#111827" />
                <circle cx="137" cy="121" r="3" fill="white" />
                <circle cx="169" cy="121" r="3" fill="white" />
                <ellipse cx="150" cy="145" rx="9" ry="6" fill="#111827" />
                <circle cx="148" cy="143" r="2" fill="white" opacity="0.6" />
                <path d="M142 152 Q150 161 158 152" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="120" cy="140" r="9" fill="#fca5a5" opacity="0.45" />
                <circle cx="180" cy="140" r="9" fill="#fca5a5" opacity="0.45" />
                <rect x="105" y="232" width="22" height="30" rx="11" fill="#f59e0b" />
                <rect x="173" y="232" width="22" height="30" rx="11" fill="#f59e0b" />
                <rect x="90" y="222" width="22" height="28" rx="11" fill="#fbbf24" />
                <rect x="188" y="222" width="22" height="28" rx="11" fill="#fbbf24" />
                <path d="M212 192 Q250 165 244 138 Q238 122 226 136" fill="none" stroke="#f59e0b" strokeWidth="15" strokeLinecap="round" />
                <rect x="116" y="165" width="68" height="14" rx="7" fill="#f97316" />
                <circle cx="150" cy="172" r="5" fill="#fde68a" />
                <rect x="62" y="178" width="32" height="13" rx="6" fill="#f97316" />
                <rect x="66" y="191" width="4" height="11" rx="2" fill="#f97316" />
                <rect x="74" y="191" width="4" height="14" rx="2" fill="#f97316" />
                <rect x="82" y="191" width="4" height="11" rx="2" fill="#f97316" />
                <text x="55" y="88" fontSize="18" fill="#f97316" opacity="0.8">✦</text>
                <text x="228" y="76" fontSize="13" fill="#fbbf24" opacity="0.9">✦</text>
                <text x="242" y="208" fontSize="11" fill="#f97316" opacity="0.7">✦</text>
              </svg>
            </div>

            {/* Floating badge: grooming */}
            <div
              className="absolute bg-white rounded-xl px-3 py-2 shadow-2xl border border-orange-100 flex items-center gap-2 animate-bounce"
              style={{ left: -16, top: "18%", animationDuration: "3.5s" }}
            >
              <span style={{ fontSize: "1.2rem" }}>✂️</span>
              <div>
                <p className="font-black text-gray-900" style={{ fontSize: "0.7rem", lineHeight: 1 }}>Grooming</p>
                <p className="text-gray-400" style={{ fontSize: "0.6rem", marginTop: 2 }}>At your doorstep</p>
              </div>
            </div>

            {/* Floating badge: training */}
            <div
              className="absolute bg-gray-900 rounded-xl px-3 py-2 shadow-2xl border border-orange-500/40 flex items-center gap-2 animate-bounce"
              style={{ right: -20, bottom: "18%", animationDuration: "4s", animationDelay: "0.8s" }}
            >
              <span style={{ fontSize: "1.2rem" }}>🎓</span>
              <div>
                <p className="font-black text-white" style={{ fontSize: "0.7rem", lineHeight: 1 }}>Training</p>
                <p className="text-orange-400" style={{ fontSize: "0.6rem", marginTop: 2 }}>Now available!</p>
              </div>
            </div>
          </div>

          {/* Social proof pill — below image */}
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 shadow-xl border border-orange-100 mb-10">
            <div className="flex -space-x-2">
              {[
                { bg: "#fb923c", t: "R" },
                { bg: "#fbbf24", t: "S" },
                { bg: "#f97316", t: "M" },
                { bg: "#fde68a", t: "A" },
              ].map((a, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white font-black"
                  style={{ backgroundColor: a.bg, fontSize: "0.6rem" }}
                >
                  {a.t}
                </div>
              ))}
            </div>
            <div>
              <p className="font-black text-gray-900" style={{ fontSize: "0.75rem" }}>Loved by 5000+ families</p>
              <p className="text-gray-400" style={{ fontSize: "0.65rem" }}>Kolkata &amp; Mumbai 🐾</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE STRIP ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden"
        style={{ padding: "8px 0", background: "linear-gradient(90deg,#f97316,#f59e0b,#f97316)" }}
      >
        <div
          className="flex gap-8 text-white font-black uppercase whitespace-nowrap"
          style={{ fontSize: "0.65rem", letterSpacing: "0.1em", animation: "marquee 22s linear infinite", width: "max-content" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex gap-8 items-center">
              <span>🐾 Premium Grooming</span>
              <span style={{ opacity: 0.5 }}>✦</span>
              <span>🎓 Dog Training</span>
              <span style={{ opacity: 0.5 }}>✦</span>
              <span>🏠 At-Home Service</span>
              <span style={{ opacity: 0.5 }}>✦</span>
              <span>⭐ 4.8 Rated</span>
              <span style={{ opacity: 0.5 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}