export default function LoadingState({ label = "Loading data" }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-border-default bg-background-secondary">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-border-default border-t-brand-primary" />
        <p className="text-body text-text-secondary">{label}</p>
      </div>
    </div>
  );
}
