import "./Input.css";

export default function Input({
  label,
  id,
  helpText,
  error,
  className = "",
  ...props
}) {
  const inputClass = ["app-input__control", error ? "is-error" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="app-input">
      {label && (
        <label htmlFor={id} className="app-input__label">
          {label}
        </label>
      )}

      <input id={id} className={inputClass} {...props} />

      {(error || helpText) && (
        <p className={`app-input__hint ${error ? "is-error" : ""}`}>
          {error || helpText}
        </p>
      )}
    </div>
  );
}
