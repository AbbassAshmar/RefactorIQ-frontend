import { ChevronDown, ChevronRight, FileCode2, Folder } from 'lucide-react';


const priorityDotClass = {
    critical: 'bg-error-default',
    high: 'bg-error-default',
    medium: 'bg-warning-default',
    low: 'bg-success-default',
};

function FileRow({ file, selectedFileId, onSelectFile }) {
    const selected = file.id === selectedFileId;
    return (
        <button
            type="button"
            onClick={() => onSelectFile(file.id)}
            title={file.file_path}
            className={`flex w-full min-w-0 items-center gap-2 rounded px-1.5 py-1 text-left text-small-1 transition-colors ${selected ? 'bg-background-selected text-text-brand' : 'text-text-secondary hover:bg-background-hover hover:text-text-primary'}`}
        >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${priorityDotClass[file.priority_band] ?? 'bg-text-disabled'}`} />
            <FileCode2 size={14} className="shrink-0" />
            <span className="truncate">{file.name}</span>
        </button>
    );
}

function FolderNode({ node, selectedFileId, collapsed, onToggle, onSelectFile }) {
    const isExpanded = !collapsed.has(node.path);
    const folders = [...node.folders.values()].sort((left, right) => left.name.localeCompare(right.name));
    const files = [...node.files].sort((left, right) => left.name.localeCompare(right.name));

    return (
        <li>
            <button
                type="button"
                onClick={() => onToggle(node.path)}
                aria-expanded={isExpanded}
                className="flex w-full items-center gap-1.5 rounded px-1 py-1 text-left text-small-1 font-medium text-text-primary transition-colors hover:bg-background-hover"
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
                            />
                        ))}
                        {files.map((file) => (
                            <li key={file.id}>
                                <FileRow file={file} selectedFileId={selectedFileId} onSelectFile={onSelectFile} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    );
}

export default function FileTree({ tree, selectedFileId, collapsed, onToggle, onSelectFile }) {
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
                />
            ))}
            {files.map((file) => (
                <li key={file.id}>
                    <FileRow file={file} selectedFileId={selectedFileId} onSelectFile={onSelectFile} />
                </li>
            ))}
        </ul>
    );
}
