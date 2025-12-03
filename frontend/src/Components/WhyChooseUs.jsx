import { Sparkles, ShieldCheck, Heart, CalendarCheck } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Trusted Groomers",
      desc: "Verified professionals ensuring your pet’s safety and comfort.",
      icon: <ShieldCheck className="w-7 h-7 text-orange-500" />,
      color: "from-orange-100 to-orange-50",
    },
    {
      title: "Pet-Friendly Care",
      desc: "Our groomers treat your furry friends with love and gentle care.",
      icon: <Heart className="w-7 h-7 text-pink-500" />,
      color: "from-pink-100 to-pink-50",
    },
    {
      title: "Hygienic Products",
      desc: "Only safe, vet-approved shampoos and grooming tools are used.",
      icon: <Sparkles className="w-7 h-7 text-yellow-500" />,
      color: "from-yellow-100 to-yellow-50",
    },
    {
      title: "Easy Booking",
      desc: "Seamless online booking with instant confirmation.",
      icon: <CalendarCheck className="w-7 h-7 text-green-500" />,
      color: "from-green-100 to-green-50",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-orange-50/60 to-white overflow-hidden">
      {/* Subtle Paw Pattern Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/paw-pattern.png')] bg-repeat"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Why Choose <span className="text-orange-600">Petlinc?</span>
        </h2>
        <p className="text-gray-600 mt-3 text-base sm:text-lg max-w-2xl mx-auto">
          Because your pet deserves more than just grooming — they deserve love, care, and comfort. 🐾
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white/90 backdrop-blur-sm border border-orange-100 rounded-2xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-inner`}
              >
                {item.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>

              {/* Accent underline animation */}
              <div className="mt-4 mx-auto w-0 h-[2px] bg-orange-400 group-hover:w-10 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}