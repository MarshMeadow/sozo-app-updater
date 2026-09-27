import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'sozo-theme'
const listeners = new Set<() => void>()

export function getTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // ignore
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // ignore
  }
  document.documentElement.setAttribute('data-theme', theme)
  listeners.forEach((fn) => fn())
}

export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(getTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const onChange = () => setThemeState(getTheme())
    listeners.add(onChange)
    return () => {
      listeners.delete(onChange)
    }
  }, [theme])

  return [theme, setTheme]
}
