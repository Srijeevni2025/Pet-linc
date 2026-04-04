

// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useState, useMemo, useEffect } from "react";
// import { GetAllBookingsForDashboard } from "../Features/Booking/queryFunction";
// import axios from "axios";
// import AdminNavbar from "./../Features/Admin/AdminNavbar";
// import { GetAllGroomers } from "../Features/Groomers/queryFunctions";
// import { Loader } from "lucide-react";
// import queryClient from "../Store/queryClient";

// const API_URL_BASE = import.meta.env.VITE_BASE_URL;
// const PAGE_SIZE = 10;

// export default function AdminDashboard() {
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [todayOnly, setTodayOnly] = useState(false);
//   const [tomorrowOnly, setTomorrowOnly] = useState(false);
//   const [readFilter, setReadFilter] = useState("all");

//   // ✅ Sort state
//   const [sortKey, setSortKey] = useState("date");
//   const [sortDir, setSortDir] = useState("desc");

//   // ✅ Pagination state
//   const [page, setPage] = useState(1);

//   const {
//     data: bookings = [],
//     isPending,
//     refetch,
//   } = useQuery({
//     queryKey: ["bookings"],
//     queryFn: GetAllBookingsForDashboard,
//   });

//   const { data: groomers } = useQuery({
//     queryKey: ["groomers"],
//     queryFn: GetAllGroomers,
//   });

//   const changeReadStatus = useMutation({
//     mutationFn: async (bookingId) => {
//       await axios.patch(
//         `${API_URL_BASE}/api/v1/bookings/change-read-status/${bookingId}`,
//         {},
//         { withCredentials: true },
//       );
//     },
//     onSuccess: async () => {
//       queryClient.invalidateQueries(["bookings"]);
//     },
//   });

//   // ✅ Sort toggle helper
//   function toggleSort(key) {
//     if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
//     else {
//       setSortKey(key);
//       setSortDir("asc");
//     }
//   }

//   // ✅ Reset to page 1 when filters/sort change
//   useEffect(() => {
//     setPage(1);
//   }, [search, statusFilter, readFilter, fromDate, toDate, todayOnly, tomorrowOnly, sortKey]);

//   // ✅ Groomer map with active booking count
//   const groomerMap = useMemo(() => {
//     const map = {};
//     groomers?.forEach((g) => {
//       map[g._id] = { ...g, bookingCount: 0 };
//     });

//     bookings.forEach((b) => {
//       if (b.assignedGroomer && map[b.assignedGroomer]) {
//         if (b.status !== "cancelled" && b.status !== "completed") {
//           map[b.assignedGroomer].bookingCount += 1;
//         }
//       }
//     });

//     return map;
//   }, [groomers, bookings]);

//   // ✅ Stats derived from all bookings (not paginated)
//   const stats = useMemo(() => {
//     const total = bookings.length;
//     const pending = bookings.filter((b) => (b.status || "pending") === "pending").length;
//     const completed = bookings.filter((b) => b.status === "completed").length;
//     const cancelled = bookings.filter((b) => b.status === "cancelled").length;
//     const revenue = bookings
//       .filter((b) => b.status === "completed")
//       .reduce((sum, b) => sum + ((b.bookingMarkedPrice || 0) - (b.discount || 0)), 0);

//     return { total, pending, completed, cancelled, revenue };
//   }, [bookings]);

//   // ✅ Filter + sort
//   const filteredBookings = useMemo(() => {
//     let result = bookings.filter((b) => {
//       const text =
//         `${b.petName} ${b.userId?.name} ${b.userId?.email}`.toLowerCase();
//       const matchesSearch = text.includes(search.toLowerCase());

//       const matchesStatus =
//         statusFilter === "all" || (b.status || "pending") === statusFilter;

//       const matchesRead =
//         readFilter === "all" ||
//         (readFilter === "unread" && !b.isRead) ||
//         (readFilter === "read" && b.isRead);

//       let matchesDate = true;
//       const bookingDate = new Date(b.date);
//       const today = new Date();
//       const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

//       if (todayOnly) {
//         matchesDate =
//           bookingDate.getDate() === today.getDate() &&
//           bookingDate.getMonth() === today.getMonth() &&
//           bookingDate.getFullYear() === today.getFullYear();
//       } else if (tomorrowOnly) {
//         matchesDate =
//           bookingDate.getDate() === tomorrow.getDate() &&
//           bookingDate.getMonth() === tomorrow.getMonth() &&
//           bookingDate.getFullYear() === tomorrow.getFullYear();
//       } else {
//         if (fromDate) matchesDate = bookingDate >= new Date(fromDate);
//         if (toDate) matchesDate = matchesDate && bookingDate <= new Date(toDate);
//       }

//       return matchesSearch && matchesStatus && matchesRead && matchesDate;
//     });

//     // ✅ Sort
//     result = [...result].sort((a, b) => {
//       let valA, valB;
//       if (sortKey === "date") {
//         valA = new Date(a.date);
//         valB = new Date(b.date);
//       } else if (sortKey === "amount") {
//         valA = (a.bookingMarkedPrice || 0) - (a.discount || 0);
//         valB = (b.bookingMarkedPrice || 0) - (b.discount || 0);
//       } else if (sortKey === "status") {
//         valA = a.status || "pending";
//         valB = b.status || "pending";
//       }
//       if (valA < valB) return sortDir === "asc" ? -1 : 1;
//       if (valA > valB) return sortDir === "asc" ? 1 : -1;
//       return 0;
//     });

//     return result;
//   }, [bookings, search, statusFilter, readFilter, fromDate, toDate, todayOnly, tomorrowOnly, sortKey, sortDir]);

//   // ✅ Pagination
//   const totalPages = Math.ceil(filteredBookings.length / PAGE_SIZE);

//   const paginatedBookings = useMemo(() => {
//     const start = (page - 1) * PAGE_SIZE;
//     return filteredBookings.slice(start, start + PAGE_SIZE);
//   }, [filteredBookings, page]);

//   if (isPending) {
//     return (
//       <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center text-gray-500">
//         Loading bookings…
//       </div>
//     );
//   }

//   const SortIcon = ({ key: k }) =>
//     sortKey === k ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕";

//   return (
//     <div className="min-h-screen bg-[#f4f6fb] p-8 text-gray-800">
//       <AdminNavbar />

//       {/* ✅ STATS CARDS */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 mt-6">
//         {[
//           { label: "Total Bookings", value: stats.total, color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
//           { label: "Pending", value: stats.pending, color: "bg-yellow-50 text-yellow-700 border-yellow-100" },
//           { label: "Completed", value: stats.completed, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
//           { label: "Cancelled", value: stats.cancelled, color: "bg-red-50 text-red-700 border-red-100" },
//           { label: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, color: "bg-orange-50 text-orange-700 border-orange-100" },
//         ].map((s) => (
//           <div key={s.label} className={`rounded-2xl p-4 border shadow-sm ${s.color}`}>
//             <p className="text-xs font-semibold uppercase opacity-60">{s.label}</p>
//             <p className="text-2xl font-extrabold mt-1">{s.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         <input
//           type="text"
//           placeholder="Search pet / customer / email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm"
//         />

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="on_the_way">On The Way</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         <select
//           value={readFilter}
//           onChange={(e) => setReadFilter(e.target.value)}
//           className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm"
//         >
//           <option value="all">All</option>
//           <option value="unread">Unread</option>
//           <option value="read">Read</option>
//         </select>

//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm"
//         />

//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm"
//         />

//         <button
//           onClick={() => {
//             setTodayOnly(!todayOnly);
//             setTomorrowOnly(false);
//             setFromDate("");
//             setToDate("");
//           }}
//           className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm transition
//             ${todayOnly ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
//         >
//           📅 Today
//         </button>

//         <button
//           onClick={() => {
//             setTomorrowOnly(!tomorrowOnly);
//             setTodayOnly(false);
//             setFromDate("");
//             setToDate("");
//           }}
//           className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm transition
//             ${tomorrowOnly ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
//         >
//           📅 Tomorrow
//         </button>

//         <button
//           onClick={() => setReadFilter((prev) => (prev === "unread" ? "all" : "unread"))}
//           className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm
//             ${readFilter === "unread" ? "bg-orange-600 text-white border-orange-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
//         >
//           🔔 Unread Only
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-slate-50 text-slate-500">
//               <tr>
//                 <th className="px-4 py-3">S.No</th>
//                 <th className="px-4 py-3">Customer</th>
//                 <th className="px-4 py-3">Pet</th>
//                 <th className="px-4 py-3">Package</th>

//                 {/* ✅ Sortable: Date */}
//                 <th
//                   className="px-4 py-3 cursor-pointer hover:text-slate-800 select-none whitespace-nowrap"
//                   onClick={() => toggleSort("date")}
//                 >
//                   Booking Date
//                   <span className="ml-1 text-slate-400">
//                     {sortKey === "date" ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
//                   </span>
//                 </th>

//                 {/* ✅ Sortable: Amount */}
//                 <th
//                   className="px-4 py-3 cursor-pointer hover:text-slate-800 select-none"
//                   onClick={() => toggleSort("amount")}
//                 >
//                   Amount
//                   <span className="ml-1 text-slate-400">
//                     {sortKey === "amount" ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
//                   </span>
//                 </th>

//                 {/* ✅ Sortable: Status */}
//                 <th
//                   className="px-4 py-3 cursor-pointer hover:text-slate-800 select-none"
//                   onClick={() => toggleSort("status")}
//                 >
//                   Status
//                   <span className="ml-1 text-slate-400">
//                     {sortKey === "status" ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
//                   </span>
//                 </th>

