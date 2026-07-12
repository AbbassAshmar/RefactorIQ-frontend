import { useMemo, useState } from "react";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DataTable from "@/components/tables/DataTable";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import FormDialog from "@/components/forms/FormDialog";
import TextField from "@/components/forms/TextField";
import StatusBadge from "@/components/common/StatusBadge";
import { useAdminCategories } from "@/hooks/useAdminData";

const schema = z.object({ name: z.string().min(2) });

export default function CategoriesList() {
  const { data = [] } = useAdminCategories();
  const [search, setSearch] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter((category) =>
      [category.name, category.status].some((value) =>
        String(value).toLowerCase().includes(term),
      ),
    );
  }, [data, search]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Category" },
      { accessorKey: "productCount", header: "Products" },
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
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditingCategory(row.original)}
            >
              <Edit2 size={14} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedCategory(row.original)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-h4 font-semibold text-text-primary">
            Categories
          </h2>
          <p className="text-body text-text-secondary">
            Organize the catalog into manageable groups.
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
              placeholder="Search categories"
              className="w-full rounded-xl border border-border-default bg-background-primary py-3 pl-9 pr-4 text-body text-text-primary outline-none focus:border-border-focus sm:w-72"
            />
          </div>
          <Button onClick={() => setEditingCategory({})}>
            <Plus size={16} /> Add category
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={filtered} />

      <FormDialog
        open={Boolean(editingCategory)}
        title={editingCategory?.id ? "Edit category" : "Add category"}
        description="Create or update a product grouping."
        onCancel={() => setEditingCategory(null)}
        onSubmit={form.handleSubmit(() => setEditingCategory(null))}
        submitLabel="Save category"
      >
        <TextField
          label="Category name"
          id="category-name"
          {...form.register("name")}
          error={form.formState.errors.name?.message}
        />
      </FormDialog>
      <ConfirmDialog
        open={Boolean(selectedCategory)}
        title="Delete category"
        description={`Delete ${selectedCategory?.name}?`}
        onConfirm={() => setSelectedCategory(null)}
        onCancel={() => setSelectedCategory(null)}
        confirmLabel="Delete"
      />
    </div>
  );
}
