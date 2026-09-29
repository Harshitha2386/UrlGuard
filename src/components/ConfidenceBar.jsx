export default function ConfidenceBar({ value = 0 }) {
  const safeValue = Number.isFinite(Number(value)) ? Number(value) : 0
  const clampedValue = Math.min(100, Math.max(0, safeValue))

  return (
    <div className="metric-block">
      <div className="metric-header-row">
        <span>Detection Confidence</span>
        <strong>{clampedValue.toFixed(1)}%</strong>
      </div>
      <div className="progress-track" aria-label="Detection confidence score" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={clampedValue}>
        <span className="progress-fill confidence-fill" style={{ width: `${clampedValue}%` }} />
      </div>
    </div>
  )
}
