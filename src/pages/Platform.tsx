import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Download,
  ExternalLink,
  File,
  Info,
  Package,
  Smartphone,
  Tag,
  Users,
} from 'lucide-react'
import Seo from '../components/Seo'
import NotFound from './NotFound'
import {
  ReleaseSourcesError,
  fetchLatestReleaseFrom,
  formatBytes,
  formatDate,
  getPlatform,
  getReleaseType,
} from '../api/release'
import type { ReleaseResult } from '../api/release'
import { PLATFORMS } from '../constants/links'

type Status =
  | { kind: 'loading' }
  | { kind: 'error'; message: string; failures: { source: string; error: string }[] }
  | { kind: 'ok'; result: ReleaseResult }

const platformIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.endsWith('.apk')) return <Smartphone size={20} />
  if (lower.endsWith('.zip') || lower.endsWith('.tar.gz') || lower.endsWith('.tar')) return <Package size={20} />
  return <File size={20} />
}

export default function Platform({ slug }: { slug: string }) {
  const config = useMemo(() => PLATFORMS.find((p) => p.slug === slug), [slug])
  const [status, setStatus] = useState<Status>({ kind: 'loading' })

  useEffect(() => {
    if (!config) return
    let active = true
    setStatus({ kind: 'loading' })
    fetchLatestReleaseFrom(config.sources)
      .then((result) => {
        if (active) setStatus({ kind: 'ok', result })
      })
      .catch((err: unknown) => {
        if (!active) return
        if (err instanceof ReleaseSourcesError) {
          setStatus({ kind: 'error', message: err.message, failures: err.failures })
        } else {
          setStatus({
            kind: 'error',
            message: err instanceof Error ? err.message : 'Unknown error',
            failures: [],
          })
        }
      })
    return () => {
      active = false
    }
  }, [config])

  const primaryDownload = useMemo(() => {
    if (status.kind !== 'ok') return null
    const lowerAssets = status.result.release.assets.map((a) => ({
      ...a,
      lower: a.name.toLowerCase(),
    }))
    const universal = lowerAssets.find((a) => a.lower.endsWith('.apk') && a.lower.includes('universal'))
    const firstAsset = lowerAssets[0]
    return universal ?? firstAsset ?? null
  }, [status])

  if (!config) {
    return <NotFound />
  }

  return (
    <div className="container">
      <Seo
        title={`Download ${config.name} (${config.platform})`}
        description={`Download the latest ${config.name} release for ${config.platform}. ${config.description}`}
      />
      <article className="page-article">
        <h1>Download {config.name}</h1>
        <p className="hero-subtitle" style={{ marginBottom: '0.5rem' }}>
          {config.platform}
        </p>
        <p>{config.description}</p>

        <section aria-labelledby="platform-release-title">
          <h2 id="platform-release-title">
            <Download size={20} aria-hidden="true" /> Latest release
          </h2>

          {status.kind === 'loading' && (
            <div className="archive-loading" role="status" aria-live="polite">
              <div className="spinner" aria-hidden="true" />
              <p className="archive-loading-text">Checking for the latest release…</p>
            </div>
          )}

          {status.kind === 'error' && (
            <div className="error-card" role="alert">
              <AlertTriangle size={28} className="error-icon" />
              <h3 className="error-title">Couldn’t load release data</h3>
              <p className="error-message">
                Checked {config.sources.length} source{config.sources.length === 1 ? '' : 's'}{' '}
                (the developer’s repository and the organization’s mirror) and none of them had a
                published release yet.
              </p>
              {status.failures.length > 0 && (
                <ul className="about-list" style={{ marginTop: '0.75rem' }}>
                  {status.failures.map((f) => (
                    <li key={f.source}>
                      <AlertTriangle size={14} aria-hidden="true" />
                      <span>
                        <strong>{f.source}:</strong> {f.error}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="hero-fallbacks" style={{ marginTop: '1rem' }}>
                <a className="button button-secondary" href={config.repoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} />
                  View repository
                </a>
              </div>
            </div>
          )}

          {status.kind === 'ok' && (
            <>
              <div className="release-meta">
                <span className="badge badge-unofficial">
                  <Users size={12} aria-hidden="true" />
                  Community
                </span>
                <span className="badge badge-unofficial" title={status.result.source.label}>
                  Source: {status.result.source.label}
                </span>
                <span
                  className={`badge ${getReleaseType(status.result.release.tag_name, status.result.release.body).className}`}
                >
                  {getReleaseType(status.result.release.tag_name, status.result.release.body).type}
                </span>
                <span className="badge badge-unofficial" title={status.result.release.tag_name}>
                  <Tag size={12} aria-hidden="true" />
                  {status.result.release.tag_name}
                </span>
                <time className="badge" dateTime={status.result.release.published_at}>
                  <Calendar size={12} aria-hidden="true" />
                  {formatDate(status.result.release.published_at)}
                </time>
              </div>

              <div className="hero-actions" style={{ marginTop: '1rem' }}>
                {primaryDownload ? (
                  <a
                    className="button button-large button-glow"
                    href={primaryDownload.browser_download_url}
                    aria-label={`Download ${status.result.release.tag_name}`}
                  >
                    <Download size={22} />
                    Download {config.name}
                  </a>
                ) : (
                  <a
                    className="button button-large button-glow"
                    href={status.result.release.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={22} />
                    View release on GitHub
                  </a>
                )}
                <a
                  className="button button-secondary button-large"
                  href={status.result.release.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={20} />
                  Release notes
                </a>
              </div>

              {status.result.release.assets.length > 0 && (
                <div className="cards" role="list" style={{ marginTop: '1.5rem' }}>
                  {status.result.release.assets.map((asset) => (
                    <article className="card" key={asset.name} role="listitem">
                      <div className="card-icon">{platformIcon(asset.name)}</div>
                      <h3 className="card-title">{getPlatform(asset.name)}</h3>
                      <p className="card-sub">{asset.name}</p>
                      <div className="card-row">
                        <span>Type</span>
                        <span>{asset.content_type}</span>
                      </div>
                      <div className="card-row">
                        <span>Size</span>
                        <span>{formatBytes(asset.size)}</span>
                      </div>
                      <a className="card-button" href={asset.browser_download_url} aria-label={`Download ${asset.name}`}>
                        <Download size={16} />
                        Download
                      </a>
                    </article>
                  ))}
                </div>
              )}

              <section aria-labelledby="platform-notes-title" style={{ marginTop: '1.5rem' }}>
                <h3 id="platform-notes-title">
                  <File size={18} aria-hidden="true" /> Release notes
                </h3>
                <pre className="release-body" aria-label="Release notes">
                  {status.result.release.body || 'No release notes provided.'}
                </pre>
              </section>
            </>
          )}
        </section>

        <section aria-labelledby="platform-about-title">
          <h2 id="platform-about-title">
            <Info size={20} aria-hidden="true" /> Where updates come from
          </h2>
          <p>
            This page checks for updates from both the developer’s personal repository and the
            Sozo-app organization’s copy of it, in this order:
          </p>
          <ol className="install-list">
            {config.sources.map((source) => (
              <li key={source.label}>
                <CheckCircle size={16} aria-hidden="true" />
                <span>
                  <a href={`https://github.com/${source.owner}/${source.repo}`} target="_blank" rel="noopener noreferrer">
                    {source.label}
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <p>
          <NavLink to="/downloads">← All platforms</NavLink> •{' '}
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
