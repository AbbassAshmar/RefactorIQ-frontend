import { CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PanelWrapper } from '@/components';
import { useTheme } from '@/context/ThemeProvider';
import { useScanRiskTrend } from '@/hooks';
import { CHART_COLOR_VARS } from '@/utils/constants';
import { resolveThemeColor } from '@/utils/themeColors';
import { ScansDashboardPanelEmpty, ScansDashboardPanelError, ScansDashboardPanelLoading } from '../components/ScansDashboardPanelState';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const shortId = (id) => String(id).slice(0, 8);
const formatDate = (value) => (value ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—');

export default function RiskScoreTrendPanel({ projectId }) {
    const { themeColors } = useTheme();
    const query = useScanRiskTrend(projectId);
    const series = query.data?.data?.series ?? [];
    const color = resolveThemeColor(themeColors, CHART_COLOR_VARS.RISK_TREND_SCORE);

    return (
        <PanelWrapper title="Risk score over scans" description="Average file risk score across the latest 20 successful scans." className="h-full">
            {query.isLoading ? <ScansDashboardPanelLoading /> : null}
            {query.isError ? <ScansDashboardPanelError message="Unable to load risk score trend." /> : null}
            {!query.isLoading && !query.isError && series.length === 0 ? <ScansDashboardPanelEmpty message="No successful scans have risk scores yet." /> : null}
            {!query.isLoading && !query.isError && series.length > 0 ? (
                <div className="relative min-h-56" role="img" aria-label="Risk score over the latest scans">
                    <Line
                        data={{
                            labels: series.map((item) => shortId(item.scan_id)),
                            datasets: [{
                                label: 'Average risk score',
                                data: series.map((item) => item.average_score),
                                borderColor: color,
                                backgroundColor: resolveThemeColor(themeColors, CHART_COLOR_VARS.RISK_TREND_SCORE_FILL),
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
                                legend: { display: false },
                                tooltip: { callbacks: { title: (items) => formatDate(series[items[0]?.dataIndex]?.finished_at) } },
                            },
                            scales: {
                                x: { title: { display: true, text: 'Scans (oldest → newest)' }, grid: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID) }, ticks: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL) } },
                                y: { beginAtZero: true, max: 100, title: { display: true, text: 'Risk score' }, grid: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID) }, ticks: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL) } },
                            },
                        }}
                    />
                </div>
            ) : null}
        </PanelWrapper>
    );
}
