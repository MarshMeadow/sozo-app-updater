import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Download,
  MessageCircle,
  ExternalLink,
  Smartphone,
  Shield,
  Code,
  Users,
  Zap,
  AlertTriangle,
  Calendar,
  Tag,
  File,
  Package,
  Info,
  Globe,
  HelpCircle,
  Monitor,
  CheckCircle,
  Heart,
  RefreshCw,
  Star,
  Tv,
  Clock,
} from 'lucide-react'
import { fetchLatestRelease, formatBytes, formatDate, getPlatform, getReleaseType } from '../api/release'
import { formatCount, timeAgo } from '../api/github'
import { useRepoMeta } from '../hooks/useStats'
import type { Release } from '../api/types'
import Seo from '../components/Seo'
import CopyText from '../components/CopyText'
import { DISCLAIMER, RISK_NOTICE } from '../constants/legal'
import {
  SOZO_GITHUB,
  SOZO_WEBSITE,
  SOZO_TELEGRAM,
  DEV_GITHUB,
  DEV_WEBSITE,
  OBTAINIUM_ADD,
  OBTAINIUM_GITHUB,
  RELATED_APPS,
  PLATFORMS,
  WEBSITE_REPO,
} from '../constants/links'

const PLATFORM_ICONS: Record<string, typeof Smartphone> = {
  apk: Smartphone,
  tv: Tv,
  desktop: Monitor,
  legacy: Clock,
}

type Status = { kind: 'loading' } | { kind: 'error'; message: string } | { kind: 'ok'; release: Release }

const RELATED_URLS = RELATED_APPS.map((app) => app.url)
const OTHER_PLATFORM_URLS = PLATFORMS.filter((p) => p.slug !== 'apk').map((p) => p.repoUrl)

const platformIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.endsWith('.apk')) return <Smartphone size={20} />
  if (lower.endsWith('.zip') || lower.endsWith('.tar.gz') || lower.endsWith('.tar')) return <Package size={20} />
  return <File size={20} />
}

