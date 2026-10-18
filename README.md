# RageTV 🎮⚡

> **Pick a game. Watch live esports.**  
> Ultra-fast, privacy-first, open-source live esports aggregator powered exclusively by official embedded players.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Legal Compliance](https://img.shields.io/badge/Embeds-100%25%20Official-success)](#-legal-compliance--disclaimer)

---

## 📖 About RageTV / Hakkında

**EN:**  
**RageTV** is an open-source, non-commercial esports discovery and live match viewing hub. Finding an ongoing tournament match across different platforms, languages, and channels is often fragmented and cluttered with intrusive ads, paywalls, and heavy interfaces. RageTV solves this with a singular, distraction-free vision: **select your game and start watching the official live broadcast in one click.** If no live match is currently running, it seamlessly falls back to the latest tournament match VOD/poster, ensuring your screen is never empty.

**TR:**  
**RageTV**, açık kaynaklı ve ticari olmayan bir espor canlı yayın ve turnuva keşif platformudur. Farklı platformlara, dillere ve kanallara dağılmış espor turnuvalarını takip etmek çoğu zaman karmaşık ve dikkat dağıtıcıdır. RageTV bu problemi tek bir felsefeyle çözer: **Sol menüden oyununu seç ve resmi canlı yayını tek tıkla izlemeye başla.** Canlı yayın yoksa dahi ekran asla boş kalmaz; o oyunun son resmi turnuva VOD/posteri hazır bekler ve tıklandığında oynatılır.

---

## ⚡ Core Principles / Temel İlkeler

1. **100% Official & Legal Embeds (Telif Riski Sıfır):**  
   RageTV does **not** host, record, transcode, scrape, or restream any video. All media playback is driven strictly through the official, unmodified embedded players of the original platforms (Twitch, YouTube). Channel branding, chat policies, and copyright remain entirely with their respective owners.
2. **Zero-Cost & Free-Tier Native:**  
   Engineered to run seamlessly without costly servers or paid third-party enterprise subscriptions. Powered by lightweight serverless functions (Hono BFF) and edge caching (`stale-while-revalidate`).
3. **No Scraping Policy:**  
   Strictly zero scraping of unofficial endpoints or third-party web pages (no HLTV or unofficial web parsers). Every feed is mapped via legitimate developer APIs and curated official registries.
4. **Privacy-First & No Accounts:**  
   No logins, no tracking cookies, and no database bloat. User preferences (active game, theme, locale) persist strictly in local browser storage (`localStorage`).
5. **Honest Data:**  
   Every indicator shows verified upstream data with timestamp (`fetchedAt`). Missing or unverified data is displayed as `N/A`, never fabricated or silently zeroed out.
6. **Cross-Device & 10-Foot UI (TV Ready):**  
   Engineered for seamless navigation across **Mobile**, **Tablet**, **Laptop**, **Desktop**, and **Television (Smart TV / Large Screens)** with accessibility-first keyboard & focus management.

---

## 🎯 Supported Games (v1)

| Game | Curated Channels & Tournaments | Primary Embed Platform | Fallback Mode |
|---|---|---|---|
| **CS2** (Counter-Strike 2) | ESL, BLAST, PGL | Twitch / YouTube | Recent Match VOD / Poster |
| **Valorant** | VCT, Champions Tour | Twitch / YouTube | Recent Tournament VOD |
| **PUBG** | PUBG Esports, Regional Qualifiers | YouTube / Twitch | Match Highlights VOD |
| **League of Legends** | Riot Games, LEC, LCK, LCS | Twitch / YouTube | VOD & Match Replays |
| **Dota 2** | PGL, ESL Dota 2, TI | Twitch / YouTube | Recent Match Replay |

---

## 🖥️ UX/UI Design & Responsive Breakpoints

RageTV features a sleek, dark-mode gaming aesthetic inspired by modern esports dashboards (custom token system in `src/styles/tokens.css`):

* **Mobile (`< 640px`):** Single-column layout, horizontal scrolling game selector bar, native touch-optimized player.
* **Tablet (`640px - 1023px`):** Flexible stage layout with quick metadata drawer.
* **Laptop & Desktop (`≥ 1024px`):** Ergonomic collapsible sidebar, 16:9 cinematic `PlayerStage`, live match indicators, stream info panel, and quick platform switcher.
* **Television (`tv: ≥ 1920px` & 10-foot UI):** High-contrast focus outlines, scaled typography, and D-pad/remote-control friendly keyboard navigation.

---

## 🏗️ Architecture & Tech Stack

```
ragetv/
├── shared/         # Universal types, Zod schemas, game/channel registries & URL validators
├── server/         # Lightweight BFF (Hono on Vercel Functions), provider adapters & caching
├── src/            # Vite React SPA (features: games, player, live, preferences)
├── public/         # Static assets, self-hosted WOFF2 fonts, favicon
└── docs/           # Provider specifications (docs/providers.md) & Architecture Decision Records (ADRs)
```

- **Frontend:** React, Vite, TypeScript (Strict), Tailwind CSS, Lucide Icons, TanStack Query.
- **Backend / BFF:** Hono (Vercel Serverless / Edge compatible).
- **Internationalization (i18n):** EN, TR, DE (lazy-loaded locale files with `Intl.*` formatting).
- **Quality & Testing:** Vitest, Testing Library, MSW (Mock Service Worker), vitest-axe (a11y).

---

## ⚖️ Legal Compliance & Disclaimer

**EN:**  
RageTV is an independent, non-commercial esports discovery site. It does not host, record, or rebroadcast any video. Live streams and videos are shown through the official embedded players of their original platforms (such as Twitch and YouTube) and remain the property of their respective owners. All trademarks, logos, and game titles belong to their respective owners; RageTV is not affiliated with, endorsed by, or sponsored by them.  
*Content owners can request immediate channel/stream exclusion via GitHub Issues.*

**TR:**  
RageTV, bağımsız ve ticari olmayan bir espor keşif sitesidir. Hiçbir video içeriğini barındırmaz, kaydetmez veya yeniden yayınlamaz. Canlı yayınlar ve videolar, özgün platformların (Twitch, YouTube vb.) resmi gömülü oynatıcıları aracılığıyla gösterilir ve ilgili sahiplerine aittir. Tüm ticari markalar, logolar ve oyun adları sahiplerine aittir; RageTV bunlarla bağlantılı değildir, onlar tarafından onaylanmamış veya desteklenmemiştir.  
*İçerik sahipleri kanal veya yayın kaldırma taleplerini GitHub Issues üzerinden iletebilir.*

---

## 🚀 Getting Started

### Prerequisites
- Node.js LTS (v20+)
- PNPM (v9+)

### Installation
```bash
# Clone repository
git clone https://github.com/sercanvr/ragetv.git
cd ragetv

# Install dependencies (once packages are scaffolded)
pnpm install

# Start local development server
pnpm dev
```

---

## 🤝 Contributing

Contributions, feature suggestions, and verified tournament channel additions are warmly welcomed! Please read our guidelines and ensure local tests pass before opening a Pull Request.

---

## 📄 License

This project is open-source and distributed under the [MIT License](LICENSE).