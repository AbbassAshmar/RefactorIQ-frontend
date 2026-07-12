import Button from "@/components/common/Button";

export default function FormDialog({
  open,
  title,
  description,
  children,
  onSubmit,
  onCancel,
  submitLabel = "Save changes",
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-overlay px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-2xl rounded-2xl border border-border-default bg-background-elevated p-6 shadow-xl"
      >
        <h3 className="text-h5 font-semibold text-text-primary">{title}</h3>
        {description ? (
          <p className="mt-2 text-body text-text-secondary">{description}</p>
        ) : null}
        <div className="mt-6 grid gap-4 md:grid-cols-2">{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </div>
  );
}
