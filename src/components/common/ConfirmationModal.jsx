import { useEffect } from 'react';
import { X } from 'lucide-react';


export default function ConfirmationModal({
    isOpen,
    title,
    children,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onClose,
    isConfirming = false,
    confirmingLabel = 'Confirming…',
    variant = 'default',
}) {
    useEffect(() => {
        if (!isOpen) return undefined;
        function handleKeyDown(event) {
            if (event.key === 'Escape' && !isConfirming) onClose();
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isConfirming, isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-overlay p-4" onMouseDown={() => !isConfirming && onClose()}>
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirmation-modal-title"
                onMouseDown={(event) => event.stopPropagation()}
                className="w-full max-w-md rounded border border-border-secondary bg-background-elevated shadow-xl"
            >
                <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                    <h2 id="confirmation-modal-title" className="text-h6 font-semibold text-text-primary">{title}</h2>
                    <button type="button" onClick={onClose} disabled={isConfirming} className="rounded p-1 text-text-secondary hover:bg-background-hover hover:text-text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50" aria-label="Close">
                        <X size={18} />
                    </button>
                </header>
                <div className="px-5 py-4 text-body leading-relaxed text-text-secondary">{children}</div>
                <footer className="flex justify-end gap-2 border-t border-border px-5 py-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isConfirming}
                        className="rounded border border-border px-2 py-1 text-text-secondary font-semibold text-brand-text transition-colors hover:bg-brand-hover hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isConfirming}
                        className={variant === 'danger'
                            ? 'rounded border border-error px-2 py-1 text-body font-semibold text-error transition-colors hover:bg-error-bg hover:underline disabled:cursor-not-allowed disabled:opacity-50'
                            : 'rounded border border-brand-primary px-2 py-1 text-body font-semibold text-brand-text transition-colors hover:bg-brand-hover hover:underline disabled:cursor-not-allowed disabled:opacity-50'}
                    >
                        {isConfirming ? confirmingLabel : confirmLabel}
                    </button>
                </footer>
            </section>
        </div>
    );
}
