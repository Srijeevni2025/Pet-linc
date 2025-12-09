// import React, { useMemo, useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Search,
//   Bell,
//   Settings,
//   User,
//   Menu,
//   CheckCircle,
//   X,
//   Loader2,
// } from "lucide-react";

// /*
//   Admin Dashboard (Option D) - Single File
//   - Replace fetchBookings / fetchGroomers / updateBooking with real API calls
//   - Uses react-query for caching
//   - Tailwind CSS (dark/premium FinanceOS style)
// */

// /* ---------- MOCK / PLACEHOLDER API FUNCTIONS ----------
//    Replace these with real API calls (fetch/axios) and adjust data shapes.
// */
// async function fetchBookings({ queryKey }) {
//   // queryKey: ["bookings", { page, pageSize, search, status, startDate, endDate }]
//   const [_key, params] = queryKey;
//   // TODO: replace with real API
//   await new Promise((r) => setTimeout(r, 350)); // simulate network
//   // sample data
//   const sampleBookings = Array.from({ length: 42 }).map((_, i) => {
//     const statuses = ["pending", "confirmed", "completed", "cancelled"];
//     const s = statuses[i % statuses.length];
//     const date = new Date();
//     date.setDate(date.getDate() + (i % 7));
//     return {
//       _id: `BK-${1000 + i}`,
//       petName: ["Bruno", "Simba", "Cookie", "Milo"][i % 4],
//       breed: ["Labrador", "Beagle", "Persian", "Pug"][i % 4],
//       petType: i % 4 === 2 ? "Cat" : "Dog",
//       date: date.toISOString(),
//       timeSlot: ["10 AM - 12 PM", "12 PM - 2 PM", "2 PM - 4 PM", "4 PM - 6 PM"][i % 4],
//       productId: { name: ["Basic", "Deluxe", "Premium"][i % 3], price: (499 + (i % 3) * 200) },
//       addons: i % 3 === 0 ? [{ _id: "A1", name: "Oil Massage", price: 300 }] : [],
//       status: s,
//       customer: {
//         name: ["Rajan", "Swati", "Manisha", "Ankit"][i % 4],
//         phone: `+91 90000${100 + i}`,
//         address: `Area ${(i % 7) + 1}, City`,
//       },
//       assignedGroomer: i % 5 === 0 ? { _id: `G-${i}`, name: `Groomer ${i % 5 + 1}` } : null,
//       aggression: ((i % 3) + 1).toString(),
//       coupon: i % 7 === 0 ? "PET10" : null,
//       totalPaid: (499 + (i % 3) * 200) + (i % 3 === 0 ? 300 : 0),
//     };
//   });

//   // filter & paging logic (simple)
//   const {
//     page = 1,
//     pageSize = 10,
//     search = "",
//     status = "all",
//     startDate = null,
//     endDate = null,
//   } = params || {};

//   const filtered = sampleBookings.filter((b) => {
//     if (status !== "all" && b.status !== status) return false;
//     if (search) {
//       const s = search.toLowerCase();
//       if (
//         !(
//           b._id.toLowerCase().includes(s) ||
//           b.petName.toLowerCase().includes(s) ||
//           b.customer.name.toLowerCase().includes(s) ||
//           b.productId.name.toLowerCase().includes(s)
//         )
//       )
//         return false;
//     }
//     if (startDate && new Date(b.date) < new Date(startDate)) return false;
//     if (endDate && new Date(b.date) > new Date(endDate)) return false;
//     return true;
//   });

//   const start = (page - 1) * pageSize;
//   const pageData = filtered.slice(start, start + pageSize);

//   return {
//     total: filtered.length,
//     page,
//     pageSize,
//     data: pageData,
//     meta: {
//       monthly: Array.from({ length: 6 }).map((_, i) => ({
//         month: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
//         bookings: Math.floor(Math.random() * 80) + 10,
//       })),
//       stats: {
//         today: Math.floor(Math.random() * 20),
//         pending: filtered.filter((b) => b.status === "pending").length,
//         completed: filtered.filter((b) => b.status === "completed").length,
//         revenue: filtered.reduce((s, b) => s + Number(b.totalPaid || 0), 0),
//       },
//     },
//   };
// }

