import { useEffect, useRef, useState } from 'react';
import {
	AlertTriangle,
	CalendarClock,
	ChevronDown,
	ChevronRight,
	Clock3,
	EllipsisVertical,
	FolderGit2,
	GitBranch,
	Globe2,
	Trash2,
	UserRound,
} from 'lucide-react';


const STATUS_TONES = {
	running: {
		label: 'running',
		className: 'border-warning-border bg-warning-bg text-warning-text',
	},
	pending: {
		label: 'pending',
		className: 'border-info-border bg-info-bg text-info-text',
	},
	succeeded: {
		label: 'succeeded',
		className: 'border-success-border bg-success-bg text-success-text',
	},
	success: {
		label: 'succeeded',
		className: 'border-success-border bg-success-bg text-success-text',
	},
	completed: {
		label: 'succeeded',
		className: 'border-success-border bg-success-bg text-success-text',
	},
	failed: {
		label: 'failed',
		className: 'border-error-border bg-error-bg text-error-text',
	},
	error: {
		label: 'failed',
		className: 'border-error-border bg-error-bg text-error-text',
	},
};

function formatRelativeDate(value) {
	if (!value) {
		return 'N/A';
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return 'N/A';
	}

	const now = new Date();
	const diffMs = Math.max(0, now.getTime() - date.getTime());
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays === 0) {
		return 'today';
	}

	if (diffDays === 1) {
		return '1 day ago';
	}

	if (diffDays < 30) {
		return `${diffDays} days ago`;
	}

	if (diffDays < 60) {
		return '1 month ago';
	}

	if (diffDays < 365) {
		return `${Math.floor(diffDays / 30)} months ago`;
	}

	return `${Math.floor(diffDays / 365)} years ago`;
}

function formatDateTime(value) {
	if (!value) {
		return 'N/A';
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return 'N/A';
	}

	return date.toLocaleString();
}

function getRiskMeta(score) {
	if (typeof score !== 'number') {
		return {
			label: 'Risk',
			value: '--',
			className: 'border-border bg-background-tertiary text-text-secondary',
		};
	}

	if (score >= 75) {
		return {
			label: 'Critical Risk',
			value: `${score}%`,
			className: 'border-error-border bg-error-bg text-error-text',
		};
	}

	if (score >= 50) {
		return {
			label: 'High Risk',
			value: `${score}%`,
			className: 'border-warning-border bg-warning-bg text-warning-text',
		};
	}

	if (score >= 25) {
		return {
			label: 'Medium Risk',
			value: `${score}%`,
			className: 'border-info-border bg-info-bg text-info-text',
		};
	}

	return {
		label: 'Low Risk',
		value: `${score}%`,
		className: 'border-success-border bg-success-bg text-success-text',
	};
}

function getThreatsMeta(threatsCount) {
	if (typeof threatsCount !== 'number') {
		return {
			label: 'Threats',
			value: '--',
			className: 'border-border bg-background-tertiary text-text-secondary',
		};
	}

	if (threatsCount > 0) {
		return {
			label: 'Threats',
			value: String(threatsCount),
			className: 'border-error-border bg-error-bg text-error-text',
		};
	}

	return {
		label: 'Threats',
		value: String(threatsCount),
		className: 'border-success-border bg-success-bg text-success-text',
	};
}

function StatItem({ value, label, className }) {
	return (
		<div className={[
			'flex min-w-[78px] flex-col items-center rounded border px-3 py-2',
			className,
		].join(' ')}>
			<div className="text-body font-semibold">{value}</div>
			<div className="text-[10px] uppercase tracking-wide text-text-secondary">{label}</div>
		</div>
	);
}

function InfoRow({ icon, label, value }) {
	return (
		<div className="flex items-center justify-between rounded bg-background-tertiary px-3 py-2 text-small-1">
			<span className="flex items-center gap-1.5 text-text-secondary">
				{icon}
				{label}
			</span>
			<span className="font-medium text-text-primary">{value}</span>
		</div>
	);
}

