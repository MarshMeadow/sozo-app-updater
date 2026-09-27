import type { RepoSource } from '../api/types'

// Sozo app
export const SOZO_GITHUB = 'https://github.com/professorDeveloper/sozo' as const
export const SOZO_ORG_GITHUB = 'https://github.com/Sozo-app' as const
export const SOZO_WEBSITE = 'https://sozo.framer.website' as const
export const SOZO_TELEGRAM = 'https://t.me/sozoapp' as const
export const WEBSITE_REPO = 'https://github.com/MarshMeadow/sozo-app-updater' as const

// Related Sozo projects, all by the same developer/organization
export const SOZO_TV_REPO = 'https://github.com/professorDeveloper/sozo-tv' as const
export const SOZO_DESKTOP_REPO = 'https://github.com/professorDeveloper/Sozo-Desktop' as const
export const SOZO_LEGACY_REPO = 'https://github.com/professorDeveloper/Sozo-App' as const
export const SOMUSIC_REPO = 'https://github.com/Sozo-app/SoMusic' as const
export const SOZO_LOGIN_REPO = 'https://github.com/Sozo-app/Sozo-Login' as const

// Developer (Azamov X / professorDeveloper) socials
export const DEV_NAME = 'Azamov X (professorDeveloper)' as const
export const DEV_GITHUB = 'https://github.com/professorDeveloper' as const
export const DEV_WEBSITE = 'https://azamov.me' as const
export const DEV_TELEGRAM = 'https://t.me/saikou' as const
export const DEV_LINKEDIN = 'https://www.linkedin.com/in/azamov-kh-3b8686338/' as const
export const DEV_TWITTER = 'https://www.x.com/azmv21' as const
export const DEV_LEETCODE = 'https://leetcode.com/u/azamovme/' as const

// Obtainium (Android auto-update helper)
export const OBTAINIUM_GITHUB = 'https://github.com/ImranR98/Obtainium' as const
export const OBTAINIUM_ADD = `https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/${SOZO_GITHUB}` as const

// Release sources. Each platform is checked against the developer's personal
// repository first, then falls back to the Sozo-app organization's copy of
// the same repository if the primary source is unavailable or has no
// releases yet. This mirrors how the org (github.com/Sozo-app) forks the
// developer's (github.com/professorDeveloper) personal repositories.
export const SOZO_SOURCES: RepoSource[] = [
  { owner: 'professorDeveloper', repo: 'sozo', label: 'professorDeveloper/sozo' },
  { owner: 'Sozo-app', repo: 'sozo', label: 'Sozo-app/sozo (organization)' },
]

export const SOZO_TV_SOURCES: RepoSource[] = [
  { owner: 'professorDeveloper', repo: 'sozo-tv', label: 'professorDeveloper/sozo-tv' },
  { owner: 'Sozo-app', repo: 'sozo-tv', label: 'Sozo-app/sozo-tv (organization)' },
]

export const SOZO_DESKTOP_SOURCES: RepoSource[] = [
  { owner: 'professorDeveloper', repo: 'Sozo-Desktop', label: 'professorDeveloper/Sozo-Desktop' },
  { owner: 'Sozo-app', repo: 'Sozo-Desktop', label: 'Sozo-app/Sozo-Desktop (organization)' },
]

export const SOZO_LEGACY_SOURCES: RepoSource[] = [
  { owner: 'professorDeveloper', repo: 'Sozo-App', label: 'professorDeveloper/Sozo-App' },
  { owner: 'Sozo-app', repo: 'Sozo-old', label: 'Sozo-app/Sozo-old (organization)' },
]

export interface PlatformApp {
  /** Route segment, e.g. "apk" -> /apk */
  slug: string
  name: string
  platform: string
  description: string
  repoUrl: string
  sources: RepoSource[]
  tags: string[]
}

export const PLATFORMS: PlatformApp[] = [
  {
    slug: 'apk',
    name: 'Sozo',
    platform: 'Android',
    description:
      'The main Sozo app for Android phones and tablets — fast browsing, clean visuals, smooth playback, and offline downloads.',
    repoUrl: SOZO_GITHUB,
    sources: SOZO_SOURCES,
    tags: ['streaming', 'anime', 'movie', 'flutter'],
  },
  {
    slug: 'tv',
    name: 'Sozo TV',
    platform: 'Android TV',
    description:
      'Sozo built for Android TV, Google TV, and TV boxes, with HLS/m3u8 playback and a remote-friendly UI.',
    repoUrl: SOZO_TV_REPO,
    sources: SOZO_TV_SOURCES,
    tags: ['android-tv', 'hls', 'iptv', 'kotlin'],
  },
  {
    slug: 'desktop',
    name: 'Sozo Desktop',
    platform: 'Windows / macOS / Linux',
    description: 'A desktop build of Sozo for watching on a bigger screen.',
    repoUrl: SOZO_DESKTOP_REPO,
    sources: SOZO_DESKTOP_SOURCES,
    tags: ['desktop', 'flutter'],
  },
  {
    slug: 'legacy',
    name: 'Sozo (Legacy)',
    platform: 'Android · Legacy',
    description:
      'The original Kotlin-based Sozo — an Android AniList & MAL tracking client, from before the Flutter rewrite. Kept here for anyone who still needs it.',
    repoUrl: SOZO_LEGACY_REPO,
    sources: SOZO_LEGACY_SOURCES,
    tags: ['anilist', 'mal', 'kotlin'],
  },
]

export interface ContributorRepo {
  label: string
  owner: string
  repo: string
  url: string
  description: string
}

export const CONTRIBUTOR_REPOS: ContributorRepo[] = [
  {
    label: 'Sozo',
    owner: 'professorDeveloper',
    repo: 'sozo',
    url: SOZO_GITHUB,
    description: 'The main Sozo Android/Flutter streaming app.',
  },
  {
    label: 'Sozo TV',
    owner: 'professorDeveloper',
    repo: 'sozo-tv',
    url: SOZO_TV_REPO,
    description: 'Sozo built for Android TV, Google TV, and TV boxes.',
  },
  {
    label: 'Sozo Desktop',
    owner: 'professorDeveloper',
    repo: 'Sozo-Desktop',
    url: SOZO_DESKTOP_REPO,
    description: 'A desktop build of Sozo.',
  },
  {
    label: 'Sozo (Legacy)',
    owner: 'professorDeveloper',
    repo: 'Sozo-App',
    url: SOZO_LEGACY_REPO,
    description: 'The original Kotlin-based Sozo AniList & MAL client.',
  },
  {
    label: 'This website',
    owner: 'MarshMeadow',
    repo: 'sozo-app-updater',
    url: WEBSITE_REPO,
    description: 'The source code for this website.',
  },
]

export interface RelatedApp {
  name: string
  description: string
  url: string
  tags: string[]
}

export const RELATED_APPS: RelatedApp[] = [
  {
    name: 'SoMusic',
    description: 'A companion music app from the Sozo team.',
    url: SOMUSIC_REPO,
    tags: ['music', 'flutter'],
  },
  {
    name: 'Sozo Login',
    description: 'The account manager used to sign in to Sozo apps.',
    url: SOZO_LOGIN_REPO,
    tags: ['accounts', 'kotlin'],
  },
]
