"use client";

import { FileText, Upload, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AdminDocumentePage() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-navy-deep mb-1">
          {t("docs.title")}
        </h1>
        <p className="text-navy-deep/50">
          {t("docs.subtitle")}
        </p>
      </div>

      <div className="p-12 rounded-xl bg-white border border-navy-deep/10 text-center">
        <div className="size-14 rounded-lg bg-navy-deep/5 flex items-center justify-center mx-auto mb-4">
          <FileText className="size-7 text-navy-deep/40" />
        </div>
        <p className="text-sm text-navy-deep/50 max-w-md mx-auto">
          {t("docs.comingSoon")}
        </p>
      </div>
    </div>
  );
}
