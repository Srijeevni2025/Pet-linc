
import { Link } from "react-router-dom";

export default function GroomerCTA() {
  return (
    <section className="relative mt-20 py-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-white/10 blur-3xl rounded-full opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Are You a Pet Groomer?
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-orange-100 text-lg leading-relaxed max-w-2xl mx-auto">
          Join <span className="font-semibold text-white">Petlinc</span> and connect with thousands
          of pet parents looking for professional and trusted grooming services.
        </p>

        {/* CTA Button */}
        <Link
          to="/becomepartner"
          className="mt-8 inline-block bg-white text-orange-600 px-10 py-3 rounded-full font-semibold text-base shadow-md hover:bg-orange-50 hover:scale-[1.02] transition-transform"
        >
          Become a Partner
        </Link>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,83.15c-65.07-20.25-149.3-36.46-244.08-28.5C575.44,67.91,446.25,115.72,307.22,106.13,172.56,96.96,93.85,56.15,0,34.25V120H1200V95.8C1134.72,98.87,1066.56,95.68,985.66,83.15Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
}
