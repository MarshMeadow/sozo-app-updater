import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  Calendar,
  Code,
  Download,
  ExternalLink,
  File,
  GitFork,
  Package,
  RefreshCw,
  Scale,
  Search,
  Smartphone,
  Star,
  Tag,
} from 'lucide-react'
import Seo from '../components/Seo'
import { fetchAccountRepos, formatCount, timeAgo } from '../api/github'
import { fetchLatestReleaseForRepo, formatBytes, formatDate, getPlatform, getReleaseType } from '../api/release'
import type { RepoSummary, Release } from '../api/types'
import { DEV_GITHUB, SOZO_ORG_GITHUB } from '../constants/links'

interface Account {
  owner: string
  label: string
  url: string
}

const ACCOUNTS: Account[] = [
  { owner: 'professorDeveloper', label: "Developer profile", url: DEV_GITHUB },
  { owner: 'Sozo-app', label: 'Organization', url: SOZO_ORG_GITHUB },
]

type AccountState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ok'; repos: RepoSummary[] }

type SortKey = 'updated' | 'stars' | 'forks' | 'name'

type ReleaseState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ok'; release: Release | null }

const platformIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.endsWith('.apk')) return <Smartphone size={18} />
  if (lower.endsWith('.zip') || lower.endsWith('.tar.gz') || lower.endsWith('.tar')) return <Package size={18} />
  return <File size={18} />
}

