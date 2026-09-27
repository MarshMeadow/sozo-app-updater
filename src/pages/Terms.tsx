import { NavLink } from 'react-router-dom'
import Seo from '../components/Seo'
import { WEBSITE_REPO } from '../constants/links'

export default function Terms() {
  return (
    <div className="container">
      <Seo
        title="Terms of Use - Sozo Updater"
        description="Terms of use for the Sozo Updater community website."
      />
      <article className="page-article">
        <h1>Terms of Use</h1>
        <p>
          By using this website, you agree to the following terms. If you do not agree, please do not use
          the site.
        </p>

        <section aria-labelledby="terms-independent-title">
          <h2 id="terms-independent-title">Independent community project</h2>
          <p>
            This website is an independent community project. It is not affiliated with, endorsed by,
            sponsored by, or officially connected to Sozo, its developers, maintainers, contributors, or
            related projects.
          </p>
        </section>

        <section aria-labelledby="terms-what-title">
          <h2 id="terms-what-title">What this site does</h2>
          <p>
            This site provides information and links to a publicly available software release. It does not
            host, upload, modify, repackage, or distribute any streaming content or other copyrighted media.
          </p>
        </section>

        <section aria-labelledby="terms-external-title">
          <h2 id="terms-external-title">External links and downloads</h2>
          <p>
            The site links to external resources, including GitHub and Telegram. We are not responsible
            for the content, availability, or security of those external sites or the software they
            distribute. You use any linked software or service at your own risk.
          </p>
        </section>

        <section aria-labelledby="terms-warranty-title">
          <h2 id="terms-warranty-title">No warranty</h2>
          <p>
            The site is provided “as is” without any warranty of any kind. We do not guarantee that the
            information is accurate, complete, or up to date. We are not liable for any loss, damage, or
            issues that may arise from using the site or any linked software.
          </p>
        </section>

        <section aria-labelledby="terms-acceptable-title">
          <h2 id="terms-acceptable-title">Acceptable use</h2>
          <p>
            You agree not to use this website for any unlawful purpose, to attempt to disrupt its
            operation, or to scrape, automate, or abuse the services it connects to.
          </p>
        </section>

        <section aria-labelledby="terms-changes-title">
          <h2 id="terms-changes-title">Changes to these terms</h2>
          <p>
            These terms may be updated at any time. The latest version will always be available on this
            page.
          </p>
        </section>

        <section aria-labelledby="terms-contact-title">
          <h2 id="terms-contact-title">Contact</h2>
          <p>
            For terms-related questions, please open an issue on the website repository:{' '}
            <a href={WEBSITE_REPO} target="_blank" rel="noopener noreferrer">
              {WEBSITE_REPO}
            </a>
          </p>
        </section>

        <p>
          <NavLink to="/privacy">Privacy Policy</NavLink> •{' '}
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
