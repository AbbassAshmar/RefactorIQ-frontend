export default function SimplisticKpiCard({
    value,
    label,
    valueClassName = 'text-brand',
    className = '',
}) {
    return (
        <section
            aria-label={label}
            className={[
                'flex min-h-32 min-w-[10rem] flex-1 flex-col items-center justify-center rounded border border-border bg-background-secondary p-3 text-center shadow-sm',
                className,
            ].join(' ').trim()}
        >
            <p className={`text-h2 font-bold leading-none ${valueClassName}`}>
                {value}
            </p>
            <p className="mt-2 text-body text-text-primary">- {label} -</p>
        </section>
    );
}
