import { PanelWrapper } from '@/components';
import ScanTable from '@/components/scans/ScanTable';
import { OverviewPanelEmpty, OverviewPanelError, OverviewPanelLoading } from '@/pages/client/overview/components/OverviewPanelState';


function priorityClass(priority) {
    return {
        critical: 'text-error-default',
        high: 'text-warning-default',
        medium: 'text-info-default',
        low: 'text-success-default',
    }[priority] ?? 'text-text-secondary';
}

const columns = [
    {
        accessorKey: 'file_path',
        header: 'File',
        cell: ({ getValue }) => <span className="font-mono text-small-1 text-text-primary">{getValue()}</span>,
    },
    {
        accessorKey: 'risk_score',
        header: 'Risk score',
        cell: ({ getValue }) => <span className="font-semibold text-text-primary">{Number(getValue()).toFixed(1)}</span>,
    },
    {
        accessorKey: 'priority_band',
        header: 'Priority',
        cell: ({ getValue }) => <span className={`capitalize ${priorityClass(getValue())}`}>{getValue() ?? 'Unknown'}</span>,
    },
    {
        id: 'dependencies',
        header: 'Fan-in / out',
        cell: ({ row }) => `${row.original.fan_in} / ${row.original.fan_out}`,
    },
];

export default function TopRefactorFilesPanel({ query }) {
    const files = query.data?.data?.files ?? [];

    return (
        <PanelWrapper
            title="Top 10 files to refactor"
            description="Files with the highest refactor risk scores in the selected scan."
            className="h-full"
        >
            {query.isLoading ? <OverviewPanelLoading /> : null}
            {query.isError ? <OverviewPanelError /> : null}
            {!query.isLoading && !query.isError && files.length === 0 ? <OverviewPanelEmpty message="No scored files are available for this scan." /> : null}
            {!query.isLoading && !query.isError && files.length > 0 ? (
                <ScanTable
                    data={files}
                    columns={columns}
                    page={1}
                    pageCount={1}
                    totalCount={files.length}
                    onPageChange={() => {}}
                    entityLabel="file"
                    emptyMessage="No scored files are available for this scan."
                />
            ) : null}
        </PanelWrapper>
    );
}