// async function fetchGroomers() {
//   await new Promise((r) => setTimeout(r, 200));
//   return [
//     { _id: "G-1", name: "Asha", available: true, rating: 4.9 },
//     { _id: "G-2", name: "Raju", available: false, rating: 4.7 },
//     { _id: "G-3", name: "Sana", available: true, rating: 4.8 },
//   ];
// }

// async function updateBooking({ id, payload }) {
//   // TODO: call patch api
//   await new Promise((r) => setTimeout(r, 300));
//   return { success: true, id, payload };
// }

// /* ---------- Helper Small Components ---------- */
// function StatusChip({ status }) {
//   const map = {
//     pending: "bg-yellow-500/20 text-yellow-300",
//     confirmed: "bg-blue-500/20 text-blue-300",
//     completed: "bg-green-600/20 text-green-300",
//     cancelled: "bg-red-500/20 text-red-300",
//   };
//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status] || "bg-gray-700 text-gray-300"}`}>
//       {status?.toUpperCase() || "—"}
//     </span>
//   );
// }

// /* ---------- Main Dashboard ---------- */
// export default function AdminDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [filters, setFilters] = useState({
//     page: 1,
//     pageSize: 10,
//     search: "",
//     status: "all",
//     startDate: "",
//     endDate: "",
//   });
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [assigningBooking, setAssigningBooking] = useState(null); // booking id
//   const [assignGroomerId, setAssignGroomerId] = useState(null);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const qc = useQueryClient();

//   // BOOKINGS QUERY
//   const bookingsQ = useQuery({
//     queryKey: ["bookings", filters],
//     queryFn: fetchBookings,
//     keepPreviousData: true,
//   });

//   // GROOMERS QUERY
//   const groomersQ = useQuery({ queryKey: ["groomers"], queryFn: fetchGroomers });

//   // MUTATION to update booking
//   const mutation = useMutation({ mutationFn: updateBooking, onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }) });

//   // derived values
//   const bookings = bookingsQ.data?.data || [];
//   const total = bookingsQ.data?.total || 0;
//   const page = bookingsQ.data?.page || filters.page;
//   const pageSize = bookingsQ.data?.pageSize || filters.pageSize;
//   const stats = bookingsQ.data?.meta?.stats || { today: 0, pending: 0, completed: 0, revenue: 0 };
//   const monthly = bookingsQ.data?.meta?.monthly || [];

//   // handlers
//   function handleSearch(e) {
//     setFilters((f) => ({ ...f, search: e.target.value, page: 1 }));
//   }
//   function handleStatusChange(e) {
//     setFilters((f) => ({ ...f, status: e.target.value, page: 1 }));
//   }
//   function handlePage(nextPage) {
//     setFilters((f) => ({ ...f, page: nextPage }));
//   }

//   function openBooking(b) {
//     setSelectedBooking(b);
//   }

//   function closeBooking() {
//     setSelectedBooking(null);
//   }

//   function openAssignModal(booking) {
//     setAssigningBooking(booking);
//     setShowAssignModal(true);
//     setAssignGroomerId(null);
//   }

//   async function assignGroomer() {
//     if (!assignGroomerId || !assigningBooking) return;
//     mutation.mutate({
//       id: assigningBooking._id,
//       payload: { assignedGroomer: { _id: assignGroomerId } },
//     });
//     setShowAssignModal(false);
//   }

//   async function changeStatus(booking, newStatus) {
//     mutation.mutate({ id: booking._id, payload: { status: newStatus } });
//   }

//   // small accessibility: keyboard search submit
//   function handleKeyDownSearch(e) {
//     if (e.key === "Enter") {
//       setFilters((f) => ({ ...f, page: 1, search: e.target.value }));
//     }
//   }

//   // reset page when page size changes
//   useEffect(() => {
//     setFilters((f) => ({ ...f, page: 1 }));
//   }, [filters.pageSize]);

