import { useMemo, useState } from 'react';
import { TableSearchBar } from '@/components';
import TablePanel from '@/components/common/TablePanel';
import RefreshButton from '@/components/common/RefreshButton';
import ScanTable from '@/components/scans/ScanTable';
import { useAdminUsersList } from '@/hooks';
import { ADMIN_USER_TABLE_PAGE_SIZE, SEARCH_QUERY_KEY } from '@/utils/constants';


function formatDate(value) {
    if (!value) return '—';
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
    }).format(new Date(value));
}

export default function UsersTable() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState({ [SEARCH_QUERY_KEY]: '' });
    const usersQuery = useAdminUsersList({
        page,
        size: ADMIN_USER_TABLE_PAGE_SIZE,
        [SEARCH_QUERY_KEY]: searchQuery[SEARCH_QUERY_KEY] || undefined,
    });
    const columns = useMemo(() => [
        {
            accessorKey: 'username',
            header: 'Name',
            cell: ({ getValue }) => <span className="font-medium text-text-primary">{getValue()}</span>,
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ getValue }) => <span className="capitalize">{getValue() ?? '—'}</span>,
        },
        {
            accessorKey: 'is_active',
            header: 'Status',
            cell: ({ getValue }) => (
                <span className={getValue() ? 'text-success-text' : 'text-text-tertiary'}>
                    {getValue() ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Joined',
            cell: ({ getValue }) => formatDate(getValue()),
        },
    ], []);

    const users = usersQuery.data?.data?.items ?? [];
    const pagination = usersQuery.data?.data;
    const errorMessage = usersQuery.error?.response?.data?.error?.message
        || 'Unable to load users.';

    function submitSearch(nextSearchQuery) {
        setPage(1);
        setSearchQuery(nextSearchQuery);
    }

    return (
        <TablePanel
            title="Users"
            actions={(
                <RefreshButton
                    label="refresh"
                    onClick={() => usersQuery.refetch()}
                    isRefreshing={usersQuery.isFetching}
                />
            )}
            toolbar={(
                <TableSearchBar
                    queryKey={SEARCH_QUERY_KEY}
                    onSearch={submitSearch}
                    placeholder="Search users"
                    ariaLabel="Search users by name"
                />
            )}
        >
            {usersQuery.isError ? (
                <div className="m-2 rounded border border-error-border bg-error-bg px-4 py-3 text-small-1 text-error-text">
                    {errorMessage}
                </div>
            ) : null}
            {!usersQuery.isError ? (
                <ScanTable
                    data={users}
                    columns={columns}
                    page={pagination?.page ?? page}
                    pageCount={pagination?.pages ?? 0}
                    totalCount={pagination?.total ?? 0}
                    onPageChange={setPage}
                    isLoading={usersQuery.isLoading}
                    entityLabel="user"
                    emptyMessage={searchQuery[SEARCH_QUERY_KEY]
                        ? 'No users match your search.'
                        : 'No users are available.'}
                />
            ) : null}
        </TablePanel>
    );
}
