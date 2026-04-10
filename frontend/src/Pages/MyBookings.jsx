
// import { useQuery } from "@tanstack/react-query";
// import { GetMyBookings } from "../Features/Booking/queryFunction";
// import { useNavigate } from "react-router-dom";
// import MyBookingsLoader from "../Components/MybookingsLoader";
// import toast from "react-hot-toast";
// import { PawPrint, MapPin, Clock, CalendarDays } from "lucide-react";

// export default function MyBookings() {
//   const navigate = useNavigate();

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["myBookings"],
//     queryFn: GetMyBookings,
//   });

//   if (isLoading) return <MyBookingsLoader />;

//   if (isError) {
//     toast.error(error?.response?.data?.message || "Session expired");
//     navigate("/signin", { replace: true });
//     return null;
//   }

//   const bookings = data?.data || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10">
//       <div className="max-w-4xl mx-auto">
//         {/* HEADER */}
//         <div className="mb-10">
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
//             My Bookings
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Track and manage your grooming appointments 🐾
//           </p>
//         </div>

//         {/* EMPTY STATE */}
//         {bookings.length === 0 && (
//           <div className="text-center mt-24">
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-100 mb-5">
//               <PawPrint className="w-10 h-10 text-orange-600" />
//             </div>
//             <p className="text-lg text-gray-600">
//               You don’t have any bookings yet.
//             </p>
//             <button
//               onClick={() => navigate("/")}
//               className="mt-6 px-8 py-3 rounded-full bg-orange-600 text-white font-semibold shadow hover:bg-orange-700 transition"
//             >
//               Book Grooming Now
//             </button>
//           </div>
//         )}

//         {/* BOOKINGS LIST */}
//         <div className="space-y-8">
//           {bookings.map((booking) => {
            
//             const basePrice = Number(booking.bookingMarkedPrice || 0);
//             const addonsTotal = booking.addons?.reduce((s, a) => s + a.price, 0) || 0;

//             const discount = Number(booking.discount || 0);

//             const totalBeforeDiscount = basePrice + addonsTotal;
//             const totalPaid = Math.max(totalBeforeDiscount - discount, 0);

//             return (
//               <div
//                 key={booking._id}
//                 className="
//                   relative bg-white/80 backdrop-blur-xl
//                   border border-orange-100
//                   rounded-3xl p-6
//                   shadow-[0_10px_30px_rgba(0,0,0,0.08)]
//                   hover:shadow-[0_18px_40px_rgba(255,140,40,0.25)]
//                   transition-all
//                 "
//               >
//                 {/* STATUS BADGE */}
//                 <div className="absolute top-5 right-5">
//                   <span
//                     className={`px-4 py-1.5 text-xs font-semibold rounded-full shadow ${
//                       booking.status === "completed"
//                         ? "bg-green-100 text-green-700"
//                         : booking.status === "cancelled"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-orange-100 text-orange-700"
//                     }`}
//                   >
//                     {booking.status?.toUpperCase()}
//                   </span>
//                 </div>

//                 {/* HEADER */}
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold shadow-inner">
//                     {booking.petName?.charAt(0)?.toUpperCase()}
//                   </div>

//                   <div>
//                     <h2 className="text-xl font-bold text-gray-900">
//                       {booking.productId?.name || "Grooming Package"}
//                     </h2>
//                     <p className="text-sm text-gray-500">
//                       {booking.petName} • {booking.breed}
//                     </p>
//                   </div>
//                 </div>

//                 {/* META INFO */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
//                   <div className="flex items-center gap-2">
//                     <CalendarDays className="w-4 h-4 text-orange-500" />
//                     {new Date(booking.date).toLocaleDateString("en-IN", {
//                       weekday: "short",
//                       day: "numeric",
//                       month: "short",
//                     })}
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Clock className="w-4 h-4 text-orange-500" />
//                     {booking.timeSlot}
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-orange-500" />
//                     {booking.address}
//                   </div>
//                 </div>

//                 {/* ADDONS */}
//                 <div className="mt-6 bg-orange-50 rounded-2xl p-4 border border-orange-100">
//                   <h3 className="text-sm font-semibold text-gray-900 mb-3">
//                     Add-ons Selected
//                   </h3>

