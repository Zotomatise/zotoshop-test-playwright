# Zotoshop — Tests E2E Playwright

Tests d'automatisation pour l'application ZotoShop (Medusa.js v2 + Next.js 15).

## Prérequis

ZotoShop doit tourner localement :
```bash
cd ~/Documents/Workspaces/zotoshop
docker compose up -d
```
- Storefront : http://localhost:8000
- Admin     : http://localhost:9000/app
- API       : http://localhost:9000

## Installation

```bash
npm install
npx playwright install
cp .env.example .env
```

## Lancer les tests

```bash
npm test                  # tous les navigateurs
npm run test:chromium     # Chromium uniquement
npm run test:headed       # mode visible
npm run test:ui           # mode UI interactif
npm run test:api          # tests API uniquement
npm run test:debug        # mode debug
npm run report            # rapport HTML
npm run codegen           # générateur de tests
```

## Structure

```
tests/
├── e2e/         # specs : homepage, store, cart, admin, api
├── pages/       # Page Object Model
├── fixtures/    # fixtures Playwright (POM injectés)
└── utils/       # helpers
```

## Stack

- Playwright + TypeScript
- Multi-browser : Chromium, Firefox, WebKit, Pixel 7 mobile
- Locale `fr-FR`, timezone Europe/Paris
- Reporter HTML + list, traces on-first-retry, screenshots & videos on failure
- CI GitHub Actions (`.github/workflows/playwright.yml`)

## Variables d'environnement

Voir `.env.example`. Les valeurs locales sont déjà préremplies dans `.env` (admin@zotoshop.com / zotoshop2026).
