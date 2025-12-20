import { Mail, Phone, MessageCircle, AlertTriangle, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/70 to-white pb-24">
      {/* HERO */}
      <section className="py-20 text-center relative">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/paw-pattern.png')] bg-repeat"></div>

        <div className="relative max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            We’re Here to Help  
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Anytime You Need Us
            </span>
          </h1>

          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Whether you have questions, concerns, or need quick assistance — our support team is always here for you and your pet.
          </p>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 mt-10">
        {/* CALL SUPPORT */}
        <div className="bg-white p-8 rounded-3xl border shadow hover:shadow-lg transition flex items-start gap-5">
          <div className="bg-orange-100 p-4 rounded-2xl">
            <Phone className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Call Support</h3>
            <p className="text-gray-600 mt-1 leading-relaxed">
              Speak to a real human — we love helping pet parents.
            </p>
            <p className="mt-2 font-semibold text-orange-600 text-lg">
              +91 9674127485
            </p>
          </div>
        </div>

        {/* WHATSAPP SUPPORT */}
        {/* <div className="bg-white p-8 rounded-3xl border shadow hover:shadow-lg transition flex items-start gap-5">
          <div className="bg-green-100 p-4 rounded-2xl">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">WhatsApp Support</h3>
            <p className="text-gray-600 mt-1 leading-relaxed">
              Fast replies for quick questions, bookings, and updates.
            </p>
            <p className="mt-2 font-semibold text-green-600 text-lg">
              +91 9674127485
            </p>
          </div>
        </div> */}

        {/* EMAIL SUPPORT */}
        <div className="bg-white p-8 rounded-3xl border shadow hover:shadow-lg transition flex items-start gap-5">
          <div className="bg-blue-100 p-4 rounded-2xl">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Email Support</h3>
            <p className="text-gray-600 mt-1 leading-relaxed">
              For detailed queries, feedback, or attachments.
            </p>
            <p className="mt-2 font-semibold text-blue-600 text-lg">
              info@petlinc.in
            </p>
          </div>
        </div>

        {/* EMERGENCY CARE */}
        {/* <div className="bg-white p-8 rounded-3xl border shadow hover:shadow-lg transition flex items-start gap-5">
          <div className="bg-red-100 p-4 rounded-2xl">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Emergency Support</h3>
            <p className="text-gray-600 mt-1 leading-relaxed">
              For incidents during grooming sessions only.
            </p>
            <p className="mt-2 font-semibold text-red-600 text-lg">
              +91 91111 22222
            </p>
          </div>
        </div> */}
      </section>

      {/* QUICK LINKS */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Quick Help
        </h2>

        <div className="space-y-4">
          {[
            ["How to book a grooming session?", "/faq"],
            ["Cancellation & Refund Policy", "/customerpolicy"],
            ["Groomer Safety & Behaviour Guidelines", "/faq"],
            ["Understanding Add-ons & Pricing", "/faq"],
            ["Track My Bookings", "/my-bookings"],
          ].map(([title, link], idx) => (
            <a
              key={idx}
              href={link}
              className="flex items-center justify-between bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transition"
            >
              <span className="text-gray-800 font-medium">{title}</span>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </a>
          ))}
        </div>
      </section>

      {/* SUPPORT HOURS */}
      <section className="max-w-4xl mx-auto px-6 mt-24 text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">
          Support Hours
        </h2>
        <p className="text-gray-600 mt-2">
          Monday – Sunday (including holidays)
        </p>
        <p className="text-gray-900 font-semibold text-lg mt-1">
          8:00 AM – 10:00 PM
        </p>
      </section>

      {/* TICKET FORM */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">
          Submit a Support Ticket
        </h2>

        <div className="bg-white p-8 rounded-3xl border shadow-lg space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="text"
            placeholder="Issue Title"
            className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
            value={form.issue}
            onChange={(e) => setForm({ ...form, issue: e.target.value })}
          />

          <textarea
            rows={4}
            placeholder="Describe your issue in detail..."
            className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>

          <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition">
            Submit Ticket
          </button>
        </div>
      </section>
    </div>
  );
}
