import { useState } from 'react';
import { AlertTriangle, ArrowRight, Network } from 'lucide-react';
import MetricStatCard from '@/pages/client/repoExplorer/components/MetricStatCard';
import RelatedFileList from '@/pages/client/repoExplorer/components/RelatedFileList';


const tabs = [
    { key: 'complexity', label: 'Complexity', layer: 'static_analysis' },
    { key: 'history', label: 'History', layer: 'history_analysis' },
    { key: 'architecture', label: 'Architecture', layer: 'architecture_analysis' },
    { key: 'duplication', label: 'Duplication', layer: 'duplication_analysis' },
];

function hasLayerErrors(errors, layer) {
    const value = errors?.[layer];
    return Array.isArray(value) ? value.length > 0 : Boolean(value && Object.keys(value).length);
}

function percentage(value) {
    if (value === null || value === undefined) return null;
    return `${Math.round(Number(value) * 100)}%`;
}

function ComplexityTab({ details }) {
    const metrics = details.metrics?.static_analysis ?? {};
    const coverage = Math.max(0, Math.min(100, Number(metrics.testing_coverage ?? 0)));
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                <MetricStatCard label="Avg cyclomatic" value={metrics.average_cyclomatic_complexity} />
                <MetricStatCard label="Max cyclomatic" value={metrics.max_cyclomatic_complexity} />
                <MetricStatCard label="Avg cognitive" value={metrics.average_cognitive_complexity} />
                <MetricStatCard label="Max cognitive" value={metrics.max_cognitive_complexity} />
                <MetricStatCard label="LOC / LLOC" value={`${metrics.lines_of_code ?? '—'} / ${metrics.logical_lines_of_code ?? '—'}`} />
                <MetricStatCard label="Comments" value={metrics.count_of_comments} />
                <MetricStatCard label="Long conditions" value={metrics.long_conditions_count} />
                <MetricStatCard label="Max if/else chain" value={metrics.max_if_else_chain_length} />
                <MetricStatCard label="Avg parameters" value={metrics.average_parameters_count} />
                <MetricStatCard label="FIXME comments" value={metrics.count_of_fixme_comments} />
                <MetricStatCard label="Empty except blocks" value={metrics.count_of_empty_except_blocks} />
                <div className="flex items-center gap-3 rounded-md bg-background-tertiary px-3 py-3">
                    <div className="grid h-12 w-12 place-items-center rounded-full" style={{ background: `conic-gradient(var(--info-default) ${coverage}%, var(--background-quaternary) 0)` }}>
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-background-tertiary text-small-2 font-semibold text-text-primary">{Math.round(coverage)}%</div>
                    </div>
                    <span className="text-small-1 text-text-secondary">Coverage</span>
                </div>
            </div>
        </div>
    );
}

function HistoryTab({ details, onSelectFile }) {
    const metrics = details.metrics?.history_analysis ?? {};
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                <MetricStatCard label="Contributors" value={metrics.contributors_count} />
                <MetricStatCard label="Recent updates" value={metrics.recent_update_count} />
                <MetricStatCard label="Historical updates" value={metrics.historical_update_count} />
                <MetricStatCard label="Churn / size" value={metrics.churn_to_size_ratio} />
                <MetricStatCard label="Bug-fix ratio" value={percentage(metrics.bug_fix_ratio)} />
                <MetricStatCard label="Bug-fix commits" value={metrics.bug_fix_commit_count} />
                <MetricStatCard label="Complexity growth" value={metrics.cyclomatic_complexity_growth_rate} />
                <MetricStatCard label="Co-change count" value={metrics.co_change_file_count} />
            </div>
            <RelatedFileList title="Frequently co-changed with" files={details.co_changed_files ?? []} onSelectFile={onSelectFile} />
        </div>
    );
}

