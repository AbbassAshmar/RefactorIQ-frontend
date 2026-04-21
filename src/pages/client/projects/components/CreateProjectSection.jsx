import { useMemo, useState } from 'react';
import { ChevronDown, FolderGit2, GitBranch, Loader2 } from 'lucide-react';
import { useCreateProject, useGithubRepositories, useRepositoryBranches } from '@/hooks';


const STATUS_CLASS_MAP = {
	running: 'border-warning-border bg-warning-bg text-warning-text',
	pending: 'border-info-border bg-info-bg text-info-text',
	succeeded: 'border-success-border bg-success-bg text-success-text',
	success: 'border-success-border bg-success-bg text-success-text',
	completed: 'border-success-border bg-success-bg text-success-text',
	failed: 'border-error-border bg-error-bg text-error-text',
	error: 'border-error-border bg-error-bg text-error-text',
};

function getStatusBadgeClasses(status) {
	if (!status) {
		return STATUS_CLASS_MAP.running;
	}

	return STATUS_CLASS_MAP[status.toLowerCase()] || STATUS_CLASS_MAP.running;
}

function getServerMessage(error) {
	return (
		error?.response?.data?.error?.message
		|| error?.message
		|| 'Request failed. Please try again.'
	);
}

function getServerFieldErrors(error) {
	const fields = error?.response?.data?.error?.details?.fields;
	if (!fields || typeof fields !== 'object') {
		return {};
	}

	return Object.entries(fields).reduce((acc, [key, value]) => {
		if (Array.isArray(value) && value.length > 0) {
			acc[key] = String(value[0]);
		}

		if (typeof value === 'string') {
			acc[key] = value;
		}

		return acc;
	}, {});
}

function buildEmptyErrors() {
	return {
		name: '',
		repository: '',
		branch: '',
		form: '',
	};
}