//   /* ---------- Render ---------- */
//   return (
//     <div className="min-h-screen flex bg-[#0b1220] text-slate-100">
//       {/* SIDEBAR */}
//       <aside className={`flex-shrink-0 transition-all duration-200 ${sidebarOpen ? "w-64" : "w-16"} bg-[#071026] border-r border-slate-800`}>
//         <div className="h-full flex flex-col">
//           <div className="px-4 py-5 flex items-center gap-3">
//             <button onClick={() => setSidebarOpen((s) => !s)} className="p-2 rounded-md hover:bg-white/5">
//               <Menu className="w-5 h-5" />
//             </button>
//             {sidebarOpen && <h3 className="font-bold text-lg">Petlinc Admin</h3>}
//           </div>

//           <nav className="px-2 py-4 space-y-2 flex-1">
//             {[
//               { key: "bookings", label: "Bookings", icon: "📋" },
//               { key: "groomers", label: "Groomers", icon: "✂️" },
//               { key: "payments", label: "Payments", icon: "💳" },
//               { key: "settings", label: "Settings", icon: "⚙️" },
//             ].map((item) => (
//               <button key={item.key} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/3">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 text-center">{item.icon}</div>
//                   {sidebarOpen && <span>{item.label}</span>}
//                 </div>
//               </button>
//             ))}
//           </nav>

//           <div className="px-4 py-4 border-t border-slate-800">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-black font-bold">A</div>
//               {sidebarOpen && (
//                 <div>
//                   <div className="text-sm font-semibold">Admin</div>
//                   <div className="text-xs text-slate-400">petlinc@company.in</div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 p-6">
//         {/* TOPBAR */}
//         <div className="flex items-center justify-between gap-4 mb-6">
//           <div className="flex items-center gap-3 w-full max-w-2xl">
//             <div className="relative flex-1">
//               <input
//                 type="search"
//                 placeholder="Search by booking id, pet name, customer..."
//                 value={filters.search}
//                 onChange={handleSearch}
//                 onKeyDown={handleKeyDownSearch}
//                 className="w-full px-4 py-2 rounded-xl bg-[#071726] border border-slate-800 placeholder:text-slate-500 focus:outline-none"
//               />
//               <div className="absolute right-3 top-2.5 text-slate-400"><Search className="w-4 h-4" /></div>
//             </div>

//             <div>
//               <select value={filters.status} onChange={handleStatusChange} className="px-3 py-2 rounded-xl bg-[#071726] border border-slate-800">
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="confirmed">Confirmed</option>
//                 <option value="completed">Completed</option>
//                 <option value="cancelled">Cancelled</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="p-2 rounded-lg hover:bg-white/5"><Bell className="w-5 h-5" /></button>
//             <button className="p-2 rounded-lg hover:bg-white/5"><Settings className="w-5 h-5" /></button>
//             <button className="p-2 rounded-lg hover:bg-white/5"><User className="w-5 h-5" /></button>
//           </div>
//         </div>

//         {/* STATS + CHART */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//           {/* Stat cards */}
//           <div className="lg:col-span-2 grid grid-cols-2 gap-4">
//             <StatCard title="Today's Bookings" value={stats.today} sub="Bookings scheduled today" />
//             <StatCard title="Pending" value={stats.pending} sub="Pending confirmations" />
//             <StatCard title="Completed" value={stats.completed} sub="Completed sessions" />
//             <StatCard title="Revenue" value={`₹${Number(stats.revenue || 0).toLocaleString()}`} sub="Total (sample)" />
//           </div>

