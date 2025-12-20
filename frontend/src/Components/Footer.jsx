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
            
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">📧 info@petlinc.in</p>
          <p className="text-sm text-gray-400 mt-1">📞 <a href = "tel:+91-9674127485" className="footer-phone">+91 9674127485</a></p>

          <div className="flex gap-4 mt-5">
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition transform hover:scale-110"
            >
              🐦
            </a> */}
            <a
              href="https://www.facebook.com/profile.php?id=61581035999304"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition transform hover:scale-110"
            >
            <img src = "/facebook_icon.png"/>
            </a>
            <a
              href="https://www.instagram.com/petlinc.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition transform hover:scale-110"
            >
            <img src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABOFBMVEVHcExxF/13F/1zFf2AFv2MCu+iBOmyAuLEAd7SANraBMzwHpedI+XeANfmANHmAr+PF/6fD/vxAL7qArV7GP21FvnRVurnZ+P2Z9roQeDzGtXzB8v7AqvWiPn+7fn////7ftv/A7z0BKH3v/H+3fT+ruj+AJr/9/r/RcD/bMDKFff/Bo3iG+r8GrX/AIH+H5r/yeP+BHj/t9n/V5r+Am7+H37+BGT/ssX/Imz/RXv/ucz+e4z+JFT/XI3/MGL+LUf/u7f/yc7/Alr+OUf+MSz+QzT+R0T+iHD+SRj+VzH+WQX+AkL+c2L/0sT+aCX+cBL/7+j+aQL+eRv/oUX/fwL+iBD/wXz+jgD/3rr/1rn+dgz+nAP9FpT+lw7+qgH+tQD+vQD/w1f9kwf/xAD9PFn9ogj/ywD9uAfgLZLBAAAAaHRSTlMAW9H+////////xEsC///N////zFz/////////////////uP////7///////////7////////////////////////////////////////////////////////F/7VQ///+/87/vsj/uqL0GQwAAAHcSURBVHgBRMlFehwxEEDhV1VS04yZ7U04m+AmcBjfLLscJ4xLHyA0YGqSlJ7P9MT6BRC52EEQuDjlFITx2eWvXJsDQWYIKgJj4VQW5gBJAg75K5vTgZDTFUEu/kUEzqGaiC6DMBbhpqQyoyKTNYD1Hp+Ui6J0ZH1HhXNA0RfzyRIZl5WprroK3BZwwvx0aUGdB87HCIN5VBUVP9i468ZLxWLv+pg6vJmDaSiSW2eyIRNg84/HxfVJmTD3DxFWGmWjrosRpxMNGr3iIqYbG7IGK5lKvZE3jVuTynsDzHRoD3xpxaTQvIKumGBWgCouM9bPKEisJg0VTV4X0aBqQEuXQ2kGlmVmZCtgCoxBJfeAz0b8NQbWI7wOAKCZMgbn9E6tItG1HFTKRQ4jgSYpiiPu6BFJW1fW9J7oDFWWgpf0MH09YnB6yIEYnIJhLhqkpw3aC4OuUJ4QlDzX55/Um5m4Ue6dmXr59LwkBM0xy/ieVNV7zSSTZMU3fs8UNBomr+v3jQx5X1XmB7tdgnNu1JqDl+0nbnp+HpLp+WM5bB0mIMJFc/ouSgjd+U99O1qYONOhFEMonPcZCZ6eGp9eRcSwhWkSRCIxKnfeIMBh1WRcFOhTaENo/096OTA7AACDzKODDThakgAAAABJRU5ErkJggg=="/>
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