import { validateUrlInput } from '../utils/urlValidator'
import { normalizeScore } from '../utils/riskUtils'

export const USE_MOCK_API = true

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function buildMockResult(url) {
  const lowerUrl = url.toLowerCase()
  const suspiciousPatterns = [
    'login',
    'verify',
    'secure',
    'bank',
    'update',
    'account',
    'claim',
    'confirm',
    'pay',
    'invoice',
  ]

  const maliciousPatterns = ['free-money', 'win-prize', 'urgent', 'click-now', 'fake-login']

  let prediction = 'safe'
  let confidence = 96.4
  let riskScore = 3.6

  if (maliciousPatterns.some((pattern) => lowerUrl.includes(pattern))) {
    prediction = 'malicious'
    confidence = 94.8
    riskScore = 88.2
  } else if (suspiciousPatterns.some((pattern) => lowerUrl.includes(pattern))) {
    prediction = 'suspicious'
    confidence = 82.6
    riskScore = 67.1
  }

  return {
    url,
    prediction,
    confidence,
    risk_score: riskScore,
    analysis_details: {
      'URL length': url.length,
      'Number of dots': (url.match(/\./g) || []).length,
      'Number of special characters': (url.match(/[^a-zA-Z0-9./:-]/g) || []).length,
      'Contains HTTPS': url.startsWith('https://') ? 'Yes' : 'No',
      'Suspicious keywords': suspiciousPatterns.filter((word) => lowerUrl.includes(word)).join(', ') || 'None detected',
    },
  }
}

function normalizeResponsePayload(data, fallbackUrl) {
  const prediction = String(data?.prediction || 'safe').toLowerCase()
  const confidence = normalizeScore(data?.confidence ?? 0, 0)
  const riskScore = normalizeScore(data?.risk_score ?? 0, 0)

  return {
    url: data?.url || fallbackUrl,
    prediction,
    confidence,
    risk_score: riskScore,
    analysis_details: data?.analysis_details || data?.details || {},
  }
}

export async function analyzeUrl(url) {
  const { valid, normalized, error } = validateUrlInput(url)

  if (!valid) {
    throw new Error(error || 'Please enter a valid URL.')
  }

  if (USE_MOCK_API) {
    return buildMockResult(normalized)
  }

  try {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 10000)

    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: normalized }),
      signal: controller.signal,
    })

    window.clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error('Unable to connect to the detection service. Please try again.')
    }

    const payload = await response.json()
    return normalizeResponsePayload(payload, normalized)
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('Detection request timed out. Please try again.')
    }

    if (error instanceof TypeError) {
      throw new Error('Unable to connect to the detection service. Please try again.')
    }

    throw new Error(error?.message || 'Unable to analyze the URL right now. Please try again.')
  }
}
