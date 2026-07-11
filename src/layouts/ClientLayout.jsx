import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthenticatedNavbar } from '@/components/navbar';
import { Sidebar, CLIENT_NAV_SECTIONS } from '@/components/sidebar';
import { useSelectedProject, useSelectedScan } from '@/hooks';

export default function ClientLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { search } = useLocation();
    const { projects, selectedProjectId, selectProject, isLoading: projectsLoading } = useSelectedProject();
    useSelectedScan();

    function handleToggleSidebar() {
        setSidebarOpen((prev) => !prev);
    }

    function handleCloseSidebar() {
        setSidebarOpen(false);
    }

    function handleSelectProject(id) {
        selectProject(id);
        setSidebarOpen(false);
    }

    function handleAddProject() {
        navigate(`/dashboard/projects${search}`);
        setSidebarOpen(false);
    }

    return (
        <div className="min-h-screen bg-background-primary text-text-primary">
            <AuthenticatedNavbar onToggleSidebar={handleToggleSidebar} />

            <Sidebar
                isOpen={sidebarOpen}
                onClose={handleCloseSidebar}
                sections={CLIENT_NAV_SECTIONS}
                basePath="/dashboard"
                showProjects
                projects={projects}
                projectsLoading={projectsLoading}
                selectedProjectId={selectedProjectId}
                onSelectProject={handleSelectProject}
                onAddProject={handleAddProject}
            />

            <main className="min-h-[calc(100vh-3rem)]">
                <Outlet />
            </main>
        </div>
    );
}
