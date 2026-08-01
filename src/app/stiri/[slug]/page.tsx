"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Download,
  Sparkles,
  ChevronRight,
  FileText,
} from "lucide-react";
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

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  paragraphs: string[];
  pdfHref?: string;
};

const articles: Record<string, Article> = {
  "scrisoare-deschisa-ministerul-muncii-iulie-2026": {
    slug: "scrisoare-deschisa-ministerul-muncii-iulie-2026",
    title:
      "Scrisoare deschisă către Ministerul Muncii: controale orientate către om, nu către hârtii",
    excerpt:
      "PFPSS a transmis oficial Ministerului Muncii (nr. înreg. 61/23.07.2026) o scrisoare deschisă care cere continuarea simplificării procedurilor de licențiere și reorientarea sistemului de control către protejarea efectivă a beneficiarilor — pe fondul scrisorii Comisarului pentru Drepturile Omului al Consiliului Europei adresate Guvernului României.",
    date: "23 Iulie 2026",
    category: "Advocacy",
    image: "/stiri/scrisoare-ministerul-muncii-2026.jpg",
    pdfHref: "/documents/scrisoare-deschisa-ministerul-muncii-2026-07-23.pdf",
    paragraphs: [
      "Patronatul Furnizorilor Privați de Servicii Sociale (PFPSS) a transmis miercuri, 23 iulie 2026, o scrisoare deschisă domnului Dragoș-Nicolae Pîslaru, ministrul Muncii, Familiei, Tineretului și Solidarității Sociale, prin care solicită continuarea procesului de simplificare a procedurilor de licențiere și orientarea sistemului de control către protejarea efectivă a beneficiarilor.",
      "Demersul vine în contextul scrisorii adresate Guvernului României de Comisarul pentru Drepturile Omului al Consiliului Europei, domnul Michael O'Flaherty — document care readuce în atenția autorităților necesitatea unei reforme profunde a sistemului de asistență socială. Comisarul constată, între altele, un deficit persistent de servicii de îngrijire, exact în contextul îmbătrânirii populației și al creșterii nevoilor: nevoia reală de servicii depășește capacitatea actuală a sistemului public, iar extinderea acestei capacități nu este posibilă fără încurajarea și sprijinirea furnizorilor privați licențiați.",
      "PFPSS apreciază că aceste concluzii confirmă faptul că problemele sistemului românesc nu sunt generate de existența unor proceduri insuficient de birocratice, ci de incapacitatea autorităților de a identifica și opri, la timp, activitățile desfășurate complet în afara cadrului legal. Experiența ultimilor ani arată că furnizorii licențiați au fost supuși unui număr foarte mare de controale și obligații documentare, în timp ce numeroase centre ilegale au funcționat ani de zile fără a fi oprite.",
      "Excesul de birocrație consumă resurse financiare și umane care ar trebui direcționate către creșterea calității serviciilor, angajarea și pregătirea personalului, investiții în îngrijirea beneficiarilor și dezvoltarea de noi locuri pentru persoanele vulnerabile. Așa cum recomandă și Comisarul, inspecțiile trebuie să urmărească în primul rând respectarea drepturilor și bunăstării beneficiarilor — nu exclusiv îndeplinirea unor standarde formale.",
      "În scrisoare, PFPSS solicită Ministerului Muncii: (1) continuarea simplificării procedurilor de licențiere și relicențiere; (2) eliminarea cerințelor administrative care nu contribuie real la calitatea serviciilor; (3) diferențierea clară între furnizorii autorizați și cei care operează ilegal; (4) orientarea controalelor către evaluarea efectivă a calității și a respectării drepturilor beneficiarilor; (5) deschiderea mecanismelor publice de finanțare — subvenții, decontări, fonduri europene — către toți furnizorii licențiați, indiferent de forma juridică de organizare; (6) constituirea unui grup permanent de lucru cu reprezentanții furnizorilor privați.",
      "Un punct central al scrisorii este neutralitatea formei juridice: accesul la finanțarea publică trebuie condiționat de deținerea licenței de funcționare și de calitatea serviciilor, nu de forma de organizare a furnizorului. Limitarea acestor mecanisme la asociații și fundații lasă nevalorificată capacitatea investițională a societăților comerciale licențiate — iar un model funcțional există deja în sănătate, unde furnizorii privați, indiferent de forma juridică, contractează servicii cu casele de asigurări.",
      "Documentul integral, înregistrat la minister cu nr. 61/23.07.2026, poate fi descărcat mai jos. Acțiunea continuă demersurile PFPSS pentru un cadru de licențiere echitabil — inclusiv petiția privind eliminarea autorizației ISU dintre documentele obligatorii pentru licențiere, deschisă semnăturilor pe pfpss.ro/petitii.",
    ],
  },
};

