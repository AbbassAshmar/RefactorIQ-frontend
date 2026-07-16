import { useMemo, useState } from 'react';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import { useDeleteProject, useNotification, useProjectsList } from '@/hooks';
import CreateProjectSection from './components/CreateProjectSection';
import YourProjectsSection from './components/YourProjectsSection';


const MAX_PROJECTS = 5;

export default function Projects() {
    const projectsQuery = useProjectsList();
    const [deleteTarget, setDeleteTarget] = useState(null);
    const { success, failure } = useNotification();
    const deleteProject = useDeleteProject({
        onSuccess: () => {
            success({
                title: 'Project deleted',
                message: 'The project and its scan data were deleted successfully.',
            });
            setDeleteTarget(null);
        },
        onError: (error) => {
            failure({
                title: 'Unable to delete project',
                message: error?.response?.data?.error?.message
                    || 'The project could not be deleted. Please try again.',
            });
        },
    });

    const projects = useMemo(() => {
        const items = projectsQuery.data?.data?.projects;
        return Array.isArray(items) ? items : [];
    }, [projectsQuery.data]);

    const currentProject = projects.length > 0 ? projects[0] : null;

    return (
        <div className="mx-auto flex w-full flex-col gap-6 p-6 max-md:px-4">
            <CreateProjectSection
                currentProject={currentProject}
                projectCount={projects.length}
                maxProjects={MAX_PROJECTS}
            />

            <YourProjectsSection
                projects={projects}
                isLoading={projectsQuery.isLoading || (projectsQuery.isFetching && projects.length === 0)}
                maxProjects={MAX_PROJECTS}
                onDelete={setDeleteTarget}
            />

            <ConfirmationModal
                isOpen={Boolean(deleteTarget)}
                title={`Delete ${deleteTarget?.name || 'this project'}?`}
                confirmLabel="Delete project"
                confirmingLabel="Deleting…"
                variant="danger"
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => deleteTarget && deleteProject.mutate(deleteTarget.id)}
                isConfirming={deleteProject.isPending}
            >
                This permanently deletes the project, all scans and analysis results, visualizations, and refactor-queue items. Any queued or running scan for this project will be stopped.
            </ConfirmationModal>
        </div>
    );
}
