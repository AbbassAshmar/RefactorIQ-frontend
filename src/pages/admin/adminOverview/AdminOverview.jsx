import AdminKpiCards from '@/pages/admin/adminOverview/panels/AdminKpiCards';
import FailedScansPanel from '@/pages/admin/adminOverview/panels/FailedScansPanel';
import ScanDurationLeadersPanel from '@/pages/admin/adminOverview/panels/ScanDurationLeadersPanel';
import ScansTimelinePanel from '@/pages/admin/adminOverview/panels/ScansTimelinePanel';
import ScanStatusDistributionPanel from '@/pages/admin/adminOverview/panels/ScanStatusDistributionPanel';
import TopActiveProjectsPanel from '@/pages/admin/adminOverview/panels/TopActiveProjectsPanel';


export default function AdminOverview() {
    return (
        <div className="p-2">
            <AdminKpiCards />

            <div className="mt-2 grid grid-cols-1 gap-2 xl:grid-cols-3">
                <ScansTimelinePanel />
                <ScanStatusDistributionPanel />
                <FailedScansPanel />
            </div>

            <div className="mt-2 grid grid-cols-1 gap-2 xl:grid-cols-2">
                <TopActiveProjectsPanel />
                <ScanDurationLeadersPanel />
            </div>
        </div>
    );
}
