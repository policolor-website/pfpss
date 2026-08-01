"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, TrendingUp, MapPin, Users, Landmark, BarChart3 } from "lucide-react";

type Badge = {
  icon: typeof CheckCircle2;
  label: string;
  value: string;
  color: "gold" | "navy" | "green";
};

const colorMap = {
  gold: "bg-gold/10 text-gold border-gold/20",
  navy: "bg-navy-deep/5 text-navy-deep border-navy-deep/15",
  green: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const badgeSets: Badge[][] = [
  // Advocacy
  [
    { icon: BarChart3, label: "T1", value: "3 acțiuni", color: "navy" },
    { icon: TrendingUp, label: "T2", value: "5 acțiuni", color: "gold" },
    { icon: TrendingUp, label: "T3", value: "7 acțiuni", color: "gold" },
    { icon: BarChart3, label: "T4", value: "4 acțiuni", color: "navy" },
  ],
  // Standards
  [
    { icon: CheckCircle2, label: "Certificați", value: "18", color: "gold" },
    { icon: Clock, label: "În proces", value: "7", color: "navy" },
    { icon: CheckCircle2, label: "Standard gold", value: "72%", color: "green" },
    { icon: TrendingUp, label: "Recertificare", value: "Q3", color: "navy" },
  ],
  // Representation
  [
    { icon: Users, label: "Membri", value: "25", color: "gold" },
    { icon: MapPin, label: "Județe", value: "42", color: "navy" },
    { icon: Landmark, label: "Instituții", value: "8", color: "gold" },
    { icon: Users, label: "Reuniuni", value: "12", color: "navy" },
  ],
  // Sector status — Statutul căminelor
  [
    { icon: CheckCircle2, label: "Autorizate", value: "847", color: "gold" },
    { icon: Clock, label: "În proces", value: "243", color: "navy" },
    { icon: TrendingUp, label: "Închise", value: "52", color: "green" },
    { icon: BarChart3, label: "Total", value: "1.142", color: "gold" },
  ],
  // Licensing timeline — Evoluția licențierilor
  [
    { icon: TrendingUp, label: "Emise 2026", value: "847", color: "gold" },
    { icon: TrendingUp, label: "Emise 2025", value: "920", color: "navy" },
    { icon: Clock, label: "Retrase 2026", value: "52", color: "green" },
    { icon: BarChart3, label: "Emise 2024", value: "847", color: "navy" },
  ],
  // PFPSS activity — Activitatea PFPSS
  [
    { icon: BarChart3, label: "Petiții", value: "42", color: "gold" },
    { icon: Landmark, label: "Scrisori", value: "18", color: "navy" },
    { icon: Users, label: "Întâlniri", value: "27", color: "gold" },
    { icon: TrendingUp, label: "Iul", value: "9 acțiuni", color: "navy" },
  ],
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function LiveBadges({ setIndex }: { setIndex: number }) {
  const sourceBadges = badgeSets[setIndex] ?? badgeSets[0];
  const [visible, setVisible] = useState<Badge[]>(() => shuffle(sourceBadges).slice(0, 2));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tick === 0) return;
    const pool = shuffle(sourceBadges);
    const next = pool.slice(0, 2 + (tick % 2));
    setVisible(next);
  }, [tick, sourceBadges]);

  return (
    <div className="flex flex-wrap gap-2 min-h-[28px]">
      <AnimatePresence mode="popLayout">
        {visible.map((badge, i) => (
          <motion.div
            key={`${badge.label}-${tick}-${i}`}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${colorMap[badge.color]}`}
          >
            <badge.icon className="size-3 shrink-0" />
            <span>{badge.label}</span>
            <span className="font-bold">{badge.value}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
