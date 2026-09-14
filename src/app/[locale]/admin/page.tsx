"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Building2,
  ArrowRight,
  CreditCard,
  PenSquare,
  FileText,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";

type Stats = {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
  paidThisMonth: number;
  petitionSignatures: number;
  documents: number;
};

type RecentOrg = {
  id: string;
  legal_name: string;
  status: string;
  county: string | null;
  created_at: string;
};

export default function AdminOverviewPage() {
  const t = useTranslations("admin");
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentOrg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const [pending, approved, rejected, all, docs] = await Promise.all([
        supabase.from("organizations").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("organizations").select("id", { count: "exact", head: true }).eq("status", "approved"),
        supabase.from("organizations").select("id", { count: "exact", head: true }).eq("status", "rejected"),
        supabase.from("organizations").select("id", { count: "exact", head: true }),
        supabase.from("documents").select("id", { count: "exact", head: true }),
      ]);

      // Petitions signatures count
      const { count: sigCount } = await supabase
        .from("petitions_signatures")
        .select("id", { count: "exact", head: true });

      // Paid this month
      const now = new Date();
      const period = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const { count: paidCount } = await supabase
        .from("memberships")
        .select("id", { count: "exact", head: true })
        .eq("period", period)
        .eq("status", "paid");

      // Recent organizations
      const { data: recentData } = await supabase
        .from("organizations")
        .select("id, legal_name, status, county, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      setStats({
        pending: pending.count || 0,
        approved: approved.count || 0,
        rejected: rejected.count || 0,
        total: all.count || 0,
        paidThisMonth: paidCount || 0,
        petitionSignatures: sigCount || 0,
        documents: docs.count || 0,
      });
      setRecent(recentData || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 border-2 border-navy-deep/20 border-t-navy-deep rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: t("overview.pending"), value: stats?.pending || 0, icon: Clock, color: "text-amber-600", bg: "bg-amber-50", href: `${prefix}/admin/organizatii?tab=pending` },
    { label: t("overview.approved"), value: stats?.approved || 0, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", href: `${prefix}/admin/organizatii?tab=approved` },
    { label: t("overview.rejected"), value: stats?.rejected || 0, icon: XCircle, color: "text-red-600", bg: "bg-red-50", href: `${prefix}/admin/organizatii?tab=rejected` },
    { label: t("overview.total"), value: stats?.total || 0, icon: Building2, color: "text-navy-deep", bg: "bg-navy-deep/5", href: `${prefix}/admin/organizatii` },
    { label: t("overview.paidThisMonth"), value: stats?.paidThisMonth || 0, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50", href: `${prefix}/admin` },
    { label: t("overview.petitionSignatures"), value: stats?.petitionSignatures || 0, icon: PenSquare, color: "text-gold", bg: "bg-gold/10", href: `${prefix}/admin` },
    { label: t("overview.documents"), value: stats?.documents || 0, icon: FileText, color: "text-navy-deep", bg: "bg-navy-deep/5", href: `${prefix}/admin` },
    { label: t("overview.members"), value: stats?.approved || 0, icon: Users, color: "text-navy-deep", bg: "bg-navy-deep/5", href: `${prefix}/admin/membri` },
  ];

  function statusLabel(status: string) {
    if (status === "approved") return t("status.approved");
    if (status === "pending") return t("status.pending");
    return t("status.rejected");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-navy-deep mb-1">
          {t("overview.title")}
        </h1>
        <p className="text-navy-deep/50">
          {t("overview.subtitle")}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className="p-5 rounded-xl bg-white border border-navy-deep/10 hover:border-gold/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`size-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon className={`size-5 ${card.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-navy-deep">{card.value}</p>
            <p className="text-sm text-navy-deep/50">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cereri recente */}
        <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-navy-deep">
              {t("overview.recentRequests")}
            </h2>
            <Link
              href={`${prefix}/admin/organizatii`}
              className="text-sm text-gold font-medium hover:underline inline-flex items-center gap-1"
            >
              {t("overview.viewAll")} <ArrowRight className="size-3" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-navy-deep/40 py-8 text-center">
              {t("noRequests")}
            </p>
          ) : (
            <div className="space-y-3">
              {recent.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-paper transition-colors"
                >
                  <div className="size-9 rounded-lg bg-navy-deep/5 flex items-center justify-center shrink-0">
                    <Building2 className="size-4 text-navy-deep" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy-deep truncate">
                      {org.legal_name}
                    </p>
                    <p className="text-xs text-navy-deep/40">
                      {org.county || "—"}
                    </p>
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
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
          <h2 className="font-heading text-lg font-semibold text-navy-deep mb-5">
            {t("overview.quickActions")}
          </h2>
          <div className="space-y-3">
            <Link
              href={`${prefix}/admin/organizatii?tab=pending`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-paper transition-colors group"
            >
              <div className="size-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <Clock className="size-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-navy-deep group-hover:text-gold transition-colors">
                  {t("overview.reviewPending")}
                </p>
                <p className="text-xs text-navy-deep/40">
                  {stats?.pending || 0} {t("overview.pending")}
                </p>
              </div>
              <ArrowRight className="size-4 text-navy-deep/30 group-hover:text-gold transition-colors" />
            </Link>
            <Link
              href={`${prefix}/admin/membri`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-paper transition-colors group"
            >
              <div className="size-9 rounded-lg bg-navy-deep/5 flex items-center justify-center shrink-0">
                <Users className="size-4 text-navy-deep" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-navy-deep group-hover:text-gold transition-colors">
                  {t("overview.viewMembers")}
                </p>
                <p className="text-xs text-navy-deep/40">
                  {stats?.approved || 0} {t("overview.approved")}
                </p>
              </div>
              <ArrowRight className="size-4 text-navy-deep/30 group-hover:text-gold transition-colors" />
            </Link>
            <Link
              href={`${prefix}/admin/documente`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-paper transition-colors group"
            >
              <div className="size-9 rounded-lg bg-navy-deep/5 flex items-center justify-center shrink-0">
                <FileText className="size-4 text-navy-deep" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-navy-deep group-hover:text-gold transition-colors">
                  {t("overview.manageDocuments")}
                </p>
                <p className="text-xs text-navy-deep/40">
                  {stats?.documents || 0} {t("overview.documents")}
                </p>
              </div>
              <ArrowRight className="size-4 text-navy-deep/30 group-hover:text-gold transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
