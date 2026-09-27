import { NavLink } from 'react-router-dom'
import { Download, Map, Scale, Users } from 'lucide-react'
import Seo from '../components/Seo'

const GROUPS = [
  {
    title: 'Get the app',
    icon: Download,
    links: [
      { to: '/', label: 'Home — latest release & install guide' },
      { to: '/downloads', label: 'Downloads — every platform' },
      { to: '/apk', label: 'Sozo for Android' },
      { to: '/tv', label: 'Sozo TV — Android TV / Google TV' },
      { to: '/desktop', label: 'Sozo Desktop — Windows / macOS / Linux' },
      { to: '/legacy', label: 'Sozo (Legacy) — original Kotlin client' },
      { to: '/explorer', label: 'GitHub Explorer — browse every repository' },
      { to: '/obtainium', label: 'Obtainium guide — automatic updates' },
    ],
  },
  {
    title: 'Community',
    icon: Users,
    links: [
      { to: '/community', label: 'Community links — Telegram, GitHub & dev socials' },
      { to: '/contributors', label: 'Contributors & maintainer' },
    ],
  },
  {
    title: 'This site',
    icon: Map,
    links: [
      { to: '/sitemap', label: 'Sitemap — every page' },
      { to: '/settings', label: 'Settings — theme & animations' },
    ],
  },
  {
    title: 'Legal',
    icon: Scale,
    links: [
      { to: '/privacy', label: 'Privacy policy' },
      { to: '/terms', label: 'Terms of use' },
      { to: '/dmca', label: 'DMCA notice & takedown policy' },
    ],
  },
]

export default function Sitemap() {
  return (
    <div className="container">
      <Seo
        title="Sitemap - Sozo Updater"
        description="A complete list of pages on the Sozo Updater website."
      />
      <article className="page-article">
        <h1>
          <Map size={28} className="page-icon" aria-hidden="true" />
          Sitemap
        </h1>
        <p>Every page on this site, grouped by what you are looking for.</p>

        {GROUPS.map((group) => (
          <section key={group.title} aria-labelledby={`sitemap-${group.title}`}>
            <h2 id={`sitemap-${group.title}`}>
              <group.icon size={20} aria-hidden="true" /> {group.title}
            </h2>
            <ul className="sitemap-list">
              {group.links.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p>
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
