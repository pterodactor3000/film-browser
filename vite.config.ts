import path from 'node:path'
import { defineConfig } from 'vite'

import viteReact from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

/**
 * Unhashed entry names so `__root.tsx` and `server.ts` can reference
 * `/entry-client.js` and `dist/server/entry-server.js` directly.
 */
const entryOutput = {
  entryFileNames: '[name].js',
  chunkFileNames: 'assets/[name]-[hash].js',
  assetFileNames: 'assets/[name]-[hash][extname]',
}

export default defineConfig(({ isSsrBuild }) => ({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      enableStreaming: true,
    }),
    viteReact(),
  ],
  ssr: { optimizeDeps: { include: ['@tanstack/react-router/ssr/server'] } },
  build: isSsrBuild
    ? {
        ssr: true,
        outDir: 'dist/server',
        emitAssets: true,
        copyPublicDir: false,
        rolldownOptions: {
          input: path.resolve(import.meta.dirname, 'src/entry-server.tsx'),
          external: ['express', 'compression'],
          output: entryOutput,
        },
      }
    : {
        outDir: 'dist/client',
        emitAssets: true,
        copyPublicDir: true,
        rolldownOptions: {
          input: path.resolve(import.meta.dirname, 'src/entry-client.tsx'),
          output: entryOutput,
        },
      },
}))
