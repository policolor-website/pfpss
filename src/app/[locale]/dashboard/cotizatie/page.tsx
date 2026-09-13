"use client";

import { useEffect, useState } from "react";
import { CreditCard, CheckCircle2, Clock, Loader2, Receipt } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type Membership = {
  id: string;
  period: string;
  amount_cents: number;
  status: string;
  paid_at: string | null;
  invoice_url: string | null;
};

const COTIZATIE_AMOUNT = 50000;

function getCurrentPeriod() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function CotizatiePage() {
  const t = useTranslations("dashboard.cotizatie");
  const locale = useLocale();
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [orgId, setOrgId] = useState("");

  const monthsRo = [
    "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
    "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
  ];
  const monthsEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  function formatPeriod(period: string) {
    const [year, month] = period.split("-");
    const months = locale === "en" ? monthsEn : monthsRo;
    return `${months[parseInt(month) - 1]} ${year}`;
  }

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: org } = await supabase
        .from("organizations")
        .select("id")
        .eq("user_id", user.id)
        .single();
      if (org) setOrgId(org.id);

      const { data } = await supabase
        .from("memberships")
        .select("*")
        .eq("organization_id", org?.id || "")
        .order("period", { ascending: false });
      setMemberships(data || []);
      setLoading(false);
    }
    load();
  }, []);

  async function handlePay(period: string) {
    setPaying(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId, period, amount: COTIZATIE_AMOUNT }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(t("payError"));
      }
    } catch {
      toast.error(t("payError"));
    }
    setPaying(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 border-2 border-navy-deep/20 border-t-navy-deep rounded-full animate-spin" />
      </div>
    );
  }

  const currentPeriod = getCurrentPeriod();
  const currentMembership = memberships.find((m) => m.period === currentPeriod);
  const localeStr = locale === "en" ? "en-US" : "ro-RO";

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-lg bg-navy-deep/5 flex items-center justify-center">
          <CreditCard className="size-5 text-navy-deep" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-deep">{t("title")}</h1>
          <p className="text-sm text-navy-deep/50">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Current month card */}
      <div className="bg-white rounded-2xl border border-navy-deep/10 shadow-sm p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-navy-deep/50">{formatPeriod(currentPeriod)}</p>
            <p className="text-3xl font-bold text-navy-deep">
              {(COTIZATIE_AMOUNT / 100).toLocaleString(localeStr)} RON
            </p>
          </div>
          {currentMembership?.status === "paid" ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">{t("paid")}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
              <Clock className="size-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-600">{t("unpaid")}</span>
            </div>
          )}
        </div>

        {currentMembership?.status === "paid" ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50">
              <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-emerald-800">
                  {t("paidOn", { date: new Date(currentMembership.paid_at!).toLocaleDateString(localeStr) })}
                </p>
                <p className="text-xs text-emerald-600">
                  {t("paidDesc", { period: formatPeriod(currentPeriod) })}
                </p>
              </div>
            </div>
            {currentMembership.invoice_url && (
              <a
                href={currentMembership.invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gold font-medium hover:underline"
              >
                <Receipt className="size-4" />
                {t("downloadInvoice")}
              </a>
            )}
          </div>
        ) : (
          <button
            onClick={() => handlePay(currentPeriod)}
            disabled={paying}
            className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy-deep py-3.5 rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {paying ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("processing")}
              </>
            ) : (
              <>
                <CreditCard className="size-4" />
                {t("pay", { amount: (COTIZATIE_AMOUNT / 100).toLocaleString(localeStr) })}
              </>
            )}
          </button>
        )}
      </div>

      {/* History */}
      {memberships.length > 0 && (
        <div>
          <h2 className="font-heading text-lg font-semibold text-navy-deep mb-4">
            {t("history")}
          </h2>
          <div className="bg-white rounded-2xl border border-navy-deep/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-deep/10">
                  <th className="text-left text-xs font-medium text-navy-deep/50 uppercase tracking-wider px-6 py-3">{t("colMonth")}</th>
                  <th className="text-left text-xs font-medium text-navy-deep/50 uppercase tracking-wider px-6 py-3">{t("colAmount")}</th>
                  <th className="text-left text-xs font-medium text-navy-deep/50 uppercase tracking-wider px-6 py-3">{t("colStatus")}</th>
                  <th className="text-left text-xs font-medium text-navy-deep/50 uppercase tracking-wider px-6 py-3">{t("colDate")}</th>
                </tr>
              </thead>
              <tbody>
                {memberships.map((m) => (
                  <tr key={m.id} className="border-b border-navy-deep/5 last:border-0">
                    <td className="px-6 py-4 text-sm font-medium text-navy-deep">{formatPeriod(m.period)}</td>
                    <td className="px-6 py-4 text-sm text-navy-deep">
                      {(m.amount_cents / 100).toLocaleString(localeStr)} RON
                    </td>
                    <td className="px-6 py-4">
                      {m.status === "paid" ? (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                          {t("paid")}
                        </span>
                      ) : (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                          {t("unpaid")}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-deep/60">
                      {m.paid_at ? new Date(m.paid_at).toLocaleDateString(localeStr) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
