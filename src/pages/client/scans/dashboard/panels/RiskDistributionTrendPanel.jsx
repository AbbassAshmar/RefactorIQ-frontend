import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PanelWrapper } from '@/components';
import { useTheme } from '@/context/ThemeProvider';
import { useScanPriorityDistribution } from '@/hooks';
import { CHART_COLOR_VARS } from '@/utils/constants';
import { resolveThemeColor } from '@/utils/themeColors';
import { ScansDashboardPanelEmpty, ScansDashboardPanelError, ScansDashboardPanelLoading } from '../components/ScansDashboardPanelState';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BANDS = ['critical', 'high', 'medium', 'low'];
const labels = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };

export default function RiskDistributionTrendPanel({ projectId }) {
    const { themeColors } = useTheme();
    const query = useScanPriorityDistribution(projectId);
    const series = query.data?.data?.series ?? [];

    return (
        <PanelWrapper title="Risk distribution over time" description="Priority-band file counts across the latest 20 successful scans." className="h-full">
            {query.isLoading ? <ScansDashboardPanelLoading /> : null}
            {query.isError ? <ScansDashboardPanelError message="Unable to load risk distribution." /> : null}
            {!query.isLoading && !query.isError && series.length === 0 ? <ScansDashboardPanelEmpty message="No successful scan file data is available yet." /> : null}
            {!query.isLoading && !query.isError && series.length > 0 ? (
                <div className="relative min-h-56" role="img" aria-label="Risk distribution over the latest scans">
                    <Bar
                        data={{
                            labels: series.map((item) => String(item.scan_id).slice(0, 8)),
                            datasets: BANDS.map((band) => ({
                                label: labels[band],
                                data: series.map((item) => item.priority_counts?.[band] ?? 0),
                                backgroundColor: resolveThemeColor(themeColors, CHART_COLOR_VARS.SCANS_PRIORITY[band]),
                                borderWidth: 0,
                            })),
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: { stacked: true, title: { display: true, text: 'Scans (oldest → newest)' }, grid: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID) }, ticks: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL) } },
                                y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Files' }, grid: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID) }, ticks: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL) } },
                            },
                        }}
                    />
                </div>
            ) : null}
        </PanelWrapper>
    );
}
