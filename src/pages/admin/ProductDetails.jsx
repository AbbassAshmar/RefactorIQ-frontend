import { useParams, Link } from "react-router-dom";
import Button from "@/components/common/Button";
import StatusBadge from "@/components/common/StatusBadge";
import { products } from "@/services/mockAdminData";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId) || products[0];

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm">
        <Link
          to="/admin/products"
          className="text-small-1 font-medium text-brand-text"
        >
          Back to products
        </Link>
        <h2 className="mt-3 text-h4 font-semibold text-text-primary">
          {product.name}
        </h2>
        <p className="mt-1 text-body text-text-secondary">{product.category}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm space-y-3">
          <StatusBadge status={product.status} />
          <p className="text-body text-text-secondary">
            Price: ${product.price}
          </p>
          <p className="text-body text-text-secondary">
            Stock: {product.stock}
          </p>
          <p className="text-body text-text-secondary">
            Rating: {product.rating}
          </p>
        </div>
        <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm space-y-3">
          <h3 className="text-h5 font-semibold text-text-primary">Actions</h3>
          <Button>Edit product</Button>
          <Button variant="secondary">Upload images</Button>
        </div>
      </div>
    </div>
  );
}
