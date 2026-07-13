import { PanelWrapper } from '@/components';
import ScanTable, { ScanStatusBadge } from '@/components/scans/ScanTable';
import { formatScanDate } from '@/components/scans/scanTableUtils';
import { useAdminFailedScans } from '@/hooks';
import {
    AdminOverviewPanelEmpty,
    AdminOverviewPanelError,
    AdminOverviewPanelLoading,
} from '@/pages/admin/adminOverview/components/AdminOverviewPanelState';
import { getAdminOverviewErrorMessage } from '@/pages/admin/adminOverview/adminOverviewError';
import { ADMIN_OVERVIEW_TOP_PROJECT_LIMIT } from '@/utils/constants';


const columns = [
    {
        id: 'project',
        header: 'Project',
        cell: ({ row }) => (
            <span className="block max-w-36 truncate font-medium text-text-primary" title={row.original.project?.name}>
                {row.original.project?.name ?? 'Unknown project'}
            </span>
        ),
    },
    {
        id: 'owner',
        header: 'Owner',
        cell: ({ row }) => row.original.user?.username ?? 'Unknown',
    },
    {
        accessorKey: 'error_message',
        header: 'Failure',
        cell: ({ getValue }) => {
            const message = getValue() || 'No error message recorded';
            return (
                <span className="block max-w-56 truncate text-error-text" title={message}>
                    {message}
                </span>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <ScanStatusBadge status={getValue()} />,
    },
    {
        accessorKey: 'finished_at',
        header: 'Failed at',
        cell: ({ getValue }) => formatScanDate(getValue()),
    },
];

export default function FailedScansPanel() {
    const query = useAdminFailedScans(ADMIN_OVERVIEW_TOP_PROJECT_LIMIT);
    const scans = query.data?.data?.scans ?? [];

    return (
        <PanelWrapper
            title="Latest failed scans"
            subtitle={`Newest ${ADMIN_OVERVIEW_TOP_PROJECT_LIMIT}`}
            description="Most recent terminal scan failures, including their stored failure reason."
            className="h-full"
        >
            {query.isLoading ? <AdminOverviewPanelLoading className="min-h-64" /> : null}
            {query.isError ? (
                <AdminOverviewPanelError
                    message={getAdminOverviewErrorMessage(query.error, 'Unable to load failed scans.')}
                />
            ) : null}
            {!query.isLoading && !query.isError && scans.length === 0 ? (
                <AdminOverviewPanelEmpty message="No failed scans were found." />
            ) : null}
            {!query.isLoading && !query.isError && scans.length > 0 ? (
                <ScanTable
                    data={scans.slice(0, ADMIN_OVERVIEW_TOP_PROJECT_LIMIT)}
                    columns={columns}
                    showFooter={false}
                    compact
                    emptyMessage="No failed scans were found."
                />
            ) : null}
        </PanelWrapper>
    );
}
