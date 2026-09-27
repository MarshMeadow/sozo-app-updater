import type { Asset, Release, RepoSource } from './types'
import { SOZO_SOURCES } from '../constants/links'

const TRUSTED_URL_PREFIXES = [
  'https://github.com/',
  'https://objects.githubusercontent.com/',
] as const

export interface SourceFailure {
  source: string
  error: string
}

export interface ReleaseResult {
  release: Release
  source: RepoSource
}

export class ReleaseSourcesError extends Error {
  failures: SourceFailure[]

  constructor(failures: SourceFailure[]) {
    super(`All ${failures.length} release source(s) failed.`)
    this.name = 'ReleaseSourcesError'
    this.failures = failures
  }
}

function releasePrefixFor(source: RepoSource): string {
  return `https://github.com/${source.owner}/${source.repo}/releases/`
}

function isTrustedUrl(url: string): boolean {
  return TRUSTED_URL_PREFIXES.some((prefix) => url.startsWith(prefix))
}

function sanitizeString(value: string): string {
  // Strip control characters that could break rendering or be used for spoofing.
  return value.replace(/[\x00-\x1F\x7F]/g, '')
}

function validateAsset(item: unknown): Asset | null {
  if (!item || typeof item !== 'object') return null
  const a = item as Record<string, unknown>
  if (
    typeof a.name === 'string' &&
    typeof a.size === 'number' &&
    typeof a.content_type === 'string' &&
    typeof a.browser_download_url === 'string' &&
    isTrustedUrl(a.browser_download_url)
  ) {
    return {
      name: sanitizeString(a.name),
      size: a.size,
      content_type: sanitizeString(a.content_type),
      browser_download_url: a.browser_download_url,
    }
  }
  return null
}

function validateRelease(data: unknown, releaseUrlPrefix: string): Release {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid release data received.')
  }

  const release = data as Record<string, unknown>

  if (
    typeof release.tag_name !== 'string' ||
    typeof release.html_url !== 'string' ||
    typeof release.published_at !== 'string'
  ) {
    throw new Error('Release response is missing required fields.')
  }

  if (!release.html_url.startsWith(releaseUrlPrefix)) {
    throw new Error('Release URL does not come from the expected repository.')
  }

  const rawAssets = Array.isArray(release.assets) ? release.assets : []
  const assets: Asset[] = []

  for (const item of rawAssets) {
    const a = validateAsset(item)
    if (a) assets.push(a)
  }

  return {
    tag_name: sanitizeString(release.tag_name),
    name: sanitizeString(typeof release.name === 'string' ? release.name : release.tag_name),
    published_at: release.published_at,
    html_url: release.html_url,
    body: typeof release.body === 'string' ? sanitizeString(release.body) : null,
    assets,
  }
}

async function fetchReleaseFromSource(source: RepoSource): Promise<Release> {
  const res = await fetch(
    `https://api.github.com/repos/${source.owner}/${source.repo}/releases/latest`,
    { headers: { Accept: 'application/vnd.github+json' } },
  )

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  const data: unknown = await res.json()
  return validateRelease(data, releasePrefixFor(source))
}

/**
 * Fetches the latest release, trying each source in order (e.g. the
 * developer's personal repository, then the organization's mirror) and
 * falling back to the next one if a source fails or has no releases.
 */
export async function fetchLatestReleaseFrom(sources: RepoSource[]): Promise<ReleaseResult> {
  const failures: SourceFailure[] = []

  for (const source of sources) {
    try {
      const release = await fetchReleaseFromSource(source)
      return { release, source }
    } catch (err) {
      failures.push({
        source: source.label,
        error: err instanceof Error ? err.message : 'Unknown error',
      })
    }
  }

  throw new ReleaseSourcesError(failures)
}

/** Latest release for the main Sozo Android app. */
export async function fetchLatestRelease(): Promise<Release> {
  const { release } = await fetchLatestReleaseFrom(SOZO_SOURCES)
  return release
}

/**
 * Fetches the latest release for an arbitrary repository (used by the
 * GitHub Explorer, which lets you pick any repo from the developer's
 * profile or the Sozo-app organization). Returns `null` if the repository
 * has no published releases, rather than throwing.
 */
export async function fetchLatestReleaseForRepo(owner: string, repo: string): Promise<Release | null> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
    headers: { Accept: 'application/vnd.github+json' },
  })

  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  const data: unknown = await res.json()
  return validateRelease(data, `https://github.com/${owner}/${repo}/releases/`)
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

export function getPlatform(name: string): string {
  const lower = name.toLowerCase()
  if (lower.endsWith('.apk')) return 'Android'
  if (lower.endsWith('.exe') || lower.endsWith('.msix')) return 'Windows'
  if (lower.endsWith('.dmg')) return 'macOS'
  if (lower.endsWith('.appimage') || lower.endsWith('.deb') || lower.endsWith('.rpm')) return 'Linux'
  if (lower.endsWith('.zip')) return 'Archive'
  if (lower.endsWith('.tar.gz') || lower.endsWith('.tgz')) return 'Source'
  if (lower.endsWith('.tar')) return 'Source'
  if (lower.endsWith('.json')) return 'Metadata'
  return 'Unknown'
}

export function getReleaseType(tag: string, body: string | null): { type: string; className: string } {
  const source = `${tag} ${body ?? ''}`.toLowerCase()
  if (source.includes('nightly') || source.includes('dev') || source.includes('ci')) {
    return { type: 'Development', className: 'badge-dev' }
  }
  if (source.includes('beta')) {
    return { type: 'Beta', className: 'badge-beta' }
  }
  if (source.includes('alpha')) {
    return { type: 'Alpha', className: 'badge-beta' }
  }
  if (source.includes('rc')) {
    return { type: 'Release Candidate', className: 'badge-beta' }
  }
  return { type: 'Stable', className: 'badge-stable' }
}
