import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PanelWrapper } from '@/components';
import { useTheme } from '@/context/ThemeProvider';
import { CHART_COLOR_VARS } from '@/utils/constants';
import { resolveThemeColor } from '@/utils/themeColors';


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function formatMonth(value) {
    if (!value) return '—';
    return new Intl.DateTimeFormat(undefined, {
        month: 'short',
        year: 'numeric',
    }).format(new Date(`${value}T00:00:00`));
}

function getErrorMessage(error) {
    return error?.response?.data?.error?.message || 'Unable to load user activity.';
}

export default function UsersTimelinePanel({ query }) {
    const { themeColors } = useTheme();
    const points = query.data?.data?.points ?? [];
    const barColor = resolveThemeColor(themeColors, CHART_COLOR_VARS.ADMIN_SCANS_TIMELINE);

    return (
        <PanelWrapper
            title="Users over time"
            subtitle="Last 15 months"
            description="Monthly count of users created on the platform."
        >
            {query.isLoading ? (
                <div
                    className="min-h-64 animate-pulse rounded bg-background-tertiary"
                    role="status"
                    aria-label="Loading users timeline"
                />
            ) : null}
            {query.isError ? (
                <div className="flex min-h-32 items-center justify-center rounded border border-error-border bg-error-bg px-4 py-6 text-center text-small-1 text-error-text">
                    {getErrorMessage(query.error)}
                </div>
            ) : null}
            {!query.isLoading && !query.isError ? (
                <div className="relative min-h-64">
                    <Bar
                        aria-label="User count for the last 15 months"
                        role="img"
                        data={{
                            labels: points.map((point) => formatMonth(point.date)),
                            datasets: [{
                                label: 'Users',
                                data: points.map((point) => Number(point.count) || 0),
                                backgroundColor: barColor,
                                borderRadius: 2,
                                maxBarThickness: 36,
                            }],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => ` Users: ${context.raw}`,
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    grid: { display: false },
                                    ticks: {
                                        color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL),
                                        autoSkip: false,
                                        maxRotation: 0,
                                        font: { size: 10 },
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        precision: 0,
                                        color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL),
                                    },
                                    grid: {
                                        color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID),
                                    },
                                },
                            },
                        }}
                    />
                </div>
            ) : null}
        </PanelWrapper>
    );
}
