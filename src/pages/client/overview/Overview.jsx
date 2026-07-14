import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SecurityCenterTabBar from '@/components/common/SecurityCenterTabBar';
import { ScanModalLauncher } from '@/components/scans';
import ArchitecturalHotspotPanel from '@/pages/client/overview/panels/ArchitecturalHotspotPanel';
import DirectoryInsightPanel from '@/pages/client/overview/panels/DirectoryInsightPanel';
import RiskByDirectoryPanel from '@/pages/client/overview/panels/RiskByDirectoryPanel';
import RiskTrendScorePanel from '@/pages/client/overview/panels/RiskTrendScorePanel';
import ScanSummaryPanel from '@/pages/client/overview/panels/ScanSummaryPanel';
import TopRefactorDriversPanel from '@/pages/client/overview/panels/TopRefactorDriversPanel';
import TopRefactorFilesPanel from '@/pages/client/overview/panels/TopRefactorFilesPanel';
import NoScanSelectedState from '@/pages/client/overview/components/NoScanSelectedState';
import { useDirectoryInsight, useRiskByDirectory, useSelectedProject, useSelectedScan, useTopRefactorFiles } from '@/hooks';
import { TAB_VIEW_QUERY_KEY } from '@/utils/queryParams';


export default function ClientOverview() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [isScanSelectorOpen, setIsScanSelectorOpen] = useState(false);
    const { selectedProjectId, isLoading: isLoadingProjects } = useSelectedProject();
    const {
        selectedScanId,
        isSelectingLatest,
        hasSuccessfulScans,
    } = useSelectedScan();
    const activeView = searchParams.get(TAB_VIEW_QUERY_KEY) ?? 'overview';
    const topFilesQuery = useTopRefactorFiles(selectedScanId);
    const directoryRiskQuery = useRiskByDirectory(selectedScanId);
    const directoryInsightQuery = useDirectoryInsight(selectedScanId);
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
                        <div className="flex min-h-[24rem] items-center justify-center gap-2 rounded border border-border bg-background-secondary text-body text-text-secondary">
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
                                <TopRefactorFilesPanel query={topFilesQuery} projectId={selectedProjectId} />
                                <TopRefactorDriversPanel query={topFilesQuery} />
                                <ArchitecturalHotspotPanel
                                    files={topFiles}
                                    isLoading={topFilesQuery.isLoading}
                                    isError={topFilesQuery.isError}
                                    projectId={selectedProjectId}
                                />
                            </div>
                            <div className="mt-2 grid grid-cols-1 gap-2 xl:grid-cols-2">
                                <RiskByDirectoryPanel query={directoryRiskQuery} />
                                <DirectoryInsightPanel query={directoryInsightQuery} />
                            </div>
                        </>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
