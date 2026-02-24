import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthenticatedNavbar } from '@/components/navbar';
import { Sidebar, CLIENT_NAV_SECTIONS } from '@/components/sidebar';

const DEMO_PROJECTS = [
    { id: '1', name: 'refactoriq-frontend' },
    { id: '2', name: 'refactoriq-backend' },
];

export default function ClientLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(DEMO_PROJECTS[0]?.id ?? null);

    function handleToggleSidebar() {
        setSidebarOpen((prev) => !prev);
    }

    function handleCloseSidebar() {
        setSidebarOpen(false);
    }

    function handleSelectProject(id) {
        setSelectedProjectId(id);
        // TODO: update app-level project context / query param
    }

    function handleAddProject() {
        // TODO: open project creation modal
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
                projects={DEMO_PROJECTS}
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
