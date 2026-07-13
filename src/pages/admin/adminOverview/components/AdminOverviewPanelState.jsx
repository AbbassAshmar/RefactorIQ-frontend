export function AdminOverviewPanelLoading({ className = 'min-h-40' }) {
    return (
        <div
            className={`${className} animate-pulse rounded bg-background-tertiary`}
            role="status"
            aria-label="Loading panel data"
        />
    );
}

export function AdminOverviewPanelError({ message }) {
    return (
        <div className="flex min-h-32 items-center justify-center rounded border border-error-border bg-error-bg px-4 py-6 text-center text-small-1 text-error-text">
            {message}
        </div>
    );
}

export function AdminOverviewPanelEmpty({ message }) {
    return (
        <div className="flex min-h-32 items-center justify-center px-4 py-6 text-center text-small-1 text-text-tertiary">
            {message}
        </div>
    );
}
