"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  ArrowRight,
  Scale,
  Award,
  Building2,
  Calendar,
} from "lucide-react";
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

const axes = [
  {
    icon: Scale,
    title: "Advocacy legislativ",
    description:
      "Monitorizăm cadrul legal, purtăm dialog instituțional și redactăm opinii juridice relevante pentru modificarea legislației — pentru un mediu echitabil și predictibil pentru furnizorii privați.",
    chart: <AdvocacyChart />,
  },
  {
    icon: Award,
    title: "Standarde de calitate",
    description:
      "Dezvoltăm ghiduri de bune practici și certificări interne care depășesc normele minime impuse de stat.",
    chart: <StandardsChart />,
  },
  {
    icon: Building2,
    title: "Reprezentare instituțională",
    description:
      "Facilităm dialogul între sectorul privat și Ministerul Muncii pentru îmbunătățirea sistemului de asistență socială.",
    chart: <RepresentationChart />,
  },
];

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

function StackCard({
  children,
  index,
  progress,
}: {
  children: React.ReactNode;
  index: number;
  progress: MotionValue<number>;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const x = useTransform(progress, (latest) => {
    if (latest < 0.35 || !isDesktop) return 0;
    const t = Math.min((latest - 0.35) / 0.3, 1);
    return t * (index === 0 ? 420 : index === 2 ? -420 : 0);
  });

  const y = useTransform(progress, (latest) => {
    if (latest < 0.45 || isDesktop) return 0;
    const t = Math.min((latest - 0.45) / 0.35, 1);
    return t * (index === 0 ? 280 : index === 2 ? -280 : 0);
  });

  const scale = useTransform(progress, [0, 0.35, 0.7], [1, 1, 0.88 - index * 0.04]);
  const opacity = useTransform(progress, [0, 0.35, 0.7, 1], [1, 1, 0.6, 0.4]);

  return (
    <motion.div style={{ x, y, scale, opacity, zIndex: index + 1 }} className="relative">
      {children}
    </motion.div>
  );
}

function AxesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section className="py-0">
      <section ref={ref} className="relative h-[250vh] md:h-[160vh]">
        <div className="sticky top-0 flex flex-col justify-center overflow-hidden py-16">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-8"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy-deep mb-0 text-balance">
                Trei axe de lucru pentru un sistem demn de îngrijire
              </h2>
            </motion.div>
          </div>

          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6 perspective-1000">
              {axes.map((axe, i) => (
                <StackCard key={axe.title} index={i} progress={scrollYProgress}>
                  <motion.div
                    initial={{ opacity: 0, rotateY: 75, y: 80 }}
                    whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 1.4,
                      delay: i * 0.3,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    whileHover={{ rotateY: 12, scale: 1.03, transition: { duration: 0.4 } }}
                    className="group p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-colors duration-300 hover:shadow-xl hover:shadow-navy-deep/10 [transform-style:preserve-3d]"
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
                </StackCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

function SectorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section className="py-0 bg-paper">
      <section ref={ref} className="relative h-[250vh] md:h-[160vh]">
        <div className="sticky top-0 flex flex-col justify-center overflow-hidden py-16">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-2xl mx-auto mb-8"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy-deep mb-2 text-balance">
                Starea sectorului în cifre
              </h2>
              <p className="text-navy-deep/60">
                Date actualizate despre căminele private de îngrijire a vârstnicilor din România
              </p>
            </motion.div>
          </div>

          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <StackCard key="statut" index={0} progress={scrollYProgress}>
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
                  className="p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
                >
                  <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2">
                    Statutul căminelor
                  </h3>
                  <p className="text-xs text-navy-deep/50 mb-6">
                    Total: 1.142 cămine private în România
                  </p>
                  <SectorStatusChart />
                  <div className="mt-4">
                    <LiveBadges setIndex={3} />
                  </div>
                </motion.div>
              </StackCard>

              <StackCard key="licentieri" index={1} progress={scrollYProgress}>
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                  className="p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
                >
                  <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2">
                    Evoluția licențierilor
                  </h3>
                  <p className="text-xs text-navy-deep/50 mb-6">
                    Licențe emise vs. retrase (2022–2026)
                  </p>
                  <LicensingTimelineChart />
                  <div className="mt-4">
                    <LiveBadges setIndex={4} />
                  </div>
                </motion.div>
              </StackCard>

              <StackCard key="activitate" index={2} progress={scrollYProgress}>
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  className="p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
                >
                  <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2">
                    Activitatea PFPSS
                  </h3>
                  <p className="text-xs text-navy-deep/50 mb-6">
                    Acțiuni lunare: petiții, scrisori, întâlniri
                  </p>
                  <PfpssActivityChart />
                  <div className="mt-4">
                    <LiveBadges setIndex={5} />
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-navy-deep/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-navy-deep">42</div>
                      <div className="text-xs text-navy-deep/50">Petiții</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-navy-deep">18</div>
                      <div className="text-xs text-navy-deep/50">Scrisori oficiale</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-navy-deep">27</div>
                      <div className="text-xs text-navy-deep/50">Întâlniri</div>
                    </div>
                  </div>
                </motion.div>
              </StackCard>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-20 pb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          {/* Navy glow */}
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
                    Patronatul Furnizorilor Privați de Servicii Sociale din România
                  </span>
                </div>
                <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.05] text-balance mb-6">
                  <div className="flex flex-col lg:block">
                    <span className="relative inline-block">
                      <span className="invisible">Reprezentăm</span>
                      <span className="absolute inset-0">
                        <Typewriter text="Reprezentăm" delay={120} />
                      </span>{" "}
                      căminele.
                    </span>
                    <span>
                      {" "}
                      <span className="relative inline-block text-[#c9a961]">
                        <span className="invisible">Transformăm</span>
                        <span className="absolute inset-0">
                          <Typewriter text="Transformăm" delay={120} startDelay={1400} />
                        </span>
                      </span>{" "}
                      sistemul.
                    </span>
                  </div>
                </h1>
                <p className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl mb-6">
                  Reprezentăm furnizorii privați de servicii sociale în dialogul
                  cu autoritățile publice, asigurând un cadru legislativ
                  sustenabil și demn pentru centrele rezidențiale.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/inscriere"
                    className="group inline-flex items-center gap-2 bg-navy-deep text-paper px-8 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20"
                  >
                    Devino membru
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/despre"
                    className="inline-flex items-center gap-2 bg-transparent text-navy-deep px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep/15 transition-all duration-300 hover:bg-navy-deep/5"
                  >
                    Despre patronat
                  </Link>
                </div>
                <p className="mt-6 text-sm text-navy-deep/50">
                  Membri activi reprezentați la nivel național
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
              {/* Pulsing glow border */}
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
              {/* Shimmer gold effect */}
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
                    Scrisoare deschisă către Ministerul Muncii
                  </span>
                  <p className="text-paper text-lg leading-relaxed max-w-3xl">
                    PFPSS a transmis oficial ministrului Muncii solicitarea de
                    a continua simplificarea licențierii și de a orienta
                    controalele către protejarea efectivă a beneficiarilor — nu
                    către hârtii. Demersul se sprijină pe scrisoarea
                    Comisarului pentru Drepturile Omului al Consiliului Europei.
                  </p>
                </div>
                <Link
                  href="/stiri/scrisoare-deschisa-ministerul-muncii-iulie-2026"
                  className="group inline-flex items-center gap-2 bg-paper text-navy-deep text-sm font-semibold px-6 py-3 rounded-sm ring-1 ring-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-paper/20 whitespace-nowrap"
                >
                  Citește scrisoarea
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
                  Demnitate, profesionalism și predictibilitate pentru fiecare
                  beneficiar
                </h2>
                <p className="text-navy-deep/70 text-lg leading-relaxed mb-8">
                  Centrele rezidențiale private acoperă astăzi un deficit pe care
                  statul nu îl poate susține singur. PFPSS militează pentru un
                  parteneriat real public-privat, în care vârstnicii beneficiază
                  de servicii sigure, transparente și finanțate echitabil.
                </p>
                <Link
                  href="/despre"
                  className="group inline-flex items-center gap-2 bg-transparent text-navy-deep px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep/20 transition-all duration-300 hover:bg-navy-deep/5"
                >
                  Despre patronat
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

        {/* Cămine autorizate — secțiune */}
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
                  Cămine autorizate în România
                </h2>
                <p className="text-navy-deep/60 max-w-2xl mx-auto">
                  Lista oficială a căminelor pentru persoane vârstnice licențiate
                  de Ministerul Muncii, Familiei, Tineretului și Solidarității
                  Sociale
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
                <div className="bg-white rounded-xl border border-navy-deep/10 p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-navy-deep">
                    792
                  </div>
                  <div className="text-xs text-navy-deep/50 uppercase tracking-wide mt-1">
                    Total cămine
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-navy-deep/10 p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-navy-deep">
                    672
                  </div>
                  <div className="text-xs text-navy-deep/50 uppercase tracking-wide mt-1">
                    Private
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-navy-deep/10 p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-navy-deep">
                    120
                  </div>
                  <div className="text-xs text-navy-deep/50 uppercase tracking-wide mt-1">
                    Publice
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-navy-deep/10 p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-navy-deep">
                    42
                  </div>
                  <div className="text-xs text-navy-deep/50 uppercase tracking-wide mt-1">
                    Județe
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/camine-autorizate"
                  className="group inline-flex items-center gap-2 bg-navy-deep text-white px-8 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 hover:bg-navy-deep/90 hover:shadow-lg hover:shadow-navy-deep/20"
                >
                  Vezi detalii
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
                  Poziții publice & Știri
                </h2>
                <p className="text-navy-deep/60">
                  Ultimele articole și poziții oficiale ale PFPSS
                </p>
              </div>
              <Link
                href="/stiri"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors"
              >
                Vezi toată arhiva
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
                    href={article.href}
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
                  Vocea ta contează în fața autorităților
                </h2>
                <p className="text-paper/70 max-w-[48ch] mx-auto mb-10">
                  Alătură-te comunității PFPSS pentru consultanță juridică,
                  reprezentare instituțională și acces la rețeaua noastră de
                  furnizori.
                </p>
                <Link
                  href="/inscriere"
                  className="group relative inline-flex bg-paper text-navy-deep text-sm font-semibold px-8 py-3 rounded-sm ring-1 ring-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-paper/20 items-center gap-2"
                >
                  Devino membru astăzi
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
