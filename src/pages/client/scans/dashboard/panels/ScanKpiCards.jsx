import { SimplisticKpiCard } from '@/components';
import { useScanStatusCounts } from '@/hooks';

const KPI_DEFINITIONS = [
    { key: 'succeeded', label: 'Succeeded scans', color: 'text-success' },
    { key: 'total', label: 'Total scans', color: 'text-brand' },
    { key: 'pending', label: 'Pending scans', color: 'text-warning' },
    { key: 'failed', label: 'Failed scans', color: 'text-error' },
    { key: 'running', label: 'Running scans', color: 'text-info' },
];

function formatCount(value) {
    return Number.isFinite(Number(value)) ? Number(value).toLocaleString() : '—';
}

export default function ScanKpiCards({ projectId }) {
    const query = useScanStatusCounts(projectId);
    const counts = query.data?.data ?? {};

    return (
        <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
            {KPI_DEFINITIONS.map(({ key, label, color }) => (
                <SimplisticKpiCard
                    key={key}
                    value={query.isError ? '—' : formatCount(counts[key])}
                    label={label}
                    valueClassName={color}
                />
            ))}
        </div>
    );
}
