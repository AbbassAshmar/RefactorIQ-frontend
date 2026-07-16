import ProjectCard from './ProjectCard';


export default function YourProjectsSection({
	projects = [],
	isLoading = false,
	maxProjects = 5,
	onDelete,
}) {
	const safeProjects = Array.isArray(projects) ? projects : [];
	const countText = `${safeProjects.length}/${maxProjects}`;

	return (
		<section className="flex flex-col gap-4 pb-8">
			<header className="flex items-start justify-between gap-3">
				<div>
					<h2 className="text-h5 font-semibold text-text-primary">Your Projects</h2>
					<p className="mt-1 text-body text-text-secondary">A list of all your projects</p>
				</div>

				<div className="rounded border border-border bg-background-secondary px-3 py-1.5 text-small-1 font-medium text-text-secondary">
					{countText}
				</div>
			</header>

			<div className="flex flex-col gap-3">
				{isLoading
					? [0, 1, 2].map((skeletonId) => (
						<div
							key={skeletonId}
							className="h-[90px] animate-pulse rounded border border-border bg-background-secondary"
						/>
					))
					: null}

				{!isLoading && safeProjects.length === 0 ? (
					<div className="rounded border border-dashed border-border bg-background-secondary px-4 py-10 text-center text-body text-text-secondary">
						No projects yet. Create one from the section above.
					</div>
				) : null}

				{!isLoading
					? safeProjects.map((project) => (
							<ProjectCard key={project.id} project={project} onDelete={onDelete} />
					))
					: null}
			</div>
		</section>
	);
}
