// import { useState } from "react";

// export default function TestimonialVideos() {
//   const [activeVideo, setActiveVideo] = useState(null);

//   const videos = [
//     { id: 1, src: "/feedback_1.mp4", name: "Rajan & Bruno" },
//     { id: 2, src: "/feedback_1.mp4", name: "Swati & Cookie" },
//     { id: 3, src: "/feedback_1.mp4", name: "Manish & Simba" },
//   ];

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* HEADING */}
//         <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
//           Loved by Hundreds of Pet Parents 💛
//         </h2>
//         <p className="text-gray-500 text-center mt-2 max-w-2xl mx-auto">
//           Real customers, real experiences. See what pet parents say about our grooming service.
//         </p>

//         {/* VIDEO GRID */}
//         <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {videos.map((video) => (
//             <div
//               key={video.id}
//               className="relative group rounded-2xl overflow-hidden shadow-lg border border-orange-100 cursor-pointer"
//               onClick={() => setActiveVideo(video.src)}
//             >
//               <video
//                 src={video.src}
//                 muted
//                 playsInline
//                 className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//                 onMouseEnter={(e) => e.target.play()}
//                 onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
//               />

//               {/* OVERLAY */}
//               <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//                 <span className="text-white text-lg font-semibold tracking-wide">
//                   ▶ Play Testimonial
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* VIDEO POPUP MODAL */}
//       {activeVideo && (
//         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <button
//             onClick={() => setActiveVideo(null)}
//             className="absolute top-5 right-5 text-white text-3xl font-bold"
//           >
//             ✖
//           </button>

//           <video
//             src={activeVideo}
//             controls
//             autoPlay
//             className="w-full max-w-3xl rounded-xl shadow-2xl"
//           />
//         </div>
//       )}
//     </section>
//   );
// }


import { useEffect, useRef, useState } from "react";

export default function TestimonialVideos() {
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const videos = [
    { id: 1, src: "/feedback_1.mp4", name: "Rajan & Bruno" },
    { id: 2, src: "/feedback_2.mp4", name: "Swati & Cookie" },
    { id: 3, src: "/feedback_3.mp4", name: "Manisha & Simba" },
  ];

  // Auto-play muted when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));

    return () => observer.disconnect();
  }, []);

  // Play WITH SOUND when clicked
  const handleVideoClick = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      }
    });

    const selectedVideo = videoRefs.current[index];
    if (selectedVideo) {
      selectedVideo.muted = false; // unmute
      selectedVideo.play();
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        
        {/* HEADING */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            What Pet Parents Say ❤️
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Real customers, real grooming experiences.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="rounded-2xl overflow-hidden border bg-white shadow-lg hover:shadow-xl transition cursor-pointer"
              onClick={() => handleVideoClick(index)}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.src}
                muted
                playsInline
                className="w-full h-64 object-cover rounded-2xl"
              />

              {/* TEXT BELOW VIDEO */}
              <div className="p-4">
                <h4 className="text-gray-800 font-semibold text-lg">
                  {video.name}
                </h4>
                <p className="text-gray-500 text-sm mt-1">
                  Verified Grooming Testimonial
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
