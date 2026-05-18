import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderKanban, Users, Activity, ArrowRight, Plus } from "lucide-react";
import api from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { Button } from "../../components/ui/button";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const p = await api.get("/projects/all");
        setProjects(p.data || []);
        if (user?.role === "super_admin") {
          const u = await api.get("/users");
          setUsers(u.data || []);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const published = projects.filter((p) => p.is_published).length;
  const unpublished = projects.length - published;
  const byCat = projects.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {});

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-[#0a2540]">Welcome back, {user?.name?.split(" ")[0]}</h1>
          <p className="text-slate-600 mt-1">Here's what's happening with your site today.</p>
        </div>
        <Link to="/admin/projects">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <StatCard icon={FolderKanban} label="Total Projects" value={projects.length} loading={loading} />
        <StatCard icon={Activity} label="Published" value={published} loading={loading} sub={`${unpublished} drafts`} />
        {user?.role === "super_admin" && (
          <StatCard icon={Users} label="Team Members" value={users.length} loading={loading} />
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-display font-bold text-[#0a2540] mb-4">Projects by category</h3>
          {Object.keys(byCat).length === 0 && <p className="text-sm text-slate-500">No projects yet.</p>}
          <div className="space-y-3">
            {Object.entries(byCat).map(([cat, count]) => {
              const pct = Math.round((count / Math.max(projects.length, 1)) * 100);
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 font-medium">{cat}</span>
                    <span className="text-slate-500">{count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-[#0a2540]">Recent projects</h3>
            <Link to="/admin/projects" className="text-cyan-600 text-sm font-semibold inline-flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {projects.slice(0, 5).map((p) => (
            <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
              <div className="min-w-0">
                <div className="font-medium text-[#0a2540] text-sm truncate">{p.title}</div>
                <div className="text-xs text-slate-500">{p.category} · {p.client || "—"}</div>
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full ${
                p.is_published ? "bg-cyan-50 text-cyan-700" : "bg-slate-100 text-slate-600"
              }`}>
                {p.is_published ? "Live" : "Draft"}
              </span>
            </div>
          ))}
          {projects.length === 0 && <p className="text-sm text-slate-500">No projects yet.</p>}
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, loading }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-cyan-600" />
        </div>
      </div>
      <div className="text-3xl font-display font-extrabold text-[#0a2540] mt-5">{loading ? "—" : value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}{sub && <span className="text-xs ml-2">({sub})</span>}</div>
    </div>
  );
}
