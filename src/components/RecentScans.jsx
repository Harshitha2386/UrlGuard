import { AlertTriangle, Check, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

const STATUS_ICON = {
  safe: Check,
  suspicious: AlertTriangle,
  malicious: ShieldAlert,
}

export default function RecentScans({ history = [] }) {
  const recentScans = history.slice(0, 5)

  return (
    <section className="panel recent-panel">
      <div className="section-head">
        <h3>Recent Scans</h3>
        <Link to="/history" className="text-link">View All History →</Link>
      </div>

      {recentScans.length === 0 ? (
        <div className="empty-state compact">
          <p>No recent scans yet.</p>
        </div>
      ) : (
        <ul className="recent-list">
          {recentScans.map((item) => {
            const prediction = String(item.prediction || 'safe').toLowerCase()
            const Icon = STATUS_ICON[prediction] || Check

            return (
              <li key={`${item.url}-${item.createdAt || item.date}`} className="recent-item">
                <span className={`recent-icon status-${prediction}`} aria-hidden="true">
                  <Icon size={14} />
                </span>
                <div>
                  <strong>{item.url}</strong>
                  <small>{prediction.charAt(0).toUpperCase() + prediction.slice(1)} · {Number(item.confidence || 0).toFixed(0)}%</small>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
