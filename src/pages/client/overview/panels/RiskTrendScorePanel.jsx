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
import { riskTrendResponse } from '@/pages/client/overview/dummy/riskTrendResponse';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

function formatTimestampLabel(ts) {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

export default function RiskTrendScorePanel() {
    const series = riskTrendResponse?.data?.series?.slice(-3) ?? [];
    const latest = series.at(-1)?.risk_score ?? 0;
    const previous = series.at(-2)?.risk_score ?? 0;
    const delta = latest - previous;
    const isUp = delta >= 0;
    const percentChange = previous === 0 ? 0 : (Math.abs(delta) / previous) * 100;

    const chartData = {
        labels: series.map((item) => formatTimestampLabel(item.ts)),
        datasets: [
            {
                data: series.map((item) => item.risk_score),
                borderColor: 'var(--info-default)',
                backgroundColor: 'hsla(201, 80%, 50%, 0.14)',
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 4,
                pointBackgroundColor: 'var(--info-default)',
                tension: 0.35,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                grid: { color: 'var(--border-default)' },
                ticks: { color: 'var(--text-tertiary)', font: { size: 10 } },
            },
            y: {
                beginAtZero: true,
                grid: { color: 'var(--border-default)' },
                ticks: { color: 'var(--text-tertiary)', font: { size: 10 } },
            },
        },
    };

    return (
        <PanelWrapper
            title="Risk Trend Score"
            description="Shows risk score changes of the repository"
            className="h-full"
        >
            <div className="flex h-full flex-col gap-2">
                <div className="flex items-end gap-2">
                    <p className="text-h4 leading-none font-bold text-text-primary">{latest}</p>
                    <div className={`mb-0.5 inline-flex items-center gap-1 text-small-1 ${isUp ? 'text-error-default' : 'text-success-default'}`}>
                        {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        <span>{isUp ? '+' : '-'}{percentChange.toFixed(1)}%</span>
                    </div>
                </div>
                <div className="relative min-h-40 flex-1">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </PanelWrapper>
    );
}
