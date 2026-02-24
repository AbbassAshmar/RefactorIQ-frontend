import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Plus, X } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────── */
/*  Projects list (client only)                                      */
/* ────────────────────────────────────────────────────────────────── */
function ProjectsList({ projects, selectedProjectId, onSelectProject, onAddProject }) {
    return (
        <div className="px-3 py-3 border-b border-border-default">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-small-2 font-semibold uppercase tracking-wider text-text-tertiary">
                    Projects
                </span>
                <button
                    onClick={onAddProject}
                    className="flex h-5 w-5 items-center justify-center rounded text-text-tertiary hover:bg-background-hover hover:text-text-primary transition-colors"
                    aria-label="Add project"
                >
                    <Plus size={12} strokeWidth={2.5} />
                </button>
            </div>

            {/* List */}
            <ul className="space-y-0.5">
                {projects.map((project) => (
                    <li key={project.id}>
                        <button
                            onClick={() => onSelectProject(project.id)}
                            className={`
                                w-full text-left rounded-md px-2.5 py-1.5 text-small-1 truncate transition-colors
                                ${project.id === selectedProjectId
                                    ? 'bg-background-selected text-text-brand font-semibold'
                                    : 'text-text-secondary hover:bg-background-hover hover:text-text-primary'
                                }
                            `}
                        >
                            {project.name}
                        </button>
                    </li>
                ))}

                {projects.length === 0 && (
                    <li className="px-2.5 py-2 text-small-2 text-text-disabled italic">
                        No projects yet
                    </li>
                )}
            </ul>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Collapsible nav section                                          */
/* ────────────────────────────────────────────────────────────────── */
function NavSection({ section, basePath, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const { pathname } = useLocation();
    const SectionIcon = section.icon;

    const hasActivePage = section.pages.some(
        (page) => pathname === `${basePath}${page.path}`,
    );

    return (
        <div>
            {/* Section header */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={`
                    flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-small-1 font-semibold transition-colors
                    ${hasActivePage
                        ? 'text-text-primary'
                        : 'text-text-secondary hover:bg-background-hover hover:text-text-primary'
                    }
                `}
            >
                <SectionIcon size={16} strokeWidth={2} className="shrink-0" />
                <span className="flex-1 text-left truncate">{section.title}</span>
                {isOpen
                    ? <ChevronDown size={14} strokeWidth={2} className="shrink-0 text-text-tertiary" />
                    : <ChevronRight size={14} strokeWidth={2} className="shrink-0 text-text-tertiary" />
                }
            </button>

            {/* Pages list */}
            {isOpen && (
                <ul className="mt-0.5 space-y-0.5 pl-4">
                    {section.pages.map((page) => {
                        const fullPath = `${basePath}${page.path}`;
                        const PageIcon = page.icon;
                        return (
                            <li key={page.key}>
                                <NavLink
                                    to={fullPath}
                                    end
                                    className={({ isActive }) => `
                                        flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-small-1 transition-colors
                                        ${isActive
                                            ? 'bg-background-selected text-text-brand font-medium'
                                            : 'text-text-secondary hover:bg-background-hover hover:text-text-primary'
                                        }
                                    `}
                                >
                                    <PageIcon size={14} strokeWidth={2} className="shrink-0" />
                                    <span className="truncate">{page.label}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Main Sidebar                                                     */
/* ────────────────────────────────────────────────────────────────── */
export default function Sidebar({
    isOpen,
    onClose,
    sections,
    basePath,
    showProjects = false,
    projects = [],
    selectedProjectId = null,
    onSelectProject = () => {},
    onAddProject = () => {},
}) {
    return (
        <>
            {/* ── Overlay ── */}
            {isOpen && (
                <div
                    className="fixed inset-0 top-12 z-30 bg-background-overlay transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* ── Sidebar panel ── */}
            <aside
                className={`
                    fixed top-12 left-0 z-30 h-[calc(100vh-3rem)] w-64
                    border-r border-border-default bg-background-secondary
                    transform transition-transform duration-200 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    flex flex-col
                `}
            >
                {/* Close button (mobile-friendly) */}
                <div className="flex items-center justify-end px-3 py-2 sm:hidden">
                    <button
                        onClick={onClose}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-text-secondary hover:bg-background-hover hover:text-text-primary transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X size={16} strokeWidth={2} />
                    </button>
                </div>

                {/* ── Projects list (client only) ── */}
                {showProjects && (
                    <ProjectsList
                        projects={projects}
                        selectedProjectId={selectedProjectId}
                        onSelectProject={onSelectProject}
                        onAddProject={onAddProject}
                    />
                )}

                {/* ── Navigation sections ── */}
                <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
                    {sections.map((section, idx) => (
                        <NavSection
                            key={section.key}
                            section={section}
                            basePath={basePath}
                            defaultOpen={idx === 0}
                        />
                    ))}
                </nav>

                {/* ── Dock navigation footer ── */}
                <div className="border-t border-border-default px-4 py-3">
                    <span className="text-small-2 text-text-disabled select-none">
                        Dock navigation
                    </span>
                </div>
            </aside>
        </>
    );
}
