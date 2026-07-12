import { Inbox } from "lucide-react";
import Button from "@/components/common/Button";

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border-default bg-background-secondary p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-bg text-brand-text">
        <Inbox size={20} />
      </div>
      <h3 className="mt-4 text-h5 font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 text-body text-text-secondary">{description}</p>
      {actionLabel ? (
        <div className="mt-5">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}
