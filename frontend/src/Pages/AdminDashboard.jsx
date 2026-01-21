// // pages/AdminDashboard.jsx
// import { useQuery } from "@tanstack/react-query";
// import { GetAllBookingsForDashboard } from "../Features/Booking/queryFunction";


// export default function AdminDashboard() {
//   const { data: bookings = [], isPending } = useQuery({
//     queryKey: ["bookings"],
//     queryFn: GetAllBookingsForDashboard,
//   });

//   if (isPending) {
//     return (
//       <div className="min-h-screen bg-[#0b0f14] flex items-center justify-center text-gray-400">
//         Loading bookings…
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0b0f14] p-6 text-gray-200">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold">Admin · Bookings</h1>
//         <p className="text-sm text-gray-400">
//           Complete operational view of Petlinc bookings
//         </p>
//       </div>

//       {/* Stats Row */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <StatCard title="Total Bookings" value={bookings.length} />
//         <StatCard title="Pending" value={bookings.filter(b => b.status === "pending").length} />
//         <StatCard title="Completed" value={bookings.filter(b => b.status === "completed").length} />
//         <StatCard
//           title="Revenue"
//           value={`₹${bookings.reduce((a, b) => a + (b.totalAmount || 0), 0)}`}
//         />
//       </div>

//       {/* Table Card */}
//       <div className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
//         <div className="px-4 py-3 border-b border-[#1f2937]">
//           <h2 className="font-medium">All Bookings</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-[#0f172a] text-gray-400">
//               <tr>
//                 <th className="px-4 py-3 text-left">Booking ID</th>
//                 <th className="px-4 py-3 text-left">User</th>
//                 <th className="px-4 py-3 text-left">Pet</th>
//                 <th className="px-4 py-3 text-left">Package</th>
//                 <th className="px-4 py-3 text-left">Amount</th>
//                 <th className="px-4 py-3 text-left">Status</th>
//                 <th className="px-4 py-3 text-left">Created</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-[#1f2937]">
//               {bookings?.map((b) => (
//                 <tr key={b._id} className="hover:bg-[#0f172a] transition">
//                   <td className="px-4 py-3 font-mono text-xs text-gray-400">
//                     {b._id.slice(-8)}
//                   </td>

//                   <td className="px-4 py-3">
//                     <div className="font-medium">{b.userId?.name}</div>
//                     <div className="text-xs text-gray-400">{b.userId?.email}</div>
//                   </td>

//                   <td className="px-4 py-3">
//                     {b.petName}
//                     <span className="text-gray-400 text-xs">
//                       {" "}({b.petType})
//                     </span>
//                   </td>

//                   <td className="px-4 py-3">
//                     {b.productId?.name}
//                   </td>

//                   <td className="px-4 py-3 font-medium">
//                     ₹{b.bookingMarkedPrice - b.discount}
//                   </td>

//                   <td className="px-4 py-3">
//                     <StatusPill status={b.status} />
//                   </td>

//                   <td className="px-4 py-3 text-xs text-gray-400">
//                     {new Date(b.createdAt).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- Components ---------------- */

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4">
//       <p className="text-xs text-gray-400">{title}</p>
//       <p className="text-xl font-semibold mt-1">{value}</p>
//     </div>
//   );
// }

// function StatusPill({ status }) {
//   const map = {
//     pending: "bg-yellow-500/10 text-yellow-400",
//     confirmed: "bg-blue-500/10 text-blue-400",
//     completed: "bg-green-500/10 text-green-400",
//     cancelled: "bg-red-500/10 text-red-400",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-medium ${
//         map[status] || "bg-gray-500/10 text-gray-400"
//       }`}
//     >
//       {status}
//     </span>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GetAllBookingsForDashboard } from "../Features/Booking/queryFunction";

