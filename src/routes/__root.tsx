import type { QueryClient } from '@tanstack/react-query'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'

import { Header } from '#/components/ui/Header/Header.tsx'

import appCss from '../styles/global.scss?url'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Movie browser',
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lekton:ital,wght@0,400;0,700;1,400&family=Limelight&family=Metal+Mania&family=Roboto:ital,wght@0,100..900;1,100..900&family=Special+Elite&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
    // TanStack Start used to inject the client entry. Without it the document
    // renders but never hydrates, so the entry (and Vite's dev client) are
    // declared here instead.
    scripts: [
      ...(import.meta.env.PROD
        ? []
        : [
            {
              type: 'module',
              children: `import RefreshRuntime from '/@react-refresh'
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true`,
            },
            { type: 'module', src: '/@vite/client' },
          ]),
      {
        type: 'module',
        src: import.meta.env.PROD
          ? '/entry-client.js'
          : '/src/entry-client.tsx',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
