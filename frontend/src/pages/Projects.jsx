import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Building2, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent } from "../components/ui/dialog";
import api, { resolveImage } from "../lib/api";

const categories = ["All", "Water", "Wastewater", "Telecom", "Mechanical", "Electrical"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = active === "All" ? {} : { category: active };
    api
      .get("/projects", { params })
      .then((r) => setItems(r.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [active]);

  const counts = useMemo(() => items.length, [items]);

  return (
    <>
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
            <div className="ml-auto text-sm text-slate-500">{loading ? "Loading…" : `${counts} projects`}</div>
          </div>

          {loading ? (
            <div className="py-20 flex items-center justify-center text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center text-slate-500">No projects in this category yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="lift bg-white border border-slate-200 rounded-2xl overflow-hidden text-left group"
                >
                  <div className="img-zoom h-56 relative bg-slate-100">
                    {p.image_url && (
                      <img src={resolveImage(p.image_url)} alt={p.title} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 text-[#0a2540] text-[11px] font-bold uppercase tracking-wider">
                        {p.category}
                      </span>
                    </div>
                    {(p.gallery?.length || 0) > 0 && (
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur text-white text-[11px] font-medium">
                        +{p.gallery.length} photos
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-[#0a2540] leading-snug group-hover:text-cyan-600 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed line-clamp-3">{p.summary}</p>
                    <div className="mt-5 pt-5 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                      {p.client && <div className="flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-cyan-600" /> <span className="text-slate-700 font-medium">{p.client}</span></div>}
                      {p.location && <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-cyan-600" /> {p.location}</div>}
                      {p.year && <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-cyan-600" /> {p.year}</div>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

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

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function ProjectDialog({ project, onClose }) {
  const [active, setActive] = useState(0);
  useEffect(() => setActive(0), [project?.id]);

  if (!project) return null;
  const images = [project.image_url, ...(project.gallery || [])].filter(Boolean);
  const current = images[active] || project.image_url;
  const next = () => setActive((i) => (i + 1) % Math.max(images.length, 1));
  const prev = () => setActive((i) => (i - 1 + images.length) % Math.max(images.length, 1));

  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose?.()}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden">
        <div className="relative bg-slate-900 aspect-[16/9]">
          {current && (
            <img src={resolveImage(current)} alt={project.title} className="w-full h-full object-cover" />
          )}
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs">
                {active + 1} / {images.length}
              </div>
            </>
          )}
          <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-7 max-h-[60vh] overflow-y-auto">
          <span className="inline-flex px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-bold uppercase tracking-wider">{project.category}</span>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#0a2540] mt-3 leading-tight">{project.title}</h3>
          <div className="grid sm:grid-cols-3 gap-3 mt-5 text-sm">
            {project.client && <InfoItem icon={Building2} label="Client" value={project.client} />}
            {project.location && <InfoItem icon={MapPin} label="Location" value={project.location} />}
            {project.year && <InfoItem icon={Calendar} label="Year" value={project.year} />}
          </div>
          {project.description && (
            <p className="text-slate-600 mt-6 leading-relaxed whitespace-pre-line">{project.description}</p>
          )}
          {images.length > 1 && (
            <div className="mt-6 grid grid-cols-5 sm:grid-cols-8 gap-2">
              {images.map((u, i) => (
                <button
                  key={u + i}
                  onClick={() => setActive(i)}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${i === active ? "border-cyan-500" : "border-transparent"}`}
                >
                  <img src={resolveImage(u)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-100">
      <div className="text-[10px] uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Icon className="w-3.5 h-3.5" /> {label}</div>
      <div className="text-[#0a2540] font-semibold mt-0.5">{value}</div>
    </div>
  );
}
