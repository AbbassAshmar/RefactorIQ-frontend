/**
 * Application-wide constants.
 * Route paths, storage keys, etc.
 */

export const ROUTES = {
  HOME: '/home',
  LOGIN: '/login',
};

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
