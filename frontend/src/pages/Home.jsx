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
  Award,
  MapPin,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { services, stats, values, projects, clients, testimonials, companyInfo } from "../mock";

const iconMap = { Droplets, Recycle, RadioTower, Settings, Zap, PackageCheck, Award, MapPin, ShieldCheck, Clock };

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1533077162801-86490c593afb?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400"
            alt="Water infrastructure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            <div className="fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-cyan-200 text-xs font-medium tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
              Trusted Infrastructure Partner — Sultanate of Oman
            </div>
            <h1 className="fade-up-delay-1 font-display text-white text-5xl md:text-6xl lg:text-7xl font-extrabold mt-6 leading-[1.05]">
              Engineering the<br />
              <span className="text-cyan-300">infrastructure</span> that<br />
              moves Oman forward.
            </h1>
            <p className="fade-up-delay-2 text-white/85 text-lg md:text-xl mt-7 max-w-2xl leading-relaxed">
              From municipal water networks and wastewater treatment to nationwide telecom rollouts — Global Five delivers turnkey infrastructure with engineering precision and local expertise.
            </p>
            <div className="fade-up-delay-3 flex flex-wrap items-center gap-4 mt-10">
              <Link to="/services">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white h-12 px-7 text-sm font-semibold rounded-md group">
                  Explore Our Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" className="bg-white/5 border-white/30 text-white hover:bg-white hover:text-[#0a2540] h-12 px-7 text-sm font-semibold rounded-md">
                  View Projects
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="fade-up-delay-3 mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/15 backdrop-blur-md max-w-4xl">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#0a2540]/40 px-6 py-6">
                <div className="text-3xl md:text-4xl font-display font-extrabold text-white">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-cyan-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="bg-slate-50 border-y border-slate-200/60 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 text-center">Trusted by leading operators & authorities in Oman</p>
        </div>
        <div className="relative">
          <div className="flex marquee-track w-max">
            {[...clients, ...clients].map((c, i) => (
              <div key={i} className="flex items-center gap-3 px-10">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="font-display font-semibold text-slate-700 text-lg whitespace-nowrap">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <Badge className="bg-cyan-50 text-cyan-700 border-cyan-100 hover:bg-cyan-50 rounded-full mb-4">Our Key Services</Badge>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0a2540] leading-tight">
                Specialised expertise across<br />Oman's critical infrastructure.
              </h2>
            </div>
            <p className="text-slate-600 max-w-md leading-relaxed">
              Six integrated divisions, one accountable contractor — we plan, supply, install and maintain the systems that keep cities, industry and communications running.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <Link
                  to="/services"
                  key={s.id}
                  className="lift group bg-white border border-slate-200 rounded-2xl overflow-hidden"
                >
                  <div className="img-zoom h-52 relative">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/85 via-[#0a2540]/20 to-transparent" />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-lg bg-white/95 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-cyan-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-[#0a2540]">{s.title}</h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">{s.short}</p>
                    <div className="mt-5 flex items-center gap-2 text-cyan-600 text-sm font-semibold">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <section className="section bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center relative">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1717386255773-1e3037c81788?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400"
                alt="Engineering team"
                className="w-full h-[520px] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 lg:right-8 bg-white border border-slate-200 rounded-2xl shadow-xl p-6 max-w-[260px]">
              <div className="text-4xl font-display font-extrabold text-[#0a2540]">11+</div>
              <div className="text-sm text-slate-500 mt-1">Years delivering infrastructure across the Sultanate</div>
            </div>
          </div>
          <div>
            <Badge className="bg-white text-[#0a2540] border-slate-200 hover:bg-white rounded-full mb-4">About Global Five</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0a2540] leading-tight">
              An Omani contractor built on engineering trust.
            </h2>
            <p className="text-slate-600 mt-6 leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {values.map((v) => {
                const Icon = iconMap[v.icon];
                return (
                  <div key={v.title} className="flex gap-4">
                    <div className="w-11 h-11 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#0a2540]">{v.title}</div>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{v.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 text-cyan-600 font-semibold mt-8 group">
              More about our company
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <Badge className="bg-cyan-50 text-cyan-700 border-cyan-100 hover:bg-cyan-50 rounded-full mb-4">Our Projects</Badge>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0a2540] leading-tight">
                Successful initiatives,<br />delivered across Oman.
              </h2>
            </div>
            <Link to="/projects">
              <Button variant="outline" className="border-[#0a2540]/15 text-[#0a2540] hover:bg-[#0a2540] hover:text-white h-11 px-6 rounded-md">
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((p) => (
              <div key={p.id} className="lift bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="img-zoom h-56">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-cyan-600 font-semibold uppercase tracking-wider">
                    <span>{p.category}</span>
                    <span className="w-1 h-1 rounded-full bg-cyan-600" />
                    <span className="text-slate-400">{p.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#0a2540] mt-2">{p.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{p.summary}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{p.location}</span>
                    <span className="font-medium">{p.client}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-[#0a2540] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-cyan-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-600 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge className="bg-white/10 text-cyan-300 border-white/10 hover:bg-white/10 rounded-full mb-4">What our clients say</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight">Trusted by Oman's leading authorities.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors">
                <Quote className="w-7 h-7 text-cyan-300" />
                <p className="text-white/90 mt-4 leading-relaxed text-[15px]">“{t.quote}”</p>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="font-semibold text-white text-sm">{t.author}</div>
                  <div className="text-cyan-300 text-xs mt-0.5">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#0a2540] to-[#0e3358] p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Have an infrastructure project in mind?
                </h2>
                <p className="text-white/75 mt-5 leading-relaxed">
                  Whether it's a turnkey water network, a wastewater plant upgrade, or a nationwide telecom rollout — our team is ready to scope, price and deliver.
                </p>
                <div className="flex flex-wrap gap-3 mt-7">
                  {["Free site survey", "Detailed BoQ", "Authority approvals", "Turnkey execution"].map((x) => (
                    <span key={x} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/85 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />{x}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:justify-self-end">
                <Link to="/contact">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white h-14 px-8 text-base font-semibold rounded-md group">
                    Request a Quote
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
