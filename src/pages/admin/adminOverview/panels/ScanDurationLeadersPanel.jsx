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
import { useAdminProjects } from '@/hooks';
import {
    AdminOverviewPanelEmpty,
    AdminOverviewPanelError,
    AdminOverviewPanelLoading,
} from '@/pages/admin/adminOverview/components/AdminOverviewPanelState';
import { getAdminOverviewErrorMessage } from '@/pages/admin/adminOverview/adminOverviewError';
import {
    ADMIN_OVERVIEW_TOP_PROJECT_LIMIT,
    ADMIN_PROJECT_SORT,
    CHART_COLOR_VARS,
    SORT_ORDER,
} from '@/utils/constants';
import {
    LIMIT_QUERY_KEY,
    SORT_BY_QUERY_KEY,
    SORT_ORDER_QUERY_KEY,
} from '@/utils/queryParams';
import { resolveThemeColor } from '@/utils/themeColors';


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SCAN_DURATION_PROJECTS_PARAMS = {
    [LIMIT_QUERY_KEY]: ADMIN_OVERVIEW_TOP_PROJECT_LIMIT,
    [SORT_BY_QUERY_KEY]: ADMIN_PROJECT_SORT.SCAN_DURATION,
    [SORT_ORDER_QUERY_KEY]: SORT_ORDER.DESCENDING,
};

function formatDuration(seconds) {
    const safeSeconds = Number(seconds) || 0;
    if (safeSeconds < 60) return `${safeSeconds.toFixed(0)} sec`;
    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = Math.round(safeSeconds % 60);
    return `${minutes} min ${remainingSeconds} sec`;
}

export default function ScanDurationLeadersPanel() {
    const { themeColors } = useTheme();
    const query = useAdminProjects(SCAN_DURATION_PROJECTS_PARAMS);
    const projects = (query.data?.data?.projects ?? []).filter((project) => (
        Number.isFinite(Number(project?.average_scan_duration_seconds))
        && project?.average_scan_duration_seconds !== null
    ));

    return (
        <PanelWrapper
            title="Scan Duration Leaders"
            description="Projects with the highest average elapsed scan duration."
            className="h-full"
        >
            {query.isLoading ? <AdminOverviewPanelLoading className="min-h-72" /> : null}
            {query.isError ? (
                <AdminOverviewPanelError
                    message={getAdminOverviewErrorMessage(query.error, 'Unable to load scan duration leaders.')}
                />
            ) : null}
            {!query.isLoading && !query.isError && projects.length === 0 ? (
                <AdminOverviewPanelEmpty message="No completed scan durations are available yet." />
            ) : null}
            {!query.isLoading && !query.isError && projects.length > 0 ? (
                <div className="relative min-h-72">
                    <Bar
                        aria-label="Top five projects by average scan duration"
                        role="img"
                        data={{
                            labels: projects.map((project) => project.name),
                            datasets: [{
                                label: 'Average duration',
                                data: projects.map((project) => Number(project.average_scan_duration_seconds)),
                                backgroundColor: resolveThemeColor(
                                    themeColors,
                                    CHART_COLOR_VARS.ADMIN_SCAN_DURATION,
                                ),
                                hoverBackgroundColor: resolveThemeColor(
                                    themeColors,
                                    CHART_COLOR_VARS.ADMIN_SCAN_DURATION_HOVER,
                                ),
                                borderRadius: 4,
                                barThickness: 22,
                            }],
                        }}
                        options={{
                            indexAxis: 'y',
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => ` Average duration: ${formatDuration(context.raw)}`,
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Average scan duration (seconds)',
                                        color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL_SECONDARY),
                                    },
                                    ticks: {
                                        color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL),
                                        callback: (value) => `${value}s`,
                                    },
                                    grid: {
                                        color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID),
                                    },
                                },
                                y: {
                                    ticks: {
                                        color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL_SECONDARY),
                                    },
                                    grid: { display: false },
                                },
                            },
                        }}
                    />
                </div>
            ) : null}
        </PanelWrapper>
    );
}
