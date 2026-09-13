"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

function LoginForm() {
  const t = useTranslations("login");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const redirect = searchParams.get("redirect") || `/${locale === "en" ? "en/" : ""}dashboard`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push(redirect);
    });
  }, [router, redirect]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success(t("success"));
    router.push(redirect);
    router.refresh();
  }

  const prefix = locale === "en" ? "/en" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      {registered && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800">
              {t("registered.title")}
            </p>
            <p className="text-sm text-emerald-700 mt-1">
              {t("registered.description")}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-navy-deep/10 shadow-sm p-8">
        <div className="flex items-center justify-center size-14 rounded-xl bg-navy-deep/5 mb-6 mx-auto">
          <ShieldCheck className="size-7 text-navy-deep" />
        </div>

        <h1 className="font-heading text-2xl font-bold text-navy-deep text-center mb-1">
          {t("title")}
        </h1>
        <p className="text-sm text-navy-deep/50 text-center mb-8">
          {t("subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">
              {t("email")}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
              placeholder={t("emailPlaceholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">
              {t("password")}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-navy-deep/15 bg-paper/50 text-navy-deep focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
              placeholder={t("passwordPlaceholder")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-navy-deep text-paper py-3.5 rounded-lg font-semibold text-sm hover:bg-navy-light transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("submitting")}
              </>
            ) : (
              <>
                {t("submit")}
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-navy-deep/10 text-center">
          <p className="text-sm text-navy-deep/50">
            {t("notMember")}{" "}
            <Link
              href={`${prefix}/inscriere`}
              className="text-gold font-medium hover:underline"
            >
              {t("requestAccess")}
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper flex items-center justify-center min-h-[calc(100vh-5rem)] px-6 py-16">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
