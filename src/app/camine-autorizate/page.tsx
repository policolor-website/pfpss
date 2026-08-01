"use client";

import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Search, Filter, X } from "lucide-react";
import camineData from "@/data/camine-autorizate.json";

type Camin = {
  tip: string;
  furnizor: string;
  denumire: string;
  judet: string;
  localitate: string;
  adresa: string;
  capacitate: string;
  dataLicenta: string;
  nrLicenta: string;
};

const judeteList = [...new Set(camineData.map((c: Camin) => c.judet))].sort();

export default function CamineAutorizatePage() {
  const [search, setSearch] = useState("");
  const [judet, setJudet] = useState("");
  const [tip, setTip] = useState("");

  const filtered = useMemo(() => {
    return (camineData as Camin[]).filter((c) => {
      const matchSearch =
        !search ||
        `${c.furnizor} ${c.denumire} ${c.adresa} ${c.localitate} ${c.judet}`
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchJudet = !judet || c.judet === judet;
      const matchTip = !tip || c.tip.includes(tip);
      return matchSearch && matchJudet && matchTip;
    });
  }, [search, judet, tip]);

  const resetFilters = () => {
    setSearch("");
    setJudet("");
    setTip("");
  };

  const total = camineData.length;
  const privateCount = (camineData as Camin[]).filter((c) =>
    c.tip.toLowerCase().includes("privat")
  ).length;
  const publicCount = (camineData as Camin[]).filter((c) =>
    c.tip.toLowerCase().includes("public")
  ).length;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gold/20 py-16 px-6 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-3">
            Cămine pentru persoane vârstnice licențiate
          </h1>
          <p className="text-navy-deep/60 text-sm md:text-base">
            Sursa: Ministerul Muncii, Familiei, Tineretului și Solidarității
            Sociale · Data: 10.03.2026
          </p>
        </section>

        {/* Stats */}
        <section className="bg-white border-b border-navy-deep/10 py-6 px-6">
          <div className="max-w-7xl mx-auto flex gap-8 justify-center flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-bold text-navy-deep">{total}</div>
              <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                Total
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-navy-deep">
                {privateCount}
              </div>
              <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                Private
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-navy-deep">
                {publicCount}
              </div>
              <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                Publice
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-navy-deep">
                {judeteList.length}
              </div>
              <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                Județe
              </div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="sticky top-0 z-50 bg-white border-b border-navy-deep/10 py-4 px-6">
          <div className="max-w-7xl mx-auto flex gap-3 flex-wrap items-center justify-center">
            <div className="relative flex-1 min-w-[200px] max-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-navy-deep/40" />
              <input
                type="text"
                placeholder="Caută nume, furnizor, adresă..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all"
              />
            </div>
            <select
              value={judet}
              onChange={(e) => setJudet(e.target.value)}
              className="px-4 py-2.5 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 cursor-pointer min-w-[160px]"
            >
              <option value="">Toate județele</option>
              {judeteList.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
            <select
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="px-4 py-2.5 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 cursor-pointer"
            >
              <option value="">Toate tipurile</option>
              <option value="Privat">Private</option>
              <option value="Public">Publice</option>
            </select>
            {(search || judet || tip) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm bg-navy-deep text-white rounded-lg hover:bg-navy-deep/90 transition-colors"
              >
                <X className="size-4" />
                Reset
              </button>
            )}
          </div>
        </section>

        {/* Result count */}
        <div className="text-center py-3 text-sm text-navy-deep/50 bg-paper border-b border-navy-deep/5">
          {filtered.length} cămine afișate
        </div>

        {/* Desktop table */}
        <section className="py-6 px-6">
          <div className="max-w-7xl mx-auto overflow-x-auto hidden md:block">
            <table className="w-full border-collapse bg-white text-sm">
              <thead className="sticky top-[56px] z-40">
                <tr className="bg-navy-deep text-white">
                  <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">
                    Tip
                  </th>
                  <th className="px-3 py-3 text-left font-semibold">
                    Furnizor
                  </th>
                  <th className="px-3 py-3 text-left font-semibold">Serviciu</th>
                  <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">
                    Județ
                  </th>
                  <th className="px-3 py-3 text-left font-semibold">
                    Localitate
                  </th>
                  <th className="px-3 py-3 text-left font-semibold">Adresă</th>
                  <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">
                    Capacitate
                  </th>
                  <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">
                    Licență din
                  </th>
                  <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">
                    Nr. licență
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={i}
                    className="border-b border-navy-deep/5 hover:bg-gold/5 transition-colors"
                  >
                    <td className="px-3 py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          c.tip.toLowerCase().includes("privat")
                            ? "bg-amber-100 text-amber-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {c.tip}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-navy-deep">
                      {c.furnizor}
                    </td>
                    <td className="px-3 py-2.5 text-navy-deep/70">
                      {c.denumire}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      {c.judet}
                    </td>
                    <td className="px-3 py-2.5">{c.localitate}</td>
                    <td className="px-3 py-2.5 text-navy-deep/60 text-xs">
                      {c.adresa}
                    </td>
                    <td className="px-3 py-2.5 text-center whitespace-nowrap">
                      {c.capacitate}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-navy-deep/60">
                      {c.dataLicenta}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-navy-deep/60 text-xs">
                      {c.nrLicenta}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-navy-deep/10 p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-1.5 ${
                        c.tip.toLowerCase().includes("privat")
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {c.tip}
                    </span>
                    <h3 className="font-semibold text-navy-deep text-sm leading-snug">
                      {c.denumire}
                    </h3>
                  </div>
                  <span className="text-xs text-navy-deep/40 whitespace-nowrap">
                    {c.judet}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between gap-3">
                    <span className="font-semibold text-navy-deep/60 flex-shrink-0">
                      Furnizor
                    </span>
                    <span className="text-navy-deep text-right">
                      {c.furnizor}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="font-semibold text-navy-deep/60 flex-shrink-0">
                      Localitate
                    </span>
                    <span className="text-navy-deep text-right">
                      {c.localitate}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="font-semibold text-navy-deep/60 flex-shrink-0">
                      Adresă
                    </span>
                    <span className="text-navy-deep/70 text-right">
                      {c.adresa}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="font-semibold text-navy-deep/60 flex-shrink-0">
                      Capacitate
                    </span>
                    <span className="text-navy-deep text-right">
                      {c.capacitate}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="font-semibold text-navy-deep/60 flex-shrink-0">
                      Licență din
                    </span>
                    <span className="text-navy-deep/70 text-right">
                      {c.dataLicenta}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="font-semibold text-navy-deep/60 flex-shrink-0">
                      Nr. licență
                    </span>
                    <span className="text-navy-deep/70 text-right">
                      {c.nrLicenta}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className="text-center py-8 text-xs text-navy-deep/40 border-t border-navy-deep/5">
          Date extrase din PDF oficial MMJS · {total} cămine licențiate la
          10.03.2026
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
