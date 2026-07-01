import { useEffect, useState } from 'react'

const KEY = 'imt_theme'

function currentTheme() {
  if (typeof document !== 'undefined' && document.documentElement.dataset.theme) {
    return document.documentElement.dataset.theme
  }
  return 'dark'
}

// Reads/writes the `data-theme` attribute set by the inline script in index.html.
export function useTheme() {
  const [theme, setTheme] = useState(currentTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem(KEY, theme) } catch { /* ignore */ }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return { theme, toggle }
}
