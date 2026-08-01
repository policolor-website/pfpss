"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Phone,
  Globe,
  Star,
  Navigation,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import camineData from "@/data/camine-director.json";

type Camin = {
  slug: string;
  name: string;
  phone: string;
  website: string;
  address: string;
  lat: string;
  lng: string;
  judet: string;
  rating: string;
  reviews: string;
  licensed: boolean;
  capacity: string;
  licenseNumber: string;
  localitate: string;
  serviceType: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const PER_PAGE = 24;

export default function CamineDirectorPage() {
  const [search, setSearch] = useState("");
  const [judetFilter, setJudetFilter] = useState("");
  const [licensedOnly, setLicensedOnly] = useState(false);
  const [withPhoneOnly, setWithPhoneOnly] = useState(false);
  const [page, setPage] = useState(1);

  const judete = useMemo(() => {
    const set = new Set<string>();
    camineData.forEach((c: Camin) => {
      if (c.judet) set.add(c.judet);
    });
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    let result = camineData as Camin[];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q) ||
          c.localitate.toLowerCase().includes(q) ||
          c.judet.toLowerCase().includes(q)
      );
    }

    if (judetFilter) {
      result = result.filter((c) => c.judet === judetFilter);
    }

    if (licensedOnly) {
      result = result.filter((c) => c.licensed);
    }

    if (withPhoneOnly) {
      result = result.filter((c) => c.phone);
    }

    return result;
  }, [search, judetFilter, licensedOnly, withPhoneOnly]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const currentData = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const stats = useMemo(() => {
    const total = camineData.length;
    const licensed = (camineData as Camin[]).filter((c) => c.licensed).length;
    const withPhone = (camineData as Camin[]).filter((c) => c.phone).length;
    const withWebsite = (camineData as Camin[]).filter((c) => c.website).length;
    return { total, licensed, withPhone, withWebsite };
  }, []);

  const resetFilters = () => {
    setSearch("");
    setJudetFilter("");
    setLicensedOnly(false);
    setWithPhoneOnly(false);
    setPage(1);
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-20 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-navy-deep/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gold/20 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-sm text-navy-deep/50 mb-6"
            >
              <Link href="/" className="hover:text-navy-deep transition-colors">
                Acasă
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-navy-deep/70">Director cămine</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-6"
            >
              <Sparkles className="size-3.5 text-navy-deep" />
              <span className="text-xs font-medium text-navy-deep uppercase tracking-widest">
                Director național
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6"
            >
              Directorul căminelor de bătrâni din România
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl mb-8"
            >
              {stats.total} cămine indexate la nivel național — cu date de
              contact, locație, status de licențiere și capacitate.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl"
            >
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {stats.total}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Total cămine
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {stats.licensed}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Licențiate
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {stats.withPhone}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Cu telefon
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {judete.length}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Județe
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Director */}
        <section className="py-12 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            {/* Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-navy-deep/30" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Caută după nume, localitate, adresă..."
                    className="w-full pl-12 pr-4 py-3.5 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all bg-white"
                  />
                </div>
                <select
                  value={judetFilter}
                  onChange={(e) => {
                    setJudetFilter(e.target.value);
                    setPage(1);
                  }}
                  className="px-4 py-3.5 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all bg-white cursor-pointer min-w-[180px]"
                >
                  <option value="">Toate județele</option>
                  {judete.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setLicensedOnly(!licensedOnly);
                    setPage(1);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    licensedOnly
                      ? "bg-gold/15 text-navy-deep border border-gold/30"
                      : "bg-white text-navy-deep/60 border border-navy-deep/10 hover:border-navy-deep/20"
                  }`}
                >
                  <ShieldCheck className="size-4" />
                  Doar licențiate
                </button>
                <button
                  onClick={() => {
                    setWithPhoneOnly(!withPhoneOnly);
                    setPage(1);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    withPhoneOnly
                      ? "bg-gold/15 text-navy-deep border border-gold/30"
                      : "bg-white text-navy-deep/60 border border-navy-deep/10 hover:border-navy-deep/20"
                  }`}
                >
                  <Phone className="size-4" />
                  Cu telefon
                </button>
                <span className="text-sm text-navy-deep/40 ml-auto">
                  {filtered.length} rezultate
                </span>
                {(search || judetFilter || licensedOnly || withPhoneOnly) && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-gold hover:underline font-medium"
                  >
                    Resetează filtre
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            {currentData.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-navy-deep/40 text-lg">
                  Niciun rezultat găsit.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-gold hover:underline font-medium"
                >
                  Resetează filtre
                </button>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentData.map((cam, i) => (
                    <motion.div
                      key={cam.slug}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-30px" }}
                      variants={fadeUp}
                      custom={i % PER_PAGE}
                    >
                      <Link
                        href={`/camine/${cam.slug}`}
                        className="group block h-full p-5 rounded-xl bg-white border border-navy-deep/8 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="font-heading text-base font-semibold text-navy-deep leading-snug group-hover:text-gold transition-colors line-clamp-2">
                            {cam.name}
                          </h3>
                          {cam.licensed && (
                            <ShieldCheck className="size-5 text-gold shrink-0" />
                          )}
                        </div>

                        {cam.address && (
                          <div className="flex items-start gap-2 text-sm text-navy-deep/50 mb-2">
                            <MapPin className="size-4 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{cam.address}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-3 text-xs text-navy-deep/40 mb-3">
                          {cam.judet && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="size-3" />
                              {cam.judet}
                            </span>
                          )}
                          {cam.capacity && (
                            <span className="inline-flex items-center gap-1">
                              <Users className="size-3" />
                              {cam.capacity} locuri
                            </span>
                          )}
                          {cam.rating && (
                            <span className="inline-flex items-center gap-1">
                              <Star className="size-3 text-gold fill-gold" />
                              {cam.rating}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-navy-deep/5">
                          {cam.phone && (
                            <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50">
                              <Phone className="size-3" />
                              Telefon
                            </span>
                          )}
                          {cam.website && (
                            <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50">
                              <Globe className="size-3" />
                              Website
                            </span>
                          )}
                          {cam.lat && cam.lng && (
                            <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50 ml-auto">
                              <Navigation className="size-3" />
                              Directions
                            </span>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 text-sm font-medium rounded-lg border border-navy-deep/10 bg-white text-navy-deep disabled:opacity-30 hover:border-gold/30 transition-all"
                    >
                      Anterior
                    </button>
                    {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                      let p: number;
                      if (totalPages <= 7) {
                        p = i + 1;
                      } else if (page <= 4) {
                        p = i + 1;
                      } else if (page >= totalPages - 3) {
                        p = totalPages - 6 + i;
                      } else {
                        p = page - 3 + i;
                      }
                      return (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`w-10 h-10 text-sm font-medium rounded-lg transition-all ${
                            p === page
                              ? "bg-navy-deep text-white"
                              : "bg-white text-navy-deep border border-navy-deep/10 hover:border-gold/30"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 text-sm font-medium rounded-lg border border-navy-deep/10 bg-white text-navy-deep disabled:opacity-30 hover:border-gold/30 transition-all"
                    >
                      Următor
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
