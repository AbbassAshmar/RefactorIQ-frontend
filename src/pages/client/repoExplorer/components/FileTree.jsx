import { ChevronDown, ChevronRight, FileCode2, Folder } from 'lucide-react';
import AddToRefactorQueueButton from '@/components/refactorQueue/AddToRefactorQueueButton';


const priorityDotClass = {
    critical: 'bg-error',
    high: 'bg-error',
    medium: 'bg-warning',
    low: 'bg-success',
};

function FileRow({ file, selectedFileId, onSelectFile, projectId }) {
    const selected = file.id === selectedFileId;
    return <div className={`group flex min-w-0 items-center gap-1 rounded px-1.5 py-1 text-small-1 transition-colors ${selected ? 'bg-background-selected text-text-brand' : 'text-text-secondary hover:bg-background-hover hover:text-text-primary'}`}>
        <button type="button" onClick={() => onSelectFile(file.id)} title={file.file_path} className="flex min-w-0 flex-1 items-center gap-2 text-left hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${priorityDotClass[file.priority_band] ?? 'bg-text-disabled'}`} />
            <FileCode2 size={14} className="shrink-0" />
            <span className="truncate">{file.name}</span>
        </button>
        <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"><AddToRefactorQueueButton projectId={projectId} filePath={file.file_path} /></span>
    </div>;
}

function FolderNode({ node, selectedFileId, collapsed, onToggle, onSelectFile, projectId }) {
    const isExpanded = !collapsed.has(node.path);
    const folders = [...node.folders.values()].sort((left, right) => left.name.localeCompare(right.name));
    const files = [...node.files].sort((left, right) => left.name.localeCompare(right.name));

    return (
        <li>
            <button
                type="button"
                onClick={() => onToggle(node.path)}
                aria-expanded={isExpanded}
                className="flex w-full items-center gap-1.5 rounded px-1 py-1 text-left text-small-1 font-medium text-text-primary transition-colors hover:bg-background-hover hover:underline"
            >
                {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                <Folder size={14} className="text-text-secondary" />
                <span className="truncate">{node.name}</span>
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-200 ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="min-h-0 overflow-hidden">
                    <ul className="ml-2 border-l border-border pl-2">
                        {folders.map((folder) => (
                            <FolderNode
                                key={folder.path}
                                node={folder}
                                selectedFileId={selectedFileId}
                                collapsed={collapsed}
                                onToggle={onToggle}
                                onSelectFile={onSelectFile}
                                projectId={projectId}
                            />
                        ))}
                        {files.map((file) => (
                            <li key={file.id}>
                                <FileRow file={file} selectedFileId={selectedFileId} onSelectFile={onSelectFile} projectId={projectId} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    );
}

export default function FileTree({ tree, selectedFileId, collapsed, onToggle, onSelectFile, projectId }) {
    const folders = [...tree.folders.values()].sort((left, right) => left.name.localeCompare(right.name));
    const files = [...tree.files].sort((left, right) => left.name.localeCompare(right.name));

    return (
        <ul className="space-y-0.5">
            {folders.map((folder) => (
                <FolderNode
                    key={folder.path}
                    node={folder}
                    selectedFileId={selectedFileId}
                    collapsed={collapsed}
                    onToggle={onToggle}
                    onSelectFile={onSelectFile}
                    projectId={projectId}
                />
            ))}
            {files.map((file) => (
                <li key={file.id}>
                <FileRow file={file} selectedFileId={selectedFileId} onSelectFile={onSelectFile} projectId={projectId} />
                </li>
            ))}
        </ul>
    );
}