//                   {booking.addons.length === 0 ? (
//                     <p className="text-sm text-gray-500">
//                       No add-ons selected.
//                     </p>
//                   ) : (
//                     <div className="space-y-2">
//                       {booking.addons.map((addon) => (
//                         <div
//                           key={addon._id}
//                           className="flex justify-between items-center bg-white px-4 py-2 rounded-xl shadow-sm"
//                         >
//                           <span className="text-gray-700 text-sm">
//                             {addon.name}
//                           </span>
//                           <span className="text-orange-600 font-semibold text-sm">
//                             ₹{addon.price}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* PRICE SUMMARY */}
//                 {/* <div className="mt-6 bg-white rounded-2xl p-5 border shadow-sm">
//                   <div className="flex justify-between text-sm text-gray-700">
//                     <span>Base Package</span>
//                     <span className="font-semibold">₹{basePrice}</span>
//                   </div>

//                   <div className="flex justify-between text-sm text-gray-700 mt-1">
//                     <span>Add-ons</span>
//                     <span className="font-semibold">₹{addonsTotal}</span>
//                   </div>

//                   <hr className="my-3" />

//                   <div className="flex justify-between text-lg font-extrabold">
//                     <span>Total Paid</span>
//                     <span className="text-orange-600">₹{totalPrice}</span>
//                   </div>
//                 </div> */}
//                 {/* PRICE SUMMARY */}
// <div className="mt-6 bg-white rounded-2xl p-5 border shadow-sm">
//   <div className="flex justify-between text-sm text-gray-700">
//     <span>Base Package</span>
//     <span className="font-semibold">₹{basePrice}</span>
//   </div>

//   <div className="flex justify-between text-sm text-gray-700 mt-1">
//     <span>Add-ons</span>
//     <span className="font-semibold">₹{addonsTotal}</span>
//   </div>

//   {/* DISCOUNT (only if applied) */}
//   {discount > 0 && (
//     <div className="flex justify-between text-sm text-green-700 mt-1">
//       <span>
//         Discount
//         {booking.coupon && (
//           <span className="ml-1 text-xs text-green-600">
//             ({booking.coupon})
//           </span>
//         )}
//       </span>
//       <span className="font-semibold">-₹{discount}</span>
//     </div>
//   )}

//   <hr className="my-3" />

//   <div className="flex justify-between text-lg font-extrabold">
//     <span>Total: </span>
//     <span className="text-orange-600">₹{totalPaid}</span>
//   </div>
// </div>


//                 {/* CTA */}
//                 <button
//                   onClick={() => navigate(`/my-bookings/${booking._id}`)}
//                   className="
//                     mt-6 w-full py-3 rounded-full
//                     bg-gradient-to-r from-orange-600 to-amber-500
//                     text-white font-semibold
//                     shadow-lg hover:shadow-xl hover:scale-[1.02]
//                     transition
//                   "
//                 >
//                   View Full Details
//                 </button>

//                 /* -------------------------------*/
//                 <div className="mt-6 flex gap-3">

// <button
//   onClick={() => navigate(`/my-bookings/${booking._id}`)}
//   className="
//     flex-1 py-3 rounded-full
//     bg-gradient-to-r from-orange-600 to-amber-500
//     text-white font-semibold
//     shadow-lg hover:shadow-xl hover:scale-[1.02]
//     transition
//   "
// >
//   View Full Details
// </button>

// {booking.status !== "cancelled" && booking.status !== "completed" && (
// <button
//   onClick={() => handleCancel(booking._id)}
//   className="
//     px-5 py-3 rounded-full
//     bg-red-500 text-white font-semibold
//     hover:bg-red-600 transition
//   "
// >
//   Cancel
// </button>
// )}

// </div>
//                 /* -------------------------------*/
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { GetMyBookings, CancelBooking } from "../Features/Booking/queryFunction"; // 👈 import CancelBooking
// import { useNavigate } from "react-router-dom";
// import MyBookingsLoader from "../Components/MybookingsLoader";
// import toast from "react-hot-toast";
// import { PawPrint, MapPin, Clock, CalendarDays } from "lucide-react";

// export default function MyBookings() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const [cancellingId, setCancellingId] = useState(null);

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["myBookings"],
//     queryFn: GetMyBookings,
//   });

