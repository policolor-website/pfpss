"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function StandardsChart() {
  const data = {
    labels: ["Certificați", "În proces"],
    datasets: [
      {
        data: [18, 7],
        backgroundColor: ["#c9a961", "rgba(26, 35, 50, 0.15)"],
        borderColor: ["#c9a961", "rgba(26, 35, 50, 0.2)"],
        borderWidth: 1,
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
          color: "rgba(26, 35, 50, 0.6)",
          font: { size: 10 },
          padding: 8,
          boxWidth: 12,
        },
      },
    },
    cutout: "65%",
  };

  return (
    <div style={{ height: 140 }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
