"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { TooltipItem } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function SectorStatusChart() {
  const data = {
    labels: ["Autorizate", "În proces de licențiere", "Închise"],
    datasets: [
      {
        data: [847, 243, 52],
        backgroundColor: ["#c9a961", "rgba(26, 35, 50, 0.4)", "rgba(192, 57, 43, 0.6)"],
        borderColor: ["#c9a961", "rgba(26, 35, 50, 0.5)", "rgba(192, 57, 43, 0.7)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "rgba(26, 35, 50, 0.7)",
          font: { size: 11 },
          padding: 12,
          boxWidth: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"doughnut">) =>
            `${ctx.label}: ${String(ctx.raw)} cămine`,
        },
      },
    },
    cutout: "60%",
  };

  return (
    <div style={{ height: 200 }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
