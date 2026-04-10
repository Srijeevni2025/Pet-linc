

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
  const [userScrolling, setUserScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  const videos = [
    { id: 1, src: "/feedback_1.mp4", name: "Rajan & Bruno" },
    { id: 2, src: "/feedback_2.mp4", name: "Swati & Cookie" },
    { id: 3, src: "/feedback_3.mp4", name: "Manisha & Simba" },
  ];

  // Auto-play muted on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          if (entry.isIntersecting) v.play().catch(() => {});
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

  // Tap to unmute — mute all others first
  const handleVideoClick = (index) => {
    videoRefs.current.forEach((v, i) => {
      if (i !== index && v) {
        v.muted = true;
        v.pause();
        v.currentTime = 0;
      }
    });
    const vid = videoRefs.current[index];
    if (!vid) return;
    vid.muted = false;
    vid.play().catch(() => {});
    setActiveIndex(index);
  };

  // Auto-scroll — stops when user scrolls, resumes after 4s idle
  useEffect(() => {
    if (userScrolling) return;
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const next = (currentSlide + 1) % videos.length;
      const width = el.scrollWidth / videos.length;
      el.scrollTo({ left: next * width, behavior: "smooth" });
      setCurrentSlide(next);
    }, 3500);
    return () => clearInterval(interval);
  }, [currentSlide, userScrolling]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const width = el.scrollWidth / videos.length;
    setCurrentSlide(Math.round(el.scrollLeft / width));
    setUserScrolling(true);
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => setUserScrolling(false), 4000);
  };

  return (
    <section className="py-24 bg-orange-50">
      <div className="max-w-6xl mx-auto px-5 md:px-10">

        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          What pet parents say
        </h2>
        <p className="text-center text-gray-500 text-sm mb-12">
          Real stories from real families.
        </p>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="
            flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory
            sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible
            scrollbar-hide
          "
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              onClick={() => handleVideoClick(index)}
              className="
                relative min-w-[85%] sm:min-w-0 rounded-2xl
                bg-white border border-gray-100
                shadow-sm hover:shadow-md
                transition-shadow duration-300
                cursor-pointer snap-start
              "
            >
              <div className="relative rounded-t-2xl overflow-hidden">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  muted
                  playsInline
                  loop
                  className="w-full h-72 object-cover"
                />

                {/* Unmute prompt — only shown when not active */}
                {activeIndex !== index && (
                  <div className="
                    absolute inset-0 flex items-end justify-center pb-4
                    bg-gradient-to-t from-black/40 to-transparent
                    opacity-0 hover:opacity-100 transition-opacity duration-200
                  ">
                    <span className="text-white text-xs bg-black/50 rounded-full px-3 py-1">
                      Tap to unmute
                    </span>
                  </div>
                )}

                {/* Sound indicator */}
                <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full">
                  {activeIndex === index
                    ? <Volume2 className="text-white" size={16} />
                    : <VolumeX className="text-white" size={16} />
                  }
                </div>
              </div>

              <div className="px-4 py-3">
                <p className="text-gray-900 font-semibold text-base">{video.name}</p>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
                  <ShieldCheck size={13} className="text-orange-500" />
                  Verified pet parent
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll dots — mobile only */}
        <div className="flex justify-center gap-2 mt-5 sm:hidden">
          {videos.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === i
                  ? "w-5 bg-orange-500"
                  : "w-2 bg-orange-200"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}