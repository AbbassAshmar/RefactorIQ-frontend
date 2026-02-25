import {
    Home,
    Code,
    Network,
    ScanSearch,
    LayoutDashboard,
    Repeat2,
    History,
    FolderKanban,
    Users,
    Server,
    GitBranch,
} from 'lucide-react';

/**
 * Sidebar navigation configuration.
 *
 * Each section has:
 *   - key:      unique identifier
 *   - title:    display label
 *   - icon:     lucide-react icon component
 *   - pages:    array of { key, label, path, icon }
 *
 * Paths are relative to the role prefix (/dashboard or /admin/dashboard).
 * The layout will prepend the correct base path.
 */

export const CLIENT_NAV_SECTIONS = [
    {
        key: 'home',
        title: 'Home',
        icon: Home,
        pages: [
            { key: 'overview', label: 'Overview', path: '/overview'},
        ],
    },
    {
        key: 'code',
        title: 'Code',
        icon: Code,
        pages: [
            { key: 'repo-explorer', label: 'Repository Explorer', path: '/code/repo-explorer'},
        ],
    },
    {
        key: 'architecture',
        title: 'Architecture',
        icon: Network,
        pages: [
            { key: 'dependencies', label: 'Dependencies', path: '/architecture/dependencies' },
        ],
    },
    {
        key: 'scans',
        title: 'Scans',
        icon: ScanSearch,
        pages: [
            { key: 'scans-list', label: 'Scans List', path: '/scans/list' },
            { key: 'scans-dashboard', label: 'Scans Dashboard', path: '/scans/dashboard' },
        ],
    },
    {
        key: 'refactoring',
        title: 'Refactoring',
        icon: Repeat2,
        pages: [
            { key: 'refactor-queue', label: 'Refactor Queue', path: '/refactoring/queue' },
            { key: 'refactor-suggestions', label: 'Refactor Suggestions', path: '/refactoring/suggestions' },
        ],
    },
    {
        key: 'history',
        title: 'History',
        icon: History,
        pages: [
            { key: 'commit-history', label: 'Commit History', path: '/history/commits' },
            { key: 'file-evolution', label: 'File Evolution', path: '/history/file-evolution' },
        ],
    },
    {
        key: 'dashboard',
        title: 'Dashboard',
        icon: LayoutDashboard,
        pages: [
            { key: 'analytics', label: 'Analytics', path: '/dashboard/analytics' },
        ],
    },
    {
        key: 'projects-secondary',
        title: 'Projects',
        icon: FolderKanban,
        pages: [
            { key: 'projects', label: 'Projects', path: '/projects' },
        ],
    },
];

export const ADMIN_NAV_SECTIONS = [
    {
        key: 'home',
        title: 'Home',
        icon: Home,
        pages: [
            { key: 'overview', label: 'Overview', path: '/overview'},
        ],
    },
    {
        key: 'users',
        title: 'Users',
        icon: Users,
        pages: [
            { key: 'users-overview', label: 'Overview', path: '/users/overview'},
            { key: 'users-list', label: 'List', path: '/users/list'},
        ],
    },
    {
        key: 'scans',
        title: 'Scans',
        icon: ScanSearch,
        pages: [
            { key: 'scans-overview', label: 'Overview', path: '/scans/overview'},
            { key: 'scans-list', label: 'List', path: '/scans/list'},
        ],
    },
    {
        key: 'repos',
        title: 'Repos',
        icon: Server,
        pages: [
            { key: 'repos-overview', label: 'Overview', path: '/repos/overview'},
            { key: 'repos-list', label: 'List', path: '/repos/list'},
        ],
    },
];
