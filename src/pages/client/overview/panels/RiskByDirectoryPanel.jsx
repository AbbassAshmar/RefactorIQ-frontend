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
import { OverviewPanelEmpty, OverviewPanelError, OverviewPanelLoading } from '@/pages/client/overview/components/OverviewPanelState';
import { CHART_COLOR_VARS } from '@/utils/constants';
import { resolveThemeColor } from '@/utils/themeColors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function RiskByDirectoryPanel({ query }) {
    const { themeColors } = useTheme();
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
                                backgroundColor: resolveThemeColor(themeColors, CHART_COLOR_VARS.RISK_BY_DIRECTORY),
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
                                x: { beginAtZero: true, ticks: { precision: 0, color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL) }, grid: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID) } },
                                y: { ticks: { color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL_SECONDARY) }, grid: { display: false } },
                            },
                        }}
                    />
                </div>
            ) : null}
        </PanelWrapper>
    );
}
