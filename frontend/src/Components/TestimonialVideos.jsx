

// import { useEffect, useRef, useState } from "react";

// export default function TestimonialVideos() {
//   const videoRefs = useRef([]);
//   const [activeIndex, setActiveIndex] = useState(null);

//   const videos = [
//     { id: 1, src: "/feedback_1.mp4", name: "Rajan & Bruno" },
//     { id: 2, src: "/feedback_2.mp4", name: "Swati & Cookie" },
//     { id: 3, src: "/feedback_3.mp4", name: "Manisha & Simba" },
//   ];

//   // Auto-play muted when in viewport
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;

//           if (entry.isIntersecting) {
//             video.play();
//           } else {
//             video.pause();
//             video.currentTime = 0;
//           }
//         });
//       },
//       { threshold: 0.6 }
//     );

//     videoRefs.current.forEach((v) => v && observer.observe(v));

//     return () => observer.disconnect();
//   }, []);

//   // Play WITH SOUND when clicked
//   const handleVideoClick = (index) => {
//     videoRefs.current.forEach((video, i) => {
//       if (i !== index && video) {
//         video.pause();
//         video.currentTime = 0;
//         video.muted = true;
//       }
//     });

//     const selectedVideo = videoRefs.current[index];
//     if (selectedVideo) {
//       selectedVideo.muted = false; // unmute
//       selectedVideo.play();
//       setActiveIndex(index);
//     }
//   };

//   return (
//     <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
//       <div className="max-w-7xl mx-auto px-5 md:px-10">
        
//         {/* HEADING */}
//         <div className="text-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
//             What Pet Parents Say ❤️
//           </h2>
//           <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
//             Real customers, real grooming experiences.
//           </p>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {videos.map((video, index) => (
//             <div
//               key={video.id}
//               className="rounded-2xl overflow-hidden border bg-white shadow-lg hover:shadow-xl transition cursor-pointer"
//               onClick={() => handleVideoClick(index)}
//             >
//               <video
//                 ref={(el) => (videoRefs.current[index] = el)}
//                 src={video.src}
//                 muted
//                 playsInline
//                 className="w-full h-64 object-cover rounded-2xl"
//               />

//               {/* TEXT BELOW VIDEO */}
//               <div className="p-4">
//                 <h4 className="text-gray-800 font-semibold text-lg">
//                   {video.name}
//                 </h4>
//                 <p className="text-gray-500 text-sm mt-1">
//                   Verified Grooming Testimonial
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, ShieldCheck } from "lucide-react";

