
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { GetAllBookingsForDashboard } from "../Features/Booking/queryFunction";
import axios from "axios";
import AdminNavbar from "./../Features/Admin/AdminNavbar";
import { GetAllGroomers } from "../Features/Groomers/queryFunctions";
import { Loader } from "lucide-react";
import queryClient from "../Store/queryClient";



const API_URL_BASE = import.meta.env.VITE_BASE_URL

export default function AdminDashboard() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [todayOnly, setTodayOnly] = useState(false);
  const [tomorrowOnly, setTomorrowOnly] = useState(false);
  const [readFilter, setReadFilter] = useState("all"); 



  const { data: bookings = [], isPending, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: GetAllBookingsForDashboard,
  });
  
   const {data:groomers} = useQuery({
    queryKey:["groomers"],
    queryFn:GetAllGroomers
   })

   const changeReadStatus = useMutation({
    mutationFn:async()=>{
      await axios.patch(`${API_URL_BASE}/api/v1/bookings/change-read-status/${selectedBooking._id}`, {}, {withCredentials:true})
    },
    onSuccess:async()=>{
      queryClient.invalidateQueries(['bookings'])
    }
  })


const groomerMap = useMemo(() => {
  const map = {};
  groomers?.forEach((g) => {
    map[g._id] = g;
  });
  return map;
}, [groomers]);



  const filteredBookings = useMemo(() => {
  return bookings.filter((b) => {
    const text = `${b.petName} ${b.userId?.name} ${b.userId?.email}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (b.status || "pending") === statusFilter;

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
}, [
  bookings,
  search,
  statusFilter,
  readFilter,
  fromDate,
  toDate,
  todayOnly,
  tomorrowOnly,
]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center text-gray-500">
        Loading bookings…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-8 text-gray-800">
     <AdminNavbar/>
      {/* Header */}
      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin · Bookings</h1>
        <p className="text-sm text-slate-500">Petlinc Operations Dashboard</p>
      </div> */}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 mt-6">
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
        {/* 🆕 TODAY BUTTON */}
        <button
          onClick={() => {
            setTodayOnly(!todayOnly);
            setTomorrowOnly(false);
            setFromDate("");
            setToDate("");
          }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm transition
            ${
              todayOnly
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
        >
          📅 Today
        </button>
         {/* 🆕 TOMORROW BUTTON */}
        <button
          onClick={() => {
            setTomorrowOnly(!tomorrowOnly);
            setTodayOnly(false)
            setFromDate("");
            setToDate("");
          }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm transition
            ${
              tomorrowOnly
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
        >
          📅 Tomorrow
        </button>
      
      <button
  onClick={() =>
    setReadFilter((prev) => (prev === "unread" ? "all" : "unread"))
  }
  className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm
    ${
      readFilter === "unread"
        ? "bg-orange-600 text-white border-orange-600"
        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
    }`}
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
                {/* <th className="px-4 py-3">ID</th> */}
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Pet</th>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Booking Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3">Assigned groomer</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((b, i) => (
                <tr key={b._id} className={`hover:bg-slate-50 transition ${!b.isRead?"bg-orange-50":""}`}>
                 <td className="px-4 py-3 font-mono text-xs text-slate-400">{i+1} {!b.isRead &&<span className = "text-orange-600 bg-orange-100 rounded-3xl p-2 mx-4">New</span>}</td>
                  {/* <td className="px-4 py-3 font-mono text-xs text-slate-400">{b._id.slice(-6)}</td> */}

                  <td className="px-4 py-3">
                    <div className="font-medium">{b.userId?.name}</div>
                    <div className="text-xs text-slate-400">{b.userId?.email}</div>
                  </td>

                  <td className="px-4 py-3">{b.petName}</td>
                  <td className="px-4 py-3">{b.productId?.name}</td>
                  <td className = "px-4 py-3">
                    <div className="font-medium">{new Date(b.date).toDateString()}</div>
                    <div className="text-xs text-slate-400">{b.timeSlot}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold">₹{b.bookingMarkedPrice - b.discount}</td>

                  <td className="px-4 py-3"><StatusPill status={b.status || "pending"} /></td>

                  <td className="px-4 py-3 space-x-2">
                    {b.addons?.length > 0 && (
                      <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs">+ Add-ons</span>
                    )}
                    {b.aggression === "3" && (
                      <span className="px-2 py-1 rounded-full bg-red-50 text-red-600 text-xs">⚠Aggressive</span>
                    )}
                  </td>
                  
                   {/* <td className="px-4 py-3 font-semibold">{groomers.map((groomer)=>{if(groomer._id===b.assignedGroomer) return groomer.name})}</td> */}

                    <td className="px-4 py-3">
  {groomerMap[b.assignedGroomer] ? (
    <div className="relative group inline-block">
      {/* Groomer Name */}
      <span className="font-semibold text-indigo-600 cursor-pointer underline decoration-dotted">
        {groomerMap[b.assignedGroomer].name}
      </span>

      {/* Tooltip */}
      <div className="absolute z-50 hidden group-hover:block left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-3 text-xs">
        <p className="font-semibold text-slate-800">
          {groomerMap[b.assignedGroomer].name}
        </p>
        <p className="text-slate-500">
          📞 {groomerMap[b.assignedGroomer].phone}
        </p>
        <p className="text-slate-500">
          📍 {groomerMap[b.assignedGroomer].city}
        </p>
        <p className="text-slate-500">
          ⭐ Rating: {groomerMap[b.assignedGroomer].rating || "N/A"}
        </p>
      </div>
    </div>
  ) : (
    <span className="text-slate-400 italic">Not assigned</span>
  )}
</td>




                  <td className="px-4 py-3">
                    <button
                      onClick={() => {setSelectedBooking(b); changeReadStatus.mutate()}}

                      className="px-3 py-1 rounded-lg bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/20 text-xs font-semibold"
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

      {selectedBooking && (
        <FullPageBookingView
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdated={refetch}
        />
      )}
    </div>
  );
}

/* ================= FULL PAGE BOOKING VIEW ================= */

function FullPageBookingView({ booking, onClose, onUpdated }) {
  const [status, setStatus] = useState(booking.status || "pending");
  const [assignedGroomer, setAssignedGroomer] = useState(booking.assignedGroomer || "");
 

  const {data:groomers, isPending} = useQuery({
    queryKey:["groomers"],
    queryFn:GetAllGroomers
  })
  
  const updateStatus = useMutation({
    mutationFn: async () => {
     const res =  await axios({
      method:'patch',
      url:`${API_URL_BASE}/api/v1/bookings/change-booking-status/${booking._id}`,
      headers:{
        'Content-Type':'application/json'
      },
      data:{
        status:status
      },
      withCredentials:true

     })
     
     return res.data;
     
    },
    
    onSuccess: () => onUpdated(),
    
  });

  const assignGroomer = useMutation({
    mutationFn: async () => {
      
      await axios.patch(`${API_URL_BASE}/api/v1/bookings/assign-groomer/${booking._id}`, { groomerId: assignedGroomer }, {withCredentials:true});
    },
    onSuccess: () => onUpdated(),
  });

  

  if(isPending){
    return <Loader/>
  }
  const steps = ["pending", "confirmed", "on_the_way", "completed"];

  return (
    <div className="fixed inset-0 z-50 bg-[#f4f6fb] overflow-y-auto">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-2xl font-bold">Booking #{booking._id.slice(-6)}</h2>
          <p className="text-sm text-slate-500">Full Booking View</p>
        </div>
        <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm">Close</button>
      </div>

      <div className="p-8 space-y-8">

        {/* STATUS TIMELINE */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase">Status Timeline</h3>
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${steps.indexOf(status) >= i ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}>
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
              className="mt-3 w-full px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
              Update Status
            </button>
          </InfoCard>

          <InfoCard title="Assign Groomer">
            <select
              value={assignedGroomer}
              onChange={(e) => setAssignedGroomer(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200"
            >
               <option value = "">Select Groomer</option>
              {groomers.map((groomer)=>{return <option key = {groomer._id} value = {groomer._id}>{groomer.name}</option>})}
              {/* <option value="">Select Groomer</option>
              <option value="g1">Rahul Sharma</option>
              <option value="g2">Amit Verma</option>
              <option value="g3">Sanjay Kumar</option> */}
            </select>

            <button
              onClick={() => assignGroomer.mutate()}
              className="mt-3 w-full px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            >
              Assign Groomer
            </button>
          </InfoCard>
        </div>

        {/* STATUS HISTORY */}
        <InfoCard title="Status History">
          {booking.statusHistory?.length ? (
            <ul className="space-y-2">
              {booking.statusHistory.map((h, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="capitalize">{h.status.replaceAll("_", " ")}</span>
                  <span className="text-slate-400">{h.changedBy} · {new Date(h.changedAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">No history yet</p>
          )}
        </InfoCard>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CUSTOMER + MAP */}
          <InfoCard title="Customer & Location">
            <p><strong>Name:</strong> {booking.userId?.name}</p>
            <p><strong>Email:</strong> {booking.userId?.email}</p>
            <p><strong>Mobile:</strong> {booking.mobile}</p>
            <p><strong>Address:</strong> {booking.address}</p>

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

          {/* PET */}
          <InfoCard title="Pet">
            <p><strong>Name:</strong> {booking.petName}</p>
            <p><strong>Type:</strong> {booking.petType}</p>
            <p><strong>Breed:</strong> {booking.breed}</p>
            <p><strong>Aggression:</strong> {booking.aggression}</p>
          </InfoCard>

          {/* PACKAGE DETAILS */}
          <InfoCard title="Package Details">
            <p><strong>Name:</strong> {booking.productId?.name}</p>
            <p><strong>Tag:</strong> {booking.productId?.tag}</p>
            <p><strong>Base Price:</strong> ₹{booking.productId?.price}</p>

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

          {/* PRICING */}
          <InfoCard title="Pricing">
            <p>Marked: ₹{booking.bookingMarkedPrice}</p>
            <p>Discount: ₹{booking.discount}</p>
            <p className="font-bold text-emerald-600">Final: ₹{booking.bookingMarkedPrice - booking.discount}</p>
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
