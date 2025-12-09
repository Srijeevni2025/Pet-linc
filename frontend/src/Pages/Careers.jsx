export default function Careers() {
  const jobs = [
    {
      role: "Senior Pet Groomer",
      type: "Full-Time",
      location: "Kolkata • On-site",
      desc: "Lead grooming sessions, mentor junior groomers, and ensure safe, compassionate pet handling.",
    },
    {
      role: "Customer Experience Associate",
      type: "Full-Time",
      location: "Remote / Hybrid",
      desc: "Assist pet parents, resolve queries, schedule bookings, and maintain delightful user experience.",
    },
    {
      role: "Operations Coordinator",
      type: "Full-Time",
      location: "Kolkata • On-site",
      desc: "Manage grooming assignments, coordinate groomers, and ensure smooth daily operations.",
    },
    {
      role: "Grooming Assistant / Trainee",
      type: "Part-Time",
      location: "Multiple Locations",
      desc: "Learn grooming under experts while ensuring a safe environment for pets.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/70 to-white pb-24">
      {/* HERO */}
      <section className="relative py-24 text-center">
        <div className="absolute inset-0 bg-[url('/paw-pattern.png')] opacity-[0.04] bg-repeat"></div>

        <div className="relative max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.2]">
            Build a Career Filled With
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Purpose, Care & Impact
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            At Petlinc, we’re not just grooming pets — we’re building a movement
            where compassion meets excellence. Join a team that loves animals,
            values people, and believes in creating meaningful experiences.
          </p>
        </div>
      </section>

      {/* WHY WORK HERE */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Why Work at Petlinc?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              emoji: "❤️",
              title: "Make a Real Difference",
              desc: "Every day, your work brings comfort, joy, and safety to pets and their families.",
            },
            {
              emoji: "📈",
              title: "Grow With a Fast-Rising Brand",
              desc: "Be part of an expanding platform that’s shaping the future of home pet care.",
            },
            {
              emoji: "🤝",
              title: "Work With Compassion",
              desc: "We celebrate kindness, patience, and empathy — with pets and people alike.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-orange-100 shadow hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CULTURE */}
      <section className="max-w-6xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Our Culture
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            We’re a team of dreamers, doers, and animal lovers. At Petlinc,
            everyone’s voice matters — from senior groomers to new trainees.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            We work with empathy, celebrate small wins, encourage creativity,
            and constantly learn from each pet we meet. This is a place where
            you grow as a professional and as a human.
          </p>
        </div>

        <div className="relative">
          <img
            src="/team-pets.png"
            alt="Team culture"
            className="rounded-3xl shadow-2xl w-full"
          />
          <div className="absolute inset-0 rounded-3xl bg-orange-200/20 blur-2xl"></div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-6xl mx-auto px-6 mt-24">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
          Benefits & Perks
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["Flexible Work Hours", "Manage your schedule with ease."],
            ["Training & Certification", "Learn from experts and grow your career."],
            ["Performance Incentives", "Earn extra for delivering great work."],
            ["Pet-Friendly Environment", "Work around adorable pets every day."],
            ["Career Growth Path", "Clear roles, growth plans, and mentorship."],
            ["Supportive Team", "Work with kind and passionate teammates."],
          ].map(([title, desc], i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-2xl border shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOB OPENINGS */}
      <section className="max-w-6xl mx-auto px-6 mt-24">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Current Openings
        </h2>

        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border shadow hover:shadow-xl transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {job.role}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                </div>

                <span className="px-4 py-1 text-xs bg-orange-100 text-orange-700 font-medium rounded-full">
                  {job.type}
                </span>
              </div>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {job.desc}
              </p>

              <button className="mt-5 px-5 py-2 bg-orange-600 text-white rounded-xl font-medium text-sm hover:bg-orange-700 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-24 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Join a team that cares — deeply.
        </h2>
        <p className="mt-3 text-gray-600 text-lg">
          Your next chapter in pet care starts here.
        </p>

        <button className="mt-6 px-8 py-4 bg-orange-600 text-white font-semibold rounded-2xl shadow hover:bg-orange-700 transition">
          Explore All Roles
        </button>
      </section>
    </div>
  );
}
