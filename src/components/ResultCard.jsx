import { useMemo, useState } from 'react'
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react'
import ConfidenceBar from './ConfidenceBar'
import RiskScore from './RiskScore'

const STATUS_META = {
  safe: {
    label: 'URL Appears Safe',
    icon: CheckCircle2,
    className: 'result-safe',
  },
  suspicious: {
    label: 'Suspicious URL Detected',
    icon: AlertTriangle,
    className: 'result-suspicious',
  },
  malicious: {
    label: 'Potentially Malicious URL',
    icon: ShieldAlert,
    className: 'result-malicious',
  },
}

export default function ResultCard({ result }) {
  const [isOpen, setIsOpen] = useState(false)

  const status = result?.prediction ? String(result.prediction).toLowerCase() : 'safe'
  const meta = STATUS_META[status] || STATUS_META.safe
  const Icon = meta.icon

  const details = useMemo(() => {
    if (!result?.analysis_details || Object.keys(result.analysis_details).length === 0) {
      return []
    }

    return Object.entries(result.analysis_details)
  }, [result])

  if (!result) {
    return null
  }

  return (
    <div className={`result-panel ${meta.className}`}>
      <div className="result-header">
        <div className="result-title-wrap">
          <span className="result-icon"><Icon size={26} /></span>
          <div>
            <p className="eyebrow">Detection Result</p>
            <h3>{meta.label}</h3>
          </div>
        </div>
      </div>

      <div className="result-grid">
        <div className="result-field">
          <span className="field-label">URL</span>
          <span className="field-value breakpoint-text">{result.url}</span>
        </div>
        <div className="result-field">
          <span className="field-label">Result</span>
          <span className="field-value uppercase">{status}</span>
        </div>
        <div className="result-field">
          <span className="field-label">Confidence</span>
          <span className="field-value">{Number(result.confidence || 0).toFixed(1)}%</span>
        </div>
        <div className="result-field">
          <span className="field-label">Risk Score</span>
          <span className="field-value">{Number(result.risk_score || 0).toFixed(1)} / 100</span>
        </div>
      </div>

      <div className="result-metrics">
        <ConfidenceBar value={result.confidence} />
        <RiskScore value={result.risk_score} />
      </div>

      <button
        type="button"
        className="details-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span>View Analysis Details</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="details-panel">
          {details.length > 0 ? (
            <ul className="details-list">
              {details.map(([label, value]) => (
                <li key={label}>
                  <span>{label}</span>
                  <strong>{String(value)}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-details">No additional analysis details were returned by the API yet.</p>
          )}
        </div>
      )}
    </div>
  )
}
