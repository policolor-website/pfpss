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

const directions = [
  {
    icon: Scale,
    title: "Reprezentare",
    description:
      "Vocea sectorului privat în fața Ministerului Muncii, ANPC și a Parlamentului.",
  },
  {
    icon: Award,
    title: "Standarde",
    description:
      "Ghiduri de bune practici și un Cod Etic obligatoriu pentru toți membrii.",
  },
  {
    icon: Users,
    title: "Comunitate",
    description:
      "Întâlniri lunare, schimburi de experiență și parteneriate internaționale.",
  },
];

const values = [
  {
    num: "01",
    icon: Award,
    title: "Excelență",
    description:
      "Promovăm cele mai înalte standarde de calitate în toate aspectele activității de îngrijire.",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Inovație",
    description:
      "Încurajăm gândirea creativă pentru a dezvolta soluții eficiente la provocările sociale.",
  },
  {
    num: "03",
    icon: Shield,
    title: "Integritate",
    description:
      "Acționăm cu onestitate, transparență și responsabilitate în toate inițiativele noastre.",
  },
  {
    num: "04",
    icon: Handshake,
    title: "Colaborare",
    description:
      "Credem în forța parteneriatelor și a lucrului în echipă pentru obiective comune.",
  },
  {
    num: "05",
    icon: Heart,
    title: "Respect",
    description:
      "Tratăm cu demnitate beneficiarii, furnizorii și partenerii din întreg ecosistemul social.",
  },
];

const team = [
  {
    name: "Katia-Constanța Cicală",
    role: "Advocacy & Reprezentare instituțională",
    description:
      "Conduce demersurile de advocacy și reprezentarea instituțională a furnizorilor privați în relația cu autoritățile publice.",
    photo: "/team/katia-cicala.jpg",
  },
  {
    name: "Georgeta-Liliana Folea",
    role: "Relația cu membrii & Standarde de calitate",
    description:
      "Coordonează relația cu membrii și standardele de calitate aplicate în centrele rezidențiale.",
    photo: "/team/georgeta-folea.jpeg",
  },
  {
    name: "Loredana Maghiar",
    role: "Parteneriate & Reprezentare națională/internațională",
    description:
      "Responsabilă pentru dezvoltarea de parteneriate și reprezentarea PFPSS în forurile naționale și internaționale.",
    photo: "/team/loredana-maghiar.jpg",
  },
  {
    name: "Tania Ivan",
    role: "Comunicare publică & Relația cu presa",
    description:
      "Coordonează comunicarea publică, relația cu presa și inițiativele de informare ale PFPSS.",
    photo: "/team/tania-ivan.jpg",
  },
];

const documents = [
  {
    title:
      "Scrisoare deschisă către Ministerul Muncii — simplificarea licențierii (nr. 61/23.07.2026)",
    description:
      "Solicitare oficială privind continuarea simplificării procedurilor de licențiere și orientarea controalelor către protejarea efectivă a beneficiarilor, pe fondul scrisorii Comisarului pentru Drepturile Omului al Consiliului Europei.",
    href: "https://pfpss.ro/documents/scrisoare-deschisa-ministerul-muncii-2026-07-23.pdf",
  },
];

