

// // PartnerDashboard.jsx — API-integrated
// // All API calls use axios + VITE_BASE_URL, matching queryFunction.js / mutationFunction.js patterns.
// // Endpoints (partnerRouter.js + partnerController.js):
// //   GET  /api/v1/partners/me              → profile
// //   GET  /api/v1/partners/earnings        → earnings + per-booking breakdown
// //   GET  /api/v1/partners/bookings        → bookings list
// //   POST /api/v1/partners/book            → create booking on behalf of customer
// //   PATCH /api/v1/partners/payout-details → save bank / UPI details
// //   GET  /api/v1/packages/get-all-packages/:city  → real packages (queryFunction.js)
// //   GET  /api/v1/bookings/get-all-addons/:city    → real add-ons  (queryFunction.js)

// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import {
//   Wallet,
//   CalendarCheck,
//   ClipboardList,
//   TrendingUp,
//   Star,
//   PawPrint,
//   ChevronRight,
//   Plus,
//   X,
//   CheckCircle2,
//   Clock,
//   IndianRupee,
//   User,
//   Phone,
//   MapPin,
//   BadgeCheck,
//   AlertCircle,
//   Loader2,
//   RefreshCw,
//   CreditCard,
// } from "lucide-react";

// /* ─────────────────────────────────────────────────────────────
//    AXIOS INSTANCE — mirrors your queryFunction.js / mutationFunction.js
//    ───────────────────────────────────────────────────────────── */
// const API_URL_BASE = import.meta.env.VITE_BASE_URL;

// const api = axios.create({
//   baseURL: `${API_URL_BASE}/api/v1/partners`,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,   // sends JWT cookie, same as your existing calls
// });

// // ── Partner API functions (mirrors queryFunction.js / mutationFunction.js style) ──

// export async function GetMyPartnerProfile() {
//   const res = await api.get("/me");
//   return res.data.data;
// }

// export async function GetMyPartnerEarnings() {
//   const res = await api.get("/earnings");
//   return res.data.data;
// }

// export async function GetMyPartnerBookings() {
//   const res = await api.get("/bookings");
//   return res.data.data;
// }

// export async function PartnerCreateBooking(formData) {
//   const res = await api.post("/book", formData);
//   return res.data;
// }

// export async function UpdatePartnerPayoutDetails(payoutData) {
//   const res = await api.patch("/payout-details", payoutData);
//   return res.data.data;
// }

// // ── Reuse your existing package + addon endpoints ──
// // Identical signature to GetAllPackages() and GetAddOns() in queryFunction.js

// export async function GetAllPackages() {
//   const city = localStorage.getItem("currentCity") || "";
//   const res = await axios({
//     method: "get",
//     url: `${API_URL_BASE}/api/v1/packages/get-all-packages/${city}`,
//     headers: { "Content-Type": "application/json" },
//   });
//   return res.data.data;
// }

// export async function GetAddOns() {
//   const city = localStorage.getItem("currentCity") || "";
//   const res = await axios({
//     method: "get",
//     url: `${API_URL_BASE}/api/v1/bookings/get-all-addons/${city}`,
//     headers: { "Content-Type": "application/json" },
//   });
//   return res.data;
// }

// const SLOTS = ["9 AM - 11 AM", "12 PM - 2 PM", "3 PM - 5 PM", "5 PM - 7 PM"];

// /* ─────────────────────────────────────────────────────────────
//    SHARED UI PRIMITIVES
//    ───────────────────────────────────────────────────────────── */
// function StatCard({ icon, label, value, sub, accent }) {
//   return (
//     <div className="relative bg-white rounded-2xl p-5 border border-orange-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
//       <div className={`absolute top-0 right-0 w-24 h-24 ${accent} rounded-bl-full opacity-10 group-hover:opacity-20 transition-all`} />
//       <div className="flex items-center gap-3 mb-3">
//         <div className="p-2 bg-orange-50 rounded-xl">{icon}</div>
//         <span className="text-sm font-medium text-gray-500">{label}</span>
//       </div>
//       <p className="text-2xl font-extrabold text-gray-900">{value}</p>
//       {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
//     </div>
//   );
// }

// function Spinner({ size = 20 }) {
//   return <Loader2 size={size} className="animate-spin text-orange-500" />;
// }

// function ErrorState({ message, onRetry }) {
//   return (
//     <div className="flex flex-col items-center gap-4 py-16 text-center">
//       <AlertCircle size={40} className="text-red-400" />
//       <p className="text-gray-600 font-medium">{message || "Something went wrong."}</p>
//       {onRetry && (
//         <button
//           onClick={onRetry}
//           className="flex items-center gap-2 text-sm text-orange-600 border border-orange-300 px-4 py-2 rounded-xl hover:bg-orange-50 transition"
//         >
//           <RefreshCw size={14} /> Try again
//         </button>
//       )}
//     </div>
//   );
// }

// function BookingRow({ booking, showIncentive = false }) {
//   const statusConfig = {
//     Completed: { cls: "bg-green-100 text-green-700",  icon: <CheckCircle2 size={12} /> },
//     Upcoming:  { cls: "bg-blue-100 text-blue-700",   icon: <Clock size={12} /> },
//     Pending:   { cls: "bg-amber-100 text-amber-700",  icon: <Clock size={12} /> },
//     Cancelled: { cls: "bg-red-100 text-red-600",     icon: <X size={12} /> },
//   };
//   const s = statusConfig[booking.status] || statusConfig.Pending;

//   // Support both mock shape and real API shape
//   const customer  = booking.customer  || booking.mobile  || "Walk-in";
//   const petLabel  = booking.pet       || `${booking.petName ?? ""} (${booking.petType ?? ""})`;
//   const pkgName   = booking.package   || booking.productId?.name || "—";
//   const amount    = booking.amount    || booking.bookingMarkedPrice || 0;
//   const incentive = booking.incentive || booking.partnerIncentive  || 0;

//   return (
//     <div className="bg-white rounded-2xl border border-orange-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-sm transition">
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm shrink-0">
//           {String(customer)[0]?.toUpperCase() ?? "?"}
//         </div>
//         <div>
//           <p className="font-semibold text-gray-800">{customer}</p>
//           <p className="text-xs text-gray-500">{petLabel}</p>
//           <p className="text-xs text-gray-400 mt-0.5">
//             {pkgName} · {booking.date} · {booking.timeSlot || booking.slot}
//           </p>
//         </div>
//       </div>
//       <div className="flex items-center gap-3 sm:flex-col sm:items-end">
//         <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${s.cls}`}>
//           {s.icon} {booking.status}
//         </span>
//         <div className="text-right">
//           <p className="font-bold text-gray-900 text-sm">₹{Number(amount).toLocaleString()}</p>
//           {showIncentive && (
//             <p className="text-xs text-green-600 font-semibold">
//               +₹{Number(incentive).toLocaleString()} earned
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    SUCCESS TOAST
//    ───────────────────────────────────────────────────────────── */
// function SuccessBanner({ message = "Booking created successfully!", onDismiss }) {
//   return (
//     <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
//       <CheckCircle2 size={20} />
//       <span className="font-semibold">{message}</span>
//       <button onClick={onDismiss} className="ml-2 text-white/70 hover:text-white">
//         <X size={16} />
//       </button>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    BOOKING FORM MODAL  — posts to POST /api/v1/partners/book
//    ───────────────────────────────────────────────────────────── */
// function BookingFormModal({ onClose, onSuccess, incentivePercent = 15 }) {
//   const [step, setStep]             = useState(1);
//   const [submitting, setSubmitting] = useState(false);
//   const [apiError, setApiError]     = useState("");

//   // Live catalog — same endpoints as GetAllPackages() / GetAddOns() in queryFunction.js
//   const [packages, setPackages]             = useState([]);
//   const [addons,   setAddons]               = useState([]);
//   const [catalogLoading, setCatalogLoading] = useState(true);

//   useEffect(() => {
//     async function loadCatalog() {
//       try {
//         const [pkgs, adsRes] = await Promise.all([GetAllPackages(), GetAddOns()]);
//         setPackages(Array.isArray(pkgs) ? pkgs : []);
//         // GetAddOns() returns res.data — which may be { data:[...] } or the array itself
//         const addonList = Array.isArray(adsRes) ? adsRes : (adsRes?.data ?? []);
//         setAddons(addonList);
//       } catch {
//         // Non-fatal — user will see empty lists
//       } finally {
//         setCatalogLoading(false);
//       }
//     }
//     loadCatalog();
//   }, []);

//   const [form, setForm] = useState({
//     customerName: "", customerPhone: "",
//     address: "", pincode: "", city: "", lat: "", lng: "",
//     petName: "", petType: "Dog", breed: "", age: "", weight: "", aggression: "",
//     packageId: "", addons: [], date: "", timeSlot: "", notes: "",
//   });
//   const [errors, setErrors] = useState({});

//   const selectedPkg    = packages.find((p) => p._id === form.packageId);
//   const addonsTotal    = form.addons.reduce((sum, id) => sum + (addons.find((a) => a._id === id)?.price || 0), 0);
//   const grandTotal     = (selectedPkg?.price*1 || 0) + addonsTotal*1;
//   const partnerEarning = Math.round(grandTotal * (incentivePercent / 100));

//   const field = (key, val) => setForm((f) => ({ ...f, [key]: val }));
//   const toggleAddon = (id) =>
//     setForm((f) => ({
//       ...f,
//       addons: f.addons.includes(id) ? f.addons.filter((a) => a !== id) : [...f.addons, id],
//     }));

