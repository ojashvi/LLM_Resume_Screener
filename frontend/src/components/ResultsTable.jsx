import { useState } from "react"

// Shows a single colored score bar
function ScoreBar({ label, value }) {
  const color =
    value >= 7.5 ? "#22c55e" :
    value >= 5   ? "#f59e0b" : "#ef4444"

  return (
    <div className="score-bar-row">
      <span className="score-label">{label}</span>
      <div className="score-track">
        <div
          className="score-fill"
          style={{
            width: `${(value / 10) * 100}%`,
            backgroundColor: color
          }}
        />
      </div>
      <span className="score-value">{value?.toFixed(1)}</span>
    </div>
  )
}

// Shows one candidate's result as an expandable card
function ResultCard({ result, rank }) {
  const [expanded, setExpanded] = useState(rank === 1)

  return (
    <div className={`result-card ${rank === 1 ? "top-rank" : ""}`}>

      {/* Card Header — always visible */}
      <div
        className="card-header"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="rank-badge">#{rank}</div>

        <div className="card-meta">
          <div className="card-filename">{result.filename}</div>
          <div className="card-summary-short">
            {result.summary?.slice(0, 80)}...
          </div>
        </div>

        <div className="card-right">
          <div className="overall-score">
            {result.overall_score?.toFixed(1)}
          </div>
          <span className={`rec-badge rec-${result.recommendation
            .toLowerCase()
            .replace(" ", "-")}`}
          >
            {result.recommendation}
          </span>
          <span>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Card Body — only visible when expanded */}
      {expanded && (
        <div className="card-body">

          <div className="card-grid">

            {/* Left: score bars */}
            <div>
              <h4>Score Breakdown</h4>
              <ScoreBar label="Skills"     value={result.skills_match} />
              <ScoreBar label="Experience" value={result.experience_relevance} />
              <ScoreBar label="Education"  value={result.education_fit} />
              <ScoreBar label="Overall"    value={result.overall_score} />
            </div>

            {/* Right: strengths, gaps, summary */}
            <div>
              <h4>Strengths ✓</h4>
              <ul>
                {result.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <h4>Gaps ✗</h4>
              <ul>
                {result.gaps?.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>

              <h4>Summary</h4>
              <p>{result.summary}</p>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

// Main component — renders all candidate cards
export default function ResultsTable({ results }) {
  return (
    <section className="results-section">
      <h2>{results.length} Candidates Ranked</h2>

      <div className="results-list">
        {results.map((r) => (
          <ResultCard
            key={r.filename}
            result={r}
            rank={r.rank}
          />
        ))}
      </div>

    </section>
  )
}