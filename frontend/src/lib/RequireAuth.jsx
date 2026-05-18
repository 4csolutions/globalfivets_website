import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import { Loader2 } from "lucide-react";

export function RequireAuth({ children, requireSuperAdmin = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-6 h-6 animate-spin text-cyan-600" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  if (requireSuperAdmin && user.role !== "super_admin") {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
