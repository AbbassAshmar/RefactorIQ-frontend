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
import { OverviewPanelEmpty, OverviewPanelError, OverviewPanelLoading } from '@/pages/client/overview/components/OverviewPanelState';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function RiskByDirectoryPanel({ query }) {
    const directories = query.data?.data?.directories ?? [];

    return (
        <PanelWrapper
            title="Risk by directory"
            description="Directories with the highest concentration of risky files in the selected scan."
            className="h-full"
        >
            {query.isLoading ? <OverviewPanelLoading /> : null}
            {query.isError ? <OverviewPanelError /> : null}
            {!query.isLoading && !query.isError && directories.length === 0 ? <OverviewPanelEmpty message="No directory risk data is available for this scan." /> : null}
            {!query.isLoading && !query.isError && directories.length > 0 ? (
                <div className="relative min-h-[20rem]">
                    <Bar
                        data={{
                            labels: directories.map((item) => item.directory),
                            datasets: [{
                                label: 'Risky files',
                                data: directories.map((item) => item.risky_file_count),
                                backgroundColor: 'var(--brand-primary)',
                                borderRadius: 5,
                                barThickness: 22,
                            }],
                        }}
                        options={{
                            indexAxis: 'y',
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: { callbacks: { label: (context) => ` Risky files: ${context.raw}` } },
                            },
                            scales: {
                                x: { beginAtZero: true, ticks: { precision: 0, color: 'var(--text-tertiary)' }, grid: { color: 'var(--border-default)' } },
                                y: { ticks: { color: 'var(--text-secondary)' }, grid: { display: false } },
                            },
                        }}
                    />
                </div>
            ) : null}
        </PanelWrapper>
    );
}
