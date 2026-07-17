import { useSearchParams } from 'react-router-dom';
import SecurityCenterTabBar from '@/components/common/SecurityCenterTabBar';
import ProjectsTable from '@/pages/admin/adminProjects/ProjectsTable';
import ProjectsTimelinePanel from '@/pages/admin/adminProjects/ProjectsTimelinePanel';
import { useAdminProjectsOverTime } from '@/hooks';
import { TAB_VIEW_QUERY_KEY } from '@/utils/queryParams';


export default function AdminProjects() {
    const [searchParams] = useSearchParams();
    const timelineQuery = useAdminProjectsOverTime();
    const activeView = searchParams.get(TAB_VIEW_QUERY_KEY) ?? 'records';

    return (
        <div>
            <SecurityCenterTabBar
                tabs={[{ key: 'records', label: 'Records' }]}
                queryKey={TAB_VIEW_QUERY_KEY}
                defaultTab="records"
            />
            {activeView === 'records' ? (
                <div className="space-y-2 p-4">
                    <ProjectsTimelinePanel query={timelineQuery} />
                    <ProjectsTable />
                </div>
            ) : null}
        </div>
    );
}