export default function CreateProjectSection({
	currentProject,
	projectCount,
	maxProjects = 5,
}) {
	const [projectName, setProjectName] = useState('');
	const [isExpanded, setIsExpanded] = useState(false);
	const [selectedRepository, setSelectedRepository] = useState('');
	const [selectedBranch, setSelectedBranch] = useState('');
	const [errors, setErrors] = useState(() => buildEmptyErrors());

	const canCreateProject = projectCount < maxProjects;

	const repositoriesQuery = useGithubRepositories({
		enabled: isExpanded && canCreateProject,
	});

	const repositories = useMemo(() => {
		const items = repositoriesQuery.data?.data?.repositories;
		return Array.isArray(items) ? items : [];
	}, [repositoriesQuery.data]);

	const selectedRepositoryData = useMemo(
		() => repositories.find((repo) => repo.full_name === selectedRepository) ?? null,
		[repositories, selectedRepository],
	);

	const branchesQuery = useRepositoryBranches(
		selectedRepositoryData?.owner,
		selectedRepositoryData?.name,
		{
			enabled: isExpanded && canCreateProject && Boolean(selectedRepositoryData),
		},
	);

	const branches = useMemo(() => {
		const items = branchesQuery.data?.data?.branches;
		return Array.isArray(items) ? items : [];
	}, [branchesQuery.data]);

	const createProjectMutation = useCreateProject({
		onSuccess: () => {
			setProjectName('');
			setIsExpanded(false);
			setSelectedRepository('');
			setSelectedBranch('');
			setErrors(buildEmptyErrors());
		},
		onError: (error) => {
			const fieldErrors = getServerFieldErrors(error);
			setErrors({
				name: fieldErrors.name || '',
				repository: fieldErrors.repo_owner || fieldErrors.repo_name || '',
				branch: fieldErrors.branch || '',
				form: getServerMessage(error),
			});
		},
	});

	function handleExpand() {
		if (!canCreateProject) {
			setErrors((prev) => ({
				...prev,
				form: `You reached your projects limit (${maxProjects}/${maxProjects}).`,
			}));
			return;
		}

		const trimmedName = projectName.trim();
		if (!trimmedName) {
			setErrors((prev) => ({
				...prev,
				name: 'Project name is required.',
				form: '',
			}));
			return;
		}

		if (trimmedName.length < 2) {
			setErrors((prev) => ({
				...prev,
				name: 'Project name should be at least 2 characters.',
				form: '',
			}));
			return;
		}

		setErrors((prev) => ({
			...prev,
			name: '',
			form: '',
		}));
		setIsExpanded(true);
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (!canCreateProject || createProjectMutation.isPending) {
			return;
		}

		const validationErrors = buildEmptyErrors();
		const trimmedName = projectName.trim();

		if (!trimmedName) {
			validationErrors.name = 'Project name is required.';
		}

		if (!selectedRepositoryData) {
			validationErrors.repository = 'Repository is required.';
		}

		if (!selectedBranch) {
			validationErrors.branch = 'Branch is required.';
		}

		const hasValidationError = Object.values(validationErrors).some(Boolean);
		if (hasValidationError) {
			setErrors(validationErrors);
			return;
		}

		setErrors(buildEmptyErrors());
		createProjectMutation.mutate({
			name: trimmedName,
			repo_owner: selectedRepositoryData.owner,
			repo_name: selectedRepositoryData.name,
			branch: selectedBranch,
		});
	}

	function handleProjectNameKeyDown(event) {
		if (event.key === 'Enter' && !isExpanded) {
			event.preventDefault();
			handleExpand();
		}
	}

	function handleRepositoryChange(event) {
		const repositoryValue = event.target.value;
		setSelectedRepository(repositoryValue);

		const repositoryData = repositories.find((repo) => repo.full_name === repositoryValue);
		setSelectedBranch(repositoryData?.default_branch || '');

		setErrors((prev) => ({
			...prev,
			repository: '',
			branch: '',
			form: '',
		}));
	}

	const currentProjectStatus = currentProject?.status ?? 'running';

	return (
		<section
			className="rounded-xl border border-border bg-background-secondary px-4 py-10 shadow-sm md:px-10"
			style={{
				backgroundImage: 'radial-gradient(circle at top, var(--brand-primary-bg), transparent 62%)',
			}}
		>
			<div className="mx-auto flex max-w-3xl flex-col items-center">
				<h1 className="text-center text-h4 font-semibold text-text-primary md:text-h3">
					Add a New Project
				</h1>

				<p className="mt-2 text-center text-body text-text-secondary">
					Connect your GitHub repository and start tracking your project's performance.
				</p>

				<form onSubmit={handleSubmit} className="mt-8 w-full space-y-8">
					<div>
						<label
							htmlFor="project-name"
							className="mb-2 block text-center text-small-1 text-text-secondary"
						>
							Project Name
						</label>

						<div className="flex flex-col gap-3 md:flex-row md:items-start">
							<div className="w-full flex-1">
								<input
									id="project-name"
									type="text"
									value={projectName}
									onChange={(event) => {
										setProjectName(event.target.value);
										if (errors.name || errors.form) {
											setErrors((prev) => ({ ...prev, name: '', form: '' }));
										}
									}}
									onKeyDown={handleProjectNameKeyDown}
									disabled={!canCreateProject || createProjectMutation.isPending}
									placeholder="First Project"
									className="w-full rounded-md border border-border bg-background-primary px-3 py-2.5 text-body text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-border-focus"
								/>

								{errors.name ? (
									<p className="mt-1 text-small-1 text-error-default">{errors.name}</p>
								) : null}
							</div>

							<button
								type="button"
								onClick={handleExpand}
								disabled={!projectName.trim() || !canCreateProject || createProjectMutation.isPending}
								className="rounded-md bg-brand-primary px-5 py-2.5 text-body font-semibold text-text-inverse transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-background-tertiary disabled:text-text-disabled"
							>
								Next
							</button>
						</div>
					</div>

					{isExpanded ? (
						<div className="space-y-4">
							<div className="border-t border-border pt-3 text-center text-small-1 text-text-secondary">
								Project Details
							</div>

							<div className="grid gap-3 md:grid-cols-2">
								<div>
									<label
										htmlFor="project-repository"
										className="mb-1.5 block text-small-1 text-text-secondary"
									>
										Repository
									</label>

									<div className="relative">
										<FolderGit2
											size={14}
											className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
										/>

										<select
											id="project-repository"
											value={selectedRepository}
											onChange={handleRepositoryChange}
											disabled={repositoriesQuery.isLoading || createProjectMutation.isPending}
											className="w-full appearance-none rounded-md border border-border bg-background-primary py-2.5 pl-9 pr-9 text-body text-text-primary outline-none transition-colors focus:border-border-focus disabled:cursor-not-allowed disabled:text-text-disabled"
										>
											<option value="">Select a repository</option>
											{repositories.map((repo) => (
												<option key={repo.full_name} value={repo.full_name}>
													{repo.full_name}
												</option>
											))}
										</select>

										{repositoriesQuery.isLoading ? (
											<Loader2
												size={14}
												className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-text-secondary"
											/>
										) : (
											<ChevronDown
												size={14}
												className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
											/>
										)}
									</div>

									{repositoriesQuery.isError ? (
										<p className="mt-1 text-small-1 text-error-default">
											{getServerMessage(repositoriesQuery.error)}
										</p>
									) : null}

									{errors.repository ? (
										<p className="mt-1 text-small-1 text-error-default">{errors.repository}</p>
									) : null}
								</div>

								<div>
									<label
										htmlFor="project-branch"
										className="mb-1.5 block text-small-1 text-text-secondary"
									>
										Branch
									</label>

									<div className="relative">
										<GitBranch
											size={14}
											className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
										/>

										<select
											id="project-branch"
											value={selectedBranch}
											onChange={(event) => {
												setSelectedBranch(event.target.value);
												if (errors.branch || errors.form) {
													setErrors((prev) => ({ ...prev, branch: '', form: '' }));
												}
											}}
											disabled={!selectedRepositoryData || branchesQuery.isLoading || createProjectMutation.isPending}
											className="w-full appearance-none rounded-md border border-border bg-background-primary py-2.5 pl-9 pr-9 text-body text-text-primary outline-none transition-colors focus:border-border-focus disabled:cursor-not-allowed disabled:text-text-disabled"
										>
											<option value="">Select a branch</option>
											{branches.map((branch) => (
												<option key={branch.name} value={branch.name}>
													{branch.name}
												</option>
											))}
										</select>

										{branchesQuery.isLoading ? (
											<Loader2
												size={14}
												className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-text-secondary"
											/>
										) : (
											<ChevronDown
												size={14}
												className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
											/>
										)}
									</div>

									{branchesQuery.isError ? (
										<p className="mt-1 text-small-1 text-error-default">
											{getServerMessage(branchesQuery.error)}
										</p>
									) : null}

									{errors.branch ? (
										<p className="mt-1 text-small-1 text-error-default">{errors.branch}</p>
									) : null}
								</div>
							</div>

							<button
								type="submit"
								disabled={!canCreateProject || createProjectMutation.isPending}
								className="w-full rounded-md bg-brand-primary px-4 py-2.5 text-body font-semibold text-text-inverse transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-background-tertiary disabled:text-text-disabled"
							>
								{createProjectMutation.isPending ? 'Adding...' : 'Add'}
							</button>
						</div>
					) : null}

					{errors.form ? (
						<p className="text-center text-small-1 text-error-default">{errors.form}</p>
					) : null}

					{!canCreateProject ? (
						<p className="text-center text-small-1 text-warning-default">
							You reached the maximum number of projects ({maxProjects}).
						</p>
					) : null}
				</form>

				<div className="mt-8 flex items-center gap-2 text-body">
					<span className="text-text-secondary">Current Project:</span>
					{currentProject ? (
						<span
							className={[
								'inline-flex items-center rounded-full border px-2.5 py-1 text-small-1 font-medium',
								getStatusBadgeClasses(currentProjectStatus),
							].join(' ')}
						>
							{currentProject.name}
						</span>
					) : (
						<span className="rounded-full border border-border bg-background-tertiary px-2.5 py-1 text-small-1 text-text-secondary">
							No project yet
						</span>
					)}
				</div>
			</div>
		</section>
	);
}
