import { GitBranch, Network } from 'lucide-react';
import { PanelWrapper } from '@/components';
import { OverviewPanelEmpty } from '@/pages/client/overview/components/OverviewPanelState';


export default function ArchitecturalHotspotPanel({ files, isLoading, isError }) {
    const hotspot = files.reduce((current, file) => {
        const currentScore = (current?.fan_in ?? 0) + (current?.fan_out ?? 0);
        const fileScore = (file.fan_in ?? 0) + (file.fan_out ?? 0);
        return fileScore > currentScore ? file : current;
    }, null);

    return (
        <PanelWrapper
            title="Architectural hotspot"
            description="The most connected file among the top refactor candidates, based on fan-in and fan-out."
            className="h-full"
        >
            {isLoading ? <div className="h-40 animate-pulse rounded bg-background-tertiary" /> : null}
            {isError ? <div className="flex min-h-32 items-center justify-center rounded border border-error-border bg-error-bg px-4 py-6 text-center text-small-1 text-error-text">Unable to load hotspot data.</div> : null}
            {!isLoading && !isError && !hotspot ? <OverviewPanelEmpty message="No architectural hotspot is available for this scan." /> : null}
            {!isLoading && !isError && hotspot ? (
                <div className="flex flex-col justify-between gap-4">
                    <div className="flex items-center gap-3 rounded border border-border bg-background-tertiary p-3">
                        <div className="rounded bg-brand-bg p-2 text-brand-primary"><Network size={20} /></div>
                        <div className="min-w-0">
                            <p className="text-small-1 uppercase tracking-wide text-text-tertiary">Highest connectivity</p>
                            <p className="mt-1 truncate font-mono text-body font-semibold text-text-primary">{hotspot.file_path}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded border border-border px-3 py-4">
                            <div className="flex items-center gap-2 text-text-secondary"><GitBranch size={15} /><span className="text-small-1">Fan-in</span></div>
                            <p className="mt-2 text-h3 font-bold text-text-primary">{hotspot.fan_in}</p>
                            <p className="mt-1 text-small-1 text-text-tertiary">incoming dependencies</p>
                        </div>
                        <div className="rounded border border-border px-3 py-4">
                            <div className="flex items-center gap-2 text-text-secondary"><GitBranch size={15} /><span className="text-small-1">Fan-out</span></div>
                            <p className="mt-2 text-h3 font-bold text-text-primary">{hotspot.fan_out}</p>
                            <p className="mt-1 text-small-1 text-text-tertiary">outgoing dependencies</p>
                        </div>
                    </div>
                    <p className="text-small-1 leading-relaxed text-text-secondary">This file is a strong architectural leverage point: changes here can affect many connected parts of the repository.</p>
                </div>
            ) : null}
        </PanelWrapper>
    );
}
