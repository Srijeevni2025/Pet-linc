import { Link, NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetLoggedInUser } from "../Authentication/queryFunction";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const {data:userData} = useQuery({
    queryKey:["userData"],
    queryFn:GetLoggedInUser
  });

  function handleLogout() {
    // later: clear admin token
    navigate("/signin");
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3">
          {/* <span className="text-xl font-extrabold text-orange-600">
            🐾 Petlinc
          </span> */}
          <img src = '/public/images/Navbar/PetlincLogo.png' className='w-24 h-6' onClick={()=>navigate('/')}></img>
          <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">
            Admin Panel
          </span>
        </div>

        {/* CENTER: NAV LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/add-groomer">Add Groomer</NavItem>
          <NavItem to="/groomers-list">Groomers</NavItem>
        </div>

        {/* RIGHT: ADMIN */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600 hidden sm:inline">
            {userData?.user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-md border border-slate-300 text-sm hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ---------- Helper ---------- */

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-1.5 rounded-md transition ${
          isActive
            ? "bg-orange-100 text-orange-700"
            : "text-slate-700 hover:bg-slate-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
