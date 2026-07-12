import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Search } from "lucide-react";
import DataTable from "@/components/tables/DataTable";
import StatusBadge from "@/components/common/StatusBadge";
import { useAdminOrders } from "@/hooks/useAdminData";

export default function OrdersList() {
  const { data = [] } = useAdminOrders();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter((order) =>
      [order.id, order.customer, order.status].some((value) =>
        String(value).toLowerCase().includes(term),
      ),
    );
  }, [data, search]);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Order" },
      { accessorKey: "customer", header: "Customer" },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => `$${row.original.amount}`,
      },
      { accessorKey: "items", header: "Items" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Link
            to={`/admin/orders/${row.original.id}`}
            className="inline-flex items-center gap-1 rounded-lg border border-border-default px-3 py-2 text-small-1 text-text-secondary hover:bg-background-hover"
          >
            <Eye size={14} /> View
          </Link>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-h4 font-semibold text-text-primary">Orders</h2>
          <p className="text-body text-text-secondary">
            Review order status and fulfillment progress.
          </p>
        </div>
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search orders"
            className="w-full rounded-xl border border-border-default bg-background-primary py-3 pl-9 pr-4 text-body text-text-primary outline-none focus:border-border-focus sm:w-72"
          />
        </div>
      </div>
      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
