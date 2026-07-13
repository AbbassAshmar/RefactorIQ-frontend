import {
    Activity,
    ArrowDown,
    ArrowUp,
    Folder,
    Minus,
    Search,
    Users,
} from 'lucide-react';
import { PanelWrapper } from '@/components';
import { useAdminKpis } from '@/hooks';
import {
    ADMIN_KPI_DEFINITIONS,
    ADMIN_KPI_KEYS,
} from '@/utils/constants';
import {
    AdminOverviewPanelError,
    AdminOverviewPanelLoading,
} from '@/pages/admin/adminOverview/components/AdminOverviewPanelState';
import { getAdminOverviewErrorMessage } from '@/pages/admin/adminOverview/adminOverviewError';


const KPI_ICONS = {
    [ADMIN_KPI_KEYS.USERS]: Users,
    [ADMIN_KPI_KEYS.SCANS]: Search,
    [ADMIN_KPI_KEYS.PROJECTS]: Folder,
    [ADMIN_KPI_KEYS.RUNNING_SCANS]: Activity,
};

function formatCount(value) {
    return Number.isFinite(value) ? value.toLocaleString() : '—';
}

function KpiTrend({ metric }) {
    if (!metric || !Number.isFinite(metric.delta)) {
        return <p className="text-small-1 text-text-tertiary">Comparison unavailable</p>;
    }

    const TrendIcon = metric.delta > 0 ? ArrowUp : metric.delta < 0 ? ArrowDown : Minus;
    const changeText = Number.isFinite(metric.delta_percent)
        ? `${metric.delta_percent > 0 ? '+' : ''}${metric.delta_percent.toFixed(1)}%`
        : `${metric.delta > 0 ? '+' : ''}${metric.delta.toLocaleString()}`;

    return (
        <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-small-1 font-medium text-info-text">
                <TrendIcon size={14} aria-hidden="true" />
                <span>{changeText} vs previous period</span>
            </div>
            <p className="text-small-1 text-text-tertiary">
                {formatCount(metric.current_period_count)} current · {formatCount(metric.previous_period_count)} previous
            </p>
        </div>
    );
}

export default function AdminKpiCards() {
    const query = useAdminKpis();
    const kpis = query.data?.data?.kpis ?? {};
    const periodDays = query.data?.data?.period?.days ?? 30;
    const errorMessage = getAdminOverviewErrorMessage(
        query.error,
        'Unable to load administrative KPIs.',
    );

    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {ADMIN_KPI_DEFINITIONS.map((definition) => {
                const Icon = KPI_ICONS[definition.key];
                const metric = kpis[definition.key];

                return (
                    <PanelWrapper
                        key={definition.key}
                        title={definition.label}
                        subtitle={`${periodDays}-day comparison`}
                        description={definition.description}
                        className="h-full"
                    >
                        {query.isLoading ? <AdminOverviewPanelLoading className="min-h-24" /> : null}
                        {query.isError ? <AdminOverviewPanelError message={errorMessage} /> : null}
                        {!query.isLoading && !query.isError ? (
                            <div className="flex min-h-24 items-center justify-between gap-4">
                                <div className="min-w-0 space-y-3">
                                    <p className="text-h3 font-bold leading-none text-text-primary">
                                        {formatCount(metric?.total)}
                                    </p>
                                    <KpiTrend metric={metric} />
                                </div>
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-info-border bg-info-bg text-info-text">
                                    <Icon size={22} aria-hidden="true" />
                                </div>
                            </div>
                        ) : null}
                    </PanelWrapper>
                );
            })}
        </div>
    );
}