//                 <th className="px-4 py-3">Tags</th>
//                 <th className="px-4 py-3">Assigned Groomer</th>
//                 <th className="px-4 py-3">Action</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100">
//               {paginatedBookings.map((b, i) => (
//                 <tr
//                   key={b._id}
//                   className={`hover:bg-slate-50 transition ${!b.isRead ? "bg-orange-50" : ""}`}
//                 >
//                   <td className="px-4 py-3 font-mono text-xs text-slate-400">
//                     {(page - 1) * PAGE_SIZE + i + 1}
//                     {!b.isRead && (
//                       <span className="text-orange-600 bg-orange-100 rounded-3xl p-2 mx-4">
//                         New
//                       </span>
//                     )}
//                   </td>

//                   <td className="px-4 py-3">
//                     <div className="font-medium">{b.userId?.name}</div>
//                     <div className="text-xs text-slate-400">{b.userId?.email}</div>
//                   </td>

//                   <td className="px-4 py-3">{b.petName}</td>
//                   <td className="px-4 py-3">{b.productId?.name}</td>

//                   <td className="px-4 py-3">
//                     <div className="font-medium">{new Date(b.date).toDateString()}</div>
//                     <div className="text-xs text-slate-400">{b.timeSlot}</div>
//                   </td>

//                   <td className="px-4 py-3 font-semibold">
//                     ₹{(b.bookingMarkedPrice || 0) - (b.discount || 0)}
//                   </td>

//                   <td className="px-4 py-3">
//                     <StatusPill status={b.status || "pending"} />
//                   </td>

//                   <td className="px-4 py-3 space-x-2">
//                     {b.addons?.length > 0 && (
//                       <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs">
//                         + Add-ons
//                       </span>
//                     )}
//                     {b.aggression === "3" && (
//                       <span className="px-2 py-1 rounded-full bg-red-50 text-red-600 text-xs">
//                         ⚠ Aggressive
//                       </span>
//                     )}
//                   </td>

//                   {/* ✅ Groomer with booking count badge */}
//                   <td className="px-4 py-3">
//                     {groomerMap[b.assignedGroomer] ? (
//                       <div className="relative group inline-flex items-center gap-2">
//                         <span className="font-semibold text-indigo-600 cursor-pointer underline decoration-dotted">
//                           {groomerMap[b.assignedGroomer].name}
//                         </span>

//                         <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
//                           {groomerMap[b.assignedGroomer].bookingCount} active
//                         </span>

//                         {/* Tooltip */}
//                         <div className="absolute z-50 hidden group-hover:block left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-3 text-xs top-full">
//                           <p className="font-semibold text-slate-800">{groomerMap[b.assignedGroomer].name}</p>
//                           <p className="text-slate-500">📞 {groomerMap[b.assignedGroomer].phone}</p>
//                           <p className="text-slate-500">📍 {groomerMap[b.assignedGroomer].city}</p>
//                           <p className="text-slate-500">⭐ Rating: {groomerMap[b.assignedGroomer].rating || "N/A"}</p>
//                           <p className="text-slate-500">📋 Active bookings: {groomerMap[b.assignedGroomer].bookingCount}</p>
//                         </div>
//                       </div>
//                     ) : (
//                       <span className="text-slate-400 italic">Not assigned</span>
//                     )}
//                   </td>

//                   <td className="px-4 py-3">
//                     <button
//                       onClick={() => {
//                         setSelectedBooking(b);
//                         changeReadStatus.mutate(b._id);
//                       }}
//                       className="px-3 py-1 rounded-lg bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/20 text-xs font-semibold"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {paginatedBookings.length === 0 && (
//                 <tr>
//                   <td colSpan={10} className="px-4 py-12 text-center text-slate-400">
//                     No bookings found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ✅ PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-between mt-4 px-2">
//           <p className="text-sm text-slate-500">
//             Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredBookings.length)} of{" "}
//             {filteredBookings.length} bookings
//           </p>

//           <div className="flex gap-2 flex-wrap">
//             <button
//               onClick={() => setPage((p) => Math.max(p - 1, 1))}
//               disabled={page === 1}
//               className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-medium disabled:opacity-40 hover:bg-slate-50"
//             >
//               ← Prev
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1)
//               .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
//               .reduce((acc, p, i, arr) => {
//                 if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
//                 acc.push(p);
//                 return acc;
//               }, [])
//               .map((p, i) =>
//                 p === "..." ? (
//                   <span key={`ellipsis-${i}`} className="px-2 py-2 text-slate-400 text-sm">
//                     ...
//                   </span>
//                 ) : (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
//                       page === p
//                         ? "bg-indigo-600 text-white border-indigo-600"
//                         : "bg-white border-slate-200 hover:bg-slate-50"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 )
//               )}

//             <button
//               onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//               disabled={page === totalPages}
//               className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-medium disabled:opacity-40 hover:bg-slate-50"
//             >
//               Next →
//             </button>
//           </div>
//         </div>
//       )}

//       {selectedBooking && (
//         <FullPageBookingView
//           booking={selectedBooking}
//           onClose={() => setSelectedBooking(null)}
//           onUpdated={refetch}
//         />
//       )}
//     </div>
//   );
// }

// /* ================= FULL PAGE BOOKING VIEW ================= */

// function FullPageBookingView({ booking, onClose, onUpdated }) {
//   const [status, setStatus] = useState(booking.status || "pending");
//   const [assignedGroomer, setAssignedGroomer] = useState(booking.assignedGroomer || "");

//   const { data: groomers, isPending } = useQuery({
//     queryKey: ["groomers"],
//     queryFn: GetAllGroomers,
//   });

//   const updateStatus = useMutation({
//     mutationFn: async () => {
//       const res = await axios({
//         method: "patch",
//         url: `${API_URL_BASE}/api/v1/bookings/change-booking-status/${booking._id}`,
//         headers: { "Content-Type": "application/json" },
//         data: { status },
//         withCredentials: true,
//       });
//       return res.data;
//     },
//     onSuccess: () => onUpdated(),
//   });

//   const assignGroomer = useMutation({
//     mutationFn: async () => {
//       await axios.patch(
//         `${API_URL_BASE}/api/v1/bookings/assign-groomer/${booking._id}`,
//         { groomerId: assignedGroomer },
//         { withCredentials: true },
//       );
//     },
//     onSuccess: () => onUpdated(),
//   });

//   if (isPending) return <Loader />;

//   const steps = ["pending", "confirmed", "on_the_way", "completed"];

//   const handleCopyDetails = async () => {
//     const formattedText = `
// Name - ${booking.userId?.name || ""}
// Contact - ${booking.mobile || ""}
// Location - ${booking.address || ""}
// Date - ${booking.date ? new Date(booking.date).toLocaleDateString() : ""}
// Time - ${booking.timeSlot || ""}
// Breed - ${booking.breed || ""}
// Package - ${booking.productId?.name || ""}
// Add Ons - ${booking.addons?.length ? booking.addons.map((a) => a.name || a).join(", ") : "None"}
// Total Price - ₹${(booking.bookingMarkedPrice || 0) - (booking.discount || 0)}
//     `.trim();

//     try {
//       await navigator.clipboard.writeText(formattedText);
//       alert("Booking details copied to clipboard ✅");
//     } catch (err) {
//       alert("Failed to copy");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-[#f4f6fb] overflow-y-auto">
//       {/* Top Bar */}
//       <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
//         <div>
//           <h2 className="text-2xl font-bold">Booking #{booking._id.slice(-6)}</h2>
//           <p className="text-sm text-slate-500">Full Booking View</p>
//         </div>

//         <button
//           onClick={handleCopyDetails}
//           className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
//         >
//           📋 Copy Details
//         </button>

//         <button
//           onClick={onClose}
//           className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm"
//         >
//           Close
//         </button>
//       </div>

//       <div className="p-8 space-y-8">
//         {/* STATUS TIMELINE */}
//         <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
//           <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase">Status Timeline</h3>
//           <div className="flex items-center justify-between">
//             {steps.map((s, i) => (
//               <div key={s} className="flex-1 flex flex-col items-center">
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
//                     steps.indexOf(status) >= i ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
//                   }`}
//                 >
//                   {i + 1}
//                 </div>
//                 <span className="mt-2 text-xs capitalize text-slate-600">{s.replaceAll("_", " ")}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* STATUS + ASSIGN */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InfoCard title="Change Status">
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200"
//             >
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="on_the_way">On The Way</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//             <button
//               onClick={() => updateStatus.mutate()}
//              disabled={updateStatus.isPending}
//     className={`mt-3 w-full px-4 py-2 rounded-lg font-semibold text-white transition-colors ${
//       updateStatus.isPending
//         ? "bg-indigo-400 cursor-not-allowed"
//         : "bg-indigo-600 hover:bg-indigo-700"
//     }`}>
//                {updateStatus.isPending ? "Updating…" : "Update Status"}
//             </button>
//             {updateStatus.isSuccess && (
//     <p className="mt-2 text-sm text-emerald-600 font-medium">✓ Status updated successfully</p>
//   )}
//   {updateStatus.isError && (
//     <p className="mt-2 text-sm text-red-600 font-medium">✗ Failed to update status. Try again.</p>
//   )}
//           </InfoCard>

