import { PanelWrapper } from '@/components';
import { OverviewPanelEmpty, OverviewPanelError, OverviewPanelLoading } from '@/pages/client/overview/components/OverviewPanelState';
import { OVERVIEW_TOP_REFACTOR_FILE_COUNT, REFACTOR_DRIVER_DEFINITIONS } from '@/utils/constants';


function getComponentWeights(file) {
    return file?.metadata?.decision_analysis?.component_weights
        ?? file?.metrics?.decision_analysis?.component_weights
        ?? file?.component_weights
        ?? {};
}

function getAverageWeights(files) {
    const values = REFACTOR_DRIVER_DEFINITIONS.map((driver) => {
        const scores = files
            .map((file) => Number(getComponentWeights(file)[driver.key]))
            .filter((score) => Number.isFinite(score));

        return {
            ...driver,
            value: scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0,
        };
    });
    const total = values.reduce((sum, driver) => sum + driver.value, 0);

    return total > 0 ? values.map((driver) => ({ ...driver, percentage: (driver.value / total) * 100 })) : [];
}

export default function TopRefactorDriversPanel({ query }) {
    const files = (query.data?.data?.files ?? []).slice(0, OVERVIEW_TOP_REFACTOR_FILE_COUNT);
    const drivers = getAverageWeights(files);

    return (
        <PanelWrapper
            title="Top Refactor Drivers"
            description="The factors that contribute most to the refactor priority score for the highest-risk files."
            className="h-full"
        >
            {query.isLoading ? <OverviewPanelLoading /> : null}
            {query.isError ? <OverviewPanelError /> : null}
            {!query.isLoading && !query.isError && drivers.length === 0 ? (
                <OverviewPanelEmpty message="No refactor driver data is available for this scan." />
            ) : null}
            {!query.isLoading && !query.isError && drivers.length > 0 ? (
                <div className="flex min-h-[12rem] flex-col justify-center gap-5">
                    <div className="flex h-8 w-full overflow-hidden rounded bg-background-tertiary" aria-label="Refactor driver distribution">
                        {drivers.map((driver) => (
                            <div
                                key={driver.key}
                                className={`${driver.color} h-full transition-all`}
                                style={{ width: `${driver.percentage}%` }}
                                title={`${driver.label}: ${driver.percentage.toFixed(0)}%`}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {drivers.map((driver) => (
                            <div key={driver.key} className="flex items-start gap-2">
                                <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${driver.color}`} />
                                <div className="min-w-0">
                                    <p className="text-small-1 text-text-secondary">{driver.label}</p>
                                    <p className="text-body font-semibold text-text-primary">{driver.percentage.toFixed(0)}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-small-1 leading-relaxed text-text-tertiary">
                        These factors help explain why the highest-risk files need attention first.
                    </p>
                </div>
            ) : null}
        </PanelWrapper>
    );
}