//   const validators = {
//     1: () => {
//       const e = {};
//       if (!form.customerName.trim()) e.customerName = "Required";
//       if (!form.customerPhone.trim() || form.customerPhone.replace(/\D/g, "").length < 10) e.customerPhone = "Valid 10-digit phone required";
//       if (!form.address.trim()) e.address = "Required";
//       return e;
//     },
//     2: () => {
//       const e = {};
//       if (!form.petName.trim()) e.petName = "Required";
//       if (!form.breed.trim()) e.breed = "Required";
//       if (!form.age) e.age = "Required";
//       if (!form.weight) e.weight = "Required";
//       if (!form.aggression) e.aggression = "Required";
//       return e;
//     },
//     3: () => {
//       const e = {};
//       if (!form.packageId) e.packageId = "Select a package";
//       if (!form.date) e.date = "Required";
//       if (!form.timeSlot) e.timeSlot = "Required";
//       return e;
//     },
//   };

//   function next() {
//     const e = validators[step] ? validators[step]() : {};
//     if (Object.keys(e).length) { setErrors(e); return; }
//     setErrors({});
//     setStep((s) => s + 1);
//   }

//   async function handleSubmit() {
//     setSubmitting(true);
//     setApiError("");
//     try {
//       // PartnerCreateBooking → POST /api/v1/partners/book
//       // Field names match partnerController.partnerCreateBooking destructuring exactly
//       await PartnerCreateBooking({
//         productId:  form.packageId,
//         petName:    form.petName,
//         type:       form.petType,       // controller destructures as `type: petType`
//         breed:      form.breed,
//         age:        Number(form.age),
//         weight:     Number(form.weight),
//         aggression: form.aggression,
//         notes:      form.notes,
//         address:    form.address,
//         pincode:    form.pincode  || "000000",
//         lat:        Number(form.lat)  || 0,
//         lng:        Number(form.lng)  || 0,
//         city:       form.city         || localStorage.getItem("currentCity") || "",
//         date:       form.date,
//         timeSlot:   form.timeSlot,
//         addons:     form.addons,
//         mobile:     form.customerPhone,
//         customerName: form.customerName,
//       });
//       onSuccess();
//     } catch (err) {
//       // axios puts the server message at err.response.data.message
//       setApiError(err?.response?.data?.message || err.message || "Booking failed.");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   const inputCls  = "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition";
//   const errCls    = "text-xs text-red-500 mt-1";
//   const labelCls  = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";
//   const steps     = ["Customer", "Pet", "Booking", "Confirm"];

//   return (
//     <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-4 flex items-center justify-between shrink-0">
//           <div>
//             <h2 className="text-white font-bold text-lg">Book a Session</h2>
//             <p className="text-orange-100 text-xs mt-0.5">Step {step} of 4 — {steps[step - 1]}</p>
//           </div>
//           <button onClick={onClose} className="text-white/70 hover:text-white transition"><X size={20} /></button>
//         </div>

//         {/* Progress bar */}
//         <div className="h-1 bg-orange-100 shrink-0">
//           <div className="h-full bg-orange-500 transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
//         </div>

//         {/* Body */}
//         <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

//           {/* STEP 1 — Customer */}
//           {step === 1 && (
//             <>
//               <div>
//                 <label className={labelCls}>Customer Name</label>
//                 <input className={inputCls} placeholder="e.g. Priya Bose" value={form.customerName} onChange={(e) => field("customerName", e.target.value)} />
//                 {errors.customerName && <p className={errCls}>{errors.customerName}</p>}
//               </div>
//               <div>
//                 <label className={labelCls}>Phone Number</label>
//                 <input className={inputCls} placeholder="98765 43210" value={form.customerPhone} onChange={(e) => field("customerPhone", e.target.value)} />
//                 {errors.customerPhone && <p className={errCls}>{errors.customerPhone}</p>}
//               </div>
//               <div>
//                 <label className={labelCls}>Service Address</label>
//                 <textarea className={inputCls} rows={3} placeholder="Flat no., Street, Area, City" value={form.address} onChange={(e) => field("address", e.target.value)} />
//                 {errors.address && <p className={errCls}>{errors.address}</p>}
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelCls}>Pincode</label>
//                   <input className={inputCls} placeholder="700001" value={form.pincode} onChange={(e) => field("pincode", e.target.value)} />
//                 </div>
//                 <div>
//                   <label className={labelCls}>City</label>
//                   <input className={inputCls} placeholder="Kolkata" value={form.city} onChange={(e) => field("city", e.target.value)} />
//                 </div>
//               </div>
//             </>
//           )}

//           {/* STEP 2 — Pet */}
//           {step === 2 && (
//             <>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelCls}>Pet Name</label>
//                   <input className={inputCls} placeholder="Buddy" value={form.petName} onChange={(e) => field("petName", e.target.value)} />
//                   {errors.petName && <p className={errCls}>{errors.petName}</p>}
//                 </div>
//                 <div>
//                   <label className={labelCls}>Pet Type</label>
//                   <select className={inputCls} value={form.petType} onChange={(e) => field("petType", e.target.value)}>
//                     <option value="Dog">Dog</option>
//                     <option value="Cat">Cat</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <label className={labelCls}>Breed</label>
//                 <input className={inputCls} placeholder="Golden Retriever" value={form.breed} onChange={(e) => field("breed", e.target.value)} />
//                 {errors.breed && <p className={errCls}>{errors.breed}</p>}
//               </div>
//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <label className={labelCls}>Age (yrs)</label>
//                   <input type="number" className={inputCls} placeholder="2" value={form.age} onChange={(e) => field("age", e.target.value)} />
//                   {errors.age && <p className={errCls}>{errors.age}</p>}
//                 </div>
//                 <div>
//                   <label className={labelCls}>Weight (kg)</label>
//                   <input type="number" className={inputCls} placeholder="15" value={form.weight} onChange={(e) => field("weight", e.target.value)} />
//                   {errors.weight && <p className={errCls}>{errors.weight}</p>}
//                 </div>
//                 <div>
//                   <label className={labelCls}>Aggression</label>
//                   <select className={inputCls} value={form.aggression} onChange={(e) => field("aggression", e.target.value)}>
//                     <option value="">Select</option>
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                   {errors.aggression && <p className={errCls}>{errors.aggression}</p>}
//                 </div>
//               </div>
//             </>
//           )}

//           {/* STEP 3 — Package + Slot */}
//           {step === 3 && (
//             <>
//               <div>
//                 <label className={labelCls}>Select Package</label>
//                 {catalogLoading
//                   ? <div className="flex items-center gap-2 py-4 text-sm text-gray-400"><Loader2 size={16} className="animate-spin" /> Loading packages…</div>
//                   : <div className="space-y-2">
//                       {packages.map((pkg) => (
//                         <label key={pkg._id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${form.packageId === pkg._id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"}`}>
//                           <div className="flex items-center gap-3">
//                             <input type="radio" name="package" className="accent-orange-600" checked={form.packageId === pkg._id} onChange={() => field("packageId", pkg._id)} />
//                             <span className="text-lg">{pkg.emoji || "🐾"}</span>
//                             <span className="text-sm font-medium text-gray-800">{pkg.name}</span>
//                           </div>
//                           <span className="text-orange-600 font-bold text-sm">₹{pkg.price}</span>
//                         </label>
//                       ))}
//                     </div>
//                 }
//                 {errors.packageId && <p className={errCls}>{errors.packageId}</p>}
//               </div>

//               <div>
//                 <label className={labelCls}>Add-ons (optional)</label>
//                 <div className="space-y-2">
//                   {addons.map((a) => (
//                     <label key={a._id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${form.addons.includes(a._id) ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}>
//                       <div className="flex items-center gap-2">
//                         <input type="checkbox" className="accent-orange-600" checked={form.addons.includes(a._id)} onChange={() => toggleAddon(a._id)} />
//                         <span className="text-sm text-gray-700">{a.name}</span>
//                       </div>
//                       <span className="text-sm text-orange-600 font-semibold">+₹{a.price}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelCls}>Date</label>
//                   <input type="date" className={inputCls} value={form.date} min={new Date().toISOString().split("T")[0]} onChange={(e) => field("date", e.target.value)} />
//                   {errors.date && <p className={errCls}>{errors.date}</p>}
//                 </div>
//                 <div>
//                   <label className={labelCls}>Time Slot</label>
//                   <select className={inputCls} value={form.timeSlot} onChange={(e) => field("timeSlot", e.target.value)}>
//                     <option value="">Select</option>
//                     {SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                   {errors.timeSlot && <p className={errCls}>{errors.timeSlot}</p>}
//                 </div>
//               </div>

//               <div>
//                 <label className={labelCls}>Notes (optional)</label>
//                 <textarea className={inputCls} rows={2} placeholder="Any special instructions..." value={form.notes} onChange={(e) => field("notes", e.target.value)} />
//               </div>
//             </>
//           )}

