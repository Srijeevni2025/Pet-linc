import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-orange-50 to-white">
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <div className="inline-flex items-center justify-center bg-orange-100 w-16 h-16 rounded-full mb-4">
            <PawPrint className="text-orange-600 w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Premium Pet Grooming at Home 🐶✨
          </h1>
          <p className="text-gray-600 mb-6 max-w-xl">Trusted professionals, safe products, and flexible slots — we come to you.</p>
          <div className="flex gap-3">
            <Link to="/packages" className="px-6 py-3 bg-petOrange text-white rounded-full font-medium">Book a Grooming</Link>
            <Link to="/packages" className="px-6 py-3 border border-orange-200 rounded-full text-sm">View Packages</Link>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl p-6 shadow-md border border-orange-100">
          <h3 className="text-lg font-semibold mb-3">Check availability in your area</h3>
          <div className="flex gap-2">
            <input placeholder="Enter pincode — e.g. 221002" className="flex-1 px-4 py-2 border rounded-lg outline-none" />
            <Link to="/packages" className="px-4 py-2 bg-petOrange text-white rounded-lg">Check</Link>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <strong>Why Petlinc?</strong>
            <ul className="mt-2 list-disc list-inside">
              <li>Verified groomers assigned to your home</li>
              <li>Premium products & safety-first approach</li>
              <li>Subscription plans for repeat care</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Packages preview */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* three preview cards (simple) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
            <div className="text-3xl mb-3">🛁</div>
            <h3 className="font-bold text-lg">Basic Hygiene</h3>
            <p className="text-sm text-gray-600 mt-2">Bathing, nail trim, ear clean.</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-gray-900 font-semibold">From ₹499</div>
              <Link to="/packages" className="text-petOrange text-sm">Select</Link>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
            <div className="text-3xl mb-3">✂️</div>
            <h3 className="font-bold text-lg">Standard Groom</h3>
            <p className="text-sm text-gray-600 mt-2">Bath, trim, teeth clean.</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-gray-900 font-semibold">From ₹899</div>
              <Link to="/packages" className="text-petOrange text-sm">Select</Link>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
            <div className="text-3xl mb-3">💆‍♂️</div>
            <h3 className="font-bold text-lg">Premium Spa</h3>
            <p className="text-sm text-gray-600 mt-2">Full spa, styling, anti-tick.</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-gray-900 font-semibold">From ₹1,299</div>
              <Link to="/packages" className="text-petOrange text-sm">Select</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
