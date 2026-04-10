// GroomerSchedule.jsx
import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { GetAllGroomers } from "../Features/Groomers/queryFunctions";
import queryClient from "../Store/queryClient";

const API_URL_BASE = import.meta.env.VITE_BASE_URL;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekDates(offset = 0) {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7) + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function GroomerSchedule({ bookings = [] }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [blockModal, setBlockModal] = useState(null); // { groomerId, date }

  const { data: groomers = [] } = useQuery({
    queryKey: ["groomers"],
    queryFn: GetAllGroomers,
  });

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);

  // Build a map: groomerId → Set of blocked date strings (YYYY-MM-DD)
  const blockedDates = useMemo(() => {
    const map = {};
    groomers.forEach(g => {
      map[g._id] = new Set(
        (g.unavailableDates || []).map(d => d.slice(0, 10))
      );
    });
    return map;
  }, [groomers]);

  // Detect conflicts: same groomer, same date, overlapping slot
  const conflictKeys = useMemo(() => {
    const keys = new Set();
    bookings.forEach((a, i) => {
      bookings.forEach((b, j) => {
        if (i >= j) return;
        if (
          a.assignedGroomer &&
          a.assignedGroomer === b.assignedGroomer &&
          a.date?.slice(0, 10) === b.date?.slice(0, 10) &&
          a.timeSlot === b.timeSlot &&
          a.status !== "cancelled" &&
          b.status !== "cancelled"
        ) {
          keys.add(a._id);
          keys.add(b._id);
        }
      });
    });
    return keys;
  }, [bookings]);

  const blockGroomer = useMutation({
    mutationFn: async ({ groomerId, date, unblock }) =>
      axios.patch(
        `${API_URL_BASE}/api/v1/groomers/${groomerId}/availability`,
        { date, unblock },
        { withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["groomers"]);
      setBlockModal(null);
    },
  });

  const statusColor = {
    confirmed: { bg: "#E1F5EE", text: "#085041" },
    pending:   { bg: "#EEEDFE", text: "#534AB7" },
    on_the_way:{ bg: "#FAEEDA", text: "#633806" },
  };

  const avatarColors = [
    { bg: "#EEEDFE", text: "#534AB7" },
    { bg: "#E1F5EE", text: "#085041" },
    { bg: "#FAECE7", text: "#712B13" },
    { bg: "#FBEAF0", text: "#72243E" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-500 uppercase">Groomer schedule</h3>
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <button onClick={() => setWeekOffset(w => w - 1)}
            className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm">←</button>
          <span className="font-medium">
            {weekDates[0].toLocaleDateString("en-IN", { day: "numeric", month: "short" })} –{" "}
            {weekDates[6].toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <button onClick={() => setWeekOffset(w => w + 1)}
            className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm">→</button>
          <button onClick={() => setWeekOffset(0)}
            className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm text-indigo-600">Today</button>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: 720 }}>
          {/* Day headers */}
          <div className="grid border-b border-slate-100" style={{ gridTemplateColumns: "110px repeat(7,1fr)" }}>
            <div className="px-3 py-2 text-xs text-slate-400" />
            {weekDates.map((d, i) => {
              const isToday = d.toDateString() === new Date().toDateString();
              return (
                <div key={i} className={`py-2 text-center text-xs font-medium ${isToday ? "text-indigo-600" : "text-slate-400"}`}>
                  {DAYS[i]} {d.getDate()}
                </div>
              );
            })}
          </div>

          {/* Groomer rows */}
          {groomers.map((g, gi) => (
            <div key={g._id} className="grid border-b border-slate-100" style={{ gridTemplateColumns: "110px repeat(7,1fr)" }}>
              {/* Groomer label */}
              <div className="px-3 py-2 flex items-start gap-2 border-r border-slate-100">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                  style={{ background: avatarColors[gi % 4].bg, color: avatarColors[gi % 4].text }}>
                  {g.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <span className="text-sm text-slate-700 leading-tight mt-0.5">{g.name}</span>
              </div>

              {/* Day cells */}
              {weekDates.map((d, di) => {
                const dateStr = d.toISOString().slice(0, 10);
                const isBlocked = blockedDates[g._id]?.has(dateStr);
                const dayBookings = bookings.filter(b =>
                  b.assignedGroomer === g._id &&
                  b.date?.slice(0, 10) === dateStr &&
                  b.status !== "cancelled"
                );
                const isToday = d.toDateString() === new Date().toDateString();

                return (
                  <div key={di}
                    className={`border-r border-slate-100 p-1 min-h-[72px] ${isToday ? "bg-indigo-50/30" : ""}`}>
                    {isBlocked ? (
                      <div className="h-full flex items-center justify-center">
                        <button onClick={() => blockGroomer.mutate({ groomerId: g._id, date: dateStr, unblock: true })}
                          className="text-xs text-slate-400 bg-slate-100 rounded px-2 py-1 hover:bg-slate-200 transition">
                          Off — unblock
                        </button>
                      </div>
                    ) : (
                      <>
                        {dayBookings.map(b => {
                          const isConflict = conflictKeys.has(b._id);
                          const c = isConflict ? { bg: "#FCEBEB", text: "#A32D2D" } : (statusColor[b.status] || { bg: "#F1EFE8", text: "#5F5E5A" });
                          return (
                            <div key={b._id}
                              className="rounded text-xs px-1.5 py-1 mb-1 leading-tight"
                              style={{ background: c.bg, color: c.text, border: isConflict ? "1px solid #F09595" : "none" }}>
                              {b.timeSlot} · {b.petName}
                              {isConflict && <span className="ml-1 font-semibold">⚠</span>}
                            </div>
                          );
                        })}
                        <button onClick={() => setBlockModal({ groomerId: g._id, date: dateStr })}
                          className="text-xs text-slate-300 hover:text-slate-500 transition mt-0.5 block">
                          + block
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 px-5 py-3 border-t border-slate-100 text-xs text-slate-500">
        {[
          { color: "#E1F5EE", border: "#5DCAA5", label: "Confirmed" },
          { color: "#EEEDFE", border: "#AFA9EC", label: "Pending" },
          { color: "#FCEBEB", border: "#F09595", label: "Conflict" },
          { color: "#F1EFE8", border: "#D3D1C7", label: "Unavailable" },
        ].map(l => (
          <span key={l.label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: l.color, border: `1px solid ${l.border}` }} />
            {l.label}
          </span>
        ))}
      </div>

      {/* Block confirmation modal */}
      {blockModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 w-80">
            <p className="font-semibold text-slate-800 mb-1">Block this day?</p>
            <p className="text-sm text-slate-500 mb-4">
              Mark {groomers.find(g => g._id === blockModal.groomerId)?.name} as unavailable on{" "}
              {new Date(blockModal.date).toDateString()}.
            </p>
            <div className="flex gap-2">
              <button onClick={() => blockGroomer.mutate({ groomerId: blockModal.groomerId, date: blockModal.date, unblock: false })}
                disabled={blockGroomer.isPending}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition disabled:opacity-60">
                {blockGroomer.isPending ? "Saving…" : "Block day"}
              </button>
              <button onClick={() => setBlockModal(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm text-slate-600 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}