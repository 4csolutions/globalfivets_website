import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminUsers from "./pages/admin/AdminUsers";
import { AuthProvider } from "./lib/auth";
import { RequireAuth } from "./lib/RequireAuth";
import { Toaster } from "./components/ui/sonner";

function PublicShell({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PublicShell><Home /></PublicShell>} />
        <Route path="/about" element={<PublicShell><About /></PublicShell>} />
        <Route path="/services" element={<PublicShell><Services /></PublicShell>} />
        <Route path="/projects" element={<PublicShell><Projects /></PublicShell>} />
        <Route path="/contact" element={<PublicShell><Contact /></PublicShell>} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route
            path="users"
            element={
              <RequireAuth requireSuperAdmin>
                <AdminUsers />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App bg-white text-slate-900 antialiased">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster richColors position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
