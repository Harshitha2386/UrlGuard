export function validateUrlInput(value) {
  const raw = typeof value === 'string' ? value.trim() : ''

  if (!raw) {
    return {
      valid: false,
      error: 'Please enter a valid URL.',
    }
  }

  let candidate = raw
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(candidate)) {
    candidate = `https://${candidate}`
  }

  try {
    const parsedUrl = new URL(candidate)
    const protocol = parsedUrl.protocol.toLowerCase()

    if (!['http:', 'https:'].includes(protocol)) {
      return {
        valid: false,
        error: 'Please enter a valid URL.',
      }
    }

    if (!parsedUrl.hostname || parsedUrl.hostname.includes(' ')) {
      return {
        valid: false,
        error: 'Please enter a valid URL.',
      }
    }

    return {
      valid: true,
      normalized: parsedUrl.toString(),
    }
  } catch {
    return {
      valid: false,
      error: 'Please enter a valid URL.',
    }
  }
}
