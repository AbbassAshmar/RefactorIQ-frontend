import { useMemo, useState } from 'react';
import { LoaderCircle, Plus } from 'lucide-react';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import TablePanel from '@/components/common/TablePanel';
import ScanTable, { ScanStatusBadge } from '@/components/scans/ScanTable';
import { formatScanDate } from '@/components/scans/scanTableUtils';
import { useCreateScan, useScansList, useSelectedProject } from '@/hooks';
import useNotification from '@/hooks/useNotification';


const PAGE_SIZE = 10;

export default function ScanRecordsView() {
    const [page, setPage] = useState(1);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const { selectedProjectId, selectedProject, isLoading: isLoadingProjects } = useSelectedProject();
    const { success, failure } = useNotification();
    const scansQuery = useScansList({
        project_id: selectedProjectId,
        sort: 'date_desc',
        page,
        limit: PAGE_SIZE,
    }, {
        enabled: Boolean(selectedProjectId),
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
            <TablePanel
                title="Scan records"
                actions={(
                    <button
                        type="button"
                        onClick={() => setIsConfirmationOpen(true)}
                        disabled={!selectedProjectId || createScan.isPending}
                        className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-3 py-2 text-body font-semibold text-brand-text transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {createScan.isPending ? <LoaderCircle size={16} className="animate-spin" /> : <Plus size={16} />}
                        {createScan.isPending ? 'Starting…' : 'Scan now'}
                    </button>
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
                    emptyMessage={selectedProjectId ? 'No scans have been created for this project.' : 'Select a project to view scans.'}
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
