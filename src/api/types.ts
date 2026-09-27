export interface Asset {
  name: string
  size: number
  content_type: string
  browser_download_url: string
}

export interface Release {
  tag_name: string
  name: string
  published_at: string
  html_url: string
  body: string | null
  assets: Asset[]
}

export interface Contributor {
  login: string
  avatar: string
  url: string
  contributions: number
}

export interface RepoSource {
  /** GitHub owner/organization, e.g. "professorDeveloper" or "Sozo-app" */
  owner: string
  repo: string
  /** Human-readable label shown when this source served the data */
  label: string
}

export interface RepoSummary {
  owner: string
  name: string
  fullName: string
  description: string | null
  htmlUrl: string
  stars: number
  forks: number
  openIssues: number
  language: string | null
  license: string | null
  topics: string[]
  updatedAt: string | null
  pushedAt: string | null
  defaultBranch: string
  archived: boolean
  fork: boolean
}
