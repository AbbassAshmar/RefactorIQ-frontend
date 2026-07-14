import { AlertTriangle, RotateCcw } from 'lucide-react';
import { PanelWrapper } from '@/components';


export default function CircularDependenciesPanel({ groups, isLoading, isError, onRetry, onOpenFile }) {
    return (
        <PanelWrapper
            title="Circular dependencies"
            subtitle={`${groups.length} ${groups.length === 1 ? 'group' : 'groups'} detected`}
            description="Files grouped together participate in the same circular dependency component."
            className="h-full min-h-[20rem]"
        >
            <div className="h-full min-h-0 overflow-y-auto pr-1">
                {isLoading ? (
                    <div className="space-y-2" aria-label="Loading circular dependencies">
                        <div className="h-28 animate-pulse rounded bg-background-tertiary" />
                        <div className="h-20 animate-pulse rounded bg-background-tertiary" />
                    </div>
                ) : null}
                {!isLoading && isError ? (
                    <div className="rounded border border-error-border bg-error-bg p-4 text-center text-error-text">
                        <AlertTriangle size={24} className="mx-auto" />
                        <p className="mt-2 text-small-1">Unable to load circular dependencies. The graph remains available without cycle highlighting.</p>
                        <button type="button" onClick={onRetry} className="mt-3 inline-flex items-center gap-1 rounded border border-brand-primary px-2 py-1 text-brand-text hover:bg-brand-hover hover:underline">
                            <RotateCcw size={13} />Retry
                        </button>
                    </div>
                ) : null}
                {!isLoading && !isError && groups.length === 0 ? (
                    <div className="flex min-h-40 flex-col items-center justify-center rounded border border-border bg-background-tertiary p-4 text-center">
                        <p className="text-body font-semibold text-text-primary">No circular dependencies</p>
                        <p className="mt-1 text-small-1 text-text-tertiary">No circular dependency groups were detected for this scan.</p>
                    </div>
                ) : null}
                {!isLoading && !isError && groups.length > 0 ? (
                    <div className="space-y-2">
                        {groups.map((group, index) => (
                            <section key={group.group_id} className="rounded border border-error-border bg-error-bg p-3">
                                <h4 className="flex items-center gap-1.5 text-small-1 font-semibold text-error-text">
                                    <AlertTriangle size={14} />Cycle group {index + 1}
                                </h4>
                                <p className="mt-1 text-small-2 text-error-text">{group.size} files</p>
                                <div className="mt-2 divide-y divide-error-border">
                                    {group.members.map((member) => (
                                        <button
                                            key={member.id}
                                            type="button"
                                            onClick={() => onOpenFile(member.id)}
                                            className="block w-full truncate py-2 text-left font-mono text-small-1 text-error-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
                                            title={member.file_path}
                                        >
                                            {member.file_path}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                ) : null}
            </div>
        </PanelWrapper>
    );
}
