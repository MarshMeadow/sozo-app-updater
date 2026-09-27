import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { DISCLAIMER, RISK_NOTICE, DMCA_SUMMARY } from '../constants/legal'

const STORAGE_KEY = 'sozo-disclaimer-accepted'

function hasAccepted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export default function DisclaimerGate() {
  const [accepted, setAccepted] = useState(hasAccepted)

  useEffect(() => {
    document.body.style.overflow = accepted ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [accepted])

  if (accepted) return null

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // ignore
    }
    setAccepted(true)
  }

  return (
    <div className="gate-overlay" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate-dialog">
        <div className="gate-icon">
          <ShieldAlert size={28} aria-hidden="true" />
        </div>
        <h2 id="gate-title">Before you continue</h2>
        <p>{DISCLAIMER}</p>
        <p>{DMCA_SUMMARY}</p>
        <p className="gate-risk">{RISK_NOTICE}</p>
        <div className="gate-actions">
          <button type="button" className="button" onClick={accept}>
            I Understand — Continue
          </button>
          <a
            href="https://www.google.com"
            className="button button-secondary"
            rel="noopener noreferrer"
          >
            Leave Site
          </a>
        </div>
        <p className="gate-links">
          <NavLink to="/dmca" onClick={accept}>
            DMCA Notice &amp; Takedown Policy
          </NavLink>
          {' · '}
          <NavLink to="/terms" onClick={accept}>
            Terms of Use
          </NavLink>
          {' · '}
          <NavLink to="/privacy" onClick={accept}>
            Privacy Policy
          </NavLink>
        </p>
      </div>
    </div>
  )
}
