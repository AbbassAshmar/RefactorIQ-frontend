import { useParams, Link } from "react-router-dom";
import Button from "@/components/common/Button";
import StatusBadge from "@/components/common/StatusBadge";
import { users } from "@/services/mockAdminData";

export default function UserDetailsPage() {
  const { userId } = useParams();
  const user = users.find((item) => item.id === userId) || users[0];

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm">
        <Link
          to="/admin/users"
          className="text-small-1 font-medium text-brand-text"
        >
          Back to users
        </Link>
        <h2 className="mt-3 text-h4 font-semibold text-text-primary">
          {user.name}
        </h2>
        <p className="mt-1 text-body text-text-secondary">{user.email}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm space-y-3">
          <StatusBadge status={user.status} />
          <p className="text-body text-text-secondary">Role: {user.role}</p>
          <p className="text-body text-text-secondary">
            Country: {user.country}
          </p>
          <p className="text-body text-text-secondary">
            Created: {user.createdAt}
          </p>
        </div>
        <div className="rounded-2xl border border-border-default bg-background-secondary p-5 shadow-sm space-y-3">
          <h3 className="text-h5 font-semibold text-text-primary">Actions</h3>
          <Button>Edit user</Button>
          <Button variant="secondary">Reset password</Button>
        </div>
      </div>
    </div>
  );
}
