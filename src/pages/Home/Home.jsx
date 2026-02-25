import "./Home.css";

const riskCards = [
  { label: "Critical", value: 12, tone: "critical" },
  { label: "High", value: 28, tone: "high" },
  { label: "Medium", value: 45, tone: "medium" },
  { label: "Low", value: 89, tone: "low" },
];

const topFiles = [
  {
    rank: "#1",
    file: "UserAuthService.ts",
    score: 94,
    blastRadius: 127,
    churn: 42,
    duplicates: 8,
    priority: "Critical",
    action: "View",
    path: "src/services/auth",
  },
  {
    rank: "#2",
    file: "PaymentProcessor.ts",
    score: 89,
    blastRadius: 93,
    churn: 38,
    duplicates: 5,
    priority: "Critical",
    action: "View",
    path: "src/core/payment",
  },
  {
    rank: "#3",
    file: "DataValidator.ts",
    score: 86,
    blastRadius: 156,
    churn: 31,
    duplicates: 12,
    priority: "High",
    action: "View",
    path: "src/utils/validation",
  },
  {
    rank: "#4",
    file: "QueryBuilder.ts",
    score: 82,
    blastRadius: 84,
    churn: 29,
    duplicates: 6,
    priority: "High",
    action: "View",
    path: "src/database/query",
  },
  {
    rank: "#5",
    file: "CacheManager.ts",
    score: 79,
    blastRadius: 71,
    churn: 25,
    duplicates: 4,
    priority: "High",
    action: "View",
    path: "src/infrastructure/cache",
  },
  {
    rank: "#6",
    file: "NotificationService.ts",
    score: 75,
    blastRadius: 62,
    churn: 22,
    duplicates: 7,
    priority: "Medium",
    action: "View",
    path: "src/services/notification",
  },
  {
    rank: "#7",
    file: "ReportGenerator.ts",
    score: 72,
    blastRadius: 48,
    churn: 19,
    duplicates: 3,
    priority: "Medium",
    action: "View",
    path: "src/features/reports",
  },
  {
    rank: "#8",
    file: "ConfigLoader.ts",
    score: 68,
    blastRadius: 89,
    churn: 15,
    duplicates: 2,
    priority: "Medium",
    action: "View",
    path: "src/core/config",
  },
  {
    rank: "#9",
    file: "EventEmitter.ts",
    score: 65,
    blastRadius: 103,
    churn: 18,
    duplicates: 5,
    priority: "Medium",
    action: "View",
    path: "src/infrastructure/events",
  },
  {
    rank: "#10",
    file: "StringFormatter.ts",
    score: 63,
    blastRadius: 134,
    churn: 12,
    duplicates: 9,
    priority: "Medium",
    action: "View",
    path: "src/utils/formatting",
  },
];

const aiRecommendations = [
  {
    file: "UserAuthService.ts",
    confidence: 95,
    detail:
      "Critical complexity with high blast radius. Recently modified 8 times.",
    impact: "High Impact",
  },
  {
    file: "DataValidator.ts",
    confidence: 88,
    detail: "Contains 12 duplicate code blocks affecting 156 dependent files.",
    impact: "High Impact",
  },
  {
    file: "QueryBuilder.ts",
    confidence: 82,
    detail: "Frequent changes (29 commits) suggest unstable design patterns.",
    impact: "Medium Impact",
  },
];

function getPriorityTone(priority) {
  if (priority === "Critical") return "critical";
  if (priority === "High") return "high";
  return "medium";
}

export default function Home() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h1 className="brand">RefactorIQ</h1>
        <p className="scan-time">Last scan: Feb 10, 2026 14:23</p>
        <div className="user-pill">Admin</div>

        <nav className="sidebar-nav" aria-label="Primary">
          <a className="nav-item is-active" href="/home">
            Overview
          </a>
          <a className="nav-item" href="#">
            Repository Explorer
          </a>
          <a className="nav-item" href="#">
            Architecture
          </a>
          <a className="nav-item" href="#">
            Scans
          </a>
          <a className="nav-item" href="#">
            Risk Trend Score
          </a>
          <a className="nav-item" href="#">
            Refactor Queue
          </a>
        </nav>
      </aside>

      <main className="main-content">
        <section className="panel">
          <h2 className="section-title">
            Executive snapshot — Where should we refactor next?
          </h2>

          <div className="headline-metric">
            <div>
              <span className="metric-label">Refactor Queue</span>
              <p className="metric-value">62</p>
            </div>
            <div className="metric-delta">
              <span className="metric-percent">8%</span>
              <p className="metric-note">Improved from 70 last week</p>
            </div>
          </div>

          <h3 className="subsection-title">Risk Distribution</h3>
          <div className="risk-grid">
            {riskCards.map((card) => (
              <article key={card.label} className="risk-card">
                <p className="risk-label">{card.label}</p>
                <p className={`risk-value risk-${card.tone}`}>{card.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel table-panel">
          <div className="table-head">
            <h3 className="subsection-title">
              Top 10 Files to Refactor Next Sprint
            </h3>
            <p className="muted">Ranked by refactor priority score</p>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>File</th>
                  <th>Score</th>
                  <th>Blast Radius</th>
                  <th>Churn</th>
                  <th>Duplicates</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {topFiles.map((row) => (
                  <tr key={row.rank}>
                    <td>{row.rank}</td>
                    <td>
                      <p className="file-name">{row.file}</p>
                      <p className="file-path">{row.path}</p>
                    </td>
                    <td>{row.score}</td>
                    <td>{row.blastRadius}</td>
                    <td>{row.churn}</td>
                    <td>{row.duplicates}</td>
                    <td>
                      <span
                        className={`priority-tag ${getPriorityTone(row.priority)}`}
                      >
                        {row.priority}
                      </span>
                    </td>
                    <td>
                      <button className="table-action" type="button">
                        {row.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <h3 className="subsection-title">AI Recommendations</h3>
          <div className="recommendations">
            {aiRecommendations.map((item) => (
              <article key={item.file} className="recommendation-card">
                <header>
                  <p className="file-name">{item.file}</p>
                  <span className="confidence">{item.confidence}%</span>
                </header>
                <p className="recommendation-detail">{item.detail}</p>
                <p
                  className={`impact ${item.impact === "High Impact" ? "high" : "medium"} `}
                >
                  {item.impact}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