//           {/* STEP 4 — Confirm */}
//           {step === 4 && (
//             <div className="space-y-4">
//               <div className="bg-orange-50 rounded-2xl p-4 space-y-2">
//                 <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Summary</h3>
//                 <div className="flex justify-between text-sm"><span className="text-gray-500">Customer</span><span className="font-semibold">{form.customerName || "Walk-in"}</span></div>
//                 <div className="flex justify-between text-sm"><span className="text-gray-500">Phone</span><span className="font-semibold">{form.customerPhone}</span></div>
//                 <div className="flex justify-between text-sm"><span className="text-gray-500">Pet</span><span className="font-semibold">{form.petName} ({form.petType})</span></div>
//                 <div className="flex justify-between text-sm"><span className="text-gray-500">Date & Slot</span><span className="font-semibold">{form.date} · {form.timeSlot}</span></div>
//                 <div className="flex justify-between text-sm"><span className="text-gray-500">Package</span><span className="font-semibold">{selectedPkg?.name || "—"}</span></div>
//                 {form.addons.length > 0 && (
//                   <div className="flex justify-between text-sm"><span className="text-gray-500">Add-ons</span><span className="font-semibold text-right">{form.addons.map((id) => addons.find((a) => a._id === id)?.name).join(", ")}</span></div>
//                 )}
//                 <div className="border-t border-orange-200 pt-2 mt-2 flex justify-between font-bold text-base">
//                   <span>Total</span><span className="text-orange-600">₹{grandTotal.toLocaleString()}</span>
//                 </div>
//               </div>
//               <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
//                 <IndianRupee size={20} className="text-green-600 shrink-0" />
//                 <div>
//                   <p className="font-bold text-green-800">Your Earning</p>
//                   <p className="text-sm text-green-700">₹<strong>{partnerEarning.toLocaleString()}</strong> ({incentivePercent}% incentive) will be credited once the booking is <strong>completed</strong>.</p>
//                 </div>
//               </div>
//               {apiError && (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-sm text-red-700">
//                   <AlertCircle size={16} /> {apiError}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between shrink-0">
//           {step > 1
//             ? <button onClick={() => setStep((s) => s - 1)} className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium transition">Back</button>
//             : <div />
//           }
//           {step < 4
//             ? <button onClick={next} className="px-7 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition">Next →</button>
//             : <button onClick={handleSubmit} disabled={submitting} className="px-7 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition flex items-center gap-2 disabled:opacity-60">
//                 {submitting ? <Spinner size={16} /> : <CheckCircle2 size={16} />}
//                 Confirm Booking
//               </button>
//           }
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    PAYOUT DETAILS FORM
//    Updates PATCH /api/v1/partners/payout-details
//    ───────────────────────────────────────────────────────────── */
// function PayoutDetailsForm({ initialData, onSaved }) {
//   const [form, setForm] = useState({
//     upiId:         initialData?.upiId         || "",
//     accountHolder: initialData?.accountHolder || "",
//     accountNumber: initialData?.accountNumber || "",
//     ifsc:          initialData?.ifsc          || "",
//     bankName:      initialData?.bankName      || "",
//   });
//   const [saving, setSaving] = useState(false);
//   const [saved,  setSaved]  = useState(false);
//   const [error,  setError]  = useState("");

//   const field = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   async function save() {
//     setSaving(true); setError("");
//     try {
//       await UpdatePartnerPayoutDetails(form);  // PATCH /api/v1/partners/payout-details
//       setSaved(true);
//       onSaved?.();
//       setTimeout(() => setSaved(false), 3000);
//     } catch (err) {
//       setError(err?.response?.data?.message || err.message || "Save failed.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   const inputCls = "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition";
//   const labelCls = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";

//   return (
//     <div className="bg-white rounded-2xl border border-orange-100 p-6 space-y-4">
//       <div className="flex items-center gap-2 mb-2">
//         <CreditCard size={18} className="text-orange-600" />
//         <h3 className="font-bold text-gray-800">Payout Details</h3>
//       </div>
//       <div>
//         <label className={labelCls}>UPI ID</label>
//         <input className={inputCls} placeholder="yourname@upi" value={form.upiId} onChange={(e) => field("upiId", e.target.value)} />
//       </div>
//       <div className="border-t border-dashed border-gray-200 pt-4">
//         <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">Or Bank Transfer</p>
//         <div className="space-y-3">
//           <div>
//             <label className={labelCls}>Account Holder</label>
//             <input className={inputCls} placeholder="Full name as on bank account" value={form.accountHolder} onChange={(e) => field("accountHolder", e.target.value)} />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className={labelCls}>Account Number</label>
//               <input className={inputCls} placeholder="XXXXXXXXXX" value={form.accountNumber} onChange={(e) => field("accountNumber", e.target.value)} />
//             </div>
//             <div>
//               <label className={labelCls}>IFSC Code</label>
//               <input className={inputCls} placeholder="SBIN0001234" value={form.ifsc} onChange={(e) => field("ifsc", e.target.value)} />
//             </div>
//           </div>
//           <div>
//             <label className={labelCls}>Bank Name</label>
//             <input className={inputCls} placeholder="State Bank of India" value={form.bankName} onChange={(e) => field("bankName", e.target.value)} />
//           </div>
//         </div>
//       </div>
//       {error && <p className="text-xs text-red-500">{error}</p>}
//       <button
//         onClick={save}
//         disabled={saving}
//         className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
//       >
//         {saving ? <Spinner size={16} /> : saved ? <CheckCircle2 size={16} /> : null}
//         {saved ? "Saved!" : "Save Payout Details"}
//       </button>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    MAIN DASHBOARD
//    ───────────────────────────────────────────────────────────── */
// export default function PartnerDashboard() {
//   const [activeTab, setActiveTab]   = useState("overview");
//   const [showModal, setShowModal]   = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");

//   // ── API State ──
//   const [profile,  setProfile]  = useState(null);
//   const [earnings, setEarnings] = useState(null);
//   const [bookings, setBookings] = useState([]);

//   const [profileLoading,  setProfileLoading]  = useState(true);
//   const [earningsLoading, setEarningsLoading] = useState(true);
//   const [bookingsLoading, setBookingsLoading] = useState(true);

//   const [profileError,  setProfileError]  = useState("");
//   const [earningsError, setEarningsError] = useState("");
//   const [bookingsError, setBookingsError] = useState("");

//   // ── Fetchers — use exported async functions (same pattern as queryFunction.js) ──
//   const fetchProfile = useCallback(async () => {
//     setProfileLoading(true); setProfileError("");
//     try {
//       const data = await GetMyPartnerProfile();  // GET /api/v1/partners/me
//       setProfile(data);
//     } catch (err) {
//       setProfileError(err?.response?.data?.message || err.message);
//     } finally {
//       setProfileLoading(false);
//     }
//   }, []);

//   const fetchEarnings = useCallback(async () => {
//     setEarningsLoading(true); setEarningsError("");
//     try {
//       const data = await GetMyPartnerEarnings();  // GET /api/v1/partners/earnings
//       setEarnings(data);
//     } catch (err) {
//       setEarningsError(err?.response?.data?.message || err.message);
//     } finally {
//       setEarningsLoading(false);
//     }
//   }, []);

//   const fetchBookings = useCallback(async () => {
//     setBookingsLoading(true); setBookingsError("");
//     try {
//       const data = await GetMyPartnerBookings();  // GET /api/v1/partners/bookings
//       setBookings(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setBookingsError(err?.response?.data?.message || err.message);
//     } finally {
//       setBookingsLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchProfile(); }, [fetchProfile]);
//   useEffect(() => { fetchEarnings(); }, [fetchEarnings]);
//   useEffect(() => { fetchBookings(); }, [fetchBookings]);

//   function handleSuccess() {
//     setShowModal(false);
//     // Refresh bookings & earnings after a new booking
//     fetchBookings();
//     fetchEarnings();
//     fetchProfile();
//     setSuccessMsg("Booking created! Incentive credited to your account.");
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 5000);
//   }

//   const tabs = [
//     { key: "overview", label: "Overview",    icon: <TrendingUp size={16} /> },
//     { key: "bookings", label: "My Bookings", icon: <ClipboardList size={16} /> },
//     { key: "earnings", label: "Earnings",    icon: <Wallet size={16} /> },
//     { key: "profile",  label: "Profile",     icon: <User size={16} /> },
//   ];

//   const partnerName  = profile?.name            || "Partner";
//   const partnerCity  = profile?.city            || "";
//   const isVerified   = profile?.isVerified      || false;
//   const incentivePct = profile?.incentivePercent ?? 15;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
//       {/* ── TOP HEADER ── */}
//       <div className="bg-white border-b border-orange-100 shadow-sm sticky top-0 z-50">
//         <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div >
//               <img className="w-40 h-10   flex items-center justify-center" src="/public/images/Navbar/PetlincLogo.png" alt="Logo" />
//             </div>
//             <div>
//               {/* <p className="font-extrabold text-gray-900 leading-tight">Petlinc</p>
//               <p className="text-xs text-orange-600 font-semibold">Partner Portal</p> */}
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="hidden sm:flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-3 py-1.5">
//               {isVerified
//                 ? <BadgeCheck size={14} className="text-orange-600" />
//                 : <AlertCircle size={14} className="text-amber-500" />
//               }
//               <span className="text-xs font-bold text-orange-700">
//                 {isVerified ? "VERIFIED PARTNER" : "PENDING KYC"}
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               {profileLoading
//                 ? <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center"><Spinner size={16} /></div>
//                 : <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-sm">{partnerName[0]}</div>
//               }
//               <div className="hidden sm:block">
//                 <p className="text-sm font-semibold text-gray-800">{partnerName}</p>
//                 <p className="text-xs text-gray-400">{partnerCity}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="max-w-6xl mx-auto px-5 flex gap-1 pb-0 overflow-x-auto">
//           {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveTab(tab.key)}
//               className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
//                 activeTab === tab.key
//                   ? "border-orange-600 text-orange-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               {tab.icon} {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <div className="max-w-6xl mx-auto px-5 py-8 space-y-8">

//         {/* ── OVERVIEW TAB ── */}
//         {activeTab === "overview" && (
//           <>
//             {/* Welcome banner */}
//             <div className="bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-2xl font-extrabold">
//                   Welcome back, {partnerName.split(" ")[0]}! 👋
//                 </h1>
//                 <p className="text-orange-100 mt-1 text-sm">
//                   {earningsLoading
//                     ? "Loading your stats…"
//                     : `You've created ${earnings?.totalBookings ?? 0} bookings all time.`
//                   }
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowModal(true)}
//                 className="flex items-center gap-2 bg-white text-orange-600 font-bold px-5 py-3 rounded-2xl hover:bg-orange-50 transition shadow"
//               >
//                 <Plus size={18} /> Book a Session
//               </button>
//             </div>

