"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  PenSquare,
  LogOut,
  Menu,
  X,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItemsConfig = [
  { href: "/admin", labelKey: "nav.overview", icon: LayoutDashboard },
  { href: "/admin/organizatii", labelKey: "nav.organizations", icon: Building2 },
  { href: "/admin/membri", labelKey: "nav.members", icon: Users },
  { href: "/admin/documente", labelKey: "nav.documents", icon: FileText },
  { href: "/admin/petitii", labelKey: "nav.petitions", icon: PenSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("adminLayout");
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminName, setAdminName] = useState("");

  const navItems = navItemsConfig.map((item) => ({
    ...item,
    label: t(item.labelKey),
    href: `${prefix}${item.href}`,
  }));

  useEffect(() => {
    async function loadAdmin() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .single();
      if (data) setAdminName(data.full_name || data.email);
    }
    loadAdmin();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`${prefix}/login`);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-64 flex-col bg-navy-deep text-paper fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-white/10">
          <Link href={prefix || "/"} className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold text-gold">PFPSS</span>
            <span className="text-xs text-paper/40">{t("adminPanel")}</span>
          </Link>
        </div>

        <div className="px-6 py-4 border-b border-white/10">
          <p className="text-xs text-paper/40 uppercase tracking-wider mb-1">
            {t("administrator")}
          </p>
          <p className="text-sm font-medium text-paper truncate">
            {adminName || "—"}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-gold/10 text-gold"
                    : "text-paper/60 hover:text-paper hover:bg-white/5"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href={prefix || "/"}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-paper/60 hover:text-paper hover:bg-white/5 transition-colors"
          >
            <Globe className="size-4" />
            {t("publicSite")}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-paper/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="size-4" />
            {t("logout")}
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-navy-deep text-paper px-6 h-16 flex items-center justify-between">
        <Link href={prefix || "/"} className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-gold" />
          <span className="font-heading text-lg font-bold text-gold">PFPSS</span>
          <span className="text-xs text-paper/40">{t("adminPanel")}</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-paper"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-navy-deep/95 pt-16 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-paper/60 hover:text-paper hover:bg-white/5"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={prefix || "/"}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-paper/60 hover:text-paper hover:bg-white/5 transition-colors"
            >
              <Globe className="size-4" />
              {t("publicSite")}
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-paper/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="size-4" />
              {t("logout")}
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
