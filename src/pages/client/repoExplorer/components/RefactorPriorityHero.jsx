const componentScores = [
    { key: 'complexity_score', label: 'Complexity', color: 'bg-error' },
    { key: 'history_score', label: 'History', color: 'bg-accent-mauve' },
    { key: 'duplication_score', label: 'Duplication', color: 'bg-success' },
    { key: 'architecture_score', label: 'Architecture', color: 'bg-warning' },
];

const priorityClass = {
    high: 'bg-error-bg text-error-text',
    medium: 'bg-warning-bg text-warning-text',
    low: 'bg-success-bg text-success-text',
};

export default function RefactorPriorityHero({ details }) {
    const decision = details.metrics?.decision_analysis ?? {};
    const decisionMetadata = details.metadata?.decision_analysis ?? {};
    const score = Number(details.refactor_score ?? decision.refactor_score ?? 0);
    const confidence = Number(decision.score_confidence ?? 0);
    const partial = confidence < 0.7 || Number(decisionMetadata.upstream_error_count ?? 0) > 0 || Number(decisionMetadata.none_metric_count ?? 0) > 0;

    return (
        <section className="grid gap-5 rounded bg-background-tertiary p-4 md:grid-cols-[8rem_1fr]">
            <div className="text-center md:text-left">
                <p className="text-small-1 font-semibold text-text-secondary">Refactor priority</p>
                <p className="mt-1 text-h2 font-bold leading-none text-text-primary">{score.toFixed(2)}</p>
                <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-small-2 font-semibold capitalize ${priorityClass[details.priority_band] ?? 'bg-background-quaternary text-text-secondary'}`}>
                    {details.priority_band ?? 'Unknown'}
                </span>
                <p className="mt-2 text-small-2 text-text-tertiary">{Math.round(confidence * 100)}% confidence</p>
                {partial ? <p className="mt-1 text-small-2 text-warning-text">Based on partial data</p> : null}
            </div>
            <div className="space-y-2">
                {componentScores.map((component) => {
                    const value = Number(decision[component.key] ?? 0);
                    return (
                        <div key={component.key} className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-2 text-small-1">
                            <span className="text-text-secondary">{component.label}</span>
                            <div className="h-1.5 overflow-hidden rounded-full bg-background-quaternary">
                                <div className={`h-full ${component.color}`} style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
                            </div>
                            <span className="text-right text-text-secondary">{value.toFixed(2)}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
