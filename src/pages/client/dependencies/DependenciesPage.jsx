import { useCallback, useMemo, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SecurityCenterTabBar from '@/components/common/SecurityCenterTabBar';
import { ScanModalLauncher } from '@/components/scans';
import {
    useScanCircularDependencies,
    useScanDependencies,
    useSelectedProject,
    useSelectedScan,
} from '@/hooks';
import NoRepositoryScanState from '@/pages/client/repoExplorer/components/NoRepositoryScanState';
import { CLIENT_ROUTES, DEPENDENCIES_PAGE_TAB } from '@/utils/constants';
import { FILE_QUERY_KEY, TAB_VIEW_QUERY_KEY } from '@/utils/queryParams';
import CircularDependenciesPanel from './CircularDependenciesPanel';
import DependencyGraph from './DependencyGraph';


export default function DependenciesPage() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [isScanSelectorOpen, setIsScanSelectorOpen] = useState(false);
    const { selectedProject, isLoading: isLoadingProjects } = useSelectedProject();
    const { selectedScanId, isSelectingLatest, hasSuccessfulScans } = useSelectedScan();
    const dependenciesQuery = useScanDependencies(selectedScanId);
    const circularQuery = useScanCircularDependencies(selectedScanId);
    const files = useMemo(
        () => dependenciesQuery.data?.data?.nodes ?? [],
        [dependenciesQuery.data],
    );
    const relationships = useMemo(
        () => dependenciesQuery.data?.data?.edges ?? [],
        [dependenciesQuery.data],
    );
    const circularGroups = useMemo(
        () => circularQuery.data?.data?.circular_dependencies ?? [],
        [circularQuery.data],
    );

    const openFile = useCallback((fileId) => {
        const next = new URLSearchParams(searchParams);
        next.set(FILE_QUERY_KEY, fileId);
        next.set(TAB_VIEW_QUERY_KEY, 'repository');
        navigate({ pathname: CLIENT_ROUTES.REPOSITORY_EXPLORER, search: `?${next.toString()}` });
    }, [navigate, searchParams]);

    const isSelectingScan = isLoadingProjects || isSelectingLatest;

    return (
        <div>
            <SecurityCenterTabBar
                tabs={[{ key: DEPENDENCIES_PAGE_TAB, label: 'Dependencies' }]}
                queryKey={TAB_VIEW_QUERY_KEY}
                defaultTab={DEPENDENCIES_PAGE_TAB}
                actions={<ScanModalLauncher isOpen={isScanSelectorOpen} onOpenChange={setIsScanSelectorOpen} />}
            />
            <div className="p-2">
                {isSelectingScan ? (
                    <div className="flex min-h-[30rem] items-center justify-center gap-2 rounded border border-border bg-background-secondary text-text-secondary">
                        <LoaderCircle size={18} className="animate-spin" />Loading selected scan…
                    </div>
                ) : null}
                {!isSelectingScan && !selectedScanId ? (
                    <NoRepositoryScanState
                        hasSuccessfulScans={hasSuccessfulScans}
                        onSelectScan={() => setIsScanSelectorOpen(true)}
                        onGoToScans={() => navigate(`/dashboard/scans${location.search}`)}
                    />
                ) : null}
                {!isSelectingScan && selectedScanId ? (
                    <div className="grid h-[calc(100vh-5rem)] min-h-[36rem] grid-cols-1 gap-2 xl:grid-cols-[minmax(0,1fr)_22rem]">
                        <DependencyGraph
                            files={files}
                            relationships={relationships}
                            circularGroups={circularQuery.isError ? [] : circularGroups}
                            isLoading={dependenciesQuery.isLoading}
                            isError={dependenciesQuery.isError}
                            onRetry={() => dependenciesQuery.refetch()}
                            onOpenFile={openFile}
                            projectName={selectedProject?.name}
                        />
                        <CircularDependenciesPanel
                            groups={circularGroups}
                            isLoading={circularQuery.isLoading}
                            isError={circularQuery.isError}
                            onRetry={() => circularQuery.refetch()}
                            onOpenFile={openFile}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
