"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Megaphone,
  FileText,
  ShieldCheck,
  Sparkles,
  PenLine,
  AlertCircle,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stepsIcons = [FileText, ShieldCheck, Megaphone];

export default function PetitiiPage() {
  const t = useTranslations("petitii");
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";

  const petitions = [
    {
      number: "01",
      title: t("petitions.0.title"),
      description: t("petitions.0.description"),
      href: `${prefix}/petitii/eliminarea-autorizatiei-isu-din-licentiere`,
      status: t("petitions.0.status"),
    },
  ];

  const steps = stepsIcons.map((icon, i) => ({
    icon,
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
  }));

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-20 pb-24">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-navy-deep/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gold/20 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-6"
                >
                  <Sparkles className="size-3.5 text-navy-deep" />
                  <span className="text-xs font-medium text-navy-deep uppercase tracking-widest">
                    {t("badge")}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6"
                >
                  {t("hero.title")}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl"
                >
                  {t("hero.description")}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-navy-deep/10"
              >
                <Image
                  src="/petitii.png"
                  alt={t("badge")}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cum funcționează */}
        <section className="py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="max-w-2xl mb-14"
            >
              <div className="w-12 h-px bg-gold mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep leading-tight text-balance">
                {t("howTitle")}
              </h2>
              <p className="text-navy-deep/60 mt-4 leading-relaxed">
                {t("howDescription")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-center size-14 rounded-lg bg-navy-deep/5 mb-5">
                    <step.icon className="size-7 text-navy-deep" />
                  </div>
                  <span className="font-heading text-2xl font-bold text-navy-deep/15 mb-2 block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-navy-deep/60 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Petiții active */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="max-w-2xl mb-14"
            >
              <div className="w-12 h-px bg-gold mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep leading-tight text-balance">
                {t("activeTitle")}
              </h2>
            </motion.div>

            <div className="space-y-6">
              {petitions.map((pet, i) => (
                <motion.div
                  key={pet.number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link
                    href={pet.href}
                    className="group block p-8 md:p-10 rounded-xl border border-navy-deep/10 bg-paper hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex items-center justify-center size-14 rounded-lg bg-gold/10 shrink-0">
                        <PenLine className="size-7 text-gold" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-heading text-sm font-bold text-navy-deep/30">
                            {t("petitionNumber", { number: pet.number })}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-700 text-xs font-semibold">
                            <span className="size-1.5 rounded-full bg-green-600 animate-pulse" />
                            {pet.status}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl md:text-2xl font-semibold text-navy-deep mb-3 group-hover:text-gold transition-colors">
                          {pet.title}
                        </h3>
                        <p className="text-sm md:text-base text-navy-deep/60 leading-relaxed mb-4">
                          {pet.description}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                          {t("viewAndSign")}
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Info banner */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={petitions.length + 1}
              className="mt-8 p-6 rounded-xl border border-navy-deep/10 bg-navy-deep/[0.02] flex items-start gap-4"
            >
              <AlertCircle className="size-6 text-gold shrink-0 mt-0.5" />
              <p className="text-sm text-navy-deep/70 leading-relaxed">
                {t("infoBanner")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 bg-gold/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4 text-balance">
                {t("ctaTitle")}
              </h2>
              <p className="text-navy-deep/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                {t("ctaDescription")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={`${prefix}/contact`}
                  className="group inline-flex items-center gap-2 bg-navy-deep text-paper px-8 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20"
                >
                  {t("ctaContact")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={`${prefix}/advocacy`}
                  className="inline-flex items-center gap-2 bg-transparent text-navy-deep px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep/20 transition-all duration-300 hover:bg-navy-deep/5"
                >
                  {t("ctaAllCampaigns")}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