//           {/* Chart */}
//           <div className="bg-[#071726] border border-slate-800 rounded-2xl p-4">
//             <h4 className="text-sm text-slate-300 font-semibold mb-3">Bookings (Last 6 months)</h4>
//             <div style={{ height: 120 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={monthly}>
//                   <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
//                   <YAxis hide />
//                   <Tooltip wrapperStyle={{ background: "#0b1220", border: "1px solid #1f2937", color: "#fff" }} />
//                   <Bar dataKey="bookings" fill="#fb923c" radius={[6, 6, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* TABLE + CONTROLS */}
//         <div className="bg-[#071726] border border-slate-800 rounded-2xl p-4">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-bold">Bookings</h3>
//             <div className="flex items-center gap-3">
//               <select value={filters.pageSize} onChange={(e) => setFilters((f) => ({ ...f, pageSize: Number(e.target.value) }))} className="px-3 py-2 rounded-xl bg-[#06121a]">
//                 <option value={5}>5 / page</option>
//                 <option value={10}>10 / page</option>
//                 <option value={20}>20 / page</option>
//               </select>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="text-left text-slate-400 border-b border-slate-800">
//                 <tr>
//                   <th className="py-3 pl-3">Booking</th>
//                   <th className="py-3">Pet</th>
//                   <th className="py-3">When</th>
//                   <th className="py-3">Package</th>
//                   <th className="py-3">Add-ons</th>
//                   <th className="py-3">Assigned</th>
//                   <th className="py-3">Status</th>
//                   <th className="py-3 text-right pr-3">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {bookingsQ.isLoading ? (
//                   <tr><td colSpan={8} className="p-6 text-center text-slate-400"><Loader2 className="w-6 h-6 animate-spin inline-block mr-2" /> Loading bookings...</td></tr>
//                 ) : bookings.length === 0 ? (
//                   <tr><td colSpan={8} className="p-6 text-center text-slate-400">No bookings found</td></tr>
//                 ) : bookings.map((b) => (
//                   <tr key={b._id} className="hover:bg-white/2 transition">
//                     <td className="py-3 pl-3">
//                       <div className="font-medium">{b._id}</div>
//                       <div className="text-xs text-slate-400">{b.customer?.name}</div>
//                     </td>

//                     <td className="py-3">
//                       <div className="font-medium">{b.petName}</div>
//                       <div className="text-xs text-slate-400">{b.breed} • {b.petType}</div>
//                     </td>

//                     <td className="py-3">{new Date(b.date).toLocaleDateString()} <div className="text-xs text-slate-400">{b.timeSlot}</div></td>

//                     <td className="py-3">{b.productId?.name} <div className="text-xs text-slate-400">₹{b.productId?.price}</div></td>

//                     <td className="py-3">
//                       {b.addons?.length ? <div className="text-xs text-slate-300">{b.addons.map((a) => a.name).join(", ")}</div> : <div className="text-xs text-slate-500">—</div>}
//                     </td>

//                     <td className="py-3">
//                       {b.assignedGroomer ? <div className="text-sm">{b.assignedGroomer.name}</div> : <div className="text-xs text-slate-400">Unassigned</div>}
//                     </td>

//                     <td className="py-3"><StatusChip status={b.status} /></td>

//                     <td className="py-3 text-right pr-3">
//                       <div className="flex items-center justify-end gap-2">
//                         <button onClick={() => openBooking(b)} className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-sm">View</button>
//                         <button onClick={() => openAssignModal(b)} className="px-3 py-1 rounded-md bg-[#12323b] hover:bg-[#16423e] text-sm">Assign</button>
//                         {b.status !== "completed" && (
//                           <button onClick={() => changeStatus(b, "completed")} className="px-3 py-1 rounded-md bg-green-600/20 text-green-300 hover:opacity-90 text-sm">Complete</button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="mt-4 flex items-center justify-between">
//             <div className="text-sm text-slate-400">{total} results</div>

//             <div className="flex items-center gap-2">
//               <button disabled={page <= 1} onClick={() => handlePage(page - 1)} className="px-3 py-1 rounded-md bg-[#06121a] disabled:opacity-40">Prev</button>
//               <div className="px-3 py-1 rounded-md bg-[#06121a]">Page {page}</div>
//               <button disabled={page * pageSize >= total} onClick={() => handlePage(page + 1)} className="px-3 py-1 rounded-md bg-[#06121a] disabled:opacity-40">Next</button>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* RIGHT DRAWER: Booking Details */}
//       {selectedBooking && (
//         <div className="fixed right-6 top-6 bottom-6 w-[520px] bg-[#071726] border-l border-slate-800 rounded-l-2xl shadow-2xl p-5 overflow-y-auto z-50">
//           <div className="flex items-start justify-between gap-3">
//             <div>
//               <h3 className="text-xl font-bold">{selectedBooking._id}</h3>
//               <div className="text-sm text-slate-400">{selectedBooking.customer?.name} • {selectedBooking.customer?.phone}</div>
//             </div>
//             <button onClick={closeBooking} className="p-2 rounded-md hover:bg-white/5"><X className="w-5 h-5" /></button>
//           </div>

