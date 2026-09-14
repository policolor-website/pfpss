"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export default function ConfidentialitatePage() {
  const t = useTranslations("legal.privacy");
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";

  const sections = [
    { id: "data", title: t("s1.title"), body: t("s1.body") },
    { id: "purpose", title: t("s2.title"), body: t("s2.body") },
    { id: "retention", title: t("s3.title"), body: t("s3.body") },
    { id: "recipients", title: t("s4.title"), body: t("s4.body") },
    { id: "rights", title: t("s5.title"), body: t("s5.body") },
    { id: "transfers", title: t("s6.title"), body: t("s6.body") },
    { id: "auto-verify", title: t("s7.title"), body: t("s7.body") },
    { id: "security", title: t("s8.title"), body: t("s8.body") },
    { id: "minors", title: t("s9.title"), body: t("s9.body") },
    { id: "updates", title: t("s10.title"), body: t("s10.body") },
    { id: "contact", title: t("s11.title"), body: t("s11.body") },
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper">
        <section className="py-16 bg-gold/10">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="flex items-center gap-2 text-sm text-navy-deep/50 mb-6">
              <Link href={prefix || "/"} className="hover:text-navy-deep transition-colors">
                {t("breadcrumb.home")}
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-navy-deep">{t("breadcrumb.privacy")}</span>
            </nav>
            <div className="flex items-center gap-4 mb-4">
              <div className="size-12 rounded-lg bg-navy-deep/5 flex items-center justify-center">
                <ShieldCheck className="size-6 text-navy-deep" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep">
                {t("title")}
              </h1>
            </div>
            <p className="text-navy-deep/60 leading-relaxed max-w-2xl">
              {t("subtitle")}
            </p>
            <p className="text-sm text-navy-deep/40 mt-4">{t("lastUpdated")}</p>
            <div className="mt-6 p-4 rounded-lg bg-white/60 border border-navy-deep/10">
              <p className="text-sm text-navy-deep/70 leading-relaxed">
                <span className="font-semibold text-navy-deep">{t("operatorLabel")}</span>{" "}
                {t("operator")}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-10">
              {sections.map((section, i) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                >
                  <h2 className="font-heading text-xl font-bold text-navy-deep mb-3">
                    {i + 1}. {section.title}
                  </h2>
                  <p className="text-navy-deep/70 leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
