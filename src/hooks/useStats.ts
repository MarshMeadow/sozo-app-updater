import { useEffect, useState } from 'react'
import { fetchRepoInfo, parseGitHubRepo } from '../api/github'
import type { RepoInfo } from '../api/github'

export function useRepoMeta(urls: string[]): Record<string, RepoInfo> {
  const [meta, setMeta] = useState<Record<string, RepoInfo>>({})
  const key = urls.join('|')

  useEffect(() => {
    let active = true
    const load = async () => {
      const next: Record<string, RepoInfo> = {}
      await Promise.all(
        key.split('|').map(async (url) => {
          const parsed = parseGitHubRepo(url)
          if (!parsed) return
          const info = await fetchRepoInfo(parsed.owner, parsed.repo)
          if (info) next[url] = info
        }),
      )
      if (active) setMeta(next)
    }
    load()
    return () => {
      active = false
    }
  }, [key])

  return meta
}
