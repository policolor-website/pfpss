"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";

  const navLinks = [
    { href: "/despre", label: t("nav.aboutUs") },
    { href: "/advocacy", label: t("nav.advocacy") },
    { href: "/petitii", label: t("nav.petitions") },
    { href: "/resurse", label: t("nav.resources") },
    { href: "/stiri", label: t("nav.news") },
    { href: "/inscriere", label: t("nav.becomeMember") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const legalLinks = [
    { href: "/confidentialitate", label: t("nav.privacy") },
    { href: "/termeni", label: t("nav.terms") },
    { href: "/cookies", label: t("nav.cookies") },
  ];

  return (
    <footer className="pt-20 pb-10 bg-paper border-t border-navy-deep/10 text-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 md:gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo-pfpss.png"
                alt="PFPSS"
                width={200}
                height={58}
                className="h-12 w-auto mb-3"
              />
            </div>
            <p className="text-sm text-navy-deep/70 leading-relaxed max-w-md">
              {t("description")}
            </p>
            <dl className="mt-6 text-xs text-navy-deep/60 space-y-1">
              <div className="flex gap-2">
                <dt className="font-semibold">{t("legal.name")}</dt>
                <dd>Patronatul Furnizorilor Privați de Servicii Sociale</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">{t("legal.cui")}</dt>
                <dd>50457026</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">{t("legal.address")}</dt>
                <dd>{t("legal.addressValue")}</dd>
              </div>
            </dl>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
              {t("sections.contact")}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <Phone className="size-4 shrink-0 text-gold mt-0.5" />
                <a
                  href="tel:+40732009000"
                  className="hover:text-gold transition-colors"
                >
                  0732 009 000
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="size-4 shrink-0 text-gold mt-0.5" />
                <a
                  href="mailto:office@pfpss.ro"
                  className="hover:text-gold transition-colors"
                >
                  office@pfpss.ro
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="size-4 shrink-0 text-gold mt-0.5" />
                <span>
                  Phoenicia Business Center, Corp A, interfon 14, Str.
                  Turturelelor 11b, Sector 3, București
                </span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
              {t("sections.navigation")}
            </h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ANPC + bottom bar */}
        <div className="border-t border-navy-deep/10 pt-6 mb-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-navy-deep/70">
            {t("legal.disputeResolution")}
          </span>
          <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-navy-deep/60 hover:text-navy-deep transition-colors"
          >
            ANPC — SAL
          </a>
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-navy-deep/60 hover:text-navy-deep transition-colors"
          >
            ANPC — SOL
          </a>
          <a
            href="https://anpc.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-navy-deep/60 hover:text-navy-deep transition-colors"
          >
            ANPC
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-navy-deep/60 sm:ml-auto">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-navy-deep transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-navy-deep/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-navy-deep/50">
            {t("copyright", { year: new Date().getFullYear() })}{" "}
            ·{" "}
            {t("createdBy")}{" "}
            <a
              href="https://forsite.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-navy-deep hover:text-gold transition-colors"
            >
              FORSITE.RO
            </a>
          </span>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href={`${prefix}/confidentialitate`}
              className="text-navy-deep/50 hover:text-navy-deep transition-colors"
            >
              {t("legal.privacy")}
            </Link>
            <Link
              href={`${prefix}/termeni`}
              className="text-navy-deep/50 hover:text-navy-deep transition-colors"
            >
              {t("legal.terms")}
            </Link>
            <Link
              href={`${prefix}/cookies`}
              className="text-navy-deep/50 hover:text-navy-deep transition-colors"
            >
              {t("legal.cookies")}
            </Link>
            <button
              onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
              className="text-navy-deep/50 hover:text-navy-deep transition-colors"
            >
              {t("legal.cookieSettings")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
