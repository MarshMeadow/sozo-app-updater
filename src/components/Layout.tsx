import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Settings, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/downloads', label: 'Downloads' },
  { to: '/explorer', label: 'Explorer' },
  { to: '/obtainium', label: 'Obtainium' },
  { to: '/community', label: 'Community' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="layout">
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="logo" aria-label="Sozo Updater home">
            Sozo Updater
          </NavLink>
          <nav
            id="site-menu"
            className={`site-nav ${open ? 'is-open' : ''}`}
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/settings"
              className={({ isActive }) => `icon-nav-link${isActive ? ' active' : ''}`}
              aria-label="Settings"
              title="Settings"
              onClick={() => setOpen(false)}
            >
              <Settings size={18} aria-hidden="true" />
            </NavLink>
            <ThemeToggle />
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="menu-toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      <main className="main-content" id="main">
        {children}
      </main>
    </div>
  )
}
