"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  FileCheck,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
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

const serviceTypes = [
  "Rezidențial (cămin)",
  "Centru de zi",
  "Servicii la domiciliu",
  "Altele",
];

const legalForms = ["SRL", "SA", "SCS", "ONG / Asociație", "Fundație", "Altele"];

export default function InscrierePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Cont
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Date organizație
  const [legalName, setLegalName] = useState("");
  const [cui, setCui] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [legalForm, setLegalForm] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [accreditationNumber, setAccreditationNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit =
    email &&
    password.length >= 6 &&
    password === confirmPassword &&
    legalName &&
    contactName &&
    contactEmail &&
    county &&
    serviceType;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) {
      toast.error("Completează toate câmpurile obligatorii");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      // 1. Creează cont în auth.users
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: contactName } },
        });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Nu s-a putut crea contul");

      // 2. Creează organizația cu status pending
      const { error: orgError } = await supabase
        .from("organizations")
        .insert({
          user_id: authData.user.id,
          legal_name: legalName,
          cui: cui || null,
          registration_number: regNumber || null,
          legal_form: legalForm || null,
          contact_name: contactName,
          contact_email: contactEmail,
          contact_phone: contactPhone || null,
          county: county || null,
          city: city || null,
          address: address || null,
          service_type: serviceType || null,
          license_number: licenseNumber || null,
          license_expiry: licenseExpiry || null,
          accreditation_number: accreditationNumber || null,
          capacity: capacity ? parseInt(capacity) : null,
          description: description || null,
          status: "pending",
        });

      if (orgError) throw orgError;

      toast.success("Cererea a fost trimisă! Verifică emailul pentru confirmare.");
      router.push("/login?registered=1");
    } catch (err: any) {
      toast.error(err.message || "A apărut o eroare");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep pt-20 pb-16">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[120px]" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <Link
              href="/membri"
              className="inline-flex items-center gap-2 text-sm text-paper/60 hover:text-gold transition-colors mb-6"
            >
              <ArrowLeft className="size-4" />
              Înapoi la membri
            </Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-paper mb-3">
              Solicită aderarea
            </h1>
            <p className="text-lg text-paper/60 max-w-2xl">
              Completează formularul cu datele organizației tale. Echipa PFPSS
              va valida cererea în maximum 48 de ore lucrătoare.
            </p>
          </div>
        </section>

        {/* Formular */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-6">
            {/* Stepper */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[
                { n: 1, label: "Cont", icon: ShieldCheck },
                { n: 2, label: "Organizație", icon: Building2 },
                { n: 3, label: "Licențe", icon: FileCheck },
              ].map((s, i) => (
                <div key={s.n} className="flex items-center gap-4">
                  <div
                    className={`flex items-center gap-2 ${step >= s.n ? "text-navy-deep" : "text-navy-deep/30"}`}
                  >
                    <div
                      className={`flex items-center justify-center size-9 rounded-full border-2 transition-colors ${
                        step >= s.n
                          ? "border-gold bg-gold/10"
                          : "border-navy-deep/15"
                      }`}
                    >
                      {step > s.n ? (
                        <CheckCircle2 className="size-5 text-gold" />
                      ) : (
                        <s.icon className="size-4" />
                      )}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div
                      className={`h-px w-8 sm:w-16 ${step > s.n ? "bg-gold" : "bg-navy-deep/15"}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl border border-navy-deep/10 shadow-sm p-8 md:p-10 space-y-6"
            >
              {/* Step 1: Cont */}
              {step === 1 && (
                <>
                  <div>
                    <h2 className="font-heading text-xl font-semibold text-navy-deep mb-1">
                      Creează contul
                    </h2>
                    <p className="text-sm text-navy-deep/50">
                      Vei folosi aceste date pentru a te autentifica în portalul membrilor.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-deep mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      placeholder="email@organizatie.ro"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">
                        Parolă <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder="Minim 6 caractere"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">
                        Confirmă parola <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-paper/50 text-navy-deep focus:outline-none focus:ring-2 transition-colors ${
                          confirmPassword && password !== confirmPassword
                            ? "border-red-400 focus:ring-red-200"
                            : "border-navy-deep/15 focus:border-gold focus:ring-gold/20"
                        }`}
                        placeholder="Repetă parola"
                      />
                    </div>
                  </div>

                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-sm text-red-500">Parolele nu coincid</p>
                  )}

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!email || password.length < 6 || password !== confirmPassword}
                    className="w-full inline-flex items-center justify-center gap-2 bg-navy-deep text-paper py-3.5 rounded-lg font-semibold text-sm hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuă
                    <ArrowRight className="size-4" />
                  </button>
                </>
              )}

              {/* Step 2: Organizație */}
              {step === 2 && (
                <>
                  <div>
                    <h2 className="font-heading text-xl font-semibold text-navy-deep mb-1">
                      Datele organizației
                    </h2>
                    <p className="text-sm text-navy-deep/50">
                      Informațiile despre organizația pe care o reprezinți.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-deep mb-1.5">
                      Denumire legală <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={legalName}
                      onChange={(e) => setLegalName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      placeholder="ex: Căminul Speranța SRL"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">CUI</label>
                      <input
                        value={cui}
                        onChange={(e) => setCui(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder="RO12345678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">Nr. înregistrare</label>
                      <input
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder="J40/1234/2020"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">Formă juridică</label>
                      <select
                        value={legalForm}
                        onChange={(e) => setLegalForm(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      >
                        <option value="">Selectează</option>
                        {legalForms.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">
                        Persoană de contact <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder="Nume complet"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">
                        Email contact <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder="email@organizatie.ro"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-deep mb-1.5">Telefon contact</label>
                    <input
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      placeholder="07XX XXX XXX"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">
                        Județ <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={county}
                        onChange={(e) => setCounty(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      >
                        <option value="">Selectează</option>
                        {counties.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">Oraș</label>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder="Oraș"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">Adresă</label>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder="Strada, nr."
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm text-navy-deep border border-navy-deep/15 hover:bg-navy-deep/5 transition-colors"
                    >
                      <ArrowLeft className="size-4" />
                      Înapoi
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!legalName || !contactName || !contactEmail || !county}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-navy-deep text-paper py-3.5 rounded-lg font-semibold text-sm hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continuă
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Licențe */}
              {step === 3 && (
                <>
                  <div>
                    <h2 className="font-heading text-xl font-semibold text-navy-deep mb-1">
                      Licențe și acreditări
                    </h2>
                    <p className="text-sm text-navy-deep/50">
                      Detaliile despre licența de funcționare și acreditare.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-deep mb-1.5">
                      Tip serviciu <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                    >
                      <option value="">Selectează</option>
                      {serviceTypes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">Nr. licență</label>
                      <input
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder="ex: LF-1234/2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">Expiră la</label>
                      <input
                        type="date"
                        value={licenseExpiry}
                        onChange={(e) => setLicenseExpiry(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">Nr. acreditare</label>
                      <input
                        value={accreditationNumber}
                        onChange={(e) => setAccreditationNumber(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder="ex: AC-5678/2023"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">Capacitate (locuri)</label>
                      <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder="ex: 50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-deep mb-1.5">
                      Descriere organizație
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors resize-none"
                      placeholder="Scurtă descriere a organizației și a serviciilor oferite..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm text-navy-deep border border-navy-deep/15 hover:bg-navy-deep/5 transition-colors"
                    >
                      <ArrowLeft className="size-4" />
                      Înapoi
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !canSubmit}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gold text-navy-deep py-3.5 rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Se trimite...
                        </>
                      ) : (
                        <>
                          Trimite cererea
                          <ArrowRight className="size-4" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.form>

            <p className="text-center text-sm text-navy-deep/40 mt-6">
              Ai deja cont?{" "}
              <Link href="/login" className="text-gold font-medium hover:underline">
                Autentifică-te
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
