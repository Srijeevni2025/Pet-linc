export default function CustomerPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/60 to-white pb-20">
      {/* PAGE HEADER */}
      <section className="py-20 text-center relative">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/paw-pattern.png')] bg-repeat"></div>

        <div className="relative max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Customer <span className="text-orange-600">Policies</span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Clear, transparent, and pet-friendly policies designed to ensure
            safety, trust, and the best grooming experience for your furry
            family member.
          </p>
        </div>
      </section>

      {/* POLICY SECTIONS */}
      <div className="max-w-5xl mx-auto px-6 space-y-12">

        {/* SAFETY & HANDLING */}
        <section className="bg-white p-8 rounded-3xl shadow border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Pet Safety & Handling
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your pet’s safety is our highest priority. Our groomers follow strict
            handling guidelines to ensure a comfortable and stress-free
            experience.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 list-disc ml-5">
            <li>No forceful grooming methods are ever used.</li>
            <li>Groomers may stop the session if the pet shows signs of stress.</li>
            <li>Anxiety, aggression, or health concerns must be disclosed before booking.</li>
            <li>Senior pets or medically sensitive pets require prior approval.</li>
          </ul>
        </section>

        {/* CANCELLATION & REFUNDS */}
        <section className="bg-white p-8 rounded-3xl shadow border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Cancellation & Rescheduling
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We understand things change! Our flexible cancellation policy ensures
            smooth scheduling for customers and groomers.
          </p>

          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <strong>• Free Cancellation:</strong> Up to 2 hours before the session.
            </p>
            <p>
              <strong>• Late Cancellation Fee:</strong> 50% of service amount (within 2 hours).
            </p>
            <p>
              <strong>• Groomer Arrival:</strong> If groomer reaches the location and customer cancels, full fee applies.
            </p>
            <p>
              <strong>• Rescheduling:</strong> Allowed once without charge.
            </p>
          </div>
        </section>

        {/* HEALTH & HYGIENE */}
        <section className="bg-white p-8 rounded-3xl shadow border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Health & Hygiene Requirements
          </h2>

          <p className="text-gray-600 leading-relaxed">
            For a safe grooming environment, we require all pets to meet basic
            health conditions.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 list-disc ml-5">
            <li>Pups must be at least 3 months old.</li>
            <li>No open wounds, active infections, or contagious diseases.</li>
            <li>Tick & flea infestations require add-on treatment before grooming.</li>
            <li>Vaccination status should be up to date.</li>
          </ul>
        </section>

        {/* AGGRESSION & BEHAVIOR */}
        <section className="bg-white p-8 rounded-3xl shadow border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Aggressive or Difficult Behavior
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Some pets may show increased aggression or anxiety during grooming.
            For everyone's safety, we have clear guidelines.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 list-disc ml-5">
            <li>Aggressive pets may require a muzzle or two-groomer support.</li>
            <li>If grooming becomes unsafe, the session may be stopped.</li>
            <li>Partial charges may apply depending on completed work.</li>
            <li>Customers must accurately mention aggression levels during booking.</li>
          </ul>
        </section>

        {/* CUSTOMER RESPONSIBILITIES */}
        <section className="bg-white p-8 rounded-3xl shadow border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. Customer Responsibilities
          </h2>

          <ul className="mt-4 space-y-3 text-gray-700 list-disc ml-5">
            <li>Provide a clean, safe, well-lit space for grooming.</li>
            <li>Ensure water supply, electricity, and basic requirements.</li>
            <li>Pet parents or guardians must be present during the session.</li>
            <li>
              Customer should provide essentials like:
              <ul className="list-disc ml-6 mt-1 text-gray-600">
                <li>Towel</li>
                <li>Toothbrush (if required)</li>
                <li>Bucket and Mug</li>
                <li>Preferred shampoo (optional)</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* PAYMENT POLICY */}
        <section className="bg-white p-8 rounded-3xl shadow border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Payment & Pricing
          </h2>

          <p className="text-gray-600">
            Transparent pricing is part of our promise. No hidden fees.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 list-disc ml-5">
            <li>Full payment is required at the end of the session.</li>
            <li>Prices vary based on breed, size, coat type, and behavior.</li>
            <li>Add-ons must be selected during booking or before session start.</li>
            <li>Discounts apply only if valid coupon codes are used during booking.</li>
          </ul>
        </section>

        {/* TERMINATION POLICY */}
        <section className="bg-white p-8 rounded-3xl shadow border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            7. Service Refusal Rights
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Our groomers may refuse or discontinue service if:
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 list-disc ml-5">
            <li>The pet is overly aggressive or uncontrollable.</li>
            <li>Health conditions make grooming unsafe.</li>
            <li>Unsanitary or unsafe grooming environment.</li>
            <li>Misrepresentation of pet details or behavior.</li>
          </ul>
        </section>

        {/* PRIVACY POLICY */}
        <section className="bg-white p-8 rounded-3xl shadow border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. Privacy & Data Protection
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Petlinc respects your privacy. Your contact details, pet information,
            and booking history are securely stored and never shared with third
            parties without consent.
          </p>
        </section>

        {/* FINAL NOTE */}
        <section className="bg-white p-8 rounded-3xl shadow border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            9. Our Commitment
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At Petlinc, we exist to serve pets with love, care, and professional
            grooming excellence. Our policies ensure a safe and enjoyable
            experience for both pets and parents.
          </p>
        </section>
      </div>
    </div>
  );
}
