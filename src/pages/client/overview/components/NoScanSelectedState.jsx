import { RadioTower, ScanSearch } from 'lucide-react';


export default function NoScanSelectedState({ hasSuccessfulScans, onSelectScan, onGoToScans }) {
    return (
        <section className="flex min-h-[24rem] flex-col items-center justify-center rounded border border-border bg-background-secondary px-6 py-10 text-center">
            <RadioTower size={48} strokeWidth={1.5} className="text-text-tertiary" />
            <h1 className="mt-4 text-h3 font-medium text-text-primary">No scan is selected</h1>
            <p className="mt-3 max-w-xl text-body leading-relaxed text-text-secondary">
                {hasSuccessfulScans
                    ? 'Select a successful scan to see the overview for that scan.'
                    : 'Select a scan or perform one to see the overview data for your project.'}
            </p>
            <button
                type="button"
                onClick={hasSuccessfulScans ? onSelectScan : onGoToScans}
                className="mt-6 inline-flex items-center gap-2 rounded border border-brand-primary px-2 py-1 text-body font-semibold text-brand-text transition-colors hover:bg-brand-hover hover:underline"
            >
                <ScanSearch size={16} />
                {hasSuccessfulScans ? 'Select scan' : 'Go to scans'}
            </button>
        </section>
    );
}
