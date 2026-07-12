export default function Input({
  label,
  id,
  helpText,
  error,
  icon: Icon,
  className = "",
  ...props
}) {
  const inputClasses = [
    "w-full rounded-[10px] border bg-[var(--surface-default)] py-[0.58rem] text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[0_0_0_3px_var(--brand-primary-bg)]",
    Icon ? "pl-10 pr-[0.7rem]" : "px-[0.7rem]",
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
          className="text-[0.84rem] font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon ? (
          <span
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center"
            style={{ color: "var(--text-tertiary)" }}
          >
            <Icon size={16} />
          </span>
        ) : null}
        <input id={id} className={inputClasses} {...props} />
      </div>

      {(error || helpText) && (
        <p
          className="text-[0.76rem] font-normal"
          style={{
            color: error ? "var(--error-default)" : "var(--text-tertiary)",
          }}
        >
          {error || helpText}
        </p>
      )}
    </div>
  );
}
