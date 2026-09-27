# Sozo App Updater Website

<p align="center">
  <img src="public/icon-192.svg" alt="Sozo Updater logo" width="96">
</p>

<p align="center">
  <strong>A modern, responsive website for downloading the latest Sozo release.</strong>
</p>

---

## ✨ Features

- ⚡ **React 18 + Vite + TypeScript** — fast, modern, type-safe.
- � **Salmon-red theme** — light & dark, automatic system detection plus a manual toggle.
- 📱 **Fully responsive** — looks great on desktop, tablet, and mobile.
- 📥 **Dedicated download pages per platform** — `/apk` (Android), `/tv` (Android TV), `/desktop`, and `/legacy` (the original Kotlin client), plus a `/downloads` hub that links to all of them.
- 🔁 **Multi-source update checks** — every platform checks the developer's personal repository (`professorDeveloper`) first, then automatically falls back to the `Sozo-app` organization's mirror if the primary source has no release.
- ⭐ **Live repo stats** — GitHub star counts and "last updated" times for each platform and companion app.
- 🤝 **Contributors page** — live contributor list for Sozo (and its platform variants) and this website, plus a maintainer highlight.
- 🔄 **Obtainium guide** — a dedicated step-by-step page for auto-updating Sozo straight from GitHub releases, with a one-tap add link, covering every platform.
- 🚀 **SEO + Open Graph + PWA manifest** — ready to share anywhere.
- 🛡️ **Security headers & safe links** — CSP, `noopener noreferrer`, and URL allow-lists.

---

## ❓ What is Sozo?

**Sozo** is an open-source streaming app focused on a cinematic experience: fast browsing, clean
visuals, smooth playback, and a layout built for everyday watching — from home discovery to
offline downloads. The main app is built with Flutter and released under the GPL-3.0 license.

The same developer, **Azamov X (professorDeveloper)**, and the **Sozo-app** organization maintain
Sozo across several platforms and companion apps:

| Platform | Page | Repository |
| --- | --- | --- |
| Android | [`/apk`](#) | `professorDeveloper/sozo` |
| Android TV / Google TV | [`/tv`](#) | `professorDeveloper/sozo-tv` |
| Windows / macOS / Linux | [`/desktop`](#) | `professorDeveloper/Sozo-Desktop` |
| Android (legacy, Kotlin) | [`/legacy`](#) | `professorDeveloper/Sozo-App` |
| Companion — music | — | `Sozo-app/SoMusic` |
| Companion — accounts | — | `Sozo-app/Sozo-Login` |

> **Important:** This website is an independent community project. It does not host, stream, or
> distribute any copyrighted media — it only links to publicly published Sozo releases on GitHub.

---

## ⚙️ How It Works

1. **Fetches the latest release for the requested platform.** Each download page calls the GitHub API for its repository — starting with the developer's personal copy (`professorDeveloper/...`), then falling back to the `Sozo-app` organization's mirror if the first source has no release.
2. **Validates everything.** The site checks that release and download URLs come from trusted GitHub domains. It strips control characters and ignores any malformed data.
3. **Shows safe download links.** Files are not hosted or modified here. The download buttons link directly to GitHub's file servers.
4. **Live app info.** Platform and companion-app cards ask GitHub for each repository's latest push date and star count.
5. **Built for privacy.** No tracking, analytics, ads, or API keys. Your theme choice is saved locally.

---

## 🔗 Social Links

### Sozo
- 🌐 **Official Website:** [sozo.framer.website](https://sozo.framer.website/)
- ✈️ **Official Telegram:** [t.me/sozoapp](https://t.me/sozoapp)
- 🐙 **Official GitHub:** [github.com/professorDeveloper/sozo](https://github.com/professorDeveloper/sozo)
- 🏢 **Organization:** [github.com/Sozo-app](https://github.com/Sozo-app)

### Developer — Azamov X (professorDeveloper)
- 🌐 **Website:** [azamov.me](https://azamov.me/)
- ✈️ **Telegram:** [t.me/saikou](https://t.me/saikou)
- 🐙 **GitHub:** [github.com/professorDeveloper](https://github.com/professorDeveloper)
- 💼 **LinkedIn:** [linkedin.com/in/azamov-kh-3b8686338](https://www.linkedin.com/in/azamov-kh-3b8686338/)
- 🐦 **X / Twitter:** [x.com/azmv21](https://www.x.com/azmv21)
- 💻 **LeetCode:** [leetcode.com/u/azamovme](https://leetcode.com/u/azamovme/)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🛠️ Build

```bash
npm run build
npm run preview
```

The production output is written to the `dist/` directory.

---

## 🌐 Deployment

The project uses **relative asset paths** and a `HashRouter`, so it deploys cleanly to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any static host.

### Before you publish

- Update the domain in `public/robots.txt` and `public/sitemap.xml`.
- Replace `https://sozo-updater.example` with your real URL.
- This site's repository is tracked at [`github.com/MarshMeadow/sozo-app-updater`](https://github.com/MarshMeadow/sozo-app-updater) via `WEBSITE_REPO` in `src/constants/links.ts` — update it if the repo moves.

---

## 📂 Project Structure

```
├── public/              # Static assets (favicon, manifest, robots, sitemap)
├── src/
│   ├── api/             # GitHub release & contributor fetching, validation
│   ├── components/      # Reusable UI components (Layout, Footer, ThemeToggle, Seo, Loading)
│   ├── constants/       # Links and legal text
│   ├── hooks/           # Shared data hooks (repo meta, theme)
│   ├── pages/           # Home, Downloads, Platform, Community, Contributors, Obtainium, Settings, Sitemap, Privacy, Terms, NotFound
│   ├── App.tsx          # Router and lazy loading
│   └── main.tsx         # Entry point with Helmet & HashRouter
├── index.html           # Root HTML with security headers and noscript fallback
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

---

## ⚖️ Disclaimer

This is an **independent community project** and is not affiliated with, endorsed by, sponsored by, or officially connected to Sozo, its developers, maintainers, contributors, or related projects.

This website does **not** host, upload, modify, repackage, or distribute streaming content or other copyrighted media. It only provides informational links to publicly available software sources. All trademarks and copyrights belong to their respective owners.

Users download and use any linked software **at their own risk**.
