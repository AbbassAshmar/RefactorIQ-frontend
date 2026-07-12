<<<<<<< HEAD
import { useSearchParams } from "react-router-dom";
import LatestScanSummaryPanel from "@/pages/client/overview/panels/LatestScanSummaryPanel";
import RiskTrendScorePanel from "@/pages/client/overview/panels/RiskTrendScorePanel";

export default function ClientOverview() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project_id") ?? "proj_4f92c1e8";

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <RiskTrendScorePanel projectId={projectId} />
=======
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SecurityCenterTabBar from '@/components/common/SecurityCenterTabBar';
import { ScanModalLauncher } from '@/components/scans';
import ArchitecturalHotspotPanel from '@/pages/client/overview/panels/ArchitecturalHotspotPanel';
import RiskByDirectoryPanel from '@/pages/client/overview/panels/RiskByDirectoryPanel';
import RiskTrendScorePanel from '@/pages/client/overview/panels/RiskTrendScorePanel';
import ScanSummaryPanel from '@/pages/client/overview/panels/ScanSummaryPanel';
import TopRefactorFilesPanel from '@/pages/client/overview/panels/TopRefactorFilesPanel';
import NoScanSelectedState from '@/pages/client/overview/components/NoScanSelectedState';
import { useRiskByDirectory, useSelectedProject, useSelectedScan, useTopRefactorFiles } from '@/hooks';
import { TAB_VIEW_QUERY_KEY } from '@/utils/queryParams';


export default function ClientOverview() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [isScanSelectorOpen, setIsScanSelectorOpen] = useState(false);
    const { isLoading: isLoadingProjects } = useSelectedProject();
    const {
        selectedScanId,
        isSelectingLatest,
        hasSuccessfulScans,
    } = useSelectedScan();
    const activeView = searchParams.get(TAB_VIEW_QUERY_KEY) ?? 'overview';
    const topFilesQuery = useTopRefactorFiles(selectedScanId);
    const directoryRiskQuery = useRiskByDirectory(selectedScanId);
    const topFiles = topFilesQuery.data?.data?.files ?? [];

    const isSelectingScan = isLoadingProjects || isSelectingLatest;

    return (
        <div>
            <SecurityCenterTabBar
                tabs={[{ key: 'overview', label: 'Overview' }]}
                queryKey={TAB_VIEW_QUERY_KEY}
                defaultTab="overview"
                actions={(
                    <ScanModalLauncher
                        isOpen={isScanSelectorOpen}
                        onOpenChange={setIsScanSelectorOpen}
                    />
                )}
            />
            {activeView === 'overview' ? (
                <div className="p-2">
                    {isSelectingScan ? (
                        <div className="flex min-h-[24rem] items-center justify-center gap-2 rounded-md border border-border bg-background-secondary text-body text-text-secondary">
                            <LoaderCircle size={18} className="animate-spin" />
                            Loading selected scan…
                        </div>
                    ) : null}
                    {!isSelectingScan && !selectedScanId ? (
                        <NoScanSelectedState
                            hasSuccessfulScans={hasSuccessfulScans}
                            onSelectScan={() => setIsScanSelectorOpen(true)}
                            onGoToScans={() => navigate(`/dashboard/scans${location.search}`)}
                        />
                    ) : null}
                    {!isSelectingScan && selectedScanId ? (
                        <>
                            <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
                                <RiskTrendScorePanel scanId={selectedScanId} />
                                <ScanSummaryPanel scanId={selectedScanId} />
                            </div>
                            <div className="mt-2 grid grid-cols-1 gap-2 xl:grid-cols-3">
                                <TopRefactorFilesPanel query={topFilesQuery} />
                                <RiskByDirectoryPanel query={directoryRiskQuery} />
                                <ArchitecturalHotspotPanel
                                    files={topFiles}
                                    isLoading={topFilesQuery.isLoading}
                                    isError={topFilesQuery.isError}
                                />
                            </div>
                        </>
                    ) : null}
                </div>
            ) : null}
>>>>>>> 56b665b1edd597772241faf38565098c2bb85e59
        </div>
        <div className="xl:col-span-2">
          <LatestScanSummaryPanel projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
