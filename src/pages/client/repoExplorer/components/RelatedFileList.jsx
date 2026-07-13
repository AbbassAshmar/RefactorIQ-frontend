import { ArrowRight } from 'lucide-react';


export default function RelatedFileList({ title, files, onSelectFile, emptyMessage = 'No related files.' }) {
    return (
        <div>
            <h4 className="mb-1.5 text-small-1 font-semibold text-text-secondary">{title}</h4>
            {files.length === 0 ? <p className="text-small-1 text-text-tertiary">{emptyMessage}</p> : null}
            <div className="divide-y divide-border">
                {files.map((file) => (
                    <button
                        key={`${file.relationship ?? 'related'}-${file.direction ?? ''}-${file.id}`}
                        type="button"
                        onClick={() => onSelectFile(file.id)}
                        className="flex w-full items-center justify-between gap-2 py-2 text-left text-small-1 text-text-primary hover:text-text-brand hover:underline"
                    >
                        <span className="min-w-0 truncate font-mono">{file.file_path}</span>
                        <span className="flex shrink-0 items-center gap-1 text-text-tertiary">
                            {file.direction ? <span className="capitalize">{file.direction}</span> : null}
                            <ArrowRight size={13} />
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
