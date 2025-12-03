import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PRICES = {
  basic: { small: 499, medium: 599, large: 699, cat: 699 },
  standard: { small: 899, medium: 999, large: 1199, cat: 1099 },
  premium: { small: 1299, medium: 1499, large: 1699, cat: 1599 },
};

const PACKAGES = [
  {
    id: "basic",
    name: "Basic Hygiene",
    emoji: "🛁",
    items: ["Bathing", "Nail trim", "Ear clean"],
  },
  {
    id: "standard",
    name: "Standard Groom",
    emoji: "✂️",
    items: ["Bathing", "Full trim", "Teeth clean"],
  },
  {
    id: "premium",
    name: "Premium Spa",
    emoji: "💆‍♂️",
    items: ["Aroma bath", "Styling", "Anti-tick"],
  },
];

export default function Packages() {
  const [size, setSize] = useState("medium");
  const navigate = useNavigate();

  function handleBook(pkgId) {
    // pass booking details via state or localStorage
    navigate("/book", { state: { pkgId, size } });
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Choose a package</h1>
        <p className="text-gray-600 mt-2">Select your pet size to see real price.</p>

        <div className="inline-flex mt-4 bg-white border rounded-full overflow-hidden">
          {["small", "medium", "large", "cat"].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-4 py-2 text-sm font-medium transition ${
                size === s ? "bg-petOrange text-white" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PACKAGES.map((p) => (
          <div key={p.id} className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="text-4xl">{p.emoji}</div>
            <h3 className="font-bold text-lg mt-3">{p.name}</h3>
            <ul className="mt-3 text-sm text-gray-600 space-y-1">
              {p.items.map((it) => (
                <li key={it}>• {it}</li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Starting at</div>
                <div className="text-2xl font-bold">₹{PRICES[p.id][size]}</div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleBook(p.id)}
                  className="px-4 py-2 bg-petOrange text-white rounded-full"
                >
                  Book Now
                </button>
                <Link to="/packages" className="text-sm text-gray-500 text-right">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
