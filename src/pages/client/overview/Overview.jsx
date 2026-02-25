import { useSearchParams } from 'react-router-dom';
import LatestScanSummaryPanel from '@/pages/client/overview/panels/LatestScanSummaryPanel';
import RiskTrendScorePanel from '@/pages/client/overview/panels/RiskTrendScorePanel';

export default function ClientOverview() {
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get('project_id') ?? 'proj_4f92c1e8';

    return (
        <div className="p-3">
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
                <div className="xl:col-span-1">
                    <RiskTrendScorePanel projectId={projectId} />
                </div>
                <div className="xl:col-span-2">
                    <LatestScanSummaryPanel projectId={projectId} />
                </div>
            </div>
        </div>
    );
}
