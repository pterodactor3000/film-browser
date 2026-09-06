# Film browser

A movie discovery app built with TanStack Start, TanStack Router, and TanStack Query. It pulls live data from The Movie Database (TMDB) API and lets you browse films by genre, view movie details, and manage a watchlist.

---

## Prerequisites

Before you start:

- **Node.js 24.** The project pins its Node version in `.nvmrc`. If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` from the project root and it will switch automatically.
- **pnpm 11.22.0.** The `package.json` declares `"packageManager": "pnpm@11.22.0"`. If you don't have pnpm, install it with:

  ```bash
  corepack enable
  corepack prepare pnpm@11.22.0 --activate
  ```

- **A TMDB read-access token.** The app fetches all movie data from the TMDB API. Without the token, every server function that calls TMDB will throw. See the next section for how to get one.

---

## Get a TMDB API key

The app uses TMDB's [v4 read-access token](https://developer.themoviedb.org/docs/authentication-application) (a long JWT), not the shorter v3 API key.

1. Go to [themoviedb.org](https://www.themoviedb.org/) and create a free account.
2. Open your account settings, then navigate to **API**.
3. Request a developer API key. TMDB will ask for a brief description of your app; "personal film browser" is fine.
4. After approval, scroll down to the **API Read Access Token** section and copy the long token (starts with `eyJ`).

That long token is what goes in your `.env` file.

---

## Clone and configure

Clone the repository and move into the project root:

```bash
git clone <repository-url> film-browser
cd film-browser
```

The repository ships with a `.env` file that has a placeholder token. Replace the value with your own token:

```bash
# .env
TMDB_ACCESS_TOKEN=eyJ...your-actual-token-here...
```

---

## Install dependencies

From the project root:

```bash
pnpm install
```

---

## Run the development server

```bash
pnpm dev
```

The app starts on `http://localhost:3000`.

---

## Run the tests

```bash
pnpm test
```

This runs `vitest run`, which executes all files matching `src/**/*.test.{ts,tsx}`.

---

## Build for production

```bash
pnpm build
```

Vite compiles the app into `dist/`. The build applies TanStack Start's SSR plugin (`tanstackStart`) and the React plugin, then tree-shakes and minifies.

Check the build output for any TypeScript errors before deploying. TypeScript is configured in `tsconfig.json` with `strict: true`, `noUnusedLocals`, and `noUnusedParameters`.

---

## Preview the production build

After building, you can serve the compiled output locally:

```bash
pnpm preview
```

This starts Vite's preview server pointing at `dist/`. It is not a production server; use it only to verify the production build behaves the same as development before deploying.

---

## Regenerate routes

TanStack Router generates `src/routeTree.gen.ts` from the files in `src/routes/`. If you add, rename, or delete a route file, regenerate the tree:

```bash
pnpm generate-routes
```
