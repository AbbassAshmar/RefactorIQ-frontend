const STATUS_STYLES = {
  Active: "bg-success-bg text-success-text border-success-border",
  Pending: "bg-warning-bg text-warning-text border-warning-border",
  Suspended: "bg-error-bg text-error-text border-error-border",
  Draft: "bg-background-hover text-text-secondary border-border-default",
  Published: "bg-success-bg text-success-text border-success-border",
  Archived: "bg-background-hover text-text-secondary border-border-default",
  Processing: "bg-info-bg text-info-text border-info-border",
  Shipped: "bg-warning-bg text-warning-text border-warning-border",
  Delivered: "bg-success-bg text-success-text border-success-border",
  Cancelled: "bg-error-bg text-error-text border-error-border",
  Hidden: "bg-background-hover text-text-secondary border-border-default",
};

export default function StatusBadge({ status, className = "" }) {
  const resolvedClass =
    STATUS_STYLES[status] ||
    "bg-brand-bg text-brand-text border-border-default";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-small-1 font-medium ${resolvedClass} ${className}`.trim()}
    >
      {status}
    </span>
  );
}
