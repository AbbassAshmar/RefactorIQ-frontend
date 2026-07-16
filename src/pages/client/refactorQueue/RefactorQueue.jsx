import { useEffect, useMemo, useRef, useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { useDroppable } from '@dnd-kit/react';
import { isSortable, useSortable } from '@dnd-kit/react/sortable';
import { OptimisticSortingPlugin } from '@dnd-kit/dom/sortable';
import { LoaderCircle, Trash2 } from 'lucide-react';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import SecurityCenterTabBar from '@/components/common/SecurityCenterTabBar';
import { useDeleteRefactorQueueItem, useMoveRefactorQueueItem, useNotification, useRefactorQueue, useSelectedProject } from '@/hooks';
import { REFACTOR_QUEUE_COLUMNS } from '@/utils/constants';

function groupItems(items) {
    return REFACTOR_QUEUE_COLUMNS.reduce((groups, column) => {
        groups[column.key] = items.filter((item) => item.status === column.key).sort((left, right) => left.position - right.position);
        return groups;
    }, {});
}

function moveLocalItem(groups, fromStatus, fromIndex, toStatus, toIndex) {
    const next = Object.fromEntries(Object.entries(groups).map(([key, items]) => [key, [...items]]));
    const [item] = (next[fromStatus] ?? []).splice(fromIndex, 1);
    if (!item || !next[toStatus]) return groups;
    next[toStatus].splice(Math.max(0, Math.min(toIndex, next[toStatus].length)), 0, { ...item, status: toStatus });
    Object.values(next).forEach((items) => items.forEach((current, index) => { current.position = index; }));
    return next;
}

const reactManagedSortablePlugins = (plugins) => plugins.filter((plugin) => plugin !== OptimisticSortingPlugin);

function SortableQueueCard({ item, index, onDelete }) {
    const { ref } = useSortable({
        id: item.id,
        index,
        group: item.status,
        type: 'item',
        accept: 'item',
        // The optimistic plugin reparents DOM nodes directly, which conflicts with
        // React when a card moves between these independently rendered columns.
        plugins: reactManagedSortablePlugins,
    });
    const pathParts = item.file_path.replaceAll('\\', '/').split('/');
    const fileName = pathParts.at(-1) || item.file_path;
    const directory = pathParts.slice(0, -1).join('/');
    return (
        <article ref={ref} className="group rounded border border-border bg-background-secondary p-3 shadow-sm transition-shadow hover:border-border-focus hover:shadow-md" aria-label={`Refactor task ${item.file_path}`}>
            <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-body font-semibold text-text-primary" title={item.file_path}>{fileName}</p>
                    <p className="mt-1 truncate font-mono text-small-2 text-text-secondary" title={item.file_path}>{directory || item.file_path}</p>
                </div>
                <button type="button" onClick={() => onDelete(item)} className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-transparent text-text-tertiary opacity-70 transition-colors hover:border-error hover:bg-error-bg hover:text-error focus-visible:border-border-focus focus-visible:text-error group-hover:opacity-100" aria-label={`Remove ${item.file_path} from refactor queue`} title="Remove from refactor queue"><Trash2 size={15} /></button>
            </div>
            <p className="mt-2 text-small-2 text-text-tertiary">Added {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(item.created_at))}</p>
        </article>
    );
}

function QueueColumn({ column, items, onDelete }) {
    const { ref } = useDroppable({ id: `column:${column.key}` });
    return (
        <section className="flex min-h-[30rem] min-w-[17rem] flex-1 flex-col rounded border border-border bg-background-tertiary p-2" data-column={column.key}>
            <header className="flex items-center justify-between border-b border-border px-2 pb-2"><h2 className="text-body font-semibold text-text-primary">{column.label}</h2><span className="rounded-full bg-background-selected px-2 py-0.5 text-small-2 font-semibold text-text-secondary">{items.length}</span></header>
            <div ref={ref} className="mt-2 min-h-24 flex-1 space-y-2 rounded p-1" data-droppable-column={`column:${column.key}`}>
                {items.length === 0 ? <p className="flex min-h-24 items-center justify-center rounded border border-dashed border-border px-3 text-center text-small-1 text-text-tertiary">Drop refactor tasks here</p> : null}
                {items.map((item, index) => <SortableQueueCard key={item.id} item={item} index={index} onDelete={onDelete} />)}
            </div>
        </section>
    );
}

