// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { GetMyBookings } from "../Features/Booking/queryFunction";
// import {
//   PawPrint,
//   CalendarDays,
//   Clock,
//   MapPin,
//   Phone,
//   ArrowLeft,
// } from "lucide-react";

// export default function BookingDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // We already have all bookings → reuse instead of new API
//   const { data, isLoading } = useQuery({
//     queryKey: ["myBookings"],
//     queryFn: GetMyBookings,
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Loading booking details...
//       </div>
//     );
//   }

//   const booking = data?.data?.find((b) => b._id === id);
//   console.log(booking)
//   if (!booking) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <p className="text-gray-600">Booking not found.</p>
//         <button
//           onClick={() => navigate("/my-bookings")}
//           className="mt-4 px-6 py-2 rounded-full bg-orange-600 text-white"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const addonsTotal =
//     booking.addons?.reduce((sum, a) => sum + a.price, 0) || 0;

//   const basePrice = Number(booking.productId?.price || 0);
//   const totalPaid = basePrice + addonsTotal;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10">
//       <div className="max-w-4xl mx-auto">

//         {/* BACK */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 mb-6"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back to My Bookings
//         </button>

//         {/* HEADER CARD */}
//         <div className="bg-white/90 backdrop-blur-xl border rounded-3xl p-6 shadow-lg mb-8">
//           <div className="flex justify-between items-start">
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-2xl font-bold">
//                 {booking.petName?.charAt(0)}
//               </div>

//               <div>
//                 <h1 className="text-2xl font-extrabold text-gray-900">
//                   {booking.productId?.name}
//                 </h1>
//                 <p className="text-sm text-gray-500">
//                   Booking ID: {booking._id}
//                 </p>
//               </div>
//             </div>

//             <span
//               className={`px-4 py-1.5 text-xs font-semibold rounded-full ${
//                 booking.status === "completed"
//                   ? "bg-green-100 text-green-700"
//                   : booking.status === "cancelled"
//                   ? "bg-red-100 text-red-700"
//                   : "bg-orange-100 text-orange-700"
//               }`}
//             >
//               {booking?.status?.toUpperCase()}
//             </span>
//           </div>
//         </div>

//         {/* DETAILS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* LEFT */}
//           <div className="space-y-6">

//             {/* PET DETAILS */}
//             <DetailCard title="Pet Details">
//               <DetailRow label="Name" value={booking.petName} />
//               <DetailRow label="Type" value={booking.petType} />
//               <DetailRow label="Breed" value={booking.breed} />
//               <DetailRow label="Age" value={`${booking.age} years`} />
//               <DetailRow label="Weight" value={`${booking.weight} kg`} />
//             </DetailCard>

//             {/* SCHEDULE */}
//             <DetailCard title="Schedule">
//               <IconRow icon={CalendarDays} value={new Date(booking.date).toDateString()} />
//               <IconRow icon={Clock} value={booking.timeSlot} />
//             </DetailCard>

//             {/* ADDRESS */}
//             <DetailCard title="Service Address">
//               <IconRow icon={MapPin} value={booking.address} />
//               {booking.mobile && (
//                 <IconRow icon={Phone} value={booking.mobile} />
//               )}
//             </DetailCard>
//           </div>

//           {/* RIGHT */}
//           <div className="space-y-6">

//             {/* ADDONS */}
//             <DetailCard title="Add-ons Selected">
//               {booking.addons.length === 0 ? (
//                 <p className="text-sm text-gray-500">No add-ons selected.</p>
//               ) : (
//                 booking.addons.map((a) => (
//                   <div
//                     key={a._id}
//                     className="flex justify-between text-sm bg-orange-50 px-3 py-2 rounded-lg"
//                   >
//                     <span>{a.name}</span>
//                     <span className="font-semibold text-orange-600">
//                       ₹{a.price}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </DetailCard>

//             {/* PRICE */}
//             <DetailCard title="Payment Summary">
//               <PriceRow label="Base Package" value={basePrice} />
//               <PriceRow label="Add-ons" value={addonsTotal} />
//               <hr />
//               <PriceRow
//                 label="Total Paid"
//                 value={totalPaid}
//                 bold
//                 highlight
//               />
//             </DetailCard>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ------------------ SMALL COMPONENTS ------------------ */

// function DetailCard({ title, children }) {
//   return (
//     <div className="bg-white rounded-2xl p-5 shadow border">
//       <h3 className="text-sm font-bold text-gray-900 mb-4">{title}</h3>
//       <div className="space-y-3 text-sm text-gray-700">{children}</div>
//     </div>
//   );
// }

// function DetailRow({ label, value }) {
//   return (
//     <div className="flex justify-between">
//       <span className="text-gray-500">{label}</span>
//       <span className="font-medium">{value}</span>
//     </div>
//   );
// }

// function IconRow({ icon: Icon, value }) {
//   return (
//     <div className="flex items-center gap-2 text-sm">
//       <Icon className="w-4 h-4 text-orange-500" />
//       <span>{value}</span>
//     </div>
//   );
// }

