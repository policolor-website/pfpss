"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Megaphone,
  FileText,
  Gavel,
  TrendingUp,
  ClipboardList,
  Scale,
  Sparkles,
  ChevronRight,
} from "lucide-react";
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

const campaigns = [
  {
    icon: FileText,
    badge: "Iulie 2026",
    title:
      "Scrisoare deschisă către Ministerul Muncii: licențiere simplă, controale orientate către om",
    description:
      "Solicitare oficială (nr. 61/23.07.2026) pentru continuarea simplificării licențierii, finanțare neutră față de forma juridică și inspecții centrate pe drepturile beneficiarilor.",
    href: "/stiri/scrisoare-deschisa-ministerul-muncii-iulie-2026",
    external: false,
  },
  {
    icon: Megaphone,
    badge: "Petiție publică",
    title:
      "STOP abuzurilor statului asupra centrelor rezidențiale de bătrâni",
    description:
      "Cerem Guvernului revizuirea reglementărilor care afectează negativ centrele rezidențiale private.",
    href: "https://www.petitieonline.com/stop_abuzurilor_statului_asupra_centrelor_rezidentiale_de_btrani",
    external: true,
  },
  {
    icon: TrendingUp,
    badge: "Propunere",
    title: "Indexarea costului standard per beneficiar cu inflația",
    description:
      "Sustenabilitatea financiară a serviciilor depinde de o finanțare corelată cu realitatea economică.",
    href: null,
    external: false,
  },
  {
    icon: ClipboardList,
    badge: "2023",
    title: "Simplificarea procedurilor de acreditare 2023",
    description:
      "Reducerea birocrației pentru centrele mici și mijlocii în urma dialogului cu Ministerul Muncii.",
    href: null,
    external: false,
  },
];

const exploreLinks = [
  {
    icon: Scale,
    title: "Legislație",
    subtitle: "Bibliotecă de acte normative",
    description:
      "Cadrul legal aplicabil furnizorilor privați, actualizat.",
    href: "/legislatie",
  },
  {
    icon: Gavel,
    title: "Membri",
    subtitle: "Rețeaua națională PFPSS",
    description:
      "Criterii, beneficii și cum poți deveni membru.",
    href: "/membri",
  },
  {
    icon: Megaphone,
    title: "Contact",
    subtitle: "Vorbește cu echipa",
    description:
      "Telefon, email și formular pentru orice solicitare.",
    href: "/contact",
  },
];

export default function AdvocacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-20 pb-24">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          {/* Navy glow */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-navy-deep/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gold/20 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-6"
                >
                  <Sparkles className="size-3.5 text-navy-deep" />
                  <span className="text-xs font-medium text-navy-deep uppercase tracking-widest">
                    Advocacy &amp; petiții
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6"
                >
                  Acțiuni publice pentru un sistem social demn.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl"
                >
                  PFPSS coordonează campanii, petiții și poziții oficiale prin
                  care apără interesele furnizorilor privați și ale beneficiarilor.
                </motion.p>
              </div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-navy-deep/10"
              >
                <Image
                  src="/advocacy.png"
                  alt="Advocacy PFPSS"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Procesul */}
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
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy-deep leading-tight text-balance">
                De la dosarul tehnic la decizia publică
              </h2>
              <p className="text-navy-deep/60 mt-4 leading-relaxed">
                Fiecare campanie pornește dintr-o nevoie reală a membrilor: o
                analiză legislativă, o consultare cu specialiștii, o poziție
                oficială și, când este nevoie, o petiție publică sau o acțiune
                în instanță.
              </p>
            </motion.div>

            {/* Campanii */}
            <div className="space-y-6">
              {campaigns.map((camp, i) => (
                <motion.div
                  key={camp.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  {camp.href ? (
                    <Link
                      href={camp.href}
                      {...(camp.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group block p-7 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10 shrink-0">
                          <camp.icon className="size-6 text-gold" />
                        </div>
                        <div className="flex-1">
                          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-navy-deep/40 mb-2">
                            {camp.badge}
                          </span>
                          <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2 group-hover:text-gold transition-colors">
                            {camp.title}
                          </h3>
                          <p className="text-sm text-navy-deep/60 leading-relaxed">
                            {camp.description}
                          </p>
                          <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                            Detalii
                            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="group block p-7 rounded-xl border border-navy-deep/10 bg-white">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10 shrink-0">
                          <camp.icon className="size-6 text-gold" />
                        </div>
                        <div className="flex-1">
                          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-navy-deep/40 mb-2">
                            {camp.badge}
                          </span>
                          <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2">
                            {camp.title}
                          </h3>
                          <p className="text-sm text-navy-deep/60 leading-relaxed">
                            {camp.description}
                          </p>
                          <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-navy-deep/30">
                            Detalii în curând
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Explorează mai departe */}
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
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy-deep leading-tight text-balance">
                Explorează mai departe
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {exploreLinks.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link
                    href={item.href}
                    className="group block p-8 rounded-xl border border-navy-deep/10 bg-paper hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5 h-full"
                  >
                    <div className="flex items-center justify-center size-14 rounded-lg bg-navy-deep/5 mb-5">
                      <item.icon className="size-7 text-navy-deep" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-navy-deep mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-gold mb-2">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-navy-deep/60 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                      Explorează
                      <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
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
                Vocea ta contează în fața autorităților
              </h2>
              <p className="text-navy-deep/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                Alătură-te comunității PFPSS pentru reprezentare
                instituțională, consultanță juridică și acces la rețeaua de
                furnizori privați.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/inscriere"
                  className="group inline-flex items-center gap-2 bg-navy-deep text-paper px-8 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20"
                >
                  Devino membru
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-transparent text-navy-deep px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep/20 transition-all duration-300 hover:bg-navy-deep/5"
                >
                  Vorbește cu echipa
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
