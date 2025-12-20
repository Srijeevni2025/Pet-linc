// export default function AboutUs() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-orange-50/60 to-white pb-20">
//       {/* HERO */}
//       <section className="relative py-20">
//         <div className="absolute inset-0 opacity-[0.05] bg-[url('/paw-pattern.png')] bg-repeat"></div>

//         <div className="relative max-w-6xl mx-auto px-6 text-center">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
//             About <span className="text-orange-600">Petlinc</span>
//           </h1>
//           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//             Because every pet deserves gentle care, love, and a grooming
//             experience designed just for them.
//           </p>
//         </div>
//       </section>

//       {/* WHO WE ARE */}
//       <section className="max-w-6xl mx-auto px-6 mt-10 grid md:grid-cols-2 gap-10 items-center">
//         <div>
//           <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
//             Who We Are
//           </h2>
//           <p className="text-gray-600 leading-relaxed text-lg">
//             Petlinc is a pet grooming platform built with one clear mission —
//             to make premium, hygienic, and stress-free grooming accessible to
//             every pet parent. From playful puppies to calm senior pets, our
//             groomers know how to create a loving and comfortable experience for
//             every fur baby.
//           </p>

//           <p className="mt-4 text-gray-600 leading-relaxed text-lg">
//             Our trusted experts come with verified backgrounds, certified
//             grooming skills, and years of experience in handling pets of all
//             temperaments — from shy and anxious to highly energetic.
//           </p>
//         </div>

//         <div className="relative">
//           <img
//             src="/about-pets.png"
//             alt="Pet grooming"
//             className="rounded-3xl shadow-lg w-full"
//           />
//           <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-orange-100/40 to-transparent blur-2xl"></div>
//         </div>
//       </section>

//       {/* MISSION & VALUES */}
//       <section className="max-w-6xl mx-auto px-6 mt-20">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             Our Mission & Values
//           </h2>
//           <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
//             Built on compassion, trust, and professional care — your pet’s
//             happiness is our priority.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             {
//               title: "Compassion First",
//               desc: "Gentle handling, constant care, and a stress-free grooming environment.",
//             },
//             {
//               title: "Trusted Professionals",
//               desc: "Certified groomers with strong experience in dog & cat grooming.",
//             },
//             {
//               title: "Convenience at Home",
//               desc: "Premium grooming delivered at your doorstep with simple online booking.",
//             },
//           ].map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-orange-100 shadow hover:shadow-lg transition"
//             >
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 {item.title}
//               </h3>
//               <p className="text-gray-600 leading-relaxed">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* WHY CHOOSE US */}
//       <section className="max-w-6xl mx-auto px-6 mt-20">
//         <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
//           Why Pet Parents Choose <span className="text-orange-600">Us</span>
//         </h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {[
//             {
//               emoji: "🧼",
//               title: "Hygenic Grooming",
//               desc: "We use vet-approved products safe for all breeds.",
//             },
//             {
//               emoji: "🧑‍⚕️",
//               title: "Skilled Groomers",
//               desc: "Professionals who understand every pet’s unique needs.",
//             },
//             {
//               emoji: "🚚",
//               title: "Doorstep Service",
//               desc: "No stress of travel — grooming comes right to your home.",
//             },
//             {
//               emoji: "❤️",
//               title: "Love & Care",
//               desc: "Every groom is done with patience, compassion, and calmness.",
//             },
//           ].map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition text-center"
//             >
//               <div className="text-4xl mb-3">{item.emoji}</div>
//               <strong className="text-lg text-gray-900">{item.title}</strong>
//               <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* STATS */}
//       <section className="max-w-6xl mx-auto px-6 mt-20">
//         <div className="grid md:grid-cols-4 gap-8 text-center">
//           {[
//             ["4,000+", "Happy Pets Groomed"],
//             ["1,200+", "5-Star Reviews"],
//             ["60+", "Trusted Groomers"],
//             ["5 Cities", "Expanding Fast"],
//           ].map(([num, label], idx) => (
//             <div key={idx} className="bg-white p-6 rounded-2xl border shadow">
//               <h3 className="text-3xl font-extrabold text-orange-600">
//                 {num}
//               </h3>
//               <p className="text-gray-700 mt-2">{label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* TEAM SECTION (OPTIONAL) */}
//       <section className="max-w-6xl mx-auto px-6 mt-20">
//         <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
//           Meet Our Grooming Experts
//         </h2>

