import { NavLink } from 'react-router-dom'
import { ExternalLink, Globe, Briefcase, MessageCircle, Star, AtSign, Code } from 'lucide-react'
import Seo from '../components/Seo'
import { formatCount } from '../api/github'
import { useRepoMeta } from '../hooks/useStats'
import {
  SOZO_TELEGRAM,
  SOZO_WEBSITE,
  SOZO_GITHUB,
  WEBSITE_REPO,
  DEV_NAME,
  DEV_GITHUB,
  DEV_WEBSITE,
  DEV_TELEGRAM,
  DEV_LINKEDIN,
  DEV_TWITTER,
  DEV_LEETCODE,
} from '../constants/links'

const GITHUB_URLS = [SOZO_GITHUB, WEBSITE_REPO]

const TELEGRAMS = [
  {
    name: 'Official Sozo Telegram',
    url: SOZO_TELEGRAM,
    description: 'Official Telegram channel for Sozo updates, releases, and discussion.',
  },
  {
    name: `${DEV_NAME} — personal Telegram`,
    url: DEV_TELEGRAM,
    description: 'The developer\u2019s personal Telegram (Saikou).',
  },
]

const GITHUB = [
  {
    name: 'Sozo Repository',
    url: SOZO_GITHUB,
    description: 'The main Sozo app repository — source code and releases.',
  },
  {
    name: 'Website Repository',
    url: WEBSITE_REPO,
    description: 'The source code for this website. Report issues, suggest features, or contribute.',
  },
]

const DEV_SOCIALS = [
  { name: 'GitHub', url: DEV_GITHUB, icon: Code },
  { name: 'Website (azamov.me)', url: DEV_WEBSITE, icon: Globe },
  { name: 'LinkedIn', url: DEV_LINKEDIN, icon: Briefcase },
  { name: 'X / Twitter', url: DEV_TWITTER, icon: AtSign },
  { name: 'LeetCode', url: DEV_LEETCODE, icon: ExternalLink },
]

export default function Community() {
  const repoMeta = useRepoMeta(GITHUB_URLS)

  return (
    <div className="container">
      <Seo
        title="Community - Sozo Updater"
        description="Official and community links for Sozo, including Telegram, GitHub, and the developer's socials."
      />
      <article className="page-article">
        <h1>Community & Resources</h1>
        <p>
          Find official Sozo communities and places to ask questions, get updates, and chat with
          other users, plus links to the developer behind the project.
        </p>

        <section aria-labelledby="community-telegram-title">
          <h2 id="community-telegram-title">Telegram</h2>
          <div className="resource-list">
            {TELEGRAMS.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                <div className="resource-main">
                  <MessageCircle size={20} className="resource-icon" aria-hidden="true" />
                  <div>
                    <h3 className="resource-name">{item.name}</h3>
                    <p className="resource-desc">{item.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="community-github-title">
          <h2 id="community-github-title">GitHub & Source</h2>
          <div className="resource-list">
            {GITHUB.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                <div className="resource-main">
                  <ExternalLink size={20} className="resource-icon" aria-hidden="true" />
                  <div>
                    <h3 className="resource-name">{item.name}</h3>
                    <p className="resource-desc">{item.description}</p>
                    {repoMeta[item.url]?.stars != null && (
                      <span className="repo-stars">
                        <Star size={12} aria-hidden="true" />
                        {formatCount(repoMeta[item.url]!.stars!)} stars
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="community-website-title">
          <h2 id="community-website-title">Official website</h2>
          <div className="resource-list">
            <a href={SOZO_WEBSITE} target="_blank" rel="noopener noreferrer" className="resource-card">
              <div className="resource-main">
                <Globe size={20} className="resource-icon" aria-hidden="true" />
                <div>
                  <h3 className="resource-name">sozo.framer.website</h3>
                  <p className="resource-desc">The official Sozo landing page.</p>
                </div>
              </div>
            </a>
          </div>
        </section>

        <section aria-labelledby="community-dev-title">
          <h2 id="community-dev-title">The developer — {DEV_NAME}</h2>
          <p>
            Sozo is built and maintained by <strong>{DEV_NAME}</strong>, an Android / software
            engineer based in Tashkent, Uzbekistan, and part of the TON community.
          </p>
          <div className="resource-list">
            {DEV_SOCIALS.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                <div className="resource-main">
                  <item.icon size={20} className="resource-icon" aria-hidden="true" />
                  <div>
                    <h3 className="resource-name">{item.name}</h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <p>
          <NavLink to="/contributors">Contributors →</NavLink> •{' '}
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
