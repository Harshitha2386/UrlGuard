export default function LoadingSpinner({ label = 'Analyzing URL...' }) {
  return (
    <div className="loading-wrap" aria-live="polite" aria-busy="true">
      <div className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
