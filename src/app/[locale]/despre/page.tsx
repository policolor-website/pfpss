"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Scale,
  Award,
  Users,
  FileText,
  Shield,
  Lightbulb,
  Heart,
  Handshake,
  Target,
  Eye,
  Download,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CamineKpiCards, PrivatPublicChart } from "@/components/charts/camine-charts";
import { GapAnalysisChart } from "@/components/charts/gap-analysis-chart";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const directionIcons = [Scale, Award, Users];
const valueIcons = [Award, Lightbulb, Shield, Handshake, Heart];

const team = [
  {
    name: "Katia-Constanța Cicală",
    roleKey: "team.roles.katia",
    descKey: "team.descriptions.katia",
    photo: "/team/katia-cicala.jpg",
  },
  {
    name: "Georgeta-Liliana Folea",
    roleKey: "team.roles.georgeta",
    descKey: "team.descriptions.georgeta",
    photo: "/team/georgeta-folea.jpeg",
  },
  {
    name: "Loredana Maghiar",
    roleKey: "team.roles.loredana",
    descKey: "team.descriptions.loredana",
    photo: "/team/loredana-maghiar.jpg",
  },
  {
    name: "Tania Ivan",
    roleKey: "team.roles.tania",
    descKey: "team.descriptions.tania",
    photo: "/team/tania-ivan.jpg",
  },
];

const documents = [
  {
    titleKey: "documents.openLetter.title",
    descKey: "documents.openLetter.description",
    href: "https://pfpss.ro/documents/scrisoare-deschisa-ministerul-muncii-2026-07-23.pdf",
  },
];

