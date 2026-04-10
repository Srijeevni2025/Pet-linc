// AnalyticsTab.jsx
import { useMemo, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Filler } from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Filler);

const INDIGO = "#4F46E5";
const TEAL   = "#0F6E56";
const GRAY   = "#B4B2A9";

export default function AnalyticsTab({ bookings = [] }) {
  const [revView, setRevView] = useState("monthly");

  // ── Derived data ─────────────────────────────────────────────
  const stats = useMemo(() => {
    const completed = bookings.filter(b => b.status === "completed");
    const totalRev  = completed.reduce((s, b) => s + ((b.bookingMarkedPrice || 0) - (b.discount || 0)), 0);
    const aov       = completed.length ? Math.round(totalRev / completed.length) : 0;
    const cancelled = bookings.filter(b => b.status === "cancelled").length;
    const cancelRate = bookings.length ? ((cancelled / bookings.length) * 100).toFixed(1) : 0;

    // repeat customers: userId appears more than once
    const customerBookingCount = {};
    bookings.forEach(b => {
      const uid = b.userId?._id;
      if (uid) customerBookingCount[uid] = (customerBookingCount[uid] || 0) + 1;
    });
    const uniqueCustomers = Object.keys(customerBookingCount).length;
    const repeatCustomers = Object.values(customerBookingCount).filter(n => n > 1).length;
    const repeatRate = uniqueCustomers ? Math.round((repeatCustomers / uniqueCustomers) * 100) : 0;

    return { totalRev, aov, cancelRate, repeatRate, completed: completed.length };
  }, [bookings]);

  // ── Revenue by month / week ──────────────────────────────────
  const { monthLabels, monthlyRev, monthlyBkgs, weekLabels, weeklyRev, weeklyBkgs } = useMemo(() => {
    const byMonth = {};
    const byWeek  = {};

    bookings.filter(b => b.status === "completed").forEach(b => {
      const d   = new Date(b.date);
      const mKey = d.toLocaleString("default", { month: "short", year: "2-digit" });
      const wNum = `W${Math.ceil(d.getDate() / 7)} ${d.toLocaleString("default", { month: "short" })}`;
      const rev  = (b.bookingMarkedPrice || 0) - (b.discount || 0);

      byMonth[mKey] = byMonth[mKey] || { rev: 0, n: 0 };
      byMonth[mKey].rev += rev;
      byMonth[mKey].n   += 1;

      byWeek[wNum] = byWeek[wNum] || { rev: 0, n: 0 };
      byWeek[wNum].rev += rev;
      byWeek[wNum].n   += 1;
    });

    const months = Object.entries(byMonth).slice(-12);
    const weeks  = Object.entries(byWeek).slice(-8);

    return {
      monthLabels: months.map(([k]) => k),
      monthlyRev:  months.map(([, v]) => v.rev),
      monthlyBkgs: months.map(([, v]) => v.n),
      weekLabels:  weeks.map(([k]) => k),
      weeklyRev:   weeks.map(([, v]) => v.rev),
      weeklyBkgs:  weeks.map(([, v]) => v.n),
    };
  }, [bookings]);

  // ── Top services ─────────────────────────────────────────────
  const topServices = useMemo(() => {
    const map = {};
    bookings.filter(b => b.status === "completed").forEach(b => {
      const name = b.productId?.name || "Unknown";
      map[name] = map[name] || { rev: 0, n: 0 };
      map[name].rev += (b.bookingMarkedPrice || 0) - (b.discount || 0);
      map[name].n   += 1;
    });
    return Object.entries(map)
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.rev - a.rev)
      .slice(0, 6);
  }, [bookings]);

  // ── City breakdown ───────────────────────────────────────────
  const cityData = useMemo(() => {
    const map = {};
    bookings.forEach(b => {
      const city = b.city || "Unknown";
      map[city] = (map[city] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, n]) => ({ name, n }))
      .sort((a, b) => b.n - a.n)
      .slice(0, 7);
  }, [bookings]);

  // ── Peak hour heatmap ────────────────────────────────────────
  const heatmap = useMemo(() => {
    const days  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const slots = [ "9–11am", "12–2pm", "3–5pm", "5–7pm"];
    const slotStart = [7, 9, 11, 13, 15, 17];
    const grid = slots.map(() => days.map(() => 0));

    bookings.forEach(b => {
      const d   = new Date(b.date);
      const dow = (d.getDay() + 6) % 7; // Mon=0
      const timeSlot = b.timeSlot || "";
      const hour = parseInt(timeSlot);
      if (isNaN(hour)) return;
      const si = slotStart.findIndex((s, i) => hour >= s && hour < (slotStart[i + 1] || 20));
      if (si >= 0 && si < slots.length) grid[si][dow] += 1;
    });

    return { days, slots, grid };
  }, [bookings]);

  // ── Cohort ───────────────────────────────────────────────────
  const cohort = useMemo(() => {
    const seenBefore = {};
    const byMonth = {};

    const sorted = [...bookings].sort((a, b) => new Date(a.date) - new Date(b.date));
    sorted.forEach(b => {
      const uid  = b.userId?._id;
      if (!uid) return;
      const mKey = new Date(b.date).toLocaleString("default", { month: "short", year: "2-digit" });
      byMonth[mKey] = byMonth[mKey] || { newC: 0, repeat: 0 };

      if (!seenBefore[uid]) {
        byMonth[mKey].newC += 1;
        seenBefore[uid] = true;
      } else {
        byMonth[mKey].repeat += 1;
      }
    });

    return Object.entries(byMonth).slice(-6).map(([month, v]) => ({
      month,
      newC:   v.newC,
      repeat: v.repeat,
      rate:   v.newC + v.repeat > 0
        ? Math.round((v.repeat / (v.newC + v.repeat)) * 100)
        : 0,
    }));
  }, [bookings]);

  // ── Chart options (shared) ───────────────────────────────────
  const revLabels = revView === "monthly" ? monthLabels : weekLabels;
  const revData   = revView === "monthly" ? monthlyRev  : weeklyRev;
  const bkgData   = revView === "monthly" ? monthlyBkgs : weeklyBkgs;

  const heatColors = ["#E6F1FB", "#B5D4F4", "#85B7EB", "#378ADD", "#185FA5", "#0C447C"];
  const heatColor  = v => v <= 2 ? heatColors[0] : v <= 5 ? heatColors[1] : v <= 9 ? heatColors[2] : v <= 13 ? heatColors[3] : v <= 16 ? heatColors[4] : heatColors[5];
  const heatText   = v => v >= 10 ? "#fff" : "#0C447C";

  const maxSvcRev  = topServices[0]?.rev || 1;
  const maxCity    = cityData[0]?.n || 1;

  return (
    <div className="space-y-6">

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total revenue",      value: `₹${stats.totalRev.toLocaleString()}` },
          { label: "Avg order value",    value: `₹${stats.aov.toLocaleString()}`,       sub: `${stats.completed} completed` },
          { label: "Repeat customers",   value: `${stats.repeatRate}%` },
          { label: "Cancellation rate",  value: `${stats.cancelRate}%` },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4 bg-slate-50 border border-slate-100">
            <p className="text-xs font-semibold uppercase text-slate-400">{s.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{s.value}</p>
            {s.sub && <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Revenue trend</h3>
          <div className="flex gap-1">
            {["weekly", "monthly"].map(v => (
              <button key={v} onClick={() => setRevView(v)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border transition
                  ${revView === v ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"}`}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: 240, position: "relative" }}>
          <Bar
            data={{
              labels: revLabels,
              datasets: [
                { label: "Revenue", data: revData, backgroundColor: INDIGO, borderRadius: 4, yAxisID: "y" },
                { label: "Bookings", data: bkgData, type: "line", borderColor: TEAL, backgroundColor: "transparent", pointBackgroundColor: TEAL, tension: 0.4, yAxisID: "y1" },
              ],
            }}
            options={{
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { ticks: { color: "#888", font: { size: 11 } }, grid: { display: false } },
                y: { ticks: { color: "#888", font: { size: 11 }, callback: v => `₹${(v / 1000).toFixed(0)}k` }, grid: { color: "rgba(0,0,0,0.04)" } },
                y1: { position: "right", ticks: { color: TEAL, font: { size: 11 } }, grid: { display: false } },
              },
            }}
          />
        </div>
      </div>

      {/* Services + Cities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-500 uppercase mb-4">Top packages by revenue</h3>
          {topServices.map(s => (
            <div key={s.name} className="flex items-center gap-3 mb-3">
              <span className="text-sm text-slate-700 w-36 truncate">{s.name}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-2">
                <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${Math.round(s.rev / maxSvcRev * 100)}%` }} />
              </div>
              <span className="text-xs text-slate-400 w-16 text-right">₹{(s.rev / 1000).toFixed(1)}k</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-500 uppercase mb-4">City-wise bookings</h3>
          {cityData.map(c => (
            <div key={c.name} className="flex items-center gap-3 mb-3">
              <span className="text-sm text-slate-700 w-28 truncate">{c.name}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-2">
                <div className="h-2 rounded-full bg-teal-600" style={{ width: `${Math.round(c.n / maxCity * 100)}%` }} />
              </div>
              <span className="text-xs text-slate-400 w-16 text-right">{c.n} bookings</span>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-slate-500 uppercase mb-4">Peak hour heatmap</h3>
        <div style={{ display: "grid", gridTemplateColumns: "64px repeat(7, 1fr)", gap: 4 }}>
          <div />
          {heatmap.days.map(d => (
            <div key={d} className="text-center text-xs text-slate-400 pb-1">{d}</div>
          ))}
          {heatmap.slots.map((slot, si) => (
            <>
              <div key={slot} className="text-xs text-slate-400 flex items-center">{slot}</div>
              {heatmap.days.map((_, di) => {
                const v = heatmap.grid[si][di];
                return (
                  <div key={di} style={{ background: heatColor(v), color: heatText(v), borderRadius: 4, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500 }}>
                    {v}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      {/* Cohort */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-slate-500 uppercase mb-4">Customer cohort</h3>
        <div style={{ height: 180, position: "relative", marginBottom: "1.25rem" }}>
          <Bar
            data={{
              labels: cohort.map(c => c.month),
              datasets: [
                { label: "New", data: cohort.map(c => c.newC), backgroundColor: GRAY, borderRadius: 4, stack: "c" },
                { label: "Repeat", data: cohort.map(c => c.repeat), backgroundColor: INDIGO, borderRadius: 4, stack: "c" },
              ],
            }}
            options={{
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { stacked: true, ticks: { color: "#888", font: { size: 11 } }, grid: { display: false } },
                y: { stacked: true, ticks: { color: "#888", font: { size: 11 } }, grid: { color: "rgba(0,0,0,0.04)" } },
              },
            }}
          />
        </div>
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-400">
            <tr>
              {["Month", "New", "Repeat", "Repeat rate"].map(h => (
                <th key={h} className="px-3 py-2 text-left text-xs font-semibold uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cohort.map(c => {
              const rateColor = c.rate >= 50 ? "bg-emerald-100 text-emerald-700" : c.rate >= 35 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600";
              return (
                <tr key={c.month}>
                  <td className="px-3 py-2 font-medium text-slate-700">{c.month}</td>
                  <td className="px-3 py-2 text-slate-500">{c.newC}</td>
                  <td className="px-3 py-2 text-slate-500">{c.repeat}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${rateColor}`}>{c.rate}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}