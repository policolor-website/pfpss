"use client";

import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import type { TooltipItem } from "chart.js";
import { motion } from "framer-motion";
import { Users, Building2, Home, MapPin, TrendingUp } from "lucide-react";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const NAVY = "#1a2332";
const GOLD = "#c9a961";
const PAPER = "#faf8f3";

// Real data from camine-autorizate.json (2026)
const TOTAL_CAMINE = 792;
const PRIVATE = 672;
const PUBLIC = 120;
const TOTAL_LOCURI = 34310;
const MEDIE_LOCURI = 43;
const JUDETE = 42;

// ============================================
// 1. Doughnut — Privat vs Public
// ============================================
export function PrivatPublicChart() {
  const data = {
    labels: ["Private", "Publice"],
    datasets: [
      {
        data: [PRIVATE, PUBLIC],
        backgroundColor: [GOLD, NAVY],
        borderColor: [GOLD, NAVY],
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "rgba(26, 35, 50, 0.8)",
          font: { size: 12, family: "inherit" },
          padding: 16,
          boxWidth: 16,
          boxHeight: 16,
          usePointStyle: true,
          pointStyle: "circle" as const,
        },
      },
      tooltip: {
        backgroundColor: NAVY,
        padding: 12,
        cornerRadius: 6,
        titleFont: { size: 13, weight: "bold" as const },
        bodyFont: { size: 12 },
        callbacks: {
          label: (ctx: TooltipItem<"doughnut">) => {
            const value = Number(ctx.raw);
            const pct = ((value / TOTAL_CAMINE) * 100).toFixed(1);
            return ` ${ctx.label}: ${value} cămine (${pct}%)`;
          },
        },
      },
    },
    cutout: "65%",
  };

  return (
    <div className="relative" style={{ height: 240 }}>
      <Doughnut data={data} options={options} />
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ top: "-15%" }}>
        <div className="text-3xl font-bold text-navy-deep">{TOTAL_CAMINE}</div>
        <div className="text-xs text-navy-deep/50 uppercase tracking-wide">Total cămine</div>
      </div>
    </div>
  );
}

// ============================================
// 2. Bar chart — Distribuția capacității
// ============================================
export function CapacitateChart() {
  const data = {
    labels: ["<20 locuri", "20-50 locuri", "50-100 locuri", "100-200 locuri", ">200 locuri"],
    datasets: [
      {
        label: "Număr cămine",
        data: [123, 453, 172, 35, 7],
        backgroundColor: [
          "rgba(201, 169, 97, 0.4)",
          GOLD,
          "rgba(201, 169, 97, 0.7)",
          "rgba(26, 35, 50, 0.6)",
          NAVY,
        ],
        borderColor: [
          "rgba(201, 169, 97, 0.5)",
          GOLD,
          "rgba(201, 169, 97, 0.8)",
          "rgba(26, 35, 50, 0.7)",
          NAVY,
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: NAVY,
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => {
            const value = Number(ctx.raw);
            const pct = ((value / TOTAL_CAMINE) * 100).toFixed(1);
            return ` ${value} cămine (${pct}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "rgba(26, 35, 50, 0.6)",
          font: { size: 10 },
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(26, 35, 50, 0.06)" },
        ticks: {
          color: "rgba(26, 35, 50, 0.5)",
          font: { size: 10 },
        },
      },
    },
  };

  return (
    <div style={{ height: 240 }}>
      <Bar data={data} options={options} />
    </div>
  );
}

// ============================================
// 3. KPI cards îmbogățite
// ============================================
export function CamineKpiCards() {
  const kpis = [
    {
      icon: Home,
      value: TOTAL_CAMINE.toLocaleString("ro-RO"),
      label: "Cămine licențiate",
      sublabel: "MMJS 2026",
      trend: "+14% vs 2022",
      color: NAVY,
    },
    {
      icon: Users,
      value: TOTAL_LOCURI.toLocaleString("ro-RO"),
      label: "Locuri disponibile",
      sublabel: "la nivel național",
      trend: "+8% vs 2022",
      color: GOLD,
    },
    {
      icon: Building2,
      value: MEDIE_LOCURI.toString(),
      label: "Locuri / cămin",
      sublabel: "capacitate medie",
      trend: "Stabil",
      color: NAVY,
    },
    {
      icon: MapPin,
      value: JUDETE.toString(),
      label: "Județe acoperite",
      sublabel: "acoperire națională",
      trend: "100%",
      color: GOLD,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-xl border border-navy-deep/10 p-6 hover:shadow-lg hover:shadow-navy-deep/5 transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${kpi.color}15` }}
              >
                <Icon size={20} style={{ color: kpi.color }} />
              </div>
              <div className="flex items-center gap-1 text-xs text-navy-deep/40">
                <TrendingUp size={12} />
                {kpi.trend}
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-navy-deep mb-1">
              {kpi.value}
            </div>
            <div className="text-sm font-medium text-navy-deep/70">
              {kpi.label}
            </div>
            <div className="text-xs text-navy-deep/40 mt-1">
              {kpi.sublabel}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