export default function DesprePage() {
  const t = useTranslations("despre");
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";

  const directions = directionIcons.map((icon, i) => ({
    icon,
    title: t(`directions.${i}.title`),
    description: t(`directions.${i}.description`),
  }));

  const values = valueIcons.map((icon, i) => ({
    num: String(i + 1).padStart(2, "0"),
    icon,
    title: t(`values.${i}.title`),
    description: t(`values.${i}.description`),
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
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/5 border border-navy-deep/10 mb-6"
                >
                  <span className="size-2 rounded-full bg-gold animate-pulse" />
                  <span className="text-xs font-medium text-navy-deep/70 uppercase tracking-widest">
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
                  className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl mx-auto lg:mx-0"
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
                  src="/despre.png"
                  alt={t("hero.imageAlt")}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Misiune & Viziune */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={0}
                className="p-8 md:p-10 rounded-xl border border-navy-deep/10 bg-paper"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10">
                    <Target className="size-6 text-gold" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep">
                    {t("mission.title")}
                  </h2>
                </div>
                <p className="text-navy-deep/70 leading-relaxed">
                  {t("mission.description")}
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={1}
                className="p-8 md:p-10 rounded-xl border border-navy-deep/10 bg-paper"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10">
                    <Eye className="size-6 text-gold" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep">
                    {t("vision.title")}
                  </h2>
                </div>
                <p className="text-navy-deep/70 leading-relaxed">
                  {t("vision.description")}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trei direcții */}
        <section className="py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4 text-balance">
                {t("directionsTitle")}
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {directions.map((dir, i) => (
                <motion.div
                  key={dir.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
                >
                  <div className="flex items-center justify-center size-14 rounded-lg bg-navy-deep/5 mb-5">
                    <dir.icon className="size-7 text-navy-deep" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-navy-deep mb-3">
                    {dir.title}
                  </h3>
                  <p className="text-navy-deep/60 leading-relaxed">
                    {dir.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Valorile */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4 text-balance">
                {t("valuesTitle")}
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {values.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-6 rounded-xl border border-navy-deep/10 bg-paper hover:border-gold/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10">
                      <val.icon className="size-6 text-gold" />
                    </div>
                    <span className="font-heading text-2xl font-bold text-navy-deep/15">
                      {val.num}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-navy-deep/60 leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Angajamentul */}
        <section className="py-20 bg-paper">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-6 text-balance">
                {t("commitment.title")}
              </h2>
              <p className="text-lg text-navy-deep/70 leading-relaxed mb-6">
                {t("commitment.description1")}
              </p>
              <p className="text-lg text-navy-deep/70 leading-relaxed mb-8">
                {t("commitment.description2")}
              </p>
              <Link
                href={`${prefix}/inscriere`}
                className="group inline-flex items-center gap-2 bg-navy-deep text-paper px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20"
              >
                {t("commitment.join")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Documente publice */}
        <section className="py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <FileText className="size-8 text-gold" />
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep text-balance">
                  {t("documents.title")}
                </h2>
              </div>
              <p className="text-navy-deep/60">
                {t("documents.subtitle")}
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={1}
                className="mb-8"
              >
                <h3 className="font-heading text-xl font-semibold text-navy-deep mb-4">
                  {t("documents.publicPositions")}
                </h3>
                {documents.map((doc) => (
                  <a
                    key={doc.titleKey}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10 shrink-0">
                        <Download className="size-6 text-gold" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading text-lg font-semibold text-navy-deep mb-2 group-hover:text-gold transition-colors">
                          {t(doc.titleKey)}
                        </h4>
                        <p className="text-sm text-navy-deep/60 leading-relaxed">
                          {t(doc.descKey)}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                          {t("documents.open")}
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={2}
                className="p-6 rounded-xl border border-navy-deep/10 bg-white"
              >
                <h3 className="font-heading text-xl font-semibold text-navy-deep mb-3">
                  {t("documents.membersOnly.title")}
                </h3>
                <p className="text-navy-deep/60 leading-relaxed mb-4">
                  {t("documents.membersOnly.description")}
                </p>
                <Link
                  href={`${prefix}/login`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors"
                >
                  {t("documents.membersOnly.login")}
                  <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Date statistice — 2 grafice */}
        <section className="py-16 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-xl border border-navy-deep/10 p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-navy-deep mb-1">
                  {t("stats.licensedHomes")}
                </h3>
                <p className="text-xs text-navy-deep/50 mb-4">
                  {t("stats.licensedHomesDesc")}
                </p>
                <PrivatPublicChart />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-xl border border-navy-deep/10 p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-navy-deep mb-1">
                  {t("stats.gapAnalysis")}
                </h3>
                <p className="text-xs text-navy-deep/50 mb-4">
                  {t("stats.gapAnalysisDesc")}
                </p>
                <GapAnalysisChart />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Conducerea */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/5 border border-navy-deep/10 mb-6">
                <span className="size-2 rounded-full bg-gold animate-pulse" />
                <span className="text-xs font-medium text-navy-deep/70 uppercase tracking-widest">
                  {t("team.badge")}
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy-deep mb-4 text-balance">
                {t("team.title")}
              </h2>
              <p className="text-navy-deep/60 leading-relaxed">
                {t("team.subtitle")}
              </p>
            </motion.div>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={1}
              className="text-center max-w-3xl mx-auto mb-16 text-navy-deep/50 leading-relaxed text-sm"
            >
              {t("team.description")}
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="group relative rounded-2xl overflow-hidden bg-paper ring-1 ring-navy-deep/10 hover:ring-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-navy-deep/10"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="w-10 h-0.5 bg-gold mb-3 transition-all duration-500 group-hover:w-16" />
                      <h3 className="font-heading text-lg font-semibold text-paper leading-tight mb-1">
                        {member.name}
                      </h3>
                      <p className="text-xs font-medium text-gold/90 uppercase tracking-wide">
                        {t(member.roleKey)}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-navy-deep/60 leading-relaxed">
                      {t(member.descKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                {t("cta.title")}
              </h2>
              <p className="text-navy-deep/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                {t("cta.description")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={`${prefix}/inscriere`}
                  className="group inline-flex items-center gap-2 bg-navy-deep text-paper px-8 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20"
                >
                  {t("cta.becomeMember")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={`${prefix}/contact`}
                  className="inline-flex items-center gap-2 bg-transparent text-navy-deep px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep/20 transition-all duration-300 hover:bg-navy-deep/5"
                >
                  {t("cta.contactTeam")}
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
