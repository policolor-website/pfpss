import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PFPSS — Patronatul Furnizorilor Privați de Servicii Sociale",
    template: "%s | PFPSS",
  },
  description:
    "Patronatul Furnizorilor Privați de Servicii Sociale din România — organizația reprezentativă a sectorului rezidențial privat de îngrijire a vârstnicilor.",
  keywords: [
    "PFPSS",
    "patronat",
    "furnizori servicii sociale",
    "cămine de bătrâni",
    "îngrijire vârstnici",
    "România",
  ],
  authors: [{ name: "PFPSS" }],
  openGraph: {
    title: "PFPSS — Patronatul Furnizorilor Privați de Servicii Sociale",
    description:
      "Vocea furnizorilor privați de servicii sociale din România.",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper w-full">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
