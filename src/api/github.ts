import type { Contributor, RepoSummary } from './types'

const TRUSTED_API = 'https://api.github.com'

export interface RepoInfo {
  pushedAt: string | null
  stars: number | null
}

export function parseGitHubRepo(url: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(url)
    if (u.hostname !== 'github.com' && u.hostname !== 'www.github.com') return null
    const [, owner, repo] = u.pathname.split('/')
    if (!owner || !repo) return null
    return { owner, repo }
  } catch {
    return null
  }
}

export async function fetchRepoInfo(owner: string, repo: string): Promise<RepoInfo | null> {
  try {
    const res = await fetch(`${TRUSTED_API}/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null
    const data: unknown = await res.json()
    if (!data || typeof data !== 'object') return null
    const record = data as Record<string, unknown>
    return {
      pushedAt: typeof record.pushed_at === 'string' ? record.pushed_at : null,
      stars: typeof record.stargazers_count === 'number' ? record.stargazers_count : null,
    }
  } catch {
    return null
  }
}

export async function fetchRepoPushedAt(owner: string, repo: string): Promise<string | null> {
  const info = await fetchRepoInfo(owner, repo)
  return info?.pushedAt ?? null
}

export async function fetchContributors(
  owner: string,
  repo: string,
): Promise<Contributor[]> {
  const res = await fetch(`${TRUSTED_API}/repos/${owner}/${repo}/contributors?per_page=100`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status}`)
  }
  const data: unknown = await res.json()
  if (!Array.isArray(data)) {
    throw new Error('Invalid contributors list received.')
  }
  const contributors: Contributor[] = []
  for (const item of data) {
    if (!item || typeof item !== 'object') continue
    const c = item as Record<string, unknown>
    if (
      typeof c.login === 'string' &&
      typeof c.avatar_url === 'string' &&
      c.avatar_url.startsWith('https://avatars.githubusercontent.com/') &&
      typeof c.html_url === 'string' &&
      c.html_url.startsWith('https://github.com/') &&
      typeof c.contributions === 'number'
    ) {
      contributors.push({
        login: c.login,
        avatar: c.avatar_url,
        url: c.html_url,
        contributions: c.contributions,
      })
    }
  }
  return contributors
}

function parseRepoSummary(item: unknown): RepoSummary | null {
  if (!item || typeof item !== 'object') return null
  const r = item as Record<string, unknown>
  if (
    typeof r.name !== 'string' ||
    typeof r.full_name !== 'string' ||
    typeof r.html_url !== 'string' ||
    !r.html_url.startsWith('https://github.com/')
  ) {
    return null
  }
  const owner =
    r.owner && typeof r.owner === 'object' && typeof (r.owner as Record<string, unknown>).login === 'string'
      ? ((r.owner as Record<string, unknown>).login as string)
      : r.full_name.split('/')[0]
  const license =
    r.license && typeof r.license === 'object' && typeof (r.license as Record<string, unknown>).spdx_id === 'string'
      ? ((r.license as Record<string, unknown>).spdx_id as string)
      : null
  const topics = Array.isArray(r.topics) ? r.topics.filter((t): t is string => typeof t === 'string') : []

  return {
    owner,
    name: r.name,
    fullName: r.full_name,
    description: typeof r.description === 'string' ? r.description : null,
    htmlUrl: r.html_url,
    stars: typeof r.stargazers_count === 'number' ? r.stargazers_count : 0,
    forks: typeof r.forks_count === 'number' ? r.forks_count : 0,
    openIssues: typeof r.open_issues_count === 'number' ? r.open_issues_count : 0,
    language: typeof r.language === 'string' ? r.language : null,
    license: license && license !== 'NOASSERTION' ? license : null,
    topics,
    updatedAt: typeof r.updated_at === 'string' ? r.updated_at : null,
    pushedAt: typeof r.pushed_at === 'string' ? r.pushed_at : null,
    defaultBranch: typeof r.default_branch === 'string' ? r.default_branch : 'main',
    archived: r.archived === true,
    fork: r.fork === true,
  }
}

/**
 * Lists public repositories for a GitHub user or organization. Tries the
 * organization endpoint first (since that's the correct one for orgs like
 * Sozo-app) and falls back to the user endpoint otherwise.
 */
export async function fetchAccountRepos(owner: string): Promise<RepoSummary[]> {
  const endpoints = [
    `${TRUSTED_API}/orgs/${owner}/repos?per_page=100&sort=updated`,
    `${TRUSTED_API}/users/${owner}/repos?per_page=100&sort=updated`,
  ]

  let lastError: string | null = null
  for (const url of endpoints) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
      if (!res.ok) {
        lastError = `HTTP ${res.status}`
        continue
      }
      const data: unknown = await res.json()
      if (!Array.isArray(data)) {
        lastError = 'Invalid repository list received.'
        continue
      }
      const repos: RepoSummary[] = []
      for (const item of data) {
        const parsed = parseRepoSummary(item)
        if (parsed) repos.push(parsed)
      }
      return repos
    } catch (err) {
      lastError = err instanceof Error ? err.message : 'Unknown error'
    }
  }

  throw new Error(lastError ?? `Could not load repositories for ${owner}.`)
}

export function formatCount(n: number): string {
  if (n < 1000) return String(n)
  if (n < 1_000_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
}

export function timeAgo(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  if (Number.isNaN(date.getTime())) return 'unknown'
  const seconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000))
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return 'just now'
  if (minutes === 1) return '1 minute ago'
  if (minutes < 60) return `${minutes} minutes ago`
  if (hours === 1) return '1 hour ago'
  if (hours < 24) return `${hours} hours ago`
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  if (months === 1) return '1 month ago'
  if (months < 12) return `${months} months ago`
  if (years === 1) return '1 year ago'
  return `${years} years ago`
}