export default function RefactorQueue() {
    const { selectedProject, selectedProjectId, isLoading: isLoadingProjects } = useSelectedProject();
    const queueQuery = useRefactorQueue(selectedProjectId, { enabled: !isLoadingProjects && Boolean(selectedProjectId) });
    const { success, failure } = useNotification();
    const [groups, setGroups] = useState(groupItems([]));
    const [deleteTarget, setDeleteTarget] = useState(null);
    const draggingRef = useRef(false);
    const snapshotRef = useRef(null);
    const moveMutation = useMoveRefactorQueueItem(selectedProjectId, {
        onError: () => {
            setGroups(snapshotRef.current ?? groups);
            failure({ title: 'Unable to move task', message: 'The refactor task was restored because the change could not be saved.' });
        },
    });
    const deleteMutation = useDeleteRefactorQueueItem(selectedProjectId, {
        onSuccess: () => { success({ title: 'Removed from refactor queue', message: 'The task was removed from the queue.' }); setDeleteTarget(null); },
        onError: () => failure({ title: 'Unable to remove task', message: 'The task could not be removed from the refactor queue.' }),
    });

    useEffect(() => {
        if (!draggingRef.current && queueQuery.data?.data?.items) {
            // The query is the external source of truth; preserve local state while dragging.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setGroups(groupItems(queueQuery.data.data.items));
        }
    }, [queueQuery.data]);

    const hasItems = useMemo(() => Object.values(groups).some((items) => items.length > 0), [groups]);

    function handleDragStart() { snapshotRef.current = groups; draggingRef.current = true; }

    function handleDragEnd(event) {
        draggingRef.current = false;
        if (event.canceled) { setGroups(snapshotRef.current ?? groups); return; }
        const { source, target } = event.operation;
        if (!isSortable(source)) return;
        const fromStatus = source.initialGroup;
        let toStatus = source.group;
        let toIndex = source.index;
        if (isSortable(target)) { toStatus = target.group ?? toStatus; toIndex = target.index; }
        else if (target?.id?.toString().startsWith('column:')) { toStatus = target.id.toString().replace('column:', ''); toIndex = groups[toStatus]?.length ?? 0; }
        if (!fromStatus || !toStatus || !groups[fromStatus]) return;
        const sourceItem = groups[fromStatus][source.initialIndex];
        if (!sourceItem) return;
        setGroups(moveLocalItem(groups, fromStatus, source.initialIndex, toStatus, toIndex));
        if (fromStatus !== toStatus || source.initialIndex !== toIndex) moveMutation.mutate({ itemId: sourceItem.id, status: toStatus, position: toIndex });
    }

    return (
        <div>
            <SecurityCenterTabBar tabs={[{ key: 'queue', label: 'Refactor Queue' }]} defaultTab="queue" />
            <div className="p-2">
                <div className="mb-2 rounded border border-border bg-background-secondary p-3"><h1 className="text-h4 font-semibold text-text-primary">Refactor queue</h1><p className="mt-1 text-small-1 text-text-secondary">Track files that need refactoring in {selectedProject?.name || 'the selected project'}.</p></div>
                {isLoadingProjects || queueQuery.isLoading ? <div className="flex min-h-[30rem] items-center justify-center gap-2 rounded border border-border bg-background-secondary text-text-secondary"><LoaderCircle size={18} className="animate-spin" />Loading refactor queue…</div> : null}
                {!isLoadingProjects && !selectedProjectId ? <div className="flex min-h-[30rem] items-center justify-center rounded border border-border bg-background-secondary p-6 text-center text-text-secondary">Select a project to view its refactor queue.</div> : null}
                {!isLoadingProjects && selectedProjectId && queueQuery.isError ? <div className="flex min-h-[30rem] items-center justify-center rounded border border-error-border bg-error-bg p-6 text-center text-error-text">Unable to load the refactor queue.</div> : null}
                {!isLoadingProjects && selectedProjectId && !queueQuery.isLoading && !queueQuery.isError ? <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}><div className="flex min-w-0 gap-2 overflow-x-auto pb-2">{REFACTOR_QUEUE_COLUMNS.map((column) => <QueueColumn key={column.key} column={column} items={groups[column.key] ?? []} onDelete={setDeleteTarget} />)}</div>{!hasItems ? <p className="mt-2 text-center text-small-1 text-text-tertiary">No files are queued yet. Add files from Overview or Repository Explorer.</p> : null}</DragDropProvider> : null}
            </div>
            <ConfirmationModal isOpen={Boolean(deleteTarget)} title="Remove refactor task?" confirmLabel="Remove task" onClose={() => setDeleteTarget(null)} onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)} isConfirming={deleteMutation.isPending}>Remove <span className="font-mono">{deleteTarget?.file_path}</span> from this queue? This does not delete the file from the repository.</ConfirmationModal>
        </div>
    );
}