export default function Home() {
  const [status, setStatus] = useState<Status>({ kind: 'loading' })

  useEffect(() => {
    let active = true
    fetchLatestRelease()
      .then((release) => {
        if (active) setStatus({ kind: 'ok', release })
      })
      .catch((err) => {
        if (active) setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Unknown error' })
      })
    return () => {
      active = false
    }
  }, [])

  const primaryDownload = useMemo(() => {
    if (status.kind !== 'ok') return null
    const lowerAssets = status.release.assets.map((a) => ({
      ...a,
      lower: a.name.toLowerCase(),
    }))
    const universal = lowerAssets.find((a) => a.lower.endsWith('.apk') && a.lower.includes('universal'))
    const firstApk = lowerAssets.find((a) => a.lower.endsWith('.apk'))
    return (universal ?? firstApk) ?? null
  }, [status])

  const relatedMeta = useRepoMeta(RELATED_URLS)
  const platformMeta = useRepoMeta(OTHER_PLATFORM_URLS)

  return (
    <>
      <Seo
        title="Download the Latest Version"
        description="Download the latest version of Sozo, a cinematic streaming app for Android. View release notes, related apps, and community links."
      />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-glow hero-glow-2" aria-hidden="true" />
        <div className="container hero-content">
          <h1 id="hero-title" className="hero-title gradient-text">
            Sozo Updater
          </h1>
          <p className="hero-subtitle">
            Download the latest version of Sozo — a cinematic streaming app for Android with fast
            browsing, clean visuals, smooth playback, and offline downloads. This is an independent
            community updater site.
          </p>

          <div className="hero-actions">
            {status.kind === 'loading' && (
              <div className="skeleton-block" aria-busy="true" aria-live="polite">
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-button" />
              </div>
            )}

            {status.kind === 'error' && (
              <div className="error-card" role="alert">
                <AlertTriangle size={32} className="error-icon" />
                <h2 className="error-title">Couldn’t load release data</h2>
                <p className="error-message">{status.message}</p>
                <div className="hero-fallbacks">
                  <a className="button" href={SOZO_TELEGRAM} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={18} />
                    Telegram updates
                  </a>
                  <a className="button button-secondary" href={SOZO_GITHUB} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} />
                    Sozo repository
                  </a>
                </div>
              </div>
            )}

            {status.kind === 'ok' && (
              <div className="release-hero">
                <div className="release-meta">
                  <span className="badge badge-unofficial">
                    <Users size={12} aria-hidden="true" />
                    Community
                  </span>
                  <span className="badge badge-unofficial">
                    <Smartphone size={12} aria-hidden="true" />
                    Android
                  </span>
                  <span className={`badge ${getReleaseType(status.release.tag_name, status.release.body).className}`}>
                    {getReleaseType(status.release.tag_name, status.release.body).type}
                  </span>
                  <span className="badge badge-unofficial" title={status.release.tag_name}>
                    <Tag size={12} aria-hidden="true" />
                    {status.release.tag_name}
                  </span>
                  <time className="badge" dateTime={status.release.published_at}>
                    <Calendar size={12} aria-hidden="true" />
                    {formatDate(status.release.published_at)}
                  </time>
                </div>

                {primaryDownload ? (
                  <a
                    className="button button-large button-glow"
                    href={primaryDownload.browser_download_url}
                    aria-label={`Download ${status.release.tag_name}`}
                  >
                    <Download size={22} />
                    Download Latest Version
                  </a>
                ) : (
                  <a
                    className="button button-large button-glow"
                    href={status.release.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={22} />
                    View Release on GitHub
                  </a>
                )}

                <a
                  className="button button-secondary button-large"
                  href={status.release.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={20} />
                  View release notes
                </a>

                <p className="hero-note">
                  <Smartphone size={14} aria-hidden="true" /> This download link is for the{' '}
                  <strong>Android (mobile)</strong> app. Looking for TV, Desktop, or the legacy
                  client? <NavLink to="/downloads">See all platforms</NavLink>.
                </p>
              </div>
            )}
          </div>

          <aside className="disclaimer">
            <strong>
              <Shield size={16} aria-hidden="true" /> Disclaimer
            </strong>
            {DISCLAIMER} {RISK_NOTICE}
          </aside>
        </div>
      </section>

      <div className="container">
        <section className="section section-raised" aria-labelledby="platforms-title">
          <h2 id="platforms-title" className="section-heading">
            <Download size={22} aria-hidden="true" />
            Get Sozo on any platform
          </h2>
          <p className="about-text">
            Sozo isn’t just for phones. Pick your platform for a dedicated download page that
            always checks the latest release.
          </p>
          <div className="cards fork-grid" role="list">
            {PLATFORMS.map((platform) => {
              const Icon = PLATFORM_ICONS[platform.slug] ?? Smartphone
              return (
                <article className="fork-card" key={platform.slug} role="listitem">
                  <h3>
                    <Icon size={16} aria-hidden="true" style={{ marginRight: '0.35rem', verticalAlign: '-2px' }} />
                    {platform.name}
                  </h3>
                  <p className="fork-author">
                    {platform.platform}
                    {platformMeta[platform.repoUrl]?.stars != null && (
                      <span className="fork-stars">
                        <Star size={12} aria-hidden="true" />
                        {formatCount(platformMeta[platform.repoUrl]!.stars!)}
                      </span>
                    )}
                  </p>
                  <p className="fork-desc">{platform.description}</p>
                  <NavLink to={`/${platform.slug}`} className="card-button">
                    <Download size={16} />
                    Download
                  </NavLink>
                </article>
              )
            })}
          </div>
          <div className="hero-fallbacks">
            <NavLink to="/downloads" className="button button-secondary">
              <ExternalLink size={18} />
              See all platforms
            </NavLink>
            <NavLink to="/explorer" className="button button-secondary">
              <HelpCircle size={18} />
              Browse every repository
            </NavLink>
          </div>
        </section>

        <section className="features" aria-labelledby="features-title">
          <h2 id="features-title" className="sr-only">
            Features
          </h2>
          <article className="feature-card">
            <div className="feature-icon">
              <Zap size={28} />
            </div>
            <h3>Cinematic experience</h3>
            <p>Fast browsing, clean visuals, smooth playback, and offline downloads built for everyday watching.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">
              <Users size={28} />
            </div>
            <h3>Community driven</h3>
            <p>Join the official Telegram for updates, help, and discussion with other Sozo users.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">
              <RefreshCw size={28} />
            </div>
            <h3>Always up to date</h3>
            <p>The latest release is fetched directly from the Sozo GitHub repository and listed here.</p>
          </article>
        </section>

        <section className="section section-raised" aria-labelledby="about-title">
          <h2 id="about-title" className="section-heading">
            <Info size={22} aria-hidden="true" />
            What is Sozo?
          </h2>
          <p className="about-text">
            Sozo focuses on a cinematic mobile experience: fast browsing, clean visuals, smooth
            playback, and a layout that feels made for everyday watching. From home discovery to
            offline downloads, every screen is designed to get you to the next thing you want to
            watch quickly. Sozo is built with Flutter and is open source under the GPL-3.0 license.
          </p>
          <ul className="about-list">
            <li>
              <Zap size={16} aria-hidden="true" />
              Fast home discovery for anime and movies
            </li>
            <li>
              <Zap size={16} aria-hidden="true" />
              Clean, modern UI with smooth playback
            </li>
            <li>
              <Zap size={16} aria-hidden="true" />
              Offline downloads for watching later
            </li>
            <li>
              <Zap size={16} aria-hidden="true" />
              Companion apps for TV, desktop, and music
            </li>
          </ul>
          <div className="hero-fallbacks">
            <a className="button" href={SOZO_WEBSITE} target="_blank" rel="noopener noreferrer">
              <Globe size={18} />
              Official website
            </a>
            <a className="button button-secondary" href={SOZO_GITHUB} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} />
              Official GitHub
            </a>
          </div>
        </section>

        {status.kind === 'ok' && (
          <>
            <section className="section section-raised" aria-labelledby="downloads-title">
              <h2 id="downloads-title" className="section-heading">
                <Download size={22} aria-hidden="true" />
                Available files
              </h2>
              {status.release.assets.length === 0 ? (
                <p role="status" className="state">
                  No files are attached to this release.
                </p>
              ) : (
                <div className="cards" role="list">
                  {status.release.assets.map((asset) => (
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
                      <a
                        className="card-button"
                        href={asset.browser_download_url}
                        aria-label={`Download ${asset.name}`}
                      >
                        <Download size={16} />
                        Download
                      </a>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="section" aria-labelledby="notes-title">
              <h2 id="notes-title" className="section-heading">
                <File size={22} aria-hidden="true" />
                Release notes
              </h2>
              <pre className="release-body" aria-label="Release notes">
                {status.release.body || 'No release notes provided.'}
              </pre>
            </section>
          </>
        )}

        <section className="section section-raised" aria-labelledby="install-title">
          <h2 id="install-title" className="section-heading">
            <Monitor size={22} aria-hidden="true" />
            How to install
          </h2>
          <ol className="install-list">
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Download the latest <strong>.apk</strong> from the release above.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Open the downloaded file. Android may ask you to allow installation from this source.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Enable <strong>Install from unknown sources</strong> for your browser or file manager.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Wait for the installation to finish, then open Sozo and start browsing.
              </span>
            </li>
          </ol>
        </section>

        <section className="section section-raised" aria-labelledby="obtainium-title">
          <h2 id="obtainium-title" className="section-heading">
            <RefreshCw size={22} aria-hidden="true" />
            Stay updated with Obtainium
          </h2>
          <p className="about-text">
            <a href={OBTAINIUM_GITHUB} target="_blank" rel="noopener noreferrer">Obtainium</a> is a
            free, open-source Android app that tracks updates directly from sources like GitHub
            releases — no app store needed. Once set up, it notifies you whenever a new Sozo
            release is published and installs it for you.
          </p>
          <ol className="install-list">
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Install Obtainium from its{' '}
                <a href={`${OBTAINIUM_GITHUB}/releases`} target="_blank" rel="noopener noreferrer">
                  GitHub releases
                </a>{' '}
                page or from F-Droid.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Open Obtainium and tap <strong>Add App</strong>.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Paste the Sozo repository URL:{' '}
                <CopyText text={SOZO_GITHUB} />
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Confirm the app details — Obtainium picks the APK from each new release and handles
                updates from then on.
              </span>
            </li>
          </ol>
          <div className="hero-fallbacks">
            <a className="button" href={OBTAINIUM_ADD} target="_blank" rel="noopener noreferrer">
              <RefreshCw size={18} />
              Add to Obtainium
            </a>
            <a className="button button-secondary" href={OBTAINIUM_GITHUB} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} />
              Get Obtainium
            </a>
            <NavLink to="/obtainium" className="button button-secondary">
              <HelpCircle size={18} />
              Full setup guide
            </NavLink>
          </div>
        </section>

        <section className="section section-raised" aria-labelledby="community-title">
          <h2 id="community-title" className="section-heading">
            <Users size={22} aria-hidden="true" />
            Community & official links
          </h2>
          <div className="social-grid" role="list">
            <a
              href={SOZO_TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              role="listitem"
            >
              <MessageCircle size={22} aria-hidden="true" />
              <span>Official Telegram</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href={SOZO_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              role="listitem"
            >
              <Globe size={22} aria-hidden="true" />
              <span>Official website</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href={SOZO_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              role="listitem"
            >
              <Code size={22} aria-hidden="true" />
              <span>Sozo source</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <NavLink to="/contributors" className="social-card" role="listitem">
              <Users size={22} aria-hidden="true" />
              <span>Contributors</span>
            </NavLink>
            <a
              href={DEV_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              role="listitem"
            >
              <ExternalLink size={22} aria-hidden="true" />
              <span>Developer GitHub</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href={DEV_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              role="listitem"
            >
              <Globe size={22} aria-hidden="true" />
              <span>azamov.me</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="section section-raised" aria-labelledby="related-title">
          <h2 id="related-title" className="section-heading">
            <Tv size={22} aria-hidden="true" />
            Companion apps
          </h2>
          <p className="about-text">
            The same developer and organization also maintain a couple of companion apps around
            Sozo. Always read their README and release notes before installing.
          </p>
          <div className="cards fork-grid" role="list">
            {RELATED_APPS.map((app) => (
              <article className="fork-card" key={app.url} role="listitem">
                <h3>{app.name}</h3>
                <p className="fork-author">
                  {relatedMeta[app.url]?.stars != null && (
                    <span className="fork-stars">
                      <Star size={12} aria-hidden="true" />
                      {formatCount(relatedMeta[app.url]!.stars!)}
                    </span>
                  )}
                  {relatedMeta[app.url]?.pushedAt && (
                    <span className="fork-updated">
                      updated {timeAgo(relatedMeta[app.url]!.pushedAt!)}
                    </span>
                  )}
                </p>
                <p className="fork-desc">{app.description}</p>
                <div className="fork-tags">
                  {app.tags.map((tag) => (
                    <span className="fork-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  className="card-button"
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${app.name} repository`}
                >
                  <ExternalLink size={16} />
                  View repository
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-raised" aria-labelledby="faq-title">
          <h2 id="faq-title" className="section-heading">
            <HelpCircle size={22} aria-hidden="true" />
            Frequently asked questions
          </h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Is this the official Sozo website?</summary>
              <p>
                No. This is an independent community updater site. The official website is{' '}
                <a href={SOZO_WEBSITE} target="_blank" rel="noopener noreferrer">sozo.framer.website</a>.
              </p>
            </details>
            <details className="faq-item">
              <summary>Does Sozo host anime or movies?</summary>
              <p>
                This site does not host, upload, or distribute any media. It only links to the
                publicly published Sozo release on GitHub.
              </p>
            </details>
            <details className="faq-item">
              <summary>Is it safe to install APKs from this page?</summary>
              <p>
                The APKs are downloaded directly from the linked GitHub release. Always verify the
                source, check the repository, and install at your own risk.
              </p>
            </details>
            <details className="faq-item">
              <summary>Is there a version for TV or desktop?</summary>
              <p>
                Yes — <NavLink to="/tv">Sozo TV</NavLink> targets Android TV / Google TV,{' '}
                <NavLink to="/desktop">Sozo Desktop</NavLink> brings Sozo to Windows, macOS, and
                Linux, and the <NavLink to="/legacy">legacy Kotlin client</NavLink> is still
                available for anyone who needs it. See the <NavLink to="/downloads">downloads
                page</NavLink> for all of them.
              </p>
            </details>
          </div>
        </section>

        <section className="section section-raised" aria-labelledby="safety-title">
          <h2 id="safety-title" className="section-heading">
            <Shield size={22} aria-hidden="true" />
            Staying safe online
          </h2>
          <div className="features how-features">
            <article className="feature-card">
              <h3>Only download from trusted sources</h3>
              <p>
                Stick to official or well-known community repositories. Double-check the URL before
                downloading anything.
              </p>
            </article>
            <article className="feature-card">
              <h3>Scan files before installing</h3>
              <p>
                Upload APKs to{' '}
                <a href="https://www.virustotal.com" target="_blank" rel="noopener noreferrer">
                  VirusTotal
                </a>{' '}
                to scan with dozens of antivirus engines, or scan with your installed antivirus.
              </p>
            </article>
            <article className="feature-card">
              <h3>Keep your device updated</h3>
              <p>
                Install Android security updates. Only enable “Install unknown apps” for apps and
                browsers you actually use.
              </p>
            </article>
          </div>
        </section>

        <section className="section section-raised" aria-labelledby="sponsor-title">
          <h2 id="sponsor-title" className="section-heading">
            <Heart size={22} aria-hidden="true" />
            Support the developer
          </h2>
          <p>
            Sozo is built and maintained by <strong>Azamov X (professorDeveloper)</strong>, an
            Android/software engineer based in Tashkent, Uzbekistan. If you enjoy the app, star the
            repository, share it with friends, or say hello on his socials.
          </p>
          <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
            <a
              href={DEV_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-large button-glow"
            >
              <Heart size={18} />
              Follow the developer
            </a>
            <NavLink to="/community" className="button button-large button-secondary">
              <Users size={18} />
              Community links
            </NavLink>
          </div>
          <p className="about-note" style={{ marginTop: '1rem' }}>
            Found an issue with this website? Open an issue on{' '}
            <a href={WEBSITE_REPO} target="_blank" rel="noopener noreferrer">its repository</a>.
          </p>
        </section>
      </div>
    </>
  )
}
