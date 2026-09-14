"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ChevronDown, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const CONSENT_KEY = "pfpss.cookie.consent";

type Consent = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveConsent(consent: Consent) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  // Dispatch event so other components can react
  window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: consent }));
}

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [functional, setFunctional] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      // Small delay to avoid flash
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for "open-cookie-settings" event from footer
  useEffect(() => {
    function handleOpenSettings() {
      const consent = getConsent();
      if (consent) {
        setAnalytics(consent.analytics);
        setMarketing(consent.marketing);
        setFunctional(consent.functional);
      }
      setShowSettings(true);
      setShow(true);
    }
    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => window.removeEventListener("open-cookie-settings", handleOpenSettings);
  }, []);

  function handleAcceptAll() {
    const consent: Consent = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    saveConsent(consent);
    setShow(false);
    setShowSettings(false);
  }

  function handleRejectAll() {
    const consent: Consent = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    saveConsent(consent);
    setShow(false);
    setShowSettings(false);
  }

  function handleSavePreferences() {
    const consent: Consent = {
      necessary: true,
      functional,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    saveConsent(consent);
    setShow(false);
    setShowSettings(false);
  }

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
      >
        <div className="max-w-5xl mx-auto rounded-2xl bg-white shadow-2xl border border-navy-deep/10 overflow-hidden">
          {/* Header */}
          <div className="flex items-start gap-4 p-5 sm:p-6 border-b border-navy-deep/5">
            <div className="size-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <Cookie className="size-5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-base font-bold text-navy-deep mb-1">
                {t("title")}
              </h3>
              <p className="text-sm text-navy-deep/60 leading-relaxed">
                {t("description")}{" "}
                <Link
                  href={`${prefix}/cookies`}
                  className="text-navy-deep underline hover:text-gold transition-colors"
                >
                  {t("learnMore")}
                </Link>
              </p>
            </div>
            <button
              onClick={() => setShow(false)}
              className="text-navy-deep/30 hover:text-navy-deep transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Settings (collapsible) */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-b border-navy-deep/5"
              >
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Necessary */}
                  <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-paper">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-deep">
                        {t("categories.necessary.title")}
                      </p>
                      <p className="text-xs text-navy-deep/50 mt-0.5">
                        {t("categories.necessary.desc")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-medium text-emerald-600">
                        {t("alwaysActive")}
                      </span>
                      <Check className="size-4 text-emerald-600" />
                    </div>
                  </div>

                  {/* Functional */}
                  <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-paper">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-deep">
                        {t("categories.functional.title")}
                      </p>
                      <p className="text-xs text-navy-deep/50 mt-0.5">
                        {t("categories.functional.desc")}
                      </p>
                    </div>
                    <Toggle checked={functional} onChange={setFunctional} />
                  </div>

                  {/* Analytics */}
                  <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-paper">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-deep">
                        {t("categories.analytics.title")}
                      </p>
                      <p className="text-xs text-navy-deep/50 mt-0.5">
                        {t("categories.analytics.desc")}
                      </p>
                    </div>
                    <Toggle checked={analytics} onChange={setAnalytics} />
                  </div>

                  {/* Marketing */}
                  <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-paper">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-deep">
                        {t("categories.marketing.title")}
                      </p>
                      <p className="text-xs text-navy-deep/50 mt-0.5">
                        {t("categories.marketing.desc")}
                      </p>
                    </div>
                    <Toggle checked={marketing} onChange={setMarketing} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 p-5 sm:p-6">
            <button
              onClick={handleRejectAll}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-navy-deep border border-navy-deep/15 hover:bg-paper transition-colors"
            >
              {t("rejectAll")}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-navy-deep border border-navy-deep/15 hover:bg-paper transition-colors"
            >
              {t("settings")}
              <ChevronDown className={`size-4 transition-transform ${showSettings ? "rotate-180" : ""}`} />
            </button>
            <button
              onClick={handleSavePreferences}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-navy-deep border border-navy-deep/15 hover:bg-paper transition-colors"
            >
              {t("savePreferences")}
            </button>
            <button
              onClick={handleAcceptAll}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-navy-deep text-paper hover:bg-navy-light transition-colors"
            >
              {t("acceptAll")}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${checked ? "bg-navy-deep" : "bg-navy-deep/20"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}
