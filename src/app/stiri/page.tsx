"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  Calendar,
  Megaphone,
  Scale,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  featured?: boolean;
};

const featuredArticle: Article = {
  slug: "scrisoare-deschisa-ministerul-muncii-iulie-2026",
  title:
    "Scrisoare deschisă către Ministerul Muncii: controale orientate către om, nu către hârtii",
  excerpt:
    "PFPSS a transmis oficial Ministerului Muncii (nr. înreg. 61/23.07.2026) o scrisoare deschisă care cere continuarea simplificării procedurilor de licențiere și reorientarea sistemului de control către protejarea efectivă a beneficiarilor — pe fondul scrisorii Comisarului pentru Drepturile Omului al Consiliului Europei adresate Guvernului României.",
  date: "23 Iulie 2026",
  category: "Advocacy",
  image: "/stiri/scrisoare-ministerul-muncii-2026.jpg",
  featured: true,
};

const articles: Article[] = [
  {
    slug: "pfpss-prezent-la-editia-a-x-a-a-conferintei-idl-iasi-2026",
    title: "PFPSS prezent la Ediția a X-a a Conferinței IDL, Iași 2026",
    excerpt:
      "PFPSS a participat la Conferința Internațională de îngrijire pe termen lung, Iași, 12-13 mai 2026.",
    date: "13 Mai 2026",
    category: "Eveniment",
    image: "/stiri/pfpss-idl-iasi-2026.jpeg",
  },
  {
    slug: "casa-alegria-centru-rezidential-pentru-varstnici-in-ploiesti",
    title: "Casa Alegria — Centru rezidențial pentru vârstnici în Ploiești",
    excerpt:
      "Două centre rezidențiale licențiate în Ploiești, pe strada Tudor Vladimirescu. Cazare, hrană, îngrijiri medicale, recuperare și asistență psihologică — într-o atmosferă caldă, ca acasă.",
    date: "2026",
    category: "Membri",
    image: "/stiri/casa-alegria.jpg",
  },
  {
    slug: "casa-orizont-camin-pentru-varstnici-in-natura-beleti-negresti-arges",
    title:
      "Casa Orizont — Cămin pentru vârstnici în natură, Beleți-Negrești, Argeș",
    excerpt:
      "Cămin pentru vârstnici la poalele Carpaților, în Beleți-Negrești, Argeș. Clădire de epocă restaurată, mobilier de anticariat, grădină de 12.000 mp și îngrijire medicală — pentru o bătrânețe demnă și liniștită.",
    date: "2026",
    category: "Membri",
    image: "/stiri/casa-orizont.jpg",
  },
  {
    slug: "luxor-clinic-centru-de-ingrijire-medicala-pentru-varstnici-in-pitesti-arges",
    title:
      "Luxor Clinic — Centru de îngrijire medicală pentru vârstnici, Pitești – Argeș",
    excerpt:
      "Centru de îngrijire medicală pentru vârstnici și pacienți care au nevoie de tratamente zilnice și supraveghere permanentă, în Pitești, Argeș. Medicină aplicată zi de zi, într-un mediu modern, sigur și uman.",
    date: "2026",
    category: "Membri",
    image: "/stiri/luxor-clinic.jpg",
  },
  {
    slug: "longevita-centru-rezidential-si-medical-pentru-seniori-in-bucuresti-ilfov",
    title:
      "LONGEVITA — Centru rezidențial și medical pentru seniori în București–Ilfov",
    excerpt:
      "Centru rezidențial și medical pentru seniori în Otopeni, Ilfov. Cu peste 14 ani de experiență, LONGEVITA oferă îngrijire permanentă, recuperare și sprijin emoțional, într-un spațiu construit pe demnitate și grijă.",
    date: "2026",
    category: "Membri",
    image: "/stiri/longevita.jpg",
  },
  {
    slug: "comunicat-de-presa-pfpss-mogosoaia",
    title:
      "COMUNICAT DE PRESĂ PFPSS — Privind materialele apărute în mediul online referitoare la un posibil centru rezidențial din zona Mogoșoaia, Ilfov",
    excerpt:
      "Patronatul Furnizorilor Privați de Servicii Sociale (PFPSS) a luat atitudine față de materialele apărute în mediul online referitoare la un posibil centru rezidențial pentru persoane vârstnice din zona Mogoșoaia, județul Ilfov.",
    date: "2025",
    category: "Comunicat",
    image: "/stiri/comunicat-presa-13-08-2024.png",
  },
  {
    slug: "katia-cicala-presedintele-pfpss-congresul-national-de-imbatranire-activa-2025",
    title:
      "Katia CICALĂ, Președintele PFPSS: vocea furnizorilor privați de servicii sociale la Congresul Național de Îmbătrânire Activă 2025",
    excerpt:
      "În calitate de Președinte al PFPSS și avocat cu experiență, Katia Cicală a participat ca speaker la Congresul Național de Îmbătrânire Activă 2025, în panelul dedicat modelului ideal de îngrijire.",
    date: "2025",
    category: "Eveniment",
    image: "/stiri/katia-cicala-congres-2025.png",
  },
  {
    slug: "conferinta-nationala-pfpss-2025",
    title:
      "Conferința Națională PFPSS 2025 – Un pas decisiv pentru redefinirea îngrijirii vârstnicilor în România",
    excerpt:
      "Conferința Națională PFPSS 2025 de la Poiana Brașov a reunit experți, autorități și furnizori de servicii sociale pentru a dezbate viitorul îngrijirii vârstnicilor și a propune soluții legislative.",
    date: "2025",
    category: "Eveniment",
    image: "/stiri/conferinta-nationala-pfpss-2025.jpg",
  },
  {
    slug: "pfpss-congres-international-ingrijire-termen-lung-polonia",
    title:
      "PFPSS a Participat la Congresul Internațional de Îngrijire pe Termen Lung din Polonia",
    excerpt:
      "Patronatul Furnizorilor Privați de Servicii Sociale (PFPSS) a avut onoarea de a participa la cea de-a 26-a ediție a Congresului Internațional de Îngrijire pe Termen Lung, desfășurat în perioada 17-19 septembrie 2024, la Toruń, Polonia.",
    date: "19 Septembrie 2024",
    category: "Eveniment",
    image: "/stiri/pfpss-congres-polonia.jpeg",
  },
  {
    slug: "comunicat-de-presa-13-08-2024",
    title: "Comunicat de Presă 13-08-2024",
    excerpt:
      "Privind situația închiderii unor cămine de bătrâni. PFPSS își exprimă poziția fermă pentru condamnarea oricăror acte de neglijență și lipsă de respect în îngrijirea bătrânilor.",
    date: "13 August 2024",
    category: "Comunicat",
    image: "/stiri/comunicat-presa-13-08-2024.png",
  },
  {
    slug: "situatia-azilelor-private-de-batrani-din-romania-o-criza-legislationala",
    title:
      "Situația Azilelor Private de Bătrâni din România: O Criză Legislațională",
    excerpt:
      "Adaptarea Codului CAEN pentru un cadru legal clar. În urma modificărilor legislative recente, considerate nepredictibile și lipsite de norme clare, multe azile private de bătrâni au optat pentru schimbarea codului CAEN.",
    date: "2024",
    category: "Analiză",
    image: "/stiri/situatia-azilelor-criza.png",
  },
  {
    slug: "raspuns-ministerul-muncii-si-solidaritatii-sociale",
    title: "Răspuns Ministerul Muncii și Solidarității Sociale",
    excerpt:
      "Ministerul Muncii și Solidarității Sociale a trimis un răspuns oficial către PFPSS, referitor la problemele actuale cu care se confruntă căminele de bătrâni din România.",
    date: "2024",
    category: "Advocacy",
    image: "/stiri/raspuns-ministerul-muncii.png",
  },
  {
    slug: "reprezentantii-ajpis-arges-au-vizitat-un-camin-de-batrani",
    title:
      "Reprezentanții AJPIS Argeș au vizitat un cămin de bătrâni și au emis un ultimatum de 30 de zile pentru închiderea centrului",
    excerpt:
      "Criza căminelor de bătrâni: Ordinul Comun și impactul asupra vârstnicilor. Florin Murgescu, administratorul unui centru pentru vârstnici din județul Argeș, se confruntă cu o situație critică.",
    date: "2024",
    category: "Advocacy",
    image: "/stiri/ajpis-arges-ultimatum.png",
  },
  {
    slug: "actualizare-importanta-minuta-dezbaterii-publice",
    title:
      "Actualizare Importantă: Minuta Dezbaterii Publice Disponibilă pe Site-ul Ministerului Muncii",
    excerpt:
      "Ministerul Muncii și Solidarității Sociale a publicat recent minuta unei dezbateri publice esențiale, evidențiind angajamentul său continuu pentru transparență și colaborare civică.",
    date: "2024",
    category: "Advocacy",
    image: "/stiri/minuta-dezbaterii-publice.png",
  },
  {
    slug: "legile-lasa-batranii-din-azile-fara-adapost",
    title: "Legile lasă bătrânii din azile fără adăpost",
    excerpt:
      "Un recent reportaj de la Observatorul Antenei 1 scoate în evidență o problemă majoră care afectează mii de bătrâni din România: legile actuale riscă să lase vârstnicii din azile fără un acoperiș deasupra capului.",
    date: "2024",
    category: "Media",
    image: "/stiri/legile-lasa-batranii-fara-adapost.png",
  },
  {
    slug: "impactul-ordinului-comun-asupra-caminelor-de-batrani",
    title: "Impactul Ordinului Comun asupra Căminelor de Bătrâni din România",
    excerpt:
      "Focus Știri Prima TV: Un nou ordin comun semnat de trei ministere pune în pericol funcționarea a peste 80% din căminele de bătrâni din România.",
    date: "2024",
    category: "Media",
    image: "/stiri/impactul-ordinului-comun.png",
  },
  {
    slug: "problema-caminelelor-de-batrani-private-lipsa-comunicare",
    title:
      "Problema Căminelelor de Bătrâni Private în România: O Lipsă de Comunicare și Înțelegere",
    excerpt:
      "În contextul actual din România, căminele de bătrâni private se confruntă cu provocări majore. Un interviu recent realizat de Andrei Gușă cu avocata Katia Cicala, președintele PFPSS.",
    date: "2024",
    category: "Analiză",
    image: "/stiri/problema-caminelelor-lipsa-comunicare.png",
  },
  {
    slug: "infiintarea-pfpss",
    title: "Înființarea PFPSS",
    excerpt:
      "Înființarea unui Patronat al Furnizorilor Privati de Servicii Sociale: o necesitate pentru România. În contextul dinamic și plin de provocări al asistenței sociale din România.",
    date: "2023",
    category: "Despre",
    image: "/stiri/infiintarea-pfpss.jpg",
  },
];

