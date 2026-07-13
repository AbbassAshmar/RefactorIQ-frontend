import { useCallback, useState } from 'react';
import { FolderSearch, Pin } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import AdminProjectSelectorModal from '@/components/projects/AdminProjectSelectorModal';
import { PROJECT_QUERY_KEY } from '@/utils/queryParams';


export default function AdminProjectModalLauncher({
    isOpen: controlledIsOpen,
    onOpenChange,
}) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedProjectId = searchParams.get(PROJECT_QUERY_KEY);
    const isControlled = typeof controlledIsOpen === 'boolean';
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
    const setIsOpen = useCallback((nextValue) => {
        if (!isControlled) setInternalIsOpen(nextValue);
        onOpenChange?.(nextValue);
    }, [isControlled, onOpenChange]);
    const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

    function handleSelectProject(project) {
        setSelectedProject(project);
        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            if (project?.id) next.set(PROJECT_QUERY_KEY, project.id);
            else next.delete(PROJECT_QUERY_KEY);
            return next;
        });
        setIsOpen(false);
    }

    const selectedName = selectedProject?.id === selectedProjectId
        ? selectedProject.name
        : null;
    const shortId = selectedProjectId?.slice(0, 8);

    return (
        <>
            <AdminProjectSelectorModal
                isOpen={isOpen}
                onClose={closeModal}
                onSelectProject={handleSelectProject}
                selectedProjectId={selectedProjectId}
            />
            <div className={`flex min-w-0 items-center justify-between rounded text-brand-primary ${selectedProjectId ? 'bg-brand-bg' : 'bg-transparent'}`}>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="flex min-w-0 flex-1 items-center gap-2 border-0 bg-transparent px-2 py-2 text-inherit hover:underline"
                >
                    <FolderSearch className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="max-w-56 truncate">
                        {selectedProjectId
                            ? selectedName ?? `Project (${shortId})`
                            : 'All projects'}
                    </span>
                </button>
                {selectedProjectId ? (
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        title="Change pinned project"
                        aria-label="Change pinned project"
                        className="flex items-center justify-center rounded border border-brand-primary px-2 py-1 text-brand-text hover:bg-brand-hover hover:underline"
                    >
                        <Pin className="h-4 w-4 fill-current" />
                    </button>
                ) : null}
            </div>
        </>
    );
}
