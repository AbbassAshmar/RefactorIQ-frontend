/**
 * Generic placeholder page used during development.
 * Replace each page with real content when ready.
 */
export default function PlaceholderPage({ title, subtitle }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 min-h-[60vh]">
            <h1 className="text-h3 font-bold text-text-primary mb-2">{title}</h1>
            {subtitle && (
                <p className="text-body text-text-secondary">{subtitle}</p>
            )}
        </div>
    );
}
