import { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./../Admin/AdminNavbar";
import { useQuery } from "@tanstack/react-query";



import { GetAllGroomers } from "./queryFunctions";

import  Loader from "./../../Components/Loader"

export default function GroomersList() {
  const [search, setSearch] = useState("");

  const {data:groomers, isPending} = useQuery({
    queryKey:["groomers"],
    queryFn:GetAllGroomers
  })
  if(isPending){
    return <Loader/>
  }
  const filtered = groomers.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Grooming Partners
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage and verify grooming partners
              </p>
            </div>

            <Link
              to="/admin/add-groomer"
              className="px-5 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition"
            >
              + Add Groomer
            </Link>
          </div>

          {/* FILTERS */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* TABLE */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <Th>Name</Th>
                  <Th>Phone</Th>
                  <Th>City</Th>
                  <Th>Experience</Th>
                  <Th>Rating</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((g) => (
                  <tr
                    key={g._id}
                    className="border-t border-slate-200 hover:bg-slate-50"
                  >
                    <Td>
                      <div className="font-medium text-gray-900">
                        {g.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {g.pincode}
                      </div>
                    </Td>

                    <Td>{g.phone}</Td>
                    <Td>{g.city}</Td>
                    <Td>{g.experienceYears} yrs</Td>
                    <Td>⭐ {g.rating}</Td>

                    <Td>
                      <StatusBadge
                        verified={g.isVerified}
                        active={g.isActive}
                      />
                    </Td>

                    <Td>
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/groomers/${g._id}`}
                          className="text-orange-600 hover:underline text-sm"
                        >
                          View
                        </Link>
                        <button className="text-green-600 text-sm">
                          Verify
                        </button>
                        <button className="text-red-600 text-sm">
                          Disable
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}
          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-16">
              No groomers found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ---------- Helpers ---------- */

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
      {children}
    </th>
  );
}

function Td({ children }) {
  return <td className="px-4 py-3">{children}</td>;
}

function StatusBadge({ verified, active }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className={`text-xs px-2 py-0.5 rounded-full w-fit ${
          verified
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {verified ? "Verified" : "Unverified"}
      </span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full w-fit ${
          active
            ? "bg-blue-100 text-blue-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {active ? "Active" : "Inactive"}
      </span>
    </div>
  );
}
