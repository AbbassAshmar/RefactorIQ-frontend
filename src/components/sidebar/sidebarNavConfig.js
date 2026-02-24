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
            { key: 'overview', label: 'Overview', path: '/overview', icon: Home },
        ],
    },
    {
        key: 'code',
        title: 'Code',
        icon: Code,
        pages: [
            { key: 'repo-explorer', label: 'Repository Explorer', path: '/code/repo-explorer', icon: Code },
        ],
    },
    {
        key: 'architecture',
        title: 'Architecture',
        icon: Network,
        pages: [
            { key: 'dependencies', label: 'Dependencies', path: '/architecture/dependencies', icon: Network },
        ],
    },
    {
        key: 'scans',
        title: 'Scans',
        icon: ScanSearch,
        pages: [
            { key: 'scans-list', label: 'Scans List', path: '/scans/list', icon: ScanSearch },
            { key: 'scans-dashboard', label: 'Scans Dashboard', path: '/scans/dashboard', icon: LayoutDashboard },
        ],
    },
    {
        key: 'refactoring',
        title: 'Refactoring',
        icon: Repeat2,
        pages: [
            { key: 'refactor-queue', label: 'Refactor Queue', path: '/refactoring/queue', icon: FolderKanban },
            { key: 'refactor-suggestions', label: 'Refactor Suggestions', path: '/refactoring/suggestions', icon: Repeat2 },
        ],
    },
    {
        key: 'history',
        title: 'History',
        icon: History,
        pages: [
            { key: 'commit-history', label: 'Commit History', path: '/history/commits', icon: History },
            { key: 'file-evolution', label: 'File Evolution', path: '/history/file-evolution', icon: GitBranch },
        ],
    },
    {
        key: 'dashboard',
        title: 'Dashboard',
        icon: LayoutDashboard,
        pages: [
            { key: 'analytics', label: 'Analytics', path: '/dashboard/analytics', icon: LayoutDashboard },
        ],
    },
    {
        key: 'projects-secondary',
        title: 'Projects',
        icon: FolderKanban,
        pages: [
            { key: 'projects', label: 'Projects', path: '/projects', icon: FolderKanban },
        ],
    },
];

export const ADMIN_NAV_SECTIONS = [
    {
        key: 'home',
        title: 'Home',
        icon: Home,
        pages: [
            { key: 'overview', label: 'Overview', path: '/overview', icon: Home },
        ],
    },
    {
        key: 'users',
        title: 'Users',
        icon: Users,
        pages: [
            { key: 'users-overview', label: 'Overview', path: '/users/overview', icon: Users },
            { key: 'users-list', label: 'List', path: '/users/list', icon: Users },
        ],
    },
    {
        key: 'scans',
        title: 'Scans',
        icon: ScanSearch,
        pages: [
            { key: 'scans-overview', label: 'Overview', path: '/scans/overview', icon: ScanSearch },
            { key: 'scans-list', label: 'List', path: '/scans/list', icon: ScanSearch },
        ],
    },
    {
        key: 'repos',
        title: 'Repos',
        icon: Server,
        pages: [
            { key: 'repos-overview', label: 'Overview', path: '/repos/overview', icon: Server },
            { key: 'repos-list', label: 'List', path: '/repos/list', icon: Server },
        ],
    },
];
