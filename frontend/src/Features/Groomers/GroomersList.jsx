// import { useState } from "react";
// import { Link } from "react-router-dom";
// import AdminNavbar from "./../Admin/AdminNavbar";
// import { useQuery } from "@tanstack/react-query";



// import { GetAllGroomers } from "./queryFunctions";

// import  Loader from "./../../Components/Loader"

// export default function GroomersList() {
//   const [search, setSearch] = useState("");

//   const {data:groomers, isPending} = useQuery({
//     queryKey:["groomers"],
//     queryFn:GetAllGroomers
//   })
//   if(isPending){
//     return <Loader/>
//   }
//   const filtered = groomers.filter((g) =>
//     g.name.toLowerCase().includes(search.toLowerCase()) ||
//     g.city.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <AdminNavbar />

//       <div className="min-h-screen bg-slate-50 p-8">
//         <div className="max-w-7xl mx-auto space-y-6">

//           {/* HEADER */}
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Grooming Partners
//               </h1>
//               <p className="text-sm text-gray-600 mt-1">
//                 Manage and verify grooming partners
//               </p>
//             </div>

//             <Link
//               to="/admin/add-groomer"
//               className="px-5 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition"
//             >
//               + Add Groomer
//             </Link>
//           </div>

//           {/* FILTERS */}
//           <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-4">
//             <input
//               type="text"
//               placeholder="Search by name or city..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
//             />
//           </div>

//           {/* TABLE */}
//           <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
//             <table className="min-w-full text-sm">
//               <thead className="bg-slate-100 text-slate-700">
//                 <tr>
//                   <Th>Name</Th>
//                   <Th>Phone</Th>
//                   <Th>City</Th>
//                   <Th>Experience</Th>
//                   <Th>Rating</Th>
//                   <Th>Status</Th>
//                   <Th>Actions</Th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filtered.map((g) => (
//                   <tr
//                     key={g._id}
//                     className="border-t border-slate-200 hover:bg-slate-50"
//                   >
//                     <Td>
//                       <div className="font-medium text-gray-900">
//                         {g.name}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {g.pincode}
//                       </div>
//                     </Td>

//                     <Td>{g.phone}</Td>
//                     <Td>{g.city}</Td>
//                     <Td>{g.experienceYears} yrs</Td>
//                     <Td>⭐ {g.rating}</Td>

//                     <Td>
//                       <StatusBadge
//                         verified={g.isVerified}
//                         active={g.isActive}
//                       />
//                     </Td>

//                     <Td>
//                       <div className="flex gap-2">
//                         <Link
//                           to={`/admin/groomers/${g._id}`}
//                           className="text-orange-600 hover:underline text-sm"
//                         >
//                           View
//                         </Link>
//                         <button className="text-green-600 text-sm">
//                           Verify
//                         </button>
//                         <button className="text-red-600 text-sm">
//                           Disable
//                         </button>
//                       </div>
//                     </Td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* EMPTY STATE */}
//           {filtered.length === 0 && (
//             <div className="text-center text-gray-500 py-16">
//               No groomers found
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// /* ---------- Helpers ---------- */

// function Th({ children }) {
//   return (
//     <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
//       {children}
//     </th>
//   );
// }

// function Td({ children }) {
//   return <td className="px-4 py-3">{children}</td>;
// }

// function StatusBadge({ verified, active }) {
//   return (
//     <div className="flex flex-col gap-1">
//       <span
//         className={`text-xs px-2 py-0.5 rounded-full w-fit ${
//           verified
//             ? "bg-green-100 text-green-700"
//             : "bg-yellow-100 text-yellow-700"
//         }`}
//       >
//         {verified ? "Verified" : "Unverified"}
//       </span>
//       <span
//         className={`text-xs px-2 py-0.5 rounded-full w-fit ${
//           active
//             ? "bg-blue-100 text-blue-700"
//             : "bg-red-100 text-red-700"
//         }`}
//       >
//         {active ? "Active" : "Inactive"}
//       </span>
//     </div>
//   );
// }


import { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./../Admin/AdminNavbar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetAllGroomers, VerifyGroomer, ToggleGroomerStatus } from "./queryFunctions";
import Loader from "./../../Components/Loader";
import toast from "react-hot-toast";

