const VALID_VARIANTS = new Set(["primary", "secondary", "ghost"]);
const VALID_SIZES = new Set(["sm", "md", "lg"]);

const VARIANT_CLASSNAMES = {
  primary:
    "border border-[var(--brand-primary)] bg-[var(--brand-primary)] text-[var(--text-inverse)] hover:bg-[var(--brand-primary-hover)] hover:border-[var(--brand-primary-hover)]",
  secondary:
    "border border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]",
};

const SIZE_CLASSNAMES = {
  sm: "px-[0.7rem] py-[0.4rem] text-[0.82rem]",
  md: "px-[0.9rem] py-[0.58rem] text-[0.88rem]",
  lg: "px-[1.05rem] py-[0.7rem] text-[0.95rem]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}) {
  const resolvedVariant = VALID_VARIANTS.has(variant) ? variant : "primary";
  const resolvedSize = VALID_SIZES.has(size) ? size : "md";

  const classes = [
    "inline-flex items-center justify-center rounded-[10px] font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary-bg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-default)] disabled:cursor-not-allowed disabled:opacity-60",
    VARIANT_CLASSNAMES[resolvedVariant],
    SIZE_CLASSNAMES[resolvedSize],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
