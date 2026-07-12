import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Eye, Plus, Search, Upload, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DataTable from "@/components/tables/DataTable";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import FormDialog from "@/components/forms/FormDialog";
import TextField from "@/components/forms/TextField";
import SelectField from "@/components/forms/SelectField";
import StatusBadge from "@/components/common/StatusBadge";
import { useAdminProducts } from "@/hooks/useAdminData";

const schema = z.object({
  name: z.string().min(2),
  category: z.string().min(1),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
  status: z.string().min(1),
});

export default function ProductsList() {
  const { data = [] } = useAdminProducts();
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter((product) =>
      [product.name, product.category, product.status].some((value) =>
        String(value).toLowerCase().includes(term),
      ),
    );
  }, [data, search]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => (
          <div>
            <div className="font-semibold text-text-primary">
              {row.original.name}
            </div>
            <div className="text-small-1 text-text-secondary">
              {row.original.category}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `$${row.original.price}`,
      },
      { accessorKey: "stock", header: "Stock" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Link
              to={`/admin/products/${row.original.id}`}
              className="inline-flex items-center gap-1 rounded-lg border border-border-default px-3 py-2 text-small-1 text-text-secondary hover:bg-background-hover"
            >
              <Eye size={14} /> View
            </Link>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditingProduct(row.original)}
            >
              <Edit2 size={14} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedProduct(row.original)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      status: "Published",
    },
  });

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-h4 font-semibold text-text-primary">
            Product catalog
          </h2>
          <p className="text-body text-text-secondary">
            Maintain the storefront inventory and publishing state.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              className="w-full rounded-xl border border-border-default bg-background-primary py-3 pl-9 pr-4 text-body text-text-primary outline-none focus:border-border-focus sm:w-72"
            />
          </div>
          <Button onClick={() => setEditingProduct({})}>
            <Plus size={16} /> Add product
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={filtered} />

      <FormDialog
        open={Boolean(editingProduct)}
        title={editingProduct?.id ? "Edit product" : "Add product"}
        description="Update catalog data and upload product media."
        onCancel={() => setEditingProduct(null)}
        onSubmit={form.handleSubmit(() => setEditingProduct(null))}
        submitLabel="Save product"
      >
        <TextField
          label="Name"
          id="product-name"
          {...form.register("name")}
          error={form.formState.errors.name?.message}
        />
        <TextField
          label="Category"
          id="product-category"
          {...form.register("category")}
          error={form.formState.errors.category?.message}
        />
        <TextField
          label="Price"
          id="product-price"
          type="number"
          {...form.register("price")}
          error={form.formState.errors.price?.message}
        />
        <TextField
          label="Stock"
          id="product-stock"
          type="number"
          {...form.register("stock")}
          error={form.formState.errors.stock?.message}
        />
        <SelectField
          label="Status"
          id="product-status"
          {...form.register("status")}
          error={form.formState.errors.status?.message}
        >
          <option>Published</option>
          <option>Draft</option>
          <option>Archived</option>
        </SelectField>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.84rem] font-medium text-[var(--text-secondary)]">
            Images
          </label>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-dashed border-[var(--border-default)] bg-[var(--surface-default)] px-[0.7rem] py-[0.58rem] text-[0.9rem] text-[var(--text-secondary)]"
          >
            <Upload size={16} /> Upload images
          </button>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={Boolean(selectedProduct)}
        title="Delete product"
        description={`Delete ${selectedProduct?.name}?`}
        onConfirm={() => setSelectedProduct(null)}
        onCancel={() => setSelectedProduct(null)}
        confirmLabel="Delete"
      />
    </div>
  );
}
