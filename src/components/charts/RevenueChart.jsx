import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

export default function RevenueChart({ labels, revenue, orders }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenue,
        backgroundColor: "rgba(16, 100, 145, 0.75)",
        borderRadius: 10,
      },
      {
        label: "Orders",
        data: orders,
        backgroundColor: "rgba(55, 65, 81, 0.45)",
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm">
      <h3 className="text-h5 font-semibold text-text-primary">
        Revenue overview
      </h3>
      <p className="mt-1 text-body text-text-secondary">
        Weekly performance across revenue and orders.
      </p>
      <div className="mt-5">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "#94a3b8" } } },
            scales: {
              x: {
                ticks: { color: "#94a3b8" },
                grid: { color: "rgba(148, 163, 184, 0.1)" },
              },
              y: {
                ticks: { color: "#94a3b8" },
                grid: { color: "rgba(148, 163, 184, 0.1)" },
              },
            },
          }}
          height={280}
        />
      </div>
    </div>
  );
}
