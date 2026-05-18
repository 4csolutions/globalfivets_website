import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, Droplets } from "lucide-react";
import { Button } from "./ui/button";
import { contact } from "../mock";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 backdrop-blur shadow-[0_1px_0_0_rgba(15,42,75,0.08)]"
          : "bg-transparent"
      }`}
    >
      {/* Top utility bar */}
      <div
        className={`hidden md:block border-b transition-colors ${
          solid ? "border-slate-100 text-slate-600" : "border-white/15 text-white/85"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs">
          <span>Sultanate of Oman — Specialists in Water, Wastewater & Telecom Infrastructure</span>
          <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-cyan-500">
            <Phone className="w-3.5 h-3.5" /> {contact.phone}
          </a>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <div className={`transition-all duration-300 ${!solid ? "bg-white p-1.5 rounded-lg shadow-md" : ""}`}>
            <img src="/logo.png" alt="Global Five Logo" className="h-10 md:h-12 w-auto object-contain" />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `link-underline text-sm font-medium transition-colors ${
                  solid
                    ? isActive ? "text-[#0a2540]" : "text-slate-600 hover:text-[#0a2540]"
                    : isActive ? "text-white" : "text-white/85 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-md h-10 px-5">
              Request a Quote
            </Button>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 rounded-md ${solid ? "text-[#0a2540]" : "text-white"}`}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-6 space-y-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `block py-3 px-3 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-[#0a2540] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="block pt-2">
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
              Request a Quote
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
