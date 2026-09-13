"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Scale,
  ShieldCheck,
  FileCheck,
  Award,
  Users,
  Gavel,
  Network,
  GraduationCap,
  RefreshCw,
  Megaphone,
  ClipboardList,
  Search,
  ThumbsUp,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const criteriaIcons = [ShieldCheck, FileCheck, Award, Scale, CheckCircle2];
const benefitsIcons = [Gavel, Scale, Network, GraduationCap, RefreshCw, Megaphone];
const stepsIcons = [ClipboardList, Search, ThumbsUp, KeyRound];

export default function MembriPage() {
  const t = useTranslations("membri");
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";

  const criteria = criteriaIcons.map((icon, i) => ({
    icon,
    title: t(`criteria.${i}.title`),
    description: t(`criteria.${i}.description`),
  }));

  const benefits = benefitsIcons.map((icon, i) => ({
    icon,
    title: t(`benefits.${i}.title`),
    description: t(`benefits.${i}.description`),
  }));

  const steps = stepsIcons.map((icon, i) => ({
    num: String(i + 1).padStart(2, "0"),
    icon,
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
  }));

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-24 pb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-deep/10 rounded-full blur-[120px]" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-8"
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
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.05] text-balance mb-6"
                >
                  {t("hero.title")}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-lg md:text-xl text-navy-deep/70 leading-relaxed max-w-2xl"
                >
                  {t("hero.description")}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex flex-wrap gap-4 mt-10"
                >
                  <Link
                    href={`${prefix}/inscriere`}
                    className="group inline-flex items-center gap-2 bg-navy-deep text-paper px-7 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20"
                  >
                    {t("hero.requestMembership")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href={`${prefix}/despre`}
                    className="inline-flex items-center gap-2 bg-transparent text-navy-deep px-7 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep/15 transition-all duration-300 hover:bg-navy-deep/5"
                  >
                    {t("hero.aboutPfpss")}
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-navy-deep/10"
              >
                <Image
                  src="/membrii.png"
                  alt={t("hero.imageAlt")}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Criterii de aderare */}
        <section className="py-24 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="max-w-2xl mb-14"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-gold" />
                <span className="text-xs font-semibold text-gold uppercase tracking-widest">
                  {t("criteriaBadge")}
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy-deep leading-tight text-balance">
                {t("criteriaTitle")}
              </h2>
              <p className="text-navy-deep/60 mt-4 leading-relaxed">
                {t("criteriaDescription")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {criteria.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="group relative p-7 rounded-xl bg-white border border-navy-deep/8 hover:border-gold/40 transition-all duration-400 hover:shadow-xl hover:shadow-navy-deep/5"
                >
                  <div className="flex items-center justify-center size-12 rounded-lg bg-navy-deep/5 group-hover:bg-gold/10 transition-colors duration-400 mb-5">
                    <item.icon className="size-6 text-navy-deep group-hover:text-gold transition-colors duration-400" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-navy-deep mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-navy-deep/55 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="absolute top-7 right-7 font-heading text-3xl font-bold text-navy-deep/[0.04] group-hover:text-gold/10 transition-colors duration-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Beneficiile */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="max-w-2xl mb-14"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-gold" />
                <span className="text-xs font-semibold text-gold uppercase tracking-widest">
                  {t("benefitsBadge")}
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy-deep leading-tight text-balance">
                {t("benefitsTitle")}
              </h2>
              <p className="text-navy-deep/60 mt-4 leading-relaxed">
                {t("benefitsDescription")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="group relative p-7 rounded-xl bg-paper border border-navy-deep/8 hover:shadow-xl hover:shadow-navy-deep/8 transition-all duration-400 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center size-11 rounded-lg bg-gold/10 shrink-0 group-hover:bg-gold group-hover:scale-110 transition-all duration-400">
                      <item.icon className="size-5 text-gold group-hover:text-navy-deep transition-colors duration-400" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-navy-deep mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-navy-deep/55 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Patru pași — Timeline */}
        <section className="py-24 bg-navy-deep relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/[0.04] rounded-full blur-[120px]" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
                <span className="size-2 rounded-full bg-gold animate-pulse" />
                <span className="text-xs font-medium text-gold uppercase tracking-widest">
                  {t("stepsBadge")}
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-paper leading-tight text-balance mb-4">
                {t("stepsTitle")}
              </h2>
              <p className="text-paper/50 leading-relaxed">
                {t("stepsDescription")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="relative"
                >
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] right-[-1rem] h-px bg-gradient-to-r from-gold/30 to-transparent" />
                  )}

                  <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-gold/20 transition-all duration-400 hover:bg-white/[0.05]">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center justify-center size-14 rounded-xl bg-gold/10 border border-gold/20">
                        <step.icon className="size-6 text-gold" />
                      </div>
                      <span className="font-heading text-4xl font-bold text-white/[0.06]">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-paper mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-paper/45 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="relative rounded-3xl overflow-hidden bg-navy-deep p-12 md:p-16"
            >
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/[0.06] rounded-full blur-[80px]" />
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-px bg-gold" />
                  <span className="text-xs font-semibold text-gold uppercase tracking-widest">
                    {t("ctaBadge")}
                  </span>
                </div>
                <h2 className="font-heading text-3xl md:text-5xl font-bold text-paper leading-tight text-balance mb-5">
                  {t("ctaTitle")}
                </h2>
                <p className="text-lg text-paper/60 leading-relaxed mb-8">
                  {t("ctaDescription")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`${prefix}/inscriere`}
                    className="group inline-flex items-center gap-2 bg-gold text-navy-deep px-8 py-4 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/20"
                  >
                    {t("ctaRequestMembership")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href={`${prefix}/contact`}
                    className="inline-flex items-center gap-2 bg-transparent text-paper px-8 py-4 rounded-sm font-semibold text-sm ring-1 ring-paper/15 transition-all duration-300 hover:bg-paper/5"
                  >
                    {t("ctaQuestions")}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
