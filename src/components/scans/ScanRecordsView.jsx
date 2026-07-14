import { useMemo, useState } from 'react';
import { LoaderCircle, Plus } from 'lucide-react';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import RefreshButton from '@/components/common/RefreshButton';
import TablePanel from '@/components/common/TablePanel';
import ScanTable, { ScanStatusBadge } from '@/components/scans/ScanTable';
import ScansTimelinePanel from '@/components/scans/ScansTimelinePanel';
import { formatScanDate } from '@/components/scans/scanTableUtils';
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
import {
    useCreateScan,
    useScansList,
    useScansOverTime,
    useSelectedProject,
} from '@/hooks';
import useNotification from '@/hooks/useNotification';


export default function ScanRecordsView() {
    const [page, setPage] = useState(1);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const { selectedProjectId, selectedProject, isLoading: isLoadingProjects } = useSelectedProject();
    const { success, failure } = useNotification();
    const scansQuery = useScansList({
        [PROJECT_QUERY_KEY]: selectedProjectId || undefined,
        [SORT_QUERY_KEY]: SCAN_SORT.DATE_DESCENDING,
        [PAGE_QUERY_KEY]: page,
        [LIMIT_QUERY_KEY]: SCAN_TABLE_PAGE_SIZE,
    }, {
        enabled: !isLoadingProjects,
    });
    const timelineQuery = useScansOverTime(selectedProjectId, {
        enabled: !isLoadingProjects,
    });
    const createScan = useCreateScan({
        onSuccess: () => {
            success({
                title: 'Scan created',
                message: 'The scan was created and will start as soon as possible.',
            });
        },
        onError: () => {
            failure({
                title: 'Failed to create scan',
                message: 'The scan could not be started. Please try again.',
            });
        },
    });
    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'Scan ID',
            cell: ({ getValue }) => <span className="font-mono text-small-1 text-text-primary">{getValue()}</span>,
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

    function startScan() {
        if (!selectedProjectId) return;
        setIsConfirmationOpen(false);
        createScan.mutate(selectedProjectId);
    }

    return (
        <>
            <ScansTimelinePanel
                query={timelineQuery}
                subtitle={selectedProject
                    ? `${selectedProject.name} · Last 14 days`
                    : 'All your projects · Last 14 days'}
                description="Daily scan volume across your projects, optionally filtered by the selected project."
                emptyMessage="No scans were created for this project scope in the last 14 days."
            />
            <TablePanel
                title="Scan records"
                className="mt-2"
                actions={(
                    <div className="flex items-center gap-4">
                        <RefreshButton
                            label="refresh"
                            onClick={() => scansQuery.refetch()}
                            isRefreshing={scansQuery.isFetching}
                        />
                        <button
                            type="button"
                            onClick={() => setIsConfirmationOpen(true)}
                            disabled={!selectedProjectId || createScan.isPending}
                            className="inline-flex items-center gap-2 border-0 bg-transparent px-0 py-1 text-body font-semibold text-brand-text transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {createScan.isPending ? <LoaderCircle size={16} className="animate-spin" /> : <Plus size={16} />}
                            {createScan.isPending ? 'Starting…' : 'Scan now'}
                        </button>
                    </div>
                )}
            >
                <ScanTable
                    data={scans}
                    columns={columns}
                    page={pagination?.page ?? page}
                    pageCount={pagination?.total_pages ?? 0}
                    totalCount={pagination?.total_count ?? 0}
                    onPageChange={setPage}
                    isLoading={isLoadingProjects || scansQuery.isLoading}
                    emptyMessage={selectedProjectId
                        ? 'No scans have been created for this project.'
                        : 'No scans have been created across your projects.'}
                />
            </TablePanel>
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                title="Start an instant scan?"
                confirmLabel="Scan now"
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={startScan}
                isConfirming={createScan.isPending}
            >
                This starts a new scan of the selected project immediately. The scan runs in the background and its records will appear here as soon as they are available.
            </ConfirmationModal>
        </>
    );
}
