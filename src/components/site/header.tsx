"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown, User, LayoutDashboard, LogOut, ShieldCheck } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export function SiteHeader() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; full_name: string | null } | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();

  // Strip locale prefix from pathname to get the base path
  const basePath = pathname.replace(/^\/(en|ro)(?=\/|$)/, "") || "/";

  const prefix = locale === "en" ? "/en" : "";

  // Check auth state
  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", session.user.id)
        .single();
      setUser({ email: session.user.email || "", full_name: profile?.full_name || null });
      setUserRole(profile?.role || null);
    }
    checkAuth();
  }, [pathname]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setUserMenuOpen(false);
    setMobileOpen(false);
    router.push(`${prefix}/login`);
    router.refresh();
  }

  const dashboardHref = userRole === "admin" ? `${prefix}/admin` : `${prefix}/dashboard`;

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

            {/* Auth actions */}
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-navy-deep hover:text-gold transition-colors"
                >
                  <div className="size-8 rounded-full bg-navy-deep/10 flex items-center justify-center">
                    <User className="size-4 text-navy-deep" />
                  </div>
                  <span className="max-w-32 truncate">
                    {user.full_name || user.email}
                  </span>
                  <ChevronDown className="size-3" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-md border border-navy-deep/10 bg-white shadow-lg py-1"
                    >
                      <div className="px-4 py-2 border-b border-navy-deep/5">
                        <p className="text-xs text-navy-deep/40">{t("actions.signedInAs")}</p>
                        <p className="text-sm font-medium text-navy-deep truncate">{user.email}</p>
                      </div>
                      <Link
                        href={dashboardHref}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-navy-deep hover:bg-paper transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        {userRole === "admin" ? <ShieldCheck className="size-4" /> : <LayoutDashboard className="size-4" />}
                        {userRole === "admin" ? t("actions.adminPanel") : t("actions.dashboard")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="size-4" />
                        {t("actions.logout")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
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
              </>
            )}

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
              {user ? (
                <>
                  <div className="py-3 px-1 flex items-center gap-3 border-b border-navy-deep/5">
                    <div className="size-9 rounded-full bg-navy-deep/10 flex items-center justify-center shrink-0">
                      <User className="size-4 text-navy-deep" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-navy-deep truncate">
                        {user.full_name || user.email}
                      </p>
                      <p className="text-xs text-navy-deep/40 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href={dashboardHref}
                    className="py-3 text-sm font-semibold text-navy-deep hover:text-gold transition-colors flex items-center gap-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {userRole === "admin" ? <ShieldCheck className="size-4" /> : <LayoutDashboard className="size-4" />}
                    {userRole === "admin" ? t("actions.adminPanel") : t("actions.dashboard")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-3 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors flex items-center gap-2 w-full text-left"
                  >
                    <LogOut className="size-4" />
                    {t("actions.logout")}
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}

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
