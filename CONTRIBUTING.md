# Contributing to RageTV 🎮⚡

Thank you for your interest in contributing to **RageTV**! As an open-source, non-commercial esports discovery platform, we welcome community feedback, bug reports, and code contributions.

---

## 📜 Code of Conduct & Core Values

1. **100% Legal & Official Embeds Only:** We never host, transcode, scrape, or restream video content. All players must remain official Twitch and YouTube embedded players.
2. **Zero Scraping:** No unofficial endpoints, web parsers, or bot scraping.
3. **Privacy First:** No login systems, tracking cookies, or database bloat.
4. **Honest Data:** Never hardcode mock data in production pathways. Missing data is `N/A`.

---

## 🛠️ Development Workflow

### Prerequisites
- Node.js LTS (v20+)
- PNPM (v9+)

### Local Setup
```bash
# Clone the repository
git clone https://github.com/sercanvr/ragetv.git
cd ragetv

# Install dependencies
pnpm install

# Run test suite
pnpm test

# Run linter
pnpm lint

# Start development server
pnpm dev
```

---

## 🌿 Branch & Git Guidelines

- Always branch off `origin/main`:
  ```bash
  git fetch origin main
  git checkout -b feat/your-feature-name origin/main
  ```
- Use **Conventional Commits** for all commit messages:
  - `feat: ...` for new features
  - `fix: ...` for bug fixes
  - `docs: ...` for documentation
  - `refactor: ...` for code cleanups
  - `chore: ...` for tool & config updates

---

## 🧪 Testing & Quality Checks

Before opening a Pull Request:
1. Ensure all TypeScript types pass: `pnpm exec tsc --noEmit`
2. Ensure all tests pass: `pnpm test`
3. Ensure no linting errors: `pnpm lint`

---

## ⚖️ License
By contributing to RageTV, you agree that your contributions will be licensed under the [MIT License](LICENSE).
