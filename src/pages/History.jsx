import { useMemo, useState } from 'react'
import { clearHistory, readHistory } from '../utils/storage'

function formatDate(value) {
  if (!value) {
    return 'N/A'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'N/A'
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function History() {
  const [history, setHistory] = useState(() => readHistory())
  const [query, setQuery] = useState('')
  const [resultFilter, setResultFilter] = useState('all')

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesText = item.url.toLowerCase().includes(query.toLowerCase())
      const matchesResult = resultFilter === 'all' || String(item.prediction).toLowerCase() === resultFilter
      return matchesText && matchesResult
    })
  }, [history, query, resultFilter])

  const handleClearHistory = () => {
    const refreshed = clearHistory()
    setHistory(refreshed)
  }

  return (
    <main className="page-shell container">
      <section className="page-header">
        <div>
          <p className="eyebrow">Scan Records</p>
          <h1>Scan History</h1>
        </div>
        <button type="button" className="secondary-btn" onClick={handleClearHistory} disabled={history.length === 0}>
          Clear History
        </button>
      </section>

      <section className="panel history-tools">
        <div className="history-controls">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search URL history"
            aria-label="Search scan history"
          />
          <select value={resultFilter} onChange={(event) => setResultFilter(event.target.value)} aria-label="Filter scans by result">
            <option value="all">All Results</option>
            <option value="safe">Safe</option>
            <option value="suspicious">Suspicious</option>
            <option value="malicious">Malicious</option>
          </select>
        </div>
      </section>

      {history.length === 0 ? (
        <div className="empty-state">
          <h3>No scan history yet</h3>
          <p>Run a URL analysis to populate your detection records.</p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="empty-state">
          <h3>No matching records</h3>
          <p>Try adjusting your search or result filter.</p>
        </div>
      ) : (
        <section className="panel history-panel">
          <div className="table-wrap">
            <table className="history-table">
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Result</th>
                  <th>Confidence</th>
                  <th>Risk Score</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item) => {
                  const prediction = String(item.prediction || 'safe').toLowerCase()

                  return (
                    <tr key={`${item.url}-${item.createdAt || item.date}`}>
                      <td className="url-cell">{item.url}</td>
                      <td className="result-cell">
                        <span className={`pill pill-${prediction}`}>{prediction}</span>
                      </td>
                      <td>{Number(item.confidence || 0).toFixed(0)}%</td>
                      <td>{Number(item.risk_score || 0).toFixed(0)} / 100</td>
                      <td>{formatDate(item.createdAt || item.date)}</td>
                      <td>{prediction === 'safe' ? 'Safe' : prediction === 'suspicious' ? 'Suspicious' : 'Malicious'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  )
}
