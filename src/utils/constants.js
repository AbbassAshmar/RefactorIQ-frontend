/**
 * Application-wide constants.
 * Route paths, storage keys, etc.
 */

export const ROUTES = {
  HOME: '/home',
  LOGIN: '/login',
};

export const ADMIN_ANALYTICS_ENDPOINTS = {
  KPIS: '/admin/analytics/kpis',
  SCANS_OVER_TIME: '/admin/analytics/scans-over-time',
  SCAN_STATUS_DISTRIBUTION: '/admin/analytics/scan-status-distribution',
  FAILED_SCANS: '/admin/analytics/failed-scans',
};

export const ADMIN_PROJECTS_ENDPOINT = '/admin/projects';

export const SCAN_ENDPOINTS = {
  LIST: '/scans',
  OVER_TIME: '/scans-over-time',
  ADMIN_LIST: '/admin/scans',
};

export const ADMIN_OVERVIEW_QUERY_KEYS = {
  ROOT: 'admin-overview',
  KPIS: 'kpis',
  SCANS_OVER_TIME: 'scans-over-time',
  SCAN_STATUS_DISTRIBUTION: 'scan-status-distribution',
  FAILED_SCANS: 'failed-scans',
  PROJECTS: 'projects',
  ADMIN_SCANS: 'admin-scans',
};

export const SCANS_QUERY_KEYS = {
  ROOT: 'scans',
  LIST: 'list',
  OVER_TIME: 'over-time',
};

export const ADMIN_OVERVIEW_TOP_PROJECT_LIMIT = 5;

export const ADMIN_PROJECT_SORT = {
  NAME: 'name',
  SCAN_COUNT: 'scan_count',
  SCAN_DURATION: 'scan_duration',
};

export const SCAN_SORT = {
  DATE_ASCENDING: 'date_asc',
  DATE_DESCENDING: 'date_desc',
};

export const SCAN_PAGE_TABS = {
  RECORDS: 'records',
};

export const SCAN_TABLE_PAGE_SIZE = 10;
export const ADMIN_PROJECT_SELECTOR_PAGE_SIZE = 8;

export const SORT_ORDER = {
  ASCENDING: 'asc',
  DESCENDING: 'desc',
};

export const SCAN_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

export const SCAN_STATUS_LABELS = {
  [SCAN_STATUS.PENDING]: 'Pending',
  [SCAN_STATUS.RUNNING]: 'Running',
  [SCAN_STATUS.SUCCEEDED]: 'Succeeded',
  [SCAN_STATUS.FAILED]: 'Failed',
  [SCAN_STATUS.CANCELLED]: 'Cancelled',
};

export const ADMIN_KPI_KEYS = {
  USERS: 'users',
  SCANS: 'scans',
  PROJECTS: 'projects',
  RUNNING_SCANS: 'running_scans',
};

export const ADMIN_KPI_DEFINITIONS = [
  {
    key: ADMIN_KPI_KEYS.USERS,
    label: 'Users',
    description: 'All registered platform users.',
  },
  {
    key: ADMIN_KPI_KEYS.SCANS,
    label: 'Scans',
    description: 'All scans created across the platform.',
  },
  {
    key: ADMIN_KPI_KEYS.PROJECTS,
    label: 'Projects',
    description: 'All projects connected by platform users.',
  },
  {
    key: ADMIN_KPI_KEYS.RUNNING_SCANS,
    label: 'Running scans',
    description: 'Scans that are currently in progress.',
  },
];

export const STORAGE_KEYS = {
  THEME_MODE: 'theme-mode',
};

export const CHART_COLOR_VARS = {
  GRID: 'var(--border-default)',
  AXIS_LABEL: 'var(--text-tertiary)',
  AXIS_LABEL_SECONDARY: 'var(--text-secondary)',
  RISK_BY_DIRECTORY: 'var(--chart-risk-by-directory)',
  RISK_TREND_SCORE: 'var(--chart-risk-trend-score)',
  RISK_TREND_SCORE_FILL: 'var(--chart-risk-trend-score-fill)',
  ADMIN_SCANS_TIMELINE: 'var(--chart-admin-scans-timeline)',
  ADMIN_SCANS_TIMELINE_FILL: 'var(--chart-admin-scans-timeline-fill)',
  ADMIN_SCAN_DURATION: 'var(--chart-admin-scan-duration)',
  ADMIN_SCAN_DURATION_HOVER: 'var(--chart-admin-scan-duration-hover)',
  ADMIN_SCAN_STATUS: {
    [SCAN_STATUS.PENDING]: 'var(--chart-admin-status-pending)',
    [SCAN_STATUS.RUNNING]: 'var(--chart-admin-status-running)',
    [SCAN_STATUS.SUCCEEDED]: 'var(--chart-admin-status-succeeded)',
    [SCAN_STATUS.FAILED]: 'var(--chart-admin-status-failed)',
    [SCAN_STATUS.CANCELLED]: 'var(--chart-admin-status-cancelled)',
  },
  TOP_ARCHITECTURES: [
    'var(--chart-top-architectures-bar-1)',
    'var(--chart-top-architectures-bar-2)',
    'var(--chart-top-architectures-bar-3)',
    'var(--chart-top-architectures-bar-4)',
  ],
};

export const OVERVIEW_TOP_REFACTOR_FILE_COUNT = 5;

export const REFACTOR_DRIVER_DEFINITIONS = [
  { key: 'complexity_score', label: 'Maintenance complexity', color: 'bg-error' },
  { key: 'architecture_score', label: 'System impact', color: 'bg-warning' },
  { key: 'history_score', label: 'Change activity', color: 'bg-accent-mauve' },
  { key: 'duplication_score', label: 'Repeated code', color: 'bg-success' },
];

export const INSIGHT_PRIORITY_STYLES = {
  high: 'border-error-border bg-error-bg text-error-text',
  medium: 'border-warning-border bg-warning-bg text-warning-text',
  low: 'border-success-border bg-success-bg text-success-text',
};
