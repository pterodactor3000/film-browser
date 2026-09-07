import path from 'node:path'

import express from 'express'
import compression from 'compression'
import { createServer as createViteServer } from 'vite'

import { createTmdbRouter } from './src/server/tmdb-routes'

import type { Request, Response } from 'express'
import type { ViteDevServer } from 'vite'

interface ServerEntry {
  render: (args: { req: Request; res: Response }) => Promise<void>
}

// Vite used to load `.env` for server functions. A plain Node process does not,
// so read it here. Missing file is fine when the host injects real env vars.
try {
  process.loadEnvFile()
} catch {
  console.info('No .env file found, using the ambient environment.')
}

const isProduction = process.env.NODE_ENV === 'production'
const PORT = Number(process.env.PORT ?? 3000)

// Built at runtime so TypeScript does not try to resolve a path that only
// exists after `pnpm build`.
const PRODUCTION_ENTRY = './dist/server/entry-server.js'

const loadServerEntry = async (vite?: ViteDevServer): Promise<ServerEntry> => {
  if (vite) {
    return (await vite.ssrLoadModule('/src/entry-server.tsx')) as ServerEntry
  }

  return (await import(PRODUCTION_ENTRY)) as ServerEntry
}

async function startServer() {
  const app = express()

  app.use('/api', createTmdbRouter())

  let vite: ViteDevServer | undefined

  if (isProduction) {
    app.use(compression())
    app.use(express.static('dist/client', { index: false }))
  } else {
    vite = await createViteServer({
      appType: 'custom',
      server: { middlewareMode: true },
    })
    app.use(vite.middlewares)
  }

  app.use(async (req, res) => {
    // Anything with a file extension that got this far is a missing asset, not
    // a route. Rendering the app for it would return HTML with a 200.
    if (path.extname(req.originalUrl.split('?')[0]) !== '') {
      res.status(404).end('Not found')
      return
    }

    try {
      const { render } = await loadServerEntry(vite)
      await render({ req, res })
    } catch (error) {
      vite?.ssrFixStacktrace(error as Error)
      console.error(`SSR render failed for ${req.originalUrl}:`, error)

      if (!res.headersSent) {
        res.status(500).end('Internal Server Error')
      } else {
        res.end()
      }
    }
  })

  app.listen(PORT, () => {
    console.info(`Server listening on http://localhost:${PORT}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
