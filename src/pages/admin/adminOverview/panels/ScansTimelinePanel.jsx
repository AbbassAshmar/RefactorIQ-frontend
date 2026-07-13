import { ScansTimelinePanel as TimelinePanel } from '@/components/scans';
import { useAdminScansOverTime } from '@/hooks';


export default function ScansTimelinePanel() {
    const query = useAdminScansOverTime();

    return (
        <TimelinePanel
            query={query}
            description="Daily scan volume across the platform, based on scan creation time."
        />
    );
}
