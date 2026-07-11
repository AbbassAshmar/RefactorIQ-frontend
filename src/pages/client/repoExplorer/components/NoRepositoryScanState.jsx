import { RadioTower, ScanSearch } from 'lucide-react';


export default function NoRepositoryScanState({ hasSuccessfulScans, onSelectScan, onGoToScans }) {
    return (
        <section className="flex min-h-[30rem] flex-col items-center justify-center rounded-md border border-border bg-background-secondary p-8 text-center">
            <RadioTower size={46} strokeWidth={1.5} className="text-text-tertiary" />
            <h1 className="mt-4 text-h3 font-medium text-text-primary">No scan is selected</h1>
            <p className="mt-2 max-w-lg text-body text-text-secondary">Select a successful scan to browse its analyzed repository files.</p>
            <button type="button" onClick={hasSuccessfulScans ? onSelectScan : onGoToScans} className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-body font-semibold text-brand-text hover:bg-brand-hover">
                <ScanSearch size={16} />{hasSuccessfulScans ? 'Select scan' : 'Go to scans'}
            </button>
        </section>
    );
}
