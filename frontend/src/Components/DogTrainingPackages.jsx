import { CheckCircle2, PawPrint, Star, Trophy, Clock, Phone } from "lucide-react";

const packages = [
  {
    id: 1,
    emoji: "🐾",
    tag: "DIY Program",
    name: "Petlinc Basic Obedience",
    price: 4999,
    originalPrice: 6999,
    sessions: "4 Home Sessions/Month",
    tagline: "We teach YOU to train your dog — skills that last a lifetime.",
    minMonths: null,
    features: [
      { icon: "🚽", title: "Potty Training Protocol", desc: "A step-by-step system to eliminate accidents indoors permanently." },
      { icon: "🎯", title: "Basic Commands", desc: "Sit • Stay • Come • No — the 4 non-negotiable commands every dog must know." },
      { icon: "🚶", title: "Behaviour Control", desc: "Leash Walking Basics + Food Waiting discipline." },
      { icon: "🏠", title: "Crate Training", desc: "Teaching your dog to love their safe space — reducing anxiety and destructive behaviour." },
      { icon: "💬", title: "24×7 WhatsApp Support", desc: "Your trainer is always a message away between sessions." },
    ],
    highlight: false,
    highlightLabel: null,
  },
  {
    id: 2,
    emoji: "⭐",
    tag: "MOST POPULAR",
    name: "Petlinc Foundation Training",
    price: 9999,
    originalPrice: 14999,
    sessions: "8 Home Sessions/Month",
    tagline: "Your dog will genuinely impress every guest who visits.",
    minMonths: 4,
    features: [
      { icon: "🚽", title: "Potty Training Protocol", desc: "Taught by Us - Practiced by You." },
      { icon: "🎯", title: "10 Essential Commands", desc: "Sit • Stay • Come • Down • Handshake • Bow • Salute • Drop • Hold • Carry" },
      { icon: "🔧", title: "Behaviour Correction", desc: "Leash Mastery, Crate Training, Excitement Control, Barking Control, Biting Control." },
      { icon: "💬", title: "24×7 WhatsApp Support", desc: "Direct line to your trainer at all times." },
    ],
    highlight: true,
    highlightLabel: "Done For You",
  },
  {
    id: 3,
    emoji: "🏆",
    tag: "Full Journey",
    name: "Petlinc Complete Transformation",
    price: 14999,
    originalPrice: 21999,
    sessions: "12 Home Sessions/Month",
    tagline: "For pet parents who want nothing less than extraordinary.",
    minMonths: 6,
    features: [
      { icon: "✅", title: "Everything in Foundation", desc: "All 10 commands + full behaviour correction included." },
      { icon: "😰", title: "Separation Anxiety Treatment", desc: "Your dog stays calm and settled even when you're away for hours." },
      { icon: "🌍", title: "Advanced Socialisation", desc: "Comfortable with strangers, children, other dogs, traffic and new environments." },
      { icon: "😠", title: "Aggression & Fear Prevention", desc: "Science-backed positive reinforcement behaviour modification." },
      { icon: "🏆", title: "Advanced Commands", desc: "Fetching • Zigzag Walk • Standing Walk - commands that genuinely wow people." },
      { icon: "🥇", title: "Priority WhatsApp Support", desc: "Responses within 1 hour guaranteed." },
      { icon: "📜", title: "Petlinc Completion Certificate", desc: "Official recognition of your dog's achievement." },
      { icon: "🔄", title: "2 Free Follow-Up Sessions", desc: "After program completion, we check in to ensure results are maintained." },
    ],
    highlight: false,
    highlightLabel: null,
  },
];

