import { PanelWrapper } from '@/components';
import { latestScanSummaryResponse } from '@/pages/client/overview/dummy/latestScanSummaryResponse';

const SEVERITY_CONFIG = [
    { key: 'critical', label: 'Critical', threshold: 'Risk score ≥ 80', color: 'text-error-default' },
    { key: 'high', label: 'High', threshold: 'Risk score 60–79', color: 'text-warning-default' },
    { key: 'medium', label: 'Medium', threshold: 'Risk score 30–59', color: 'text-info-default' },
    { key: 'low', label: 'Low', threshold: 'Risk score 0–29', color: 'text-success-default' },
];

export default function LatestScanSummaryPanel({ projectId }) {
    const payload = latestScanSummaryResponse;
    const summary = payload?.data?.severity_summary ?? {};
    const totalFiles = payload?.data?.total_files ?? 0;

    return (
        <PanelWrapper
            title="Latest Scan Summary"
            description="Provides a quick severity distribution snapshot from the most recent repository scan."
            className="h-full"
        >
            <div className="flex h-full flex-col gap-2">
                <div className="flex items-center justify-between text-small-1 text-text-secondary">
                    <p>Total files: <span className="font-semibold text-text-primary">{totalFiles.toLocaleString()}</span></p>
                    <p className="text-text-tertiary">Project: <span className="text-text-secondary">{projectId}</span></p>
                </div>

                <div className="grid flex-1 grid-cols-1 divide-y divide-border-default rounded-md border border-border-default sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                    {SEVERITY_CONFIG.map((item) => {
                        const details = summary[item.key];

                        return (
                            <div key={item.key} className="flex min-h-24 flex-col justify-center px-3 py-2 text-center">
                                <p className="mb-2 text-h5 font-medium text-text-primary">{item.label}</p>
                                <p className={`text-h2 leading-none font-bold ${item.color}`}>
                                    {details?.count?.toLocaleString() ?? 0}
                                </p>
                                <p className="mt-2 text-small-1 text-text-secondary">{item.threshold}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </PanelWrapper>
    );
}
