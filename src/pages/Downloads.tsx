import { NavLink } from 'react-router-dom'
import { Download, ExternalLink, Monitor, Smartphone, Tv, Clock, Search } from 'lucide-react'
import Seo from '../components/Seo'
import { PLATFORMS } from '../constants/links'

const ICONS: Record<string, typeof Smartphone> = {
  apk: Smartphone,
  tv: Tv,
  desktop: Monitor,
  legacy: Clock,
}

export default function Downloads() {
  return (
    <div className="container">
      <Seo
        title="Downloads - Sozo Updater"
        description="Download Sozo for every platform: Android, Android TV, desktop, and the legacy Kotlin client."
      />
      <article className="page-article">
        <h1>
          <Download size={28} className="page-icon" aria-hidden="true" />
          Choose your platform
        </h1>
        <p>
          Sozo is available on more than just phones. Pick a platform below for a dedicated
          download page that checks the developer's repository and the Sozo-app organization
          mirror for the latest release.
        </p>

        <div className="cards fork-grid" role="list">
          {PLATFORMS.map((platform) => {
            const Icon = ICONS[platform.slug] ?? Smartphone
            return (
              <article className="fork-card" key={platform.slug} role="listitem">
                <h3>
                  <Icon size={18} aria-hidden="true" style={{ marginRight: '0.4rem', verticalAlign: '-3px' }} />
                  {platform.name}
                </h3>
                <p className="fork-author">{platform.platform}</p>
                <p className="fork-desc">{platform.description}</p>
                <div className="fork-tags">
                  {platform.tags.map((tag) => (
                    <span className="fork-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="hero-fallbacks" style={{ marginTop: '0.75rem' }}>
                  <NavLink to={`/${platform.slug}`} className="button button-secondary">
                    <Download size={16} />
                    Download
                  </NavLink>
                  <a
                    className="card-button"
                    href={platform.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${platform.name} repository`}
                  >
                    <ExternalLink size={16} />
                    Repository
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        <p className="about-note">
          Looking for something not listed here, or want to browse everything the developer and
          the Sozo-app organization have published? Try the{' '}
          <NavLink to="/explorer">GitHub Explorer</NavLink>{' '}
          <Search size={14} aria-hidden="true" style={{ verticalAlign: '-2px' }} />.
        </p>

        <p>
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
