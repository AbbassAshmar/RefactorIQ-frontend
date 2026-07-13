import { useSearchParams } from 'react-router-dom';
import SecurityCenterTabBar from '@/components/common/SecurityCenterTabBar';
import { AdminProjectModalLauncher } from '@/components/projects';
import AdminScansTable from '@/pages/admin/adminScans/AdminScansTable';
import AdminScansTimelinePanel from '@/pages/admin/adminScans/AdminScansTimelinePanel';
import { SCAN_PAGE_TABS } from '@/utils/constants';
import {
    PROJECT_QUERY_KEY,
    TAB_VIEW_QUERY_KEY,
} from '@/utils/queryParams';


export default function AdminScans() {
    const [searchParams] = useSearchParams();
    const activeView = searchParams.get(TAB_VIEW_QUERY_KEY) ?? SCAN_PAGE_TABS.RECORDS;
    const projectId = searchParams.get(PROJECT_QUERY_KEY);

    return (
        <div>
            <SecurityCenterTabBar
                tabs={[{ key: SCAN_PAGE_TABS.RECORDS, label: 'Records' }]}
                queryKey={TAB_VIEW_QUERY_KEY}
                defaultTab={SCAN_PAGE_TABS.RECORDS}
                actions={<AdminProjectModalLauncher />}
            />
            {activeView === SCAN_PAGE_TABS.RECORDS ? (
                <div className="space-y-2 p-4">
                    <AdminScansTimelinePanel projectId={projectId} />
                    <AdminScansTable projectId={projectId} />
                </div>
            ) : null}
        </div>
    );
}
