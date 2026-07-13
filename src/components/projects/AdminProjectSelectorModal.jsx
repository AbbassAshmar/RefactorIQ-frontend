import { useEffect, useMemo, useState } from 'react';
import { Layers3, X } from 'lucide-react';
import ScanTable from '@/components/scans/ScanTable';
import { useAdminProjects } from '@/hooks';
import {
    ADMIN_PROJECT_SELECTOR_PAGE_SIZE,
    ADMIN_PROJECT_SORT,
    SORT_ORDER,
} from '@/utils/constants';
import {
    LIMIT_QUERY_KEY,
    PAGE_QUERY_KEY,
    SORT_BY_QUERY_KEY,
    SORT_ORDER_QUERY_KEY,
} from '@/utils/queryParams';


export default function AdminProjectSelectorModal({
    isOpen,
    onClose,
    onSelectProject,
    selectedProjectId,
}) {
    const [page, setPage] = useState(1);
    const projectsQuery = useAdminProjects({
        [PAGE_QUERY_KEY]: page,
        [LIMIT_QUERY_KEY]: ADMIN_PROJECT_SELECTOR_PAGE_SIZE,
        [SORT_BY_QUERY_KEY]: ADMIN_PROJECT_SORT.NAME,
        [SORT_ORDER_QUERY_KEY]: SORT_ORDER.ASCENDING,
    }, {
        enabled: isOpen,
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
            id: 'project',
            header: 'Project',
            cell: ({ row }) => (
                <div className="max-w-80">
                    <p className="truncate font-medium text-text-primary">{row.original.name}</p>
                    <p className="truncate text-small-1 text-text-tertiary">
                        {row.original.repo_owner}/{row.original.repo_name} · {row.original.branch}
                    </p>
                </div>
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
            accessorKey: 'scan_count',
            header: 'Scans',
            cell: ({ getValue }) => (Number(getValue()) || 0).toLocaleString(),
        },
    ], []);

    if (!isOpen) return null;

    const projects = projectsQuery.data?.data?.projects ?? [];
    const pagination = projectsQuery.data?.meta?.pagination;
    const errorMessage = projectsQuery.error?.response?.data?.error?.message
        || 'Unable to load projects.';

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background-overlay p-4"
            onMouseDown={onClose}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="admin-project-selector-title"
                onMouseDown={(event) => event.stopPropagation()}
                className="flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded border border-border-secondary bg-background-elevated shadow-xl"
            >
                <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                    <div>
                        <h2 id="admin-project-selector-title" className="text-h6 font-semibold text-text-primary">
                            Filter scan records by project
                        </h2>
                        <p className="mt-1 text-small-1 text-text-secondary">
                            Pin one project or keep the platform-wide view.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded p-1 text-text-secondary hover:bg-background-hover hover:text-text-primary hover:underline"
                        aria-label="Close project filter"
                    >
                        <X size={18} />
                    </button>
                </header>

                <div className="min-h-0 overflow-y-auto p-5">
                    <button
                        type="button"
                        onClick={() => onSelectProject(null)}
                        aria-pressed={!selectedProjectId}
                        className={[
                            'mb-3 flex w-full items-center gap-3 rounded border px-3 py-2 text-left transition-colors hover:bg-background-hover hover:underline',
                            selectedProjectId
                                ? 'border-border text-text-secondary'
                                : 'border-brand-primary bg-brand-bg text-brand-text',
                        ].join(' ')}
                    >
                        <Layers3 size={17} aria-hidden="true" />
                        <span>
                            <span className="block font-semibold">All projects</span>
                            <span className="block text-small-1">Show scans from every platform project.</span>
                        </span>
                    </button>

                    {projectsQuery.isError ? (
                        <div className="mb-3 rounded border border-error-border bg-error-bg px-4 py-3 text-small-1 text-error-text">
                            {errorMessage}
                        </div>
                    ) : null}

                    <ScanTable
                        data={projects}
                        columns={columns}
                        page={pagination?.page ?? page}
                        pageCount={pagination?.total_pages ?? 0}
                        totalCount={pagination?.total_count ?? 0}
                        onPageChange={setPage}
                        className="border border-border bg-background-secondary"
                        isLoading={projectsQuery.isLoading}
                        emptyMessage="No projects are available."
                        onRowClick={onSelectProject}
                        selectedRowId={selectedProjectId}
                        entityLabel="project"
                    />
                </div>
            </section>
        </div>
    );
}