//           <InfoCard title="Assign Groomer">
//             <select
//               value={assignedGroomer}
//               onChange={(e) => setAssignedGroomer(e.target.value)}
//               className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200"
//             >
//               <option value="">Select Groomer</option>
//               {groomers.map((groomer) => (
//                 <option key={groomer._id} value={groomer._id}>
//                   {groomer.name}
//                 </option>
//               ))}
//             </select>
//             <button
//               onClick={() => assignGroomer.mutate()}
//                disabled={assignGroomer.isPending || !assignedGroomer}
//     className={`mt-3 w-full px-4 py-2 rounded-lg font-semibold text-white transition-colors ${
//       assignGroomer.isPending || !assignedGroomer
//         ? "bg-purple-400 cursor-not-allowed"
//         : "bg-purple-600 hover:bg-purple-700"
//     }`}
//   >
//     {assignGroomer.isPending ? "Assigning…" : "Assign Groomer"}
//             </button>
//             {assignGroomer.isSuccess && (
//     <p className="mt-2 text-sm text-emerald-600 font-medium">✓ Groomer assigned successfully</p>
//   )}
//   {assignGroomer.isError && (
//     <p className="mt-2 text-sm text-red-600 font-medium">✗ Failed to assign groomer. Try again.</p>
//   )}
//           </InfoCard>
//         </div>

//         {/* STATUS HISTORY */}
//         <InfoCard title="Status History">
//           {booking.statusHistory?.length ? (
//             <ul className="space-y-2">
//               {booking.statusHistory.map((h, i) => (
//                 <li key={i} className="flex justify-between text-sm">
//                   <span className="capitalize">{h.status.replaceAll("_", " ")}</span>
//                   <span className="text-slate-400">
//                     {h.changedBy} · {new Date(h.changedAt).toLocaleString()}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-sm text-slate-400">No history yet</p>
//           )}
//         </InfoCard>

//         {/* DETAILS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InfoCard title="Customer & Location">
//             <p><strong>Name:</strong> {booking.userId?.name}</p>
//             <p><strong>Email:</strong> {booking.userId?.email}</p>
            

            
//             <p><strong>Address:</strong> {booking.address}</p>
//             {booking.pincode && <p><strong>Pincode:</strong> {booking.pincode}</p>}
// {booking.city && <p><strong>City:</strong> {booking.city}</p>}
//             <p><strong>Mobile:</strong> {booking.mobile}</p>

// {/* ✅ WhatsApp Button */}
// {booking.mobile && (
//     <a
//     href={`https://wa.me/91${booking.mobile}?text=${encodeURIComponent(
//       `Hi ${booking.userId?.name}, your pet grooming booking for ${booking.petName} is confirmed on ${new Date(booking.date).toDateString()} at ${booking.timeSlot}. - Petlinc Team`
//     )}`}
//     target="_blank"
//     rel="noreferrer"
//     className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold"
//   >
//     💬 WhatsApp Customer
//   </a>
// )}
//             {booking.lat && booking.lng && (
//               <div className="mt-4 space-y-3">
//                 <iframe
//                   title="map"
//                   width="100%"
//                   height="220"
//                   className="rounded-xl border"
//                   loading="lazy"
//                   src={`https://maps.google.com/maps?q=${booking.lat},${booking.lng}&z=15&output=embed`}
//                 />
//                 <a
//                   href={`https://www.google.com/maps?q=${booking.lat},${booking.lng}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="inline-block px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
//                 >
//                   🧭 Open in Google Maps
//                 </a>
//               </div>
//             )}
//           </InfoCard>

//           <InfoCard title="Pet">
//             <p><strong>Name:</strong> {booking.petName}</p>
//             <p><strong>Type:</strong> {booking.petType}</p>
//             <p><strong>Breed:</strong> {booking.breed}</p>
//             <p><strong>Aggression:</strong> {booking.aggression}</p>
//           </InfoCard>

//           <InfoCard title="Package Details">
//             <p><strong>Name:</strong> {booking.productId?.name}</p>
//             <p><strong>Tag:</strong> {booking.productId?.tag}</p>
//             <p><strong>Base Price:</strong> ₹{booking.productId?.price}</p>

//               {/* ✅ Age & Weight */}
//             {booking.age && <p><strong>Age:</strong> {booking.age} yrs</p>}
//             {booking.weight && <p><strong>Weight:</strong> {booking.weight} kg</p>}

//             {/* ✅ Special Notes */}
//             {booking.notes && (
//               <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
//                 <p className="text-xs font-semibold text-yellow-700 uppercase mb-1">Special Instructions</p>
//                 <p className="text-sm text-yellow-900">{booking.notes}</p>
//               </div>
//             )}


//             {booking.productId?.freeServices?.length > 0 && (
//               <div className="mt-2">
//                 <p className="font-semibold">Free Services:</p>
//                 <ul className="list-disc ml-5 text-sm">
//                   {booking.productId.freeServices.map((s, i) => (
//                     <li key={i}>{s}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {booking.addons?.length > 0 && (
//               <div className="mt-2">
//                 <p className="font-semibold">Add-ons:</p>
//                 <ul className="list-disc ml-5 text-sm">
//                   {booking.addons.map((a, i) => (
//                     <li key={i}>{a.name || a}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </InfoCard>

//           <InfoCard title="Pricing">
//             <p>Booking time: {new Date(booking.createdAt).toLocaleString()}</p>
//             <p>Marked: ₹{booking.bookingMarkedPrice}</p>
//             <p>Discount: ₹{booking.discount}</p>
//             <p className="font-bold text-emerald-600">
//               Final: ₹{(booking.bookingMarkedPrice || 0) - (booking.discount || 0)}
//             </p>
//           </InfoCard>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= UI HELPERS ================= */

// function InfoCard({ title, children }) {
//   return (
//     <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
//       <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase">{title}</h3>
//       <div className="space-y-1 text-sm text-slate-700">{children}</div>
//     </div>
//   );
// }

// function StatusPill({ status }) {
//   const map = {
//     pending: "bg-yellow-100 text-yellow-700",
//     confirmed: "bg-indigo-100 text-indigo-700",
//     on_the_way: "bg-purple-100 text-purple-700",
//     completed: "bg-emerald-100 text-emerald-700",
//     cancelled: "bg-red-100 text-red-700",
//   };

//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status] || "bg-slate-100 text-slate-500"}`}>
//       {status}
//     </span>
//   );
// }

// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useState, useMemo, useEffect } from "react";
// import { GetAllBookingsForDashboard } from "../Features/Booking/queryFunction";
// import axios from "axios";
// import AdminNavbar from "./../Features/Admin/AdminNavbar";
// import { GetAllGroomers } from "../Features/Groomers/queryFunctions";
// import { Loader } from "lucide-react";
// import queryClient from "../Store/queryClient";

// const API_URL_BASE = import.meta.env.VITE_BASE_URL;

// export default function AdminDashboard() {
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [todayOnly, setTodayOnly] = useState(false);
//   const [tomorrowOnly, setTomorrowOnly] = useState(false);
//   const [readFilter, setReadFilter] = useState("all");

//   const {
//     data: bookings = [],
//     isPending,
//     refetch,
//   } = useQuery({
//     queryKey: ["bookings"],
//     queryFn: GetAllBookingsForDashboard,
//   });

//   const { data: groomers } = useQuery({
//     queryKey: ["groomers"],
//     queryFn: GetAllGroomers,
//   });

//   const changeReadStatus = useMutation({
//     mutationFn: async () => {
//       await axios.patch(
//         `${API_URL_BASE}/api/v1/bookings/change-read-status/${selectedBooking._id}`,
//         {},
//         { withCredentials: true },
//       );
//     },
//     onSuccess: async () => {
//       queryClient.invalidateQueries(["bookings"]);
//     },
//   });

//   const groomerMap = useMemo(() => {
//     const map = {};
//     groomers?.forEach((g) => {
//       map[g._id] = g;
//     });
//     return map;
//   }, [groomers]);

//   const filteredBookings = useMemo(() => {
//     return bookings.filter((b) => {
//       const text =
//         `${b.petName} ${b.userId?.name} ${b.userId?.email}`.toLowerCase();
//       const matchesSearch = text.includes(search.toLowerCase());

//       const matchesStatus =
//         statusFilter === "all" || (b.status || "pending") === statusFilter;

//       const matchesRead =
//         readFilter === "all" ||
//         (readFilter === "unread" && !b.isRead) ||
//         (readFilter === "read" && b.isRead);

//       let matchesDate = true;
//       const bookingDate = new Date(b.date);
//       const today = new Date();
//       const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

//       if (todayOnly) {
//         matchesDate =
//           bookingDate.getDate() === today.getDate() &&
//           bookingDate.getMonth() === today.getMonth() &&
//           bookingDate.getFullYear() === today.getFullYear();
//       } else if (tomorrowOnly) {
//         matchesDate =
//           bookingDate.getDate() === tomorrow.getDate() &&
//           bookingDate.getMonth() === tomorrow.getMonth() &&
//           bookingDate.getFullYear() === tomorrow.getFullYear();
//       } else {
//         if (fromDate) matchesDate = bookingDate >= new Date(fromDate);
//         if (toDate)
//           matchesDate = matchesDate && bookingDate <= new Date(toDate);
//       }

//       return matchesSearch && matchesStatus && matchesRead && matchesDate;
//     });
//   }, [
//     bookings,
//     search,
//     statusFilter,
//     readFilter,
//     fromDate,
//     toDate,
//     todayOnly,
//     tomorrowOnly,
//   ]);

//   if (isPending) {
//     return (
//       <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center text-gray-500">
//         Loading bookings…
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f4f6fb] p-8 text-gray-800">
//       <AdminNavbar />
//       {/* Header */}
//       {/* <div className="mb-8">
//         <h1 className="text-3xl font-bold text-slate-900">Admin · Bookings</h1>
//         <p className="text-sm text-slate-500">Petlinc Operations Dashboard</p>
//       </div> */}

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 mb-6 mt-6">
//         <input
//           type="text"
//           placeholder="Search pet / customer / email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm"
//         />

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="on_the_way">On The Way</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         <select
//           value={readFilter}
//           onChange={(e) => setReadFilter(e.target.value)}
//           className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm"
//         >
//           <option value="all">All</option>
//           <option value="unread">Unread</option>
//           <option value="read">Read</option>
//         </select>

