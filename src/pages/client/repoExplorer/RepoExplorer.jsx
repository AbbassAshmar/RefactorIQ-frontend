import { useEffect, useMemo, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SecurityCenterTabBar from '@/components/common/SecurityCenterTabBar';
import { ScanModalLauncher } from '@/components/scans';
import { useScanFiles, useSelectedProject, useSelectedScan } from '@/hooks';
import FileDetailsPanel from '@/pages/client/repoExplorer/components/FileDetailsPanel';
import NoRepositoryScanState from '@/pages/client/repoExplorer/components/NoRepositoryScanState';
import RepositoryFileExplorerPanel from '@/pages/client/repoExplorer/components/RepositoryFileExplorerPanel';
import { FILE_QUERY_KEY, TAB_VIEW_QUERY_KEY } from '@/utils/queryParams';


export default function RepoExplorer() {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [isScanSelectorOpen, setIsScanSelectorOpen] = useState(false);
    const { selectedProject, isLoading: isLoadingProjects } = useSelectedProject();
    const { selectedScanId, isSelectingLatest, hasSuccessfulScans } = useSelectedScan();
    const filesQuery = useScanFiles(selectedScanId);
    const files = useMemo(() => filesQuery.data?.data?.files ?? [], [filesQuery.data]);
    const requestedFileId = searchParams.get(FILE_QUERY_KEY);
    const selectedFile = files.find((file) => file.id === requestedFileId) ?? null;
    const activeFileId = selectedFile?.id ?? files[0]?.id ?? null;
    const activeView = searchParams.get(TAB_VIEW_QUERY_KEY) ?? 'repository';

    useEffect(() => {
        if (!selectedScanId || filesQuery.isLoading) return;
        const nextFileId = selectedFile?.id ?? files[0]?.id;
        if (nextFileId === requestedFileId) return;
        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            if (nextFileId) next.set(FILE_QUERY_KEY, nextFileId);
            else next.delete(FILE_QUERY_KEY);
            return next;
        }, { replace: true });
    }, [files, filesQuery.isLoading, requestedFileId, selectedFile, selectedScanId, setSearchParams]);

    function selectFile(fileId) {
        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            next.set(FILE_QUERY_KEY, fileId);
            return next;
        });
    }

    const isSelectingScan = isLoadingProjects || isSelectingLatest;

    return (
        <div>
            <SecurityCenterTabBar
                tabs={[{ key: 'repository', label: 'Repository Explorer' }]}
                queryKey={TAB_VIEW_QUERY_KEY}
                defaultTab="repository"
                actions={<ScanModalLauncher isOpen={isScanSelectorOpen} onOpenChange={setIsScanSelectorOpen} />}
            />
            {activeView === 'repository' ? (
                <div className="p-2">
                    {isSelectingScan ? (
                        <div className="flex min-h-[30rem] items-center justify-center gap-2 rounded border border-border bg-background-secondary text-text-secondary"><LoaderCircle size={18} className="animate-spin" />Loading selected scan…</div>
                    ) : null}
                    {!isSelectingScan && !selectedScanId ? (
                        <NoRepositoryScanState
                            hasSuccessfulScans={hasSuccessfulScans}
                            onSelectScan={() => setIsScanSelectorOpen(true)}
                            onGoToScans={() => navigate(`/dashboard/scans${location.search}`)}
                        />
                    ) : null}
                    {!isSelectingScan && selectedScanId && filesQuery.isError ? (
                        <div className="flex min-h-[30rem] items-center justify-center rounded border border-error-border bg-error-bg p-6 text-error-text">Unable to load files for this scan.</div>
                    ) : null}
                    {!isSelectingScan && selectedScanId && !filesQuery.isError ? (
                        <div className="grid h-[calc(100vh-5rem)] min-h-[36rem] grid-cols-1 gap-2 lg:grid-cols-[20rem_minmax(0,1fr)]">
                            <RepositoryFileExplorerPanel
                                files={files}
                                projectId={selectedProject?.id}
                                selectedFileId={activeFileId}
                                onSelectFile={selectFile}
                                isLoading={filesQuery.isLoading}
                                projectName={selectedProject?.name}
                            />
                            <FileDetailsPanel fileId={activeFileId} onSelectFile={selectFile} />
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
