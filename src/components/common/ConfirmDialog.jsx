import Button from "@/components/common/Button";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-overlay px-4">
      <div className="w-full max-w-md rounded-2xl border border-border-default bg-background-elevated p-6 shadow-xl">
        <h3 className="text-h5 font-semibold text-text-primary">{title}</h3>
        <p className="mt-2 text-body text-text-secondary">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
