import { FileCode2, LoaderCircle } from 'lucide-react';
import { PanelWrapper } from '@/components';
import { useFileDetails } from '@/hooks';
import FileMetricsTabs from '@/pages/client/repoExplorer/components/FileMetricsTabs';
import FileRelationshipsSection from '@/pages/client/repoExplorer/components/FileRelationshipsSection';
import FileSummariesSection from '@/pages/client/repoExplorer/components/FileSummariesSection';
import RefactorPriorityHero from '@/pages/client/repoExplorer/components/RefactorPriorityHero';


function formatDate(value) {
    if (!value) return '—';
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export default function FileDetailsPanel({ fileId, onSelectFile }) {
    const detailsQuery = useFileDetails(fileId, false);
    const summaryQuery = useFileDetails(fileId, true, {
        enabled: Boolean(fileId) && detailsQuery.isSuccess,
    });
    const details = detailsQuery.data?.data;
    const staticMetrics = details?.metrics?.static_analysis ?? {};

    return (
        <PanelWrapper title={details?.file_path || 'File details'} className="h-full min-h-0">
            {!fileId ? (
                <div className="flex min-h-[30rem] flex-col items-center justify-center text-center">
                    <FileCode2 size={42} strokeWidth={1.5} className="text-text-tertiary" />
                    <h2 className="mt-3 text-h5 font-semibold text-text-primary">Select a file</h2>
                    <p className="mt-1 text-small-1 text-text-secondary">Choose a file from the repository tree to inspect its analysis.</p>
                </div>
            ) : null}
            {fileId && detailsQuery.isLoading ? (
                <div className="flex min-h-[30rem] items-center justify-center gap-2 text-text-secondary"><LoaderCircle size={18} className="animate-spin" />Loading file details…</div>
            ) : null}
            {fileId && detailsQuery.isError ? (
                <div className="flex min-h-[30rem] items-center justify-center rounded border border-error-border bg-error-bg p-6 text-center text-error-text">Unable to load this file.</div>
            ) : null}
            {details ? (
                <div className="h-full space-y-3 overflow-y-auto pr-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-border pb-2 text-small-1 text-text-secondary">
                        <span>{details.language}</span>
                        <span>LOC: {staticMetrics.lines_of_code ?? '—'}</span>
                        <span>Last scan: {formatDate(details.last_scan_at)}</span>
                    </div>
                    <RefactorPriorityHero details={details} />
                    <FileSummariesSection query={summaryQuery} />
                    <FileMetricsTabs details={details} onSelectFile={onSelectFile} />
                    {/* <FileRelationshipsSection details={details} onSelectFile={onSelectFile} /> */}
                </div>
            ) : null}
        </PanelWrapper>
    );
}
