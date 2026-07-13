import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { PanelWrapper } from '@/components';
import { useTheme } from '@/context/ThemeProvider';
import { useAdminScanStatusDistribution } from '@/hooks';
import {
    AdminOverviewPanelEmpty,
    AdminOverviewPanelError,
    AdminOverviewPanelLoading,
} from '@/pages/admin/adminOverview/components/AdminOverviewPanelState';
import { getAdminOverviewErrorMessage } from '@/pages/admin/adminOverview/adminOverviewError';
import {
    CHART_COLOR_VARS,
    SCAN_STATUS_LABELS,
} from '@/utils/constants';
import { resolveThemeColor } from '@/utils/themeColors';


ChartJS.register(ArcElement, Tooltip, Legend);

function getStatusLabel(status) {
    return SCAN_STATUS_LABELS[status] ?? 'Unknown';
}

export default function ScanStatusDistributionPanel() {
    const { themeColors } = useTheme();
    const query = useAdminScanStatusDistribution();
    const statuses = query.data?.data?.statuses ?? [];
    const total = statuses.reduce((sum, item) => sum + (Number(item?.count) || 0), 0);

    return (
        <PanelWrapper
            title="Scan status distribution"
            description="Current distribution of every scan status across the platform."
            className="h-full"
        >
            {query.isLoading ? <AdminOverviewPanelLoading className="min-h-64" /> : null}
            {query.isError ? (
                <AdminOverviewPanelError
                    message={getAdminOverviewErrorMessage(query.error, 'Unable to load scan statuses.')}
                />
            ) : null}
            {!query.isLoading && !query.isError && total === 0 ? (
                <AdminOverviewPanelEmpty message="No scans are available to summarize." />
            ) : null}
            {!query.isLoading && !query.isError && total > 0 ? (
                <div className="flex min-h-64 flex-col items-center justify-center gap-2">
                    <p className="text-small-1 text-text-secondary">
                        <span className="font-semibold text-text-primary">{total.toLocaleString()}</span> total scans
                    </p>
                    <div className="relative h-56 w-full">
                        <Doughnut
                            aria-label="Distribution of scans by status"
                            role="img"
                            data={{
                                labels: statuses.map((item) => getStatusLabel(item.status)),
                                datasets: [{
                                    data: statuses.map((item) => Number(item.count) || 0),
                                    backgroundColor: statuses.map((item) => resolveThemeColor(
                                        themeColors,
                                        CHART_COLOR_VARS.ADMIN_SCAN_STATUS[item.status]
                                            ?? CHART_COLOR_VARS.AXIS_LABEL,
                                    )),
                                    borderColor: resolveThemeColor(themeColors, CHART_COLOR_VARS.GRID),
                                    borderWidth: 1,
                                    hoverOffset: 4,
                                }],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                cutout: '62%',
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            color: resolveThemeColor(themeColors, CHART_COLOR_VARS.AXIS_LABEL_SECONDARY),
                                            boxWidth: 10,
                                            boxHeight: 10,
                                            padding: 12,
                                            font: { size: 10 },
                                        },
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => ` ${context.label}: ${context.raw}`,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            ) : null}
        </PanelWrapper>
    );
}