//           <div className="mt-4 space-y-3">
//             <DetailRow label="Pet" value={`${selectedBooking.petName} (${selectedBooking.breed})`} />
//             <DetailRow label="Type" value={selectedBooking.petType} />
//             <DetailRow label="Date" value={new Date(selectedBooking.date).toLocaleString()} />
//             <DetailRow label="Time Slot" value={selectedBooking.timeSlot} />
//             <DetailRow label="Package" value={selectedBooking.productId?.name} />
//             <DetailRow label="Add-ons" value={selectedBooking.addons?.map(a => a.name).join(", ") || "—"} />
//             <DetailRow label="Aggression" value={selectedBooking.aggression || "—"} />
//             <DetailRow label="Coupon" value={selectedBooking.coupon || "—"} />
//             <DetailRow label="Total Paid" value={`₹${selectedBooking.totalPaid || selectedBooking.productId?.price || 0}`} />
//             <DetailRow label="Assigned Groomer" value={selectedBooking.assignedGroomer?.name || "Unassigned"} />
//             <div className="mt-3 flex gap-2">
//               <button onClick={() => openAssignModal(selectedBooking)} className="px-4 py-2 rounded-md bg-[#12323b]">Assign Groomer</button>
//               <button onClick={() => changeStatus(selectedBooking, "confirmed")} className="px-4 py-2 rounded-md bg-blue-600">Confirm</button>
//               <button onClick={() => changeStatus(selectedBooking, "cancelled")} className="px-4 py-2 rounded-md bg-red-600">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Assign Groomer Modal */}
//       {showAssignModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-60">
//           <div className="absolute inset-0 bg-black/60" onClick={() => setShowAssignModal(false)} />
//           <div className="relative w-full max-w-xl bg-[#071726] border border-slate-800 rounded-2xl p-6 z-50">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-bold">Assign Groomer — {assigningBooking?._id}</h3>
//               <button onClick={() => setShowAssignModal(false)} className="p-2 rounded-md hover:bg-white/5"><X className="w-5 h-5" /></button>
//             </div>

//             <div className="space-y-3">
//               {groomersQ.isLoading ? (
//                 <div className="text-slate-400">Loading groomers...</div>
//               ) : (
//                 groomersQ.data.map((g) => (
//                   <label key={g._id} className={`flex items-center justify-between p-3 rounded-md border ${assignGroomerId === g._id ? "bg-green-800/30 border-green-600" : "border-slate-800"}`}>
//                     <div>
//                       <div className="font-semibold">{g.name}</div>
//                       <div className="text-xs text-slate-400">Rating: {g.rating}</div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className={`text-sm ${g.available ? "text-green-400" : "text-slate-500"}`}>{g.available ? "Available" : "Busy"}</div>
//                       <input type="radio" checked={assignGroomerId === g._id} onChange={() => setAssignGroomerId(g._id)} />
//                     </div>
//                   </label>
//                 ))
//               )}

//               <div className="flex justify-end gap-3 mt-4">
//                 <button className="px-4 py-2 rounded-md bg-gray-700" onClick={() => setShowAssignModal(false)}>Close</button>
//                 <button className="px-4 py-2 rounded-md bg-orange-600" onClick={assignGroomer} disabled={!assignGroomerId}>Assign</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- Small subcomponents used above ---------- */
// function StatCard({ title, value, sub }) {
//   return (
//     <div className="bg-[#071726] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
//       <div className="text-xs text-slate-400 font-medium">{title}</div>
//       <div className="mt-2 flex items-end justify-between">
//         <div className="text-2xl font-extrabold">{value}</div>
//         <div className="text-xs text-slate-400">{sub}</div>
//       </div>
//     </div>
//   );
// }

// function DetailRow({ label, value }) {
//   return (
//     <div className="flex justify-between items-start border-b border-slate-800 py-2">
//       <div className="text-sm text-slate-400">{label}</div>
//       <div className="text-sm">{value}</div>
//     </div>
//   );
// }