//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm"
//         />

//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm"
//         />
//         {/* 🆕 TODAY BUTTON */}
//         <button
//           onClick={() => {
//             setTodayOnly(!todayOnly);
//             setTomorrowOnly(false);
//             setFromDate("");
//             setToDate("");
//           }}
//           className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm transition
//             ${
//               todayOnly
//                 ? "bg-emerald-600 text-white border-emerald-600"
//                 : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
//             }`}
//         >
//           📅 Today
//         </button>
//         {/* 🆕 TOMORROW BUTTON */}
//         <button
//           onClick={() => {
//             setTomorrowOnly(!tomorrowOnly);
//             setTodayOnly(false);
//             setFromDate("");
//             setToDate("");
//           }}
//           className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm transition
//             ${
//               tomorrowOnly
//                 ? "bg-emerald-600 text-white border-emerald-600"
//                 : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
//             }`}
//         >
//           📅 Tomorrow
//         </button>

//         <button
//           onClick={() =>
//             setReadFilter((prev) => (prev === "unread" ? "all" : "unread"))
//           }
//           className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm
//     ${
//       readFilter === "unread"
//         ? "bg-orange-600 text-white border-orange-600"
//         : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
//     }`}
//         >
//           🔔 Unread Only
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-slate-50 text-slate-500">
//               <tr>
//                 <th className="px-4 py-3">S.No</th>
//                 {/* <th className="px-4 py-3">ID</th> */}
//                 <th className="px-4 py-3">Customer</th>
//                 <th className="px-4 py-3">Pet</th>
//                 <th className="px-4 py-3">Package</th>
//                 <th className="px-4 py-3">Booking Date</th>
//                 <th className="px-4 py-3">Amount</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Tags</th>
//                 <th className="px-4 py-3">Assigned groomer</th>
//                 <th className="px-4 py-3">Action</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100">
//               {filteredBookings.map((b, i) => (
//                 <tr
//                   key={b._id}
//                   className={`hover:bg-slate-50 transition ${!b.isRead ? "bg-orange-50" : ""}`}
//                 >
//                   <td className="px-4 py-3 font-mono text-xs text-slate-400">
//                     {i + 1}{" "}
//                     {!b.isRead && (
//                       <span className="text-orange-600 bg-orange-100 rounded-3xl p-2 mx-4">
//                         New
//                       </span>
//                     )}
//                   </td>
//                   {/* <td className="px-4 py-3 font-mono text-xs text-slate-400">{b._id.slice(-6)}</td> */}

//                   <td className="px-4 py-3">
//                     <div className="font-medium">{b.userId?.name}</div>
//                     <div className="text-xs text-slate-400">
//                       {b.userId?.email}
//                     </div>
//                   </td>

//                   <td className="px-4 py-3">{b.petName}</td>
//                   <td className="px-4 py-3">{b.productId?.name}</td>
//                   <td className="px-4 py-3">
//                     <div className="font-medium">
//                       {new Date(b.date).toDateString()}
//                     </div>
//                     <div className="text-xs text-slate-400">{b.timeSlot}</div>
//                   </td>
//                   <td className="px-4 py-3 font-semibold">
//                     ₹{b.bookingMarkedPrice - b.discount}
//                   </td>

//                   <td className="px-4 py-3">
//                     <StatusPill status={b.status || "pending"} />
//                   </td>

//                   <td className="px-4 py-3 space-x-2">
//                     {b.addons?.length > 0 && (
//                       <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs">
//                         + Add-ons
//                       </span>
//                     )}
//                     {b.aggression === "3" && (
//                       <span className="px-2 py-1 rounded-full bg-red-50 text-red-600 text-xs">
//                         ⚠Aggressive
//                       </span>
//                     )}
//                   </td>

//                   {/* <td className="px-4 py-3 font-semibold">{groomers.map((groomer)=>{if(groomer._id===b.assignedGroomer) return groomer.name})}</td> */}

//                   <td className="px-4 py-3">
//                     {groomerMap[b.assignedGroomer] ? (
//                       <div className="relative group inline-block">
//                         {/* Groomer Name */}
//                         <span className="font-semibold text-indigo-600 cursor-pointer underline decoration-dotted">
//                           {groomerMap[b.assignedGroomer].name}
//                         </span>

//                         {/* Tooltip */}
//                         <div className="absolute z-50 hidden group-hover:block left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-3 text-xs">
//                           <p className="font-semibold text-slate-800">
//                             {groomerMap[b.assignedGroomer].name}
//                           </p>
//                           <p className="text-slate-500">
//                             📞 {groomerMap[b.assignedGroomer].phone}
//                           </p>
//                           <p className="text-slate-500">
//                             📍 {groomerMap[b.assignedGroomer].city}
//                           </p>
//                           <p className="text-slate-500">
//                             ⭐ Rating:{" "}
//                             {groomerMap[b.assignedGroomer].rating || "N/A"}
//                           </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <span className="text-slate-400 italic">
//                         Not assigned
//                       </span>
//                     )}
//                   </td>

//                   <td className="px-4 py-3">
//                     <button
//                       onClick={() => {
//                         setSelectedBooking(b);
//                         changeReadStatus.mutate();
//                       }}
//                       className="px-3 py-1 rounded-lg bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/20 text-xs font-semibold"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {selectedBooking && (
//         <FullPageBookingView
//           booking={selectedBooking}
//           onClose={() => setSelectedBooking(null)}
//           onUpdated={refetch}
//         />
//       )}
//     </div>
//   );
// }

// /* ================= FULL PAGE BOOKING VIEW ================= */

// function FullPageBookingView({ booking, onClose, onUpdated }) {
//   const [status, setStatus] = useState(booking.status || "pending");
//   const [assignedGroomer, setAssignedGroomer] = useState(
//     booking.assignedGroomer || "",
//   );

//   const { data: groomers, isPending } = useQuery({
//     queryKey: ["groomers"],
//     queryFn: GetAllGroomers,
//   });

//   const updateStatus = useMutation({
//     mutationFn: async () => {
//       const res = await axios({
//         method: "patch",
//         url: `${API_URL_BASE}/api/v1/bookings/change-booking-status/${booking._id}`,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: {
//           status: status,
//         },
//         withCredentials: true,
//       });

//       return res.data;
//     },

//     onSuccess: () => onUpdated(),
//   });

//   const assignGroomer = useMutation({
//     mutationFn: async () => {
//       await axios.patch(
//         `${API_URL_BASE}/api/v1/bookings/assign-groomer/${booking._id}`,
//         { groomerId: assignedGroomer },
//         { withCredentials: true },
//       );
//     },
//     onSuccess: () => onUpdated(),
//   });

//   if (isPending) {
//     return <Loader />;
//   }
//   const steps = ["pending", "confirmed", "on_the_way", "completed"];

//   const handleCopyDetails = async () => {
//     const formattedText = `
// Name - ${booking.userId?.name || ""}
// Contact - ${booking.mobile || ""}
// Location - ${booking.address || ""}
// Date - ${booking.date ? new Date(booking.date).toLocaleDateString() : ""}
// Time - ${booking.timeSlot || ""}
// Breed - ${booking.breed || ""}
// Package - ${booking.productId?.name || ""}
// Add Ons - ${
//       booking.addons?.length
//         ? booking.addons.map((a) => a.name || a).join(", ")
//         : "None"
//     }
// Total Price - ₹${booking.bookingMarkedPrice - booking.discount}
//   `;

//     try {
//       await navigator.clipboard.writeText(formattedText.trim());
//       alert("Booking details copied to clipboard ✅");
//     } catch (err) {
//       console.error("Copy failed", err);
//       alert("Failed to copy");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-[#f4f6fb] overflow-y-auto">
//       {/* Top Bar */}
//       <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
//         <div>
//           <h2 className="text-2xl font-bold">
//             Booking #{booking._id.slice(-6)}
//           </h2>
//           <p className="text-sm text-slate-500">Full Booking View</p>
//         </div>

//         {/* <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
//           <div className="flex gap-3"> */}
//             <button
//               onClick={handleCopyDetails}
//               className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
//             >
//               📋 Copy Details
//             </button>
//           {/* </div>
//         </div> */}

//         <button
//           onClick={onClose}
//           className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm"
//         >
//           Close
//         </button>
//       </div>

//       <div className="p-8 space-y-8">
//         {/* STATUS TIMELINE */}
//         <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
//           <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase">
//             Status Timeline
//           </h3>
//           <div className="flex items-center justify-between">
//             {steps.map((s, i) => (
//               <div key={s} className="flex-1 flex flex-col items-center">
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${steps.indexOf(status) >= i ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}
//                 >
//                   {i + 1}
//                 </div>
//                 <span className="mt-2 text-xs capitalize text-slate-600">
//                   {s.replaceAll("_", " ")}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* STATUS + ASSIGN */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InfoCard title="Change Status">
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200"
//             >
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="on_the_way">On The Way</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>

//             <button
//               onClick={() => updateStatus.mutate()}
//               className="mt-3 w-full px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
//             >
//               Update Status
//             </button>
//           </InfoCard>

