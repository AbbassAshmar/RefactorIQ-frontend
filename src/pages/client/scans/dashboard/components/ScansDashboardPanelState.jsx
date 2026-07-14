export function ScansDashboardPanelLoading({ className = 'min-h-56' }) {
    return (
        <div
            className={`${className} animate-pulse rounded bg-background-tertiary`}
            role="status"
            aria-label="Loading dashboard panel"
        />
    );
}

export function ScansDashboardPanelError({ message = 'Unable to load this panel.' }) {
    return (
        <div className="flex min-h-32 items-center justify-center rounded border border-error-border bg-error-bg px-4 py-6 text-center text-small-1 text-error-text">
            {message}
        </div>
    );
}

export function ScansDashboardPanelEmpty({ message = 'No data is available yet.' }) {
    return (
        <div className="flex min-h-32 items-center justify-center px-4 py-6 text-center text-small-1 text-text-tertiary">
            {message}
        </div>
    );
}
