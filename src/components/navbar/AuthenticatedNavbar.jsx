import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';
import { useLogout } from '@/hooks';

function UserAvatar({ name }) {
    const initial = name?.charAt(0)?.toUpperCase() || '?';
    return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-rose text-small-1 font-semibold text-text-primary select-none">
            {initial}
        </div>
    );
}

function UserDropdown({ user, onClose }) {
    const navigate = useNavigate();
    const logout = useLogout();
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    function handleLogout() {
        logout.mutate(undefined, {
            onSettled: () => {
                navigate('/login', { replace: true });
            },
        });
    }

    const fullName = user?.username || user?.email || 'User';

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border-default bg-background-elevated shadow-lg z-50"
        >
            {/* User info header */}
            <div className="flex items-center gap-3 border-b border-border-default px-4 py-3">
                <UserAvatar name={fullName} />
                <span className="truncate text-small-1 font-medium text-text-primary">
                    {fullName}
                </span>
            </div>

            {/* Menu items */}
            <div className="py-1">
                <button
                    onClick={() => { onClose(); }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-small-1 text-text-link hover:bg-background-hover transition-colors"
                >
                    <User size={14} strokeWidth={2} />
                    Profile
                </button>
                <button
                    onClick={() => { onClose(); }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-small-1 text-text-link hover:bg-background-hover transition-colors"
                >
                    <Settings size={14} strokeWidth={2} />
                    Settings
                </button>
            </div>

            {/* Logout */}
            <div className="border-t border-border-default py-1">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2 text-small-1 text-error hover:bg-background-hover transition-colors"
                >
                    <LogOut size={14} strokeWidth={2} />
                    Log out
                </button>
            </div>
        </div>
    );
}

function VerticalDivider() {
    return <div className="h-6 w-px bg-border-default shrink-0" />;
}

function PageBadge({ label }) {
    return (
        <span className="rounded-full bg-brand-primary px-3 py-0.5 text-small-1 font-medium text-text-primary select-none">
            {label}
        </span>
    );
}

/**
 * Map current pathname to a human-readable page name.
 * Falls back to the last path segment capitalised.
 */
function usePageName() {
    const { pathname } = useLocation();
    const segments = pathname.split('/').filter(Boolean);
    const last = segments[segments.length - 1] || 'Overview';
    return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, ' ');
}

export default function AuthenticatedNavbar({ onToggleSidebar }) {
    const { user } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const pageName = usePageName();

    const fullName = user?.username || user?.email || 'User';

    return (
        <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-border-default bg-background-secondary px-4">
            {/* ── Left section ── */}
            <div className="flex items-center gap-3">
                {/* Burger icon */}
                <button
                    onClick={onToggleSidebar}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:bg-background-hover hover:text-text-primary transition-colors"
                    aria-label="Toggle sidebar"
                >
                    <Menu size={18} strokeWidth={2} />
                </button>

                <VerticalDivider />

                {/* Logo */}
                <div className="flex items-center gap-2 select-none">
                    <span className="text-body font-bold tracking-tight text-brand-text">
                        R<span className="text-text-primary">.</span>
                    </span>
                </div>

                <VerticalDivider />

                {/* Page name badge */}
                <PageBadge label={pageName} />
            </div>

            {/* ── Right section ── */}
            <div className="relative flex items-center gap-3">
                <VerticalDivider />

                <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="flex items-center gap-2 rounded-md px-1 py-1 hover:bg-background-hover transition-colors"
                >
                    <UserAvatar name={fullName} />
                    <span className="hidden sm:inline text-small-1 font-medium text-text-primary truncate max-w-[120px]">
                        {fullName}
                    </span>
                </button>

                {showDropdown && (
                    <UserDropdown
                        user={user}
                        onClose={() => setShowDropdown(false)}
                    />
                )}
            </div>
        </header>
    );
}
