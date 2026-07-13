import { useMemo, useState } from 'react';
import TablePanel from '@/components/common/TablePanel';
import ScanTable, { ScanStatusBadge } from '@/components/scans/ScanTable';
import { formatScanDate } from '@/components/scans/scanTableUtils';
import { useAdminScansList } from '@/hooks';
import {
    SCAN_SORT,
    SCAN_TABLE_PAGE_SIZE,
} from '@/utils/constants';
import {
    LIMIT_QUERY_KEY,
    PAGE_QUERY_KEY,
    PROJECT_QUERY_KEY,
    SORT_QUERY_KEY,
} from '@/utils/queryParams';


export default function AdminScansTable({ projectId }) {
    const [paginationState, setPaginationState] = useState({
        projectId,
        page: 1,
    });
    const page = paginationState.projectId === projectId
        ? paginationState.page
        : 1;
    const scansQuery = useAdminScansList({
        [PROJECT_QUERY_KEY]: projectId || undefined,
        [SORT_QUERY_KEY]: SCAN_SORT.DATE_DESCENDING,
        [PAGE_QUERY_KEY]: page,
        [LIMIT_QUERY_KEY]: SCAN_TABLE_PAGE_SIZE,
    });
    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'Scan ID',
            cell: ({ getValue }) => (
                <span className="font-mono text-small-1 text-text-primary">{getValue()}</span>
            ),
        },
        {
            id: 'project',
            header: 'Project',
            cell: ({ row }) => (
                <span className="font-medium text-text-primary">
                    {row.original.project?.name ?? 'Unknown project'}
                </span>
            ),
        },
        {
            id: 'owner',
            header: 'Owner',
            cell: ({ row }) => (
                <div>
                    <p className="text-text-primary">{row.original.owner?.username ?? 'Unknown'}</p>
                    <p className="text-small-1 text-text-tertiary">{row.original.owner?.email ?? '—'}</p>
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ getValue }) => <ScanStatusBadge status={getValue()} />,
        },
        {
            accessorKey: 'created_at',
            header: 'Created',
            cell: ({ getValue }) => formatScanDate(getValue()),
        },
        {
            accessorKey: 'started_at',
            header: 'Started',
            cell: ({ getValue }) => formatScanDate(getValue()),
        },
        {
            accessorKey: 'finished_at',
            header: 'Finished',
            cell: ({ getValue }) => formatScanDate(getValue()),
        },
    ], []);

    const scans = scansQuery.data?.data?.scans ?? [];
    const pagination = scansQuery.data?.meta?.pagination;
    const errorMessage = scansQuery.error?.response?.data?.error?.message
        || 'Unable to load administrative scan records.';

    function handlePageChange(nextPage) {
        setPaginationState({ projectId, page: nextPage });
    }

    return (
        <TablePanel
            title="Scan records"
            toolbar={(
                <p className="text-small-1 text-text-secondary">
                    {projectId
                        ? `Filtered by pinned project ${projectId.slice(0, 8)}`
                        : 'Showing scans from all platform projects'}
                </p>
            )}
        >
            {scansQuery.isError ? (
                <div className="m-2 rounded border border-error-border bg-error-bg px-4 py-3 text-small-1 text-error-text">
                    {errorMessage}
                </div>
            ) : null}
            {!scansQuery.isError ? (
                <ScanTable
                    data={scans}
                    columns={columns}
                    page={pagination?.page ?? page}
                    pageCount={pagination?.total_pages ?? 0}
                    totalCount={pagination?.total_count ?? 0}
                    onPageChange={handlePageChange}
                    isLoading={scansQuery.isLoading}
                    emptyMessage={projectId
                        ? 'No scans have been created for this project.'
                        : 'No scans have been created across the platform.'}
                />
            ) : null}
        </TablePanel>
    );
}
