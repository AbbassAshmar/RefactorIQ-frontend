export default function MetricStatCard({ label, value, suffix = '' }) {
    const numericValue = typeof value === 'number'
        ? value
        : typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))
            ? Number(value)
            : null;
    const displayValue = numericValue !== null && Number.isFinite(numericValue)
        ? Number(numericValue.toFixed(2)).toString()
        : value;
    const display = displayValue === null || displayValue === undefined ? '—' : `${displayValue}${suffix}`;
    return (
        <div className="rounded bg-background-tertiary px-3 py-3">
            <p className="text-small-1 text-text-secondary">{label}</p>
            <p className="mt-1 text-h5 font-semibold text-text-primary">{display}</p>
        </div>
    );
}
