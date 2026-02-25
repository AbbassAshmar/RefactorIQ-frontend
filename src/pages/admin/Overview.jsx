import { useMemo, useState } from "react";

const METRIC_CARDS = [
  {
    label: "Risk Trend Score",
    value: "62",
    change: "8% Improved from 70 last week",
  },
];

const TOP_FILES = [
  {
    rank: 1,
    file: "UserAuthService.ts",
    score: 94,
    blastRadius: 127,
    churn: 42,
    duplicates: 8,
    priority: "Critical",
    path: "src/services/auth",
  },
  {
    rank: 2,
    file: "PaymentProcessor.ts",
    score: 89,
    blastRadius: 93,
    churn: 38,
    duplicates: 5,
    priority: "Critical",
    path: "src/core/payment",
  },
  {
    rank: 3,
    file: "DataValidator.ts",
    score: 86,
    blastRadius: 156,
    churn: 31,
    duplicates: 12,
    priority: "High",
    path: "src/utils/validation",
  },
  {
    rank: 4,
    file: "QueryBuilder.ts",
    score: 82,
    blastRadius: 84,
    churn: 29,
    duplicates: 6,
    priority: "High",
    path: "src/database/query",
  },
  {
    rank: 5,
    file: "CacheManager.ts",
    score: 79,
    blastRadius: 71,
    churn: 25,
    duplicates: 4,
    priority: "High",
    path: "src/infrastructure/cache",
  },
  {
    rank: 6,
    file: "NotificationService.ts",
    score: 75,
    blastRadius: 62,
    churn: 22,
    duplicates: 7,
    priority: "Medium",
    path: "src/services/notification",
  },
  {
    rank: 7,
    file: "ReportGenerator.ts",
    score: 72,
    blastRadius: 48,
    churn: 19,
    duplicates: 3,
    priority: "Medium",
    path: "src/features/reports",
  },
  {
    rank: 8,
    file: "ConfigLoader.ts",
    score: 68,
    blastRadius: 89,
    churn: 15,
    duplicates: 2,
    priority: "Medium",
    path: "src/core/config",
  },
  {
    rank: 9,
    file: "EventEmitter.ts",
    score: 65,
    blastRadius: 103,
    churn: 18,
    duplicates: 5,
    priority: "Medium",
    path: "src/infrastructure/events",
  },
  {
    rank: 10,
    file: "StringFormatter.ts",
    score: 63,
    blastRadius: 134,
    churn: 12,
    duplicates: 9,
    priority: "Medium",
    path: "src/utils/formatting",
  },
];

const AI_RECOMMENDATIONS = [
  {
    file: "UserAuthService.ts",
    confidence: "95%",
    insight:
      "Critical complexity with high blast radius. Recently modified 8 times.",
    impact: "High Impact",
  },
  {
    file: "DataValidator.ts",
    confidence: "88%",
    insight: "Contains 12 duplicate code blocks affecting 156 dependent files.",
    impact: "High Impact",
  },
  {
    file: "QueryBuilder.ts",
    confidence: "82%",
    insight: "Frequent changes (29 commits) suggest unstable design patterns.",
    impact: "Medium Impact",
  },
];

