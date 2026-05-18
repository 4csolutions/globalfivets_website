import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, Eye, EyeOff, Loader2, X, Upload, ImageIcon } from "lucide-react";
import api, { resolveImage } from "../../lib/api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { toast } from "sonner";

const CATEGORIES = ["Water", "Wastewater", "Telecom", "Mechanical", "Electrical"];
const EMPTY = {
  title: "",
  category: "Water",
  client: "",
  location: "",
  year: new Date().getFullYear(),
  summary: "",
  description: "",
  image_url: "",
  gallery: [],
  is_published: true,
  order: 0,
};

export default function AdminProjects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const r = await api.get("/projects/all");
      setItems(r.data || []);
    } catch (e) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = items.filter((p) => {
    const matchQ = !q || (p.title + p.client + p.location).toLowerCase().includes(q.toLowerCase());
    const matchCat = cat === "All" || p.category === cat;
    return matchQ && matchCat;
  });

  const onCreate = () => {
    setEditing({ ...EMPTY });
    setOpen(true);
  };

  const onEdit = (p) => {
    setEditing({ ...p, year: p.year || new Date().getFullYear(), gallery: p.gallery || [] });
    setOpen(true);
  };

  const onDelete = async () => {
    if (!confirmDel) return;
    try {
      await api.delete(`/projects/${confirmDel.id}`);
      toast.success("Project deleted");
      setConfirmDel(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-[#0a2540]">Projects</h1>
          <p className="text-slate-600 mt-1">Manage all public projects shown on the website.</p>
        </div>
        <Button onClick={onCreate} className="bg-cyan-500 hover:bg-cyan-600 text-white">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, client, location" className="pl-9 h-10 bg-white" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="w-44 h-10 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["All", ...CATEGORIES].map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="ml-auto text-sm text-slate-500">{filtered.length} of {items.length}</div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Project</th>
                <th className="text-left px-5 py-3 font-semibold">Category</th>
                <th className="text-left px-5 py-3 font-semibold">Client</th>
                <th className="text-left px-5 py-3 font-semibold">Year</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
                <th className="text-right px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-500"><Loader2 className="w-5 h-5 animate-spin inline" /></td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">No projects found.</td></tr>
              )}
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <img src={resolveImage(p.image_url)} alt="" className="w-10 h-10 rounded-md object-cover bg-slate-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-[#0a2540] line-clamp-1">{p.title}</div>
                        <div className="text-xs text-slate-500 line-clamp-1">{p.location || "—"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold">{p.category}</span>
                  </td>
                  <td className="px-5 py-3 text-slate-700">{p.client || "—"}</td>
                  <td className="px-5 py-3 text-slate-700">{p.year || "—"}</td>
                  <td className="px-5 py-3">
                    {p.is_published ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold"><Eye className="w-3.5 h-3.5" />Live</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-500 text-xs font-semibold"><EyeOff className="w-3.5 h-3.5" />Draft</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" variant="ghost" onClick={() => onEdit(p)}><Pencil className="w-4 h-4" /></Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setConfirmDel(p)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProjectFormDialog
        open={open}
        onOpenChange={setOpen}
        initial={editing}
        onSaved={() => {
          setOpen(false);
          load();
        }}
      />

      <AlertDialog open={!!confirmDel} onOpenChange={(o) => !o && setConfirmDel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes “{confirmDel?.title}”. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ProjectFormDialog({ open, onOpenChange, initial, onSaved }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  useEffect(() => {
    if (open) setForm(initial || EMPTY);
  }, [open, initial]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const isEdit = !!initial?.id;

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const { data } = await api.post("/uploads/image", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.url;
  };

  const handleMainUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingMain(true);
    try {
      const url = await uploadFile(file);
      set("image_url", url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Upload failed");
    } finally {
      setUploadingMain(false);
      e.target.value = "";
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingGallery(true);
    try {
      const urls = [];
      for (const f of files) {
        const u = await uploadFile(f);
        urls.push(u);
      }
      set("gallery", [...(form.gallery || []), ...urls]);
      toast.success(`${urls.length} image(s) added to gallery`);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Upload failed");
    } finally {
      setUploadingGallery(false);
      e.target.value = "";
    }
  };

  const removeGalleryItem = (url) => set("gallery", (form.gallery || []).filter((u) => u !== url));

  const save = async () => {
    if (!form.title || !form.category) {
      toast.error("Title and category are required");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, year: Number(form.year) || null };
      if (isEdit) {
        await api.patch(`/projects/${initial.id}`, payload);
        toast.success("Project updated");
      } else {
        await api.post("/projects", payload);
        toast.success("Project created");
      }
      onSaved?.();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-[#0a2540]">{isEdit ? "Edit project" : "New project"}</DialogTitle>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="sm:col-span-2 space-y-2">
            <Label>Title *</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="FOC Network Installation — 100 KM ..." />
          </div>
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select value={form.category} onValueChange={(v) => set("category", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Year</Label>
            <Input type="number" value={form.year || ""} onChange={(e) => set("year", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Client</Label>
            <Input value={form.client || ""} onChange={(e) => set("client", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input value={form.location || ""} onChange={(e) => set("location", e.target.value)} />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label>Summary (1–2 lines)</Label>
            <Textarea value={form.summary || ""} onChange={(e) => set("summary", e.target.value)} rows={2} />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label>Full description</Label>
            <Textarea value={form.description || ""} onChange={(e) => set("description", e.target.value)} rows={4} />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <Label>Main image</Label>
            <div className="flex items-start gap-4">
              <div className="w-32 h-32 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400 shrink-0">
                {form.image_url ? (
                  <img src={resolveImage(form.image_url)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input value={form.image_url || ""} onChange={(e) => set("image_url", e.target.value)} placeholder="Paste an image URL or upload…" />
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-sm font-medium cursor-pointer">
                    {uploadingMain ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    Upload image
                    <input type="file" accept="image/*" className="hidden" onChange={handleMainUpload} />
                  </label>
                  {form.image_url && (
                    <Button variant="ghost" size="sm" onClick={() => set("image_url", "")} className="text-slate-500">
                      Clear
                    </Button>
                  )}
                </div>
                <p className="text-xs text-slate-500">JPG, PNG, WEBP — max 5MB</p>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label>Gallery ({(form.gallery || []).length})</Label>
              <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-medium cursor-pointer">
                {uploadingGallery ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                Add images
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
              </label>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {(form.gallery || []).map((url) => (
                <div key={url} className="relative group aspect-square rounded-md overflow-hidden bg-slate-100">
                  <img src={resolveImage(url)} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(url)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {(form.gallery || []).length === 0 && (
                <div className="col-span-full text-xs text-slate-500 py-3">No gallery images yet.</div>
              )}
            </div>
          </div>

          <div className="sm:col-span-2 flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
            <div>
              <div className="font-semibold text-[#0a2540] text-sm">Publish on website</div>
              <div className="text-xs text-slate-500">When off, the project is hidden from the public site.</div>
            </div>
            <Switch checked={!!form.is_published} onCheckedChange={(v) => set("is_published", v)} />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={save} disabled={saving} className="bg-cyan-500 hover:bg-cyan-600 text-white">
            {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {isEdit ? "Save changes" : "Create project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