//           <InfoCard title="Assign Groomer">
//             <select
//               value={assignedGroomer}
//               onChange={(e) => setAssignedGroomer(e.target.value)}
//               className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200"
//             >
//               <option value="">Select Groomer</option>
//               {groomers.map((groomer) => {
//                 return (
//                   <option key={groomer._id} value={groomer._id}>
//                     {groomer.name}
//                   </option>
//                 );
//               })}
//               {/* <option value="">Select Groomer</option>
//               <option value="g1">Rahul Sharma</option>
//               <option value="g2">Amit Verma</option>
//               <option value="g3">Sanjay Kumar</option> */}
//             </select>

//             <button
//               onClick={() => assignGroomer.mutate()}
//               className="mt-3 w-full px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold"
//             >
//               Assign Groomer
//             </button>
//           </InfoCard>
//         </div>

//         {/* STATUS HISTORY */}
//         <InfoCard title="Status History">
//           {booking.statusHistory?.length ? (
//             <ul className="space-y-2">
//               {booking.statusHistory.map((h, i) => (
//                 <li key={i} className="flex justify-between text-sm">
//                   <span className="capitalize">
//                     {h.status.replaceAll("_", " ")}
//                   </span>
//                   <span className="text-slate-400">
//                     {h.changedBy} · {new Date(h.changedAt).toLocaleString()}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-sm text-slate-400">No history yet</p>
//           )}
//         </InfoCard>

//         {/* DETAILS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* CUSTOMER + MAP */}
//           <InfoCard title="Customer & Location">
//             <p>
//               <strong>Name:</strong> {booking.userId?.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {booking.userId?.email}
//             </p>
//             <p>
//               <strong>Mobile:</strong> {booking.mobile}
//             </p>
//             <p>
//               <strong>Address:</strong> {booking.address}
//             </p>

//             {booking.lat && booking.lng && (
//               <div className="mt-4 space-y-3">
//                 <iframe
//                   title="map"
//                   width="100%"
//                   height="220"
//                   className="rounded-xl border"
//                   loading="lazy"
//                   src={`https://maps.google.com/maps?q=${booking.lat},${booking.lng}&z=15&output=embed`}
//                 />

//                 <a
//                   href={`https://www.google.com/maps?q=${booking.lat},${booking.lng}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="inline-block px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
//                 >
//                   🧭 Open in Google Maps
//                 </a>
//               </div>
//             )}
//           </InfoCard>

//           {/* PET */}
//           <InfoCard title="Pet">
//             <p>
//               <strong>Name:</strong> {booking.petName}
//             </p>
//             <p>
//               <strong>Type:</strong> {booking.petType}
//             </p>
//             <p>
//               <strong>Breed:</strong> {booking.breed}
//             </p>
//             <p>
//               <strong>Aggression:</strong> {booking.aggression}
//             </p>
//           </InfoCard>

//           {/* PACKAGE DETAILS */}
//           <InfoCard title="Package Details">
//             <p>
//               <strong>Name:</strong> {booking.productId?.name}
//             </p>
//             <p>
//               <strong>Tag:</strong> {booking.productId?.tag}
//             </p>
//             <p>
//               <strong>Base Price:</strong> ₹{booking.productId?.price}
//             </p>

//             {booking.productId?.freeServices?.length > 0 && (
//               <div className="mt-2">
//                 <p className="font-semibold">Free Services:</p>
//                 <ul className="list-disc ml-5 text-sm">
//                   {booking.productId.freeServices.map((s, i) => (
//                     <li key={i}>{s}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {booking.addons?.length > 0 && (
//               <div className="mt-2">
//                 <p className="font-semibold">Add-ons:</p>
//                 <ul className="list-disc ml-5 text-sm">
//                   {booking.addons.map((a, i) => (
//                     <li key={i}>{a.name || a}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </InfoCard>

//           {/* PRICING */}
//           <InfoCard title="Pricing">
//             <p>Marked: ₹{booking.bookingMarkedPrice}</p>
//             <p>Discount: ₹{booking.discount}</p>
//             <p className="font-bold text-emerald-600">
//               Final: ₹{booking.bookingMarkedPrice - booking.discount}
//             </p>
//           </InfoCard>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= UI HELPERS ================= */

// function InfoCard({ title, children }) {
//   return (
//     <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
//       <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase">
//         {title}
//       </h3>
//       <div className="space-y-1 text-sm text-slate-700">{children}</div>
//     </div>
//   );
// }

// function StatusPill({ status }) {
//   const map = {
//     pending: "bg-yellow-100 text-yellow-700",
//     confirmed: "bg-indigo-100 text-indigo-700",
//     on_the_way: "bg-purple-100 text-purple-700",
//     completed: "bg-emerald-100 text-emerald-700",
//     cancelled: "bg-red-100 text-red-700",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status] || "bg-slate-100 text-slate-500"}`}
//     >
//       {status}
//     </span>
//   );
// }


import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { GetAllBookingsForDashboard } from "../Features/Booking/queryFunction";
import axios from "axios";
import AdminNavbar from "./../Features/Admin/AdminNavbar";
import { GetAllGroomers } from "../Features/Groomers/queryFunctions";
import { Loader, Users, BookOpen, BadgeCheck, AlertCircle, CheckCircle2, Loader2, X, ChevronDown, ChevronUp, IndianRupee } from "lucide-react";
import queryClient from "../Store/queryClient";

const API_URL_BASE = import.meta.env.VITE_BASE_URL;
const PAGE_SIZE = 10;

// ── Partner API helpers (same axios pattern as rest of codebase) ──────────────
async function adminFetchPartners() {
  const res = await axios.get(`${API_URL_BASE}/api/v1/partners/admin/all`, { withCredentials: true });
  return res.data.data;
}
async function adminFetchUsers() {
  // Reuse your existing user listing endpoint — adjust path if yours differs
  const res = await axios.get(`${API_URL_BASE}/api/v1/users/get-all-users`, { withCredentials: true });
  console.log("Fetched users:", res.data.data); // Debug log
  return res.data.data;
}

