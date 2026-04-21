import { useMemo } from 'react';
import { useProjectsList } from '@/hooks';
import CreateProjectSection from './components/CreateProjectSection';
import YourProjectsSection from './components/YourProjectsSection';


const MAX_PROJECTS = 5;

export default function Projects() {
    const projectsQuery = useProjectsList();

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
            />
        </div>
    );
}
