import { useParams, Link } from "react-router-dom";
import Button from "@/components/common/Button";
import StatusBadge from "@/components/common/StatusBadge";
import { orders } from "@/services/mockAdminData";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const order = orders.find((item) => item.id === orderId) || orders[0];

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm">
        <Link
          to="/admin/orders"
          className="text-small-1 font-medium text-brand-text"
        >
          Back to orders
        </Link>
        <h2 className="mt-3 text-h4 font-semibold text-text-primary">
          Order {order.id}
        </h2>
        <p className="mt-1 text-body text-text-secondary">
          Customer: {order.customer}
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm space-y-3">
          <StatusBadge status={order.status} />
          <p className="text-body text-text-secondary">
            Amount: ${order.amount}
          </p>
          <p className="text-body text-text-secondary">Items: {order.items}</p>
          <p className="text-body text-text-secondary">
            Created: {order.createdAt}
          </p>
        </div>
        <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm space-y-3">
          <h3 className="text-h5 font-semibold text-text-primary">Actions</h3>
          <Button>Update status</Button>
          <Button variant="secondary">Print invoice</Button>
        </div>
      </div>
    </div>
  );
}
