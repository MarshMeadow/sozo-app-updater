import { NavLink } from 'react-router-dom'
import Seo from '../components/Seo'
import { WEBSITE_REPO, SOZO_GITHUB } from '../constants/links'

export default function Dmca() {
  return (
    <div className="container">
      <Seo
        title="DMCA Notice & Takedown Policy - Sozo Updater"
        description="DMCA notice and takedown policy for the Sozo Updater community website."
      />
      <article className="page-article">
        <h1>DMCA Notice &amp; Takedown Policy</h1>
        <p>
          This page explains how copyright concerns are handled for this website and for the
          third-party projects it links to.
        </p>

        <section aria-labelledby="dmca-hosting-title">
          <h2 id="dmca-hosting-title">We do not host copyrighted media</h2>
          <p>
            This website is a set of static pages that link to publicly available GitHub
            repositories and releases. It does not host, upload, cache, stream, or distribute any
            video, audio, images, or other copyrighted media.
          </p>
          <p>
            Sozo itself is a client application, similar in concept to a web browser: it does not
            ship with or bundle any copyrighted media. Any third-party sources it can reach are
            extensions that a user chooses to add themselves. We do not control, operate, or host
            those third-party sources, and neither does the Sozo project.
          </p>
        </section>

        <section aria-labelledby="dmca-where-title">
          <h2 id="dmca-where-title">Where to send a takedown notice</h2>
          <p>The right place to send a notice depends on what you believe infringes your rights:</p>
          <ul>
            <li>
              <strong>Source code, images, or text in a GitHub repository</strong> (for example{' '}
              <a href={SOZO_GITHUB} target="_blank" rel="noopener noreferrer">
                {SOZO_GITHUB}
              </a>
              ) — that content is hosted by GitHub, Inc. File a notice directly with GitHub’s DMCA
              process. We do not control what GitHub hosts and cannot remove it on GitHub’s behalf.
            </li>
            <li>
              <strong>A third-party streaming/extension source</strong> that a user has added to
              Sozo — that content is hosted by whoever operates that source. Neither this website
              nor the Sozo project controls, hosts, or has the ability to remove that content.
            </li>
            <li>
              <strong>A link, description, or image on this website itself</strong> — see the
              section below.
            </li>
          </ul>
        </section>

        <section aria-labelledby="dmca-thiswebsite-title">
          <h2 id="dmca-thiswebsite-title">Removing a link from this website</h2>
          <p>
            Even though this website does not host any copyrighted media, we will promptly review
            and, where appropriate, remove any link on this website in response to a valid notice.
            To file one, please include:
          </p>
          <ol>
            <li>A physical or electronic signature of the copyright owner or their authorized agent.</li>
            <li>Identification of the copyrighted work you claim has been infringed.</li>
            <li>The specific URL, on this website, of the material you want removed.</li>
            <li>Your contact information — name, address, telephone number, and email address.</li>
            <li>
              A statement that you have a good-faith belief that the disputed use is not authorized
              by the copyright owner, its agent, or the law.
            </li>
            <li>
              A statement, made under penalty of perjury, that the above information is accurate and
              that you are the copyright owner or authorized to act on their behalf.
            </li>
          </ol>
          <p>
            Send notices by opening an issue on the website’s repository:{' '}
            <a href={WEBSITE_REPO} target="_blank" rel="noopener noreferrer">
              {WEBSITE_REPO}
            </a>
            . If your notice contains sensitive personal information you would prefer not to post
            publicly, say so in the issue and we will follow up for a private channel.
          </p>
        </section>

        <section aria-labelledby="dmca-counter-title">
          <h2 id="dmca-counter-title">Counter-notification</h2>
          <p>
            If a link you believe was wrongly removed belonged to you, or you have the right to
            post it, you may submit a counter-notification through the same repository issue
            process, including a statement under penalty of perjury that you have a good-faith
            belief the material was removed as a result of mistake or misidentification.
          </p>
        </section>

        <section aria-labelledby="dmca-repeat-title">
          <h2 id="dmca-repeat-title">Repeat infringers</h2>
          <p>
            We reserve the right to remove links to any repository or source that is the subject of
            repeated, valid infringement notices, at our discretion.
          </p>
        </section>

        <p>
          <NavLink to="/terms">Terms of Use</NavLink> • <NavLink to="/privacy">Privacy Policy</NavLink> •{' '}
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
