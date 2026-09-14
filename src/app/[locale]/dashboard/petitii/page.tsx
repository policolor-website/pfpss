"use client";

import { useEffect, useState } from "react";
import { PenSquare, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type Petition = {
  slug: string;
  titleKey: string;
  descKey: string;
  href: string;
};

const petitions: Petition[] = [
  {
    slug: "eliminarea-autorizatiei-isu-din-licentiere",
    titleKey: "petitions.0.title",
    descKey: "petitions.0.description",
    href: "/petitii",
  },
];

export default function PetitiiPage() {
  const t = useTranslations("dashboard.petitii");
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";
  const [signedSlugs, setSignedSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState<string | null>(null);
  const [orgId, setOrgId] = useState("");

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
        .from("petitions_signatures")
        .select("petition_slug")
        .eq("organization_id", org?.id || "");
      setSignedSlugs((data || []).map((s) => s.petition_slug));
      setLoading(false);
    }
    load();
  }, []);

  async function handleSign(slug: string) {
    setSigning(slug);
    const supabase = createClient();
    const { error } = await supabase
      .from("petitions_signatures")
      .insert({ petition_slug: slug, organization_id: orgId });

    if (error) {
      if (error.code === "23505") {
        toast.error(t("alreadySigned"));
      } else {
        toast.error(t("signError"));
      }
    } else {
      setSignedSlugs([...signedSlugs, slug]);
      toast.success(t("signSuccess"));
    }
    setSigning(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 border-2 border-navy-deep/20 border-t-navy-deep rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-lg bg-navy-deep/5 flex items-center justify-center">
          <PenSquare className="size-5 text-navy-deep" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-deep">{t("title")}</h1>
          <p className="text-sm text-navy-deep/50">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {petitions.length === 0 ? (
        <p className="text-sm text-navy-deep/40 py-12 text-center">
          {t("noPetitions")}
        </p>
      ) : (
        <div className="space-y-4">
          {petitions.map((p) => {
            const signed = signedSlugs.includes(p.slug);
            return (
              <div
                key={p.slug}
                className="p-6 rounded-xl bg-white border border-navy-deep/10"
              >
                <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2">
                  {t(p.titleKey)}
                </h3>
                <p className="text-sm text-navy-deep/60 leading-relaxed mb-4">
                  {t(p.descKey)}
                </p>
                {signed ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">{t("signed")}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSign(p.slug)}
                    disabled={signing === p.slug}
                    className="inline-flex items-center gap-2 bg-navy-deep text-paper px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-navy-light transition-colors disabled:opacity-50"
                  >
                    {signing === p.slug ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <PenSquare className="size-4" />
                    )}
                    {t("sign")}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