export default function AdminDashboard() {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data: bookings = [], isPending } = useQuery({
    queryKey: ["bookings"],
    queryFn: GetAllBookingsForDashboard,
  });

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#0b0f14] flex items-center justify-center text-gray-400">
        Loading bookings…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f14] p-6 text-gray-200">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Admin · Bookings</h1>
        <p className="text-sm text-gray-400">
          Complete operational view of Petlinc bookings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Bookings" value={bookings.length} />
        <StatCard
          title="Revenue"
          value={`₹${bookings.reduce(
            (sum, b) => sum + Number(b.bookingMarkedPrice || 0) - Number(b.discount || 0),
            0
          )}`}
        />
        <StatCard
          title="With Add-ons"
          value={bookings.filter(b => b.addons?.length > 0).length}
        />
        <StatCard
          title="Aggressive Pets"
          value={bookings.filter(b => b.aggression === "1").length}
        />
      </div>

      {/* Table */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[#1f2937]">
          <h2 className="font-medium">All Bookings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#0f172a] text-gray-400">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Pet</th>
                <th className="px-4 py-3 text-left">Package</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Slot</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#1f2937]">
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-[#0f172a] transition">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">
                    {b._id.slice(-6)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-medium">{b.userId?.name}</div>
                    <div className="text-xs text-gray-400">{b.userId?.email}</div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-medium">{b.petName}</div>
                    <div className="text-xs text-gray-400">
                      {b.petType} · {b.breed}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {b.productId?.name}
                  </td>

                  <td className="px-4 py-3 font-medium">
                    ₹{b.bookingMarkedPrice - b.discount}
                  </td>

                  <td className="px-4 py-3">
                    <div>{b.timeSlot}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(b.date).toDateString()}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="text-blue-400 hover:text-blue-300 text-xs font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over */}
      {selectedBooking && (
        <BookingDrawer
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value }) {
  return (
    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function BookingDrawer({ booking, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/60" onClick={onClose} />
      <div className="w-full max-w-xl bg-[#0b0f14] border-l border-[#1f2937] p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Booking Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            ✕
          </button>
        </div>

        <DetailSection title="Customer">
          <Detail label="Name" value={booking.userId?.name} />
          <Detail label="Email" value={booking.userId?.email} />
          <Detail label="Mobile" value={booking.mobile} />
          <Detail label="Address" value={booking.address} />
        </DetailSection>

        <DetailSection title="Pet">
          <Detail label="Name" value={booking.petName} />
          <Detail label="Type" value={booking.petType} />
          <Detail label="Breed" value={booking.breed} />
          <Detail label="Age" value={`${booking.age} years`} />
          <Detail label="Weight" value={`${booking.weight} kg`} />
          <Detail label="Aggressive" value={booking.aggression === "1" ? "Yes" : "No"} />
        </DetailSection>

        <DetailSection title="Booking">
          <Detail label="Date" value={new Date(booking.date).toDateString()} />
          <Detail label="Time Slot" value={booking.timeSlot} />
          <Detail label="Created" value={new Date(booking.createdAt).toLocaleString()} />
        </DetailSection>

        <DetailSection title="Package">
          <Detail label="Name" value={booking.productId?.name} />
          <Detail label="Tag" value={booking.productId?.tag} />
          <Detail label="Price" value={`₹${booking.productId?.price}`} />
        </DetailSection>

        <DetailSection title="Free Services">
          <ul className="list-disc ml-5 text-sm text-gray-300">
            {booking.productId?.freeServices?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection title="Add-ons">
          {booking.addons?.length ? (
            <ul className="list-disc ml-5 text-sm text-gray-300">
              {booking.addons.map((a, i) => (
                <li key={i}>{a.name || a}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No add-ons</p>
          )}
        </DetailSection>

        <DetailSection title="Pricing">
          <Detail label="Marked Price" value={`₹${booking.bookingMarkedPrice}`} />
          <Detail label="Discount" value={`₹${booking.discount}`} />
          <Detail
            label="Final Amount"
            value={`₹${booking.bookingMarkedPrice - booking.discount}`}
            highlight
          />
        </DetailSection>

        {booking.notes && (
          <DetailSection title="Notes">
            <p className="text-sm text-gray-300">{booking.notes}</p>
          </DetailSection>
        )}
      </div>
    </div>
  );
}

function DetailSection({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Detail({ label, value, highlight }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className={highlight ? "text-green-400 font-medium" : "text-gray-200"}>
        {value || "—"}
      </span>
    </div>
  );
}
