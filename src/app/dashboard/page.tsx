"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  ArrowRight,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type OrgData = {
  id: string;
  legal_name: string;
  status: string;
  county: string;
  service_type: string;
  created_at: string;
};

type MembershipData = {
  period: string;
  status: string;
  amount_cents: number;
};

type DocData = {
  id: string;
  title: string;
  category: string;
  created_at: string;
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "În așteptare", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  approved: { label: "Aprobat", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  rejected: { label: "Respins", color: "text-red-600", bg: "bg-red-50 border-red-200" },
  suspended: { label: "Suspendat", color: "text-red-600", bg: "bg-red-50 border-red-200" },
};

export default function DashboardPage() {
  const [org, setOrg] = useState<OrgData | null>(null);
  const [membership, setMembership] = useState<MembershipData | null>(null);
  const [docs, setDocs] = useState<DocData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: orgData } = await supabase
        .from("organizations")
        .select("legal_name, status, county, service_type, created_at, id")
        .eq("user_id", user.id)
        .single();

      setOrg(orgData);

      const [memResult, docResult] = await Promise.all([
        orgData
          ? supabase
              .from("memberships")
              .select("period, status, amount_cents")
              .eq("organization_id", orgData.id)
              .order("period", { ascending: false })
              .limit(1)
              .maybeSingle()
          : Promise.resolve({ data: null }),
        supabase
          .from("documents")
          .select("id, title, category, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      setMembership(memResult.data);
      setDocs(docResult.data || []);
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

  const status = org ? statusConfig[org.status] || statusConfig.pending : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-navy-deep mb-1">
          Bun venit{org ? `, ${org.legal_name}` : ""}
        </h1>
        <p className="text-navy-deep/50">
          Panoul de control al organizației tale în PFPSS
        </p>
      </div>

      {/* Status banner */}
      {org?.status === "pending" && (
        <div className="flex items-start gap-3 p-5 rounded-xl bg-amber-50 border border-amber-200">
          <Clock className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">Cererea de aderare este în validare</p>
            <p className="text-sm text-amber-700 mt-1">
              Echipa PFPSS verifică dosarul tău. Vei primi un email la aprobare,
              de obicei în maximum 48 de ore lucrătoare.
            </p>
          </div>
        </div>
      )}

      {org?.status === "rejected" && (
        <div className="flex items-start gap-3 p-5 rounded-xl bg-red-50 border border-red-200">
          <Clock className="size-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">Cererea a fost respinsă</p>
            <p className="text-sm text-red-700 mt-1">
              Contactează PFPSS pentru detalii și pași următori.
            </p>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status membru */}
        <div className="p-5 rounded-xl bg-white border border-navy-deep/10">
          <div className="flex items-center justify-between mb-3">
            <div className="size-10 rounded-lg bg-navy-deep/5 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-navy-deep" />
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${status?.bg} ${status?.color}`}>
              {status?.label}
            </span>
          </div>
          <p className="text-sm text-navy-deep/50">Status membru</p>
          <p className="text-lg font-semibold text-navy-deep">{status?.label}</p>
        </div>

        {/* Cotizație */}
        <div className="p-5 rounded-xl bg-white border border-navy-deep/10">
          <div className="flex items-center justify-between mb-3">
            <div className="size-10 rounded-lg bg-navy-deep/5 flex items-center justify-center">
              <CreditCard className="size-5 text-navy-deep" />
            </div>
            {membership?.status === "paid" ? (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-emerald-50 border-emerald-200 text-emerald-600">
                Plătită
              </span>
            ) : (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-amber-50 border-amber-200 text-amber-600">
                Neplătită
              </span>
            )}
          </div>
          <p className="text-sm text-navy-deep/50">Cotizație luna curentă</p>
          <p className="text-lg font-semibold text-navy-deep">
            {membership?.status === "paid" ? "Achitată" : "De plată"}
          </p>
        </div>

        {/* Județ */}
        <div className="p-5 rounded-xl bg-white border border-navy-deep/10">
          <div className="flex items-center justify-between mb-3">
            <div className="size-10 rounded-lg bg-navy-deep/5 flex items-center justify-center">
              <MapPin className="size-5 text-navy-deep" />
            </div>
          </div>
          <p className="text-sm text-navy-deep/50">Județ</p>
          <p className="text-lg font-semibold text-navy-deep">{org?.county || "—"}</p>
        </div>

        {/* Membru din */}
        <div className="p-5 rounded-xl bg-white border border-navy-deep/10">
          <div className="flex items-center justify-between mb-3">
            <div className="size-10 rounded-lg bg-navy-deep/5 flex items-center justify-center">
              <Calendar className="size-5 text-navy-deep" />
            </div>
          </div>
          <p className="text-sm text-navy-deep/50">Membru din</p>
          <p className="text-lg font-semibold text-navy-deep">
            {org?.created_at ? new Date(org.created_at).getFullYear() : "—"}
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Documente recente */}
        <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-navy-deep">
              Documente recente
            </h2>
            <Link
              href="/dashboard/documente"
              className="text-sm text-gold font-medium hover:underline inline-flex items-center gap-1"
            >
              Toate <ArrowRight className="size-3" />
            </Link>
          </div>
          {org?.status !== "approved" ? (
            <p className="text-sm text-navy-deep/40 py-8 text-center">
              Documentele sunt disponibile după aprobarea cererii.
            </p>
          ) : docs.length === 0 ? (
            <p className="text-sm text-navy-deep/40 py-8 text-center">
              Nu există documente încă.
            </p>
          ) : (
            <div className="space-y-3">
              {docs.map((doc) => (
                <Link
                  key={doc.id}
                  href="/dashboard/documente"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-paper transition-colors"
                >
                  <div className="size-9 rounded-lg bg-navy-deep/5 flex items-center justify-center shrink-0">
                    <FileText className="size-4 text-navy-deep" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy-deep truncate">
                      {doc.title}
                    </p>
                    <p className="text-xs text-navy-deep/40 capitalize">
                      {doc.category.replace("-", " ")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Info organizație */}
        <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
          <h2 className="font-heading text-lg font-semibold text-navy-deep mb-5">
            Informații organizație
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-navy-deep/5 flex items-center justify-center shrink-0">
                <Building2 className="size-4 text-navy-deep" />
              </div>
              <div>
                <p className="text-xs text-navy-deep/40">Denumire</p>
                <p className="text-sm font-medium text-navy-deep">
                  {org?.legal_name || "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-navy-deep/5 flex items-center justify-center shrink-0">
                <MapPin className="size-4 text-navy-deep" />
              </div>
              <div>
                <p className="text-xs text-navy-deep/40">Tip serviciu</p>
                <p className="text-sm font-medium text-navy-deep">
                  {org?.service_type || "—"}
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/profil"
              className="inline-flex items-center gap-2 text-sm text-gold font-medium hover:underline mt-2"
            >
              Editează profilul <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
