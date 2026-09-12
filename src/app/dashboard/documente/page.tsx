"use client";

import { useEffect, useState } from "react";
import { FileText, Download, Lock, FileCheck, BookOpen, Scale, BarChart3 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Doc = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  members_only: boolean;
  created_at: string;
};

const categoryConfig: Record<string, { label: string; icon: any }> = {
  "cod-etic": { label: "Cod Etic", icon: Scale },
  "ghid": { label: "Ghid", icon: BookOpen },
  "model": { label: "Model", icon: FileText },
  "raport": { label: "Raport", icon: BarChart3 },
  "regulament": { label: "Regulament", icon: FileCheck },
};

export default function DocumentePage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: org } = await supabase
        .from("organizations")
        .select("status")
        .eq("user_id", user.id)
        .single();
      setApproved(org?.status === "approved");

      const { data } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });
      setDocs(data || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 border-2 border-navy-deep/20 border-t-navy-deep rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-lg bg-navy-deep/5 flex items-center justify-center">
          <FileText className="size-5 text-navy-deep" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-deep">Documente</h1>
          <p className="text-sm text-navy-deep/50">
            Resurse și documente pentru membrii PFPSS
          </p>
        </div>
      </div>

      {!approved ? (
        <div className="flex items-start gap-3 p-5 rounded-xl bg-amber-50 border border-amber-200">
          <Lock className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">Documentele sunt restricționate</p>
            <p className="text-sm text-amber-700 mt-1">
              Documentele private sunt disponibile după aprobarea cererii de aderare.
            </p>
          </div>
        </div>
      ) : docs.length === 0 ? (
        <p className="text-sm text-navy-deep/40 py-12 text-center">
          Nu există documente disponibile momentan.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {docs.map((doc) => {
            const cat = categoryConfig[doc.category] || categoryConfig["ghid"];
            const Icon = cat.icon;
            return (
              <div
                key={doc.id}
                className="group p-5 rounded-xl bg-white border border-navy-deep/10 hover:border-gold/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="size-11 rounded-lg bg-navy-deep/5 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                    <Icon className="size-5 text-navy-deep group-hover:text-gold transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-navy-deep/40 uppercase tracking-wider">
                        {cat.label}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-navy-deep mb-1">
                      {doc.title}
                    </h3>
                    {doc.description && (
                      <p className="text-xs text-navy-deep/50 leading-relaxed mb-3">
                        {doc.description}
                      </p>
                    )}
                    <a
                      href={doc.file_url}
                      download
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:underline"
                    >
                      <Download className="size-3.5" />
                      Descarcă
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
