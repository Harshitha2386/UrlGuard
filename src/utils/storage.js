export const STORAGE_KEY = 'urlguard_scan_history'

export function readHistory() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)
    if (!rawValue) {
      return []
    }

    const parsed = JSON.parse(rawValue)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveHistory(historyItems) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(historyItems))
}

export function clearHistory() {
  if (typeof window === 'undefined') {
    return []
  }

  window.localStorage.removeItem(STORAGE_KEY)
  return []
}
