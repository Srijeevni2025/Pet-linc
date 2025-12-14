// import { useQuery } from "@tanstack/react-query";
// import { GetMyBookings } from "../Features/Booking/queryFunction";
// import { useNavigate } from "react-router-dom";
// import MyBookingsLoader from "../Components/MybookingsLoader";
// import toast from "react-hot-toast";

// export default function MyBookings() {
//   const navigate = useNavigate();

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["myBookings"],
//     queryFn: GetMyBookings,
//   });

//   if (isLoading) {
//     return (
//       <MyBookingsLoader/>
//     );
//   }

//   if (isError) {

//     toast.error(error.response.data.message)
//     navigate('/signin', {replace:true})

//   }

//   const bookings = data?.data || [];

//   return (
//     <div className="p-4 md:p-6 max-w-3xl mx-auto">
//       {/* HEADER */}
//       <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">
//         My Bookings
//       </h1>

//       {/* EMPTY STATE */}
//       {bookings.length === 0 && (
//         <div className="text-center text-gray-600 mt-16">
//           <p className="text-lg">You don’t have any bookings yet.</p>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-5 px-6 py-3 bg-orange-600 text-white text-sm font-semibold rounded-xl shadow hover:bg-orange-700 transition"
//           >
//             Book Grooming Now
//           </button>
//         </div>
//       )}

//       {/* BOOKINGS LIST */}
//       <div className="space-y-6">
//         {bookings.map((booking) => {
//           const addonsTotal = booking.addons?.reduce(
//             (sum, addon) => sum + addon.price,
//             0
//           );

//           const basePrice = booking.productId.price || 0;
//           const totalPrice = basePrice + addonsTotal;

//           return (
//             <div
//               key={booking._id}
//               className="border rounded-2xl p-5 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//             >
//               {/* TOP ROW */}
//               <div className="flex justify-between items-center mb-5">
//                 <div className="flex items-center gap-3">
//                   {/* PET AVATAR */}
//                   <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-lg shadow-inner">
//                     {booking.petName?.charAt(0)?.toUpperCase()}
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-bold text-gray-900">
//                       {booking.package?.name || "Grooming Package"}
//                     </h2>
//                     <p className="text-gray-500 text-sm">
//                       {booking.petName} • {booking.breed}
//                     </p>
//                   </div>
//                 </div>

//                 {/* STATUS BADGE */}
//                 <span
//                   className={`px-3 py-1 text-xs rounded-full text-white font-medium shadow-sm ${
//                     booking.status === "completed"
//                       ? "bg-green-600"
//                       : booking.status === "cancelled"
//                       ? "bg-red-500"
//                       : "bg-orange-500"
//                   }`}
//                 >
//                   {booking.status?.toUpperCase()}
//                 </span>
//               </div>

//               {/* DETAILS GRID */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-sm text-gray-700 mb-4">
//                 <p>
//                   <strong>Date: </strong>
//                   {new Date(booking.date).toLocaleDateString("en-IN", {
//                     weekday: "short",
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </p>
//                 <p>
//                   <strong>Time Slot:</strong> {booking.timeSlot}
//                 </p>
//                 <p>
//                   <strong>Type:</strong> {booking.petType}
//                 </p>
//                 <p className="sm:col-span-2">
//                   <strong>Address:</strong> {booking.address}
//                 </p>
//               </div>

//               {/* ADDONS SECTION */}
//               <div className="mt-4 bg-gray-50 p-4 rounded-xl border shadow-sm">
//                 <h3 className="text-sm font-bold text-gray-900 mb-3">
//                   Add-ons Selected
//                 </h3>

//                 {booking.addons.length === 0 ? (
//                   <p className="text-gray-500 text-sm">
//                     No add-ons selected.
//                   </p>
//                 ) : (
//                   <ul className="space-y-2 text-sm">
//                     {booking.addons.map((addon) => (
//                       <li
//                         key={addon._id}
//                         className="flex justify-between items-center bg-white px-3 py-2 rounded-lg shadow-sm border"
//                       >
//                         <span className="text-gray-700">{addon.name}</span>
//                         <span className="text-orange-600 font-semibold">
//                           ₹{addon.price}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>

//               {/* PRICE BREAKDOWN */}
//               <div className="mt-5 bg-white p-4 border rounded-xl shadow-sm">
//                 <h3 className="text-sm font-bold text-gray-900 mb-2">
//                   Price Summary
//                 </h3>

//                 <div className="flex justify-between text-sm text-gray-700 py-1">
//                   <span>Base Package</span>
//                   <span className="font-semibold">₹{basePrice}</span>
//                 </div>

//                 <div className="flex justify-between text-sm text-gray-700 py-1">
//                   <span>Selected Add-ons</span>
//                   <span className="font-semibold">₹{addonsTotal}</span>
//                 </div>

//                 <hr className="my-2" />

//                 <div className="flex justify-between text-lg font-bold">
//                   <span>Total Paid</span>
//                   <span className="text-orange-600">₹{totalPrice}</span>
//                 </div>
//               </div>