//   // ✅ Cancel mutation
//   const { mutate: cancelBooking } = useMutation({
//     mutationFn: (bookingId) => CancelBooking(bookingId),
//     onMutate: (bookingId) => setCancellingId(bookingId),
//     onSuccess: () => {
//       toast.success("Booking cancelled successfully.");
//       queryClient.invalidateQueries(["myBookings"]);
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Failed to cancel booking.");
//     },
//     onSettled: () => setCancellingId(null),
//   });

//   // ✅ Confirmation dialog before cancel
//   // const handleCancel = (bookingId) => {
//   //   if (window.confirm("Are you sure you want to cancel this booking?")) {
//   //     cancelBooking(bookingId);
//   //   }
//   // };
 

// const handleCancel = (bookingId) => {
//   toast((t) => (
//     <div className="flex flex-col gap-3">
//       <p className="font-medium">Cancel this booking?</p>

//       <div className="flex gap-2 justify-end">
//         <button
//           onClick={() => {
//             toast.dismiss(t.id);
//           }}
//           className="px-3 py-1 text-sm bg-gray-200 rounded"
//         >
//           No
//         </button>

//         <button
//           onClick={() => {
//             cancelBooking(bookingId);
//             toast.dismiss(t.id);
//           }}
//           className="px-3 py-1 text-sm bg-red-500 text-white rounded"
//         >
//           Yes, Cancel
//         </button>
//       </div>
//     </div>
//   ));
// };

//   if (isLoading) return <MyBookingsLoader />;

//   if (isError) {
//     toast.error(error?.response?.data?.message || "Session expired");
//     navigate("/signin", { replace: true });
//     return null;
//   }

//   const bookings = data?.data || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10">
//       <div className="max-w-4xl mx-auto">
//         {/* HEADER */}
//         <div className="mb-10">
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
//             My Bookings
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Track and manage your grooming appointments 🐾
//           </p>
//         </div>

//         {/* EMPTY STATE */}
//         {bookings.length === 0 && (
//           <div className="text-center mt-24">
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-100 mb-5">
//               <PawPrint className="w-10 h-10 text-orange-600" />
//             </div>
//             <p className="text-lg text-gray-600">
//               You don't have any bookings yet.
//             </p>
//             <button
//               onClick={() => navigate("/")}
//               className="mt-6 px-8 py-3 rounded-full bg-orange-600 text-white font-semibold shadow hover:bg-orange-700 transition"
//             >
//               Book Grooming Now
//             </button>
//           </div>
//         )}

//         {/* BOOKINGS LIST */}
//         <div className="space-y-8">
//           {bookings.map((booking) => {
//             const basePrice = Number(booking.bookingMarkedPrice || 0);
//             const addonsTotal =
//               booking.addons?.reduce((s, a) => s + a.price, 0) || 0;
//             const discount = Number(booking.discount || 0);
//             const totalBeforeDiscount = basePrice + addonsTotal;
//             const totalPaid = Math.max(totalBeforeDiscount - discount, 0);

//             return (
//               <div
//                 key={booking._id}
//                 className="relative bg-white/80 backdrop-blur-xl border border-orange-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_40px_rgba(255,140,40,0.25)] transition-all"
//               >
//                 {/* STATUS BADGE */}
//                 <div className="absolute top-5 right-5">
//                   <span
//                     className={`px-4 py-1.5 text-xs font-semibold rounded-full shadow ${
//                       booking.status === "completed"
//                         ? "bg-green-100 text-green-700"
//                         : booking.status === "cancelled" || booking.status === "cancelled by user"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-orange-100 text-orange-700"
//                     }`}
//                   >
//                     {booking.status === 'cancelled by user' ? 'CANCELLED' : booking.status?.toUpperCase()}
//                   </span>
//                 </div>

//                 {/* HEADER */}
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold shadow-inner">
//                     {booking.petName?.charAt(0)?.toUpperCase()}
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-900">
//                       {booking.productId?.name || "Grooming Package"}
//                     </h2>
//                     <p className="text-sm text-gray-500">
//                       {booking.petName} • {booking.breed}
//                     </p>
//                   </div>
//                 </div>

//                 {/* META INFO */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
//                   <div className="flex items-center gap-2">
//                     <CalendarDays className="w-4 h-4 text-orange-500" />
//                     {new Date(booking.date).toLocaleDateString("en-IN", {
//                       weekday: "short",
//                       day: "numeric",
//                       month: "short",
//                     })}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Clock className="w-4 h-4 text-orange-500" />
//                     {booking.timeSlot}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-orange-500" />
//                     {booking.address}
//                   </div>
//                 </div>

