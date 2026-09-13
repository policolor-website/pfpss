"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Scale,
  Award,
  Building2,
  Calendar,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { RomaniaMap } from "@/components/ui/romania-map";
import { LiveBadges } from "@/components/ui/live-badges";
import { AdvocacyChart } from "@/components/charts/advocacy-chart";
import { StandardsChart } from "@/components/charts/standards-chart";
import { RepresentationChart } from "@/components/charts/representation-chart";
import { SectorStatusChart } from "@/components/charts/sector-status-chart";
import { LicensingTimelineChart } from "@/components/charts/licensing-timeline-chart";
import { PfpssActivityChart } from "@/components/charts/pfpss-activity-chart";
import { CamineKpiCards, PrivatPublicChart, CapacitateChart } from "@/components/charts/camine-charts";

const news = [
  {
    date: "23 iulie 2026",
    title:
      "Scrisoare deschisă către Ministerul Muncii: controale orientate către om, nu către hârtii",
    description:
      "PFPSS a transmis oficial Ministerului Muncii (nr. înreg. 61/23.07.2026) o scrisoare deschisă care cere continuarea simplificării procedurilor de licențiere și reorientarea sistemului de control către protejarea efectivă a beneficiarilor — pe fondul scrisorii Comisarului pentru Drepturile Omului al Consiliului Europei adresate Guvernului României.",
    href: "/stiri/scrisoare-deschisa-ministerul-muncii-iulie-2026",
  },
  {
    date: "10 mai 2026",
    title:
      "Casa Alegria — Centru rezidențial pentru vârstnici în Ploiești",
    description:
      "Două centre rezidențiale licențiate în Ploiești, pe strada Tudor Vladimirescu. Cazare, hrană, îngrijiri medicale, recuperare și asistență psihologică — într-o atmosferă caldă, ca acasă.",
    href: "/stiri/casa-alegria-centru-rezidential-pentru-varstnici-in-ploiesti",
  },
  {
    date: "8 mai 2026",
    title:
      "Casa Orizont — Cămin pentru vârstnici în natură, Beleți-Negrești, Argeș",
    description:
      "Cămin pentru vârstnici la poalele Carpaților, în Beleți-Negrești, Argeș. Clădire de epocă restaurată, mobilier de anticariat, grădină de 12.000 mp și îngrijire medicală — pentru o bătrânețe demnă și liniștită.",
    href: "/stiri/casa-orizont-camin-pentru-varstnici-in-natura-beleti-negresti-arges",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

function Typewriter({
  text,
  delay = 80,
  startDelay = 0,
}: {
  text: string;
  delay?: number;
  startDelay?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, delay);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, startDelay]);

  if (!mounted) return <span>{text}</span>;

  return (
    <span>
      {displayed || text}
      {displayed.length < text.length && displayed.length > 0 && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

const axeIcons = [Scale, Award, Building2];
const axeKeys = ["advocacy", "standards", "representation"] as const;
const axeCharts = [<AdvocacyChart key="a" />, <StandardsChart key="s" />, <RepresentationChart key="r" />];

function AxesSection() {
  const t = useTranslations("home.axes");

  const axes = axeKeys.map((key, i) => ({
    icon: axeIcons[i],
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    chart: axeCharts[i],
  }));

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy-deep mb-0 text-balance">
            {t("title")}
          </h2>
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {axes.map((axe, i) => (
            <motion.div
              key={axe.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/40 transition-colors duration-300 hover:shadow-xl hover:shadow-navy-deep/10"
            >
              <div className="size-12 rounded-lg bg-navy-deep/5 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-300">
                <axe.icon className="size-6 text-navy-deep group-hover:text-gold transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-navy-deep mb-3">
                {axe.title}
              </h3>
              <p className="text-sm text-navy-deep/60 leading-relaxed">
                {axe.description}
              </p>
              <div className="mt-6 pt-6 border-t border-navy-deep/10">
                {axe.chart}
                <div className="mt-4">
                  <LiveBadges setIndex={i} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorSection() {
  const t = useTranslations("home.sector");

  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy-deep mb-2 text-balance">
            {t("title")}
          </h2>
          <p className="text-navy-deep/60">
            {t("subtitle")}
          </p>
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/40 transition-colors duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
          >
            <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2">
              {t("homeStatus")}
            </h3>
            <p className="text-xs text-navy-deep/50 mb-6">
              {t("homeStatusDesc")}
            </p>
            <SectorStatusChart />
            <div className="mt-4">
              <LiveBadges setIndex={3} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/40 transition-colors duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
          >
            <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2">
              {t("licensingEvolution")}
            </h3>
            <p className="text-xs text-navy-deep/50 mb-6">
              {t("licensingEvolutionDesc")}
            </p>
            <LicensingTimelineChart />
            <div className="mt-4">
              <LiveBadges setIndex={4} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/40 transition-colors duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
          >
            <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2">
              {t("pfpssActivity")}
            </h3>
            <p className="text-xs text-navy-deep/50 mb-6">
              {t("pfpssActivityDesc")}
            </p>
            <PfpssActivityChart />
            <div className="mt-4">
              <LiveBadges setIndex={5} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-navy-deep/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-navy-deep">42</div>
                <div className="text-xs text-navy-deep/50">{t("petitions")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-navy-deep">18</div>
                <div className="text-xs text-navy-deep/50">{t("officialLetters")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-navy-deep">27</div>
                <div className="text-xs text-navy-deep/50">{t("meetings")}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const t = useTranslations("home");

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-20 pb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-navy-deep/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gold/20 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Left: text */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0}
                className="lg:col-span-4 lg:order-1"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-6">
                  <span className="size-2 rounded-full bg-navy-deep animate-pulse" />
                  <span className="text-xs font-medium text-navy-deep uppercase tracking-widest">
                    {t("badge")}
                  </span>
                </div>
                <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.05] text-balance mb-6">
                  <div className="flex flex-col lg:block">
                    <span className="relative inline-block">
                      <span className="invisible">{t("hero.title1")}</span>
                      <span className="absolute inset-0">
                        <Typewriter text={t("hero.title1")} delay={120} />
                      </span>{" "}
                      {t("hero.title1Suffix")}
                    </span>
                    <span>
                      {" "}
                      <span className="relative inline-block text-[#c9a961]">
                        <span className="invisible">{t("hero.title2")}</span>
                        <span className="absolute inset-0">
                          <Typewriter text={t("hero.title2")} delay={120} startDelay={1400} />
                        </span>
                      </span>{" "}
                      {t("hero.title2Suffix")}
                    </span>
                  </div>
                </h1>
                <p className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl mb-6">
                  {t("hero.description")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/inscriere"
                    className="group inline-flex items-center gap-2 bg-navy-deep text-paper px-8 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20"
                  >
                    {t("hero.becomeMember")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/despre"
                    className="inline-flex items-center gap-2 bg-transparent text-navy-deep px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep/15 transition-all duration-300 hover:bg-navy-deep/5"
                  >
                    {t("hero.aboutPatronat")}
                  </Link>
                </div>
                <p className="mt-6 text-sm text-navy-deep/50">
                  {t("hero.activeMembers")}
                </p>
              </motion.div>

              {/* Right: Romania map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="relative w-full aspect-[720/510] max-h-[700px] mx-auto lg:col-span-8 lg:order-2"
              >
                <RomaniaMap className="text-navy-deep" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scrisoare deschisă highlight */}
        <section className="relative -mt-16 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-2xl bg-navy-deep p-8 md:p-12 shadow-xl shadow-navy-deep/10"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: "0 0 0 1px rgba(201, 169, 97, 0.4)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 0 1px rgba(201, 169, 97, 0.2), 0 0 20px 0px rgba(201, 169, 97, 0.05)",
                    "0 0 0 1px rgba(201, 169, 97, 0.5), 0 0 30px 4px rgba(201, 169, 97, 0.15)",
                    "0 0 0 1px rgba(201, 169, 97, 0.2), 0 0 20px 0px rgba(201, 169, 97, 0.05)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 30%, rgba(201, 169, 97, 0.12) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["200% 0%", "-200% 0%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/10 pointer-events-none" />
              <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold mb-3 block">
                    {t("openLetter.badge")}
                  </span>
                  <p className="text-paper text-lg leading-relaxed max-w-3xl">
                    {t("openLetter.text")}
                  </p>
                </div>
                <Link
                  href="/stiri/scrisoare-deschisa-ministerul-muncii-iulie-2026"
                  className="group inline-flex items-center gap-2 bg-paper text-navy-deep text-sm font-semibold px-6 py-3 rounded-sm ring-1 ring-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-paper/20 whitespace-nowrap"
                >
                  {t("openLetter.readLetter")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Demnitate, profesionalism și predictibilitate */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-6 text-balance">
                  {t("dignity.title")}
                </h2>
                <p className="text-navy-deep/70 text-lg leading-relaxed mb-8">
                  {t("dignity.description")}
                </p>
                <Link
                  href="/despre"
                  className="group inline-flex items-center gap-2 bg-transparent text-navy-deep px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep/20 transition-all duration-300 hover:bg-navy-deep/5"
                >
                  {t("dignity.aboutPatronat")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gold/10 rounded-2xl rotate-3 transition-transform duration-500" />
                <video
                  src="/care-hands.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="relative rounded-2xl shadow-xl shadow-navy-deep/10 w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cămine autorizate — secțiune cu grafice profesionale */}
        <section className="py-16 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4 text-balance">
                  {t("careHomes.title")}
                </h2>
                <p className="text-navy-deep/60 max-w-2xl mx-auto">
                  {t("careHomes.description")}
                </p>
              </div>

              <div className="mb-10">
                <CamineKpiCards />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-xl border border-navy-deep/10 p-6"
                >
                  <h3 className="font-heading text-lg font-semibold text-navy-deep mb-1">
                    {t("careHomes.privateVsPublic")}
                  </h3>
                  <p className="text-xs text-navy-deep/50 mb-4">
                    {t("careHomes.privateVsPublicDesc")}
                  </p>
                  <PrivatPublicChart />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-xl border border-navy-deep/10 p-6"
                >
                  <h3 className="font-heading text-lg font-semibold text-navy-deep mb-1">
                    {t("careHomes.capacityDist")}
                  </h3>
                  <p className="text-xs text-navy-deep/50 mb-4">
                    {t("careHomes.capacityDistDesc")}
                  </p>
                  <CapacitateChart />
                </motion.div>
              </div>

              <div className="text-center">
                <Link
                  href="/camine-autorizate"
                  className="group inline-flex items-center gap-2 bg-navy-deep text-white px-8 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 hover:bg-navy-deep/90 hover:shadow-lg hover:shadow-navy-deep/20"
                >
                  {t("careHomes.viewFullList")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trei axe de lucru — grid to stack */}
        <AxesSection />

        {/* Poziții publice & Știri */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
              className="flex flex-wrap items-end justify-between gap-4 mb-12"
            >
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy-deep mb-2">
                  {t("news.title")}
                </h2>
                <p className="text-navy-deep/60">
                  {t("news.subtitle")}
                </p>
              </div>
              <Link
                href="/stiri"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors"
              >
                {t("news.viewArchive")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {news.map((article, i) => (
                <motion.div
                  key={article.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link
                    href={article.href as any}
                    className="group block h-full p-6 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-deep/5"
                  >
                    <div className="flex items-center gap-2 text-xs text-navy-deep/50 mb-4">
                      <Calendar className="size-3.5" />
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-navy-deep mb-3 leading-snug group-hover:text-gold transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-sm text-navy-deep/60 leading-relaxed line-clamp-4">
                      {article.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Starea sectorului în cifre */}
        <SectorSection />

        {/* CTA final */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
              className="relative overflow-hidden bg-navy-deep rounded-2xl p-10 md:p-14 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/10 pointer-events-none" />
              <div className="relative">
                <h2 className="font-heading text-3xl md:text-4xl text-paper mb-6 text-balance">
                  {t("cta.title")}
                </h2>
                <p className="text-paper/70 max-w-[48ch] mx-auto mb-10">
                  {t("cta.description")}
                </p>
                <Link
                  href="/inscriere"
                  className="group relative inline-flex bg-paper text-navy-deep text-sm font-semibold px-8 py-3 rounded-sm ring-1 ring-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-paper/20 items-center gap-2"
                >
                  {t("cta.becomeMemberToday")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
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
