"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import type { TooltipItem } from "chart.js";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const NAVY = "#1a2332";
const GOLD = "#c9a961";
const RED = "rgba(192, 57, 43, 0.7)";

// Date reale 2026
const VATRNICI_70_PLUS = 2_350_000; // 2.35M vârstnici 70+ în România
const LOCURI_DISPONIBILE = 34_310;  // 34.310 locuri în cămine licențiate
const ACOPERIRE_PCT = ((LOCURI_DISPONIBILE / VATRNICI_70_PLUS) * 100).toFixed(2);

export function GapAnalysisChart() {
  const data = {
    labels: ["Vârstnici 70+ ani", "Locuri în cămine"],
    datasets: [
      {
        label: "Persoane",
        data: [VATRNICI_70_PLUS, LOCURI_DISPONIBILE],
        backgroundColor: [RED, GOLD],
        borderColor: [RED, GOLD],
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 60,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
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
            return ` ${value.toLocaleString("ro-RO")} persoane`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "rgba(26, 35, 50, 0.06)" },
        ticks: {
          color: "rgba(26, 35, 50, 0.5)",
          font: { size: 10 },
          callback: (value: any) => {
            if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
            if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
            return value;
          },
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: "rgba(26, 35, 50, 0.7)",
          font: { size: 12, weight: "normal" as const },
        },
      },
    },
  };

  return (
    <div style={{ height: 200 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
