import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  Navigare: [
    { href: "/despre", label: "Despre noi" },
    { href: "/advocacy", label: "Advocacy" },
    { href: "/petitii", label: "Petiții" },
    { href: "/resurse", label: "Resurse" },
    { href: "/stiri", label: "Știri" },
    { href: "/inscriere", label: "Devino membru" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/confidentialitate", label: "Confidențialitate" },
    { href: "/termeni", label: "Termeni" },
    { href: "/cookies", label: "Cookies" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="pt-20 pb-10 bg-paper border-t border-navy-deep/10 text-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 md:gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo-pfpss.png"
                alt="PFPSS — Patronatul Furnizorilor Privați de Servicii Sociale"
                width={200}
                height={58}
                className="h-12 w-auto mb-3"
              />
            </div>
            <p className="text-sm text-navy-deep/70 leading-relaxed max-w-md">
              Patronatul Furnizorilor Privați de Servicii Sociale din România
              este organizația reprezentativă a sectorului rezidențial privat de
              îngrijire a vârstnicilor.
            </p>
            <dl className="mt-6 text-xs text-navy-deep/60 space-y-1">
              <div className="flex gap-2">
                <dt className="font-semibold">Denumire:</dt>
                <dd>Patronatul Furnizorilor Privați de Servicii Sociale</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">CUI:</dt>
                <dd>50457026</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">Sediu:</dt>
                <dd>
                  Phoenicia Business Center, Corp A, interfon 14, Str.
                  Turturelelor 11b, bl. A, sc. A, et. 1, ap. a14, Sector 3,
                  București
                </dd>
              </div>
            </dl>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <Phone className="size-4 shrink-0 text-gold mt-0.5" />
                <a
                  href="tel:+40732009000"
                  className="hover:text-gold transition-colors"
                >
                  0732 009 000
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="size-4 shrink-0 text-gold mt-0.5" />
                <a
                  href="mailto:office@pfpss.ro"
                  className="hover:text-gold transition-colors"
                >
                  office@pfpss.ro
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="size-4 shrink-0 text-gold mt-0.5" />
                <span>
                  Phoenicia Business Center, Corp A, interfon 14, Str.
                  Turturelelor 11b, Sector 3, București
                </span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
              Navigare
            </h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.Navigare.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ANPC + bottom bar */}
        <div className="border-t border-navy-deep/10 pt-6 mb-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-navy-deep/70">
            Soluționarea litigiilor:
          </span>
          <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-navy-deep/60 hover:text-navy-deep transition-colors"
          >
            ANPC — SAL
          </a>
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-navy-deep/60 hover:text-navy-deep transition-colors"
          >
            ANPC — SOL
          </a>
          <a
            href="https://anpc.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-navy-deep/60 hover:text-navy-deep transition-colors"
          >
            ANPC
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-navy-deep/60 sm:ml-auto">
            {footerLinks.Legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-navy-deep transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-navy-deep/10 text-center">
          <span className="text-xs text-navy-deep/50">
            © {new Date().getFullYear()} PFPSS. Toate drepturile rezervate.
          </span>
        </div>
      </div>
    </footer>
  );
}
