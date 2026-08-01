"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export function AdvocacyChart() {
  const data = {
    labels: ["T1", "T2", "T3", "T4"],
    datasets: [
      {
        label: "Acțiuni de advocacy",
        data: [3, 5, 7, 4],
        backgroundColor: "rgba(201, 169, 97, 0.6)",
        borderColor: "#c9a961",
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
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "rgba(26, 35, 50, 0.5)", font: { size: 10 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(26, 35, 50, 0.06)" },
        ticks: { color: "rgba(26, 35, 50, 0.5)", font: { size: 10 }, stepSize: 2 },
      },
    },
  };

  return (
    <div style={{ height: 140 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
