import "./Button.css";

const VALID_VARIANTS = new Set(["primary", "secondary", "ghost"]);
const VALID_SIZES = new Set(["sm", "md", "lg"]);

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
    "app-button",
    `app-button--${resolvedVariant}`,
    `app-button--${resolvedSize}`,
    fullWidth ? "app-button--full" : "",
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
