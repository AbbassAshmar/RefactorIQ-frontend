import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProjectsList } from '@/hooks/useProjects';
import { FILE_QUERY_KEY, PROJECT_QUERY_KEY, SCAN_QUERY_KEY } from '@/utils/queryParams';


export default function useSelectedProject() {
    const [searchParams, setSearchParams] = useSearchParams();
    const projectsQuery = useProjectsList();
    const projects = useMemo(() => {
        const items = projectsQuery.data?.data?.projects;
        return Array.isArray(items) ? items : [];
    }, [projectsQuery.data]);
    const requestedProjectId = searchParams.get(PROJECT_QUERY_KEY);
    const selectedProject = projects.find((project) => project.id === requestedProjectId) ?? null;
    const selectedProjectId = selectedProject?.id ?? null;

    useEffect(() => {
        if (projectsQuery.isLoading || projects.length === 0) return;
        if (selectedProject) return;

        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            next.set(PROJECT_QUERY_KEY, projects[0].id);
            next.delete(SCAN_QUERY_KEY);
            next.delete(FILE_QUERY_KEY);
            return next;
        }, { replace: true });
    }, [projects, projectsQuery.isLoading, selectedProject, setSearchParams]);

    const selectProject = useCallback((projectId) => {
        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            if (projectId) next.set(PROJECT_QUERY_KEY, projectId);
            else next.delete(PROJECT_QUERY_KEY);
            next.delete(SCAN_QUERY_KEY);
            next.delete(FILE_QUERY_KEY);
            return next;
        });
    }, [setSearchParams]);

    return {
        projects,
        selectedProject,
        selectedProjectId,
        selectProject,
        isLoading: projectsQuery.isLoading,
        isError: projectsQuery.isError,
        error: projectsQuery.error,
    };
}