export default function ProjectCard({ project, onDelete }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const menuRef = useRef(null);
	const menuButtonRef = useRef(null);

	const statusKey = (project?.status ?? 'running').toLowerCase();
	const statusTone = STATUS_TONES[statusKey] || STATUS_TONES.running;
	const riskMeta = getRiskMeta(project?.risk_score);
	const threatsMeta = getThreatsMeta(project?.threats_count);

	useEffect(() => {
		if (!isMenuOpen) {
			return undefined;
		}

		function handleMouseDown(event) {
			if (!menuRef.current || menuRef.current.contains(event.target)) {
				return;
			}

			if (menuButtonRef.current && menuButtonRef.current.contains(event.target)) {
				return;
			}

			setIsMenuOpen(false);
		}

		document.addEventListener('mousedown', handleMouseDown);
		return () => document.removeEventListener('mousedown', handleMouseDown);
	}, [isMenuOpen]);

	function handleToggleCard(event) {
		if (event.target.closest('[data-no-toggle]')) {
			return;
		}

		setIsExpanded((prev) => !prev);
	}

	function handleDelete(event) {
		event.stopPropagation();
		setIsMenuOpen(false);
		onDelete?.(project);
	}

	return (
		<article
			onClick={handleToggleCard}
			className={[
				'relative cursor-pointer rounded border bg-background-secondary transition-colors',
				isExpanded
					? 'border-border-secondary border-l-2 border-l-brand-primary'
					: 'border-border',
			].join(' ')}
		>
			<div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
				<div className="min-w-0 flex-1">
					<div className="flex min-w-0 items-center gap-3">
						<div className="flex h-9 w-9 items-center justify-center rounded border border-border bg-background-tertiary text-warning">
							<Globe2 size={16} />
						</div>

						<div className="min-w-0">
							<div className="flex flex-wrap items-center gap-2">
								<p className="truncate text-body font-semibold text-text-primary">{project.name}</p>
								<span className={[
									'inline-flex items-center rounded-full border px-2 py-0.5 text-small-1 font-medium',
									statusTone.className,
								].join(' ')}>
									{statusTone.label}
								</span>
							</div>

							<div className="mt-1 flex flex-wrap items-center gap-3 text-small-1 text-text-secondary">
								<span className="inline-flex items-center gap-1">
									<CalendarClock size={12} />
									created {formatRelativeDate(project.created_at)}
								</span>
								<span className="inline-flex items-center gap-1">
									<Clock3 size={12} />
									last scanned {formatRelativeDate(project.last_scanned_at || project.updated_at)}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2" data-no-toggle>
					<StatItem value={riskMeta.value} label={riskMeta.label} className={riskMeta.className} />
					<StatItem value={threatsMeta.value} label={threatsMeta.label} className={threatsMeta.className} />

					<button
						type="button"
						onClick={(event) => {
							event.stopPropagation();
							setIsExpanded((prev) => !prev);
						}}
						className="inline-flex items-center gap-2 rounded border border-brand-primary px-2 py-1 text-body font-semibold text-brand-text transition-colors hover:bg-brand-hover hover:underline"
					>
						View Details
						{isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
					</button>

					<div className="relative" ref={menuRef}>
						<button
							ref={menuButtonRef}
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								setIsMenuOpen((prev) => !prev);
							}}
							className="inline-flex h-8 w-8 items-center justify-center rounded border border-brand-primary text-brand-text transition-colors hover:bg-brand-hover hover:underline"
							aria-label="Project actions"
						>
							<EllipsisVertical size={15} />
						</button>

						{isMenuOpen ? (
							<div className="absolute right-0 top-9 z-20 min-w-[140px] rounded border border-border-secondary bg-background-elevated p-1 shadow-md">
								<button
									type="button"
									onClick={handleDelete}
									disabled={!onDelete}
									className="flex w-full items-center gap-2 rounded border border-brand-primary px-2 py-1.5 text-left text-small-1 text-error transition-colors hover:bg-brand-hover hover:underline disabled:cursor-not-allowed disabled:opacity-50"
								>
									<Trash2 size={13} />
									Delete
								</button>
							</div>
						) : null}
					</div>
				</div>
			</div>

			{isExpanded ? (
				<div className="grid gap-3 border-t border-border p-4 lg:grid-cols-2">
					<section className="rounded border border-border bg-background-secondary p-3">
						<h4 className="mb-2 text-small-1 font-semibold uppercase tracking-wide text-text-secondary">
							Project Details
						</h4>
						<div className="space-y-2">
							<InfoRow icon={<Globe2 size={12} />} label="Project Name" value={project.name} />
							<InfoRow icon={<CalendarClock size={12} />} label="Created At" value={formatDateTime(project.created_at)} />
							<InfoRow icon={<Clock3 size={12} />} label="Last Scan" value={formatDateTime(project.last_scanned_at || project.updated_at)} />
							<InfoRow icon={<AlertTriangle size={12} />} label="Project ID" value={project.id?.slice?.(0, 8) || 'N/A'} />
						</div>
					</section>

					<section className="rounded border border-border bg-background-secondary p-3">
						<h4 className="mb-2 text-small-1 font-semibold uppercase tracking-wide text-text-secondary">
							Repository
						</h4>
						<div className="space-y-2">
							<InfoRow icon={<UserRound size={12} />} label="Owner" value={project.repo_owner || 'N/A'} />
							<InfoRow icon={<FolderGit2 size={12} />} label="Repository" value={project.repo_name || 'N/A'} />
							<InfoRow icon={<GitBranch size={12} />} label="Branch" value={project.branch || 'N/A'} />
						</div>
					</section>
				</div>
			) : null}
		</article>
	);
}