export default function DogTrainingPackages() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20" id = "training-packages">
      {/* HEADER */}
      <div className="text-center mb-16 px-6">
        <div className="inline-flex items-center justify-center bg-orange-100 w-20 h-20 rounded-3xl shadow-inner mb-4">
          <PawPrint className="w-10 h-10 text-orange-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Petlinc Dog Training Programs
        </h1>
        <p className="mt-3 text-gray-600 text-lg max-w-2xl mx-auto">
          Professional home training programs designed to build a deeper bond between you and your dog 🐶
        </p>

        {/* Suitability note */}
        <div className="mt-6 inline-flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 text-sm text-amber-800 max-w-xl text-left shadow-sm">
          <span className="text-lg">ℹ️</span>
          <span>
            Programs suitable for puppies aged <strong>2 months to 2 years</strong>. For dogs over 7 months that show biting or aggression, a demo session is offered first — you only pay for that one session if the dog doesn't allow training to continue.
          </span>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`
              relative flex flex-col h-full
              bg-white/60 backdrop-blur-2xl
              p-8 rounded-3xl border
              transition-all hover:-translate-y-3 hover:scale-[1.02]
              ${pkg.highlight
                ? "border-orange-400 shadow-[0_8px_30px_rgba(255,120,40,0.4)] hover:shadow-[0_20px_50px_rgba(255,120,40,0.5)]"
                : "border-white/30 shadow-[0_8px_20px_rgba(255,150,80,0.2)] hover:shadow-[0_18px_40px_rgba(255,120,40,0.3)] hover:border-orange-300"
              }
            `}
            style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
          >
            {/* MOST POPULAR RIBBON */}
            {pkg.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="px-5 py-1.5 text-xs font-bold bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-full shadow-lg tracking-wide">
                  ⭐ MOST POPULAR
                </div>
              </div>
            )}

            {/* FLOATING SPARKLES */}
            <div className="absolute -top-4 left-2 animate-ping text-orange-400 text-xl">✨</div>
            <div className="absolute bottom-4 -right-3 animate-pulse text-amber-500 text-lg">✨</div>

            {/* TOP */}
            <div className="z-[2]">
              {/* Emoji + Tag */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-5xl drop-shadow">{pkg.emoji}</span>
                <span className="px-3 py-1 text-xs bg-gradient-to-r from-orange-500 to-amber-400 text-white rounded-full shadow">
                  {pkg.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold mb-1 text-gray-900 tracking-tight">{pkg.name}</h3>

              {/* Sessions badge */}
              <div className="flex items-center gap-1.5 mb-3">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-700">{pkg.sessions}</span>
              </div>

              {/* Min months notice */}
              {pkg.minMonths && (
                <div className="mb-4 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-xl text-xs text-orange-700 font-medium">
                  📅 Minimum {pkg.minMonths} months recommended for best results
                </div>
              )}

              {/* Tagline */}
              <p className="text-sm text-gray-500 italic mb-5">"{pkg.tagline}"</p>

              {/* Features */}
              <ul className="space-y-3 mb-5">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 shrink-0">{f.icon}</span>
                    <div>
                      <span className="font-semibold text-gray-800">{f.title}</span>
                      {f.desc && <span className="text-gray-500"> - {f.desc}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* PRICE + CTA */}
            <div className="mt-auto pt-8 flex items-center justify-between z-[2]">
              <div className="flex flex-col">
                {pkg.originalPrice && (
                  <span className="text-sm text-gray-500 line-through decoration-red-500 decoration-2">
                    MRP: ₹{pkg.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_4px_10px_rgba(255,150,40,0.45)]">
                  ₹{pkg.price.toLocaleString()}
                </span>
                <span className="mt-1 text-xs text-orange-700 font-semibold bg-orange-100 px-2 py-1 rounded-full w-fit shadow-sm animate-bounce">
                  /month
                </span>
              </div>

              <a
                href="https://wa.me/9674127485?text=Hi%20Petlinc%20%F0%9F%91%8B%20I%E2%80%99d%20like%20to%20know%20more%20about%20the%20dog%20training%20program."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg hover:shadow-[0_10px_20px_rgba(255,120,40,0.45)] hover:scale-110 transition-all"
              >
                Enquire Now
              </a>
            </div>

            {/* 3D glow border on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-all duration-500 pointer-events-none bg-gradient-to-r from-orange-400/40 to-amber-400/40 blur-2xl"></div>
          </div>
        ))}
      </div>

      {/* BOTTOM NOTE */}
      <div className="max-w-2xl mx-auto mt-20 px-6 text-center">
        <div className="bg-white/70 backdrop-blur-xl border border-orange-200 rounded-3xl p-8 shadow-lg">
          <Trophy className="w-10 h-10 text-orange-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Not sure which program to pick?</h3>
          <p className="text-gray-600 text-sm mb-5">
            Chat with our trainers on WhatsApp — they'll recommend the perfect program based on your dog's age, breed and behaviour.
          </p>
          <a
            href="https://wa.me/9674127485?text=Hi%20Petlinc%20%F0%9F%91%8B%20I%20need%20help%20choosing%20the%20right%20training%20program%20for%20my%20dog."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <Phone className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}