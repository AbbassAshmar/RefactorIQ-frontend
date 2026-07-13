import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { PanelWrapper } from '@/components';
import FileTree from '@/pages/client/repoExplorer/components/FileTree';
import { buildFileTree } from '@/pages/client/repoExplorer/utils/fileTree';


const legend = [
    { label: 'High', className: 'bg-error' },
    { label: 'Medium', className: 'bg-warning' },
    { label: 'Low', className: 'bg-success' },
];

export default function RepositoryFileExplorerPanel({ files, selectedFileId, onSelectFile, isLoading, projectName }) {
    const [search, setSearch] = useState('');
    const [collapsed, setCollapsed] = useState(() => new Set());
    const filteredFiles = useMemo(() => {
        const query = search.trim().toLowerCase();
        return query ? files.filter((file) => file.file_path.toLowerCase().includes(query)) : files;
    }, [files, search]);
    const tree = useMemo(() => buildFileTree(filteredFiles), [filteredFiles]);
    const visibleCollapsed = search ? new Set() : collapsed;

    function toggleFolder(path) {
        setCollapsed((current) => {
            const next = new Set(current);
            if (next.has(path)) next.delete(path);
            else next.add(path);
            return next;
        });
    }

    return (
        <PanelWrapper title={projectName || 'Repository files'} className="h-full min-h-0">
            <div className="flex h-full min-h-0 flex-col">
                <label className="relative block">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search files"
                        className="w-full rounded border border-border bg-background-tertiary py-2 pl-8 pr-3 text-small-1 text-text-primary outline-none placeholder:text-text-tertiary focus:border-border-focus"
                    />
                </label>
                <div className="mt-2 flex flex-wrap gap-3 border-b border-border pb-2 text-small-2 text-text-secondary">
                    {legend.map((item) => (
                        <span key={item.label} className="inline-flex items-center gap-1"><span className={`h-1.5 w-1.5 rounded-full ${item.className}`} />{item.label}</span>
                    ))}
                </div>
                <div className="mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
                    {isLoading ? <div className="h-40 animate-pulse rounded bg-background-tertiary" /> : null}
                    {!isLoading && filteredFiles.length === 0 ? <p className="py-8 text-center text-small-1 text-text-tertiary">No files found.</p> : null}
                    {!isLoading && filteredFiles.length > 0 ? (
                        <FileTree
                            tree={tree}
                            selectedFileId={selectedFileId}
                            collapsed={visibleCollapsed}
                            onToggle={toggleFolder}
                            onSelectFile={onSelectFile}
                        />
                    ) : null}
                </div>
            </div>
        </PanelWrapper>
    );
}
