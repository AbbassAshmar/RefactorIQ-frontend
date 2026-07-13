import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useScansList, useSelectedProject } from '@/hooks';
import ScanTable, { ScanStatusBadge } from '@/components/scans/ScanTable';
import { formatScanDate } from '@/components/scans/scanTableUtils';


const PAGE_SIZE = 8;

export default function ScanSelectorModal({ isOpen, onClose, onSelectScan, selectedScanId }) {
    const [page, setPage] = useState(1);
    const { selectedProjectId, selectedProject } = useSelectedProject();
    const scansQuery = useScansList({
        project_id: selectedProjectId,
        status: 'succeeded',
        sort: 'date_desc',
        page,
        limit: PAGE_SIZE,
    }, {
        enabled: isOpen && Boolean(selectedProjectId),
    });

    useEffect(() => {
        if (!isOpen) return undefined;
        function handleKeyDown(event) {
            if (event.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

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
            accessorKey: 'finished_at',
            header: 'Finished',
            cell: ({ getValue }) => formatScanDate(getValue()),
        },
    ], []);

    if (!isOpen) return null;

    const scans = scansQuery.data?.data?.scans ?? [];
    const pagination = scansQuery.data?.meta?.pagination;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-overlay p-4" onMouseDown={onClose}>
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="scan-selector-title"
                onMouseDown={(event) => event.stopPropagation()}
                className="flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded border border-border-secondary bg-background-elevated shadow-xl"
            >
                <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                    <div>
                        <h2 id="scan-selector-title" className="text-h6 font-semibold text-text-primary">Select a successful scan</h2>
                        <p className="mt-1 text-small-1 text-text-secondary">
                            {selectedProject ? `Showing newest scans for ${selectedProject.name}.` : 'Choose a project first.'}
                        </p>
                    </div>
                    <button type="button" onClick={onClose} className="rounded p-1 text-text-secondary hover:bg-background-hover hover:text-text-primary hover:underline" aria-label="Close">
                        <X size={18} />
                    </button>
                </header>
                <div className="min-h-0 overflow-y-auto p-5">
                    <ScanTable
                        data={scans}
                        columns={columns}
                        page={pagination?.page ?? page}
                        pageCount={pagination?.total_pages ?? 0}
                        totalCount={pagination?.total_count ?? 0}
                        onPageChange={setPage}
                        className="border border-border bg-background-secondary"
                        isLoading={scansQuery.isLoading}
                        emptyMessage={selectedProjectId ? 'No successful scans exist for this project.' : 'Choose a project to view its scans.'}
                        onRowClick={onSelectScan}
                        selectedRowId={selectedScanId}
                    />
                </div>
            </section>
        </div>
    );
}
