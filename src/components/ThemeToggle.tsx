import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const [theme, setTheme] = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  const label = `Switch to ${next} theme`

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      <span className="sr-only">{label}</span>
    </button>
  )
}
