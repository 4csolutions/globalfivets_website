import React from "react";
import { Link } from "react-router-dom";
import { Droplets, MapPin, Phone, Mail, Clock, Linkedin, Facebook, Twitter } from "lucide-react";
import { contact, services, companyInfo } from "../mock";

export default function Footer() {
  return (
    <footer className="bg-[#081e39] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-white text-lg">Global Five</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">Trading & Services LLC</div>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            An Omani infrastructure contractor delivering reliable water, wastewater, telecom and mechanical systems across the Sultanate since {companyInfo.founded}.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {[Linkedin, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-md bg-white/5 hover:bg-cyan-500 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
                aria-label="social"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-cyan-300">About Us</Link></li>
            <li><Link to="/services" className="hover:text-cyan-300">Services</Link></li>
            <li><Link to="/projects" className="hover:text-cyan-300">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-300">Contact</Link></li>
            <li><a href="#" className="hover:text-cyan-300">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-3 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.id}>
                <Link to="/services" className="hover:text-cyan-300">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-cyan-300 shrink-0" />
              <span>{contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-cyan-300 shrink-0" />
              <a href={`tel:${contact.phone}`} className="hover:text-cyan-300">{contact.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-cyan-300 shrink-0" />
              <a href={`mailto:${contact.email}`} className="hover:text-cyan-300">{contact.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>{contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Global Five Trading and Services LLC. All rights reserved.</span>
          <span className="flex items-center gap-6">
            <a href="#" className="hover:text-cyan-300">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-300">Terms of Service</a>
            <span>{companyInfo.cr}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
