import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Droplets,
  Recycle,
  RadioTower,
  Settings,
  Zap,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { services } from "../mock";

const iconMap = { Droplets, Recycle, RadioTower, Settings, Zap, PackageCheck };

export default function Services() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-[#0a2540] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1620203853151-496c7228306c?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2540]/85 to-[#0a2540]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Badge className="bg-white/10 text-cyan-300 border-white/10 hover:bg-white/10 rounded-full mb-4">Our Services</Badge>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight">
            Integrated infrastructure services — from design to maintenance.
          </h1>
          <p className="text-white/80 mt-6 max-w-2xl text-lg leading-relaxed">
            Six in-house divisions delivering end-to-end capability across Oman's most critical sectors.
          </p>
        </div>
      </section>

      {/* Anchor list */}
      <section className="sticky top-[72px] z-30 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-3 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 transition-colors whitespace-nowrap"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <div className="bg-white">
        {services.map((s, idx) => {
          const Icon = iconMap[s.icon];
          const reverse = idx % 2 === 1;
          return (
            <section
              key={s.id}
              id={s.id}
              className={`section ${idx % 2 === 1 ? "bg-slate-50" : "bg-white"} scroll-mt-32`}
            >
              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                <div className={`${reverse ? "lg:order-2" : ""}`}>
                  <div className="img-zoom rounded-3xl overflow-hidden shadow-xl">
                    <img src={s.image} alt={s.title} className="w-full h-[480px] object-cover" />
                  </div>
                </div>
                <div className={`${reverse ? "lg:order-1" : ""}`}>
                  <div className="w-14 h-14 rounded-xl bg-cyan-500 flex items-center justify-center text-white">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0a2540] mt-5 leading-tight">
                    {s.title}
                  </h2>
                  <p className="text-slate-600 mt-5 leading-relaxed">{s.description}</p>
                  <ul className="mt-7 space-y-3">
                    {s.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                        <span className="text-[#0a2540] text-[15px]">{c}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button className="mt-8 bg-[#0a2540] hover:bg-[#0e3358] text-white h-12 px-6 rounded-md group">
                      Discuss your project
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#0a2540] to-[#0e3358] p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Need a service not listed? Let's talk.
                </h2>
                <p className="text-white/75 mt-4 leading-relaxed max-w-2xl">
                  Our engineering team handles bespoke scopes regularly — from feasibility studies to authority approvals.
                </p>
              </div>
              <Link to="/contact">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white h-14 px-8 text-base font-semibold rounded-md">
                  Contact Our Team
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
