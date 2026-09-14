"use client";

import { useEffect, useState } from "react";
import { PenSquare, Building2, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";

type Signature = {
  id: string;
  petition_slug: string;
  signed_at: string;
  organization: {
    legal_name: string;
    county: string | null;
  };
};

const PETITION_SLUG = "eliminarea-autorizatiei-isu-din-licentiere";

export default function AdminPetitiiPage() {
  const t = useTranslations("admin");
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("petitions_signatures")
        .select(`
          id,
          petition_slug,
          signed_at,
          organization:organizations!inner(legal_name, county)
        `)
        .eq("petition_slug", PETITION_SLUG)
        .order("signed_at", { ascending: false });
      setSignatures((data || []) as unknown as Signature[]);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-navy-deep mb-1">
          {t("peticii.title")}
        </h1>
        <p className="text-navy-deep/50">
          {t("peticii.subtitle")}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-navy-deep/20 border-t-navy-deep rounded-full animate-spin" />
        </div>
      ) : signatures.length === 0 ? (
        <div className="p-12 rounded-xl bg-white border border-navy-deep/10 text-center">
          <div className="size-14 rounded-lg bg-navy-deep/5 flex items-center justify-center mx-auto mb-4">
            <PenSquare className="size-7 text-navy-deep/40" />
          </div>
          <p className="text-sm text-navy-deep/50">
            {t("peticii.noSignatures")}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {signatures.map((sig) => (
            <div
              key={sig.id}
              className="p-5 rounded-xl bg-white border border-navy-deep/10 flex items-center gap-4"
            >
              <div className="size-11 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                <PenSquare className="size-5 text-gold" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-base font-semibold text-navy-deep truncate">
                  {sig.organization?.legal_name || "—"}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-navy-deep/50">
                  <span className="flex items-center gap-1">
                    <Building2 className="size-3" />
                    {sig.organization?.county || "—"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {t("peticii.signedOn")}: {new Date(sig.signed_at).toLocaleDateString("ro-RO")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
