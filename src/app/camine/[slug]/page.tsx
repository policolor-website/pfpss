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
  Calendar,
} from "lucide-react";
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

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const camin = (camineData as Camin[]).find((c) => c.slug === params.slug);
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

export default function CaminDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const camin = (camineData as Camin[]).find((c) => c.slug === params.slug);

  if (!camin) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy-deep mb-4">
              Cămin negăsit
            </h1>
            <Link
              href="/camine"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
            >
              <ArrowLeft className="size-4" />
              Înapoi la director
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

  // Find related in same judet
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
              <Link href="/" className="hover:text-navy-deep transition-colors">
                Acasă
              </Link>
              <ChevronRight className="size-3.5" />
              <Link
                href="/camine"
                className="hover:text-navy-deep transition-colors"
              >
                Director cămine
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
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center size-14 rounded-xl bg-navy-deep/10 shrink-0">
                <Building2 className="size-7 text-navy-deep" />
              </div>
              <div className="flex-1">
                <h1 className="font-heading text-2xl md:text-4xl font-bold text-navy-deep leading-tight text-balance">
                  {camin.name}
                </h1>
                {camin.judet && (
                  <div className="flex items-center gap-2 text-sm text-navy-deep/50 mt-2">
                    <MapPin className="size-4" />
                    {camin.localitate && (
                      <span>{camin.localitate}, </span>
                    )}
                    <span>Județul {camin.judet}</span>
                  </div>
                )}
              </div>
              {camin.licensed && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/30 shrink-0">
                  <ShieldCheck className="size-4 text-gold" />
                  <span className="text-xs font-semibold text-navy-deep uppercase tracking-wide">
                    Licențiat
                  </span>
                </div>
              )}
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-3 mt-6">
              {camin.rating && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-navy-deep/10">
                  <Star className="size-4 text-gold fill-gold" />
                  <span className="text-sm font-semibold text-navy-deep">
                    {camin.rating}
                  </span>
                  {camin.reviews && (
                    <span className="text-xs text-navy-deep/40">
                      ({camin.reviews} recenzii)
                    </span>
                  )}
                </div>
              )}
              {camin.capacity && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-navy-deep/10">
                  <Users className="size-4 text-navy-deep/50" />
                  <span className="text-sm font-semibold text-navy-deep">
                    {camin.capacity} locuri
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
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Contact info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact */}
                <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
                  <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                    Date de contact
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
                            Telefon
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
                            Website
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
                            Adresă
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
                      Direcții pe Google Maps
                    </a>
                  )}
                </div>

                {/* License info */}
                {camin.licensed && (
                  <div className="p-6 rounded-xl bg-gold/5 border border-gold/20">
                    <div className="flex items-center gap-3 mb-4">
                      <ShieldCheck className="size-6 text-gold" />
                      <h2 className="font-heading text-lg font-bold text-navy-deep">
                        Status licențiere
                      </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {camin.cui && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            CUI
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {camin.cui}
                          </div>
                        </div>
                      )}
                      {camin.licenseNumber && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            Nr. licență
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {camin.licenseNumber}
                          </div>
                        </div>
                      )}
                      {camin.licenseDate && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            Data licențiere
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {camin.licenseDate}
                          </div>
                        </div>
                      )}
                      {camin.capacity && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            Capacitate
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {camin.capacity} locuri
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-navy-deep/40 mt-4 leading-relaxed">
                      Date conform listei oficiale a Ministerului Muncii,
                      Familiei, Tineretului și Solidarității Sociale.
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
                      title={`Hartă — ${camin.name}`}
                    />
                  </div>
                )}
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-6">
                {/* CTA */}
                <div className="p-6 rounded-xl bg-navy-deep">
                  <h3 className="font-heading text-base font-bold text-paper mb-2">
                    Ești furnizor de servicii sociale?
                  </h3>
                  <p className="text-sm text-paper/60 leading-relaxed mb-4">
                    Alătură-te PFPSS pentru reprezentare, consultanță juridică
                    și acces la rețeaua națională.
                  </p>
                  <Link
                    href="/inscriere"
                    className="group inline-flex items-center gap-2 w-full justify-center bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                  >
                    Solicită aderarea
                  </Link>
                </div>

                {/* Related */}
                {related.length > 0 && (
                  <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
                    <h3 className="font-heading text-base font-bold text-navy-deep mb-4">
                      Alte cămine în {camin.judet}
                    </h3>
                    <div className="space-y-3">
                      {related.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/camine/${r.slug}`}
                          className="group flex items-center justify-between gap-2 text-sm text-navy-deep/70 hover:text-gold transition-colors"
                        >
                          <span className="line-clamp-1">{r.name}</span>
                          <ChevronRight className="size-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/camine?judet=${camin.judet}`}
                      className="block mt-4 pt-4 border-t border-navy-deep/5 text-sm font-semibold text-gold hover:underline"
                    >
                      Vezi toate din {camin.judet}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Back */}
            <div className="mt-10 pt-8 border-t border-navy-deep/10">
              <Link
                href="/camine"
                className="group inline-flex items-center gap-2 text-navy-deep font-semibold text-sm hover:text-gold transition-colors"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Înapoi la directorul căminelor
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
