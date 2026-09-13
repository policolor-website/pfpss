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

const exploreLinks = [
  { titleKey: "explore.0.title", subtitleKey: "explore.0.subtitle", descKey: "explore.0.description", href: "membri" },
  { titleKey: "explore.1.title", subtitleKey: "explore.1.subtitle", descKey: "explore.1.description", href: "advocacy" },
  { titleKey: "explore.2.title", subtitleKey: "explore.2.subtitle", descKey: "explore.2.description", href: "resurse" },
];

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    { question: t("faqs.0.question"), answer: t("faqs.0.answer") },
    { question: t("faqs.1.question"), answer: t("faqs.1.answer") },
    { question: t("faqs.2.question"), answer: t("faqs.2.answer") },
  ];

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
                  src="/contact.png"
                  alt={t("badge")}
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
                    {t("infoBadge")}
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
                        {t("info.phone")}
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
                        {t("info.email")}
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
                        {t("info.hours")}
                      </div>
                      <div className="font-heading text-base font-semibold text-navy-deep">
                        {t("info.hoursValue")}
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
                  {t("form.title")}
                </h2>
                <p className="text-sm text-navy-deep/60 mb-6">
                  {t("form.description")}
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="flex items-center justify-center size-16 rounded-full bg-gold/10 mx-auto mb-4">
                      <Send className="size-8 text-gold" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-navy-deep mb-2">
                      {t("form.success")}
                    </h3>
                    <p className="text-sm text-navy-deep/60">
                      {t("form.successDesc")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy-deep/60 uppercase tracking-wide mb-1.5">
                          {t("form.name")} *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all"
                          placeholder={t("form.namePlaceholder")}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-deep/60 uppercase tracking-wide mb-1.5">
                          {t("form.email")} *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all"
                          placeholder={t("form.emailPlaceholder")}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-deep/60 uppercase tracking-wide mb-1.5">
                        {t("form.phone")}
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all"
                        placeholder={t("form.phonePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-deep/60 uppercase tracking-wide mb-1.5">
                        {t("form.subject")} *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all cursor-pointer"
                      >
                        <option value="">{t("form.selectSubject")}</option>
                        <option value="aderare">{t("form.subjects.membership")}</option>
                        <option value="consultanta">{t("form.subjects.legal")}</option>
                        <option value="presa">{t("form.subjects.press")}</option>
                        <option value="parteneriat">{t("form.subjects.partnership")}</option>
                        <option value="altele">{t("form.subjects.other")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-deep/60 uppercase tracking-wide mb-1.5">
                        {t("form.message")} *
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all resize-none"
                        placeholder={t("form.messagePlaceholder")}
                      />
                    </div>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 w-full justify-center bg-navy-deep text-white px-6 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-navy-deep/90 hover:shadow-lg hover:shadow-navy-deep/20"
                    >
                      {t("form.submit")}
                      <Send className="size-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="text-xs text-navy-deep/40 text-center">
                      {t("form.privacyPrefix")}{" "}
                      <Link
                        href={`${prefix}/confidentialitate`}
                        className="text-navy-deep/60 underline hover:text-gold transition-colors"
                      >
                        {t("form.privacyLink")}
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
                {t("faqTitle")}
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
                {t("exploreTitle")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {exploreLinks.map((link, i) => (
                <motion.div
                  key={link.titleKey}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link
                    href={`${prefix}/${link.href}`}
                    className="group block p-7 rounded-xl bg-white border border-navy-deep/10 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5 h-full"
                  >
                    <h3 className="font-heading text-lg font-semibold text-navy-deep mb-1">
                      {t(link.titleKey)}
                    </h3>
                    <p className="text-xs text-gold font-semibold uppercase tracking-wide mb-3">
                      {t(link.subtitleKey)}
                    </p>
                    <p className="text-sm text-navy-deep/60 leading-relaxed mb-4">
                      {t(link.descKey)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                      {t("exploreMore")}
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
