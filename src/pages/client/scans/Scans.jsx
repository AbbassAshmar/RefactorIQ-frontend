import { useSearchParams } from 'react-router-dom';
import SecurityCenterTabBar from '@/components/common/SecurityCenterTabBar';
import ScanRecordsView from '@/components/scans/ScanRecordsView';
import { TAB_VIEW_QUERY_KEY } from '@/utils/queryParams';


export default function Scans() {
    const [searchParams] = useSearchParams();
    const activeView = searchParams.get('tabView') ?? 'records';

    return (
        <div>
            <SecurityCenterTabBar tabs={[{ key: 'records', label: 'Records' }]} queryKey={TAB_VIEW_QUERY_KEY} defaultTab="records" />
            {activeView === 'records' ? <div className="p-4"><ScanRecordsView /></div> : null}
        </div>
    );
}
