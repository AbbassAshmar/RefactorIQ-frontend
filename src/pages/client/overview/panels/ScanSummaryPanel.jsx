import { PanelWrapper } from '@/components';
import { useScanSummary } from '@/hooks';
import { OVERVIEW_PRIORITY_BANDS } from '@/pages/client/overview/constants';
import { OverviewPanelEmpty, OverviewPanelError, OverviewPanelLoading } from '@/pages/client/overview/components/OverviewPanelState';


export default function ScanSummaryPanel({ scanId }) {
    const query = useScanSummary(scanId);
    const payload = query.data?.data;
    const summary = payload?.severity_summary ?? {};

    return (
        <PanelWrapper
            title="Scan Summary"
            description="Priority-band distribution for files in the selected scan."
            className="h-full"
        >
            {query.isLoading ? <OverviewPanelLoading /> : null}
            {query.isError ? <OverviewPanelError /> : null}
            {!query.isLoading && !query.isError && !payload ? <OverviewPanelEmpty /> : null}
            {!query.isLoading && !query.isError && payload ? (
                <div className="flex h-full flex-col gap-2">
                    <div className="flex items-center justify-between text-small-1 text-text-secondary">
                        <p>Total files: <span className="font-semibold text-text-primary">{payload.total_files.toLocaleString()}</span></p>
                        <p className="text-text-tertiary">Scan: <span className="font-mono text-text-secondary">{scanId.slice(0, 8)}</span></p>
                    </div>
                    <div className="grid flex-1 grid-cols-1 divide-y divide-border rounded-md border border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                        {OVERVIEW_PRIORITY_BANDS.map((band) => (
                            <div key={band.key} className="flex min-h-24 flex-col justify-center px-3 py-2 text-center">
                                <p className="mb-2 text-h5 font-medium text-text-primary">{band.label}</p>
                                <p className={`text-h2 font-bold leading-none ${band.color}`}>{summary[band.key]?.count?.toLocaleString() ?? 0}</p>
                                <p className="mt-2 text-small-1 text-text-secondary">{summary[band.key]?.label ?? band.threshold}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </PanelWrapper>
    );
}