const exploreLinks = [
  {
    icon: Megaphone,
    title: "Advocacy",
    subtitle: "Campanii și poziții",
    description: "Cum reprezentăm sectorul în fața autorităților.",
    href: "/advocacy",
  },
  {
    icon: Scale,
    title: "Petiții",
    subtitle: "Semnează oficial",
    description: "Petiții active pentru modificări legislative.",
    href: "/petitii",
  },
  {
    icon: BookOpen,
    title: "Resurse",
    subtitle: "Bibliotecă legislativă",
    description: "Cadrul legal aplicabil furnizorilor privați.",
    href: "/resurse",
  },
];

export default function StiriPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-20 pb-24">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-navy-deep/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gold/20 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-6"
                >
                  <Sparkles className="size-3.5 text-navy-deep" />
                  <span className="text-xs font-medium text-navy-deep uppercase tracking-widest">
                    Știri &amp; Comunicate
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6"
                >
                  Știri, comunicate și poziții publice.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl"
                >
                  Comunicate, analize și acțiuni publice PFPSS pentru sectorul
                  rezidențial privat de îngrijire a vârstnicilor.
                </motion.p>
              </div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-navy-deep/10"
              >
                <Image
                  src="/stiri.png"
                  alt="Știri PFPSS"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Articol featured */}
        <section className="py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
            >
              <Link
                href={`/stiri/${featuredArticle.slug}`}
                className="group grid lg:grid-cols-2 gap-8 rounded-2xl border border-navy-deep/10 bg-white overflow-hidden hover:border-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-navy-deep/5"
              >
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-deep/90 backdrop-blur-sm">
                    <span className="size-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="text-xs font-semibold text-paper uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold/10 text-gold text-xs font-semibold">
                      {featuredArticle.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50">
                      <Calendar className="size-3.5" />
                      {featuredArticle.date}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep mb-4 group-hover:text-gold transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-navy-deep/60 leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                    Citește articolul
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Grid articole */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="max-w-2xl mb-14"
            >
              <div className="w-12 h-px bg-gold mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep leading-tight text-balance">
                Toate articolele
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <motion.div
                  key={article.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  custom={Math.min(i + 1, 5)}
                >
                  <Link
                    href={`/stiri/${article.slug}`}
                    className="group flex flex-col rounded-xl border border-navy-deep/10 bg-paper overflow-hidden hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5 h-full"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gold/10 text-gold text-xs font-semibold">
                          {article.category}
                        </span>
                        <span className="text-xs text-navy-deep/50">
                          {article.date}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2 group-hover:text-gold transition-colors leading-snug line-clamp-3">
                        {article.title}
                      </h3>
                      <p className="text-sm text-navy-deep/60 leading-relaxed line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                        Citește
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Explorează mai departe */}
        <section className="py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="max-w-2xl mb-14"
            >
              <div className="w-12 h-px bg-gold mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep leading-tight text-balance">
                Explorează mai departe
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {exploreLinks.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link
                    href={item.href}
                    className="group block p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5 h-full"
                  >
                    <div className="flex items-center justify-center size-14 rounded-lg bg-navy-deep/5 mb-5">
                      <item.icon className="size-7 text-navy-deep" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-navy-deep mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-gold mb-2">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-navy-deep/60 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                      Explorează
                      <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 bg-gold/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4 text-balance">
                Vocea ta contează în fața autorităților
              </h2>
              <p className="text-navy-deep/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                Alătură-te comunității PFPSS pentru reprezentare
                instituțională, consultanță juridică și acces la rețeaua de
                furnizori privați.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/inscriere"
                  className="group inline-flex items-center gap-2 bg-navy-deep text-paper px-8 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20"
                >
                  Devino membru
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-transparent text-navy-deep px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep/20 transition-all duration-300 hover:bg-navy-deep/5"
                >
                  Vorbește cu echipa
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
