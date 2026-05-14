export default function Input({
  label,
  id,
  helpText,
  error,
  className = "",
  ...props
}) {
  const inputClasses = [
    "w-full rounded-[10px] border bg-[var(--surface-default)] px-[0.7rem] py-[0.58rem] text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[0_0_0_3px_var(--brand-primary-bg)]",
    error ? "border-[var(--error-border)]" : "border-[var(--border-default)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-[0.84rem] font-medium text-[var(--text-secondary)]"
        >
          {label}
        </label>
      )}

      <input id={id} className={inputClasses} {...props} />

      {(error || helpText) && (
        <p
          className={`text-[0.76rem] font-normal ${
            error
              ? "text-[var(--error-default)]"
              : "text-[var(--text-tertiary)]"
          }`}
        >
          {error || helpText}
        </p>
      )}
    </div>
  );
}