function ArchitectureTab({ details, onSelectFile }) {
    const metrics = details.metrics?.architecture_analysis ?? {};
    const cycles = details.circular_dependencies ?? [];
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                <MetricStatCard label="Fan-in / fan-out" value={`${metrics.fan_in ?? '—'} / ${metrics.fan_out ?? '—'}`} />
                <MetricStatCard label="Transitive dependents" value={metrics.transitive_dependents_count} />
                <MetricStatCard label="Betweenness" value={metrics.betweenness_centrality} />
                <MetricStatCard label="Instability" value={metrics.instability_index} />
            </div>
            <div className="flex items-center justify-center gap-3 rounded-md border border-border bg-background-tertiary p-3 text-small-1 text-text-secondary">
                <span className="rounded bg-info-bg px-2 py-1 text-info-text">{metrics.fan_in ?? 0} incoming</span>
                <ArrowRight size={15} />
                <span className="flex items-center gap-1 font-mono text-text-primary"><Network size={15} />This file</span>
                <ArrowRight size={15} />
                <span className="rounded bg-warning-bg px-2 py-1 text-warning-text">{metrics.fan_out ?? 0} outgoing</span>
            </div>
            {cycles.map((cycle) => (
                <div key={cycle.group_id} className="rounded-md border border-error-border bg-error-bg p-3">
                    <p className="flex items-center gap-1.5 text-small-1 font-semibold text-error-text"><AlertTriangle size={14} />Circular dependency ({cycle.size} files)</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1 text-small-1 text-error-text">
                        {cycle.members.map((member, index) => (
                            <span key={member.id} className="inline-flex items-center gap-1">
                                <button type="button" onClick={() => onSelectFile(member.id)} className="font-mono hover:underline">{member.file_path}</button>
                                {index < cycle.members.length - 1 ? <ArrowRight size={12} /> : null}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function DuplicationTab({ details, onSelectFile }) {
    const metrics = details.metrics?.duplication_analysis ?? {};
    const matches = details.duplicate_matches ?? [];
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                <MetricStatCard label="Duplicate blocks" value={metrics.duplicate_blocks_count} />
                <MetricStatCard label="Duplicate LOC" value={metrics.duplicate_loc_count} />
                <MetricStatCard label="Semantic duplicates" value={metrics.semantic_duplicate_blocks_count} />
                <MetricStatCard label="Group size" value={metrics.duplication_group_size} />
                <MetricStatCard label="Max similarity" value={percentage(metrics.max_similarity_score)} />
            </div>
            <div>
                <h4 className="mb-1.5 text-small-1 font-semibold text-text-secondary">Matched blocks</h4>
                {matches.length === 0 ? <p className="text-small-1 text-text-tertiary">No duplicate matches found.</p> : null}
                <div className="divide-y divide-border">
                    {matches.flatMap((match) => match.matched_files.map((file) => (
                        <button key={`${match.match_type}-${match.start_line}-${file.id}`} type="button" onClick={() => onSelectFile(file.id)} className="flex w-full items-center justify-between gap-2 py-2 text-left text-small-1 hover:text-text-brand">
                            <span className="min-w-0 truncate"><span className="capitalize">{match.match_type}</span>, lines {match.start_line ?? '—'}–{match.end_line ?? '—'} · <span className="font-mono">{file.file_path}</span></span>
                            <span className="shrink-0 text-text-tertiary">{match.max_similarity === null ? '—' : `${Math.round(match.max_similarity * 100)}%`}</span>
                        </button>
                    )))}</div>
            </div>
        </div>
    );
}

export default function FileMetricsTabs({ details, onSelectFile }) {
    const [activeTab, setActiveTab] = useState('complexity');
    const activeLayer = tabs.find((tab) => tab.key === activeTab)?.layer;

    return (
        <section>
            <div className="flex overflow-x-auto border-b border-border" role="tablist" aria-label="File metrics">
                {tabs.map((tab) => {
                    const active = tab.key === activeTab;
                    const warning = hasLayerErrors(details.errors, tab.layer);
                    return (
                        <button key={tab.key} type="button" role="tab" aria-selected={active} onClick={() => setActiveTab(tab.key)} className={`relative flex items-center gap-1 px-3 py-2 text-small-1 font-semibold ${active ? 'text-text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-brand-primary' : 'text-text-secondary hover:text-text-primary'}`}>
                            {tab.label}
                            {warning ? <AlertTriangle size={12} className="text-warning-default" aria-label="Layer contains analysis errors" /> : null}
                        </button>
                    );
                })}
            </div>
            {hasLayerErrors(details.errors, activeLayer) ? (
                <div className="mt-2 rounded border border-warning-border bg-warning-bg px-3 py-2 text-small-1 text-warning-text">Some metrics in this group could not be calculated.</div>
            ) : null}
            <div className="pt-3">
                {activeTab === 'complexity' ? <ComplexityTab details={details} /> : null}
                {activeTab === 'history' ? <HistoryTab details={details} onSelectFile={onSelectFile} /> : null}
                {activeTab === 'architecture' ? <ArchitectureTab details={details} onSelectFile={onSelectFile} /> : null}
                {activeTab === 'duplication' ? <DuplicationTab details={details} onSelectFile={onSelectFile} /> : null}
            </div>
        </section>
    );
}