export default function GroomersList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "verified" | "unverified" | "inactive"
  const queryClient = useQueryClient();

  const { data: groomers = [], isPending } = useQuery({
    queryKey: ["groomers"],
    queryFn: GetAllGroomers,
  });

  const verifyMutation = useMutation({
    mutationFn: (id) => VerifyGroomer(id),
    onSuccess: () => {
      toast.success("Groomer verified!");
      queryClient.invalidateQueries(["groomers"]);
    },
    onError: () => toast.error("Failed to verify groomer."),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }) => ToggleGroomerStatus(id, !isActive),
    onSuccess: (_, { isActive }) => {
      toast.success(isActive ? "Groomer disabled." : "Groomer enabled.");
      queryClient.invalidateQueries(["groomers"]);
    },
    onError: () => toast.error("Failed to update status."),
  });

  if (isPending) return <Loader />;

  const filtered = groomers.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.city.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "verified" && g.isVerified) ||
      (statusFilter === "unverified" && !g.isVerified) ||
      (statusFilter === "inactive" && !g.isActive);

    return matchesSearch && matchesStatus;
  });

  // Stats
  const total = groomers.length;
  const verified = groomers.filter((g) => g.isVerified).length;
  const active = groomers.filter((g) => g.isActive).length;
  const unverified = groomers.filter((g) => !g.isVerified).length;

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Grooming Partners</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and verify grooming partners</p>
            </div>
            <Link
              to="/add-groomer"
              className="px-5 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition"
            >
              + Add Groomer
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total" value={total} color="text-gray-800" />
            <StatCard label="Verified" value={verified} color="text-green-600" />
            <StatCard label="Active" value={active} color="text-blue-600" />
            <StatCard label="Needs Verification" value={unverified} color="text-yellow-600" />
          </div>

          {/* FILTERS */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3 items-center">
            <input
              type="text"
              placeholder="Search by name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
            />

            {["all", "verified", "unverified", "inactive"].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                  statusFilter === f
                    ? "bg-orange-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}

            {(search || statusFilter !== "all") && (
              <button
                onClick={() => { setSearch(""); setStatusFilter("all"); }}
                className="ml-auto text-sm text-slate-400 hover:text-slate-600 transition"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* TABLE */}
          {filtered.length > 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <Th>Name</Th>
                    <Th>Phone</Th>
                    <Th>City</Th>
                    <Th>Experience</Th>
                    <Th>Rating</Th>
                    <Th>Jobs</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((g) => {
                    const isVerifyPending = verifyMutation.isPending && verifyMutation.variables === g._id;
                    const isTogglePending = toggleMutation.isPending && toggleMutation.variables?.id === g._id;

                    return (
                      <tr key={g._id} className="border-t border-slate-200 hover:bg-slate-50 transition">
                        <Td>
                          <div className="flex items-center gap-3">
                            {g.avatar ? (
                              <img src={g.avatar} alt={g.name} className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                {g.name[0].toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-900">{g.name}</div>
                              <div className="text-xs text-gray-400">{g.pincode}</div>
                            </div>
                          </div>
                        </Td>
                        <Td>{g.phone}</Td>
                        <Td>{g.city}</Td>
                        <Td>{g.experienceYears ?? "—"} yrs</Td>
                        <Td>⭐ {g.rating?.toFixed(1)}</Td>
                        <Td>{g.totalJobs}</Td>
                        <Td>
                          <StatusBadge verified={g.isVerified} active={g.isActive} />
                        </Td>
                        <Td>
                          <div className="flex gap-2 flex-wrap">
                            <Link
                              to={`/admin/groomers/${g._id}`}
                              className="px-3 py-1 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 text-xs font-medium transition"
                            >
                              View
                            </Link>

                            {!g.isVerified && (
                              <button
                                disabled={isVerifyPending}
                                onClick={() => verifyMutation.mutate(g._id)}
                                className="px-3 py-1 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 text-xs font-medium transition disabled:opacity-50"
                              >
                                {isVerifyPending ? "Verifying…" : "Verify"}
                              </button>
                            )}

                            <button
                              disabled={isTogglePending}
                              onClick={() => toggleMutation.mutate({ id: g._id, isActive: g.isActive })}
                              className={`px-3 py-1 rounded-lg text-xs font-medium transition disabled:opacity-50 ${
                                g.isActive
                                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                              }`}
                            >
                              {isTogglePending ? "…" : g.isActive ? "Disable" : "Enable"}
                            </button>
                          </div>
                        </Td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400">
                Showing {filtered.length} of {total} groomers
              </div>
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="bg-white border border-slate-200 rounded-xl py-20 flex flex-col items-center gap-3 text-center">
              <div className="text-4xl">🔍</div>
              <p className="text-gray-700 font-medium">No groomers found</p>
              <p className="text-sm text-gray-400">
                {search ? `No results for "${search}"` : "Try adjusting your filters"}
              </p>
              <button
                onClick={() => { setSearch(""); setStatusFilter("all"); }}
                className="mt-2 text-sm text-orange-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

/* ---------- Helpers ---------- */

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
      {children}
    </th>
  );
}

function Td({ children }) {
  return <td className="px-4 py-3 align-middle">{children}</td>;
}

function StatusBadge({ verified, active }) {
  return (
    <div className="flex flex-col gap-1">
      <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
        {verified ? "Verified" : "Unverified"}
      </span>
      <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${active ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
        {active ? "Active" : "Inactive"}
      </span>
    </div>
  );
}