export default function About() {
  return (
    <main className="page-shell container">
      <section className="page-header">
        <div>
          <p className="eyebrow">About</p>
          <h1>About URLGuard</h1>
        </div>
      </section>

      <section className="page-content panel">
        <div className="info-grid">
          <div className="info-card">
            <h3>Project Objective</h3>
            <p>URLGuard is a URL analysis application designed to help users identify potentially suspicious or fake URLs before clicking them.</p>
          </div>
          <div className="info-card">
            <h3>Technology Used</h3>
            <p>The frontend is built with React, Vite, JavaScript, and responsive HTML/CSS. It connects to a backend API for predictions and risk analysis.</p>
          </div>
          <div className="info-card">
            <h3>Detection Approach</h3>
            <p>The system uses a backend machine-learning-based URL analysis workflow to evaluate patterns, risk signals, and confidence levels.</p>
          </div>
          <div className="info-card">
            <h3>Future Enhancements</h3>
            <p>Planned improvements include expanded threat intelligence, browser extensions, darker risk scoring logic, and richer reporting features.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
