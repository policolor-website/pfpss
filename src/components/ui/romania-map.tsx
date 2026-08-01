"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type County = {
  id: string;
  label: string;
  x: number;
  y: number;
};

function arcPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curvature = 0.3
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / dist;
  const ny = dx / dist;
  const cx = mx + nx * dist * curvature;
  const cy = my + ny * dist * curvature;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

// All 42 counties — centroids from the Highcharts SVG (viewBox -10 -10 720 510)
const counties: County[] = [
  { id: "RO.BI", label: "București", x: 429, y: 404 },
  { id: "RO.AB", label: "Alba", x: 237, y: 233 },
  { id: "RO.AG", label: "Argeș", x: 339, y: 345 },
  { id: "RO.AR", label: "Arad", x: 110, y: 199 },
  { id: "RO.BC", label: "Bacău", x: 481, y: 198 },
  { id: "RO.BH", label: "Bihor", x: 141, y: 127 },
  { id: "RO.BN", label: "Bistrița-Năsăud", x: 319, y: 115 },
  { id: "RO.BR", label: "Brăila", x: 544, y: 333 },
  { id: "RO.BT", label: "Botoșani", x: 481, y: 45 },
  { id: "RO.BV", label: "Brașov", x: 377, y: 263 },
  { id: "RO.BZ", label: "Buzău", x: 478, y: 317 },
  { id: "RO.CJ", label: "Cluj", x: 240, y: 144 },
  { id: "RO.CL", label: "Călărași", x: 509, y: 420 },
  { id: "RO.CS", label: "Caraș-Severin", x: 124, y: 323 },
  { id: "RO.CT", label: "Constanța", x: 582, y: 425 },
  { id: "RO.CV", label: "Covasna", x: 422, y: 248 },
  { id: "RO.DB", label: "Dâmbovița", x: 393, y: 351 },
  { id: "RO.DJ", label: "Dolj", x: 235, y: 423 },
  { id: "RO.GJ", label: "Gorj", x: 213, y: 346 },
  { id: "RO.GL", label: "Galați", x: 553, y: 266 },
  { id: "RO.GR", label: "Giurgiu", x: 420, y: 437 },
  { id: "RO.HD", label: "Hunedoara", x: 199, y: 255 },
  { id: "RO.HR", label: "Harghita", x: 394, y: 174 },
  { id: "RO.IF", label: "Ilfov", x: 435, y: 398 },
  { id: "RO.IL", label: "Ialomița", x: 512, y: 388 },
  { id: "RO.IS", label: "Iași", x: 520, y: 114 },
  { id: "RO.MH", label: "Mehedinți", x: 177, y: 382 },
  { id: "RO.MM", label: "Maramureș", x: 282, y: 60 },
  { id: "RO.MS", label: "Mureș", x: 325, y: 177 },
  { id: "RO.NT", label: "Neamț", x: 458, y: 139 },
  { id: "RO.OT", label: "Olt", x: 299, y: 414 },
  { id: "RO.PH", label: "Prahova", x: 424, y: 333 },
  { id: "RO.SB", label: "Sibiu", x: 297, y: 252 },
  { id: "RO.SJ", label: "Sălaj", x: 221, y: 113 },
  { id: "RO.SM", label: "Satu Mare", x: 204, y: 53 },
  { id: "RO.SV", label: "Suceava", x: 412, y: 80 },
  { id: "RO.TL", label: "Tulcea", x: 636, y: 338 },
  { id: "RO.TM", label: "Timiș", x: 84, y: 260 },
  { id: "RO.TR", label: "Teleorman", x: 359, y: 442 },
  { id: "RO.VL", label: "Vâlcea", x: 279, y: 339 },
  { id: "RO.VN", label: "Vrancea", x: 496, y: 264 },
  { id: "RO.VS", label: "Vaslui", x: 551, y: 189 },
];

const NAVY = "#1a2332";
const GOLD = "#c9a961";

const routes = counties.slice(1).map((c) => ({
  start: counties[0],
  end: c,
}));

export function RomaniaMap({ className = "" }: { className?: string }) {
  const arcs = useMemo(
    () =>
      routes.map((r) => ({
        ...r,
        path: arcPath(r.start.x, r.start.y, r.end.x, r.end.y, 0.25),
      })),
    []
  );

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Background SVG map */}
      <img
        src="/romania.svg"
        alt="Harta României"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ filter: "grayscale(0.3) opacity(0.7)", transform: "rotate(-2deg)" }}
      />

      {/* Overlay SVG for animated routes + markers */}
      <svg
        viewBox="-10 -10 720 510"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        style={{ transform: "rotate(-2deg)" }}
      >
        {/* Animated arcs from București */}
        <g>
          {arcs.map((arc, i) => (
            <g key={`arc-${i}`}>
              <motion.path
                d={arc.path}
                fill="none"
                stroke={NAVY}
                strokeWidth={2.5}
                strokeOpacity={0.4}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  delay: 0.3 + i * 0.06,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 4,
                }}
              />
              <motion.circle
                cx={arc.end.x}
                cy={arc.end.y}
                r={5}
                fill={NAVY}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1], opacity: [0, 0.5, 0.4] }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.06,
                }}
              />
            </g>
          ))}
        </g>

        {/* County markers + labels */}
        <g>
          {counties.map((c) => {
            const isHub = c.label === "București";
            return (
              <g key={c.id}>
                {isHub ? (
                  <>
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={16}
                      fill={NAVY}
                    />
                    <text
                      x={c.x}
                      y={c.y + 4}
                      fontSize={9}
                      fontWeight={800}
                      fill="#faf8f3"
                      textAnchor="middle"
                    >
                      PFPSS
                    </text>
                  </>
                ) : (
                  <circle cx={c.x} cy={c.y} r={4} fill={NAVY} />
                )}
                {!isHub && (
                  <text
                    x={c.x + 8}
                    y={c.y + 3}
                    fontSize={7}
                    fontWeight={400}
                    fill="rgba(26, 35, 50, 0.55)"
                  >
                    {c.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
