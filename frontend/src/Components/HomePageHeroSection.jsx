import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";

export default function HomePageHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Decorative Background Paws */}
      <div className="absolute inset-0 bg-[url('/paw-pattern.png')] opacity-[0.05] bg-repeat"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="animate-fadeUp">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-full shadow-inner">
              <PawPrint size={20} />
            </div>
            <span className="text-sm font-medium text-orange-600 tracking-wide uppercase">
              Your Pet, Our Priority
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Premium <span className="text-orange-600">Grooming</span> Packages
            <br />
            for Dogs & Cats
          </h1>

          <p className="mt-4 text-2xl font-semibold text-orange-600">
            Because They’re Family Too ❤️
          </p>

          <p className="mt-6 text-lg text-gray-600 max-w-lg leading-relaxed">
            Pamper your furry friend with our curated grooming experiences —
            gentle care, trusted professionals, and a stress-free booking
            process. Designed for comfort, love, and hygiene.
          </p>

          {/* CTA Buttons */}
          {/* <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/groomers"
              className="px-8 py-3 bg-orange-600 text-white rounded-full font-semibold shadow-md hover:bg-orange-700 hover:shadow-lg transition-all transform hover:-translate-y-[2px]"
            >
              Book Now
            </Link>

            <Link
              to="/grooming-packages"
              className="px-8 py-3 border-2 border-orange-500 text-orange-600 bg-white rounded-full font-semibold hover:bg-orange-50 transition-all"
            >
              View Packages
            </Link>
          </div> */}
        </div>

        {/* Right Illustration */}
        <div className="relative flex justify-center md:justify-end animate-slideUp">
          <div className="relative w-[90%] md:w-[80%]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-100 via-amber-50 to-transparent blur-3xl opacity-70"></div>
            <img
              src="/puppy.png"
              alt="Pet Grooming"
              className="relative w-full max-w-md mx-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}