import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All locales that are supported
  locales: ["ro", "en"],

  // Used when no locale matches
  defaultLocale: "ro",

  // 'as-needed' = default locale (ro) has no prefix, others (en) get prefix
  localePrefix: "as-needed",

  // Disable automatic locale detection from Accept-Language header
  // RO is default; user switches manually via language selector
  localeDetection: false,
});
