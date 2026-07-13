import { useSearchParams } from 'react-router-dom';
import SecurityCenterTabBar from '@/components/common/SecurityCenterTabBar';
import ScanRecordsView from '@/components/scans/ScanRecordsView';
import { TAB_VIEW_QUERY_KEY } from '@/utils/queryParams';
import { SCAN_PAGE_TABS } from '@/utils/constants';


export default function Scans() {
    const [searchParams] = useSearchParams();
    const activeView = searchParams.get(TAB_VIEW_QUERY_KEY) ?? SCAN_PAGE_TABS.RECORDS;

    return (
        <div>
            <SecurityCenterTabBar
                tabs={[{ key: SCAN_PAGE_TABS.RECORDS, label: 'Records' }]}
                queryKey={TAB_VIEW_QUERY_KEY}
                defaultTab={SCAN_PAGE_TABS.RECORDS}
            />
            {activeView === SCAN_PAGE_TABS.RECORDS ? (
                <div className="p-4"><ScanRecordsView /></div>
            ) : null}
        </div>
    );
}
