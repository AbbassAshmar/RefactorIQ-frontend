export default function UnauthenticatedNavbar() {
    return (
        <header className="sticky top-0 z-40 flex h-12 items-center border-b border-border-default bg-background-secondary px-4">
            {/* Logo only */}
            <div className="flex items-center gap-2 select-none">
                <span className="text-body font-bold tracking-tight text-brand-text">
                    R<span className="text-text-primary">.</span>
                </span>
            </div>
        </header>
    );
}
