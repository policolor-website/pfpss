"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles,
  ArrowRight,
  ChevronDown,
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

const faqs = [
  {
    question: "În cât timp primesc răspuns?",
    answer:
      "Echipa PFPSS răspunde în maximum 48 de ore lucrătoare la toate solicitările primite prin formularul online sau email. Pentru chestiuni urgente, vă recomandăm să ne contactați telefonic.",
  },
  {
    question: "Pot solicita o întâlnire la sediu?",
    answer:
      "Da. Pentru a programa o întâlnire la sediul PFPSS, vă rugăm să trimiteți o solicitare prin formularul de contact sau la office@pfpss.ro, indicând subiectul dorit și intervalul preferat.",
  },
  {
    question: "Cui mă adresez pentru presă?",
    answer:
      "Pentru solicitări din partea presei și a jurnaliștilor, vă rugăm să scrieți la office@pfpss.ro sau să sunați la 0732 009 000, menționând clar 'Pentru presă' în subiectul mesajului.",
  },
];

const exploreLinks = [
  {
    title: "Membri",
    subtitle: "Rețeaua națională PFPSS",
    description: "Criterii, beneficii și cum poți deveni membru.",
    href: "/membri",
  },
  {
    title: "Advocacy",
    subtitle: "Campanii publice și petiții",
    description: "Pozițiile oficiale și inițiativele prin care apărăm sectorul.",
    href: "/advocacy",
  },
  {
    title: "Legislație",
    subtitle: "Bibliotecă de acte normative",
    description: "Cadrul legal aplicabil furnizorilor privați, actualizat.",
    href: "/resurse",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
                    Contact PFPSS
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6"
                >
                  Vorbește cu echipa PFPSS
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl"
                >
                  Indiferent dacă sunteți furnizor de servicii sociale interesat
                  să ni se alăture, beneficiar în căutare de informații sau
                  partener instituțional, echipa noastră este pregătită să
                  răspundă.
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
                  src="/contact.png"
                  alt="Contact PFPSS"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact cards + Form */}
        <section className="py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Contact info */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={0}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-gold" />
                  <span className="text-xs font-semibold text-gold uppercase tracking-widest">
                    Date de contact
                  </span>
                </div>

                <div className="space-y-4">
                  <a
                    href="tel:+40732009000"
                    className="group flex items-center gap-4 p-6 rounded-xl bg-white border border-navy-deep/10 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
                  >
                    <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10 group-hover:bg-gold transition-colors duration-300">
                      <Phone className="size-6 text-gold group-hover:text-navy-deep transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs text-navy-deep/50 uppercase tracking-wide mb-1">
                        Telefon
                      </div>
                      <div className="font-heading text-lg font-semibold text-navy-deep">
                        0732 009 000
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:office@pfpss.ro"
                    className="group flex items-center gap-4 p-6 rounded-xl bg-white border border-navy-deep/10 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
                  >
                    <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10 group-hover:bg-gold transition-colors duration-300">
                      <Mail className="size-6 text-gold group-hover:text-navy-deep transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs text-navy-deep/50 uppercase tracking-wide mb-1">
                        Email
                      </div>
                      <div className="font-heading text-lg font-semibold text-navy-deep">
                        office@pfpss.ro
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-6 rounded-xl bg-white border border-navy-deep/10">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-navy-deep/5">
                      <Clock className="size-6 text-navy-deep" />
                    </div>
                    <div>
                      <div className="text-xs text-navy-deep/50 uppercase tracking-wide mb-1">
                        Program
                      </div>
                      <div className="font-heading text-base font-semibold text-navy-deep">
                        Luni – Vineri · 09:00 – 17:00
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={1}
                className="p-8 md:p-10 rounded-xl bg-white border border-navy-deep/10 shadow-sm"
              >
                <h2 className="font-heading text-2xl font-bold text-navy-deep mb-2">
                  Trimite-ne un mesaj
                </h2>
                <p className="text-sm text-navy-deep/60 mb-6">
                  Vom reveni cu un răspuns cât mai curând posibil. Pentru
                  solicitări urgente, vă rugăm să folosiți telefonul.
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="flex items-center justify-center size-16 rounded-full bg-gold/10 mx-auto mb-4">
                      <Send className="size-8 text-gold" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-navy-deep mb-2">
                      Mesaj trimis!
                    </h3>
                    <p className="text-sm text-navy-deep/60">
                      Vom reveni cu un răspuns în maximum 48 de ore lucrătoare.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy-deep/60 uppercase tracking-wide mb-1.5">
                          Nume *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all"
                          placeholder="Numele tău"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-deep/60 uppercase tracking-wide mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all"
                          placeholder="email@exemplu.ro"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-deep/60 uppercase tracking-wide mb-1.5">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all"
                        placeholder="07xx xxx xxx"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-deep/60 uppercase tracking-wide mb-1.5">
                        Subiect *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all cursor-pointer"
                      >
                        <option value="">Selectează...</option>
                        <option value="aderare">Doresc să devin membru</option>
                        <option value="consultanta">Consultanță juridică</option>
                        <option value="presa">Pentru presă</option>
                        <option value="parteneriat">Parteneriat</option>
                        <option value="altele">Altele</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-deep/60 uppercase tracking-wide mb-1.5">
                        Mesaj *
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all resize-none"
                        placeholder="Scrie mesajul tău aici..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 w-full justify-center bg-navy-deep text-white px-6 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-navy-deep/90 hover:shadow-lg hover:shadow-navy-deep/20"
                    >
                      Trimite mesajul
                      <Send className="size-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="text-xs text-navy-deep/40 text-center">
                      Prin trimiterea acestui formular ești de acord cu{" "}
                      <Link
                        href="/confidentialitate"
                        className="text-navy-deep/60 underline hover:text-gold transition-colors"
                      >
                        Politica de confidențialitate
                      </Link>
                      .
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4 text-balance">
                Întrebări frecvente
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="rounded-xl border border-navy-deep/10 bg-paper overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-heading text-base font-semibold text-navy-deep">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`size-5 text-navy-deep/40 shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openFaq === i
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-navy-deep/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore */}
        <section className="py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4 text-balance">
                Explorează mai departe
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {exploreLinks.map((link, i) => (
                <motion.div
                  key={link.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link
                    href={link.href}
                    className="group block p-7 rounded-xl bg-white border border-navy-deep/10 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5 h-full"
                  >
                    <h3 className="font-heading text-lg font-semibold text-navy-deep mb-1">
                      {link.title}
                    </h3>
                    <p className="text-xs text-gold font-semibold uppercase tracking-wide mb-3">
                      {link.subtitle}
                    </p>
                    <p className="text-sm text-navy-deep/60 leading-relaxed mb-4">
                      {link.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                      Explorează
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
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