export default function AdminOverview() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("score");
  const [selectedFileName, setSelectedFileName] = useState(TOP_FILES[0].file);

  const riskDistribution = useMemo(
    () => ({
      Critical: TOP_FILES.filter((item) => item.priority === "Critical").length,
      High: TOP_FILES.filter((item) => item.priority === "High").length,
      Medium: TOP_FILES.filter((item) => item.priority === "Medium").length,
      Low: TOP_FILES.filter((item) => item.priority === "Low").length,
    }),
    [],
  );

  const filteredFiles = useMemo(() => {
    const query = search.trim().toLowerCase();
    const byQuery = TOP_FILES.filter((item) => {
      if (!query) return true;
      return (
        item.file.toLowerCase().includes(query) ||
        item.path.toLowerCase().includes(query)
      );
    });

    const byPriority =
      priorityFilter === "All"
        ? byQuery
        : byQuery.filter((item) => item.priority === priorityFilter);

    const sorted = [...byPriority].sort((left, right) => {
      if (sortBy === "blastRadius") return right.blastRadius - left.blastRadius;
      if (sortBy === "churn") return right.churn - left.churn;
      if (sortBy === "duplicates") return right.duplicates - left.duplicates;
      return right.score - left.score;
    });

    return sorted;
  }, [priorityFilter, search, sortBy]);

  const selectedFile =
    TOP_FILES.find((item) => item.file === selectedFileName) ?? TOP_FILES[0];

  const selectedRecommendation =
    AI_RECOMMENDATIONS.find((item) => item.file === selectedFile.file) ?? null;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <header className="space-y-2">
        <p className="text-[0.85rem] text-text-tertiary">Overview</p>
        <h1 className="text-[1.4rem] font-semibold text-text-primary">
          Executive snapshot — Where should we refactor next?
        </h1>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {METRIC_CARDS.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border-default bg-surface-default p-4 shadow-sm"
          >
            <div className="text-[0.82rem] text-text-tertiary">
              {card.label}
            </div>
            <div className="mt-2 text-[1.6rem] font-semibold text-text-primary">
              {card.value}
            </div>
            {card.change && (
              <div className="mt-2 text-[0.82rem] text-text-secondary">
                {card.change}
              </div>
            )}
          </div>
        ))}

        <div className="rounded-xl border border-border-default bg-surface-default p-4 shadow-sm">
          <div className="text-[0.82rem] text-text-tertiary">
            Risk Distribution
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {Object.entries(riskDistribution).map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg bg-background-secondary p-3"
              >
                <div className="text-[0.75rem] text-text-tertiary">{label}</div>
                <div className="mt-1 text-[1.05rem] font-semibold text-text-primary">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border-default bg-surface-default p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[1.05rem] font-semibold text-text-primary">
              Top 10 Files to Refactor Next Sprint
            </h2>
            <p className="text-[0.85rem] text-text-tertiary">
              Ranked by refactor priority score
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search file or path"
              className="w-full sm:w-56 rounded-md border border-border-default bg-background-primary px-3 py-2 text-[0.82rem] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-text-brand"
            />
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              className="rounded-md border border-border-default bg-background-primary px-2.5 py-2 text-[0.82rem] text-text-primary focus:outline-none focus:ring-2 focus:ring-text-brand"
            >
              <option value="All">All priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-md border border-border-default bg-background-primary px-2.5 py-2 text-[0.82rem] text-text-primary focus:outline-none focus:ring-2 focus:ring-text-brand"
            >
              <option value="score">Sort: Score</option>
              <option value="blastRadius">Sort: Blast Radius</option>
              <option value="churn">Sort: Churn</option>
              <option value="duplicates">Sort: Duplicates</option>
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[780px] w-full border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-[0.78rem] uppercase tracking-wide text-text-tertiary">
                <th className="border-b border-border-default px-2 py-2">
                  Rank
                </th>
                <th className="border-b border-border-default px-2 py-2">
                  File
                </th>
                <th className="border-b border-border-default px-2 py-2">
                  Score
                </th>
                <th className="border-b border-border-default px-2 py-2">
                  Blast Radius
                </th>
                <th className="border-b border-border-default px-2 py-2">
                  Churn
                </th>
                <th className="border-b border-border-default px-2 py-2">
                  Duplicates
                </th>
                <th className="border-b border-border-default px-2 py-2">
                  Priority
                </th>
                <th className="border-b border-border-default px-2 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((row) => (
                <tr
                  key={row.file}
                  className={`text-[0.85rem] text-text-secondary cursor-pointer ${
                    row.file === selectedFileName
                      ? "bg-background-secondary"
                      : ""
                  }`}
                  onClick={() => setSelectedFileName(row.file)}
                >
                  <td className="border-b border-border-default px-2 py-2">
                    #{row.rank}
                  </td>
                  <td className="border-b border-border-default px-2 py-2">
                    <div className="text-text-primary font-medium">
                      {row.file}
                    </div>
                    <div className="text-[0.75rem] text-text-tertiary">
                      {row.path}
                    </div>
                  </td>
                  <td className="border-b border-border-default px-2 py-2">
                    {row.score}
                  </td>
                  <td className="border-b border-border-default px-2 py-2">
                    {row.blastRadius}
                  </td>
                  <td className="border-b border-border-default px-2 py-2">
                    {row.churn}
                  </td>
                  <td className="border-b border-border-default px-2 py-2">
                    {row.duplicates}
                  </td>
                  <td className="border-b border-border-default px-2 py-2">
                    <span className="inline-flex rounded-full bg-background-hover px-2 py-0.5 text-[0.72rem] text-text-secondary">
                      {row.priority}
                    </span>
                  </td>
                  <td className="border-b border-border-default px-2 py-2">
                    <button
                      type="button"
                      onClick={() => setSelectedFileName(row.file)}
                      className="text-[0.82rem] font-semibold text-text-brand hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredFiles.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-2 py-6 text-center text-[0.85rem] text-text-tertiary"
                  >
                    No files match your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-lg border border-border-default bg-background-secondary p-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-[0.95rem] font-semibold text-text-primary">
              Selected file: {selectedFile.file}
            </h3>
            <span className="text-[0.78rem] text-text-tertiary">
              {selectedFile.path}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-md bg-surface-default p-2">
              <div className="text-[0.72rem] text-text-tertiary">Score</div>
              <div className="text-[0.95rem] font-semibold text-text-primary">
                {selectedFile.score}
              </div>
            </div>
            <div className="rounded-md bg-surface-default p-2">
              <div className="text-[0.72rem] text-text-tertiary">
                Blast Radius
              </div>
              <div className="text-[0.95rem] font-semibold text-text-primary">
                {selectedFile.blastRadius}
              </div>
            </div>
            <div className="rounded-md bg-surface-default p-2">
              <div className="text-[0.72rem] text-text-tertiary">Churn</div>
              <div className="text-[0.95rem] font-semibold text-text-primary">
                {selectedFile.churn}
              </div>
            </div>
            <div className="rounded-md bg-surface-default p-2">
              <div className="text-[0.72rem] text-text-tertiary">
                Duplicates
              </div>
              <div className="text-[0.95rem] font-semibold text-text-primary">
                {selectedFile.duplicates}
              </div>
            </div>
          </div>
          {selectedRecommendation && (
            <p className="mt-3 text-[0.82rem] text-text-secondary">
              {selectedRecommendation.insight}
            </p>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-border-default bg-surface-default p-4 shadow-sm">
        <h2 className="text-[1.05rem] font-semibold text-text-primary">
          AI Recommendations
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {AI_RECOMMENDATIONS.map((item) => (
            <article
              key={item.file}
              className={`rounded-lg border border-border-default bg-background-secondary p-3 cursor-pointer ${
                item.file === selectedFileName ? "ring-1 ring-text-brand" : ""
              }`}
              onClick={() => setSelectedFileName(item.file)}
            >
              <div className="flex items-center justify-between">
                <div className="text-[0.9rem] font-semibold text-text-primary">
                  {item.file}
                </div>
                <span className="text-[0.75rem] text-text-tertiary">
                  {item.confidence}
                </span>
              </div>
              <p className="mt-2 text-[0.8rem] text-text-secondary">
                {item.insight}
              </p>
              <div className="mt-3 text-[0.75rem] font-semibold text-text-brand">
                {item.impact}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
