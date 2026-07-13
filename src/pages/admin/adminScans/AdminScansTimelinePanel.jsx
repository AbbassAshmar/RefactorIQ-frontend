import { ScansTimelinePanel } from '@/components/scans';
import { useAdminScansOverTime } from '@/hooks';


export default function AdminScansTimelinePanel({ projectId }) {
    const query = useAdminScansOverTime(projectId);
    const subtitle = projectId
        ? `Pinned project ${projectId.slice(0, 8)} · Last 14 days`
        : 'All projects · Last 14 days';

    return (
        <ScansTimelinePanel
            query={query}
            subtitle={subtitle}
            description="Daily scan volume across all users, optionally filtered by the pinned project."
            emptyMessage="No scans were created for this project scope in the last 14 days."
        />
    );
}