//             {/* Stats */}
//             {earningsLoading
//               ? <div className="flex justify-center py-8"><Spinner size={28} /></div>
//               : earningsError
//                 ? <ErrorState message={earningsError} onRetry={fetchEarnings} />
//                 : (
//                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                     <StatCard
//                       icon={<IndianRupee size={18} className="text-orange-600" />}
//                       label="This Month"
//                       value={`₹${(earnings?.thisMonthEarnings ?? 0).toLocaleString()}`}
//                       sub="Earnings"
//                       accent="bg-orange-500"
//                     />
//                     <StatCard
//                       icon={<Wallet size={18} className="text-green-600" />}
//                       label="Pending Payout"
//                       value={`₹${(earnings?.pendingPayout ?? 0).toLocaleString()}`}
//                       sub="Awaiting settlement"
//                       accent="bg-green-400"
//                     />
//                     <StatCard
//                       icon={<CalendarCheck size={18} className="text-blue-600" />}
//                       label="Total Sessions"
//                       value={earnings?.totalBookings ?? 0}
//                       sub="All time"
//                       accent="bg-blue-400"
//                     />
//                     <StatCard
//                       icon={<Star size={18} className="text-yellow-500" />}
//                       label="Your Rating"
//                       value={`${profile?.rating ?? "—"} ★`}
//                       sub={`${incentivePct}% incentive rate`}
//                       accent="bg-yellow-400"
//                     />
//                   </div>
//                 )
//             }

//             {/* Recent bookings preview */}
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="font-bold text-gray-900 text-lg">Recent Sessions</h2>
//                 <button onClick={() => setActiveTab("bookings")} className="text-sm text-orange-600 hover:underline flex items-center gap-1">
//                   View all <ChevronRight size={14} />
//                 </button>
//               </div>
//               {bookingsLoading
//                 ? <div className="flex justify-center py-6"><Spinner /></div>
//                 : bookingsError
//                   ? <ErrorState message={bookingsError} onRetry={fetchBookings} />
//                   : bookings.length === 0
//                     ? <p className="text-center text-gray-400 py-8">No bookings yet. Create your first one!</p>
//                     : <div className="space-y-3">
//                         {bookings.slice(0, 3).map((b) => <BookingRow key={b._id} booking={b} />)}
//                       </div>
//               }
//             </div>

//             {/* Incentive info */}
//             <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 flex gap-4 items-start">
//               <div className="p-2 bg-green-100 rounded-xl shrink-0">
//                 <TrendingUp size={20} className="text-green-700" />
//               </div>
//               <div>
//                 <h3 className="font-bold text-green-800">You earn {incentivePct}% on every booking you create</h3>
//                 <p className="text-sm text-green-700 mt-1">
//                   When you book a grooming session for a customer, Petlinc credits <strong>{incentivePct}% of the booking value</strong> to your partner account. Payouts are settled every Monday.
//                 </p>
//               </div>
//             </div>
//           </>
//         )}

//         {/* ── BOOKINGS TAB ── */}
//         {activeTab === "bookings" && (
//           <>
//             <div className="flex items-center justify-between">
//               <h2 className="font-bold text-gray-900 text-xl">My Bookings</h2>
//               <button
//                 onClick={() => setShowModal(true)}
//                 className="flex items-center gap-2 bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-orange-700 transition text-sm"
//               >
//                 <Plus size={16} /> New Booking
//               </button>
//             </div>

//             {bookingsLoading
//               ? <div className="flex justify-center py-12"><Spinner size={28} /></div>
//               : bookingsError
//                 ? <ErrorState message={bookingsError} onRetry={fetchBookings} />
//                 : bookings.length === 0
//                   ? <p className="text-center text-gray-400 py-12">No bookings found. Start creating sessions!</p>
//                   : <div className="space-y-3">
//                       {bookings.map((b) => <BookingRow key={b._id} booking={b} showIncentive />)}
//                     </div>
//             }
//           </>
//         )}

//         {/* ── EARNINGS TAB ── */}
//         {activeTab === "earnings" && (
//           <>
//             <h2 className="font-bold text-gray-900 text-xl">Earnings Breakdown</h2>

//             {earningsLoading
//               ? <div className="flex justify-center py-12"><Spinner size={28} /></div>
//               : earningsError
//                 ? <ErrorState message={earningsError} onRetry={fetchEarnings} />
//                 : (
//                   <>
//                     {/* Summary cards */}
//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                       <div className="bg-orange-600 text-white rounded-2xl p-5">
//                         <p className="text-orange-200 text-sm font-medium">This Month</p>
//                         <p className="text-3xl font-extrabold mt-1">₹{(earnings?.thisMonthEarnings ?? 0).toLocaleString()}</p>
//                       </div>
//                       <div className="bg-white border border-green-200 rounded-2xl p-5">
//                         <p className="text-gray-500 text-sm font-medium">Pending Payout</p>
//                         <p className="text-3xl font-extrabold mt-1 text-green-600">₹{(earnings?.pendingPayout ?? 0).toLocaleString()}</p>
//                         <p className="text-gray-400 text-xs mt-1">Settles next Monday</p>
//                       </div>
//                       <div className="bg-white border border-orange-100 rounded-2xl p-5">
//                         <p className="text-gray-500 text-sm font-medium">All Time</p>
//                         <p className="text-3xl font-extrabold mt-1 text-gray-900">₹{(earnings?.totalEarnings ?? 0).toLocaleString()}</p>
//                         <p className="text-gray-400 text-xs mt-1">{earnings?.totalBookings ?? 0} sessions total</p>
//                       </div>
//                     </div>

//                     {/* Payout notice */}
//                     <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
//                       <AlertCircle size={18} className="text-amber-600 mt-0.5 shrink-0" />
//                       <p className="text-sm text-amber-800">
//                         Payouts are processed every <strong>Monday</strong> via UPI or bank transfer. Make sure your payment details are up to date in your profile.
//                       </p>
//                     </div>

//                     {/* Per-booking table */}
//                     {earnings?.bookings?.length > 0 && (
//                       <div>
//                         <h3 className="font-bold text-gray-700 mb-3">Session-wise Incentives</h3>
//                         <div className="rounded-2xl border border-orange-100 overflow-hidden overflow-x-auto">
//                           <table className="w-full text-sm">
//                             <thead>
//                               <tr className="bg-orange-50 text-gray-500 text-xs uppercase tracking-wide">
//                                 <th className="text-left px-4 py-3">Booking</th>
//                                 <th className="text-left px-4 py-3 hidden sm:table-cell">Package</th>
//                                 <th className="text-left px-4 py-3 hidden sm:table-cell">Date</th>
//                                 <th className="text-right px-4 py-3">Amount</th>
//                                 <th className="text-right px-4 py-3 text-green-700">Incentive</th>
//                                 <th className="text-center px-4 py-3 hidden sm:table-cell">Paid</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {earnings.bookings.map((b, i) => (
//                                 <tr key={b._id} className={`border-t border-orange-50 ${i % 2 === 0 ? "bg-white" : "bg-orange-50/30"}`}>
//                                   <td className="px-4 py-3">
//                                     <p className="font-semibold text-gray-800">{b.mobile || "Walk-in"}</p>
//                                     <p className="text-gray-400 text-xs">{b.petName} ({b.petType})</p>
//                                   </td>
//                                   <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{b.productId?.name || "—"}</td>
//                                   <td className="px-4 py-3 hidden sm:table-cell text-gray-500">{b.date}</td>
//                                   <td className="px-4 py-3 text-right font-semibold text-gray-800">₹{(b.bookingMarkedPrice || 0).toLocaleString()}</td>
//                                   <td className="px-4 py-3 text-right font-bold text-green-600">+₹{(b.partnerIncentive || 0).toLocaleString()}</td>
//                                   <td className="px-4 py-3 text-center hidden sm:table-cell">
//                                     {b.incentivePaid
//                                       ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Paid</span>
//                                       : <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Pending</span>
//                                     }
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )
//             }
//           </>
//         )}

//         {/* ── PROFILE TAB ── */}
//         {activeTab === "profile" && (
//           <>
//             <h2 className="font-bold text-gray-900 text-xl">My Profile</h2>

//             {profileLoading
//               ? <div className="flex justify-center py-12"><Spinner size={28} /></div>
//               : profileError
//                 ? <ErrorState message={profileError} onRetry={fetchProfile} />
//                 : (
//                   <>
//                     {/* Profile card */}
//                     <div className="bg-white rounded-2xl border border-orange-100 p-6 space-y-4">
//                       <div className="flex items-center gap-4">
//                         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-extrabold text-2xl">
//                           {partnerName[0]}
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2">
//                             <p className="font-extrabold text-gray-900 text-xl">{partnerName}</p>
//                             {isVerified && <BadgeCheck size={18} className="text-orange-500" />}
//                           </div>
//                           <p className="text-sm text-gray-500">{partnerCity}</p>
//                           <p className="text-xs text-orange-600 font-semibold mt-0.5">{incentivePct}% incentive rate</p>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-2 gap-3 pt-2 border-t border-orange-50">
//                         <div className="flex items-center gap-2 text-sm text-gray-600">
//                           <Phone size={14} className="text-orange-400" />
//                           <span>{profile?.phone || "—"}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-gray-600">
//                           <MapPin size={14} className="text-orange-400" />
//                           <span>{partnerCity || "—"}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-gray-600">
//                           <CalendarCheck size={14} className="text-orange-400" />
//                           <span>{earnings?.totalBookings ?? "—"} bookings</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-gray-600">
//                           <Star size={14} className="text-yellow-400" />
//                           <span>{profile?.rating ?? "—"} rating</span>
//                         </div>
//                       </div>
//                       {!isVerified && (
//                         <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
//                           <AlertCircle size={16} className="shrink-0" />
//                           Your KYC verification is pending. Contact admin to get verified.
//                         </div>
//                       )}
//                     </div>

