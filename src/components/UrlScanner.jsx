import { useState } from 'react'
import { Link2, ShieldAlert } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'
import { validateUrlInput } from '../utils/urlValidator'

export default function UrlScanner({ onAnalyze, isLoading }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validation = validateUrlInput(url)

    if (!validation.valid) {
      setError(validation.error)
      return
    }

    setError('')

    try {
      await onAnalyze(validation.normalized)
    } catch (submissionError) {
      setError(submissionError?.message || 'Unable to analyze the URL right now. Please try again.')
    }
  }

  return (
    <section className="scanner-panel">
      <div className="scanner-header">
        <div>
          <p className="eyebrow">Threat Detection</p>
          <h2>Enter URL</h2>
        </div>
      </div>

      <form className="scanner-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="url-input" className="sr-only">
          Enter URL
        </label>
        <div className="input-wrap">
          <span className="input-icon" aria-hidden="true"><Link2 size={18} /></span>
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            aria-label="Enter URL"
            autoComplete="off"
          />
        </div>

        {error && <p className="validation-error" role="alert">{error}</p>}

        <button type="submit" className="primary-btn" disabled={isLoading}>
          {isLoading ? <LoadingSpinner label="Analyzing URL..." /> : 'Analyze URL'}
        </button>
      </form>

      <div className="security-note" aria-live="polite">
        <div className="security-note-icon"><ShieldAlert size={16} /></div>
        <div>
          <strong>Security Notice</strong>
          <p>Do not enter passwords, authentication tokens, personal information, or other sensitive data into this application. The application analyzes URLs only.</p>
        </div>
      </div>
    </section>
  )
}
