# Film browser

Browse films by genre, view details, and manage a watchlist. Data from the [TMDB API](https://developer.themoviedb.org/).

Built with: TanStack Router, TanStack Query, TanStack DB, React 19, SCSS, Vite.

---

## Architecture

SSR runs through a hand-written Express server (`server.ts`). On each request it invokes `renderRouterToStream` from `@tanstack/react-router/ssr/server` and streams the result. The client hydrates via `src/entry-client.tsx`. Vite builds twice: `pnpm build:client` for the browser bundle and `pnpm build:server` for the Node entry.

TMDB access lives entirely server-side. `src/server/tmdb.ts` holds the token and the outbound fetch. `src/server/tmdb-routes.ts` exposes `/api/genres`, `/api/movies`, and `/api/movies/:movieId`. `src/lib/tmdb-client.ts` imports the server module directly during SSR (behind `import.meta.env.SSR` to keep it out of the browser bundle) and hits the HTTP API on the client.

Route loaders prefetch data into the Query cache. The cache is dehydrated into the server-rendered HTML so the client hydrates without a second round-trip. The watchlist reads `localStorage` and is client-only.

### Project creation

Scaffolded with `pnpm create vite`, React, TanStack Router variant. At the time `create-vite` delegated that variant to `create-tsrouter-app`. The init commit is that generator's output. Removed from it: `AGENTS.md`, `.cta.json`, `src/integrations/`, and the generated README. Still generator output: `src/router.tsx` and `src/routeTree.gen.ts`. Everything else is hand-written.

---

## Prerequisites

- **Node.js 24.** Pinned in `.nvmrc`. Run `nvm use` to switch automatically.
- **pnpm 11.22.0.** If missing: `corepack enable && corepack prepare pnpm@11.22.0 --activate`
- **TMDB read-access token.** A long JWT starting with `eyJ`, not the shorter v3 key. Get one at [themoviedb.org](https://www.themoviedb.org/) under Settings > API > API Read Access Token.

---

## Setup

```bash
git clone <repository-url> film-browser
cd film-browser
cp .env.example .env          # then replace the placeholder with your token
pnpm install
```

---

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server with HMR on `http://localhost:3000` |
| `pnpm build` | Client + server production builds into `dist/` |
| `pnpm start` | Serve the production build |
| `pnpm test` | Vitest run (all `*.test.{ts,tsx}`) |
| `pnpm typecheck` | `tsc --noEmit` |