//                     {/* Payout details form */}
//                     <PayoutDetailsForm
//                       initialData={profile?.payoutDetails}
//                       onSaved={fetchProfile}
//                     />
//                   </>
//                 )
//             }
//           </>
//         )}
//       </div>

//       {/* ── BOOKING MODAL ── */}
//       {showModal && (
//         <BookingFormModal
//           onClose={() => setShowModal(false)}
//           onSuccess={handleSuccess}
//           incentivePercent={incentivePct}
//         />
//       )}

//       {/* ── SUCCESS BANNER ── */}
//       {showSuccess && (
//         <SuccessBanner message={successMsg} onDismiss={() => setShowSuccess(false)} />
//       )}
//     </div>
//   );
// }

// PartnerDashboard.jsx — API-integrated + dynamic slot availability
// Endpoints used:
//   GET  /api/v1/partners/me
//   GET  /api/v1/partners/earnings
//   GET  /api/v1/partners/bookings
//   POST /api/v1/partners/book
//   PATCH /api/v1/partners/payout-details
//   GET  /api/v1/packages/get-all-packages/:city   (same as queryFunction.js)
//   GET  /api/v1/bookings/get-all-addons/:city     (same as queryFunction.js)
//   GET  /api/v1/bookings/slot-availability?date=&productId=&city=  (same as BookingModal)

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {
  Wallet, CalendarCheck, ClipboardList, TrendingUp,
  Star, PawPrint, ChevronRight, Plus, X, CheckCircle2,
  Clock, IndianRupee, User, Phone, MapPin, BadgeCheck,
  AlertCircle, Loader2, RefreshCw, CreditCard,
} from "lucide-react";

const API_URL_BASE = import.meta.env.VITE_BASE_URL;

/* ─────────────────────────────────────────────────────────────
   API FUNCTIONS — exact axios({}) style from queryFunction.js / mutationFunction.js
   ───────────────────────────────────────────────────────────── */
