export default function MetricStatCard({ label, value, suffix = '' }) {
    const display = value === null || value === undefined ? '—' : `${value}${suffix}`;
    return (
        <div className="rounded-md bg-background-tertiary px-3 py-3">
            <p className="text-small-1 text-text-secondary">{label}</p>
            <p className="mt-1 text-h5 font-semibold text-text-primary">{display}</p>
        </div>
    );
}
