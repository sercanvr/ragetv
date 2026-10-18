# RageTV ⚡🎮

<div align="center">

```
  ____                 _______     __
 |  _ \ __ _  __ _  ___|_   _\ \   / /
 | |_) / _` |/ _` |/ _ \ | |  \ \ / / 
 |  _ < (_| | (_| |  __/ | |   \ V /  
 |_| \_\__,_|\__, |\___| |_|    \_/   
             |___/                     
```

### **Pick a game. Watch live esports. Zero clutter.**

An ultra-fast, privacy-first, non-commercial live esports aggregator built exclusively on official embedded players.

[![License: MIT](https://img.shields.io/badge/License-MIT-FC3564.svg?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![100% Legal Embeds](https://img.shields.io/badge/Embeds-100%25%20Legal-00C853.svg?style=for-the-badge)](#-legal-compliance--copyright-policy)

<br/>

[English](#-about-ragetv) • [Türkçe](#-ragetv-hakkında) • [Deutsch](#-über-ragetv) • [Architecture](#-system-architecture) • [Roadmap](#-roadmap--milestones) • [Contributing](#-contributing)

</div>

---

## 🌟 Executive Overview / Yönetici Özeti

Finding ongoing competitive tournament broadcasts across different platforms, languages, and regional organizers is fragmented, cumbersome, and often degraded by intrusive ads, popups, and bloated portals.

**RageTV** redefines the tournament viewing experience with an uncompromising, minimalist ethos:
* **One Click to Live:** Select your game from the sidebar (or top bar) and immediately stream the official tournament match.
* **No Blank Screens:** If no official live broadcast is currently on air, an interactive VOD/poster of the most recent championship match stands ready to play.
* **100% Legal & Zero Video Hosting:** Powered exclusively by the official, unmodified embedded players of YouTube and Twitch. We do not restream, scrape, transcode, or proxy any video.
* **10-Foot UI (Television Native):** Designed from the ground up for full responsiveness across **Mobile**, **Tablet**, **Laptop**, **Desktop**, and **Television (Smart TV)** with D-pad & keyboard accessibility.

---

## 📖 About RageTV

### 🇬🇧 English
**RageTV** is an independent, open-source esports discovery and live broadcast viewing hub. It aggregates premier tournaments for five tier-1 competitive titles: **Counter-Strike 2 (CS2), Valorant, PUBG, League of Legends, and Dota 2**. By decoupling live esports discovery from clutter, RageTV provides gamers and tournament enthusiasts with a clean, cinematic, and instantaneous theater stage. No sign-ups, no tracking cookies, and no paywalls.

### 🇹🇷 Türkçe
**RageTV**, bağımsız ve açık kaynaklı bir espor keşif ve canlı turnuva izleme platformudur. En popüler 5 rekabetçi espor oyunu olan **Counter-Strike 2 (CS2), Valorant, PUBG, League of Legends ve Dota 2** için resmi turnuva yayınlarını tek bir merkezde toplar. Espor izleme deneyimini karmaşık menülerden, açılır pencerelerden ve gereksiz kalabalıktan arındırarak tek tıkla doğrudan resmi yayına ulaştırır. Canlı yayın olmadığında dahi ekran boş kalmaz; son resmi turnuva VOD/posteri hazır bekler. Üyelik zorunluluğu, izleme çerezleri veya reklam barındırmaz.

### 🇩🇪 Deutsch
**RageTV** ist eine unabhängige, quelloffene Plattform zur Entdeckung und zum Anschauen von Live-Esports-Turnieren. Es bündelt die wichtigsten Turniersendungen für fünf führende Titel: **CS2, Valorant, PUBG, LoL und Dota 2**. RageTV befreit das Streaming-Erlebnis von störender Werbung und unübersichtlichen Portalen: Ein Klick genügt, um das offizielle Match im Vollbild zu starten. Keine Registrierung, keine Tracking-Cookies, rein legale Einbettungen.

---

## ⚡ Core Principles & Architecture Values

| Principle | Technical Implementation | User Benefit |
|---|---|---|
| **Zero Telif / 100% Legal** | Official Twitch & YouTube iframe embeds with runtime `parent` validation | Zero copyright infringement risk; platform partners retain full control & ad credit |
| **Zero Scraping** | No unofficial HTML scraping (no HLTV/Kick scraping); strictly official REST/GraphQL APIs | Maximum stability; immune to site redesigns and anti-bot IP bans |
| **Zero Cost (Free-Tier)** | Hono BFF on Vercel Functions + edge caching (`s-maxage`, `stale-while-revalidate`) | High-concurrency scalability without cloud server bills |
| **Privacy First** | All state (active game, theme, volume preferences) lives in client `localStorage` | Zero database overhead, GDPR-compliant by design, no passwords or emails |
| **Honest Data** | Every viewer metric and status indicator carries an explicit `fetchedAt` timestamp | Unverified or offline metrics show `N/A`, never fake or misleading zeros |
| **Cross-Device & 10-Foot UI** | Mobile-first CSS tokens + dedicated `tv:` (≥1920px) breakpoint with high-visibility focus rings | Flawless experience whether on a subway smartphone or a living room Smart TV |

---

## 🎮 Supported Titles & Verified Channels (v1)

| Title | League & Tournament Coverage | Primary Platform | Fallback Replay |
|:---|:---|:---:|:---|
| **Counter-Strike 2 (CS2)** | ESL Pro League, IEM, BLAST Premier, PGL Major | Twitch / YouTube | Recent Grand Finals VOD |
| **Valorant** | VCT (Champions Tour), Masters, Regional Leagues (EMEA, Americas, Pacific) | Twitch / YouTube | Official VOD & Match Highlights |
| **PUBG: Battlegrounds** | PUBG Global Series (PGS), PUBG Continental Series | YouTube / Twitch | Championship Series Replays |
| **League of Legends** | Riot Games, Worlds, MSI, LEC, LCK, LCS | Twitch / YouTube | Full Match VODs |
| **Dota 2** | The International, PGL Wallachia, ESL One, DreamLeague | Twitch / YouTube | Official Tournament Archives |

---

## 📐 Responsive Breakpoints & 10-Foot UI

RageTV enforces strict mobile-first ergonomics with ergonomic layout adaptations:

```
[ Mobile: < 640px ]  ──>  Top Sticky Game Filter Bar + Bottom Navigation + Native Touch Player
[ Tablet: 640-1023px ] ──>  Two-Column Hybrid Stage with Expandable Match Details Drawer
[ Desktop: ≥ 1024px ] ──>  Collapsible Ergonomic Left Sidebar + 16:9 Cinematic PlayerStage
[ TV: ≥ 1920px ]      ──>  10-Foot UI: High-contrast focus rings (focus-visible), D-pad navigation, enlarged typography
```

* **Brand Accent:** `#FC3564` (Rage Crimson)
* **Theme:** Cinematic Deep Slate / Obsidian Dark Mode (`#0D0F12` background, `#161920` surface panels)
* **Typography:** Self-hosted, low-latency WOFF2 fonts with `font-display: swap`

---

## 🏗️ System Architecture

```
                       ┌────────────────────────────────────────────────────────┐
                       │                   Client Browser                       │
                       │           (Vite + React SPA + TanStack Query)          │
                       └───────────────▲────────────────────────▲───────────────┘
                                       │                        │
                          GET /api/live│                        │ Official Embeds
                         (Edge Cached) │                        │ (Direct stream)
                                       │                        │
                       ┌───────────────▼──────────────┐         │
                       │       Edge CDN Cache         │         │
                       │(s-maxage=30s, swr=60s)       │         │
                       └───────────────▲──────────────┘         │
                                       │ MISS / STALE           │
                       ┌───────────────▼──────────────┐         │
                       │       Lightweight BFF        │         │
                       │       (Hono on Vercel)       │         │
                       └───────────────▲──────────────┘         │
                                       │                        │
                ┌──────────────────────┼──────────────────────┐ │
                │                      │                      │ │
        ┌───────▼────────┐     ┌───────▼────────┐     ┌───────▼─┴────────┐
        │  Twitch Helix  │     │ YouTube v3 API │     │ PandaScore API   │
        │  (OAuth App)   │     │  (Playlists)   │     │ (Tournament M4)  │
        └────────────────┘     └────────────────┘     └──────────────────┘
```

### Layer Constraints & Boundaries
1. `shared/`: Universal contracts, Zod schemas, game/channel registries, and embed URL generators. Has zero dependencies on server or client.
2. `server/`: BFF layer (Hono). Encapsulates API keys and provider rate-limiting. Client components cannot import from `server/`.
3. `src/`: Client-side React SPA. Features modularity (`games/`, `player/`, `live/`, `preferences/`).

---

## 🛡️ Legal Compliance & Copyright Policy

> **Disclaimer:** RageTV is an independent, non-commercial esports discovery platform. It does not host, store, copy, transcode, or rebroadcast any video or audio content. All streams and videos are delivered strictly through the official embedded players of their respective platforms (Twitch, YouTube) and remain the exclusive property of their respective broadcasters and publishers.

* **Trademarks:** Game titles, logos, and esports brand names belong exclusively to their respective owners (Valve, Riot Games, KRAFTON, etc.). RageTV is not affiliated with, endorsed by, or sponsored by these entities.
* **Kill Switch & Removal Requests:** Content creators and tournament organizers can request immediate exclusion of their channels at any time. Simply open an issue via our [GitHub Issues](https://github.com/sercanvr/ragetv/issues) tracker, and the channel will be disabled via `shared/registry/killswitch.ts` within 24 hours.

---

## 🗺️ Roadmap & Milestones

- [x] **M0: Discovery & Legal Verification** — Terms review, embed guidelines, channel registry verification, ADR-001/002/003.
- [x] **M1: Core Skeleton & 10-Foot UI** — Vite + React, Tailwind theme (`#FC3564`), AppShell, Sidebar, i18n scaffolding, `/api/health`.
- [x] **M2: Live Integration** — Twitch Helix adapter, `/api/live` endpoint, `EmbedPlayer` component, dynamic LIVE badges.
- [x] **M3: Fallback & VOD Facade** — YouTube tournament VOD fallback, poster facade, blocked/empty state handlers.
- [x] **M4: Tournament Fixtures** — Upcoming schedule, match countdowns, and verified scores.
- [x] **M5: Standings Decision** — Deferred to Phase 2 via ADR-004 to uphold zero-scraping and data-honesty principles.
- [x] **M6: Hardening & Launch Readiness** — Vitest unit & smoke suites (11 tests passing), WCAG AA & 10-foot UI verified, CONTRIBUTING.md.

---

## 💻 Local Development

### Prerequisites
- Node.js LTS (v20 or higher)
- PNPM (v9 or higher)

### Setup
```bash
# Clone the repository
git clone https://github.com/sercanvr/ragetv.git
cd ragetv

# Install dependencies
pnpm install

# Setup local environment variables
cp .env.example .env

# Run local development server
pnpm dev
```

---

## 🤝 Contributing

We welcome community contributions, localization improvements, and verified tournament channel additions.
Please ensure all code complies with our [Clean Code & Conventional Commits standards](agent-rules.md).

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).