export default function DesprePage() {
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
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/5 border border-navy-deep/10 mb-6"
                >
                  <span className="size-2 rounded-full bg-gold animate-pulse" />
                  <span className="text-xs font-medium text-navy-deep/70 uppercase tracking-widest">
                    Despre PFPSS
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6"
                >
                  Unitate pentru demnitate — vocea furnizorilor privați de servicii sociale.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                >
                  PFPSS reunește profesioniștii din sectorul rezidențial privat de
                  îngrijire a vârstnicilor din România. Prin advocacy, colaborare și
                  educație sprijinim furnizorii în efortul de a oferi servicii la
                  cele mai înalte standarde europene.
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
                  src="/despre.png"
                  alt="Servicii de îngrijire a vârstnicilor"
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
                    Misiunea noastră
                  </h2>
                </div>
                <p className="text-navy-deep/70 leading-relaxed">
                  Susținem activ furnizorii privați din domeniul asistenței
                  sociale, oferindu-le o platformă de exprimare, resurse
                  valoroase și oportunități de networking. Ne străduim să fim
                  pilonul central pentru membrii noștri în interacțiunile cu
                  autoritățile, agențiile guvernamentale și partenerii
                  internaționali, pledând pentru un mediu legislativ optim și
                  recunoașterea contribuției vitale a sectorului privat în
                  asistența socială din România.
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
                    Viziunea noastră
                  </h2>
                </div>
                <p className="text-navy-deep/70 leading-relaxed">
                  Ne imaginăm o Românie în care calitatea accesului la
                  asistență socială este garantată pentru toți, indiferent de
                  dificultățile întâmpinate. Prin unitate, inovare și
                  angajament neîntrerupt, remodelăm peisajul asistenței sociale
                  pentru a răspunde eficient și flexibil la nevoile reale ale
                  comunității.
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
                Trei direcții care ghidează patronatul
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
                Valorile noastre
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
                Angajamentul nostru
              </h2>
              <p className="text-lg text-navy-deep/70 leading-relaxed mb-6">
                La PFPSS credem că demnitatea fiecărei persoane este un drept
                fundamental. Sub motto-ul „Unitate pentru Demnitate", promovăm
                și protejăm acest principiu în toate activitățile noastre. Într-o
                lume în care provocările sociale devin tot mai complexe, unitatea
                dintre furnizori este cheia unui standard înalt de îngrijire
                pentru cei mai vulnerabili membri ai comunității.
              </p>
              <p className="text-lg text-navy-deep/70 leading-relaxed mb-8">
                Ne adresăm tuturor furnizorilor privați de servicii sociale care
                împărtășesc viziunea noastră despre un serviciu umanitar centrat
                pe demnitatea umană.
              </p>
              <Link
                href="/inscriere"
                className="group inline-flex items-center gap-2 bg-navy-deep text-paper px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20"
              >
                Alăturați-vă PFPSS
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
                  Documente publice
                </h2>
              </div>
              <p className="text-navy-deep/60">
                Tot ce ține de guvernanța și activitatea PFPSS, accesibil
                oricui — fără autentificare. Documentele detaliate pentru
                membri se găsesc în zona privată.
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
                  Poziții publice
                </h3>
                {documents.map((doc) => (
                  <a
                    key={doc.title}
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
                          {doc.title}
                        </h4>
                        <p className="text-sm text-navy-deep/60 leading-relaxed">
                          {doc.description}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                          Deschide
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
                  Documente doar pentru membri
                </h3>
                <p className="text-navy-deep/60 leading-relaxed mb-4">
                  Modele detaliate de contracte, proceduri ISO, fișe de post,
                  arhivă întâlniri, consultanță juridică și template-uri de
                  răspuns la control sunt disponibile în zona privată.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors"
                >
                  Autentificare membri
                  <ArrowRight className="size-4" />
                </Link>
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
                  Echipa
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy-deep mb-4 text-balance">
                Conducerea PFPSS
              </h2>
              <p className="text-navy-deep/60 leading-relaxed">
                Boardul patronatului este format din reprezentanți aleși de
                Adunarea Generală a membrilor și sprijiniți de o echipă
                executivă dedicată.
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
              Boardul PFPSS este ales de Adunarea Generală a membrilor pentru un
              mandat de patru ani și răspunde public pentru direcția strategică
              a patronatului. Echipa executivă asigură implementarea zilnică și
              coordonarea proiectelor.
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
                  {/* Photo */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
                    {/* Name + role on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="w-10 h-0.5 bg-gold mb-3 transition-all duration-500 group-hover:w-16" />
                      <h3 className="font-heading text-lg font-semibold text-paper leading-tight mb-1">
                        {member.name}
                      </h3>
                      <p className="text-xs font-medium text-gold/90 uppercase tracking-wide">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  {/* Description */}
                  <div className="p-5">
                    <p className="text-sm text-navy-deep/60 leading-relaxed">
                      {member.description}
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
