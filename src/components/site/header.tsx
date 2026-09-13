"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export function SiteHeader() {
  const t = useTranslations("header");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  // Strip locale prefix from pathname to get the base path
  const basePath = pathname.replace(/^\/(en|ro)(?=\/|$)/, "") || "/";

  const prefix = locale === "en" ? "/en" : "";

  // Build locale switcher links preserving current path
  const switchToLocale = (targetLocale: string) => {
    if (targetLocale === "ro") return basePath; // RO has no prefix
    return `/en${basePath === "/" ? "" : basePath}`;
  };

  const navLinks = [
    { href: `${prefix}/`, label: t("nav.home") },
    { href: `${prefix}/despre`, label: t("nav.about") },
    { href: `${prefix}/membri`, label: t("nav.members") },
    { href: `${prefix}/advocacy`, label: t("nav.advocacy") },
    { href: `${prefix}/resurse`, label: t("nav.resources") },
    { href: `${prefix}/stiri`, label: t("nav.news") },
    { href: `${prefix}/camine`, label: t("nav.careHomes") },
    { href: `${prefix}/petitii`, label: t("nav.petitions") },
    { href: `${prefix}/contact`, label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-navy-deep/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href={prefix || "/"} className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo-pfpss.png"
              alt="PFPSS"
              width={160}
              height={46}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy-deep/80 hover:text-gold transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Language selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-navy-deep/70 hover:text-navy-deep transition-colors"
              >
                <Globe className="size-4" />
                <span>{locale.toUpperCase()}</span>
                <ChevronDown className="size-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-32 rounded-md border border-navy-deep/10 bg-white shadow-lg py-1"
                  >
                    <Link
                      href={switchToLocale("ro")}
                      className={`block px-4 py-2 text-sm transition-colors ${locale === "ro" ? "font-semibold text-gold" : "text-navy-deep hover:bg-paper"}`}
                      onClick={() => setLangOpen(false)}
                    >
                      {t("lang.romanian")}
                    </Link>
                    <Link
                      href={switchToLocale("en")}
                      className={`block px-4 py-2 text-sm transition-colors ${locale === "en" ? "font-semibold text-gold" : "text-navy-deep hover:bg-paper"}`}
                      onClick={() => setLangOpen(false)}
                    >
                      {t("lang.english")}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login button */}
            <Link
              href={`${prefix}/login`}
              className="hidden sm:inline-flex items-center text-sm font-semibold text-navy-deep hover:text-gold transition-colors"
            >
              {t("actions.loginMembers")}
            </Link>

            {/* Signup button */}
            <Link
              href={`${prefix}/inscriere`}
              className="hidden sm:inline-flex items-center bg-navy-deep text-paper px-5 py-2 rounded-sm text-sm font-semibold hover:bg-navy-light transition-colors"
            >
              {t("actions.becomeMember")}
            </Link>

            {/* Mobile menu button */}
            <button
              className="xl:hidden p-2 text-navy-deep"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t("actions.menu")}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden overflow-hidden border-t border-navy-deep/10 bg-white"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 text-sm font-medium text-navy-deep hover:text-gold transition-colors border-b border-navy-deep/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`${prefix}/login`}
                className="py-3 text-sm font-semibold text-navy-deep hover:text-gold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t("actions.loginMembers")}
              </Link>
              <Link
                href={`${prefix}/inscriere`}
                className="py-3 mt-2 inline-flex items-center justify-center bg-navy-deep text-paper px-5 py-2.5 rounded-sm text-sm font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                {t("actions.becomeMember")}
              </Link>

              {/* Language switcher (mobile) */}
              <div className="flex items-center gap-2 pt-4 mt-2 border-t border-navy-deep/10">
                <Globe className="size-4 text-navy-deep/50" />
                <Link
                  href={switchToLocale("ro")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${locale === "ro" ? "bg-gold/10 text-gold" : "text-navy-deep/70 hover:bg-paper"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("lang.romanian")}
                </Link>
                <Link
                  href={switchToLocale("en")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${locale === "en" ? "bg-gold/10 text-gold" : "text-navy-deep/70 hover:bg-paper"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("lang.english")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