export default function TestimonialVideos() {
  const videoRefs = useRef([]);
  const containerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const videos = [
    { id: 1, src: "/feedback_1.mp4", name: "Rajan & Bruno" },
    { id: 2, src: "/feedback_2.mp4", name: "Swati & Cookie" },
    { id: 3, src: "/feedback_3.mp4", name: "Manisha & Simba" },
  ];

  // ------------------------------
  // LEVEL 12 — FLOATING PARTICLES
  // ------------------------------

  useEffect(() => {
    const container = document.getElementById("paw-particles");
    if (!container) return;

    for (let i = 0; i < 10; i++) {
      const el = document.createElement("div");
      el.innerText = "🐾";
      el.className =
        "absolute text-orange-300 opacity-[0.15] text-2xl animate-floatParticle";
      el.style.left = Math.random() * 100 + "%";
      el.style.top = Math.random() * 100 + "%";
      el.style.animationDuration = 6 + Math.random() * 8 + "s";

      container.appendChild(el);
    }
  }, []);

  // ------------------------------
  // Auto-play muted videos
  // ------------------------------

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          if (entry.isIntersecting) v.play();
          else {
            v.pause();
            v.currentTime = 0;
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((v) => v && obs.observe(v));
    return () => obs.disconnect();
  }, []);

  // ------------------------------
  // Tap to unmute
  // ------------------------------

  const handleVideoClick = (index) => {
    videoRefs.current.forEach((v, i) => {
      if (i !== index && v) {
        v.pause();
        v.currentTime = 0;
        v.muted = true;
      }
    });

    const vid = videoRefs.current[index];
    if (!vid) return;

    vid.muted = false;
    vid.play();
    setActiveIndex(index);
  };

  // ------------------------------
  // Auto-scroll carousel (LEVEL 12)
  // ------------------------------

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (!containerRef.current) return;

      const el = containerRef.current;
      const width = el.scrollWidth / videos.length;

      el.scrollTo({
        left: ((currentSlide + 1) % videos.length) * width,
        behavior: "smooth",
      });

      setCurrentSlide((prev) => (prev + 1) % videos.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  // Pause autoplay on long press
  const handleLongPressStart = () => setIsPaused(true);
  const handleLongPressEnd = () => setIsPaused(false);

  return (
    <section className="py-28 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">

      {/* LEVEL 12 PARTICLES */}
      <div id="paw-particles" className="absolute inset-0 pointer-events-none"></div>

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/30 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">

        <h2 className="
          text-center text-4xl md:text-5xl font-extrabold mb-3
          bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600
          bg-clip-text text-transparent
        ">
          What Pet Parents Say ❤️
        </h2>

        <p className="text-center text-gray-600 text-sm sm:text-base mb-14">
          Cinematic grooming experiences. Real stories.
        </p>

        {/* MAIN SCROLL WRAPPER */}
        <div
          ref={containerRef}
          onScroll={() => {
            const el = containerRef.current;
            const width = el.scrollWidth / videos.length;
            const index = Math.round(el.scrollLeft / width);
            setCurrentSlide(index);
          }}
          onTouchStart={handleLongPressStart}
          onTouchEnd={handleLongPressEnd}
          className="
            flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory
            sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible
          "
        >
          {videos.map((video, index) => (
            <div
              key={index}
              onClick={() => handleVideoClick(index)}
              className="
                relative min-w-[85%] sm:min-w-0 rounded-3xl 
                bg-white/60 backdrop-blur-xl border border-white/30 
                transition-all transform snap-start 
                shadow-[0_20px_40px_rgba(255,150,80,0.25)]
                hover:shadow-[0_30px_60px_rgba(255,140,60,0.35)]
                hover:-translate-y-3 hover:scale-[1.05]
                group
              "
            >
              {/* LEVEL 12 GRADIENT NEON BORDER */}
              <div className="
                absolute inset-0 rounded-3xl p-[2px]
                bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600
                opacity-40 group-hover:opacity-90
                transition-all duration-700 blur-sm
              "></div>

              {/* VIDEO */}
              <div className="relative rounded-3xl overflow-hidden">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  muted
                  playsInline
                  className="
                    w-full h-80 object-cover rounded-t-3xl
                    transition-all duration-700 group-hover:blur-[2px]
                  "
                />

                {/* SHIMMER OVERLAY */}
                <div className="
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%]
                  transition-all duration-700 ease-out
                "></div>

                {/* TAP TO UNMUTE ANIMATED OVERLAY */}
                {activeIndex !== index && (
                  <div className="
                    absolute inset-0 bg-black/30 backdrop-blur-sm 
                    flex flex-col items-center justify-center
                    text-white opacity-0 group-hover:opacity-100
                    transition-all duration-300
                  ">
                    <div className="
                      w-14 h-14 rounded-full bg-white/20 
                      flex items-center justify-center 
                      animate-ping
                    "></div>
                    <span className="mt-2 text-sm">Tap to Unmute</span>
                  </div>
                )}

                {/* SOUND ICON */}
                <div className="absolute top-3 right-3 bg-black/40 p-2 rounded-full backdrop-blur-xl">
                  {activeIndex === index ? (
                    <Volume2 className="text-white" size={20} />
                  ) : (
                    <VolumeX className="text-white" size={20} />
                  )}
                </div>
              </div>

              {/* TEXT */}
              <div className="p-5">
                <h4 className="text-gray-900 font-bold text-lg animate-fadeUp">
                  {video.name}
                </h4>

                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                  <ShieldCheck className="w-4 h-4 text-orange-500" />
                  Verified Pet Parent
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* LEVEL 12 – PROGRESS DOTS */}
        <div className="flex justify-center gap-3 mt-6 sm:hidden">
          {videos.map((_, i) => (
            <div
              key={i}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  currentSlide === i
                    ? "bg-orange-600 scale-150 shadow-lg"
                    : "bg-orange-300"
                }
              `}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
