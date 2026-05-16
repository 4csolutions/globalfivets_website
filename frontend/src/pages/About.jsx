import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, MapPin, ShieldCheck, Clock, CheckCircle2, Target, Eye, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { values, team, certifications, stats, companyInfo } from "../mock";

const iconMap = { Award, MapPin, ShieldCheck, Clock };

export default function About() {
  return (
    <>
      {/* Page header */}
      <section className="relative pt-40 pb-20 bg-[#0a2540] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1547895749-888a559fc2a7?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2540]/85 to-[#0a2540]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Badge className="bg-white/10 text-cyan-300 border-white/10 hover:bg-white/10 rounded-full mb-4">About Us</Badge>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight">
            Engineering reliability for Oman — since {companyInfo.founded}.
          </h1>
          <p className="text-white/80 mt-6 max-w-2xl text-lg leading-relaxed">
            We are an Omani contracting and trading company specialised in delivering integrated infrastructure for the public utilities, telecommunication and industrial sectors.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center text-white">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-[#0a2540] mt-5">Our Mission</h3>
            <p className="text-slate-600 mt-3 leading-relaxed">
              To deliver world-class infrastructure that improves quality of life across the Sultanate — through engineering excellence, ethical partnerships and an unwavering commitment to safety and the environment.
            </p>
          </div>
          <div className="bg-[#0a2540] rounded-3xl p-10 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-extrabold mt-5">Our Vision</h3>
            <p className="text-white/80 mt-3 leading-relaxed">
              To be Oman's most trusted partner for water, wastewater and telecom infrastructure — known for engineering depth, on-time delivery, and a long-term commitment to Omanisation.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Badge className="bg-white text-[#0a2540] border-slate-200 hover:bg-white rounded-full mb-4">Our Story</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0a2540] leading-tight">
              From a small Muscat outfit to a nationwide infrastructure contractor.
            </h2>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
              <p>
                Founded in {companyInfo.founded} by a group of Omani engineers, Global Five Trading and Services began with a single contract for a small distribution-network extension in Al Khuwair. Today, we operate across all 11 governorates of the Sultanate.
              </p>
              <p>
                Our growth has been built on three principles: deliver what we promise, invest in our people, and never compromise on quality. The result — a 96% on-time delivery rate and an LTI-free 2025.
              </p>
              <p>
                We work hand-in-hand with Nama Water Services, Omantel, Ooredoo, OQ, Sohar Port and PDO — a roster of clients that reflects the technical depth and trust we've earned.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-10">
              {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-5 border border-slate-100">
                  <div className="text-3xl font-display font-extrabold text-[#0a2540]">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1714901423336-1884cd3fb50f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400" alt="Site work" className="w-full h-[600px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge className="bg-cyan-50 text-cyan-700 border-cyan-100 hover:bg-cyan-50 rounded-full mb-4">Our Values</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0a2540] leading-tight">What we stand for.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = iconMap[v.icon];
              return (
                <div key={v.title} className="lift bg-white border border-slate-200 rounded-2xl p-7">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#0a2540] mt-5">{v.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge className="bg-white text-[#0a2540] border-slate-200 hover:bg-white rounded-full mb-4">Leadership</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0a2540] leading-tight">Built by engineers, led by engineers.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="lift bg-white border border-slate-200 rounded-2xl p-7">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-display font-bold text-lg">
                  {m.name.split(" ").slice(-2).map(n => n[0]).join("")}
                </div>
                <div className="font-display font-bold text-[#0a2540] mt-5">{m.name}</div>
                <div className="text-cyan-600 text-sm font-semibold mt-1">{m.role}</div>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Badge className="bg-cyan-50 text-cyan-700 border-cyan-100 hover:bg-cyan-50 rounded-full mb-4">Certifications</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0a2540] leading-tight">
              Accredited. Approved.<br />Delivering to the highest standards.
            </h2>
            <p className="text-slate-600 mt-5 leading-relaxed">
              Our certifications and authority approvals are not paperwork — they're a reflection of the engineering discipline we apply on every site, every day.
            </p>
            <Link to="/contact">
              <Button className="mt-7 bg-[#0a2540] hover:bg-[#0e3358] text-white h-12 px-6 rounded-md">
                Request our company profile
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {certifications.map((c) => (
              <div key={c} className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl px-5 py-4">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                <span className="text-[#0a2540] font-medium text-sm">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
