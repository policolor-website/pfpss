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
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type Org = {
  id: string;
  legal_name: string;
  cui: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  county: string | null;
  city: string | null;
  service_type: string | null;
  license_number: string | null;
  status: string;
  created_at: string;
};

type Tab = "pending" | "approved" | "all";

export default function AdminPage() {
  const t = useTranslations("admin");
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("pending");
  const [actioning, setActioning] = useState<string | null>(null);

  useEffect(() => {
    loadOrgs();
  }, [tab]);

  async function loadOrgs() {
    setLoading(true);
    const supabase = createClient();
    let query = supabase.from("organizations").select("*").order("created_at", { ascending: false });
    if (tab === "pending") query = query.eq("status", "pending");
    if (tab === "approved") query = query.eq("status", "approved");
    const { data } = await query;
    setOrgs(data || []);
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
        await supabase
          .from("profiles")
          .update({ role: "member" })
          .eq("id", org.user_id);
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
      .update({ status: "rejected" })
      .eq("id", id);

    if (error) {
      toast.error(t("rejectError"));
    } else {
      toast.success(t("rejectSuccess"));
      loadOrgs();
    }
    setActioning(null);
  }

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "pending", label: t("tabs.pending"), icon: Clock },
    { key: "approved", label: t("tabs.approved"), icon: CheckCircle2 },
    { key: "all", label: t("tabs.all"), icon: Users },
  ];

  function statusLabel(status: string) {
    if (status === "approved") return t("status.approved");
    if (status === "pending") return t("status.pending");
    return t("status.rejected");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-navy-deep mb-1">
          {t("title")}
        </h1>
        <p className="text-navy-deep/50">
          {t("subtitle")}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-navy-deep/10">
        {tabs.map((tabItem) => (
          <button
            key={tabItem.key}
            onClick={() => setTab(tabItem.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
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
          {t("noRequests")}
        </p>
      ) : (
        <div className="space-y-4">
          {orgs.map((org) => (
            <div
              key={org.id}
              className="p-6 rounded-xl bg-white border border-navy-deep/10"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-lg bg-navy-deep/5 flex items-center justify-center shrink-0">
                    <Building2 className="size-6 text-navy-deep" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-navy-deep">
                      {org.legal_name}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-navy-deep/50">
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
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${
                  org.status === "approved"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : org.status === "pending"
                    ? "bg-amber-50 border-amber-200 text-amber-600"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}>
                  {statusLabel(org.status)}
                </span>
              </div>

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

              {org.license_number && (
                <div className="flex items-center gap-2 py-3 border-t border-navy-deep/5">
                  <FileText className="size-4 text-navy-deep/40" />
                  <span className="text-sm text-navy-deep/60">
                    {t("licenseLabel")}: {org.license_number}
                  </span>
                </div>
              )}

              {org.status === "pending" && (
                <div className="flex gap-3 pt-4 border-t border-navy-deep/5">
                  <button
                    onClick={() => handleApprove(org.id)}
                    disabled={actioning === org.id}
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    {actioning === org.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="size-4" />
                    )}
                    {t("approve")}
                  </button>
                  <button
                    onClick={() => handleReject(org.id)}
                    disabled={actioning === org.id}
                    className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    <XCircle className="size-4" />
                    {t("reject")}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
