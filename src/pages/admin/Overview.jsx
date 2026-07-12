import {
  Activity,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useDashboardSummary } from "@/hooks/useAdminData";
import RevenueChart from "@/components/charts/RevenueChart";
import CategoryDonut from "@/components/charts/CategoryDonut";
import LoadingState from "@/components/common/LoadingState";
import StatusBadge from "@/components/common/StatusBadge";

const metrics = [
  { key: "totalUsers", label: "Total users", icon: Users },
  { key: "totalProducts", label: "Total products", icon: Package },
  { key: "totalOrders", label: "Total orders", icon: ShoppingCart },
  { key: "revenue", label: "Revenue", icon: DollarSign },
];

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminOverview() {
  const { data, isLoading } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="p-6">
        <LoadingState label="Loading dashboard" />
      </div>
    );
  }

  const metricValues = [
    data.totalUsers,
    data.totalProducts,
    data.totalOrders,
    formatMoney(data.revenue),
  ];

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <article
              key={metric.key}
              className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-small-1 uppercase tracking-[0.18em] text-text-tertiary">
                    {metric.label}
                  </p>
                  <h2 className="mt-2 text-h4 font-semibold text-text-primary">
                    {metricValues[index]}
                  </h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-bg text-brand-text">
                  <Icon size={20} />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <RevenueChart
          labels={data.trend.map((item) => item.label)}
          revenue={data.trend.map((item) => item.revenue)}
          orders={data.trend.map((item) => item.orders)}
        />
        <CategoryDonut
          labels={["Wearables", "Apparel", "Audio", "Home"]}
          values={[24, 81, 19, 47]}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-h5 font-semibold text-text-primary">
                Recent activities
              </h3>
              <p className="text-body text-text-secondary">
                Latest platform events and operations.
              </p>
            </div>
            <StatusBadge status="Live" />
          </div>
          <div className="mt-5 space-y-4">
            {data.activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 rounded-xl border border-border-default bg-background-primary p-4"
              >
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-brand-bg text-brand-text">
                  <Activity size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-body font-semibold text-text-primary">
                        {activity.title}
                      </h4>
                      <p className="mt-1 text-small-1 text-text-secondary">
                        {activity.detail}
                      </p>
                    </div>
                    <span className="text-small-1 text-text-tertiary">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm">
          <h3 className="text-h5 font-semibold text-text-primary">
            Operations snapshot
          </h3>
          <p className="mt-1 text-body text-text-secondary">
            Quick operational indicators.
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-background-primary p-4">
              <p className="text-small-1 text-text-tertiary">Revenue change</p>
              <p className="mt-2 text-h4 font-semibold text-text-primary">
                +{data.revenueChange}%
              </p>
            </div>
            <div className="rounded-xl bg-background-primary p-4">
              <p className="text-small-1 text-text-tertiary">Active sessions</p>
              <p className="mt-2 text-h4 font-semibold text-text-primary">
                {data.activeSessions}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
