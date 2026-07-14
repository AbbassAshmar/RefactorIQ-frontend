import { useSearchParams } from 'react-router-dom';
import SecurityCenterTabBar from '@/components/common/SecurityCenterTabBar';
import UsersTable from '@/pages/admin/adminUsers/UsersTable';
import UsersTimelinePanel from '@/pages/admin/adminUsers/UsersTimelinePanel';
import { useAdminUsersOverTime } from '@/hooks';
import { TAB_VIEW_QUERY_KEY } from '@/utils/queryParams';


export default function AdminUsers() {
    const [searchParams] = useSearchParams();
    const timelineQuery = useAdminUsersOverTime();
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
                    <UsersTimelinePanel query={timelineQuery} />
                    <UsersTable />
                </div>
            ) : null}
        </div>
    );
}
