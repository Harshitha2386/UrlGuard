export const RISK_THRESHOLDS = {
  LOW_MAX: 30,
  MEDIUM_MAX: 60,
  HIGH_MAX: 100,
}

export function normalizeScore(value, fallback = 0) {
  const parsed = Number(value)

  if (!Number.isFinite(parsed)) {
    return fallback
  }

  return Math.min(100, Math.max(0, parsed))
}

export function getRiskLevel(score) {
  const normalized = normalizeScore(score, 0)

  if (normalized <= RISK_THRESHOLDS.LOW_MAX) {
    return {
      level: 'low',
      label: 'Low Risk',
    }
  }

  if (normalized <= RISK_THRESHOLDS.MEDIUM_MAX) {
    return {
      level: 'medium',
      label: 'Medium Risk',
    }
  }

  return {
    level: 'high',
    label: 'High Risk',
  }
}

export function formatMetricValue(value, suffix = '') {
  const safeNumber = Number(value)

  if (!Number.isFinite(safeNumber)) {
    return `0${suffix}`
  }

  return `${safeNumber.toFixed(1).replace(/\.0$/, '')}${suffix}`
}
