// CustomerDrawer.jsx
import { useMemo } from "react";

const statusColors = {
  completed:  { bg: "#E1F5EE", text: "#085041" },
  confirmed:  { bg: "#EEEDFE", text: "#534AB7" },
  pending:    { bg: "#FAEEDA", text: "#633806" },
  cancelled:  { bg: "#FCEBEB", text: "#A32D2D" },
  on_the_way: { bg: "#FAEEDA", text: "#633806" },
};

export default function CustomerDrawer({ customer, allBookings, onClose }) {
  if (!customer) return null;

  const customerBookings = useMemo(() =>
    allBookings
      .filter(b => b.userId?._id === customer._id || b.userId === customer._id)
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [allBookings, customer]
  );

  const totalSpend = customerBookings
    .filter(b => b.status === "completed")
    .reduce((s, b) => s + ((b.bookingMarkedPrice || 0) - (b.discount || 0)), 0);

  const aov = customerBookings.filter(b => b.status === "completed").length
    ? Math.round(totalSpend / customerBookings.filter(b => b.status === "completed").length)
    : 0;

  const lastBooking = customerBookings[0];
  const daysSinceLast = lastBooking
    ? Math.floor((Date.now() - new Date(lastBooking.date)) / 86400000)
    : null;

  // Unique pets
  const pets = [...new Map(customerBookings.map(b => [b.petName, { name: b.petName, breed: b.breed }])).values()];

  // At-risk: 2+ bookings, last was 45+ days ago
  const isAtRisk = customerBookings.length >= 2 && daysSinceLast !== null && daysSinceLast >= 45;

  // Customer tier
  const tier = customerBookings.filter(b => b.status === "completed").length >= 5 ? "Loyal"
    : customerBookings.filter(b => b.status === "completed").length >= 2 ? "Regular"
    : "New";
  const tierColor = { Loyal: { bg: "#E1F5EE", text: "#085041" }, Regular: { bg: "#EEEDFE", text: "#534AB7" }, New: { bg: "#F1EFE8", text: "#5F5E5A" } }[tier];

  const waLink = (msg) =>
    `https://wa.me/91${customer.mobile || customer.phone}?text=${encodeURIComponent(msg)}`;

  const reminderMsg = `Hi ${customer.name?.split(" ")[0]}, it's been a while! Time to treat ${pets[0]?.name || "your pet"} to a grooming session. Book now on Petlinc 🐾`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-xl bg-white h-full shadow-xl overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}>

        {/* Top */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-lg flex-shrink-0">
            {customer.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-800 text-base">{customer.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: tierColor.bg, color: tierColor.text }}>{tier}</span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5 truncate">{customer.email}</p>
            <p className="text-xs text-slate-400 mt-0.5">{customer.city} · Customer since {new Date(customer.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {(customer.mobile || customer.phone) && (
              <a href={waLink(`Hi ${customer.name?.split(" ")[0]}!`)}
                target="_blank" rel="noreferrer"
                className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-semibold transition">
                WhatsApp
              </a>
            )}
            <button onClick={onClose}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs text-slate-600 transition">
              Close
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 border-b border-slate-100">
          {[
            { label: "Bookings",   value: customerBookings.length },
            { label: "Total spend", value: `₹${totalSpend.toLocaleString()}` },
            { label: "Avg order",  value: `₹${aov.toLocaleString()}` },
            { label: "Last visit", value: daysSinceLast !== null ? `${daysSinceLast}d ago` : "—" },
          ].map(s => (
            <div key={s.label} className="px-4 py-3 border-r border-slate-100 last:border-r-0">
              <p className="text-xs text-slate-400">{s.label}</p>
              <p className="font-semibold text-slate-800 mt-0.5 text-sm">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Pets */}
        {pets.length > 0 && (
          <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 mr-1">Pets:</span>
            {pets.map(p => (
              <span key={p.name} className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full">
                {p.name}{p.breed ? ` · ${p.breed}` : ""}
              </span>
            ))}
          </div>
        )}

        {/* At-risk banner */}
        {isAtRisk && (
          <div className="mx-5 mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-sm text-amber-800">
              Last grooming was <strong>{daysSinceLast} days ago</strong> — typically books every ~30 days. Consider sending a reminder.
            </p>
            <a href={waLink(reminderMsg)} target="_blank" rel="noreferrer"
              className="inline-block mt-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition">
              Send WhatsApp reminder
            </a>
          </div>
        )}

        {/* Booking history */}
        <div className="px-5 pt-4 pb-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Booking history</p>
        </div>
        <div className="flex-1">
          {customerBookings.length === 0 ? (
            <p className="px-5 py-8 text-sm text-slate-400 text-center">No bookings found.</p>
          ) : (
            customerBookings.map((b, i) => {
              const c = statusColors[b.status] || { bg: "#F1EFE8", text: "#5F5E5A" };
              return (
                <div key={b._id} className={`px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-3 ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">
                      {b.productId?.name || "Grooming"} — {b.petName}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {b.timeSlot}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 flex-shrink-0">
                    ₹{((b.bookingMarkedPrice || 0) - (b.discount || 0)).toLocaleString()}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                    style={{ background: c.bg, color: c.text }}>
                    {b.status || "pending"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}