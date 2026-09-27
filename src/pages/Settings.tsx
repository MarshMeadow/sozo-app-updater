import { NavLink } from 'react-router-dom'
import { Moon, Pause, Play, Settings as SettingsIcon, Sun } from 'lucide-react'
import Seo from '../components/Seo'
import { useTheme } from '../hooks/useTheme'
import { useEffect, useState } from 'react'

const MOTION_KEY = 'sozo-animations'

function getMotion(): 'on' | 'off' {
  try {
    return localStorage.getItem(MOTION_KEY) === 'off' ? 'off' : 'on'
  } catch {
    return 'on'
  }
}

export default function Settings() {
  const [theme, setTheme] = useTheme()
  const [motion, setMotion] = useState<'on' | 'off'>(getMotion)

  useEffect(() => {
    document.documentElement.dataset.animations = motion
    try {
      localStorage.setItem(MOTION_KEY, motion)
    } catch {
      // ignore
    }
  }, [motion])

  return (
    <div className="container">
      <Seo
        title="Settings - Sozo Updater"
        description="Website settings: theme and animations."
      />
      <article className="page-article">
        <h1>
          <SettingsIcon size={28} className="page-icon" aria-hidden="true" />
          Settings
        </h1>
        <p>
          Basic preferences for this website. Everything is stored locally in your
          browser — nothing is sent anywhere.
        </p>

        <section aria-labelledby="settings-theme">
          <h2 id="settings-theme">
            {theme === 'dark' ? (
              <Moon size={20} aria-hidden="true" />
            ) : (
              <Sun size={20} aria-hidden="true" />
            )}{' '}
            Theme
          </h2>
          <div className="setting-options" role="group" aria-label="Theme">
            <button
              type="button"
              className={`setting-option${theme === 'dark' ? ' active' : ''}`}
              onClick={() => setTheme('dark')}
              aria-pressed={theme === 'dark'}
            >
              <Moon size={16} aria-hidden="true" /> Dark
            </button>
            <button
              type="button"
              className={`setting-option${theme === 'light' ? ' active' : ''}`}
              onClick={() => setTheme('light')}
              aria-pressed={theme === 'light'}
            >
              <Sun size={16} aria-hidden="true" /> Light
            </button>
          </div>
        </section>

        <section aria-labelledby="settings-motion">
          <h2 id="settings-motion">
            {motion === 'on' ? (
              <Play size={20} aria-hidden="true" />
            ) : (
              <Pause size={20} aria-hidden="true" />
            )}{' '}
            Animations
          </h2>
          <p className="about-note">
            Turn off animations if the site feels heavy on your device. Your
            system&apos;s reduced-motion setting is always respected either way.
          </p>
          <div className="setting-options" role="group" aria-label="Animations">
            <button
              type="button"
              className={`setting-option${motion === 'on' ? ' active' : ''}`}
              onClick={() => setMotion('on')}
              aria-pressed={motion === 'on'}
            >
              <Play size={16} aria-hidden="true" /> On
            </button>
            <button
              type="button"
              className={`setting-option${motion === 'off' ? ' active' : ''}`}
              onClick={() => setMotion('off')}
              aria-pressed={motion === 'off'}
            >
              <Pause size={16} aria-hidden="true" /> Off
            </button>
          </div>
        </section>

        <p>
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
