import { getRiskLevel, normalizeScore } from '../utils/riskUtils'

export default function RiskScore({ value = 0 }) {
  const safeValue = normalizeScore(value, 0)
  const { label, level } = getRiskLevel(safeValue)

  return (
    <div className="metric-block">
      <div className="metric-header-row">
        <span>Risk Score</span>
        <strong>{safeValue.toFixed(1)} / 100</strong>
      </div>
      <div className="progress-track risk-track" aria-label="Risk score" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={safeValue}>
        <span className={`progress-fill risk-fill ${level}`} style={{ width: `${safeValue}%` }} />
      </div>
      <div className={`risk-level status-${level}`}>{label}</div>
    </div>
  )
}
