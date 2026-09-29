# URLGuard

URLGuard is a modern cybersecurity frontend application for checking whether a URL appears safe, suspicious, or potentially malicious. The app is built with React and Vite and focuses on user-friendly URL validation, risk scoring, scan history, and clean dashboard reporting while keeping backend prediction logic isolated.

## Project name

URLGuard

## Description

URLGuard helps users analyze a submitted URL before trusting it. It presents a professional security dashboard and displays clean confidence and risk indicators based on API responses.

## Features

- Dark cybersecurity-inspired interface
- URL validation and error handling
- Mock API mode for local testing
- Real backend API integration ready for deployment
- Scan history stored in localStorage
- Responsive navigation for desktop and mobile
- Dashboard metrics and recent scan list

## Technologies

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router DOM
- Lucide React

## Installation

```bash
npm install
```

## Running the development server

```bash
npm run dev
```

## Environment variables

Create a local `.env` file using the example values:

```bash
VITE_API_URL=http://localhost:5000
```

## Backend API format

The frontend sends a POST request to the backend at `/api/predict`.

Request body:

```json
{
  "url": "https://example.com"
}
```

Example response:

```json
{
  "url": "https://example.com",
  "prediction": "safe",
  "confidence": 96.4,
  "risk_score": 3.6
}
```

## Project structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── UrlScanner.jsx
│   ├── ResultCard.jsx
│   ├── RiskScore.jsx
│   ├── ConfidenceBar.jsx
│   ├── StatsCards.jsx
│   ├── RecentScans.jsx
│   └── LoadingSpinner.jsx
├── pages/
│   ├── Home.jsx
│   ├── History.jsx
│   ├── HowItWorks.jsx
│   └── About.jsx
├── services/
│   └── urlDetectionApi.js
├── utils/
│   ├── urlValidator.js
│   ├── riskUtils.js
│   └── storage.js
├── App.jsx
├── main.jsx
├── index.css
└── assets/
```

## Screenshots placeholder

Add screenshots to a `screenshots/` directory later for presentation purposes.

## Future enhancements

- Browser extension support
- Expanded backend threat intelligence
- More detailed URL analysis explanations
- Exportable scan reports
- Persistent backend storage
