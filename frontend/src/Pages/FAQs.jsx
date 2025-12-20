import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What grooming services does Petlinc offer?",
      a: "We provide full-service pet grooming including bathing, hair trimming, nail clipping, ear cleaning, de-shedding, tick & flea treatments, and breed-specific haircuts. Add-ons can be customized during booking."
    },
    {
      q: "Do I need to provide anything for the grooming session?",
      a: "Yes — a clean towel, a bucket of warm water, and a toothbrush (if oral care is selected). Our groomers bring all professional grooming tools and products."
    },
    {
      q: "Is grooming safe for anxious or aggressive pets?",
      a: "Absolutely. Our groomers are trained to handle anxious, reactive, or aggressive pets. However, sessions may be paused or stopped if grooming becomes unsafe for the pet or groomer."
    },
    {
      q: "How long does a grooming session take?",
      a: "A typical grooming session takes 45–90 minutes depending on the pet’s size, breed, coat condition, and behavior."
    },
    {
      q: "Do you offer grooming for cats?",
      a: "Yes! We provide gentle, cat-friendly grooming with soft-handling techniques specifically designed for felines."
    },
    {
      q: "Can I cancel or reschedule my appointment?",
      a: "Yes, cancellations made at least 2 hours before the appointment are free. Late cancellations may incur charges. Rescheduling is allowed once at no cost."
    },
    {
      q: "Are your products safe for pets?",
      a: "100%. We use vet-approved, hypoallergenic, and pet-safe shampoos, conditioners, and grooming tools."
    },
    {
      q: "Is there a coupon code or discount available?",
      a: "Yes! Seasonal and first-time customer discounts may be available. Apply your coupon code during Step 3 of the booking process."
    },
    {
      q: "Do groomers clean up after the session?",
      a: "Yes — we tidy up the grooming area, remove hair, and leave the space clean and organized."
    },
    {
      q: "How do I track my booking status?",
      a: "You can view all bookings, status updates, and details in the 'My Bookings' section of your Petlinc dashboard."
    }
  ];

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/60 to-white pb-20">
      {/* HEADER */}
      <section className="py-20 text-center relative">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/paw-pattern.png')] bg-repeat"></div>

        <div className="relative max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Frequently Asked <span className="text-orange-600">Questions</span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Everything you need to know about grooming, safety, scheduling, and
            your pet’s comfort — all in one place.
          </p>
        </div>
      </section>

      {/* FAQ LIST */}
      <div className="max-w-4xl mx-auto px-6 space-y-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl shadow-sm overflow-hidden transition"
          >
            {/* QUESTION */}
            <button
              onClick={() => toggleFAQ(i)}
              className="w-full flex justify-between items-center py-5 px-6 text-left"
            >
              <span className="text-lg font-semibold text-gray-800">
                {item.q}
              </span>

              <ChevronDown
                className={`w-6 h-6 text-gray-500 transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* ANSWER */}
            <div
              className={`px-6 pb-5 text-gray-600 leading-relaxed transition-all duration-300 ${
                openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {item.a}
            </div>
          </div>
        ))}
      </div>

      {/* STILL HAVE QUESTIONS */}
      <div className="text-center mt-16 px-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Still have questions?
        </h3>
        <p className="text-gray-600 mt-1">
          Our support team is here to help you 7 days a week.
        </p>
        <a
          href="mailto:info@petlinc.in"
          className="inline-block mt-4 px-6 py-3 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700 transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
