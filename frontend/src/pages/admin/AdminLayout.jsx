import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Droplets, LayoutDashboard, FolderKanban, Users, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "../../lib/auth";
import { Button } from "../../components/ui/button";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const baseLinks = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  ];
  if (user?.role === "super_admin") {
    baseLinks.push({ to: "/admin/users", label: "Users", icon: Users });
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-[#0a2540] text-white flex flex-col fixed inset-y-0 left-0">
        <Link to="/admin" className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-cyan-300" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-extrabold">Global Five</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">Admin Console</div>
          </div>
        </Link>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {baseLinks.map((l) => {
            const Icon = l.icon;
            return (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-cyan-500 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {l.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <Link to="/" target="_blank" className="flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:text-white">
            <ExternalLink className="w-3.5 h-3.5" /> View public site
          </Link>
          <div className="px-3 py-2 mt-2">
            <div className="text-xs text-white/50">Signed in as</div>
            <div className="text-sm font-semibold text-white">{user?.name}</div>
            <div className="text-[10px] uppercase tracking-wider text-cyan-300 mt-0.5">{user?.role?.replace("_", " ")}</div>
          </div>
          <Button onClick={onLogout} variant="ghost" className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white">
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </div>
      </aside>

      <main className="flex-1 ml-64">
        <Outlet />
      </main>
    </div>
  );
}
