const steps = [
  {
    id: '01',
    title: 'Enter URL',
    description: 'The user enters the URL they want to investigate before deciding whether it should be trusted.',
  },
  {
    id: '02',
    title: 'Extract Features',
    description: 'The system analyzes relevant URL characteristics such as length, structure, keywords, and protocol details.',
  },
  {
    id: '03',
    title: 'Machine Learning Analysis',
    description: 'The extracted characteristics are processed by the backend machine-learning model for classification.',
  },
  {
    id: '04',
    title: 'Detection Result',
    description: 'The system returns a classification along with confidence and risk information for the user.',
  },
]

export default function HowItWorks() {
  return (
    <main className="page-shell container">
      <section className="page-header">
        <div>
          <p className="eyebrow">How It Works</p>
          <h1>URL Detection Process</h1>
        </div>
      </section>

      <section className="page-content panel">
        <div className="flow-diagram" aria-label="URL detection flow">
          <span>URL</span>
          <span className="arrow">↓</span>
          <span>Feature Extraction</span>
          <span className="arrow">↓</span>
          <span>ML Model</span>
          <span className="arrow">↓</span>
          <span>Risk Analysis</span>
          <span className="arrow">↓</span>
          <span>Detection Result</span>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article key={step.id} className="step-card">
              <span className="step-number">{step.id}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
