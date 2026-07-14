import { CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PanelWrapper } from '@/components';
import { useTheme } from '@/context/ThemeProvider';
import { useScanDurationTrend } from '@/hooks';
import { CHART_COLOR_VARS } from '@/utils/constants';
import { resolveThemeColor } from '@/utils/themeColors';
import { ScansDashboardPanelEmpty, ScansDashboardPanelError, ScansDashboardPanelLoading } from '../components/ScansDashboardPanelState';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

function formatDuration(seconds) {
    const value = Number(seconds) || 0;
    if (value < 60) return `${value.toFixed(0)} sec`;
    return `${Math.floor(value / 60)} min ${Math.round(value % 60)} sec`;
}

export default function ScanDurationTrendPanel({ projectId }) {
    const { themeColors } = useTheme();
    const query = useScanDurationTrend(projectId);
    const series = query.data?.data?.series ?? [];
    const color = resolveThemeColor(themeColors, CHART_COLOR_VARS.SCANS_DURATION);

    return (
        <PanelWrapper title="Scan duration trend" description="Elapsed duration for the latest completed scan attempts." className="h-full">
            {query.isLoading ? <ScansDashboardPanelLoading /> : null}
            {query.isError ? <ScansDashboardPanelError message="Unable to load scan durations." /> : null}
            {!query.isLoading && !query.isError && series.length === 0 ? <ScansDashboardPanelEmpty message="No completed scan durations are available yet." /> : null}
            {!query.isLoading && !query.isError && series.length > 0 ? (
                <div className="relative min-h-56" role="img" aria-label="Scan duration over the latest scans">
                    <Line
                        data={{
                            labels: series.map((item) => String(item.scan_id).slice(0, 8)),
                            datasets: [{
                                label: 'Duration',
                                data: series.map((item) => item.duration_seconds),
                                borderColor: color,
                                backgroundColor: resolveThemeColor(themeColors, CHART_COLOR_VARS.SCANS_DURATION_FILL),
                                pointBackgroundColor: color,
                                borderWidth: 2,
                                pointRadius: 3,
                                tension: 0.3,
                                fill: true,
                            }],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                tooltip: { callbacks: { label: (context) => ` ${formatDuration(context.raw)}` } },
                            },
                            scales: {
                                x: { title: { display: true, text: 'Scans (oldest → newest)' }, grid: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID) }, ticks: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL) } },
                                y: { beginAtZero: true, title: { display: true, text: 'Duration' }, grid: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID) }, ticks: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL), callback: (value) => formatDuration(value) } },
                            },
                        }}
                    />
                </div>
            ) : null}
        </PanelWrapper>
    );
}