//                 {/* ADDONS */}
//                 <div className="mt-6 bg-orange-50 rounded-2xl p-4 border border-orange-100">
//                   <h3 className="text-sm font-semibold text-gray-900 mb-3">
//                     Add-ons Selected
//                   </h3>
//                   {booking.addons.length === 0 ? (
//                     <p className="text-sm text-gray-500">No add-ons selected.</p>
//                   ) : (
//                     <div className="space-y-2">
//                       {booking.addons.map((addon) => (
//                         <div
//                           key={addon._id}
//                           className="flex justify-between items-center bg-white px-4 py-2 rounded-xl shadow-sm"
//                         >
//                           <span className="text-gray-700 text-sm">{addon.name}</span>
//                           <span className="text-orange-600 font-semibold text-sm">
//                             ₹{addon.price}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* PRICE SUMMARY */}
//                 <div className="mt-6 bg-white rounded-2xl p-5 border shadow-sm">
//                   <div className="flex justify-between text-sm text-gray-700">
//                     <span>Base Package</span>
//                     <span className="font-semibold">₹{basePrice}</span>
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-700 mt-1">
//                     <span>Add-ons</span>
//                     <span className="font-semibold">₹{addonsTotal}</span>
//                   </div>
//                   {discount > 0 && (
//                     <div className="flex justify-between text-sm text-green-700 mt-1">
//                       <span>
//                         Discount
//                         {booking.coupon && (
//                           <span className="ml-1 text-xs text-green-600">
//                             ({booking.coupon})
//                           </span>
//                         )}
//                       </span>
//                       <span className="font-semibold">-₹{discount}</span>
//                     </div>
//                   )}
//                   <hr className="my-3" />
//                   <div className="flex justify-between text-lg font-extrabold">
//                     <span>Total:</span>
//                     <span className="text-orange-600">₹{totalPaid}</span>
//                   </div>
//                 </div>

//                 {/* CTA BUTTONS */}
//                 <div className="mt-6 flex gap-3">
//                   <button
//                     onClick={() => navigate(`/my-bookings/${booking._id}`)}
//                     className="flex-1 py-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
//                   >
//                     View Full Details
//                   </button>

//                   {booking.status !== "cancelled" &&
//                     booking.status !== "completed" && (
//                       <button
//                         onClick={() => handleCancel(booking._id)}
//                         disabled={cancellingId === booking._id || booking.status === "cancelled by user"}
//                         className="px-5 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {cancellingId === booking._id
//                           ? "Cancelling..."
//                           : "Cancel"}
//                       </button>
//                     )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetMyBookings, CancelBooking } from "../Features/Booking/queryFunction";
import { useNavigate } from "react-router-dom";
import MyBookingsLoader from "../Components/MybookingsLoader";
import toast from "react-hot-toast";
import { PawPrint, MapPin, Clock, CalendarDays, Download, Loader2 } from "lucide-react";
import axios from "axios";

const API_URL_BASE = import.meta.env.VITE_BASE_URL;

