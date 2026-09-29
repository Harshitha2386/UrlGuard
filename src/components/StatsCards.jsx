export default function StatsCards({ history = [] }) {
  const total = history.length
  const safe = history.filter((item) => String(item.prediction).toLowerCase() === 'safe').length
  const suspicious = history.filter((item) => String(item.prediction).toLowerCase() === 'suspicious').length
  const malicious = history.filter((item) => String(item.prediction).toLowerCase() === 'malicious').length

  const stats = [
    { label: 'Total Scans', value: total },
    { label: 'Safe URLs', value: safe },
    { label: 'Suspicious', value: suspicious },
    { label: 'Malicious', value: malicious },
  ]

  return (
    <section className="stats-section">
      {total === 0 ? (
        <div className="empty-state compact">
          <p>No scans yet</p>
          <span>Start by analyzing a URL above.</span>
        </div>
      ) : (
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-label">{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