//               {/* BUTTON */}
//               <button
//                 onClick={() => navigate(`/booking/${booking._id}`)}
//                 className="mt-5 w-full py-3 rounded-xl bg-orange-600 text-white text-sm font-semibold shadow hover:bg-orange-700 transition"
//               >
//                 View Full Details
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import { GetMyBookings } from "../Features/Booking/queryFunction";
import { useNavigate } from "react-router-dom";
import MyBookingsLoader from "../Components/MybookingsLoader";
import toast from "react-hot-toast";
import { PawPrint, MapPin, Clock, CalendarDays } from "lucide-react";

export default function MyBookings() {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myBookings"],
    queryFn: GetMyBookings,
  });

  if (isLoading) return <MyBookingsLoader />;

  if (isError) {
    toast.error(error?.response?.data?.message || "Session expired");
    navigate("/signin", { replace: true });
    return null;
  }

  const bookings = data?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            My Bookings
          </h1>
          <p className="text-gray-600 mt-2">
            Track and manage your grooming appointments 🐾
          </p>
        </div>

        {/* EMPTY STATE */}
        {bookings.length === 0 && (
          <div className="text-center mt-24">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-100 mb-5">
              <PawPrint className="w-10 h-10 text-orange-600" />
            </div>
            <p className="text-lg text-gray-600">
              You don’t have any bookings yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-8 py-3 rounded-full bg-orange-600 text-white font-semibold shadow hover:bg-orange-700 transition"
            >
              Book Grooming Now
            </button>
          </div>
        )}

        {/* BOOKINGS LIST */}
        <div className="space-y-8">
          {bookings.map((booking) => {
            
            const basePrice = Number(booking.bookingMarkedPrice || 0);
            const addonsTotal = booking.addons?.reduce((s, a) => s + a.price, 0) || 0;

            const discount = Number(booking.discount || 0);

            const totalBeforeDiscount = basePrice + addonsTotal;
            const totalPaid = Math.max(totalBeforeDiscount - discount, 0);

            return (
              <div
                key={booking._id}
                className="
                  relative bg-white/80 backdrop-blur-xl
                  border border-orange-100
                  rounded-3xl p-6
                  shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                  hover:shadow-[0_18px_40px_rgba(255,140,40,0.25)]
                  transition-all
                "
              >
                {/* STATUS BADGE */}
                <div className="absolute top-5 right-5">
                  <span
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full shadow ${
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

                {/* HEADER */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold shadow-inner">
                    {booking.petName?.charAt(0)?.toUpperCase()}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {booking.productId?.name || "Grooming Package"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {booking.petName} • {booking.breed}
                    </p>
                  </div>
                </div>

                {/* META INFO */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-orange-500" />
                    {new Date(booking.date).toLocaleDateString("en-IN", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    {booking.timeSlot}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    {booking.address}
                  </div>
                </div>

                {/* ADDONS */}
                <div className="mt-6 bg-orange-50 rounded-2xl p-4 border border-orange-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Add-ons Selected
                  </h3>

                  {booking.addons.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No add-ons selected.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {booking.addons.map((addon) => (
                        <div
                          key={addon._id}
                          className="flex justify-between items-center bg-white px-4 py-2 rounded-xl shadow-sm"
                        >
                          <span className="text-gray-700 text-sm">
                            {addon.name}
                          </span>
                          <span className="text-orange-600 font-semibold text-sm">
                            ₹{addon.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* PRICE SUMMARY */}
                {/* <div className="mt-6 bg-white rounded-2xl p-5 border shadow-sm">
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Base Package</span>
                    <span className="font-semibold">₹{basePrice}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-700 mt-1">
                    <span>Add-ons</span>
                    <span className="font-semibold">₹{addonsTotal}</span>
                  </div>

                  <hr className="my-3" />

                  <div className="flex justify-between text-lg font-extrabold">
                    <span>Total Paid</span>
                    <span className="text-orange-600">₹{totalPrice}</span>
                  </div>
                </div> */}
                {/* PRICE SUMMARY */}
<div className="mt-6 bg-white rounded-2xl p-5 border shadow-sm">
  <div className="flex justify-between text-sm text-gray-700">
    <span>Base Package</span>
    <span className="font-semibold">₹{basePrice}</span>
  </div>

  <div className="flex justify-between text-sm text-gray-700 mt-1">
    <span>Add-ons</span>
    <span className="font-semibold">₹{addonsTotal}</span>
  </div>

  {/* DISCOUNT (only if applied) */}
  {discount > 0 && (
    <div className="flex justify-between text-sm text-green-700 mt-1">
      <span>
        Discount
        {booking.coupon && (
          <span className="ml-1 text-xs text-green-600">
            ({booking.coupon})
          </span>
        )}
      </span>
      <span className="font-semibold">-₹{discount}</span>
    </div>
  )}

  <hr className="my-3" />

  <div className="flex justify-between text-lg font-extrabold">
    <span>Total Paid</span>
    <span className="text-orange-600">₹{totalPaid}</span>
  </div>
</div>


                {/* CTA */}
                <button
                  onClick={() => navigate(`/my-bookings/${booking._id}`)}
                  className="
                    mt-6 w-full py-3 rounded-full
                    bg-gradient-to-r from-orange-600 to-amber-500
                    text-white font-semibold
                    shadow-lg hover:shadow-xl hover:scale-[1.02]
                    transition
                  "
                >
                  View Full Details
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
