import { RefreshCw } from 'lucide-react';


export default function RefreshButton({
    onClick,
    isRefreshing = false,
    label = 'Refresh',
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 border-0 bg-transparent px-0 py-1 text-body font-semibold text-brand-text transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            {label}
        </button>
    );
}
