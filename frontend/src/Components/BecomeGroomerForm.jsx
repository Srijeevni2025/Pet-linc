import { Scissors, Wallet, Clock, ShieldCheck, Star } from "lucide-react";
import { useState } from "react";

export default function BecomePartner() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    experience: "",
    services: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/70 to-white pb-28">
      {/* HERO */}
      <section className="relative text-center py-24">
        <div className="absolute inset-0 bg-[url('/paw-pattern.png')] opacity-[0.05] bg-repeat"></div>

        <div className="relative max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Become a <span className="text-orange-600">Petlinc Groomer</span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Join the fastest-growing grooming network and get access to more
            clients, flexible schedules, and industry-leading support.
          </p>

          <div className="mt-6 inline-block px-6 py-3 bg-white rounded-full shadow-md border text-orange-600 font-semibold">
            🚀 Join 200+ Groomers Already Earning with Petlinc
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Why Partner With Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <Wallet className="w-7 h-7 text-orange-600" />,
              title: "Earn More",
              desc: "Transparent payouts, quick settlements, and high earning potential per session.",
            },
            {
              icon: <Clock className="w-7 h-7 text-orange-600" />,
              title: "Work on Your Time",
              desc: "Take bookings that fit your personal schedule. Total freedom, zero pressure.",
            },
            {
              icon: <Scissors className="w-7 h-7 text-orange-600" />,
              title: "Grow Professionally",
              desc: "Get more exposure, build your grooming reputation, and expand your clientele.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-orange-100 shadow-sm hover:shadow-lg transition"
            >
              <div className="bg-orange-50 p-4 rounded-2xl inline-flex">
                {item.icon}
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EARNINGS HIGHLIGHT */}
      <section className="max-w-5xl mx-auto px-6 mt-20 text-center">
        <div className="bg-orange-600 text-white p-10 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-extrabold">How Much Can You Earn?</h2>
          <p className="mt-3 text-orange-100 text-lg max-w-2xl mx-auto">
            Groomers earn anywhere between <strong>₹20,000 to ₹90,000+</strong> per month, 
            depending on experience, service quality, and number of bookings.
          </p>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Requirements to Join
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[
            "Basic grooming experience (min. 6 months preferred)",
            "Valid ID proof (Aadhar / PAN)",
            "Professional tools (scissors, clipper, brushes, dryers)",
            "A friendly and pet-loving attitude",
          ].map((r, i) => (
            <div
              key={i}
              className="bg-white p-6 border rounded-2xl shadow-sm flex items-start gap-3"
            >
              <ShieldCheck className="w-6 h-6 text-orange-600 shrink-0" />
              <p className="text-gray-700">{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="max-w-6xl mx-auto px-6 mt-20 text-center">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["4.9 ★", "Average Groomer Rating"],
            ["200+", "Active Petlinc Groomers"],
            ["15,000+", "Happy Pets Groomed"],
          ].map(([num, label], i) => (
            <div
              key={i}
              className="bg-white p-8 border rounded-3xl shadow-sm"
            >
              <h3 className="text-4xl font-extrabold text-orange-600">
                {num}
              </h3>
              <p className="text-gray-700 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNER FORM */}
      <section className="max-w-5xl mx-auto px-6 mt-24">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Apply to Become a Petlinc Partner
        </h2>

        <div className="bg-white p-10 rounded-3xl border shadow-lg space-y-6">
          <div className="grid md:grid-cols-2 gap-6 ">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"

              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"

              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              type="text"
              placeholder="City"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"

              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />

            <input
              type="text"
              placeholder="Years of Experience"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"

              value={form.experience}
              onChange={(e) =>
                setForm({ ...form, experience: e.target.value })
              }
            />
          </div>

          <textarea
            placeholder="What grooming services do you offer?"
            rows={4}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"

            value={form.services}
            onChange={(e) => setForm({ ...form, services: e.target.value })}
          ></textarea>

          <textarea
            placeholder="Tell us a little about yourself…"
            rows={4}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"

            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>

          <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition">
            Submit Application
          </button>
        </div>
      </section>
    </div>
  );
}
