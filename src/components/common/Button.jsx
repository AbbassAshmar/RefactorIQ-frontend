export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded border border-brand-primary px-2 py-1 text-body font-semibold text-brand-text transition-colors hover:bg-brand-hover hover:underline disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
