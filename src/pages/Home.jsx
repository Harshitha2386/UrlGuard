import { useState } from 'react'
import RecentScans from '../components/RecentScans'
import StatsCards from '../components/StatsCards'
import ResultCard from '../components/ResultCard'
import UrlScanner from '../components/UrlScanner'
import { analyzeUrl } from '../services/urlDetectionApi'
import { readHistory, saveHistory } from '../utils/storage'

export default function Home() {
  const [history, setHistory] = useState(() => readHistory())
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async (url) => {
    setLoading(true)

    try {
      const response = await analyzeUrl(url)
      const entry = {
        ...response,
        createdAt: new Date().toISOString(),
      }

      const nextHistory = [entry, ...readHistory()].slice(0, 50)
      saveHistory(nextHistory)
      setHistory(nextHistory)
      setResult(response)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-section container">
        <div className="hero-copy">
          <span className="hero-badge">Cybersecurity Dashboard</span>
          <h1>Check a URL Before You Trust It.</h1>
          <p>Analyze suspicious links and identify potentially fake or malicious URLs using intelligent URL analysis.</p>
        </div>
      </section>

      <div className="container dashboard-layout">
        <UrlScanner onAnalyze={handleAnalyze} isLoading={loading} />
      </div>

      {result && (
        <div className="container result-wrap">
          <ResultCard result={result} />
        </div>
      )}

      <div className="container dashboard-bottom">
        <StatsCards history={history} />
        <RecentScans history={history} />
      </div>
    </main>
  )
}
