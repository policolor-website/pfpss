import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Globe,
  MapPin,
  Star,
  Navigation,
  ShieldCheck,
  Users,
  FileText,
  ChevronRight,
  ArrowLeft,
  Building2,
} from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import camineData from "@/data/camine-director.json";

type Camin = {
  slug: string;
  name: string;
  phone: string;
  internationalPhone: string;
  website: string;
  address: string;
  lat: string | number;
  lng: string | number;
  judet: string;
  rating: string | number;
  reviews: string | number;
  licensed: boolean;
  capacity: string;
  licenseNumber: string;
  licenseDate: string;
  cui: string;
  serviceType: string;
  localitate: string;
};

export function generateStaticParams() {
  return (camineData as Camin[]).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const camin = (camineData as Camin[]).find((c) => c.slug === slug);
  if (!camin) {
    return { title: "Cămin negăsit — PFPSS" };
  }
  return {
    title: `${camin.name} — Cămin de bătrâni${camin.judet ? ` ${camin.judet}` : ""} | PFPSS`,
    description: `${camin.name}${camin.address ? `, ${camin.address}` : ""}${
      camin.phone ? ` — Tel: ${camin.phone}` : ""
    }${camin.licensed ? " — Licențiat MMJS" : ""}`,
  };
}

export default async function CaminDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("camineDetail");
  const locale = await getLocale();
  const prefix = locale === "en" ? "/en" : "";
  const camin = (camineData as Camin[]).find((c) => c.slug === slug);

  if (!camin) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy-deep mb-4">
              {t("notFound")}
            </h1>
            <Link
              href={`${prefix}/camine`}
              className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
            >
              <ArrowLeft className="size-4" />
              {t("backToDirector")}
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const hasCoords = camin.lat && camin.lng;
  const mapsDirectionsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${camin.lat},${camin.lng}`
    : camin.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(camin.name + " " + camin.address)}`
      : "";

  const mapsEmbedUrl = hasCoords
    ? `https://maps.google.com/maps?q=${camin.lat},${camin.lng}&z=14&output=embed`
    : "";

  const related = (camineData as Camin[])
    .filter((c) => c.judet === camin.judet && c.slug !== camin.slug)
    .slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gold/10 border-b border-navy-deep/5">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <nav className="flex items-center gap-2 text-sm text-navy-deep/50">
              <Link href={prefix || "/"} className="hover:text-navy-deep transition-colors">
                {t("breadcrumb.home")}
              </Link>
              <ChevronRight className="size-3.5" />
              <Link
                href={`${prefix}/camine`}
                className="hover:text-navy-deep transition-colors"
              >
                {t("breadcrumb.director")}
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-navy-deep/70 truncate">{camin.name}</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <section className="relative overflow-hidden bg-gold/20 pt-12 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-navy-deep/10 rounded-full blur-[120px]" />

          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
              <div className="flex items-center justify-center size-12 sm:size-14 rounded-xl bg-navy-deep/10 shrink-0">
                <Building2 className="size-6 sm:size-7 text-navy-deep" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-heading text-xl sm:text-2xl md:text-4xl font-bold text-navy-deep leading-tight text-balance">
                  {camin.name}
                </h1>
                {camin.judet && (
                  <div className="flex items-center gap-2 text-sm text-navy-deep/50 mt-2">
                    <MapPin className="size-4 shrink-0" />
                    {camin.localitate && (
                      <span>{camin.localitate}, </span>
                    )}
                    <span>{t("county")} {camin.judet}</span>
                  </div>
                )}
              </div>
              {camin.licensed && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/30 shrink-0 self-start">
                  <ShieldCheck className="size-4 text-gold" />
                  <span className="text-xs font-semibold text-navy-deep uppercase tracking-wide">
                    {t("licensed")}
                  </span>
                </div>
              )}
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6">
              {camin.rating && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-navy-deep/10">
                  <Star className="size-4 text-gold fill-gold" />
                  <span className="text-sm font-semibold text-navy-deep">
                    {camin.rating}
                  </span>
                  {camin.reviews && (
                    <span className="text-xs text-navy-deep/40">
                      ({t("reviews", { count: camin.reviews })})
                    </span>
                  )}
                </div>
              )}
              {camin.capacity && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-navy-deep/10">
                  <Users className="size-4 text-navy-deep/50" />
                  <span className="text-sm font-semibold text-navy-deep">
                    {t("capacity", { count: camin.capacity })}
                  </span>
                </div>
              )}
              {camin.serviceType && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-navy-deep/10">
                  <FileText className="size-4 text-navy-deep/50" />
                  <span className="text-sm text-navy-deep/70">
                    {camin.serviceType}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-paper">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Contact info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact */}
                <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
                  <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                    {t("contactInfo")}
                  </h2>
                  <div className="space-y-3">
                    {camin.phone && (
                      <a
                        href={`tel:${camin.internationalPhone || camin.phone}`}
                        className="group flex items-center gap-4 p-3 rounded-lg bg-paper hover:bg-gold/5 transition-colors"
                      >
                        <div className="flex items-center justify-center size-10 rounded-lg bg-gold/10 group-hover:bg-gold transition-colors">
                          <Phone className="size-5 text-gold group-hover:text-navy-deep transition-colors" />
                        </div>
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide">
                            {t("phone")}
                          </div>
                          <div className="font-heading text-base font-semibold text-navy-deep">
                            {camin.phone}
                          </div>
                        </div>
                      </a>
                    )}
                    {camin.website && (
                      <a
                        href={camin.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-3 rounded-lg bg-paper hover:bg-gold/5 transition-colors"
                      >
                        <div className="flex items-center justify-center size-10 rounded-lg bg-gold/10 group-hover:bg-gold transition-colors">
                          <Globe className="size-5 text-gold group-hover:text-navy-deep transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide">
                            {t("website")}
                          </div>
                          <div className="font-heading text-base font-semibold text-navy-deep truncate">
                            {camin.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                          </div>
                        </div>
                      </a>
                    )}
                    {camin.address && (
                      <div className="flex items-center gap-4 p-3 rounded-lg bg-paper">
                        <div className="flex items-center justify-center size-10 rounded-lg bg-navy-deep/5">
                          <MapPin className="size-5 text-navy-deep" />
                        </div>
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide">
                            {t("address")}
                          </div>
                          <div className="text-sm text-navy-deep/80">
                            {camin.address}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Directions button */}
                  {mapsDirectionsUrl && (
                    <a
                      href={mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 mt-5 w-full justify-center bg-navy-deep text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-navy-deep/90 hover:shadow-lg hover:shadow-navy-deep/20"
                    >
                      <Navigation className="size-4" />
                      {t("directions")}
                    </a>
                  )}
                </div>

                {/* License info */}
                {camin.licensed && (
                  <div className="p-6 rounded-xl bg-gold/5 border border-gold/20">
                    <div className="flex items-center gap-3 mb-4">
                      <ShieldCheck className="size-6 text-gold" />
                      <h2 className="font-heading text-lg font-bold text-navy-deep">
                        {t("licenseStatus")}
                      </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {camin.cui && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            {t("cui")}
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {camin.cui}
                          </div>
                        </div>
                      )}
                      {camin.licenseNumber && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            {t("licenseNumber")}
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {camin.licenseNumber}
                          </div>
                        </div>
                      )}
                      {camin.licenseDate && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            {t("licenseDate")}
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {camin.licenseDate}
                          </div>
                        </div>
                      )}
                      {camin.capacity && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            {t("capacityLabel")}
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {t("capacity", { count: camin.capacity })}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-navy-deep/40 mt-4 leading-relaxed">
                      {t("licenseSource")}
                    </p>
                  </div>
                )}

                {/* Map */}
                {mapsEmbedUrl && (
                  <div className="rounded-xl overflow-hidden border border-navy-deep/10 shadow-sm">
                    <iframe
                      src={mapsEmbedUrl}
                      width="100%"
                      height="350"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${t("mapTitle")} — ${camin.name}`}
                    />
                  </div>
                )}
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-6">
                {/* Contact CTA */}
                <div className="p-6 rounded-xl bg-navy-deep">
                  <h3 className="font-heading text-base font-bold text-paper mb-2">
                    {t("contactCta.title")}
                  </h3>
                  <p className="text-sm text-paper/60 leading-relaxed mb-4">
                    {t("contactCta.description")}
                  </p>
                  {camin.phone ? (
                    <a
                      href={`tel:${camin.internationalPhone || camin.phone}`}
                      className="group inline-flex items-center gap-2 w-full justify-center bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                    >
                      <Phone className="size-4" />
                      {camin.phone}
                    </a>
                  ) : camin.website ? (
                    <a
                      href={camin.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 w-full justify-center bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                    >
                      <Globe className="size-4" />
                      {t("visitWebsite")}
                    </a>
                  ) : mapsDirectionsUrl ? (
                    <a
                      href={mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 w-full justify-center bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                    >
                      <Navigation className="size-4" />
                      {t("mapDirections")}
                    </a>
                  ) : (
                    <Link
                      href={`${prefix}/contact`}
                      className="group inline-flex items-center gap-2 w-full justify-center bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                    >
                      {t("contactPfpss")}
                    </Link>
                  )}
                </div>

                {/* Related */}
                {related.length > 0 && (
                  <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
                    <h3 className="font-heading text-base font-bold text-navy-deep mb-4">
                      {t("related", { judet: camin.judet })}
                    </h3>
                    <div className="space-y-3">
                      {related.map((r) => (
                        <Link
                          key={r.slug}
                          href={`${prefix}/camine/${r.slug}`}
                          className="group flex items-center justify-between gap-2 text-sm text-navy-deep/70 hover:text-gold transition-colors"
                        >
                          <span className="line-clamp-1">{r.name}</span>
                          <ChevronRight className="size-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`${prefix}/camine?judet=${camin.judet}`}
                      className="block mt-4 pt-4 border-t border-navy-deep/5 text-sm font-semibold text-gold hover:underline"
                    >
                      {t("seeAllIn", { judet: camin.judet })}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Back */}
            <div className="mt-10 pt-8 border-t border-navy-deep/10">
              <Link
                href={`${prefix}/camine`}
                className="group inline-flex items-center gap-2 text-navy-deep font-semibold text-sm hover:text-gold transition-colors"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                {t("backToDirectorFull")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
