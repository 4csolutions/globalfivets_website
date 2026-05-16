import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Building2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { projects } from "../mock";

const categories = ["All", "Water", "Wastewater", "Telecom", "Mechanical", "Electrical"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <>
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-[#0a2540] overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src="https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2540]/85 to-[#0a2540]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Badge className="bg-white/10 text-cyan-300 border-white/10 hover:bg-white/10 rounded-full mb-4">Our Projects</Badge>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight">
            Successful initiatives, delivered across the Sultanate.
          </h1>
          <p className="text-white/80 mt-6 max-w-2xl text-lg leading-relaxed">
            A snapshot of our portfolio in water, wastewater, telecom and industrial infrastructure.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  active === c
                    ? "bg-[#0a2540] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
            <div className="ml-auto text-sm text-slate-500">{filtered.length} projects</div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="lift bg-white border border-slate-200 rounded-2xl overflow-hidden"
              >
                <div className="img-zoom h-56 relative">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 text-[#0a2540] text-[11px] font-bold uppercase tracking-wider">
                      {p.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-[#0a2540] leading-snug">{p.title}</h3>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">{p.summary}</p>
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-cyan-600" /> <span className="text-slate-700 font-medium">{p.client}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-cyan-600" /> {p.location}</div>
                    <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-cyan-600" /> {p.year}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0a2540] leading-tight max-w-3xl mx-auto">
            Your next project deserves a partner that delivers.
          </h2>
          <p className="text-slate-600 mt-5 max-w-xl mx-auto leading-relaxed">
            Get in touch and our engineering team will respond within one business day.
          </p>
          <Link to="/contact">
            <Button className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white h-13 px-8 py-3 text-base font-semibold rounded-md">
              Start a Conversation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
