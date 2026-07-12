import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryDonut({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#106491", "#0f172a", "#64748b", "#cbd5e1"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm">
      <h3 className="text-h5 font-semibold text-text-primary">Category mix</h3>
      <p className="mt-1 text-body text-text-secondary">
        Distribution across the catalog.
      </p>
      <div className="mt-5 max-w-[320px] mx-auto">
        <Doughnut data={data} />
      </div>
    </div>
  );
}