import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CalendarDays, CheckCircle2, XCircle, Clock } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_BASE_URL
export default function AdminDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminBookings"],
    queryFn: async()=>{
      const res = await axios({
        method:'get',
        url:`${API_BASE_URL}/api/v1/bookings/get-all-bookings-for-dashboard`,
        headers:{
          'Content-Type':'application/json'
        }
      })
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center text-gray-400 py-20">Loading…</div>;

  if (isError)
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load dashboard.
      </div>
    );

  const bookings = data?.data || [];

  // ---- STATUS LOGIC (your API doesn't send status) ----
  const safeStatus = (b) => b.status || "pending";

  const summary = {
    total: bookings.length,
    pending: bookings.filter((b) => safeStatus(b) === "pending").length,
    completed: bookings.filter((b) => safeStatus(b) === "completed").length,
    cancelled: bookings.filter((b) => safeStatus(b) === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ---------- Summary Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SummaryCard
          title="Total Bookings"
          value={summary.total}
          icon={<CalendarDays className="text-orange-400" />}
        />
        <SummaryCard
          title="Pending"
          value={summary.pending}
          icon={<Clock className="text-yellow-400" />}
        />
        <SummaryCard
          title="Completed"
          value={summary.completed}
          icon={<CheckCircle2 className="text-green-400" />}
        />
        <SummaryCard
          title="Cancelled"
          value={summary.cancelled}
          icon={<XCircle className="text-red-400" />}
        />
      </div>

      {/* ---------- Bookings Table ---------- */}
      <div className="bg-[#0B1220] border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="text-left px-3">Customer</th>
                  <th className="text-left px-3">Pet</th>
                  <th className="text-left px-3">Package</th>
                  <th className="text-left px-3">Add-ons</th>
                  <th className="text-left px-3">Date</th>
                  <th className="text-left px-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => {
                  const totalAddons = b.addons?.reduce(
                    (sum, a) => sum + (a.price || 0),
                    0
                  );

                  return (
                    <tr
                      key={b._id}
                      className="bg-[#111827] hover:bg-[#1a2332] transition rounded-xl"
                    >
                      {/* CUSTOMER */}
                      <td className="py-3 px-3 text-sm">
                        <div className="font-medium">{b.userId?.name}</div>
                        <div className="text-gray-500 text-xs">{b.userId?.email}</div>
                      </td>

                      {/* PET */}
                      <td className="py-3 px-3 text-sm">
                        {b.petName} ({b.petType})
                        <div className="text-gray-500 text-xs">{b.breed}</div>
                      </td>

                      {/* PACKAGE */}
                      <td className="py-3 px-3 text-sm">
                        {b.productId?.name}
                        <div className="text-gray-500 text-xs">
                          ₹{b.productId?.price}
                        </div>
                      </td>

                      {/* ADD-ONS */}
                      <td className="py-3 px-3 text-sm">
                        {b.addons?.length > 0 ? (
                          <div>
                            {b.addons.map((a) => (
                              <div key={a._id} className="text-gray-300 text-xs">
                                {a.name} — ₹{a.price}
                              </div>
                            ))}
                            <div className="text-orange-400 font-semibold text-xs mt-1">
                              Total: ₹{totalAddons}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">No add-ons</span>
                        )}
                      </td>

                      {/* DATE */}
                      <td className="py-3 px-3 text-sm">
                        {new Date(b.date).toDateString()}
                        <div className="text-gray-500 text-xs">{b.timeSlot}</div>
                      </td>

                      {/* STATUS */}
                      <td className="py-3 px-3">
                        <StatusBadge status={safeStatus(b)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Summary Card Component ---------- */
function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-[#0B1220] border border-gray-800 p-6 rounded-xl hover:border-gray-700 transition shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
        </div>

        <div className="p-3 bg-black/30 rounded-xl">{icon}</div>
      </div>
    </div>
  );
}

/* ---------- Status Badge Component ---------- */
function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-500/20 text-yellow-400",
    completed: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        map[status] || "bg-gray-500/20 text-gray-300"
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
}