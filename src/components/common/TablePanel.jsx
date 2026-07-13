export default function TablePanel({ title, actions, toolbar = null, children, className = '' }) {
    return (
        <section className={`overflow-hidden rounded border border-border bg-background-secondary p-2 ${className}`}>
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-2 py-2">
                <h1 className="text-h6 font-semibold text-text-primary">{title}</h1>
                {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
            </header>
            {toolbar ? <div className="border-b border-border px-2 py-2">{toolbar}</div> : null}
            <div className="pt-2">{children}</div>
        </section>
    );
}
