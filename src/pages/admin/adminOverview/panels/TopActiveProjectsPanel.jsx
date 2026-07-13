import { PanelWrapper } from '@/components';
import ScanTable from '@/components/scans/ScanTable';
import { useAdminProjects } from '@/hooks';
import {
    AdminOverviewPanelEmpty,
    AdminOverviewPanelError,
    AdminOverviewPanelLoading,
} from '@/pages/admin/adminOverview/components/AdminOverviewPanelState';
import { getAdminOverviewErrorMessage } from '@/pages/admin/adminOverview/adminOverviewError';
import {
    ADMIN_OVERVIEW_TOP_PROJECT_LIMIT,
    ADMIN_PROJECT_SORT,
    SORT_ORDER,
} from '@/utils/constants';
import {
    LIMIT_QUERY_KEY,
    SORT_BY_QUERY_KEY,
    SORT_ORDER_QUERY_KEY,
} from '@/utils/queryParams';


const TOP_ACTIVE_PROJECTS_PARAMS = {
    [LIMIT_QUERY_KEY]: ADMIN_OVERVIEW_TOP_PROJECT_LIMIT,
    [SORT_BY_QUERY_KEY]: ADMIN_PROJECT_SORT.SCAN_COUNT,
    [SORT_ORDER_QUERY_KEY]: SORT_ORDER.DESCENDING,
};

const columns = [
    {
        id: 'project',
        header: 'Project',
        cell: ({ row }) => (
            <div className="max-w-64">
                <p className="truncate font-medium text-text-primary" title={row.original.name}>
                    {row.original.name}
                </p>
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
        cell: ({ getValue }) => (
            <span className="font-semibold text-text-primary">
                {(Number(getValue()) || 0).toLocaleString()}
            </span>
        ),
    },
];

export default function TopActiveProjectsPanel() {
    const query = useAdminProjects(TOP_ACTIVE_PROJECTS_PARAMS);
    const projects = query.data?.data?.projects ?? [];

    return (
        <PanelWrapper
            title="Top 5 active projects"
            description="Projects with the highest total scan count across all users."
            className="h-full"
        >
            {query.isLoading ? <AdminOverviewPanelLoading className="min-h-72" /> : null}
            {query.isError ? (
                <AdminOverviewPanelError
                    message={getAdminOverviewErrorMessage(query.error, 'Unable to load active projects.')}
                />
            ) : null}
            {!query.isLoading && !query.isError && projects.length === 0 ? (
                <AdminOverviewPanelEmpty message="No projects are available yet." />
            ) : null}
            {!query.isLoading && !query.isError && projects.length > 0 ? (
                <ScanTable
                    data={projects.slice(0, ADMIN_OVERVIEW_TOP_PROJECT_LIMIT)}
                    columns={columns}
                    showFooter={false}
                    compact
                    emptyMessage="No projects are available yet."
                    entityLabel="project"
                />
            ) : null}
        </PanelWrapper>
    );
}
