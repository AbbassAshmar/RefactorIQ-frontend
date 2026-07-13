import RelatedFileList from '@/pages/client/repoExplorer/components/RelatedFileList';


export default function FileRelationshipsSection({ details, onSelectFile }) {
    return (
        <section className="rounded border border-border bg-background-tertiary p-3">
            <h3 className="text-body font-semibold text-text-primary">Related files</h3>
            <p className="mt-1 text-small-1 text-text-tertiary">Files connected through dependencies or change history.</p>
            <div className="mt-3 grid gap-4 lg:grid-cols-2">
                <RelatedFileList title="Dependencies" files={details.dependencies ?? []} onSelectFile={onSelectFile} />
                <RelatedFileList title="Co-change relationships" files={details.co_changed_files ?? []} onSelectFile={onSelectFile} />
            </div>
        </section>
    );
}