export default function Explorer() {
  const [accountStates, setAccountStates] = useState<Record<string, AccountState>>({})
  const [search, setSearch] = useState('')
  const [ownerFilter, setOwnerFilter] = useState<'all' | string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('updated')
  const [selected, setSelected] = useState<RepoSummary | null>(null)
  const [releaseState, setReleaseState] = useState<ReleaseState>({ kind: 'idle' })

  const loadAccount = (account: Account) => {
    setAccountStates((s) => ({ ...s, [account.owner]: { kind: 'loading' } }))
    fetchAccountRepos(account.owner)
      .then((repos) => {
        setAccountStates((s) => ({ ...s, [account.owner]: { kind: 'ok', repos } }))
      })
      .catch((err: unknown) => {
        setAccountStates((s) => ({
          ...s,
          [account.owner]: { kind: 'error', message: err instanceof Error ? err.message : 'Unknown error' },
        }))
      })
  }

  useEffect(() => {
    ACCOUNTS.forEach(loadAccount)
  }, [])

  const allRepos = useMemo(() => {
    return ACCOUNTS.flatMap((account) => {
      const state = accountStates[account.owner]
      return state?.kind === 'ok' ? state.repos : []
    })
  }, [accountStates])

  const filteredRepos = useMemo(() => {
    const q = search.trim().toLowerCase()
    let repos = allRepos.filter((repo) => {
      if (ownerFilter !== 'all' && repo.owner !== ownerFilter) return false
      if (!q) return true
      return (
        repo.name.toLowerCase().includes(q) ||
        (repo.description ?? '').toLowerCase().includes(q) ||
        repo.topics.some((t) => t.toLowerCase().includes(q))
      )
    })

    repos = [...repos].sort((a, b) => {
      if (sortKey === 'stars') return b.stars - a.stars
      if (sortKey === 'forks') return b.forks - a.forks
      if (sortKey === 'name') return a.name.localeCompare(b.name)
      // updated
      const at = a.pushedAt ? new Date(a.pushedAt).getTime() : 0
      const bt = b.pushedAt ? new Date(b.pushedAt).getTime() : 0
      return bt - at
    })

    return repos
  }, [allRepos, search, ownerFilter, sortKey])

  useEffect(() => {
    if (!selected) {
      setReleaseState({ kind: 'idle' })
      return
    }
    let active = true
    setReleaseState({ kind: 'loading' })
    fetchLatestReleaseForRepo(selected.owner, selected.name)
      .then((release) => {
        if (active) setReleaseState({ kind: 'ok', release })
      })
      .catch((err: unknown) => {
        if (active) {
          setReleaseState({ kind: 'error', message: err instanceof Error ? err.message : 'Unknown error' })
        }
      })
    return () => {
      active = false
    }
  }, [selected])

  const loadingAccounts = ACCOUNTS.filter((a) => accountStates[a.owner]?.kind === 'loading')
  const erroredAccounts = ACCOUNTS.filter((a) => accountStates[a.owner]?.kind === 'error')

  return (
    <div className="container">
      <Seo
        title="Explorer - Sozo Updater"
        description="Browse every repository from the Sozo developer's profile and the Sozo-app organization, and check each one's latest release."
      />
      <article className="page-article">
        <h1>
          <Search size={28} className="page-icon" aria-hidden="true" />
          GitHub Explorer
        </h1>
        <p>
          Browse every public repository from{' '}
          <a href={DEV_GITHUB} target="_blank" rel="noopener noreferrer">
            professorDeveloper
          </a>{' '}
          and the{' '}
          <a href={SOZO_ORG_GITHUB} target="_blank" rel="noopener noreferrer">
            Sozo-app
          </a>{' '}
          organization. Pick any repository to see its details and check whether it has a
          downloadable release.
        </p>

        {loadingAccounts.length > 0 && (
          <div className="archive-loading" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <p className="archive-loading-text">
              Loading repositories from {loadingAccounts.map((a) => a.label).join(' & ')}…
            </p>
          </div>
        )}

        {erroredAccounts.map((account) => (
          <div className="contrib-error" role="alert" key={account.owner}>
            <AlertTriangle size={18} aria-hidden="true" />
            <span>Couldn’t load repositories for {account.label} ({account.owner}).</span>
            <button type="button" className="button button-secondary contrib-retry" onClick={() => loadAccount(account)}>
              <RefreshCw size={14} aria-hidden="true" />
              Retry
            </button>
          </div>
        ))}

        <section aria-labelledby="explorer-filters-title">
          <h2 id="explorer-filters-title" className="sr-only">
            Filters
          </h2>
          <div className="explorer-search">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, description, or topic…"
              aria-label="Search repositories"
            />
          </div>

          <div className="setting-options" role="group" aria-label="Filter by owner" style={{ marginTop: '0.75rem' }}>
            <button
              type="button"
              className={`setting-option${ownerFilter === 'all' ? ' active' : ''}`}
              onClick={() => setOwnerFilter('all')}
              aria-pressed={ownerFilter === 'all'}
            >
              All ({allRepos.length})
            </button>
            {ACCOUNTS.map((account) => {
              const count = allRepos.filter((r) => r.owner === account.owner).length
              return (
                <button
                  key={account.owner}
                  type="button"
                  className={`setting-option${ownerFilter === account.owner ? ' active' : ''}`}
                  onClick={() => setOwnerFilter(account.owner)}
                  aria-pressed={ownerFilter === account.owner}
                >
                  {account.label} ({count})
                </button>
              )
            })}
          </div>

          <div className="setting-options" role="group" aria-label="Sort by" style={{ marginTop: '0.5rem' }}>
            {(
              [
                ['updated', 'Recently updated'],
                ['stars', 'Most stars'],
                ['forks', 'Most forks'],
                ['name', 'Name'],
              ] as [SortKey, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`setting-option${sortKey === key ? ' active' : ''}`}
                onClick={() => setSortKey(key)}
                aria-pressed={sortKey === key}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="explorer-results-title">
          <h2 id="explorer-results-title" className="sr-only">
            Repositories
          </h2>
          {filteredRepos.length === 0 ? (
            <p className="state">No repositories match your filters yet.</p>
          ) : (
            <div className="explorer-grid">
              <div className="explorer-list" role="list">
                {filteredRepos.map((repo) => (
                  <button
                    key={repo.fullName}
                    type="button"
                    role="listitem"
                    className={`explorer-item${selected?.fullName === repo.fullName ? ' active' : ''}`}
                    onClick={() => setSelected(repo)}
                    aria-pressed={selected?.fullName === repo.fullName}
                  >
                    <span className="explorer-item-title">
                      {repo.name}
                      {repo.fork && <span className="fork-tag">fork</span>}
                      {repo.archived && <span className="fork-tag">archived</span>}
                    </span>
                    <span className="explorer-item-owner">{repo.owner}</span>
                    {repo.description && <span className="explorer-item-desc">{repo.description}</span>}
                    <span className="explorer-item-meta">
                      {repo.language && <span>{repo.language}</span>}
                      <span>
                        <Star size={12} aria-hidden="true" /> {formatCount(repo.stars)}
                      </span>
                      <span>
                        <GitFork size={12} aria-hidden="true" /> {formatCount(repo.forks)}
                      </span>
                      {repo.pushedAt && <span>updated {timeAgo(repo.pushedAt)}</span>}
                    </span>
                  </button>
                ))}
              </div>

              <div className="explorer-detail">
                {!selected && (
                  <p className="state">Select a repository from the list to see its details here.</p>
                )}

                {selected && (
                  <>
                    <h3 className="explorer-detail-title">
                      <Code size={18} aria-hidden="true" /> {selected.fullName}
                    </h3>
                    {selected.description && <p>{selected.description}</p>}

                    <div className="release-meta">
                      {selected.language && <span className="badge badge-unofficial">{selected.language}</span>}
                      {selected.license && (
                        <span className="badge badge-unofficial">
                          <Scale size={12} aria-hidden="true" /> {selected.license}
                        </span>
                      )}
                      <span className="badge badge-unofficial">
                        <Star size={12} aria-hidden="true" /> {formatCount(selected.stars)} stars
                      </span>
                      <span className="badge badge-unofficial">
                        <GitFork size={12} aria-hidden="true" /> {formatCount(selected.forks)} forks
                      </span>
                      {selected.pushedAt && (
                        <time className="badge" dateTime={selected.pushedAt}>
                          <Calendar size={12} aria-hidden="true" /> updated {timeAgo(selected.pushedAt)}
                        </time>
                      )}
                    </div>

                    {selected.topics.length > 0 && (
                      <div className="fork-tags" style={{ marginTop: '0.5rem' }}>
                        {selected.topics.map((topic) => (
                          <span className="fork-tag" key={topic}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="hero-fallbacks" style={{ marginTop: '1rem' }}>
                      <a className="button button-secondary" href={selected.htmlUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                        View repository
                      </a>
                      <a
                        className="button button-secondary"
                        href={`${selected.htmlUrl}/releases`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                        All releases
                      </a>
                    </div>

                    <div style={{ marginTop: '1.25rem' }}>
                      <h4 className="section-subheading">
                        <Download size={16} aria-hidden="true" /> Latest release
                      </h4>

                      {releaseState.kind === 'loading' && (
                        <div className="archive-loading" role="status" aria-live="polite">
                          <div className="spinner" aria-hidden="true" />
                          <p className="archive-loading-text">Checking for releases…</p>
                        </div>
                      )}

                      {releaseState.kind === 'error' && (
                        <div className="contrib-error" role="alert">
                          <AlertTriangle size={16} aria-hidden="true" />
                          <span>Couldn’t load release info: {releaseState.message}</span>
                        </div>
                      )}

                      {releaseState.kind === 'ok' && releaseState.release === null && (
                        <p className="state">This repository has no published releases yet.</p>
                      )}

                      {releaseState.kind === 'ok' && releaseState.release && (
                        <>
                          <div className="release-meta">
                            <span
                              className={`badge ${getReleaseType(releaseState.release.tag_name, releaseState.release.body).className}`}
                            >
                              {getReleaseType(releaseState.release.tag_name, releaseState.release.body).type}
                            </span>
                            <span className="badge badge-unofficial" title={releaseState.release.tag_name}>
                              <Tag size={12} aria-hidden="true" />
                              {releaseState.release.tag_name}
                            </span>
                            <time className="badge" dateTime={releaseState.release.published_at}>
                              <Calendar size={12} aria-hidden="true" />
                              {formatDate(releaseState.release.published_at)}
                            </time>
                          </div>

                          {releaseState.release.assets.length === 0 ? (
                            <p role="status" className="state">
                              This release has no files attached.{' '}
                              <a href={releaseState.release.html_url} target="_blank" rel="noopener noreferrer">
                                View on GitHub
                              </a>
                            </p>
                          ) : (
                            <div className="cards" role="list" style={{ marginTop: '0.75rem' }}>
                              {releaseState.release.assets.map((asset) => (
                                <article className="card" key={asset.name} role="listitem">
                                  <div className="card-icon">{platformIcon(asset.name)}</div>
                                  <h3 className="card-title">{getPlatform(asset.name)}</h3>
                                  <p className="card-sub">{asset.name}</p>
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
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </section>
      </article>
    </div>
  )
}
