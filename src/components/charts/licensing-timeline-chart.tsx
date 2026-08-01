"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export function LicensingTimelineChart() {
  const data = {
    labels: ["2022", "2023", "2024", "2025", "2026"],
    datasets: [
      {
        label: "Licențe emise",
        data: [620, 710, 847, 920, 847],
        borderColor: "#c9a961",
        backgroundColor: "rgba(201, 169, 97, 0.1)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#c9a961",
        pointBorderColor: "#1a2332",
        pointBorderWidth: 1.5,
        pointRadius: 5,
      },
      {
        label: "Licențe retrase",
        data: [12, 18, 31, 44, 52],
        borderColor: "rgba(192, 57, 43, 0.7)",
        backgroundColor: "rgba(192, 57, 43, 0.05)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(192, 57, 43, 0.7)",
        pointBorderColor: "#1a2332",
        pointBorderWidth: 1,
        pointRadius: 4,
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
          color: "rgba(26, 35, 50, 0.7)",
          font: { size: 11 },
          padding: 12,
          boxWidth: 14,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "rgba(26, 35, 50, 0.5)", font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(26, 35, 50, 0.06)" },
        ticks: { color: "rgba(26, 35, 50, 0.5)", font: { size: 10 } },
      },
    },
  };

  return (
    <div style={{ height: 220 }}>
      <Line data={data} options={options} />
    </div>
  );
}
