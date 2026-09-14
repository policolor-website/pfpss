"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  MapPin,
  FileText,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type Org = {
  id: string;
  legal_name: string;
  cui: string | null;
  registration_number: string | null;
  legal_form: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  county: string | null;
  city: string | null;
  address: string | null;
  service_type: string | null;
  license_number: string | null;
  license_expiry: string | null;
  accreditation_number: string | null;
  capacity: number | null;
  description: string | null;
  website: string | null;
  status: string;
  created_at: string;
  approved_at: string | null;
  rejection_reason: string | null;
};

type Tab = "pending" | "approved" | "rejected" | "all";

const counties = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani",
  "Brașov", "Brăila", "București", "Buzău", "Caraș-Severin", "Călărași",
  "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu",
  "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș",
  "Mehedinți", "Mureș", "Neamț", "Olt", "Prahova", "Sălaj", "Satu Mare",
  "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vâlcea", "Vaslui", "Vrancea",
];

export default function AdminOrganizatiiPage() {
  const t = useTranslations("admin");
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("pending");
  const [actioning, setActioning] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [countyFilter, setCountyFilter] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    loadOrgs();
  }, [tab, search, countyFilter]);

  async function loadOrgs() {
    setLoading(true);
    const supabase = createClient();
    let query = supabase.from("organizations").select("*").order("created_at", { ascending: false });
    if (tab === "pending") query = query.eq("status", "pending");
    if (tab === "approved") query = query.eq("status", "approved");
    if (tab === "rejected") query = query.eq("status", "rejected");
    if (countyFilter) query = query.eq("county", countyFilter);
    const { data } = await query;
    let filtered = data || [];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (o: Org) =>
          o.legal_name?.toLowerCase().includes(s) ||
          o.cui?.toLowerCase().includes(s) ||
          o.county?.toLowerCase().includes(s)
      );
    }
    setOrgs(filtered);
    setLoading(false);
  }

  async function handleApprove(id: string) {
    setActioning(id);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("organizations")
      .update({
        status: "approved",
        approved_at: new Date().toISOString(),
        approved_by: user?.id,
        rejection_reason: null,
      })
      .eq("id", id);

    if (error) {
      toast.error(t("approveError"));
    } else {
      const { data: org } = await supabase
        .from("organizations")
        .select("user_id")
        .eq("id", id)
        .single();
      if (org?.user_id) {
        // Don't downgrade admins to members
        const { data: userProfile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", org.user_id)
          .single();
        if (userProfile?.role !== "admin") {
          await supabase
            .from("profiles")
            .update({ role: "member" })
            .eq("id", org.user_id);
        }
      }
      toast.success(t("approveSuccess"));
      loadOrgs();
    }
    setActioning(null);
  }

  async function handleReject(id: string) {
    setActioning(id);
    const supabase = createClient();
    const { error } = await supabase
      .from("organizations")
      .update({
        status: "rejected",
        rejection_reason: rejectReason || null,
      })
      .eq("id", id);

    if (error) {
      toast.error(t("rejectError"));
    } else {
      toast.success(t("rejectSuccess"));
      loadOrgs();
    }
    setRejectingId(null);
    setRejectReason("");
    setActioning(null);
  }

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "pending", label: t("tabs.pending"), icon: Clock },
    { key: "approved", label: t("tabs.approved"), icon: CheckCircle2 },
    { key: "rejected", label: t("status.rejected"), icon: XCircle },
    { key: "all", label: t("tabs.all"), icon: Building2 },
  ];

  function statusLabel(status: string) {
    if (status === "approved") return t("status.approved");
    if (status === "pending") return t("status.pending");
    if (status === "suspended") return t("status.suspended") || "Suspendat";
    return t("status.rejected");
  }

  const fields = [
    { key: "legal_name", label: t("org.fields.legalName") },
    { key: "cui", label: t("org.fields.cui") },
    { key: "registration_number", label: t("org.fields.regNumber") },
    { key: "legal_form", label: t("org.fields.legalForm") },
    { key: "contact_name", label: t("org.fields.contactName") },
    { key: "contact_email", label: t("org.fields.contactEmail") },
    { key: "contact_phone", label: t("org.fields.contactPhone") },
    { key: "county", label: t("org.fields.county") },
    { key: "city", label: t("org.fields.city") },
    { key: "address", label: t("org.fields.address") },
    { key: "service_type", label: t("org.fields.serviceType") },
    { key: "license_number", label: t("org.fields.licenseNumber") },
    { key: "license_expiry", label: t("org.fields.licenseExpiry") },
    { key: "accreditation_number", label: t("org.fields.accreditationNumber") },
    { key: "capacity", label: t("org.fields.capacity") },
    { key: "website", label: t("org.fields.website") },
    { key: "description", label: t("org.fields.description") },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-navy-deep mb-1">
          {t("org.title")}
        </h1>
        <p className="text-navy-deep/50">
          {t("org.subtitle")}
        </p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-navy-deep/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("org.searchPlaceholder")}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-navy-deep/15 bg-white text-sm text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>
        <select
          value={countyFilter}
          onChange={(e) => setCountyFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-navy-deep/15 bg-white text-sm text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
        >
          <option value="">{t("org.allCounties")}</option>
          {counties.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-navy-deep/10 overflow-x-auto">
        {tabs.map((tabItem) => (
          <button
            key={tabItem.key}
            onClick={() => setTab(tabItem.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              tab === tabItem.key
                ? "border-gold text-navy-deep"
                : "border-transparent text-navy-deep/40 hover:text-navy-deep"
            }`}
          >
            <tabItem.icon className="size-4" />
            {tabItem.label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-navy-deep/20 border-t-navy-deep rounded-full animate-spin" />
        </div>
      ) : orgs.length === 0 ? (
        <p className="text-sm text-navy-deep/40 py-12 text-center">
          {t("org.noResults")}
        </p>
      ) : (
        <div className="space-y-4">
          {orgs.map((org) => {
            const expanded = expandedId === org.id;
            const isRejecting = rejectingId === org.id;
            return (
              <div
                key={org.id}
                className="rounded-xl bg-white border border-navy-deep/10 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="size-12 rounded-lg bg-navy-deep/5 flex items-center justify-center shrink-0">
                        <Building2 className="size-6 text-navy-deep" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-navy-deep">
                          {org.legal_name}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-navy-deep/50 flex-wrap">
                          {org.cui && <span>{t("cuiLabel")}: {org.cui}</span>}
                          {org.county && (
                            <span className="flex items-center gap-1">
                              <MapPin className="size-3" />
                              {org.county}
                            </span>
                          )}
                          {org.service_type && <span>{org.service_type}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        org.status === "approved"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                          : org.status === "pending"
                          ? "bg-amber-50 border-amber-200 text-amber-600"
                          : "bg-red-50 border-red-200 text-red-600"
                      }`}>
                        {statusLabel(org.status)}
                      </span>
                      <button
                        onClick={() => setExpandedId(expanded ? null : org.id)}
                        className="text-sm text-gold font-medium hover:underline"
                      >
                        {t("org.viewDetails")}
                      </button>
                    </div>
                  </div>

                  {/* Quick info */}
                  <div className="grid sm:grid-cols-3 gap-4 py-4 border-t border-navy-deep/5">
                    <div>
                      <p className="text-xs text-navy-deep/40 mb-1">{t("contactPerson")}</p>
                      <p className="text-sm font-medium text-navy-deep">{org.contact_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-deep/40 mb-1">{t("email")}</p>
                      <p className="text-sm font-medium text-navy-deep">{org.contact_email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-deep/40 mb-1">{t("phone")}</p>
                      <p className="text-sm font-medium text-navy-deep">{org.contact_phone || "—"}</p>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {expanded && (
                    <div className="mt-4 pt-4 border-t border-navy-deep/10">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {fields.map((field) => {
                          const value = (org as any)[field.key];
                          if (!value) return null;
                          return (
                            <div key={field.key}>
                              <p className="text-xs text-navy-deep/40 mb-1">{field.label}</p>
                              <p className="text-sm font-medium text-navy-deep">
                                {field.key === "capacity" ? `${value} locuri` : value}
                              </p>
                            </div>
                          );
                        })}
                        <div>
                          <p className="text-xs text-navy-deep/40 mb-1">{t("org.submittedOn")}</p>
                          <p className="text-sm font-medium text-navy-deep">
                            {new Date(org.created_at).toLocaleDateString("ro-RO")}
                          </p>
                        </div>
                        {org.approved_at && (
                          <div>
                            <p className="text-xs text-navy-deep/40 mb-1">{t("org.approvedOn")}</p>
                            <p className="text-sm font-medium text-navy-deep">
                              {new Date(org.approved_at).toLocaleDateString("ro-RO")}
                            </p>
                          </div>
                        )}
                        {org.rejection_reason && (
                          <div className="sm:col-span-2 lg:col-span-3">
                            <p className="text-xs text-navy-deep/40 mb-1">{t("org.rejectReason")}</p>
                            <p className="text-sm text-red-600">{org.rejection_reason}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions for pending */}
                  {org.status === "pending" && (
                    <div className="flex gap-3 pt-4 mt-4 border-t border-navy-deep/5">
                      <button
                        onClick={() => handleApprove(org.id)}
                        disabled={actioning === org.id}
                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
                      >
                        {actioning === org.id && !isRejecting ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="size-4" />
                        )}
                        {t("approve")}
                      </button>
                      <button
                        onClick={() => {
                          setRejectingId(isRejecting ? null : org.id);
                          setRejectReason("");
                        }}
                        disabled={actioning === org.id}
                        className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        <XCircle className="size-4" />
                        {t("reject")}
                      </button>
                    </div>
                  )}

                  {/* Reject reason input */}
                  {isRejecting && (
                    <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 space-y-3">
                      <label className="block text-sm font-medium text-red-800">
                        {t("org.rejectReason")}
                      </label>
                      <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder={t("org.rejectReasonPlaceholder")}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-red-200 bg-white text-sm text-navy-deep focus:outline-none focus:border-red-400 resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReject(org.id)}
                          disabled={actioning === org.id}
                          className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          {actioning === org.id ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <XCircle className="size-4" />
                          )}
                          {t("org.confirmReject")}
                        </button>
                        <button
                          onClick={() => {
                            setRejectingId(null);
                            setRejectReason("");
                          }}
                          className="inline-flex items-center gap-2 bg-white text-navy-deep border border-navy-deep/15 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-paper transition-colors"
                        >
                          {t("org.cancel")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
