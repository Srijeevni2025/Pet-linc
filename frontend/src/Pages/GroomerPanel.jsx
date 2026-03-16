import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import AdminNavbar from "../Features/Admin/AdminNavbar";

const API_URL_BASE = import.meta.env.VITE_BASE_URL;

// ✅ Connect admin to socket
const socket = io(API_URL_BASE, { withCredentials: true, transports:['websocket', 'polling'] });

export default function GroomerPanel() {
  const [trackingGroomer, setTrackingGroomer] = useState(null);
  const [location, setLocation] = useState(null);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState(null);

  const { data: groomers = [], isLoading } = useQuery({
    queryKey: ["groomers"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL_BASE}/api/v1/groomers`, {
        withCredentials: true,
      });
      return res.data.data || res.data;
    },
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axios.get(
        `${API_URL_BASE}/api/v1/bookings/get-all-bookings-for-dashboard`,
        { withCredentials: true }
      );
      return res.data.data || [];
    },
  });

  // ✅ Listen for location response from groomer
  useEffect(() => {
    socket.on('groomer_location', ({ groomerId, lat, lng }) => {
      console.log('Location received:', groomerId, lat, lng);
      if (trackingGroomer?._id === groomerId) {
        setLocation({ lat, lng, updatedAt: new Date() });
        setLocLoading(false);
        setLocError(null);
      }
    });

    return () => socket.off('groomer_location');
  }, [trackingGroomer]);

  function getActiveBookings(groomerId) {
    return bookings.filter(
      (b) =>
        b.assignedGroomer?.toString() === groomerId?.toString() &&
        b.status !== 'completed' &&
        b.status !== 'cancelled'
    ).length;
  }

  async function requestLocation(groomer) {
    setTrackingGroomer(groomer);
    setLocation(null);
    setLocError(null);
    setLocLoading(true);

    try {
      await axios.post(
        `${API_URL_BASE}/api/v1/groomers/${groomer._id}/request-location`,
        {},
        { withCredentials: true }
      );

      // ✅ Timeout if groomer doesn't respond in 10 seconds
      setTimeout(() => {
        setLocLoading((prev) => {
          if (prev) {
            setLocError('Groomer did not respond. They may be offline.');
          }
          return false;
        });
      }, 10000);
    } catch (err) {
      setLocLoading(false);
      setLocError(err?.response?.data?.message || 'Groomer is offline');
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-8">
      <AdminNavbar />

      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Groomer Panel</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage groomers and fetch live location on demand
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Groomers", value: groomers.length, color: "text-indigo-600" },
          { label: "Active", value: groomers.filter((g) => g.isActive).length, color: "text-emerald-600" },
          { label: "Verified", value: groomers.filter((g) => g.isVerified).length, color: "text-blue-600" },
          {
            label: "Avg Rating",
            value: groomers.length
              ? (groomers.reduce((s, g) => s + (g.rating || 0), 0) / groomers.length).toFixed(1)
              : "—",
            color: "text-amber-600",
          },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-semibold uppercase">{s.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Groomers List */}
        <div className="space-y-4">
          {groomers.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-200">
              No groomers found.
            </div>
          )}
          {groomers.map((groomer) => (
            <div
              key={groomer._id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                    {groomer.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{groomer.name}</p>
                    <p className="text-xs text-slate-500">{groomer.phone}</p>
                    <p className="text-xs text-slate-400">{groomer.city}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    groomer.isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {groomer.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { label: "Active Jobs", value: getActiveBookings(groomer._id) },
                  { label: "Total Jobs", value: groomer.totalJobs || 0 },
                  { label: "Rating", value: `⭐ ${groomer.rating || 5}` },
                  { label: "Earnings", value: `₹${groomer.totalEarnings || 0}` },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-2 text-center">
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="text-xs text-slate-500 space-y-1 mb-4">
                <p>📍 {groomer.city} — {groomer.pincode}</p>
                <p>🏃 Service radius: {groomer.serviceRadiusKm || 5} km</p>
                <p>💰 Commission: {groomer.commissionPercent || 20}%</p>
              </div>

              {/* Track Button */}
              <button
                onClick={() => requestLocation(groomer)}
                disabled={locLoading && trackingGroomer?._id === groomer._id}
                className={`w-full py-2.5 rounded-xl text-white text-sm font-semibold transition ${
                  locLoading && trackingGroomer?._id === groomer._id
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {locLoading && trackingGroomer?._id === groomer._id
                  ? "⏳ Waiting for location..."
                  : "📍 Fetch Live Location"}
              </button>
            </div>
          ))}
        </div>

        {/* Map Panel */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-4">
              {trackingGroomer
                ? `📍 ${trackingGroomer.name}'s Location`
                : "📍 Groomer Location"}
            </h3>

            {!trackingGroomer && (
              <div className="h-72 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
                <span className="text-3xl">🗺️</span>
                <p>Click "Fetch Live Location" on any groomer</p>
              </div>
            )}

            {trackingGroomer && locLoading && (
              <div className="h-72 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
                <span className="text-3xl animate-pulse">📡</span>
                <p>Requesting location from {trackingGroomer.name}...</p>
                <p className="text-xs">Waiting for groomer to respond</p>
              </div>
            )}

            {trackingGroomer && locError && (
              <div className="h-72 bg-red-50 rounded-xl flex flex-col items-center justify-center text-red-500 text-sm gap-2 px-4 text-center">
                <span className="text-3xl">❌</span>
                <p>{locError}</p>
                <button
                  onClick={() => requestLocation(trackingGroomer)}
                  className="mt-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 text-xs"
                >
                  Try Again
                </button>
              </div>
            )}

            {trackingGroomer && location && (
              <>
                <div className="text-xs text-slate-500 mb-3 flex justify-between items-center">
                  <span>
                    🕐 Updated: {new Date(location.updatedAt).toLocaleTimeString()}
                  </span>
                  <button
                    onClick={() => requestLocation(trackingGroomer)}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    🔄 Refresh
                  </button>
                </div>

                <iframe
                  title="groomer-map"
                  width="100%"
                  height="280"
                  className="rounded-xl border"
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`}
                />

                <a
                  href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold text-center transition"
                >
                  🧭 Open in Google Maps
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}