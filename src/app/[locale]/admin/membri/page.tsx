"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  Search,
  Loader2,
  Users,
  Ban,
  RotateCcw,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type Org = {
  id: string;
  legal_name: string;
  cui: string | null;
  county: string | null;
  city: string | null;
  service_type: string | null;
  contact_email: string;
  status: string;
  approved_at: string | null;
};

const counties = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani",
  "Brașov", "Brăila", "București", "Buzău", "Caraș-Severin", "Călărași",
  "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu",
  "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș",
  "Mehedinți", "Mureș", "Neamț", "Olt", "Prahova", "Sălaj", "Satu Mare",
  "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vâlcea", "Vaslui", "Vrancea",
];

export default function AdminMembriPage() {
  const t = useTranslations("admin");
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [countyFilter, setCountyFilter] = useState("");
  const [actioning, setActioning] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, [search, countyFilter]);

  async function load() {
    setLoading(true);
    const supabase = createClient();
    let query = supabase
      .from("organizations")
      .select("id, legal_name, cui, county, city, service_type, contact_email, status, approved_at")
      .in("status", ["approved", "suspended"])
      .order("legal_name", { ascending: true });
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

  async function toggleStatus(org: Org) {
    setActioning(org.id);
    const supabase = createClient();
    const newStatus = org.status === "suspended" ? "approved" : "suspended";
    const { error } = await supabase
      .from("organizations")
      .update({ status: newStatus })
      .eq("id", org.id);

    if (error) {
      toast.error(newStatus === "suspended" ? t("members.suspendError") : t("members.reactivateError"));
    } else {
      toast.success(newStatus === "suspended" ? t("members.suspendSuccess") : t("members.reactivateSuccess"));
      load();
    }
    setActioning(null);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-navy-deep mb-1">
          {t("members.title")}
        </h1>
        <p className="text-navy-deep/50">
          {t("members.subtitle")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-navy-deep/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("members.searchPlaceholder")}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-navy-deep/15 bg-white text-sm text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>
        <select
          value={countyFilter}
          onChange={(e) => setCountyFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-navy-deep/15 bg-white text-sm text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
        >
          <option value="">{t("members.allCounties")}</option>
          {counties.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-navy-deep/20 border-t-navy-deep rounded-full animate-spin" />
        </div>
      ) : orgs.length === 0 ? (
        <p className="text-sm text-navy-deep/40 py-12 text-center">
          {t("members.noResults")}
        </p>
      ) : (
        <div className="space-y-3">
          {orgs.map((org) => (
            <div
              key={org.id}
              className="p-5 rounded-xl bg-white border border-navy-deep/10 flex items-center gap-4"
            >
              <div className="size-11 rounded-lg bg-navy-deep/5 flex items-center justify-center shrink-0">
                <Building2 className="size-5 text-navy-deep" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-base font-semibold text-navy-deep truncate">
                  {org.legal_name}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-navy-deep/50 flex-wrap">
                  {org.cui && <span>CUI: {org.cui}</span>}
                  {org.county && (
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {org.county}
                    </span>
                  )}
                  {org.service_type && <span>{org.service_type}</span>}
                  {org.approved_at && (
                    <span>{t("members.memberSince")}: {new Date(org.approved_at).toLocaleDateString("ro-RO")}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                  org.status === "approved"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-amber-50 border-amber-200 text-amber-600"
                }`}>
                  {org.status === "approved" ? t("status.approved") : "Suspendat"}
                </span>
                <button
                  onClick={() => toggleStatus(org)}
                  disabled={actioning === org.id}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors disabled:opacity-50 ${
                    org.status === "approved"
                      ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  {actioning === org.id ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : org.status === "approved" ? (
                    <Ban className="size-3.5" />
                  ) : (
                    <RotateCcw className="size-3.5" />
                  )}
                  {org.status === "approved" ? t("members.suspend") : t("members.reactivate")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