export default function MyBookings() {
  const navigate     = useNavigate();
  const queryClient  = useQueryClient();
  const [cancellingId,    setCancellingId]    = useState(null);
  const [downloadingId,   setDownloadingId]   = useState(null); // tracks which booking is downloading

  // ── fetch bookings ───────────────────────────────────────────────────────────
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myBookings"],
    queryFn:  GetMyBookings,
  });

  // ── cancel mutation ──────────────────────────────────────────────────────────
  const { mutate: cancelBooking } = useMutation({
    mutationFn: (bookingId) => CancelBooking(bookingId),
    onMutate:   (bookingId) => setCancellingId(bookingId),
    onSuccess:  () => {
      toast.success("Booking cancelled successfully.");
      queryClient.invalidateQueries(["myBookings"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to cancel booking.");
    },
    onSettled: () => setCancellingId(null),
  });

  // ── cancel confirmation toast ────────────────────────────────────────────────
  const handleCancel = (bookingId) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">Cancel this booking?</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm bg-gray-200 rounded"
          >
            No
          </button>
          <button
            onClick={() => { cancelBooking(bookingId); toast.dismiss(t.id); }}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    ));
  };

  // ── invoice download ─────────────────────────────────────────────────────────
  const handleDownloadInvoice = async (bookingId, petName) => {
    setDownloadingId(bookingId);
    try {
      const res = await axios.get(
        `${API_URL_BASE}/api/v1/bookings/download-invoice/${bookingId}`,
        {
          withCredentials: true,
          responseType: "blob", // ← important: receive raw PDF bytes
        }
      );

      // create a temporary <a> tag to trigger browser download
      const url      = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link     = document.createElement("a");
      link.href      = url;
      link.download  = `petlinc-invoice-${petName || bookingId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Invoice downloaded!");
    } catch (err) {
      toast.error("Failed to download invoice. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  // ── guards ───────────────────────────────────────────────────────────────────
  if (isLoading) return <MyBookingsLoader />;

  if (isError) {
    toast.error(error?.response?.data?.message || "Session expired");
    navigate("/signin", { replace: true });
    return null;
  }

  const bookings = data?.data || [];

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Bookings</h1>
          <p className="text-gray-600 mt-2">Track and manage your grooming appointments 🐾</p>
        </div>

        {/* EMPTY STATE */}
        {bookings.length === 0 && (
          <div className="text-center mt-24">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-100 mb-5">
              <PawPrint className="w-10 h-10 text-orange-600" />
            </div>
            <p className="text-lg text-gray-600">You don't have any bookings yet.</p>
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
            const basePrice   = Number(booking.bookingMarkedPrice || 0);
            const addonsTotal = booking.addons?.reduce((s, a) => s + a.price, 0) || 0;
            const discount    = Number(booking.discount || 0);
            const totalPaid   = Math.max(basePrice + addonsTotal - discount, 0);
            const isCompleted = booking.status === "completed";

            return (
              <div
                key={booking._id}
                className="relative bg-white/80 backdrop-blur-xl border border-orange-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_40px_rgba(255,140,40,0.25)] transition-all"
              >
                {/* STATUS BADGE */}
                <div className="absolute top-5 right-5">
                  <span
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full shadow ${
                      isCompleted
                        ? "bg-green-100 text-green-700"
                        : booking.status === "cancelled" || booking.status === "cancelled by user"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {booking.status === "cancelled by user" ? "CANCELLED" : booking.status?.toUpperCase()}
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
                    <p className="text-sm text-gray-500">{booking.petName} • {booking.breed}</p>
                  </div>
                </div>

                {/* META */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-orange-500" />
                    {new Date(booking.date).toLocaleDateString("en-IN", {
                      weekday: "short", day: "numeric", month: "short",
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
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Add-ons Selected</h3>
                  {booking.addons.length === 0 ? (
                    <p className="text-sm text-gray-500">No add-ons selected.</p>
                  ) : (
                    <div className="space-y-2">
                      {booking.addons.map((addon) => (
                        <div key={addon._id} className="flex justify-between items-center bg-white px-4 py-2 rounded-xl shadow-sm">
                          <span className="text-gray-700 text-sm">{addon.name}</span>
                          <span className="text-orange-600 font-semibold text-sm">₹{addon.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

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
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-700 mt-1">
                      <span>
                        Discount
                        {booking.coupon && (
                          <span className="ml-1 text-xs text-green-600">({booking.coupon})</span>
                        )}
                      </span>
                      <span className="font-semibold">-₹{discount}</span>
                    </div>
                  )}
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-extrabold">
                    <span>Total:</span>
                    <span className="text-orange-600">₹{totalPaid}</span>
                  </div>
                </div>

                {/* CTA BUTTONS */}
                <div className="mt-6 flex flex-wrap gap-3">

                  {/* View Details */}
                  <button
                    onClick={() => navigate(`/my-bookings/${booking._id}`)}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
                  >
                    View Full Details
                  </button>

                  {/* Download Invoice — only for completed bookings */}
                  {isCompleted && (
                    <button
                      onClick={() => handleDownloadInvoice(booking._id, booking.petName)}
                      disabled={downloadingId === booking._id}
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {downloadingId === booking._id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Invoice
                        </>
                      )}
                    </button>
                  )}

                  {/* Cancel — only for active bookings */}
                  {booking.status !== "cancelled" &&
                    booking.status !== "cancelled by user" &&
                    booking.status !== "completed" && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        disabled={cancellingId === booking._id}
                        className="px-5 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {cancellingId === booking._id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}