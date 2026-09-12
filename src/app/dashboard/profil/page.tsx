"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Save, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const counties = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani",
  "Brașov", "Brăila", "București", "Buzău", "Caraș-Severin", "Călărași",
  "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu",
  "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș",
  "Mehedinți", "Mureș", "Neamț", "Olt", "Prahova", "Sălaj", "Satu Mare",
  "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vâlcea", "Vaslui", "Vrancea",
];

export default function ProfilPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orgId, setOrgId] = useState("");

  const [form, setForm] = useState({
    legal_name: "",
    cui: "",
    registration_number: "",
    legal_form: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    county: "",
    city: "",
    address: "",
    service_type: "",
    license_number: "",
    license_expiry: "",
    accreditation_number: "",
    capacity: "",
    description: "",
    website: "",
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("organizations")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setOrgId(data.id);
        setForm({
          legal_name: data.legal_name || "",
          cui: data.cui || "",
          registration_number: data.registration_number || "",
          legal_form: data.legal_form || "",
          contact_name: data.contact_name || "",
          contact_email: data.contact_email || "",
          contact_phone: data.contact_phone || "",
          county: data.county || "",
          city: data.city || "",
          address: data.address || "",
          service_type: data.service_type || "",
          license_number: data.license_number || "",
          license_expiry: data.license_expiry || "",
          accreditation_number: data.accreditation_number || "",
          capacity: data.capacity?.toString() || "",
          description: data.description || "",
          website: data.website || "",
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("organizations")
      .update({
        ...form,
        capacity: form.capacity ? parseInt(form.capacity) : null,
        license_expiry: form.license_expiry || null,
      })
      .eq("id", orgId);

    if (error) {
      toast.error("Eroare la salvare");
    } else {
      toast.success("Profil actualizat");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 border-2 border-navy-deep/20 border-t-navy-deep rounded-full animate-spin" />
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors";

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-lg bg-navy-deep/5 flex items-center justify-center">
          <Building2 className="size-5 text-navy-deep" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-deep">
            Profil organizație
          </h1>
          <p className="text-sm text-navy-deep/50">
            Actualizează datele organizației tale
          </p>
        </div>
      </div>

      <motion.form
        onSubmit={handleSave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-navy-deep/10 shadow-sm p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-navy-deep mb-1.5">Denumire legală</label>
          <input required value={form.legal_name} onChange={(e) => setForm({ ...form, legal_name: e.target.value })} className={inputClass} />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">CUI</label>
            <input value={form.cui} onChange={(e) => setForm({ ...form, cui: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Nr. înregistrare</label>
            <input value={form.registration_number} onChange={(e) => setForm({ ...form, registration_number: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Formă juridică</label>
            <input value={form.legal_form} onChange={(e) => setForm({ ...form, legal_form: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Persoană de contact</label>
            <input value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Email contact</label>
            <input type="email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Telefon</label>
            <input value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Website</label>
            <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputClass} placeholder="www.organizatie.ro" />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Județ</label>
            <select value={form.county} onChange={(e) => setForm({ ...form, county: e.target.value })} className={inputClass}>
              <option value="">Selectează</option>
              {counties.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Oraș</label>
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Adresă</label>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Nr. licență</label>
            <input value={form.license_number} onChange={(e) => setForm({ ...form, license_number: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Expiră la</label>
            <input type="date" value={form.license_expiry} onChange={(e) => setForm({ ...form, license_expiry: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Nr. acreditare</label>
            <input value={form.accreditation_number} onChange={(e) => setForm({ ...form, accreditation_number: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Capacitate (locuri)</label>
            <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-deep mb-1.5">Descriere</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className={`${inputClass} resize-none`} />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-navy-deep text-paper px-6 py-3 rounded-lg font-semibold text-sm hover:bg-navy-light transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Salvează modificările
        </button>
      </motion.form>
    </div>
  );
}
