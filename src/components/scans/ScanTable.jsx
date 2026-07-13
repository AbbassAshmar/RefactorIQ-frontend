import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export function ScanStatusBadge({ status }) {
    const styles = {
        succeeded: 'border-success-border bg-success-bg text-success-text',
        failed: 'border-error-border bg-error-bg text-error-text',
        running: 'border-info-border bg-info-bg text-info-text',
        pending: 'border-warning-border bg-warning-bg text-warning-text',
        cancelled: 'border-border-secondary bg-background-tertiary text-text-secondary',
    };

    return (
        <span className={`inline-flex rounded border px-2 py-0.5 text-small-1 font-medium capitalize ${styles[status] ?? styles.cancelled}`}>
            {status}
        </span>
    );
}

export default function ScanTable({
    data = [],
    columns,
    page,
    pageCount,
    totalCount,
    onPageChange,
    isLoading = false,
    emptyMessage = 'No scans found.',
    onRowClick,
    selectedRowId,
    className = '',
    entityLabel = 'scan',
    showFooter = true,
    compact = false,
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: showFooter,
        pageCount,
    });

    return (
        <div className={`overflow-hidden rounded ${className}`}>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-body">
                    <thead className="border-b border-border text-small-1 uppercase tracking-wide text-text-tertiary">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className={`whitespace-nowrap px-4 ${compact ? 'py-2' : 'py-2.5'} font-semibold`}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {isLoading ? (
                            [0, 1, 2, 3].map((row) => (
                                <tr key={row} className="border-b border-border last:border-0">
                                    <td colSpan={columns.length} className={`px-4 ${compact ? 'py-2' : 'py-3'}`}>
                                        <div className="h-4 animate-pulse rounded bg-background-tertiary" />
                                    </td>
                                </tr>
                            ))
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    onClick={() => onRowClick?.(row.original)}
                                    className={[
                                        'border-b border-border last:border-0',
                                        onRowClick ? 'cursor-pointer hover:bg-background-hover' : 'hover:bg-background-hover',
                                        selectedRowId === row.original.id ? 'bg-background-selected' : '',
                                    ].join(' ')}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className={`whitespace-nowrap px-4 ${compact ? 'py-2' : 'py-3'} text-text-secondary`}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-10 text-center text-text-tertiary">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showFooter ? (
                <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-small-1 text-text-secondary">
                    <span>{totalCount ?? 0} {entityLabel}{totalCount === 1 ? '' : 's'}</span>
                    <div className="flex items-center gap-2">
                        <span>Page {page} of {Math.max(pageCount, 1)}</span>
                        <button
                            type="button"
                            onClick={() => onPageChange(page - 1)}
                            disabled={page <= 1}
                            className="inline-flex h-7 w-7 items-center justify-center rounded border border-brand-primary text-brand-text hover:bg-brand-hover hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Previous page"
                        >
                            <ChevronLeft size={15} />
                        </button>
                        <button
                            type="button"
                            onClick={() => onPageChange(page + 1)}
                            disabled={page >= pageCount}
                            className="inline-flex h-7 w-7 items-center justify-center rounded border border-brand-primary text-brand-text hover:bg-brand-hover hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Next page"
                        >
                            <ChevronRight size={15} />
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
