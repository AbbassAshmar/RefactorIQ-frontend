import { Check, ListPlus, LoaderCircle } from 'lucide-react';
import { useAddRefactorQueueItem, useRefactorQueue, useNotification } from '@/hooks';


export default function AddToRefactorQueueButton({ projectId, filePath }) {
    const queueQuery = useRefactorQueue(projectId);
    const { success, failure } = useNotification();
    const addMutation = useAddRefactorQueueItem({
        onSuccess: () => success({
            title: 'Added to refactor queue',
            message: `${filePath} was added to Pending.`,
        }),
        onError: (error) => {
            if (error?.response?.status === 409) {
                queueQuery.refetch();
                return;
            }
            failure({
                title: 'Unable to add file',
                message: 'The file could not be added to the refactor queue.',
            });
        },
    });
    const queued = (queueQuery.data?.data?.items ?? []).some((item) => item.file_path === filePath);
    const disabled = !projectId || !filePath || queued || addMutation.isPending;

    function addFile(event) {
        event.stopPropagation();
        if (disabled) return;
        addMutation.mutate({ projectId, filePath });
    }

    return (
        <button
            type="button"
            onClick={addFile}
            disabled={disabled}
            title={queued ? 'Already in refactor queue' : 'Add to refactor queue'}
            aria-label={queued ? `${filePath} is already in the refactor queue` : `Add ${filePath} to refactor queue`}
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border border-transparent text-text-secondary transition-colors hover:border-brand-primary hover:bg-brand-hover hover:text-brand-text hover:underline focus-visible:border-border-focus focus-visible:text-brand-text disabled:cursor-not-allowed disabled:opacity-50"
        >
            {addMutation.isPending ? <LoaderCircle size={14} className="animate-spin" /> : null}
            {!addMutation.isPending && queued ? <Check size={14} /> : null}
            {!addMutation.isPending && !queued ? <ListPlus size={14} /> : null}
        </button>
    );
}
