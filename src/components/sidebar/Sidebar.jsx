import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import { Check } from "lucide-react";

/* ────────────────────────────────────────────────────────────────── */
/*  Projects list (client only)                                      */
/* ────────────────────────────────────────────────────────────────── */
function ProjectsList({
  projects,
  selectedProjectId,
  onSelectProject,
  onAddProject,
}) {
  return (
    <div className="px-2 py-3 border-b border-border-default">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 mx-2.5">
        <span className="text-body font-semibold tracking-wider text-text-tertiary">
          Projects
        </span>
        <button
          onClick={onAddProject}
          className="flex items-center justify-center rounded text-text-tertiary hover:bg-background-hover hover:text-text-primary transition-colors"
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
                                w-full text-left rounded-md px-2.5 py-1.5 text-body truncate transition-colors flex items-center justify-between
                                ${
                                  project.id === selectedProjectId
                                    ? "bg-none text-text-brand font-semibold"
                                    : "text-text-secondary hover:bg-background-hover hover:text-text-primary"
                                }
                            `}
            >
              <span className="truncate">{project.name}</span>
              {project.id === selectedProjectId && (
                <Check size={14} strokeWidth={2} className="shrink-0 ml-2" />
              )}
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
    <div className="border-b border-border-default px-2 py-3">
      {/* Section header */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
                    flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-body font-semibold transition-colors
                    ${
                      hasActivePage
                        ? "text-text-primary"
                        : "text-text-primary hover:bg-background-hover hover:text-text-primary"
                    }
                `}
      >
        <SectionIcon size={16} strokeWidth={2} className="shrink-0" />
        <span className="flex-1 text-left truncate">{section.title}</span>
        {isOpen ? (
          <ChevronDown
            size={14}
            strokeWidth={2}
            className="shrink-0 text-text-tertiary"
          />
        ) : (
          <ChevronRight
            size={14}
            strokeWidth={2}
            className="shrink-0 text-text-tertiary"
          />
        )}
      </button>

      {/* Pages list */}
      {isOpen && (
        <ul className="mt-0.5 space-y-0.5">
          {section.pages.map((page) => {
            const fullPath = `${basePath}${page.path}`;
            return (
              <li key={page.key}>
                <NavLink
                  to={fullPath}
                  end
                  className={({ isActive }) => `
                                        flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-body transition-colors
                                        ${
                                          isActive
                                            ? "bg-background-selected text-text-brand font-medium"
                                            : "text-text-secondary hover:bg-background-hover hover:text-text-primary"
                                        }
                                    `}
                >
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
  brandName = "RefactorIQ",
  lastScanLabel = "Last scan: Feb 10, 2026 14:23",
  roleLabel = "Admin",
  showSearch = true,
  repoItems = [
    "src",
    "Architecture",
    "services",
    "Scans",
    "core",
    "Refactor Queue",
    "utils",
  ],
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredRepoItems = useMemo(() => {
    if (!normalizedSearch) return repoItems;
    return repoItems.filter((item) =>
      item.toLowerCase().includes(normalizedSearch),
    );
  }, [normalizedSearch, repoItems]);

  const filteredSections = useMemo(() => {
    if (!normalizedSearch) return sections;
    return sections
      .map((section) => {
        const sectionMatch = section.title
          .toLowerCase()
          .includes(normalizedSearch);
        if (sectionMatch) return section;

        const filteredPages = section.pages.filter((page) =>
          page.label.toLowerCase().includes(normalizedSearch),
        );

        if (!filteredPages.length) return null;
        return { ...section, pages: filteredPages };
      })
      .filter(Boolean);
  }, [normalizedSearch, sections]);

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
                    fixed top-12 left-0 z-30 h-[calc(100vh-3rem)] w-80
                    border-r border-border-default bg-background-secondary
                    transform transition-transform duration-200 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
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

        {/* ── Header ── */}
        <div className="px-4 pt-3 pb-4 border-b border-border-default">
          <div className="flex items-center justify-between">
            <div className="text-[0.95rem] font-semibold text-text-primary">
              {brandName}
            </div>
            <span className="text-[0.75rem] px-2 py-0.5 rounded-full bg-background-hover text-text-tertiary">
              {roleLabel}
            </span>
          </div>
          <div className="mt-1 text-[0.75rem] text-text-tertiary">
            {lastScanLabel}
          </div>

          {showSearch && (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-md border border-border-default bg-background-primary px-3 py-2 text-[0.8rem] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-text-brand"
              />
            </div>
          )}
        </div>

        {/* ── Repository Explorer ── */}
        <div className="border-b border-border-default px-4 py-3">
          <div className="text-[0.8rem] font-semibold text-text-tertiary tracking-wide">
            Repository Explorer
          </div>
          <ul className="mt-2 space-y-1">
            {filteredRepoItems.map((item) => (
              <li
                key={item}
                className="rounded-md px-2 py-1 text-[0.85rem] text-text-secondary hover:bg-background-hover hover:text-text-primary"
              >
                {item}
              </li>
            ))}
            {filteredRepoItems.length === 0 && (
              <li className="rounded-md px-2 py-1 text-[0.8rem] text-text-tertiary">
                No files found
              </li>
            )}
          </ul>
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
        <nav className="flex-1 overflow-y-auto space-y-1">
          {filteredSections.map((section, idx) => (
            <NavSection
              key={section.key}
              section={section}
              basePath={basePath}
              defaultOpen={idx === 0 || Boolean(normalizedSearch)}
            />
          ))}
          {filteredSections.length === 0 && (
            <div className="px-4 py-3 text-[0.82rem] text-text-tertiary">
              No navigation items match your search.
            </div>
          )}
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