// function PriceRow({ label, value, bold, highlight }) {
//   return (
//     <div className="flex justify-between">
//       <span className={bold ? "font-semibold" : "text-gray-600"}>
//         {label}
//       </span>
//       <span
//         className={`${
//           bold ? "font-bold" : "font-semibold"
//         } ${highlight ? "text-orange-600 text-lg" : ""}`}
//       >
//         ₹{value}
//       </span>
//     </div>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetMyBookings } from "../Features/Booking/queryFunction";
import {
  PawPrint,
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  ArrowLeft,
} from "lucide-react";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["myBookings"],
    queryFn: GetMyBookings,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading booking details...
      </div>
    );
  }

  const booking = data?.data?.find((b) => b._id === id);

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600">Booking not found.</p>
        <button
          onClick={() => navigate("/my-bookings")}
          className="mt-4 px-6 py-2 rounded-full bg-orange-600 text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  /* ---------------- PRICE LOGIC ---------------- */
  const addonsTotal =
    booking.addons?.reduce((sum, a) => sum + a.price, 0) || 0;

  const basePrice = Number(booking.bookingMarkedPrice || 0);
  const discount = Number(booking.discount || 0);

  const totalBeforeDiscount = basePrice + addonsTotal;
  const totalPaid = Math.max(totalBeforeDiscount - discount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Bookings
        </button>

        {/* HEADER */}
        <div className="bg-white/90 backdrop-blur-xl border rounded-3xl p-6 shadow-lg mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-2xl font-bold">
                {booking.petName?.charAt(0)}
              </div>

              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">
                  {booking.productId?.name}
                </h1>
                <p className="text-sm text-gray-500">
                  Booking ID: {booking._id}
                </p>
              </div>
            </div>

            <span
              className={`px-4 py-1.5 text-xs font-semibold rounded-full ${
                booking.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {booking.status?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            <DetailCard title="Pet Details">
              <DetailRow label="Name" value={booking.petName} />
              <DetailRow label="Type" value={booking.petType} />
              <DetailRow label="Breed" value={booking.breed} />
              <DetailRow label="Age" value={`${booking.age} years`} />
              <DetailRow label="Weight" value={`${booking.weight} kg`} />
            </DetailCard>

            <DetailCard title="Schedule">
              <IconRow
                icon={CalendarDays}
                value={new Date(booking.date).toDateString()}
              />
              <IconRow icon={Clock} value={booking.timeSlot} />
            </DetailCard>

            <DetailCard title="Service Address">
              <IconRow icon={MapPin} value={booking.address} />
              {booking.mobile && (
                <IconRow icon={Phone} value={booking.mobile} />
              )}
            </DetailCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* PACKAGE DETAILS */}
            <DetailCard title="Package Details">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{booking.productId?.emoji}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {booking.productId?.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {booking.productId?.tag}
                  </p>
                </div>
              </div>

              {booking.productId?.features?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    Included
                  </p>
                  <ul className="space-y-1">
                    {booking.productId.features.map((f, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        • {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {booking.productId?.freeServices?.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    Free Services
                  </p>
                  <ul className="space-y-1">
                    {booking.productId.freeServices.map((s, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        • {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </DetailCard>

            {/* ADDONS */}
            <DetailCard title="Add-ons Selected">
              {booking.addons.length === 0 ? (
                <p className="text-sm text-gray-500">No add-ons selected.</p>
              ) : (
                booking.addons.map((a) => (
                  <div
                    key={a._id}
                    className="flex justify-between text-sm bg-orange-50 px-3 py-2 rounded-lg"
                  >
                    <span>{a.name}</span>
                    <span className="font-semibold text-orange-600">
                      ₹{a.price}
                    </span>
                  </div>
                ))
              )}
            </DetailCard>

            {/* PAYMENT */}
            <DetailCard title="Payment Summary">
              <PriceRow label="Base Package" value={basePrice} />
              <PriceRow label="Add-ons" value={addonsTotal} />

              {discount > 0 && (
                <PriceRow
                  label={
                    booking.coupan
                      ? `Discount (${booking.coupan})`
                      : "Discount"
                  }
                  value={`-${discount}`}
                  green
                />
              )}

              <hr />

              <PriceRow
                label="Total Paid"
                value={totalPaid}
                bold
                highlight
              />
            </DetailCard>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function DetailCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow border">
      <h3 className="text-sm font-bold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3 text-sm text-gray-700">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function IconRow({ icon: Icon, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="w-4 h-4 text-orange-500" />
      <span>{value}</span>
    </div>
  );
}

function PriceRow({ label, value, bold, highlight, green }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-semibold" : "text-gray-600"}>
        {label}
      </span>
      <span
        className={`
          ${bold ? "font-bold" : "font-semibold"}
          ${highlight ? "text-orange-600 text-lg" : ""}
          ${green ? "text-green-600" : ""}
        `}
      >
        ₹{value}
      </span>
    </div>
  );
}