//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="bg-white p-6 rounded-2xl border shadow text-center"
//             >
//               <div className="w-24 h-24 mx-auto rounded-full bg-orange-100 shadow-inner"></div>
//               <h4 className="mt-4 font-bold text-gray-900">Groomer {i}</h4>
//               <p className="text-gray-600 text-sm">Certified Pet Groomer</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";

export default function AboutUs() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/70 to-white pb-24">
      {/* HERO SECTION */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-[url('/paw-pattern.png')] opacity-[0.04] bg-repeat"></div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.2]">
            Every Pet Has a Story.
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              We’re Here to Honor It.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Petlinc began with a simple belief — that grooming isn't a service.
            It’s an act of care, trust, and love. A moment where a pet feels
            safe, understood, and comfortable. A moment that strengthens the bond
            between a pet and their parent.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="max-w-6xl mx-auto px-6 mt-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src="/about-us.png"
            alt="Pet grooming journey"
            className="rounded-3xl shadow-2xl w-full"
          />
          <div className="absolute inset-0 rounded-3xl bg-orange-200/20 blur-3xl"></div>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
            Our Journey: From One Pet Parent to Many
          </h2>

          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            It started with a nervous Labrador named Bruno — a gentle giant who
            shook whenever he entered a grooming shop. Seeing him anxious broke
            our heart.
          </p>

          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            That’s when we realized something important: most pets aren’t scared
            of grooming — they’re scared of unfamiliar places, loud noises,
            rushed hands, and untrained handling.
          </p>

          <p className="text-gray-600 leading-relaxed text-lg">
            So we set out to create Petlinc — a safe, calm, loving grooming
            experience delivered right at home. A place where pets are treated
            with patience, empathy, and respect.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="max-w-6xl mx-auto px-6 mt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Our Mission
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg leading-relaxed">
          To redefine pet grooming with compassion-driven professionals,
          doorstep convenience, and unwavering trust.  
          Because every pet deserves a grooming experience filled with warmth.
        </p>
      </section>

      {/* VALUE CARDS */}
      <section className="max-w-6xl mx-auto px-6 mt-16 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Compassion in Every Touch",
            desc: "Every pet, from energetic puppies to anxious seniors, is treated with patience and empathy.",
            emoji: "🤍",
          },
          {
            title: "Certified Groomers You Can Trust",
            desc: "Professionals trained not only in grooming, but also in understanding behavior, stress signals, and comfort.",
            emoji: "🐾",
          },
          {
            title: "A Safe Experience, At Home",
            desc: "No cages. No waiting rooms. No stress. Grooming comes to where your pet feels safest — home.",
            emoji: "🏡",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white/90 backdrop-blur-lg border border-orange-100 p-8 rounded-3xl shadow-md hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">{item.emoji}</div>
            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
            <p className="text-gray-600 mt-3 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* FOUNDERS MESSAGE */}
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <div className="bg-white p-10 rounded-3xl border shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            A Message From Our Founders
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            “Every pet teaches us something — trust, patience, joy, loyalty.
            Petlinc is our way of giving something back.  
            Grooming shouldn’t be stressful. It should be a small celebration of
            our pet’s happiness and wellbeing.”
          </p>

          <p className="text-gray-900 font-semibold text-lg">— Founders, Petlinc</p>
        </div>
      </section>

      {/* WHY PET PARENTS TRUST US */}
      <section className="max-w-6xl mx-auto px-6 mt-24">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
          Why Thousands of Pet Parents Trust Us
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            ["4,000+", "Happy Pets Groomed"],
            ["1,200+", "5-Star Reviews"],
            ["60+", "Certified Groomers"],
            ["5 Cities", "Growing Every Month"],
          ].map(([num, label], idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border shadow-sm text-center"
            >
              <h3 className="text-3xl font-extrabold text-orange-600">
                {num}
              </h3>
              <p className="text-gray-700 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-6 mt-24 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Your Pet’s Comfort Is Our Promise
        </h2>
        <p className="mt-3 text-gray-600 text-lg">
          Join thousands of pet parents choosing love-first grooming.
        </p>

        <button onClick={()=>navigate('/#grooming-category')} className="mt-6 px-8 py-4 bg-orange-600 text-white font-semibold rounded-2xl shadow hover:bg-orange-700 transition">
          Book a Grooming Session
        </button>
      </section>
    </div>
  );
}
