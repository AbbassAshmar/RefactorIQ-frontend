import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PanelWrapper } from '@/components';
import { useTheme } from '@/context/ThemeProvider';
import { CHART_COLOR_VARS } from '@/utils/constants';
import { resolveThemeColor } from '@/utils/themeColors';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

function formatDay(value) {
    if (!value) return '—';
    return new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric',
    }).format(new Date(`${value}T00:00:00`));
}

function getErrorMessage(error) {
    return error?.response?.data?.error?.message || 'Unable to load scan activity.';
}

export default function ScansTimelinePanel({
    query,
    title = 'Scans timeline',
    subtitle = 'Last 14 days',
    description = 'Daily scan volume based on scan creation time.',
    emptyMessage = 'No scans were created in the last 14 days.',
}) {
    const { themeColors } = useTheme();
    const points = query.data?.data?.points ?? [];
    const hasActivity = points.some((point) => Number(point?.count) > 0);
    const lineColor = resolveThemeColor(themeColors, CHART_COLOR_VARS.ADMIN_SCANS_TIMELINE);

    return (
        <PanelWrapper
            title={title}
            subtitle={subtitle}
            description={description}
            className="h-full"
        >
            {query.isLoading ? (
                <div
                    className="min-h-64 animate-pulse rounded bg-background-tertiary"
                    role="status"
                    aria-label="Loading scan timeline"
                />
            ) : null}
            {query.isError ? (
                <div className="flex min-h-32 items-center justify-center rounded border border-error-border bg-error-bg px-4 py-6 text-center text-small-1 text-error-text">
                    {getErrorMessage(query.error)}
                </div>
            ) : null}
            {!query.isLoading && !query.isError && !hasActivity ? (
                <div className="flex min-h-32 items-center justify-center px-4 py-6 text-center text-small-1 text-text-tertiary">
                    {emptyMessage}
                </div>
            ) : null}
            {!query.isLoading && !query.isError && hasActivity ? (
                <div className="relative min-h-64">
                    <Line
                        aria-label="Daily scan count for the last 14 days"
                        role="img"
                        data={{
                            labels: points.map((point) => formatDay(point.date)),
                            datasets: [{
                                label: 'Scans',
                                data: points.map((point) => Number(point.count) || 0),
                                borderColor: lineColor,
                                backgroundColor: resolveThemeColor(
                                    themeColors,
                                    CHART_COLOR_VARS.ADMIN_SCANS_TIMELINE_FILL,
                                ),
                                pointBackgroundColor: lineColor,
                                pointHoverBackgroundColor: lineColor,
                                borderWidth: 2,
                                pointRadius: 2,
                                pointHoverRadius: 4,
                                tension: 0.3,
                                fill: true,
                            }],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => ` Scans: ${context.raw}`,
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    grid: { display: false },
                                    ticks: {
                                        color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL),
                                        autoSkip: true,
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
