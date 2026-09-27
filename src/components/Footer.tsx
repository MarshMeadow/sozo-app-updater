import { NavLink } from 'react-router-dom'
import { MessageCircle, GitBranch, ExternalLink, Shield, Globe, Users, RefreshCw, Map, Settings, Briefcase, AtSign, Code, Download, Search } from 'lucide-react'
import { DISCLAIMER, RISK_NOTICE } from '../constants/legal'
import {
  SOZO_TELEGRAM,
  SOZO_WEBSITE,
  SOZO_GITHUB,
  WEBSITE_REPO,
  DEV_WEBSITE,
  DEV_TELEGRAM,
  DEV_LINKEDIN,
  DEV_TWITTER,
  DEV_GITHUB,
} from '../constants/links'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <nav className="footer-links" aria-label="Footer">
          <a href={SOZO_WEBSITE} target="_blank" rel="noopener noreferrer" className="footer-link">
            <Globe size={16} aria-hidden="true" />
            Sozo Website
          </a>
          <a href={SOZO_TELEGRAM} target="_blank" rel="noopener noreferrer" className="footer-link">
            <MessageCircle size={16} aria-hidden="true" />
            Sozo Telegram
          </a>
          <a href={SOZO_GITHUB} target="_blank" rel="noopener noreferrer" className="footer-link">
            <ExternalLink size={16} aria-hidden="true" />
            Sozo Repository
          </a>
          <a href={WEBSITE_REPO} target="_blank" rel="noopener noreferrer" className="footer-link">
            <GitBranch size={16} aria-hidden="true" />
            Website GitHub
          </a>
          <NavLink to="/downloads" className="footer-link">
            <Download size={16} aria-hidden="true" />
            Downloads
          </NavLink>
          <NavLink to="/explorer" className="footer-link">
            <Search size={16} aria-hidden="true" />
            GitHub Explorer
          </NavLink>
          <NavLink to="/community" className="footer-link">
            <MessageCircle size={16} aria-hidden="true" />
            Community
          </NavLink>
          <NavLink to="/contributors" className="footer-link">
            <Users size={16} aria-hidden="true" />
            Contributors
          </NavLink>
          <NavLink to="/obtainium" className="footer-link">
            <RefreshCw size={16} aria-hidden="true" />
            Obtainium Guide
          </NavLink>
          <NavLink to="/sitemap" className="footer-link">
            <Map size={16} aria-hidden="true" />
            Sitemap
          </NavLink>
          <NavLink to="/settings" className="footer-link">
            <Settings size={16} aria-hidden="true" />
            Settings
          </NavLink>
          <NavLink to="/privacy" className="footer-link">
            <Shield size={16} aria-hidden="true" />
            Privacy
          </NavLink>
          <NavLink to="/terms" className="footer-link">
            <Shield size={16} aria-hidden="true" />
            Terms
          </NavLink>
          <NavLink to="/dmca" className="footer-link">
            <Shield size={16} aria-hidden="true" />
            DMCA
          </NavLink>
          <a href={DEV_GITHUB} target="_blank" rel="noopener noreferrer" className="footer-link">
            <Code size={16} aria-hidden="true" />
            Developer GitHub
          </a>
          <a href={DEV_WEBSITE} target="_blank" rel="noopener noreferrer" className="footer-link">
            <Globe size={16} aria-hidden="true" />
            azamov.me
          </a>
          <a href={DEV_TELEGRAM} target="_blank" rel="noopener noreferrer" className="footer-link">
            <MessageCircle size={16} aria-hidden="true" />
            Dev Telegram
          </a>
          <a href={DEV_LINKEDIN} target="_blank" rel="noopener noreferrer" className="footer-link">
            <Briefcase size={16} aria-hidden="true" />
            LinkedIn
          </a>
          <a href={DEV_TWITTER} target="_blank" rel="noopener noreferrer" className="footer-link">
            <AtSign size={16} aria-hidden="true" />
            X / Twitter
          </a>
        </nav>
        <p className="footer-disclaimer">
          {DISCLAIMER} {RISK_NOTICE}
        </p>
      </div>
    </footer>
  )
}
