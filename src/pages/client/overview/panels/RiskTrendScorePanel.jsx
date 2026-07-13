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
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { PanelWrapper } from '@/components';
import { useTheme } from '@/context/ThemeProvider';
import { useRiskTrend } from '@/hooks';
import { OverviewPanelEmpty, OverviewPanelError, OverviewPanelLoading } from '@/pages/client/overview/components/OverviewPanelState';
import { CHART_COLOR_VARS } from '@/utils/constants';
import { resolveThemeColor } from '@/utils/themeColors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

function formatTimestampLabel(timestamp) {
    if (!timestamp) return '—';
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(timestamp));
}

export default function RiskTrendScorePanel({ scanId }) {
    const { themeColors } = useTheme();
    const query = useRiskTrend(scanId);
    const series = query.data?.data?.series ?? [];
    const latest = series.at(-1)?.average_score ?? 0;
    const previous = series.at(-2)?.average_score;
    const delta = previous === undefined ? 0 : latest - previous;
    const isUp = delta >= 0;
    const percentChange = previous === undefined || previous === 0 ? 0 : (Math.abs(delta) / previous) * 100;

    return (
        <PanelWrapper
            title="Risk Trend Score"
            description="Average refactor risk across the selected scan and the three successful scans before it."
            className="h-full"
        >
            {query.isLoading ? <OverviewPanelLoading /> : null}
            {query.isError ? <OverviewPanelError /> : null}
            {!query.isLoading && !query.isError && series.length === 0 ? <OverviewPanelEmpty /> : null}
            {!query.isLoading && !query.isError && series.length > 0 ? (
                <div className="flex h-full flex-col gap-2">
                    <div className="flex items-end gap-2">
                        <p className="text-h4 font-bold leading-none text-text-primary">{latest.toFixed(1)}</p>
                        <div className={`mb-0.5 inline-flex items-center gap-1 text-small-1 ${isUp ? 'text-error' : 'text-success'}`}>
                            {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            <span>{isUp ? '+' : '-'}{percentChange.toFixed(1)}%</span>
                        </div>
                    </div>
                    <div className="relative min-h-40 flex-1">
                        <Line
                            data={{
                                labels: series.map((item) => formatTimestampLabel(item.finished_at)),
                                datasets: [{
                                    data: series.map((item) => item.average_score),
                                    borderColor: resolveThemeColor(themeColors, CHART_COLOR_VARS.RISK_TREND_SCORE),
                                    backgroundColor: resolveThemeColor(themeColors, CHART_COLOR_VARS.RISK_TREND_SCORE_FILL),
                                    borderWidth: 2,
                                    pointRadius: 3,
                                    pointHoverRadius: 4,
                                    pointBackgroundColor: resolveThemeColor(themeColors, CHART_COLOR_VARS.RISK_TREND_SCORE),
                                    tension: 0.35,
                                    fill: true,
                                }],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    x: { grid: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID) }, ticks: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL), font: { size: 10 } } },
                                    y: { beginAtZero: true, max: 100, grid: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID) }, ticks: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL), font: { size: 10 } } },
                                },
                            }}
                        />
                    </div>
                </div>
            ) : null}
        </PanelWrapper>
    );
}
