"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Acasă" },
  { href: "/despre", label: "Despre" },
  { href: "/membri", label: "Membri" },
  { href: "/advocacy", label: "Advocacy" },
  { href: "/resurse", label: "Resurse" },
  { href: "/stiri", label: "Știri" },
  { href: "/petitii", label: "Petiții" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-navy-deep/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo-pfpss.png"
              alt="PFPSS — Patronatul Furnizorilor Privați de Servicii Sociale"
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
                <span>RO</span>
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
                      href="/"
                      className="block px-4 py-2 text-sm text-navy-deep hover:bg-paper transition-colors"
                      onClick={() => setLangOpen(false)}
                    >
                      Română
                    </Link>
                    <Link
                      href="/en"
                      className="block px-4 py-2 text-sm text-navy-deep hover:bg-paper transition-colors"
                      onClick={() => setLangOpen(false)}
                    >
                      English
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login button */}
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center text-sm font-semibold text-navy-deep hover:text-gold transition-colors"
            >
              Login membri
            </Link>

            {/* Signup button */}
            <Link
              href="/signup"
              className="hidden sm:inline-flex items-center bg-navy-deep text-paper px-5 py-2 rounded-sm text-sm font-semibold hover:bg-navy-light transition-colors"
            >
              Devino membru
            </Link>

            {/* Mobile menu button */}
            <button
              className="xl:hidden p-2 text-navy-deep"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Meniu"
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
                href="/login"
                className="py-3 text-sm font-semibold text-navy-deep hover:text-gold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Login membri
              </Link>
              <Link
                href="/signup"
                className="py-3 mt-2 inline-flex items-center justify-center bg-navy-deep text-paper px-5 py-2.5 rounded-sm text-sm font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Devino membru
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