export async function GetMyPartnerProfile() {
  const res = await axios({
    method: "get",
    url: `${API_URL_BASE}/api/v1/partners/me`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data.data;
}

export async function GetMyPartnerEarnings() {
  const res = await axios({
    method: "get",
    url: `${API_URL_BASE}/api/v1/partners/earnings`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data.data;
}

export async function GetMyPartnerBookings() {
  const res = await axios({
    method: "get",
    url: `${API_URL_BASE}/api/v1/partners/bookings`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data.data;
}

export async function PartnerCreateBooking(formData) {
  const res = await axios({
    method: "post",
    url: `${API_URL_BASE}/api/v1/partners/book`,
    headers: { "Content-Type": "application/json" },
    data: formData,
    withCredentials: true,
  });
  return res.data;
}

export async function UpdatePartnerPayoutDetails(payoutData) {
  const res = await axios({
    method: "patch",
    url: `${API_URL_BASE}/api/v1/partners/payout-details`,
    headers: { "Content-Type": "application/json" },
    data: payoutData,
    withCredentials: true,
  });
  return res.data.data;
}

// Matches GetAllPackages in queryFunction.js exactly
export async function GetAllPackages() {
  const city = localStorage.getItem("currentCity") || "";
  const res = await axios({
    method: "get",
    url: `${API_URL_BASE}/api/v1/packages/get-all-packages/${city}`,
    headers: { "Content-Type": "application/json" },
  });
  return res.data.data;
}

// Matches GetAddOns in queryFunction.js exactly
export async function GetAddOns() {
  const city = localStorage.getItem("currentCity") || "";
  const res = await axios({
    method: "get",
    url: `${API_URL_BASE}/api/v1/bookings/get-all-addons/${city}`,
    headers: { "Content-Type": "application/json" },
  });
  return res.data; // { data: [...addons], coupans: [...] }
}

// Matches GetSlotAvailability in queryFunction.js exactly — same URL, same city source
export async function GetSlotAvailability(date, productId) {
  const city = localStorage.getItem("currentCity") || "";
  const res = await axios({
    method: "get",
    url: `${API_URL_BASE}/api/v1/bookings/get-slot-availability?date=${date}&productId=${productId}&city=${city}`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data;
}

const SLOTS      = ["9 AM - 11 AM", "12 PM - 2 PM", "3 PM - 5 PM", "5 PM - 7 PM"];
const MAX_PER_SLOT = 3; // must match bookingController.js

/* ─────────────────────────────────────────────────────────────
   SHARED UI PRIMITIVES
   ───────────────────────────────────────────────────────────── */
function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div className="relative bg-white rounded-2xl p-5 border border-orange-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 ${accent} rounded-bl-full opacity-10 group-hover:opacity-20 transition-all`} />
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-orange-50 rounded-xl">{icon}</div>
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function Spinner({ size = 20 }) {
  return <Loader2 size={size} className="animate-spin text-orange-500" />;
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <AlertCircle size={40} className="text-red-400" />
      <p className="text-gray-600 font-medium">{message || "Something went wrong."}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 text-sm text-orange-600 border border-orange-300 px-4 py-2 rounded-xl hover:bg-orange-50 transition"
        >
          <RefreshCw size={14} /> Try again
        </button>
      )}
    </div>
  );
}

function BookingRow({ booking, showIncentive = false }) {
  const statusConfig = {
    Completed: { cls: "bg-green-100 text-green-700",  icon: <CheckCircle2 size={12} /> },
    Upcoming:  { cls: "bg-blue-100 text-blue-700",    icon: <Clock size={12} /> },
    Pending:   { cls: "bg-amber-100 text-amber-700",  icon: <Clock size={12} /> },
    Cancelled: { cls: "bg-red-100 text-red-600",      icon: <X size={12} /> },
  };
  const s = statusConfig[booking.status] || statusConfig.Pending;

  const customer  = booking.customer  || booking.mobile           || "Walk-in";
  const petLabel  = booking.pet       || `${booking.petName ?? ""} (${booking.petType ?? ""})`;
  const pkgName   = booking.package   || booking.productId?.name  || "—";
  const amount    = booking.amount    || booking.bookingMarkedPrice || 0;
  const incentive = booking.incentive || booking.partnerIncentive  || 0;

  return (
    <div className="bg-white rounded-2xl border border-orange-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-sm transition">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm shrink-0">
          {String(customer)[0]?.toUpperCase() ?? "?"}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{customer}</p>
          <p className="text-xs text-gray-500">{petLabel}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {pkgName} · {booking.date} · {booking.timeSlot || booking.slot}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:flex-col sm:items-end">
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${s.cls}`}>
          {s.icon} {booking.status}
        </span>
        <div className="text-right">
          <p className="font-bold text-gray-900 text-sm">₹{Number(amount).toLocaleString()}</p>
          {showIncentive && (
            <p className="text-xs text-green-600 font-semibold">
              +₹{Number(incentive).toLocaleString()} earned
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessBanner({ message = "Booking created successfully!", onDismiss }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
      <CheckCircle2 size={20} />
      <span className="font-semibold">{message}</span>
      <button onClick={onDismiss} className="ml-2 text-white/70 hover:text-white"><X size={16} /></button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BOOKING FORM MODAL
   ───────────────────────────────────────────────────────────── */
function BookingFormModal({ onClose, onSuccess, incentivePercent = 15 }) {
  const [step, setStep]             = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError]     = useState("");

  // Catalog (packages + addons)
  const [packages, setPackages]             = useState([]);
  const [addons, setAddons]                 = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  // ── Slot availability — mirrors BookingModal exactly ──
  const [slotCounts, setSlotCounts]         = useState({});  // { "9 AM - 11 AM": 2, ... }
  const [slotsLoading, setSlotsLoading]     = useState(false);

  // Load catalog once on mount
  useEffect(() => {
    async function loadCatalog() {
      try {
        const [pkgs, adsRes] = await Promise.all([GetAllPackages(), GetAddOns()]);
        setPackages(Array.isArray(pkgs) ? pkgs : []);
        const addonList = Array.isArray(adsRes) ? adsRes : (adsRes?.data ?? []);
        setAddons(addonList);
      } catch {
        // Non-fatal
      } finally {
        setCatalogLoading(false);
      }
    }
    loadCatalog();
  }, []);

  const [form, setForm] = useState({
    customerName: "", customerPhone: "",
    address: "", pincode: "", city: "",
    petName: "", petType: "Dog", breed: "", age: "", weight: "", aggression: "",
    packageId: "", addons: [], date: "", timeSlot: "", notes: "",
  });
  const [errors, setErrors] = useState({});

  // ── Fetch slot availability whenever date OR packageId changes ──
  // Identical logic to BookingModal's useQuery({ queryKey: ["slotAvailability", form.date] })
  useEffect(() => {
    if (!form.date) {
      setSlotCounts({});
      return;
    }
    let cancelled = false;
    setSlotsLoading(true);

    GetSlotAvailability(form.date, form.packageId)
      .then((res) => {
        if (!cancelled) setSlotCounts(res?.data ?? {});
      })
      .catch(() => {
        if (!cancelled) setSlotCounts({});
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });

    return () => { cancelled = true; };
  }, [form.date, form.packageId]);

  const selectedPkg    = packages.find((p) => p._id === form.packageId);
  const addonsTotal    = form.addons.reduce((sum, id) => sum + (addons.find((a) => a._id === id)?.price || 0), 0);
  const grandTotal     = (Number(selectedPkg?.price) || 0) + Number(addonsTotal);
  const partnerEarning = Math.round(grandTotal * (incentivePercent / 100));

  const field = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const toggleAddon = (id) =>
    setForm((f) => ({
      ...f,
      addons: f.addons.includes(id) ? f.addons.filter((a) => a !== id) : [...f.addons, id],
    }));

  const validators = {
    1: () => {
      const e = {};
      if (!form.customerName.trim()) e.customerName = "Required";
      if (!form.customerPhone.trim() || form.customerPhone.replace(/\D/g, "").length < 10)
        e.customerPhone = "Valid 10-digit phone required";
      if (!form.address.trim()) e.address = "Required";
      if (!form.city) e.city = "Select a city";
      return e;
    },
    2: () => {
      const e = {};
      if (!form.petName.trim()) e.petName = "Required";
      if (!form.breed.trim()) e.breed = "Required";
      if (!form.age) e.age = "Required";
      if (!form.weight) e.weight = "Required";
      if (!form.aggression) e.aggression = "Required";
      return e;
    },
    3: () => {
      const e = {};
      if (!form.packageId) e.packageId = "Select a package";
      if (!form.date) e.date = "Required";
      if (!form.timeSlot) e.timeSlot = "Select a time slot";
      return e;
    },
  };

  function next() {
    const e = validators[step] ? validators[step]() : {};
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep((s) => s + 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setApiError("");
    try {
      await PartnerCreateBooking({
        productId:    form.packageId,
        petName:      form.petName,
        type:         form.petType,   // controller destructures as `type: petType`
        breed:        form.breed,
        age:          Number(form.age),
        weight:       Number(form.weight),
        aggression:   form.aggression,
        notes:        form.notes,
        address:      form.address,
        pincode:      form.pincode || "000000",
        lat:          0,
        lng:          0,
        city:         form.city || localStorage.getItem("currentCity") || "",
        date:         form.date,
        timeSlot:     form.timeSlot,
        addons:       form.addons,
        mobile:       form.customerPhone,
        customerName: form.customerName,
      });
      onSuccess();
    } catch (err) {
      setApiError(err?.response?.data?.message || err.message || "Booking failed.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls = "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition";
  const errCls   = "text-xs text-red-500 mt-1";
  const labelCls = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";
  const steps    = ["Customer", "Pet", "Package & Slot", "Confirm"];

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-white font-bold text-lg">Book a Session</h2>
            <p className="text-orange-100 text-xs mt-0.5">Step {step} of 4 — {steps[step - 1]}</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition"><X size={20} /></button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-orange-100 shrink-0">
          <div className="h-full bg-orange-500 transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

          {/* ── STEP 1: Customer ── */}
          {step === 1 && (
            <>
              <div>
                <label className={labelCls}>Customer Name</label>
                <input className={`${inputCls} ${errors.customerName ? "border-red-400" : ""}`} placeholder="e.g. Priya Bose"
                  value={form.customerName}
                  onChange={(e) => { field("customerName", e.target.value); setErrors((p) => ({ ...p, customerName: undefined })); }} />
                {errors.customerName && <p className={errCls}>{errors.customerName}</p>}
              </div>
              <div>
                <label className={labelCls}>Phone Number</label>
                <input className={`${inputCls} ${errors.customerPhone ? "border-red-400" : ""}`} placeholder="98765 43210"
                  value={form.customerPhone}
                  onChange={(e) => { field("customerPhone", e.target.value); setErrors((p) => ({ ...p, customerPhone: undefined })); }} />
                {errors.customerPhone && <p className={errCls}>{errors.customerPhone}</p>}
              </div>
              <div>
                <label className={labelCls}>Service Address</label>
                <textarea className={`${inputCls} ${errors.address ? "border-red-400" : ""}`} rows={3} placeholder="Flat no., Street, Area, City"
                  value={form.address}
                  onChange={(e) => { field("address", e.target.value); setErrors((p) => ({ ...p, address: undefined })); }} />
                {errors.address && <p className={errCls}>{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Pincode</label>
                  <input className={inputCls} placeholder="700001" value={form.pincode} onChange={(e) => field("pincode", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <select
                    className={`${inputCls} ${errors.city ? "border-red-400" : ""}`}
                    value={form.city}
                    onChange={(e) => {
                      const selectedCity = e.target.value;
                      field("city", selectedCity);
                      // Update localStorage so GetAllPackages / GetAddOns / GetSlotAvailability
                      // all pick up the new city — same as CitySelectionModal does
                      if (selectedCity) localStorage.setItem("currentCity", selectedCity);
                      // Reset package, addons, slot — they are city-specific
                      field("packageId", "");
                      field("addons", []);
                      field("timeSlot", "");
                      setErrors((p) => ({ ...p, city: undefined }));
                      // Reload catalog for the new city
                      setCatalogLoading(true);
                      Promise.all([GetAllPackages(), GetAddOns()])
                        .then(([pkgs, adsRes]) => {
                          setPackages(Array.isArray(pkgs) ? pkgs : []);
                          const addonList = Array.isArray(adsRes) ? adsRes : (adsRes?.data ?? []);
                          setAddons(addonList);
                        })
                        .catch(() => {})
                        .finally(() => setCatalogLoading(false));
                    }}
                  >
                    <option value="">Select city</option>
                    <option value="kolkata">Kolkata</option>
                    <option value="mumbai">Mumbai</option>
                  </select>
                  {errors.city && <p className={errCls}>{errors.city}</p>}
                </div>
              </div>
            </>
          )}

          {/* ── STEP 2: Pet ── */}
          {step === 2 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Pet Name</label>
                  <input className={`${inputCls} ${errors.petName ? "border-red-400" : ""}`} placeholder="Buddy"
                    value={form.petName}
                    onChange={(e) => { field("petName", e.target.value); setErrors((p) => ({ ...p, petName: undefined })); }} />
                  {errors.petName && <p className={errCls}>{errors.petName}</p>}
                </div>
                <div>
                  <label className={labelCls}>Pet Type</label>
                  <select className={inputCls} value={form.petType} onChange={(e) => field("petType", e.target.value)}>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls}>Breed</label>
                <input className={`${inputCls} ${errors.breed ? "border-red-400" : ""}`} placeholder="Golden Retriever"
                  value={form.breed}
                  onChange={(e) => { field("breed", e.target.value); setErrors((p) => ({ ...p, breed: undefined })); }} />
                {errors.breed && <p className={errCls}>{errors.breed}</p>}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Age (yrs)</label>
                  <input type="number" className={`${inputCls} ${errors.age ? "border-red-400" : ""}`} placeholder="2"
                    value={form.age}
                    onChange={(e) => { field("age", e.target.value); setErrors((p) => ({ ...p, age: undefined })); }} />
                  {errors.age && <p className={errCls}>{errors.age}</p>}
                </div>
                <div>
                  <label className={labelCls}>Weight (kg)</label>
                  <input type="number" className={`${inputCls} ${errors.weight ? "border-red-400" : ""}`} placeholder="15"
                    value={form.weight}
                    onChange={(e) => { field("weight", e.target.value); setErrors((p) => ({ ...p, weight: undefined })); }} />
                  {errors.weight && <p className={errCls}>{errors.weight}</p>}
                </div>
                <div>
                  <label className={labelCls}>Aggression</label>
                  <select className={`${inputCls} ${errors.aggression ? "border-red-400" : ""}`} value={form.aggression}
                    onChange={(e) => { field("aggression", e.target.value); setErrors((p) => ({ ...p, aggression: undefined })); }}>
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  {errors.aggression && <p className={errCls}>{errors.aggression}</p>}
                </div>
              </div>
              <div>
                <label className={labelCls}>Notes (optional)</label>
                <textarea className={inputCls} rows={2} placeholder="Behaviour notes, allergies, etc."
                  value={form.notes} onChange={(e) => field("notes", e.target.value)} />
              </div>
            </>
          )}

          {/* ── STEP 3: Package + Add-ons + Date + DYNAMIC SLOTS ── */}
          {step === 3 && (
            <>
              {/* Package picker */}
              <div>
                <label className={labelCls}>Select Package</label>
                {catalogLoading
                  ? <div className="flex items-center gap-2 py-4 text-sm text-gray-400"><Loader2 size={16} className="animate-spin" /> Loading packages…</div>
                  : <div className="space-y-2">
                      {packages.map((pkg) => (
                        <label key={pkg._id}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                            form.packageId === pkg._id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"
                          }`}>
                          <div className="flex items-center gap-3">
                            <input type="radio" name="package" className="accent-orange-600"
                              checked={form.packageId === pkg._id}
                              onChange={() => {
                                field("packageId", pkg._id);
                                // Reset slot when package changes — availability may differ
                                field("timeSlot", "");
                                setErrors((p) => ({ ...p, packageId: undefined }));
                              }} />
                            <span className="text-lg">{pkg.emoji || "🐾"}</span>
                            <span className="text-sm font-medium text-gray-800">{pkg.name}</span>
                          </div>
                          <span className="text-orange-600 font-bold text-sm">₹{pkg.price}</span>
                        </label>
                      ))}
                    </div>
                }
                {errors.packageId && <p className={errCls}>{errors.packageId}</p>}
              </div>

              {/* Add-ons */}
              {addons.length > 0 && (
                <div>
                  <label className={labelCls}>Add-ons (optional)</label>
                  <div className="space-y-2">
                    {addons.map((a) => (
                      <label key={a._id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                          form.addons.includes(a._id) ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200"
                        }`}>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="accent-orange-600"
                            checked={form.addons.includes(a._id)}
                            onChange={() => toggleAddon(a._id)} />
                          <span className="text-sm text-gray-700">{a.name}</span>
                        </div>
                        <span className="text-sm text-orange-600 font-semibold">+₹{a.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Date picker */}
              <div>
                <label className={labelCls}>Preferred Date</label>
                <input type="date" className={`${inputCls} ${errors.date ? "border-red-400" : ""}`}
                  value={form.date}
                  min={new Date().toLocaleDateString("en-CA")}
                  onChange={(e) => {
                    field("date", e.target.value);
                    field("timeSlot", ""); // reset slot when date changes
                    setErrors((p) => ({ ...p, date: undefined, timeSlot: undefined }));
                  }} />
                {errors.date && <p className={errCls}>{errors.date}</p>}
              </div>

              {/* ── DYNAMIC SLOT GRID — mirrors BookingModal exactly ── */}
              <div>
                <label className={labelCls}>Preferred Time Slot</label>

                {!form.date ? (
                  <p className="text-xs text-gray-400 mt-2">
                    Please select a date first to see available slots.
                  </p>
                ) : slotsLoading ? (
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                    <Loader2 size={14} className="animate-spin" /> Checking availability…
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {SLOTS.map((slot) => {
                      const count      = slotCounts?.[slot] || 0;
                      const isFull     = count >= MAX_PER_SLOT;
                      const isSelected = form.timeSlot === slot;
                      const spotsLeft  = MAX_PER_SLOT - count;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isFull}
                          onClick={() => {
                            if (!isFull) {
                              field("timeSlot", slot);
                              setErrors((p) => ({ ...p, timeSlot: undefined }));
                            }
                          }}
                          className={`
                            relative px-4 py-3 rounded-xl border text-sm font-medium transition text-left
                            ${isFull
                              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                              : isSelected
                              ? "bg-orange-600 text-white border-orange-600 shadow"
                              : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
                            }
                          `}
                        >
                          {slot}
                          {isFull ? (
                            <span className="block text-xs font-normal text-red-400 no-underline mt-0.5" style={{ textDecoration: "none" }}>
                              Fully Booked
                            </span>
                          ) : (
                            <span className={`block text-xs font-normal mt-0.5 ${isSelected ? "text-orange-100" : "text-gray-400"}`}>
                              {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
                {errors.timeSlot && <p className={errCls}>{errors.timeSlot}</p>}
              </div>
            </>
          )}

          {/* ── STEP 4: Confirm ── */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-2xl p-4 space-y-2 border border-orange-100">
                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3">Booking Summary</h3>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Customer</span><span className="font-semibold">{form.customerName || "Walk-in"}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Phone</span><span className="font-semibold">{form.customerPhone}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Address</span><span className="font-semibold text-right max-w-[60%]">{form.address}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Pet</span><span className="font-semibold">{form.petName} ({form.petType}) · {form.breed}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Age / Weight</span><span className="font-semibold">{form.age} yrs · {form.weight} kg</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Aggression</span><span className="font-semibold">{form.aggression}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Package</span><span className="font-semibold">{selectedPkg?.name || "—"}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Date & Slot</span><span className="font-semibold">{form.date} · {form.timeSlot}</span></div>
                {form.addons.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Add-ons</span>
                    <span className="font-semibold text-right max-w-[60%]">
                      {form.addons.map((id) => addons.find((a) => a._id === id)?.name).join(", ")}
                    </span>
                  </div>
                )}
                <div className="border-t border-orange-200 pt-2 mt-2 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-orange-600">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                <IndianRupee size={20} className="text-green-600 shrink-0" />
                <div>
                  <p className="font-bold text-green-800">Your Incentive</p>
                  <p className="text-sm text-green-700">
                    ₹<strong>{partnerEarning.toLocaleString()}</strong> ({incentivePercent}%) will be credited once the booking is <strong>completed</strong>.
                  </p>
                </div>
              </div>

              {apiError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-sm text-red-700">
                  <AlertCircle size={16} /> {apiError}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between shrink-0 bg-white">
          {step > 1
            ? <button onClick={() => setStep((s) => s - 1)} className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium transition">Back</button>
            : <div />
          }
          {step < 4
            ? <button onClick={next} className="px-7 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition">Next →</button>
            : <button onClick={handleSubmit} disabled={submitting}
                className="px-7 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition flex items-center gap-2 disabled:opacity-60">
                {submitting ? <Spinner size={16} /> : <CheckCircle2 size={16} />}
                Confirm Booking
              </button>
          }
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAYOUT DETAILS FORM
   ───────────────────────────────────────────────────────────── */
function PayoutDetailsForm({ initialData, onSaved }) {
  const [form, setForm] = useState({
    upiId:         initialData?.upiId         || "",
    accountHolder: initialData?.accountHolder || "",
    accountNumber: initialData?.accountNumber || "",
    ifsc:          initialData?.ifsc          || "",
    bankName:      initialData?.bankName      || "",
  });
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [error,  setError]  = useState("");

  const field    = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const inputCls = "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition";
  const labelCls = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";

  async function save() {
    setSaving(true); setError("");
    try {
      await UpdatePartnerPayoutDetails(form);
      setSaved(true);
      onSaved?.();
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-orange-100 p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <CreditCard size={18} className="text-orange-600" />
        <h3 className="font-bold text-gray-800">Payout Details</h3>
      </div>
      <div>
        <label className={labelCls}>UPI ID</label>
        <input className={inputCls} placeholder="yourname@upi" value={form.upiId} onChange={(e) => field("upiId", e.target.value)} />
      </div>
      <div className="border-t border-dashed border-gray-200 pt-4">
        <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">Or Bank Transfer</p>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Account Holder</label>
            <input className={inputCls} placeholder="Full name as on bank account" value={form.accountHolder} onChange={(e) => field("accountHolder", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Account Number</label>
              <input className={inputCls} placeholder="XXXXXXXXXX" value={form.accountNumber} onChange={(e) => field("accountNumber", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>IFSC Code</label>
              <input className={inputCls} placeholder="SBIN0001234" value={form.ifsc} onChange={(e) => field("ifsc", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Bank Name</label>
            <input className={inputCls} placeholder="State Bank of India" value={form.bankName} onChange={(e) => field("bankName", e.target.value)} />
          </div>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button onClick={save} disabled={saving}
        className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60">
        {saving ? <Spinner size={16} /> : saved ? <CheckCircle2 size={16} /> : null}
        {saved ? "Saved!" : "Save Payout Details"}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN DASHBOARD
   ───────────────────────────────────────────────────────────── */
export default function PartnerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]     = useState("overview");
  const [showModal, setShowModal]     = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg]   = useState("");

  const [profile,  setProfile]  = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [bookings, setBookings] = useState([]);

  const [profileLoading,  setProfileLoading]  = useState(true);
  const [earningsLoading, setEarningsLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  const [profileError,  setProfileError]  = useState("");
  const [earningsError, setEarningsError] = useState("");
  const [bookingsError, setBookingsError] = useState("");

  const fetchProfile = useCallback(async () => {
    setProfileLoading(true); setProfileError("");
    try   { setProfile(await GetMyPartnerProfile()); }
    catch (err) { setProfileError(err?.response?.data?.message || err.message); }
    finally { setProfileLoading(false); }
  }, []);

  const fetchEarnings = useCallback(async () => {
    setEarningsLoading(true); setEarningsError("");
    try   { setEarnings(await GetMyPartnerEarnings()); }
    catch (err) { setEarningsError(err?.response?.data?.message || err.message); }
    finally { setEarningsLoading(false); }
  }, []);

  const fetchBookings = useCallback(async () => {
    setBookingsLoading(true); setBookingsError("");
    try   { const d = await GetMyPartnerBookings(); setBookings(Array.isArray(d) ? d : []); }
    catch (err) { setBookingsError(err?.response?.data?.message || err.message); }
    finally { setBookingsLoading(false); }
  }, []);

  useEffect(() => { fetchProfile(); },  [fetchProfile]);
  useEffect(() => { fetchEarnings(); }, [fetchEarnings]);
  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  function handleSuccess() {
    setShowModal(false);
    fetchBookings();
    fetchEarnings();
    fetchProfile();
    setSuccessMsg("Booking created! Incentive credited to your account.");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  }

  const tabs = [
    { key: "overview", label: "Overview",    icon: <TrendingUp size={16} /> },
    { key: "bookings", label: "My Bookings", icon: <ClipboardList size={16} /> },
    { key: "earnings", label: "Earnings",    icon: <Wallet size={16} /> },
    { key: "profile",  label: "Profile",     icon: <User size={16} /> },
  ];

  const partnerName  = profile?.name             || "Partner";
  const partnerCity  = profile?.city             || "";
  const isVerified   = profile?.isVerified       || false;
  const incentivePct = profile?.incentivePercent ?? 15;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">

      {/* ── TOP HEADER ── */}
      <div className="bg-white border-b border-orange-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-40 h-10 object-contain" src="/images/Navbar/PetlincLogo.png" alt="Petlinc" onClick={()=>{navigate('/')}} />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-3 py-1.5">
              {isVerified
                ? <BadgeCheck size={14} className="text-orange-600" />
                : <AlertCircle size={14} className="text-amber-500" />
              }
              <span className="text-xs font-bold text-orange-700">
                {isVerified ? "VERIFIED PARTNER" : "PENDING KYC"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {profileLoading
                ? <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center"><Spinner size={16} /></div>
                : <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-sm">{partnerName[0]}</div>
              }
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">{partnerName}</p>
                <p className="text-xs text-gray-400">{partnerCity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-5 flex gap-1 pb-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.key ? "border-orange-600 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8 space-y-8">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <>
            <div className="bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold">Welcome back, {partnerName.split(" ")[0]}! 👋</h1>
                <p className="text-orange-100 mt-1 text-sm">
                  {earningsLoading ? "Loading your stats…" : `${earnings?.totalBookings ?? 0} bookings created all time.`}
                </p>
              </div>
              <button onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-white text-orange-600 font-bold px-5 py-3 rounded-2xl hover:bg-orange-50 transition shadow">
                <Plus size={18} /> Book a Session
              </button>
            </div>

            {earningsLoading
              ? <div className="flex justify-center py-8"><Spinner size={28} /></div>
              : earningsError
                ? <ErrorState message={earningsError} onRetry={fetchEarnings} />
                : (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={<IndianRupee size={18} className="text-orange-600" />} label="This Month"     value={`₹${(earnings?.thisMonthEarnings ?? 0).toLocaleString()}`} sub="Earnings"           accent="bg-orange-500" />
                    <StatCard icon={<Wallet size={18} className="text-green-600" />}       label="Pending Payout" value={`₹${(earnings?.pendingPayout ?? 0).toLocaleString()}`}     sub="Awaiting settlement" accent="bg-green-400" />
                    <StatCard icon={<CalendarCheck size={18} className="text-blue-600" />} label="Total Sessions" value={earnings?.totalBookings ?? 0}                               sub="All time"            accent="bg-blue-400" />
                    <StatCard icon={<Star size={18} className="text-yellow-500" />}        label="Your Rating"    value={`${profile?.rating ?? "—"} ★`}                              sub={`${incentivePct}% incentive`} accent="bg-yellow-400" />
                  </div>
                )
            }

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 text-lg">Recent Sessions</h2>
                <button onClick={() => setActiveTab("bookings")} className="text-sm text-orange-600 hover:underline flex items-center gap-1">
                  View all <ChevronRight size={14} />
                </button>
              </div>
              {bookingsLoading
                ? <div className="flex justify-center py-6"><Spinner /></div>
                : bookingsError
                  ? <ErrorState message={bookingsError} onRetry={fetchBookings} />
                  : bookings.length === 0
                    ? <p className="text-center text-gray-400 py-8">No bookings yet. Create your first one!</p>
                    : <div className="space-y-3">{bookings.slice(0, 3).map((b) => <BookingRow key={b._id} booking={b} />)}</div>
              }
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 flex gap-4 items-start">
              <div className="p-2 bg-green-100 rounded-xl shrink-0"><TrendingUp size={20} className="text-green-700" /></div>
              <div>
                <h3 className="font-bold text-green-800">You earn {incentivePct}% on every booking you create</h3>
                <p className="text-sm text-green-700 mt-1">
                  Petlinc credits <strong>{incentivePct}% of the booking value</strong> to your partner account. Payouts are settled every Monday.
                </p>
              </div>
            </div>
          </>
        )}

        {/* ── BOOKINGS TAB ── */}
        {activeTab === "bookings" && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-xl">My Bookings</h2>
              <button onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-orange-700 transition text-sm">
                <Plus size={16} /> New Booking
              </button>
            </div>
            {bookingsLoading
              ? <div className="flex justify-center py-12"><Spinner size={28} /></div>
              : bookingsError
                ? <ErrorState message={bookingsError} onRetry={fetchBookings} />
                : bookings.length === 0
                  ? <p className="text-center text-gray-400 py-12">No bookings found. Start creating sessions!</p>
                  : <div className="space-y-3">{bookings.map((b) => <BookingRow key={b._id} booking={b} showIncentive />)}</div>
            }
          </>
        )}

        {/* ── EARNINGS TAB ── */}
        {activeTab === "earnings" && (
          <>
            <h2 className="font-bold text-gray-900 text-xl">Earnings Breakdown</h2>
            {earningsLoading
              ? <div className="flex justify-center py-12"><Spinner size={28} /></div>
              : earningsError
                ? <ErrorState message={earningsError} onRetry={fetchEarnings} />
                : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-orange-600 text-white rounded-2xl p-5">
                        <p className="text-orange-200 text-sm font-medium">This Month</p>
                        <p className="text-3xl font-extrabold mt-1">₹{(earnings?.thisMonthEarnings ?? 0).toLocaleString()}</p>
                      </div>
                      <div className="bg-white border border-green-200 rounded-2xl p-5">
                        <p className="text-gray-500 text-sm font-medium">Pending Payout</p>
                        <p className="text-3xl font-extrabold mt-1 text-green-600">₹{(earnings?.pendingPayout ?? 0).toLocaleString()}</p>
                        <p className="text-gray-400 text-xs mt-1">Settles next Monday</p>
                      </div>
                      <div className="bg-white border border-orange-100 rounded-2xl p-5">
                        <p className="text-gray-500 text-sm font-medium">All Time</p>
                        <p className="text-3xl font-extrabold mt-1 text-gray-900">₹{(earnings?.totalEarnings ?? 0).toLocaleString()}</p>
                        <p className="text-gray-400 text-xs mt-1">{earnings?.totalBookings ?? 0} sessions</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                      <AlertCircle size={18} className="text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-sm text-amber-800">
                        Payouts processed every <strong>Monday</strong> via UPI or bank transfer. Keep your payout details updated in the Profile tab.
                      </p>
                    </div>

                    {earnings?.bookings?.length > 0 && (
                      <div>
                        <h3 className="font-bold text-gray-700 mb-3">Session-wise Incentives</h3>
                        <div className="rounded-2xl border border-orange-100 overflow-hidden overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-orange-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="text-left px-4 py-3">Booking</th>
                                <th className="text-left px-4 py-3 hidden sm:table-cell">Package</th>
                                <th className="text-left px-4 py-3 hidden sm:table-cell">Date</th>
                                <th className="text-right px-4 py-3">Amount</th>
                                <th className="text-right px-4 py-3 text-green-700">Incentive</th>
                                <th className="text-center px-4 py-3 hidden sm:table-cell">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {earnings.bookings.map((b, i) => (
                                <tr key={b._id} className={`border-t border-orange-50 ${i % 2 === 0 ? "bg-white" : "bg-orange-50/30"}`}>
                                  <td className="px-4 py-3">
                                    <p className="font-semibold text-gray-800">{b.mobile || "Walk-in"}</p>
                                    <p className="text-gray-400 text-xs">{b.petName} ({b.petType})</p>
                                  </td>
                                  <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{b.productId?.name || "—"}</td>
                                  <td className="px-4 py-3 hidden sm:table-cell text-gray-500">{b.date}</td>
                                  <td className="px-4 py-3 text-right font-semibold text-gray-800">₹{Number(b.bookingMarkedPrice || 0).toLocaleString()}</td>
                                  <td className="px-4 py-3 text-right font-bold text-green-600">+₹{Number(b.partnerIncentive || 0).toLocaleString()}</td>
                                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                                    {b.incentivePaid
                                      ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Paid</span>
                                      : <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Pending</span>
                                    }
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </>
                )
            }
          </>
        )}

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <>
            <h2 className="font-bold text-gray-900 text-xl">My Profile</h2>
            {profileLoading
              ? <div className="flex justify-center py-12"><Spinner size={28} /></div>
              : profileError
                ? <ErrorState message={profileError} onRetry={fetchProfile} />
                : (
                  <>
                    <div className="bg-white rounded-2xl border border-orange-100 p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-extrabold text-2xl">
                          {partnerName[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-extrabold text-gray-900 text-xl">{partnerName}</p>
                            {isVerified && <BadgeCheck size={18} className="text-orange-500" />}
                          </div>
                          <p className="text-sm text-gray-500">{partnerCity}</p>
                          <p className="text-xs text-orange-600 font-semibold mt-0.5">{incentivePct}% incentive rate</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-orange-50">
                        <div className="flex items-center gap-2 text-sm text-gray-600"><Phone size={14} className="text-orange-400" /><span>{profile?.phone || "—"}</span></div>
                        <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin size={14} className="text-orange-400" /><span>{partnerCity || "—"}</span></div>
                        <div className="flex items-center gap-2 text-sm text-gray-600"><CalendarCheck size={14} className="text-orange-400" /><span>{earnings?.totalBookings ?? "—"} bookings</span></div>
                        <div className="flex items-center gap-2 text-sm text-gray-600"><Star size={14} className="text-yellow-400" /><span>{profile?.rating ?? "—"} rating</span></div>
                      </div>
                      {!isVerified && (
                        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
                          <AlertCircle size={16} className="shrink-0" />
                          KYC verification is pending. Contact admin to get verified.
                        </div>
                      )}
                    </div>
                    <PayoutDetailsForm initialData={profile?.payoutDetails} onSaved={fetchProfile} />
                  </>
                )
            }
          </>
        )}
      </div>

      {showModal && (
        <BookingFormModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
          incentivePercent={incentivePct}
        />
      )}

      {showSuccess && (
        <SuccessBanner message={successMsg} onDismiss={() => setShowSuccess(false)} />
      )}
    </div>
  );
}