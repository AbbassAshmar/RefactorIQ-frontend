import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSelectedProject from '@/hooks/useSelectedProject';
import { useScansList } from '@/hooks/useScans';
import { FILE_QUERY_KEY, SCAN_QUERY_KEY } from '@/utils/queryParams';


export default function useSelectedScan({ autoSelectLatest = true } = {}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { selectedProjectId } = useSelectedProject();
    const selectedScanId = searchParams.get(SCAN_QUERY_KEY);
    const latestScanQuery = useScansList({
        project_id: selectedProjectId,
        status: 'succeeded',
        sort: 'date_desc',
        page: 1,
        limit: 1,
    }, {
        enabled: autoSelectLatest && Boolean(selectedProjectId) && !selectedScanId,
    });

    useEffect(() => {
        if (!autoSelectLatest || selectedScanId) return;
        const latest = latestScanQuery.data?.data?.scans?.[0];
        if (!latest) return;

        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            if (!next.get(SCAN_QUERY_KEY)) {
                next.set(SCAN_QUERY_KEY, latest.id);
                next.delete(FILE_QUERY_KEY);
            }
            return next;
        }, { replace: true });
    }, [autoSelectLatest, latestScanQuery.data, selectedScanId, setSearchParams]);

    const selectScan = useCallback((scanOrId) => {
        const scanId = typeof scanOrId === 'string' ? scanOrId : scanOrId?.id;
        if (!scanId) return;
        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            next.set(SCAN_QUERY_KEY, scanId);
            next.delete(FILE_QUERY_KEY);
            return next;
        });
    }, [setSearchParams]);

    const clearScan = useCallback(() => {
        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            next.delete(SCAN_QUERY_KEY);
            next.delete(FILE_QUERY_KEY);
            return next;
        });
    }, [setSearchParams]);

    return {
        selectedScanId,
        selectScan,
        clearScan,
        isSelectingLatest: latestScanQuery.isLoading,
        hasSuccessfulScans: (latestScanQuery.data?.data?.scans?.length ?? 0) > 0,
    };
}
