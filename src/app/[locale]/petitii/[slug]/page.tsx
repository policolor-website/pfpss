"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  PenLine,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  FileText,
  Users,
  CheckCircle2,
  LogIn,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { createClient } from "@/lib/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

type Signature = {
  id: string;
  petition_slug: string;
  organization_id: string;
  signed_at: string;
  organization?: {
    legal_name: string;
    county: string | null;
  };
};

const PETITION_SLUG = "eliminarea-autorizatiei-isu-din-licentiere";

export default function PetitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const t = useTranslations("petitiiDetail");
  const tPet = useTranslations("petitii");
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [loading, setLoading] = useState(true);
  const [userOrgSigned, setUserOrgSigned] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      // Load signatures with organization info
      const { data: sigs } = await supabase
        .from("petitions_signatures")
        .select(`
          id,
          petition_slug,
          organization_id,
          signed_at,
          organization:organizations!inner(legal_name, county)
        `)
        .eq("petition_slug", slug)
        .order("signed_at", { ascending: false });

      setSignatures((sigs || []) as unknown as Signature[]);

      // Check if current user's org has signed
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        const { data: org } = await supabase
          .from("organizations")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (org) {
          const hasSigned = (sigs || []).some(
            (s: any) => s.organization_id === org.id
          );
          setUserOrgSigned(hasSigned);
        }
      }

      setLoading(false);
    }
    load();
  }, [slug]);

  // Only one petition exists for now
  if (slug !== PETITION_SLUG) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy-deep mb-4">
              {t("notFound")}
            </h1>
            <Link
              href={`${prefix}/petitii`}
              className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
            >
              <ArrowLeft className="size-4" />
              {t("backToPetitions")}
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const petition = {
    title: tPet("petitions.0.title"),
    description: tPet("petitions.0.description"),
    status: tPet("petitions.0.status"),
    fullText: tPet("petitions.0.fullText"),
    target: tPet("petitions.0.target"),
    legalRef: tPet("petitions.0.legalRef"),
  };

  const paragraphs = petition.fullText.split("\n\n");

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-20 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-navy-deep/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gold/20 pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 relative">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-sm text-navy-deep/50 mb-8"
            >
              <Link href={prefix || "/"} className="hover:text-navy-deep transition-colors">
                {t("breadcrumb.home")}
              </Link>
              <ChevronRight className="size-3.5" />
              <Link
                href={`${prefix}/petitii`}
                className="hover:text-navy-deep transition-colors"
              >
                {t("breadcrumb.petitions")}
              </Link>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6"
            >
              <span className="size-1.5 rounded-full bg-green-600 animate-pulse" />
              <span className="text-xs font-medium text-green-700 uppercase tracking-widest">
                {petition.status}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-navy-deep leading-[1.15] text-balance mb-6"
            >
              {petition.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-navy-deep/70 leading-relaxed max-w-3xl"
            >
              {petition.description}
            </motion.p>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-navy-deep/10">
                <ShieldCheck className="size-4 text-navy-deep/50" />
                <span className="text-sm text-navy-deep/70">
                  {t("target")}: <span className="font-medium text-navy-deep">{petition.target}</span>
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-navy-deep/10">
                <FileText className="size-4 text-navy-deep/50" />
                <span className="text-sm text-navy-deep/70">
                  {t("legalRef")}: <span className="font-medium text-navy-deep">{petition.legalRef}</span>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content + Sidebar */}
        <section className="py-16 bg-paper">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Petition text */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-8 rounded-xl bg-white border border-navy-deep/10">
                  <h2 className="font-heading text-xl font-bold text-navy-deep mb-6 flex items-center gap-2">
                    <div className="w-10 h-px bg-gold" />
                    {t("fullText")}
                  </h2>
                  <div className="space-y-5">
                    {paragraphs.map((para, i) => (
                      <motion.p
                        key={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        variants={fadeUp}
                        custom={i}
                        className="text-base text-navy-deep/75 leading-relaxed"
                      >
                        {para}
                      </motion.p>
                    ))}
                  </div>
                </div>

                {/* Back link */}
                <div className="pt-4">
                  <Link
                    href={`${prefix}/petitii`}
                    className="group inline-flex items-center gap-2 text-navy-deep font-semibold text-sm hover:text-gold transition-colors"
                  >
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    {t("backToPetitions")}
                  </Link>
                </div>
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-6">
                {/* Sign CTA */}
                <div className="p-6 rounded-xl bg-navy-deep sticky top-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-gold/10">
                      <PenLine className="size-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-paper">
                      {t("signAsMember")}
                    </h3>
                  </div>

                  {userOrgSigned ? (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
                      <span className="text-sm text-emerald-300">
                        {t("alreadySigned")}
                      </span>
                    </div>
                  ) : isLoggedIn ? (
                    <Link
                      href={`${prefix}/dashboard/petitii`}
                      className="group inline-flex items-center justify-center gap-2 w-full bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                    >
                      <PenLine className="size-4" />
                      {t("signAsMember")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href={`${prefix}/login?redirect=${encodeURIComponent(`${prefix}/dashboard/petitii`)}`}
                        className="group inline-flex items-center justify-center gap-2 w-full bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                      >
                        <LogIn className="size-4" />
                        {t("loginToSign")}
                      </Link>
                      <p className="text-xs text-paper/40 text-center leading-relaxed">
                        {tPet("infoBanner")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Signatures counter */}
                <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-navy-deep/5">
                      <Users className="size-5 text-navy-deep" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-navy-deep">
                      {loading
                        ? "…"
                        : t("signatures", { count: signatures.length })}
                    </h3>
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center py-6">
                      <div className="size-6 border-2 border-navy-deep/20 border-t-navy-deep rounded-full animate-spin" />
                    </div>
                  ) : signatures.length === 0 ? (
                    <p className="text-sm text-navy-deep/40 text-center py-6">
                      {t("noSignatures")}
                    </p>
                  ) : (
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {signatures.map((sig) => (
                        <div
                          key={sig.id}
                          className="flex items-start gap-3 p-3 rounded-lg bg-paper"
                        >
                          <div className="flex items-center justify-center size-8 rounded-lg bg-gold/10 shrink-0">
                            <CheckCircle2 className="size-4 text-gold" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-navy-deep truncate">
                              {sig.organization?.legal_name || "—"}
                            </p>
                            <p className="text-xs text-navy-deep/40">
                              {sig.organization?.county || ""}
                              {sig.signed_at && (
                                <>
                                  {" · "}
                                  {t("signedOn")}:{" "}
                                  {new Date(sig.signed_at).toLocaleDateString(
                                    locale === "en" ? "en-US" : "ro-RO"
                                  )}
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
