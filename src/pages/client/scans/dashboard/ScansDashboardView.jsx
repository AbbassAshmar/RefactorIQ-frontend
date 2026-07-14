import { LoaderCircle } from 'lucide-react';
import { useSelectedProject } from '@/hooks';
import FilesAnalyzedTrendPanel from './panels/FilesAnalyzedTrendPanel';
import RiskDistributionTrendPanel from './panels/RiskDistributionTrendPanel';
import RiskScoreTrendPanel from './panels/RiskScoreTrendPanel';
import ScanDurationTrendPanel from './panels/ScanDurationTrendPanel';
import ScanKpiCards from './panels/ScanKpiCards';

export default function ScansDashboardView() {
    const { selectedProjectId, selectedProject, isLoading, projects } = useSelectedProject();

    if (isLoading) {
        return (
            <div className="flex min-h-[24rem] items-center justify-center gap-2 rounded border border-border bg-background-secondary text-body text-text-secondary">
                <LoaderCircle size={18} className="animate-spin" />
                Loading project dashboard…
            </div>
        );
    }

    if (!projects.length || !selectedProjectId) {
        return (
            <div className="flex min-h-[24rem] items-center justify-center rounded border border-border bg-background-secondary px-4 text-center text-body text-text-secondary">
                Connect a project to view scan analytics.
            </div>
        );
    }

    return (
        <div>
            <ScanKpiCards projectId={selectedProjectId} />
            <div className="mt-2 grid grid-cols-1 gap-2 xl:grid-cols-2">
                <RiskScoreTrendPanel projectId={selectedProjectId} />
                <RiskDistributionTrendPanel projectId={selectedProjectId} />
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 xl:grid-cols-2">
                <ScanDurationTrendPanel projectId={selectedProjectId} />
                <FilesAnalyzedTrendPanel projectId={selectedProjectId} />
            </div>
        </div>
    );
}
