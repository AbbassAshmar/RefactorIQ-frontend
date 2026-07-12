import { Sparkles } from 'lucide-react';


export default function FileSummariesSection({ query }) {
    const summaries = query.data?.data?.summaries;

    return (
        <section className="grid gap-2 md:grid-cols-2">
            {['general', 'architectural'].map((type) => (
                <article key={type} className="min-h-32 rounded-md border border-border-secondary bg-background-tertiary p-3">
                    <h3 className="flex items-center gap-1.5 text-small-1 font-semibold capitalize text-text-secondary">
                        <Sparkles size={13} className="text-brand-primary" />
                        {type} summary
                    </h3>
                    {query.isLoading ? <div className="mt-3 h-16 animate-pulse rounded bg-background-quaternary" /> : null}
                    {!query.isLoading && summaries?.[type] ? <p className="mt-2 text-body leading-relaxed text-text-primary">{summaries[type]}</p> : null}
                    {!query.isLoading && !summaries?.[type] ? (
                        <p className="mt-2 text-small-1 leading-relaxed text-text-tertiary">{summaries?.error || 'AI summary is unavailable.'}</p>
                    ) : null}
                </article>
            ))}
        </section>
    );
}
