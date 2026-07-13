import { ArrowRight, CircleAlert, Target } from 'lucide-react';
import { PanelWrapper } from '@/components';
import { OverviewPanelEmpty, OverviewPanelError, OverviewPanelLoading } from '@/pages/client/overview/components/OverviewPanelState';
import { INSIGHT_PRIORITY_STYLES } from '@/utils/constants';


export default function DirectoryInsightPanel({ query }) {
    const insight = query.data?.data;
    const priorityDirectories = insight?.priority_directories ?? [];
    const primaryDirectory = priorityDirectories[0];

    return (
        <PanelWrapper
            title={insight?.title ?? 'Recommended focus area'}
            description="A plain-language recommendation about which directories need attention and what to do next."
            className="h-full"
        >
            {query.isLoading ? <OverviewPanelLoading /> : null}
            {query.isError ? <OverviewPanelError message="Unable to generate a directory recommendation right now." /> : null}
            {!query.isLoading && !query.isError && !insight ? <OverviewPanelEmpty message="No directory recommendation is available for this scan." /> : null}
            {!query.isLoading && !query.isError && insight ? (
                <div className="flex min-h-[20rem] flex-col gap-4">
                    <div className="rounded border border-brand-primary bg-brand-bg p-3">
                        <div className="flex items-center gap-2 text-small-1 font-semibold uppercase tracking-wide text-brand-text">
                            <Target size={15} />
                            <span>Primary focus</span>
                        </div>
                        <p className="mt-2 truncate font-mono text-body font-semibold text-text-primary">
                            {primaryDirectory?.path ?? 'Review the highest-risk directories'}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <p className="mb-1 text-small-1 font-semibold uppercase tracking-wide text-text-tertiary">Main finding</p>
                            <p className="text-small-1 leading-relaxed text-text-primary">{insight.summary}</p>
                        </div>
                        <div>
                            <p className="mb-1 text-small-1 font-semibold uppercase tracking-wide text-text-tertiary">What it means</p>
                            <p className="text-small-1 leading-relaxed text-text-secondary">{insight.explanation}</p>
                        </div>
                        <div>
                            <p className="mb-1 text-small-1 font-semibold uppercase tracking-wide text-text-tertiary">Recommended action</p>
                            <p className="text-small-1 leading-relaxed text-text-secondary">{insight.recommendation}</p>
                        </div>
                    </div>

                    {priorityDirectories.length > 0 ? (
                        <div className="mt-auto space-y-2 border-t border-border pt-3">
                            {priorityDirectories.slice(0, 3).map((directory) => (
                                <div key={directory.path} className="flex items-center justify-between gap-3 text-small-1">
                                    <div className="flex min-w-0 items-center gap-2">
                                        <CircleAlert size={14} className="shrink-0 text-text-tertiary" />
                                        <span className="truncate font-mono text-text-secondary">{directory.path}</span>
                                    </div>
                                    <span className={`inline-flex shrink-0 items-center gap-1 rounded border px-2 py-0.5 capitalize ${INSIGHT_PRIORITY_STYLES[directory.priority] ?? INSIGHT_PRIORITY_STYLES.medium}`}>
                                        {directory.priority}
                                        <ArrowRight size={12} />
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            ) : null}
        </PanelWrapper>
    );
}
