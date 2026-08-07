import { AtomEffect } from 'recoil'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

const STORAGE_PREFIX = 'snippets.'
const SHARE_HASH_PARAM = 's'

/**
 * State encoded in the URL hash by the "Share" button.
 * Parsed once at startup; takes precedence over localStorage.
 */
const sharedState: Record<string, unknown> | null = (() => {
  try {
    const match = window.location.hash.match(new RegExp(`${SHARE_HASH_PARAM}=([^&]+)`))
    if (!match) return null

    const json = decompressFromEncodedURIComponent(match[1])
    return json ? JSON.parse(json) : null
  } catch {
    return null
  }
})()

export const persistEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    if (sharedState && key in sharedState) {
      setSelf(sharedState[key] as T)
    } else {
      try {
        const stored = localStorage.getItem(STORAGE_PREFIX + key)
        if (stored !== null) setSelf(JSON.parse(stored))
      } catch {
        // corrupted entry — fall back to the default value
      }
    }

    onSet((newValue, _oldValue, isReset) => {
      if (isReset) localStorage.removeItem(STORAGE_PREFIX + key)
      else localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(newValue))
    })
  }

export const buildShareUrl = (state: Record<string, unknown>) => {
  const compressed = compressToEncodedURIComponent(JSON.stringify(state))
  const { origin, pathname } = window.location
  return `${origin}${pathname}#${SHARE_HASH_PARAM}=${compressed}`
}