export default function AdminDashboard() {
  // ── Tab switcher: "bookings" | "partners" ────────────────────────────────
  const [activeTab, setActiveTab] = useState("bookings");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [todayOnly, setTodayOnly] = useState(false);
  const [tomorrowOnly, setTomorrowOnly] = useState(false);
  const [readFilter, setReadFilter] = useState("all");

  // ✅ Sort state
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  // ✅ Pagination state
  const [page, setPage] = useState(1);

  const {
    data: bookings = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: GetAllBookingsForDashboard,
  });

  const { data: groomers } = useQuery({
    queryKey: ["groomers"],
    queryFn: GetAllGroomers,
  });

  const changeReadStatus = useMutation({
    mutationFn: async (bookingId) => {
      await axios.patch(
        `${API_URL_BASE}/api/v1/bookings/change-read-status/${bookingId}`,
        {},
        { withCredentials: true },
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["bookings"]);
    },
  });

  // ✅ Sort toggle helper
  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  // ✅ Reset to page 1 when filters/sort change
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, readFilter, fromDate, toDate, todayOnly, tomorrowOnly, sortKey]);

  // ✅ Groomer map with active booking count
  const groomerMap = useMemo(() => {
    const map = {};
    groomers?.forEach((g) => {
      map[g._id] = { ...g, bookingCount: 0 };
    });

    bookings.forEach((b) => {
      if (b.assignedGroomer && map[b.assignedGroomer]) {
        if (b.status !== "cancelled" && b.status !== "completed") {
          map[b.assignedGroomer].bookingCount += 1;
        }
      }
    });

    return map;
  }, [groomers, bookings]);

  // ✅ Stats derived from all bookings (not paginated)
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => (b.status || "pending") === "pending").length;
    const completed = bookings.filter((b) => b.status === "completed").length;
    const cancelled = bookings.filter((b) => b.status === "cancelled").length;
    const revenue = bookings
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => sum + ((b.bookingMarkedPrice || 0) - (b.discount || 0)), 0);

    return { total, pending, completed, cancelled, revenue };
  }, [bookings]);

  // ✅ Filter + sort
  const filteredBookings = useMemo(() => {
    let result = bookings.filter((b) => {
      const text =
        `${b.petName} ${b.userId?.name} ${b.userId?.email}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || (b.status || "pending") === statusFilter;

      const matchesRead =
        readFilter === "all" ||
        (readFilter === "unread" && !b.isRead) ||
        (readFilter === "read" && b.isRead);

      let matchesDate = true;
      const bookingDate = new Date(b.date);
      const today = new Date();
      const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

      if (todayOnly) {
        matchesDate =
          bookingDate.getDate() === today.getDate() &&
          bookingDate.getMonth() === today.getMonth() &&
          bookingDate.getFullYear() === today.getFullYear();
      } else if (tomorrowOnly) {
        matchesDate =
          bookingDate.getDate() === tomorrow.getDate() &&
          bookingDate.getMonth() === tomorrow.getMonth() &&
          bookingDate.getFullYear() === tomorrow.getFullYear();
      } else {
        if (fromDate) matchesDate = bookingDate >= new Date(fromDate);
        if (toDate) matchesDate = matchesDate && bookingDate <= new Date(toDate);
      }

      return matchesSearch && matchesStatus && matchesRead && matchesDate;
    });

    // ✅ Sort
    result = [...result].sort((a, b) => {
      let valA, valB;
      if (sortKey === "date") {
        valA = new Date(a.date);
        valB = new Date(b.date);
      } else if (sortKey === "amount") {
        valA = (a.bookingMarkedPrice || 0) - (a.discount || 0);
        valB = (b.bookingMarkedPrice || 0) - (b.discount || 0);
      } else if (sortKey === "status") {
        valA = a.status || "pending";
        valB = b.status || "pending";
      }
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [bookings, search, statusFilter, readFilter, fromDate, toDate, todayOnly, tomorrowOnly, sortKey, sortDir]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredBookings.length / PAGE_SIZE);

  const paginatedBookings = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredBookings.slice(start, start + PAGE_SIZE);
  }, [filteredBookings, page]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center text-gray-500">
        Loading bookings…
      </div>
    );
  }

  const SortIcon = ({ key: k }) =>
    sortKey === k ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕";

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-8 text-gray-800">
      <AdminNavbar />

      {/* ── TAB SWITCHER ─────────────────────────────────────────────────── */}
      <div className="flex gap-1 mt-6 mb-4 bg-white border border-slate-200 rounded-2xl p-1.5 w-fit shadow-sm">
        {[
          { key: "bookings", label: "📋 Bookings" },
          { key: "partners", label: "🤝 Partners" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === tab.key
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── PARTNERS TAB ─────────────────────────────────────────────────── */}
      {activeTab === "partners" && <PartnersPanel />}

      {/* ── BOOKINGS TAB ─────────────────────────────────────────────────── */}
      {activeTab === "bookings" && <>

      {/* ✅ STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 mt-6">
        {[
          { label: "Total Bookings", value: stats.total, color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
          { label: "Pending", value: stats.pending, color: "bg-yellow-50 text-yellow-700 border-yellow-100" },
          { label: "Completed", value: stats.completed, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
          { label: "Cancelled", value: stats.cancelled, color: "bg-red-50 text-red-700 border-red-100" },
          { label: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, color: "bg-orange-50 text-orange-700 border-orange-100" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-4 border shadow-sm ${s.color}`}>
            <p className="text-xs font-semibold uppercase opacity-60">{s.label}</p>
            <p className="text-2xl font-extrabold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search pet / customer / email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="on_the_way">On The Way</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={readFilter}
          onChange={(e) => setReadFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm"
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm"
        />

        <button
          onClick={() => {
            setTodayOnly(!todayOnly);
            setTomorrowOnly(false);
            setFromDate("");
            setToDate("");
          }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm transition
            ${todayOnly ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
        >
          📅 Today
        </button>

        <button
          onClick={() => {
            setTomorrowOnly(!tomorrowOnly);
            setTodayOnly(false);
            setFromDate("");
            setToDate("");
          }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm transition
            ${tomorrowOnly ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
        >
          📅 Tomorrow
        </button>

        <button
          onClick={() => setReadFilter((prev) => (prev === "unread" ? "all" : "unread"))}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm
            ${readFilter === "unread" ? "bg-orange-600 text-white border-orange-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
        >
          🔔 Unread Only
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">S.No</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Pet</th>
                <th className="px-4 py-3">Package</th>

                {/* ✅ Sortable: Date */}
                <th
                  className="px-4 py-3 cursor-pointer hover:text-slate-800 select-none whitespace-nowrap"
                  onClick={() => toggleSort("date")}
                >
                  Booking Date
                  <span className="ml-1 text-slate-400">
                    {sortKey === "date" ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                  </span>
                </th>

                {/* ✅ Sortable: Amount */}
                <th
                  className="px-4 py-3 cursor-pointer hover:text-slate-800 select-none"
                  onClick={() => toggleSort("amount")}
                >
                  Amount
                  <span className="ml-1 text-slate-400">
                    {sortKey === "amount" ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                  </span>
                </th>

                {/* ✅ Sortable: Status */}
                <th
                  className="px-4 py-3 cursor-pointer hover:text-slate-800 select-none"
                  onClick={() => toggleSort("status")}
                >
                  Status
                  <span className="ml-1 text-slate-400">
                    {sortKey === "status" ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                  </span>
                </th>

                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3">Assigned Groomer</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedBookings.map((b, i) => (
                <tr
                  key={b._id}
                  className={`hover:bg-slate-50 transition ${!b.isRead ? "bg-orange-50" : ""}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">
                    {(page - 1) * PAGE_SIZE + i + 1}
                    {!b.isRead && (
                      <span className="text-orange-600 bg-orange-100 rounded-3xl p-2 mx-4">
                        New
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-medium">{b.userId?.name}</div>
                    <div className="text-xs text-slate-400">{b.userId?.email}</div>
                  </td>

                  <td className="px-4 py-3">{b.petName}</td>
                  <td className="px-4 py-3">{b.productId?.name}</td>

                  <td className="px-4 py-3">
                    <div className="font-medium">{new Date(b.date).toDateString()}</div>
                    <div className="text-xs text-slate-400">{b.timeSlot}</div>
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    ₹{(b.bookingMarkedPrice || 0) - (b.discount || 0)}
                  </td>

                  <td className="px-4 py-3">
                    <StatusPill status={b.status || "pending"} />
                  </td>

                  <td className="px-4 py-3 space-x-2">
                    {b.addons?.length > 0 && (
                      <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs">
                        + Add-ons
                      </span>
                    )}
                    {b.aggression === "3" && (
                      <span className="px-2 py-1 rounded-full bg-red-50 text-red-600 text-xs">
                        ⚠ Aggressive
                      </span>
                    )}
                  </td>

                  {/* ✅ Groomer with booking count badge */}
                  <td className="px-4 py-3">
                    {groomerMap[b.assignedGroomer] ? (
                      <div className="relative group inline-flex items-center gap-2">
                        <span className="font-semibold text-indigo-600 cursor-pointer underline decoration-dotted">
                          {groomerMap[b.assignedGroomer].name}
                        </span>

                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                          {groomerMap[b.assignedGroomer].bookingCount} active
                        </span>

                        {/* Tooltip */}
                        <div className="absolute z-50 hidden group-hover:block left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-3 text-xs top-full">
                          <p className="font-semibold text-slate-800">{groomerMap[b.assignedGroomer].name}</p>
                          <p className="text-slate-500">📞 {groomerMap[b.assignedGroomer].phone}</p>
                          <p className="text-slate-500">📍 {groomerMap[b.assignedGroomer].city}</p>
                          <p className="text-slate-500">⭐ Rating: {groomerMap[b.assignedGroomer].rating || "N/A"}</p>
                          <p className="text-slate-500">📋 Active bookings: {groomerMap[b.assignedGroomer].bookingCount}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Not assigned</span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        changeReadStatus.mutate(b._id);
                      }}
                      className="px-3 py-1 rounded-lg bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/20 text-xs font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedBookings.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-slate-400">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-sm text-slate-500">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredBookings.length)} of{" "}
            {filteredBookings.length} bookings
          </p>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-medium disabled:opacity-40 hover:bg-slate-50"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, i, arr) => {
                if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 py-2 text-slate-400 text-sm">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                      page === p
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-medium disabled:opacity-40 hover:bg-slate-50"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {selectedBooking && (
        <FullPageBookingView
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdated={refetch}
        />
      )}

      </>} {/* end bookings tab */}
    </div>
  );
}

/* ================= FULL PAGE BOOKING VIEW ================= */

function FullPageBookingView({ booking, onClose, onUpdated }) {
  const [status, setStatus] = useState(booking.status || "pending");
  const [assignedGroomer, setAssignedGroomer] = useState(booking.assignedGroomer || "");

  const { data: groomers, isPending } = useQuery({
    queryKey: ["groomers"],
    queryFn: GetAllGroomers,
  });

  const updateStatus = useMutation({
    mutationFn: async () => {
      const res = await axios({
        method: "patch",
        url: `${API_URL_BASE}/api/v1/bookings/change-booking-status/${booking._id}`,
        headers: { "Content-Type": "application/json" },
        data: { status },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => onUpdated(),
  });

  const assignGroomer = useMutation({
    mutationFn: async () => {
      await axios.patch(
        `${API_URL_BASE}/api/v1/bookings/assign-groomer/${booking._id}`,
        { groomerId: assignedGroomer },
        { withCredentials: true },
      );
    },
    onSuccess: () => onUpdated(),
  });

  if (isPending) return <Loader />;

  const steps = ["pending", "confirmed", "on_the_way", "completed"];

  const handleCopyDetails = async () => {
    const formattedText = `
Name - ${booking.userId?.name || ""}
Contact - ${booking.mobile || ""}
Location - ${booking.address || ""}
Date - ${booking.date ? new Date(booking.date).toLocaleDateString() : ""}
Time - ${booking.timeSlot || ""}
Breed - ${booking.breed || ""}
Package - ${booking.productId?.name || ""}
Add Ons - ${booking.addons?.length ? booking.addons.map((a) => a.name || a).join(", ") : "None"}
Total Price - ₹${(booking.bookingMarkedPrice || 0) - (booking.discount || 0)}
    `.trim();

    try {
      await navigator.clipboard.writeText(formattedText);
      alert("Booking details copied to clipboard ✅");
    } catch (err) {
      alert("Failed to copy");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#f4f6fb] overflow-y-auto">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-2xl font-bold">Booking #{booking._id.slice(-6)}</h2>
          <p className="text-sm text-slate-500">Full Booking View</p>
        </div>

        <button
          onClick={handleCopyDetails}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
        >
          📋 Copy Details
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm"
        >
          Close
        </button>
      </div>

      <div className="p-8 space-y-8">
        {/* STATUS TIMELINE */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase">Status Timeline</h3>
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    steps.indexOf(status) >= i ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="mt-2 text-xs capitalize text-slate-600">{s.replaceAll("_", " ")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STATUS + ASSIGN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard title="Change Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="on_the_way">On The Way</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() => updateStatus.mutate()}
             disabled={updateStatus.isPending}
    className={`mt-3 w-full px-4 py-2 rounded-lg font-semibold text-white transition-colors ${
      updateStatus.isPending
        ? "bg-indigo-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700"
    }`}>
               {updateStatus.isPending ? "Updating…" : "Update Status"}
            </button>
            {updateStatus.isSuccess && (
    <p className="mt-2 text-sm text-emerald-600 font-medium">✓ Status updated successfully</p>
  )}
  {updateStatus.isError && (
    <p className="mt-2 text-sm text-red-600 font-medium">✗ Failed to update status. Try again.</p>
  )}
          </InfoCard>

          <InfoCard title="Assign Groomer">
            <select
              value={assignedGroomer}
              onChange={(e) => setAssignedGroomer(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200"
            >
              <option value="">Select Groomer</option>
              {groomers.map((groomer) => (
                <option key={groomer._id} value={groomer._id}>
                  {groomer.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => assignGroomer.mutate()}
               disabled={assignGroomer.isPending || !assignedGroomer}
    className={`mt-3 w-full px-4 py-2 rounded-lg font-semibold text-white transition-colors ${
      assignGroomer.isPending || !assignedGroomer
        ? "bg-purple-400 cursor-not-allowed"
        : "bg-purple-600 hover:bg-purple-700"
    }`}
  >
    {assignGroomer.isPending ? "Assigning…" : "Assign Groomer"}
            </button>
            {assignGroomer.isSuccess && (
    <p className="mt-2 text-sm text-emerald-600 font-medium">✓ Groomer assigned successfully</p>
  )}
  {assignGroomer.isError && (
    <p className="mt-2 text-sm text-red-600 font-medium">✗ Failed to assign groomer. Try again.</p>
  )}
          </InfoCard>
        </div>

        {/* STATUS HISTORY */}
        <InfoCard title="Status History">
          {booking.statusHistory?.length ? (
            <ul className="space-y-2">
              {booking.statusHistory.map((h, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="capitalize">{h.status.replaceAll("_", " ")}</span>
                  <span className="text-slate-400">
                    {h.changedBy} · {new Date(h.changedAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">No history yet</p>
          )}
        </InfoCard>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard title="Customer & Location">
            <p><strong>Name:</strong> {booking.userId?.name}</p>
            <p><strong>Email:</strong> {booking.userId?.email}</p>
            

            
            <p><strong>Address:</strong> {booking.address}</p>
            {booking.pincode && <p><strong>Pincode:</strong> {booking.pincode}</p>}
{booking.city && <p><strong>City:</strong> {booking.city}</p>}
            <p><strong>Mobile:</strong> {booking.mobile}</p>

{/* ✅ WhatsApp Button */}
{booking.mobile && (
    <a
    href={`https://wa.me/91${booking.mobile}?text=${encodeURIComponent(
      `Hi ${booking.userId?.name}, your pet grooming booking for ${booking.petName} is confirmed on ${new Date(booking.date).toDateString()} at ${booking.timeSlot}. - Petlinc Team`
    )}`}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold"
  >
    💬 WhatsApp Customer
  </a>
)}
            {booking.lat && booking.lng && (
              <div className="mt-4 space-y-3">
                <iframe
                  title="map"
                  width="100%"
                  height="220"
                  className="rounded-xl border"
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${booking.lat},${booking.lng}&z=15&output=embed`}
                />
                <a
                  href={`https://www.google.com/maps?q=${booking.lat},${booking.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
                >
                  🧭 Open in Google Maps
                </a>
              </div>
            )}
          </InfoCard>

          <InfoCard title="Pet">
            <p><strong>Name:</strong> {booking.petName}</p>
            <p><strong>Type:</strong> {booking.petType}</p>
            <p><strong>Breed:</strong> {booking.breed}</p>
            <p><strong>Aggression:</strong> {booking.aggression}</p>
          </InfoCard>

          <InfoCard title="Package Details">
            <p><strong>Name:</strong> {booking.productId?.name}</p>
            <p><strong>Tag:</strong> {booking.productId?.tag}</p>
            <p><strong>Base Price:</strong> ₹{booking.productId?.price}</p>

              {/* ✅ Age & Weight */}
            {booking.age && <p><strong>Age:</strong> {booking.age} yrs</p>}
            {booking.weight && <p><strong>Weight:</strong> {booking.weight} kg</p>}

            {/* ✅ Special Notes */}
            {booking.notes && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-xs font-semibold text-yellow-700 uppercase mb-1">Special Instructions</p>
                <p className="text-sm text-yellow-900">{booking.notes}</p>
              </div>
            )}


            {booking.productId?.freeServices?.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Free Services:</p>
                <ul className="list-disc ml-5 text-sm">
                  {booking.productId.freeServices.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {booking.addons?.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Add-ons:</p>
                <ul className="list-disc ml-5 text-sm">
                  {booking.addons.map((a, i) => (
                    <li key={i}>{a.name || a}</li>
                  ))}
                </ul>
              </div>
            )}
          </InfoCard>

          <InfoCard title="Pricing">
            <p>Booking time: {new Date(booking.createdAt).toLocaleString()}</p>
            <p>Marked: ₹{booking.bookingMarkedPrice}</p>
            <p>Discount: ₹{booking.discount}</p>
            <p className="font-bold text-emerald-600">
              Final: ₹{(booking.bookingMarkedPrice || 0) - (booking.discount || 0)}
            </p>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function InfoCard({ title, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase">{title}</h3>
      <div className="space-y-1 text-sm text-slate-700">{children}</div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-indigo-100 text-indigo-700",
    on_the_way: "bg-purple-100 text-purple-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status] || "bg-slate-100 text-slate-500"}`}>
      {status}
    </span>
  );
}
/* ═══════════════════════════════════════════════════════════════
   PARTNERS PANEL
   Full lifecycle: search users → register → list → manage
   All endpoints from partnerController.js / partnerRouter.js
   ═══════════════════════════════════════════════════════════════ */
function PartnersPanel() {
  const [view, setView] = useState("list"); // "list" | "register"
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");

  // ── Fetch all partners: GET /api/v1/partners/admin/all ──────
  const {
    data: partners = [],
    isLoading: partnersLoading,
    refetch: refetchPartners,
  } = useQuery({
    queryKey: ["adminPartners"],
    queryFn: adminFetchPartners,
  });

  const filtered = partners.filter((p) =>
    `${p.name} ${p.phone} ${p.city}`.toLowerCase().includes(search.toLowerCase())
  );

  // ── Summary stats ───────────────────────────────────────────
  const totalEarnings  = partners.reduce((s, p) => s + (p.totalEarnings || 0), 0);
  const totalPending   = partners.reduce((s, p) => s + (p.pendingPayout || 0), 0);
  const totalBookings  = partners.reduce((s, p) => s + (p.totalBookings || 0), 0);

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Partners", value: partners.length,                      color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
          { label: "Partner Bookings", value: totalBookings,                      color: "bg-orange-50 text-orange-700 border-orange-100" },
          { label: "Total Incentives Earned", value: `₹${totalEarnings.toLocaleString()}`, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
          { label: "Pending Payouts",          value: `₹${totalPending.toLocaleString()}`,  color: "bg-amber-50 text-amber-700 border-amber-100" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-4 border shadow-sm ${s.color}`}>
            <p className="text-xs font-semibold uppercase opacity-60">{s.label}</p>
            <p className="text-2xl font-extrabold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search by name, phone, city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm flex-1 min-w-[200px]"
        />
        <button
          onClick={() => setView(view === "register" ? "list" : "register")}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
            view === "register"
              ? "bg-slate-200 text-slate-700"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {view === "register" ? "← Back to List" : "+ Register New Partner"}
        </button>
      </div>

      {/* ── REGISTER FORM ── */}
      {view === "register" && (
        <RegisterPartnerForm
          onSuccess={() => {
            setView("list");
            refetchPartners();
          }}
        />
      )}

      {/* ── PARTNER LIST ── */}
      {view === "list" && (
        <>
          {partnersLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={28} className="animate-spin text-indigo-400" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              {search ? "No partners match your search." : "No partners registered yet."}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((partner) => (
                <PartnerCard
                  key={partner._id}
                  partner={partner}
                  expanded={expandedId === partner._id}
                  onToggle={() =>
                    setExpandedId(expandedId === partner._id ? null : partner._id)
                  }
                  onRefresh={refetchPartners}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   REGISTER PARTNER FORM
   POST /api/v1/partners/register  [admin]
   Searches existing users by email so admin picks a real userId
   ───────────────────────────────────────────────────────────── */
function RegisterPartnerForm({ onSuccess }) {
  const [userSearch, setUserSearch]     = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [form, setForm] = useState({
    name: "", phone: "", city: "", aadhar: "", panNumber: "", incentivePercent: "15",
  });
  const [errors, setErrors] = useState({});

  // Fetch all users for search dropdown
  const { data: allUsers = [] } = useQuery({
    queryKey: ["adminAllUsers"],
    queryFn: adminFetchUsers,
    staleTime: 60_000,
  });

  const filteredUsers = allUsers.filter((u) =>
    u.role !== "partner" &&
    u.role !== "admin" &&
    `${u.name} ${u.email}`.toLowerCase().includes(userSearch.toLowerCase())
  ).slice(0, 8);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (body) => {
      const res = await axios.post(
        `${API_URL_BASE}/api/v1/partners/register`,
        body,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      return res.data;
    },
    onSuccess,
  });

  function validate() {
    const e = {};
    if (!selectedUser)             e.user      = "Select a user account";
    if (!form.name.trim())         e.name      = "Required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
                                   e.phone     = "Valid 10-digit number required";
    if (!form.city.trim())         e.city      = "Required";
    if (!form.aadhar.trim())       e.aadhar    = "Required";
    if (!form.panNumber.trim())    e.panNumber = "Required";
    return e;
  }

  function submit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    mutate({
      userId:           selectedUser._id,
      name:             form.name,
      phone:            form.phone,
      city:             form.city,
      aadhar:           form.aadhar,
      panNumber:        form.panNumber,
      incentivePercent: Number(form.incentivePercent) || 15,
    });
  }

  const field   = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition";
  const labelCls = "block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide";
  const errCls   = "text-xs text-red-500 mt-1";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 max-w-2xl">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">Register New Partner</h3>
        <p className="text-sm text-slate-500 mt-1">
          Select an existing user account, fill in their KYC details, and set their incentive rate.
          Their role will automatically change to <code className="bg-slate-100 px-1 rounded">partner</code>.
        </p>
      </div>

      {/* ── USER SEARCH ── */}
      <div className="relative" onClick={(e)=>{setShowDropdown(!showDropdown); e.stopPropagation();}}>
        <label className={labelCls}>User Account</label>
        {selectedUser ? (
          <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
            <div>
              <p className="font-semibold text-indigo-800 text-sm">{selectedUser.name}</p>
              <p className="text-xs text-indigo-600">{selectedUser.email}</p>
            </div>
            <button
              onClick={() => { setSelectedUser(null); setUserSearch(""); }}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <input
              className={inputCls}
              placeholder="Search by name or email…"
              value={userSearch}
              onChange={(e) => { setUserSearch(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && filteredUsers.length > 0 && (
              <div className="absolute z-20 top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-y-auto max-h-60">
                {filteredUsers.map((u) => (
                  <button
                    key={u._id}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 text-left transition"
                    onClick={() => {
                      setSelectedUser(u);
                      setShowDropdown(false);
                      setUserSearch("");
                      // Pre-fill name if blank
                      setForm((f) => ({ ...f, name: f.name || u.name }));
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                      {u.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                    <span className="ml-auto text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{u.role}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
        {errors.user && <p className={errCls}>{errors.user}</p>}
      </div>

      {/* ── KYC FIELDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Partner Name</label>
          <input className={inputCls} placeholder="Full name" value={form.name} onChange={(e) => field("name", e.target.value)} />
          {errors.name && <p className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input className={inputCls} placeholder="10-digit mobile" value={form.phone} onChange={(e) => field("phone", e.target.value)} />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>
        <div>
          <label className={labelCls}>City</label>
          <input className={inputCls} placeholder="e.g. Kolkata" value={form.city} onChange={(e) => field("city", e.target.value)} />
          {errors.city && <p className={errCls}>{errors.city}</p>}
        </div>
        <div>
          <label className={labelCls}>Incentive % (default 15)</label>
          <input type="number" min="0" max="100" className={inputCls} value={form.incentivePercent} onChange={(e) => field("incentivePercent", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Aadhar Number</label>
          <input className={inputCls} placeholder="12-digit Aadhar" value={form.aadhar} onChange={(e) => field("aadhar", e.target.value)} />
          {errors.aadhar && <p className={errCls}>{errors.aadhar}</p>}
        </div>
        <div>
          <label className={labelCls}>PAN Number</label>
          <input className={inputCls} placeholder="ABCDE1234F" value={form.panNumber} onChange={(e) => field("panNumber", e.target.value)} />
          {errors.panNumber && <p className={errCls}>{errors.panNumber}</p>}
        </div>
      </div>

      {isError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
          <AlertCircle size={16} />
          {error?.response?.data?.message || "Registration failed. Try again."}
        </div>
      )}

      <button
        onClick={submit}
        disabled={isPending}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isPending ? <><Loader2 size={16} className="animate-spin" /> Registering…</> : "✓ Register as Partner"}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PARTNER CARD — expandable row with all admin actions
   ───────────────────────────────────────────────────────────── */
function PartnerCard({ partner, expanded, onToggle, onRefresh }) {
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutMsg,    setPayoutMsg]    = useState("");

  // PATCH /api/v1/partners/admin/:id/verify
  const verify = useMutation({
    mutationFn: () => axios.patch(`${API_URL_BASE}/api/v1/partners/admin/${partner._id}/verify`, {}, { withCredentials: true }),
    onSuccess:  onRefresh,
  });

  // PATCH /api/v1/partners/admin/:id/toggle-active
  const toggle = useMutation({
    mutationFn: () => axios.patch(`${API_URL_BASE}/api/v1/partners/admin/${partner._id}/toggle-active`, {}, { withCredentials: true }),
    onSuccess:  onRefresh,
  });

  // PATCH /api/v1/partners/admin/:id/settle-payout  { amount }
  const settle = useMutation({
    mutationFn: (amount) => axios.patch(
      `${API_URL_BASE}/api/v1/partners/admin/${partner._id}/settle-payout`,
      { amount },
      { withCredentials: true }
    ),
    onSuccess: (res) => {
      setPayoutMsg(`₹${res.data.data?.totalPaidOut ? payoutAmount : "?"} settled ✓`);
      setPayoutAmount("");
      onRefresh();
    },
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* ── SUMMARY ROW ── */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-extrabold text-lg shrink-0">
            {partner.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-slate-800">{partner.name}</p>
              {partner.isVerified && <BadgeCheck size={16} className="text-emerald-500" />}
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${partner.isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                {partner.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="text-xs text-slate-500">{partner.phone} · {partner.city}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 mr-2">
          <div className="hidden sm:block text-right">
            <p className="text-xs text-slate-400">Bookings</p>
            <p className="font-bold text-slate-700">{partner.totalBookings ?? 0}</p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs text-slate-400">Pending Payout</p>
            <p className="font-bold text-amber-600">₹{(partner.pendingPayout ?? 0).toLocaleString()}</p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs text-slate-400">Total Earned</p>
            <p className="font-bold text-emerald-600">₹{(partner.totalEarnings ?? 0).toLocaleString()}</p>
          </div>
          {expanded ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </div>
      </button>

      {/* ── EXPANDED DETAILS ── */}
      {expanded && (
        <div className="border-t border-slate-100 px-5 py-5 space-y-5 bg-slate-50/50">

          {/* Detail grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Incentive Rate",  value: `${partner.incentivePercent ?? 15}%` },
              { label: "Total Paid Out",  value: `₹${(partner.totalPaidOut ?? 0).toLocaleString()}` },
              { label: "Rating",          value: `${partner.rating ?? "—"} ★` },
              { label: "KYC Verified",    value: partner.isVerified ? "Yes ✓" : "Pending" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
                <p className="text-xs text-slate-400 font-medium">{s.label}</p>
                <p className="font-bold text-slate-700 mt-0.5 text-sm">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Payout details if saved */}
          {partner.payoutDetails?.upiId || partner.payoutDetails?.accountNumber ? (
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-sm space-y-1 shadow-sm">
              <p className="font-semibold text-slate-600 text-xs uppercase tracking-wide mb-2">Payout Details</p>
              {partner.payoutDetails.upiId && <p><strong>UPI:</strong> {partner.payoutDetails.upiId}</p>}
              {partner.payoutDetails.accountHolder && <p><strong>Account:</strong> {partner.payoutDetails.accountHolder}</p>}
              {partner.payoutDetails.accountNumber && <p><strong>A/C No:</strong> {partner.payoutDetails.accountNumber}</p>}
              {partner.payoutDetails.ifsc && <p><strong>IFSC:</strong> {partner.payoutDetails.ifsc}</p>}
              {partner.payoutDetails.bankName && <p><strong>Bank:</strong> {partner.payoutDetails.bankName}</p>}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">Partner hasn't saved payout details yet.</p>
          )}

          {/* ── ADMIN ACTIONS ── */}
          <div className="flex flex-wrap gap-3">
            {/* Verify */}
            {!partner.isVerified && (
              <button
                onClick={() => verify.mutate()}
                disabled={verify.isPending}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition disabled:opacity-60"
              >
                {verify.isPending ? <Loader2 size={14} className="animate-spin" /> : <BadgeCheck size={14} />}
                Verify KYC
              </button>
            )}

            {/* Toggle active */}
            <button
              onClick={() => toggle.mutate()}
              disabled={toggle.isPending}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-60 ${
                partner.isActive
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              }`}
            >
              {toggle.isPending ? <Loader2 size={14} className="animate-spin" /> : null}
              {partner.isActive ? "Deactivate Partner" : "Reactivate Partner"}
            </button>
          </div>

          {/* ── SETTLE PAYOUT ── */}
          <div className="bg-white rounded-xl border border-amber-200 p-4 space-y-3 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">
              Settle Payout
              <span className="ml-2 text-xs text-amber-600 font-normal">
                Pending: ₹{(partner.pendingPayout ?? 0).toLocaleString()}
              </span>
            </p>
            <div className="flex gap-3">
              <input
                type="number"
                min="1"
                max={partner.pendingPayout}
                placeholder={`Up to ₹${partner.pendingPayout ?? 0}`}
                value={payoutAmount}
                onChange={(e) => { setPayoutAmount(e.target.value); setPayoutMsg(""); }}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
              />
              <button
                onClick={() => settle.mutate(Number(payoutAmount))}
                disabled={settle.isPending || !payoutAmount || Number(payoutAmount) <= 0}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition disabled:opacity-50"
              >
                {settle.isPending ? <Loader2 size={14} className="animate-spin" /> : "Settle"}
              </button>
            </div>
            {payoutMsg && <p className="text-xs text-emerald-600 font-semibold">{payoutMsg}</p>}
            {settle.isError && <p className="text-xs text-red-500">{settle.error?.response?.data?.message || "Failed to settle."}</p>}
          </div>

        </div>
      )}
    </div>
  );
}