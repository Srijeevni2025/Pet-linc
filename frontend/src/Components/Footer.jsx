// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div>
//           <h3 className="text-white font-bold mb-3">Petlinc</h3>
//           <p className="text-sm">Premium pet grooming at your doorstep.</p>
//         </div>
//         <div>
//           <h3 className="text-white font-bold mb-3">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             <li><Link to="/packages" className="hover:text-white">Packages</Link></li>
//             <li><Link to="/book" className="hover:text-white">Book Grooming</Link></li>
//             <li><Link to="/confirmation" className="hover:text-white">My Bookings</Link></li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-white font-bold mb-3">Contact</h3>
//           <p className="text-sm">support@petlinc.com</p>
//           <p className="text-sm">+91-98765 43210</p>
//         </div>
//       </div>
//       <div className="text-center text-gray-500 mt-8">© 2025 Petlinc. All rights reserved.</div>
//     </footer>
//   );
// }



import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-400 pt-16 pb-10 mt-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-orange-600/10 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-32 -right-32 w-[350px] h-[350px] bg-orange-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-orange-600/20 p-2 rounded-full">
              <PawPrint className="text-orange-500 w-5 h-5" />
            </div>
            <h3 className="text-white text-xl font-extrabold">Petlinc</h3>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Trusted by pet parents across India for premium grooming, vet care,
            and home services — because they’re family too. ❤️
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              ["About Us", "/about"],
              ["Careers", "/careers"],
              ["Customer Policy", "/customerpolicy"],
              ["FAQs", "/faq"],
              ["Support", "/support"],
            ].map(([label, link]) => (
              <li key={link}>
                <Link
                  to={link}
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-400 transition">Dog Grooming</li>
            <li className="hover:text-orange-400 transition">Cat Grooming</li>
            <li className="hover:text-orange-400 transition">Vet Consultations</li>
            <li className="hover:text-orange-400 transition">Pet Spa at Home</li>
            <li className="hover:text-orange-400 transition">Pet Pickup Service</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">📧 support@petlinc.com</p>
          <p className="text-sm text-gray-400 mt-1">📞 +91-9876543210</p>

          <div className="flex gap-4 mt-5">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition transform hover:scale-110"
            >
              🐦
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition transform hover:scale-110"
            >
              📘
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition transform hover:scale-110"
            >
              📸
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 mt-12 border-t border-gray-800 pt-6 text-center">
        <p className="text-sm text-gray-500">
          © 2025 <span className="text-orange-400 font-medium">Petlinc</span>. All rights reserved.
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Made with 🧡 by the Petlinc Team
        </p>
      </div>
    </footer>
  );
}