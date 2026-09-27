import { NavLink } from 'react-router-dom'
import Seo from '../components/Seo'
import { WEBSITE_REPO } from '../constants/links'

export default function Privacy() {
  return (
    <div className="container">
      <Seo
        title="Privacy Policy - Sozo Updater"
        description="Privacy policy for the Sozo Updater community website."
      />
      <article className="page-article">
        <h1>Privacy Policy</h1>
        <p>
          Your privacy is important. This page explains what information this website uses and stores.
        </p>

        <section aria-labelledby="privacy-what-title">
          <h2 id="privacy-what-title">What we do not collect</h2>
          <p>
            This website does not use cookies, analytics, advertising, or any tracking scripts. We do not
            collect personal information such as your name, email address, IP address, or device details.
          </p>
        </section>

        <section aria-labelledby="privacy-local-title">
          <h2 id="privacy-local-title">Local storage</h2>
          <p>The site uses your browser’s local storage to remember a few simple settings:</p>
          <ol>
            <li>Your light/dark theme preference.</li>
            <li>Whether animations are enabled.</li>
          </ol>
          <p>This data stays on your device. It is never sent to us or any third party.</p>
        </section>

        <section aria-labelledby="privacy-external-title">
          <h2 id="privacy-external-title">External services</h2>
          <p>
            The website loads the latest release data directly from the GitHub public API. Your browser
            makes that request — no server owned by us is involved. We also link to third-party sites and
            services such as GitHub and Telegram. Those services have their own privacy policies, and we
            are not responsible for their practices.
          </p>
        </section>

        <section aria-labelledby="privacy-downloads-title">
          <h2 id="privacy-downloads-title">Downloads and software</h2>
          <p>
            All downloads linked from this site are hosted on GitHub. We do not host, modify, or repackage
            any files. Please review the source repository before installing anything.
          </p>
        </section>

        <section aria-labelledby="privacy-children-title">
          <h2 id="privacy-children-title">Children’s privacy</h2>
          <p>
            This website does not knowingly collect information from children under 13. If you believe a
            child has provided personal information through one of the linked third-party services, contact
            that service directly.
          </p>
        </section>

        <section aria-labelledby="privacy-changes-title">
          <h2 id="privacy-changes-title">Changes to this policy</h2>
          <p>
            This privacy policy may be updated from time to time. The latest version will always be
            available on this page.
          </p>
        </section>

        <section aria-labelledby="privacy-contact-title">
          <h2 id="privacy-contact-title">Contact</h2>
          <p>
            For privacy-related questions, please open an issue on the website repository:{' '}
            <a href={WEBSITE_REPO} target="_blank" rel="noopener noreferrer">
              {WEBSITE_REPO}
            </a>
          </p>
        </section>

        <p>
          <NavLink to="/terms">Terms of Use</NavLink> •{' '}
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
