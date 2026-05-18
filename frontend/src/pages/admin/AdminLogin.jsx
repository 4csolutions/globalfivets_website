import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Droplets, Lock, Mail, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuth } from "../../lib/auth";
import { toast } from "sonner";

export default function AdminLogin() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) navigate("/admin", { replace: true });
  }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back");
      const to = location.state?.from?.pathname || "/admin";
      navigate(to, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex w-1/2 bg-[#0a2540] relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1533077162801-86490c593afb?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540] via-[#0a2540]/85 to-transparent" />
        <div className="relative flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="font-display font-extrabold text-lg leading-tight">Global Five</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">Admin Console</div>
            </div>
          </Link>
          <div>
            <h1 className="font-display text-4xl font-extrabold leading-tight">
              Manage projects, users and content for globalfivets.com
            </h1>
            <p className="text-white/75 mt-4 max-w-md leading-relaxed">
              Sign in to access the admin console and keep the public website up to date.
            </p>
          </div>
          <p className="text-xs text-white/50">© {new Date().getFullYear()} Global Five Trading & Services LLC</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#0a2540] flex items-center justify-center">
              <Droplets className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="font-display font-extrabold text-[#0a2540]">Global Five Admin</div>
          </Link>
          <h2 className="font-display text-3xl font-extrabold text-[#0a2540]">Sign in</h2>
          <p className="text-slate-600 mt-2">Use your admin credentials to continue.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-[#0a2540]">Email</Label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9 h-11" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold text-[#0a2540]">Password</Label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9 h-11" required />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-[#0a2540] hover:bg-[#0e3358] text-white h-11">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
            </Button>
          </form>


        </div>
      </div>
    </div>
  );
}
