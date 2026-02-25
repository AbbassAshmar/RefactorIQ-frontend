import { useEffect, useRef, useState } from 'react';
import { Ellipsis, Info, Maximize2, Minimize2 } from 'lucide-react';

export default function PanelWrapper({ title, subtitle, description, children, className = '' }) {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (!menuRef.current || menuRef.current.contains(event.target)) {
                return;
            }

            setIsMenuOpen(false);
        }

        function handleEscape(event) {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    function handleToggleMaximize() {
        setIsMaximized((prev) => !prev);
        setIsMenuOpen(false);
    }

    return (
        <section
            className={[
                'flex flex-col rounded-md border border-border-default bg-background-secondary p-3 shadow-sm',
                isMaximized
                    ? 'fixed inset-x-0 bottom-0 top-12 z-40 m-3 flex flex-col overflow-hidden'
                    : '',
                className,
            ].join(' ').trim()}
        >
            <header className="mb-2 flex items-start justify-between gap-3">
                {(title || subtitle || description) ? (
                    <div className="min-w-0">
                        {title ? (
                            <div className="flex items-center gap-1.5">
                                <h3 className="truncate text-body font-semibold text-text-primary">{title}</h3>
                                {description ? (
                                    <div className="group relative">
                                        <Info size={14} className="text-text-secondary" />
                                        <div className="pointer-events-none absolute left-5 top-1/2 z-20 hidden w-56 -translate-y-1/2 rounded-md border border-border-secondary bg-background-elevated p-2 text-small-1 text-text-secondary shadow-md group-hover:block">
                                            {description}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                        {subtitle ? (
                            <p className="mt-0.5 text-small-1 text-text-secondary">{subtitle}</p>
                        ) : null}
                    </div>
                ) : <div />}

                <div className="relative" ref={menuRef}>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border-default bg-background-secondary text-text-secondary transition-colors hover:bg-background-hover hover:text-text-primary"
                        aria-label="Panel options"
                    >
                        <Ellipsis size={16} />
                    </button>

                    {isMenuOpen ? (
                        <div className="absolute right-0 top-8 z-30 min-w-40 rounded-md border border-border-secondary bg-background-elevated p-1 shadow-md">
                            <button
                                type="button"
                                onClick={handleToggleMaximize}
                                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-small-1 text-text-primary transition-colors hover:bg-background-hover"
                            >
                                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                                {isMaximized ? 'Minimize panel' : 'Maximize panel'}
                            </button>
                        </div>
                    ) : null}
                </div>
            </header>

            <div className={isMaximized ? 'min-h-0 flex-1' : ''}>{children}</div>
        </section>
    );
}