const relatedArticles = [
  {
    slug: "pfpss-prezent-la-editia-a-x-a-a-conferintei-idl-iasi-2026",
    title: "PFPSS prezent la Ediția a X-a a Conferinței IDL, Iași 2026",
    date: "17 Mai 2026",
  },
  {
    slug: "casa-alegria-centru-rezidential-pentru-varstnici-in-ploiesti",
    title: "Casa Alegria — Centru rezidențial pentru vârstnici în Ploiești",
    date: "10 Mai 2026",
  },
  {
    slug: "casa-orizont-camin-pentru-varstnici-in-natura-beleti-negresti-arges",
    title: "Casa Orizont — Cămin pentru vârstnici în natură, Beleți-Negrești, Argeș",
    date: "8 Mai 2026",
  },
];

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const article = articles[slug];

  if (!article) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy-deep mb-4">
              Articolul nu a fost găsit
            </h1>
            <Link
              href="/stiri"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
            >
              <ArrowLeft className="size-4" />
              Înapoi la știri
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

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
              <Link href="/" className="hover:text-navy-deep transition-colors">
                Acasă
              </Link>
              <ChevronRight className="size-3.5" />
              <Link
                href="/stiri"
                className="hover:text-navy-deep transition-colors"
              >
                Știri
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-navy-deep/70 truncate">
                {article.category}
              </span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-6"
            >
              <Sparkles className="size-3.5 text-navy-deep" />
              <span className="text-xs font-medium text-navy-deep uppercase tracking-widest">
                {article.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-navy-deep leading-[1.15] text-balance mb-6"
            >
              {article.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 text-sm text-navy-deep/60"
            >
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" />
                {article.date}
              </span>
            </motion.div>
          </div>
        </section>

        {/* Article body */}
        <section className="py-16 bg-paper">
          <div className="max-w-4xl mx-auto px-6">
            {/* Featured image */}
            {article.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl shadow-navy-deep/10 mb-10"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}

            {/* Paragraphs */}
            <div className="space-y-6">
              {article.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i}
                  className="text-base md:text-lg text-navy-deep/75 leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* PDF download */}
            {article.pdfHref && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={0}
                className="mt-10 p-6 rounded-xl bg-white border border-navy-deep/10 flex items-center justify-between gap-4 flex-wrap"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10">
                    <FileText className="size-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-navy-deep">
                      Descarcă scrisoarea integrală (PDF)
                    </h3>
                    <p className="text-sm text-navy-deep/50">
                      Nr. înreg. 61/23.07.2026
                    </p>
                  </div>
                </div>
                <a
                  href={article.pdfHref}
                  className="group inline-flex items-center gap-2 bg-navy-deep text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-navy-deep/90 hover:shadow-lg hover:shadow-navy-deep/20"
                >
                  <Download className="size-4" />
                  Descarcă PDF
                </a>
              </motion.div>
            )}

            {/* Petiție link */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={0}
              className="mt-6 p-6 rounded-xl bg-gold/5 border border-gold/20"
            >
              <p className="text-sm text-navy-deep/70 leading-relaxed mb-3">
                Acțiunea continuă demersurile PFPSS pentru un cadru de licențiere
                echitabil — inclusiv petiția privind eliminarea autorizației ISU
                dintre documentele obligatorii pentru licențiere.
              </p>
              <Link
                href="/petitii"
                className="group inline-flex items-center gap-2 text-gold font-semibold text-sm hover:underline"
              >
                Semnează petiția ISU
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Back link */}
            <div className="mt-10 pt-8 border-t border-navy-deep/10">
              <Link
                href="/stiri"
                className="group inline-flex items-center gap-2 text-navy-deep font-semibold text-sm hover:text-gold transition-colors"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Înapoi la știri
              </Link>
            </div>
          </div>
        </section>

        {/* Articole conexe */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="mb-10"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep">
                Articole conexe
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((rel, i) => (
                <motion.div
                  key={rel.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link
                    href={`/stiri/${rel.slug}`}
                    className="group block p-6 rounded-xl bg-paper border border-navy-deep/10 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5 h-full"
                  >
                    <span className="text-xs text-navy-deep/40 inline-flex items-center gap-1.5 mb-3">
                      <Calendar className="size-3.5" />
                      {rel.date}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-navy-deep leading-snug group-hover:text-gold transition-colors">
                      {rel.title}
                    </h3>
                  </Link>
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
