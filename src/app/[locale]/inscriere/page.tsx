"use client";

import { useState, useEffect } from "react";
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
import { useTranslations, useLocale } from "next-intl";
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
  const t = useTranslations("inscriere");
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Redirect logged-in users to dashboard
  useEffect(() => {
    async function checkSession() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        const prefix = locale === "en" ? "/en" : "";
        router.push(`${prefix}/${profile?.role === "admin" ? "admin" : "dashboard"}`);
      }
    }
    checkSession();
  }, [router, locale]);

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

  const prefix = locale === "en" ? "/en" : "";

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
      toast.error(t("errors.requiredFields"));
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: contactName } },
        });

      if (authError) throw authError;
      if (!authData.user) throw new Error(t("errors.accountFailed"));

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

      toast.success(t("success.title"));
      router.push(`${prefix}/login?registered=1`);
    } catch (err: any) {
      toast.error(err.message || t("errors.submitFailed"));
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    { n: 1, label: t("steps.account"), icon: ShieldCheck },
    { n: 2, label: t("steps.organization"), icon: Building2 },
    { n: 3, label: t("steps.licenses"), icon: FileCheck },
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep pt-20 pb-16">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[120px]" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <Link
              href={`${prefix}/membri`}
              className="inline-flex items-center gap-2 text-sm text-paper/60 hover:text-gold transition-colors mb-6"
            >
              <ArrowLeft className="size-4" />
              {t("backToMembers")}
            </Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-paper mb-3">
              {t("title")}
            </h1>
            <p className="text-lg text-paper/60 max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Formular */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-6">
            {/* Stepper */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {steps.map((s, i) => (
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
                      {t("account.title")}
                    </h2>
                    <p className="text-sm text-navy-deep/50">
                      {t("account.description")}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-deep mb-1.5">
                      {t("org.email")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      placeholder={t("org.emailPlaceholder")}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">
                        {t("password")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder={t("passwordPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">
                        {t("confirmPassword")} <span className="text-red-500">*</span>
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
                        placeholder={t("confirmPasswordPlaceholder")}
                      />
                    </div>
                  </div>

                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-sm text-red-500">{t("passwordsMismatch")}</p>
                  )}

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!email || password.length < 6 || password !== confirmPassword}
                    className="w-full inline-flex items-center justify-center gap-2 bg-navy-deep text-paper py-3.5 rounded-lg font-semibold text-sm hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {t("actions.next")}
                    <ArrowRight className="size-4" />
                  </button>
                </>
              )}

              {/* Step 2: Organizație */}
              {step === 2 && (
                <>
                  <div>
                    <h2 className="font-heading text-xl font-semibold text-navy-deep mb-1">
                      {t("org.title")}
                    </h2>
                    <p className="text-sm text-navy-deep/50">
                      {t("org.description")}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-deep mb-1.5">
                      {t("org.legalName")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={legalName}
                      onChange={(e) => setLegalName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      placeholder={t("org.legalNamePlaceholder")}
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">{t("org.cui")}</label>
                      <input
                        value={cui}
                        onChange={(e) => setCui(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder={t("org.cuiPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">{t("org.regNumber")}</label>
                      <input
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder={t("org.regNumberPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">{t("org.legalForm")}</label>
                      <select
                        value={legalForm}
                        onChange={(e) => setLegalForm(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      >
                        <option value="">{t("select")}</option>
                        {legalForms.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">
                        {t("org.contactName")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder={t("org.contactNamePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">
                        {t("org.contactEmail")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder={t("org.contactEmailPlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-deep mb-1.5">{t("org.contactPhone")}</label>
                    <input
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      placeholder={t("org.contactPhonePlaceholder")}
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">
                        {t("org.county")} <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={county}
                        onChange={(e) => setCounty(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      >
                        <option value="">{t("select")}</option>
                        {counties.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">{t("org.city")}</label>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder={t("org.cityPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">{t("org.address")}</label>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder={t("org.addressPlaceholder")}
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
                      {t("actions.back")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!legalName || !contactName || !contactEmail || !county}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-navy-deep text-paper py-3.5 rounded-lg font-semibold text-sm hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {t("actions.next")}
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
                      {t("licenses.title")}
                    </h2>
                    <p className="text-sm text-navy-deep/50">
                      {t("licenses.description")}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-deep mb-1.5">
                      {t("org.serviceType")} <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                    >
                      <option value="">{t("select")}</option>
                      {serviceTypes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">{t("licenses.number")}</label>
                      <input
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder={t("licenses.numberPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">{t("licenses.expiry")}</label>
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
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">{t("licenses.accreditation")}</label>
                      <input
                        value={accreditationNumber}
                        onChange={(e) => setAccreditationNumber(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder={t("licenses.accreditationPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-deep mb-1.5">{t("licenses.capacity")}</label>
                      <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder={t("licenses.capacityPlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-deep mb-1.5">
                      {t("org.description")}
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors resize-none"
                      placeholder={t("org.descriptionPlaceholder")}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm text-navy-deep border border-navy-deep/15 hover:bg-navy-deep/5 transition-colors"
                    >
                      <ArrowLeft className="size-4" />
                      {t("actions.back")}
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !canSubmit}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gold text-navy-deep py-3.5 rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          {t("actions.submitting")}
                        </>
                      ) : (
                        <>
                          {t("actions.submit")}
                          <ArrowRight className="size-4" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.form>

            <p className="text-center text-sm text-navy-deep/40 mt-6">
              {t("haveAccount")}{" "}
              <Link href={`${prefix}/login`} className="text-gold font-medium hover:underline">
                {t("login")}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
