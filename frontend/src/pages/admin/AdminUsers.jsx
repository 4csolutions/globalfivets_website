import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Shield, ShieldCheck, UserX } from "lucide-react";
import api from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
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

const EMPTY = { name: "", email: "", role: "editor", password: "", is_active: true };

export default function AdminUsers() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const r = await api.get("/users");
      setUsers(r.data || []);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = () => {
    setEditing({ ...EMPTY });
    setOpen(true);
  };

  const onEdit = (u) => {
    setEditing({ ...u, password: "" });
    setOpen(true);
  };

  const onDelete = async () => {
    if (!confirmDel) return;
    try {
      await api.delete(`/users/${confirmDel.id}`);
      toast.success("User deleted");
      setConfirmDel(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Delete failed");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-[#0a2540]">Team Members</h1>
          <p className="text-slate-600 mt-1">Create and manage admin console users.</p>
        </div>
        <Button onClick={onCreate} className="bg-cyan-500 hover:bg-cyan-600 text-white">
          <Plus className="w-4 h-4 mr-2" /> New User
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Name</th>
              <th className="text-left px-5 py-3 font-semibold">Email</th>
              <th className="text-left px-5 py-3 font-semibold">Role</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-500"><Loader2 className="w-5 h-5 animate-spin inline" /></td></tr>
            )}
            {!loading && users.map((u) => (
              <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-white flex items-center justify-center font-semibold text-sm">
                      {u.name?.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="font-medium text-[#0a2540]">{u.name}{u.id === me?.id && <span className="ml-2 text-[10px] uppercase tracking-wider text-cyan-600">You</span>}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-700">{u.email}</td>
                <td className="px-5 py-3">
                  {u.role === "super_admin" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Super Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      <Shield className="w-3.5 h-3.5" /> Editor
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  {u.is_active ? (
                    <span className="text-emerald-700 text-xs font-semibold">Active</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-slate-500 text-xs font-semibold"><UserX className="w-3.5 h-3.5" /> Inactive</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button size="sm" variant="ghost" onClick={() => onEdit(u)}><Pencil className="w-4 h-4" /></Button>
                    {u.id !== me?.id && (
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setConfirmDel(u)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserFormDialog open={open} onOpenChange={setOpen} initial={editing} me={me} onSaved={() => { setOpen(false); load(); }} />

      <AlertDialog open={!!confirmDel} onOpenChange={(o) => !o && setConfirmDel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              “{confirmDel?.name}” ({confirmDel?.email}) will lose access to the admin console.
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

function UserFormDialog({ open, onOpenChange, initial, me, onSaved }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const isEdit = !!initial?.id;

  useEffect(() => {
    if (open) setForm(initial || EMPTY);
  }, [open, initial]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!isEdit && (!form.email || !form.password || !form.name)) {
      toast.error("Name, email and password are required");
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        const payload = {
          name: form.name,
          role: form.role,
          is_active: form.is_active,
        };
        if (form.password) payload.password = form.password;
        await api.patch(`/users/${initial.id}`, payload);
        toast.success("User updated");
      } else {
        await api.post("/users", {
          name: form.name,
          email: form.email,
          role: form.role,
          password: form.password,
        });
        toast.success("User created");
      }
      onSaved?.();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const isSelf = initial?.id === me?.id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-[#0a2540]">{isEdit ? "Edit user" : "New user"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Full name *</Label>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} disabled={isEdit} />
            {isEdit && <p className="text-xs text-slate-500">Email cannot be changed.</p>}
          </div>
          <div className="space-y-2">
            <Label>Role *</Label>
            <Select value={form.role} onValueChange={(v) => set("role", v)} disabled={isSelf}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="super_admin">Super Admin — full access</SelectItem>
                <SelectItem value="editor">Editor — projects only</SelectItem>
              </SelectContent>
            </Select>
            {isSelf && <p className="text-xs text-slate-500">You cannot change your own role.</p>}
          </div>
          <div className="space-y-2">
            <Label>{isEdit ? "Reset password (optional)" : "Password *"}</Label>
            <Input type="password" value={form.password || ""} onChange={(e) => set("password", e.target.value)} placeholder={isEdit ? "Leave blank to keep unchanged" : "Min 8 characters"} />
          </div>
          {isEdit && (
            <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
              <div>
                <div className="font-semibold text-[#0a2540] text-sm">Active</div>
                <div className="text-xs text-slate-500">Inactive users cannot log in.</div>
              </div>
              <Switch checked={!!form.is_active} onCheckedChange={(v) => set("is_active", v)} disabled={isSelf} />
            </div>
          )}
        </div>

        <DialogFooter className="pt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={save} disabled={saving} className="bg-cyan-500 hover:bg-cyan-600 text-white">
            {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {isEdit ? "Save changes" : "Create user"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
