import { useMemo, useState } from 'react';
import { TableSearchBar } from '@/components';
import TablePanel from '@/components/common/TablePanel';
import RefreshButton from '@/components/common/RefreshButton';
import ScanTable from '@/components/scans/ScanTable';
import { useAdminProjects } from '@/hooks';
import {
    ADMIN_PROJECT_SORT,
    ADMIN_PROJECT_TABLE_PAGE_SIZE,
    SEARCH_QUERY_KEY,
    SORT_ORDER,
} from '@/utils/constants';
import {
    LIMIT_QUERY_KEY,
    PAGE_QUERY_KEY,
    SORT_BY_QUERY_KEY,
    SORT_ORDER_QUERY_KEY,
} from '@/utils/queryParams';


function formatDate(value) {
    if (!value) return '—';
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
    }).format(new Date(value));
}

export default function ProjectsTable() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState({ [SEARCH_QUERY_KEY]: '' });
    const projectsQuery = useAdminProjects({
        [PAGE_QUERY_KEY]: page,
        [LIMIT_QUERY_KEY]: ADMIN_PROJECT_TABLE_PAGE_SIZE,
        [SORT_BY_QUERY_KEY]: ADMIN_PROJECT_SORT.CREATED_AT,
        [SORT_ORDER_QUERY_KEY]: SORT_ORDER.DESCENDING,
        [SEARCH_QUERY_KEY]: searchQuery[SEARCH_QUERY_KEY] || undefined,
    });
    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ getValue }) => <span className="font-medium text-text-primary">{getValue()}</span>,
        },
        {
            id: 'repository',
            header: 'Repository',
            cell: ({ row }) => `${row.original.repo_owner}/${row.original.repo_name}`,
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
            accessorKey: 'branch',
            header: 'Branch',
        },
        {
            accessorKey: 'scan_count',
            header: 'Scans',
        },
        {
            accessorKey: 'created_at',
            header: 'Created',
            cell: ({ getValue }) => formatDate(getValue()),
        },
    ], []);

    const projects = projectsQuery.data?.data?.projects ?? [];
    const pagination = projectsQuery.data?.meta?.pagination;
    const errorMessage = projectsQuery.error?.response?.data?.error?.message
        || 'Unable to load projects.';

    return (
        <TablePanel
            title="Projects"
            actions={(
                <RefreshButton
                    label="refresh"
                    onClick={() => projectsQuery.refetch()}
                    isRefreshing={projectsQuery.isFetching}
                />
            )}
            toolbar={(
                <TableSearchBar
                    queryKey={SEARCH_QUERY_KEY}
                    onSearch={(nextSearchQuery) => {
                        setPage(1);
                        setSearchQuery(nextSearchQuery);
                    }}
                    placeholder="Search projects"
                    ariaLabel="Search projects by name"
                />
            )}
        >
            {projectsQuery.isError ? (
                <div className="m-2 rounded border border-error-border bg-error-bg px-4 py-3 text-small-1 text-error-text">
                    {errorMessage}
                </div>
            ) : null}
            {!projectsQuery.isError ? (
                <ScanTable
                    data={projects}
                    columns={columns}
                    page={pagination?.page ?? page}
                    pageCount={pagination?.total_pages ?? 0}
                    totalCount={pagination?.total_count ?? 0}
                    onPageChange={setPage}
                    isLoading={projectsQuery.isLoading}
                    entityLabel="project"
                    emptyMessage={searchQuery[SEARCH_QUERY_KEY]
                        ? 'No projects match your search.'
                        : 'No projects are available.'}
                />
            ) : null}
        </TablePanel>
    );
}
