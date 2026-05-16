import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import { contact, services } from "../mock";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please complete name, email and message.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem("gf_inquiries") || "[]");
        stored.push({ ...form, at: new Date().toISOString() });
        localStorage.setItem("gf_inquiries", JSON.stringify(stored));
      } catch (e) {
        // ignore
      }
      setSending(false);
      setSent(true);
      toast.success("Inquiry received — our team will reach out within one business day.");
      setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    }, 900);
  };

  const blocks = [
    { icon: MapPin, title: "Head Office", lines: [contact.address, contact.poBox] },
    { icon: Phone, title: "Call Us", lines: [contact.phone, contact.mobile] },
    { icon: Mail, title: "Email Us", lines: [contact.email, contact.sales] },
    { icon: Clock, title: "Working Hours", lines: [contact.hours, "Fri & Sat: Closed"] },
  ];

  return (
    <>
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-[#0a2540] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1557174360-3f4f7c724501?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2540]/85 to-[#0a2540]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Badge className="bg-white/10 text-cyan-300 border-white/10 hover:bg-white/10 rounded-full mb-4">Contact Us</Badge>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight">
            Let's build something reliable, together.
          </h1>
          <p className="text-white/80 mt-6 max-w-2xl text-lg leading-relaxed">
            Tell us about your project — our team responds to every inquiry within one business day.
          </p>
        </div>
      </section>

      {/* Contact info grid */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {blocks.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="lift bg-white border border-slate-200 rounded-2xl p-6">
                <div className="w-11 h-11 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="font-display font-bold text-[#0a2540] mt-4">{b.title}</h3>
                {b.lines.map((l, i) => (
                  <p key={i} className="text-sm text-slate-600 mt-1 leading-relaxed">{l}</p>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Form + Map */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-100">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0a2540] leading-tight">
              Send us an inquiry
            </h2>
            <p className="text-slate-600 mt-3">Fields marked with * are required.</p>

            <form onSubmit={submit} className="mt-8 grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#0a2540] font-semibold">Full Name *</Label>
                <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ahmed Al Said" className="bg-white h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#0a2540] font-semibold">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" className="bg-white h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#0a2540] font-semibold">Phone</Label>
                <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+968 ..." className="bg-white h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-[#0a2540] font-semibold">Company</Label>
                <Input id="company" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Your organisation" className="bg-white h-11" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-[#0a2540] font-semibold">Service of Interest</Label>
                <Select value={form.service} onValueChange={(v) => update("service", v)}>
                  <SelectTrigger className="bg-white h-11">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
                    ))}
                    <SelectItem value="Other">Other / General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message" className="text-[#0a2540] font-semibold">Project Details *</Label>
                <Textarea id="message" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about scope, location and timelines..." className="bg-white min-h-[140px]" />
              </div>
              <div className="sm:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-xs text-slate-500 max-w-md">By submitting, you agree to be contacted by our team regarding your inquiry. We respect your privacy.</p>
                <Button type="submit" disabled={sending} className="bg-cyan-500 hover:bg-cyan-600 text-white h-12 px-7 rounded-md font-semibold">
                  {sending ? "Sending..." : sent ? (<><CheckCircle2 className="w-4 h-4 mr-2" /> Sent</>) : (<><Send className="w-4 h-4 mr-2" /> Send Inquiry</>)}
                </Button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-slate-200 h-80">
              <iframe
                title="Global Five Office Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=58.40%2C23.55%2C58.50%2C23.62&amp;layer=mapnik&amp;marker=23.585%2C58.44"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
            <div className="bg-[#0a2540] text-white rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-cyan-500/30 blur-3xl" />
              <div className="relative">
                <div className="w-11 h-11 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-cyan-300" />
                </div>
                <h3 className="font-display font-bold text-xl mt-4">Business Information</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>Commercial Registration: 1247389</li>
                  <li>VAT No.: OM1100231425</li>
                  <li>Established: 2014</li>
                  <li>Location: Muscat, Sultanate of Oman</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
