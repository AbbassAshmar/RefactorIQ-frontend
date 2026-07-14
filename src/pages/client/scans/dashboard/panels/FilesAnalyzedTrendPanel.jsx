import { CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PanelWrapper } from '@/components';
import { useTheme } from '@/context/ThemeProvider';
import { useFilesAnalyzedTrend } from '@/hooks';
import { CHART_COLOR_VARS } from '@/utils/constants';
import { resolveThemeColor } from '@/utils/themeColors';
import { ScansDashboardPanelEmpty, ScansDashboardPanelError, ScansDashboardPanelLoading } from '../components/ScansDashboardPanelState';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function FilesAnalyzedTrendPanel({ projectId }) {
    const { themeColors } = useTheme();
    const query = useFilesAnalyzedTrend(projectId);
    const series = query.data?.data?.series ?? [];
    const color = resolveThemeColor(themeColors, CHART_COLOR_VARS.SCANS_FILES_ANALYZED);

    return (
        <PanelWrapper title="Files analyzed over time" description="File counts across the latest 20 successful scans." className="h-full">
            {query.isLoading ? <ScansDashboardPanelLoading /> : null}
            {query.isError ? <ScansDashboardPanelError message="Unable to load files analyzed." /> : null}
            {!query.isLoading && !query.isError && series.length === 0 ? <ScansDashboardPanelEmpty message="No successful scan file counts are available yet." /> : null}
            {!query.isLoading && !query.isError && series.length > 0 ? (
                <div className="relative min-h-56" role="img" aria-label="Files analyzed over the latest scans">
                    <Line
                        data={{
                            labels: series.map((item) => String(item.scan_id).slice(0, 8)),
                            datasets: [{
                                label: 'Files analyzed',
                                data: series.map((item) => item.files_analyzed),
                                borderColor: color,
                                backgroundColor: resolveThemeColor(themeColors, CHART_COLOR_VARS.SCANS_FILES_ANALYZED_FILL),
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
                            plugins: { legend: { display: false } },
                            scales: {
                                x: { title: { display: true, text: 'Scans (oldest → newest)' }, grid: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID) }, ticks: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL) } },
                                y: { beginAtZero: true, title: { display: true, text: 'Files' }, grid: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID) }, ticks: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL), precision: 0 } },
                            },
                        }}
                    />
                </div>
            ) : null}
        </PanelWrapper>
    );
}
