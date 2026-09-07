import { pipeline } from 'node:stream/promises'

import {
  RouterServer,
  createRequestHandler,
  renderRouterToStream,
} from '@tanstack/react-router/ssr/server'

import { getRouter } from './router'

import type { Request, Response } from 'express'

const toWebRequest = (req: Request) => {
  const url = new URL(req.originalUrl, `http://${req.headers.host}`)
  const headers = new Headers()

  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') {
      headers.set(key, value)
    }
  }

  return new global.Request(url, { method: req.method, headers })
}

export async function render({ req, res }: { req: Request; res: Response }) {
  const handler = createRequestHandler({
    request: toWebRequest(req),
    createRouter: getRouter,
  })

  const response = await handler(({ request, responseHeaders, router }) =>
    renderRouterToStream({
      request,
      responseHeaders,
      router,
      children: <RouterServer router={router} />,
    }),
  )

  res.status(response.status)
  response.headers.forEach((value, name) => res.setHeader(name, value))

  return pipeline(response.body as unknown as NodeJS.ReadableStream, res)
}
