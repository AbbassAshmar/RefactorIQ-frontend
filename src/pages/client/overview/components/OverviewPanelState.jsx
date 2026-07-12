export function OverviewPanelLoading() {
    return <div className="h-40 animate-pulse rounded bg-background-tertiary" />;
}

export function OverviewPanelError({ message = 'Unable to load this overview panel.' }) {
    return (
        <div className="flex min-h-32 items-center justify-center rounded border border-error-border bg-error-bg px-4 py-6 text-center text-small-1 text-error-text">
            {message}
        </div>
    );
}

export function OverviewPanelEmpty({ message = 'No data is available for this scan.' }) {
    return <div className="flex min-h-32 items-center justify-center px-4 py-6 text-center text-small-1 text-text-tertiary">{message}</div>;
}
