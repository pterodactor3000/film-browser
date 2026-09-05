import { afterEach } from 'vitest'

import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { runWithStartContext } from '@tanstack/start-storage-context'

afterEach(() => {
  cleanup()
})

/**
 * The call for the createServerFn that are getMoviesByGenre, or others,
 * are remote procedure calls.
 * That call first runs Start middleware THEN my server function handler.
 * Since we're running it in tests and not live app, the Start never runs,
 * even the fetch never ran.
 * For this to work I need to wrap the test mock fetches in the exported function.
 * ===============================================================================
 * src: https://waldenperry.com/tanstack-server-function-testing/
 */
const startTestContext = {
  getRouter: () => {
    throw new Error('getRouter is not available in tests')
  },
  request: new Request('http://localhost/'),
  startOptions: { functionMiddleware: [], requestMiddleware: [] },
  contextAfterGlobalMiddlewares: {},
  executedRequestMiddlewares: new Set(),
  handlerType: 'serverFn' as const,
}

const runServerFn = <T>(callback: () => T | Promise<T>) => {
  return runWithStartContext(startTestContext, callback)
}

export { runServerFn }
