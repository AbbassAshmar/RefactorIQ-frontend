import { useEffect, useMemo, useState } from 'react';
import dagre from '@dagrejs/dagre';
import {
    Background,
    BackgroundVariant,
    Controls,
    Handle,
    MarkerType,
    MiniMap,
    Position,
    ReactFlow,
    useNodesState,
} from '@xyflow/react';
import { AlertTriangle, FileCode2, Search } from 'lucide-react';
import { PanelWrapper } from '@/components';
import '@xyflow/react/dist/style.css';
import './dependencies.css';


const NODE_WIDTH = 250;
const NODE_HEIGHT = 76;

const priorityStyles = {
    critical: { dot: 'bg-error', text: 'text-error-text' },
    high: { dot: 'bg-error', text: 'text-error-text' },
    medium: { dot: 'bg-warning', text: 'text-warning-text' },
    low: { dot: 'bg-success', text: 'text-success-text' },
};

function FileDependencyNode({ data }) {
    const priority = priorityStyles[data.priorityBand] ?? {
        dot: 'bg-text-tertiary',
        text: 'text-text-tertiary',
    };

    return (
        <div
            className={[
                'h-[76px] w-[250px] rounded border bg-background-secondary shadow-sm transition-colors',
                data.isCircular ? 'border-error-border' : 'border-border-secondary',
                data.isFocused ? 'ring-2 ring-brand-primary ring-offset-2 ring-offset-background-primary' : '',
            ].join(' ')}
        >
            <Handle type="target" position={Position.Top} isConnectable={false} className="dependency-handle" />
            <button
                type="button"
                onClick={() => data.onOpen(data.fileId)}
                className="nodrag flex h-full w-full items-center gap-2 rounded px-3 py-2 text-left outline-none hover:bg-background-hover focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary"
                aria-label={`Open ${data.filePath} in Repository Explorer`}
            >
                <FileCode2 size={17} className="shrink-0 text-text-brand" />
                <span className="min-w-0 flex-1">
                    <span className="block truncate font-mono text-small-1 font-semibold text-text-primary" title={data.filePath}>
                        {data.filePath}
                    </span>
                    <span className={`mt-1 inline-flex items-center gap-1 text-small-2 capitalize ${priority.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
                        {data.priorityBand || 'Unscored'}
                    </span>
                </span>
                {data.isCircular ? (
                    <AlertTriangle size={15} className="shrink-0 text-error" aria-label="Part of a circular dependency" />
                ) : null}
            </button>
            <Handle type="source" position={Position.Bottom} isConnectable={false} className="dependency-handle" />
        </div>
    );
}

const nodeTypes = { fileDependency: FileDependencyNode };

function sharesCircularGroup(sourceId, targetId, groupIdsByFile) {
    const sourceGroups = groupIdsByFile.get(sourceId);
    const targetGroups = groupIdsByFile.get(targetId);
    if (!sourceGroups || !targetGroups) return false;
    return [...sourceGroups].some((groupId) => targetGroups.has(groupId));
}

function layoutGraph(files, relationships, circularGroups, onOpenFile, focusedFileId) {
    const graph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    graph.setGraph({ rankdir: 'TB', nodesep: 28, ranksep: 72, marginx: 24, marginy: 24 });

    const groupIdsByFile = new Map();
    circularGroups.forEach((group) => {
        group.members.forEach((member) => {
            if (!groupIdsByFile.has(member.id)) groupIdsByFile.set(member.id, new Set());
            groupIdsByFile.get(member.id).add(group.group_id);
        });
    });

    files.forEach((file) => graph.setNode(file.id, { width: NODE_WIDTH, height: NODE_HEIGHT }));
    relationships.forEach((edge) => graph.setEdge(edge.source_file_id, edge.target_file_id));
    dagre.layout(graph);

    const nodes = files.map((file) => {
        const position = graph.node(file.id) ?? { x: NODE_WIDTH / 2, y: NODE_HEIGHT / 2 };
        return {
            id: file.id,
            type: 'fileDependency',
            position: {
                x: position.x - NODE_WIDTH / 2,
                y: position.y - NODE_HEIGHT / 2,
            },
            data: {
                fileId: file.id,
                filePath: file.file_path,
                priorityBand: file.priority_band,
                isCircular: groupIdsByFile.has(file.id),
                isFocused: focusedFileId === file.id,
                onOpen: onOpenFile,
            },
        };
    });

    const edges = relationships.map((edge) => {
        const isCircular = sharesCircularGroup(edge.source_file_id, edge.target_file_id, groupIdsByFile);
        return {
            id: `${edge.source_file_id}-${edge.target_file_id}`,
            source: edge.source_file_id,
            target: edge.target_file_id,
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: isCircular ? 'var(--error-default)' : 'var(--info-default)',
            },
            style: {
                stroke: isCircular ? 'var(--error-default)' : 'var(--info-default)',
                strokeWidth: isCircular ? 2 : 1.5,
            },
            ariaLabel: 'Depends on',
        };
    });

    return { nodes, edges };
}

function minimapNodeColor(node) {
    if (node.data.isCircular) return 'var(--error-default)';
    if (node.data.priorityBand === 'critical' || node.data.priorityBand === 'high') return 'var(--error-default)';
    if (node.data.priorityBand === 'medium') return 'var(--warning-default)';
    if (node.data.priorityBand === 'low') return 'var(--success-default)';
    return 'var(--text-tertiary)';
}

export default function DependencyGraph({ files, relationships, circularGroups, isLoading, isError, onRetry, onOpenFile }) {
    const [search, setSearch] = useState('');
    const [searchMessage, setSearchMessage] = useState('');
    const [focusedFileId, setFocusedFileId] = useState(null);
    const [flowInstance, setFlowInstance] = useState(null);
    const layout = useMemo(
        () => layoutGraph(files, relationships, circularGroups, onOpenFile, focusedFileId),
        [circularGroups, files, focusedFileId, onOpenFile, relationships],
    );
    const [nodes, setNodes, onNodesChange] = useNodesState(layout.nodes);

    useEffect(() => {
        setNodes(layout.nodes);
    }, [layout.nodes, setNodes]);

    function handleSearch(event) {
        event.preventDefault();
        const query = search.trim().toLowerCase();
        if (!query) {
            setFocusedFileId(null);
            setSearchMessage('');
            flowInstance?.fitView({ padding: 0.15, duration: 400 });
            return;
        }

        const file = files.find((item) => item.file_path.toLowerCase() === query)
            ?? files.find((item) => item.file_path.toLowerCase().startsWith(query))
            ?? files.find((item) => item.file_path.toLowerCase().includes(query));
        if (!file) {
            setSearchMessage('No matching file was found.');
            return;
        }

        const node = layout.nodes.find((item) => item.id === file.id);
        setFocusedFileId(file.id);
        setSearchMessage(`Focused ${file.file_path}`);
        if (node && flowInstance) {
            flowInstance.setCenter(
                node.position.x + NODE_WIDTH / 2,
                node.position.y + NODE_HEIGHT / 2,
                { zoom: 1.2, duration: 400 },
            );
        }
    }

    return (
        <PanelWrapper
            title="Dependency graph"
            subtitle={`${files.length} files · ${relationships.length} directed relationships`}
            description="Arrows point from a file to the file it depends on."
            className="h-full min-h-[34rem]"
        >
            <div className="flex h-full min-h-0 flex-col">
                <form onSubmit={handleSearch} className="flex gap-2" role="search">
                    <label className="relative min-w-0 flex-1">
                        <span className="sr-only">Find a file in the dependency graph</span>
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                        <input
                            type="search"
                            list="dependency-file-paths"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Find a file path"
                            className="w-full rounded border border-border bg-background-tertiary py-2 pl-8 pr-3 text-small-1 text-text-primary outline-none placeholder:text-text-tertiary focus:border-border-focus"
                        />
                        <datalist id="dependency-file-paths">
                            {files.map((file) => <option key={file.id} value={file.file_path} />)}
                        </datalist>
                    </label>
                    <button type="submit" className="rounded border border-brand-primary px-2 py-1 text-small-1 font-semibold text-brand-text hover:bg-brand-hover hover:underline">
                        Find
                    </button>
                </form>
                <p className="min-h-5 pt-1 text-small-2 text-text-tertiary" aria-live="polite">{searchMessage}</p>

                <div className="relative min-h-0 flex-1 overflow-hidden rounded border border-border bg-background-primary">
                    {isLoading ? <div className="absolute inset-0 animate-pulse bg-background-tertiary" aria-label="Loading dependency graph" /> : null}
                    {!isLoading && isError ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <AlertTriangle size={28} className="text-error" />
                            <p className="mt-2 text-body text-error-text">Unable to load the dependency graph.</p>
                            <button type="button" onClick={onRetry} className="mt-3 rounded border border-brand-primary px-2 py-1 text-brand-text hover:bg-brand-hover hover:underline">Retry</button>
                        </div>
                    ) : null}
                    {!isLoading && !isError && files.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-body text-text-tertiary">No analyzed files were found for this scan.</div>
                    ) : null}
                    {!isLoading && !isError && files.length > 0 ? (
                        <ReactFlow
                            className="dependencies-flow"
                            nodes={nodes}
                            edges={layout.edges}
                            nodeTypes={nodeTypes}
                            onNodesChange={onNodesChange}
                            onInit={setFlowInstance}
                            nodesConnectable={false}
                            deleteKeyCode={null}
                            fitView
                            fitViewOptions={{ padding: 0.15, maxZoom: 1.2 }}
                            minZoom={0.1}
                            maxZoom={2}
                            aria-label="File dependency graph"
                        >
                            <Background variant={BackgroundVariant.Dots} gap={18} size={1} color="var(--border-default)" />
                            <MiniMap pannable zoomable nodeColor={minimapNodeColor} maskColor="var(--background-overlay)" />
                            <Controls showInteractive={false} />
                        </ReactFlow>
                    ) : null}
                    {!isLoading && !isError && files.length > 0 && relationships.length === 0 ? (
                        <div className="pointer-events-none absolute left-3 top-3 z-10 rounded border border-info-border bg-info-bg px-2 py-1 text-small-1 text-info-text">
                            No dependency relationships were detected; files are shown as isolated nodes.
                        </div>
                    ) : null}
                </div>
            </div>
        </PanelWrapper>
    );
}
