import type { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'

import { WatchlistPanel } from './WatchlistPanel'

const { getLocalWatchlist } = vi.hoisted(() => ({
  getLocalWatchlist: vi.fn(),
}))

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()

  return {
    ...actual,
    Link: ({ children }: { children: ReactElement }) => (
      <a href="/">{children}</a>
    ),
  }
})

vi.mock('#/lib/watchlist-collection.ts', () => ({
  getLocalWatchlist,
}))

describe('WatchlistPanel', () => {
  it('renders a loading fallback on the server instead of the empty state', () => {
    getLocalWatchlist.mockReturnValue({
      data: [
        {
          id: 12345,
          title: 'Some Title',
          poster_path: '/png.png',
          genreId: 27,
        },
      ],
      isReady: true,
    })

    const html = renderToString(<WatchlistPanel />)

    expect(html).toContain('Loading watchlist...')
    expect(html).not.toContain('Some Title')
    expect(html).not.toContain('Wow, so empty...')
    expect(getLocalWatchlist).not.toHaveBeenCalled()
  })

  it('keeps the loading fallback while the live query is not ready', () => {
    getLocalWatchlist.mockReturnValue({ data: [], isReady: false })

    render(<WatchlistPanel />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading watchlist...')
    expect(screen.queryByText('Wow, so empty...')).not.toBeInTheDocument()
  })

  it('shows empty message when watchlist has no movies', () => {
    getLocalWatchlist.mockReturnValue({ data: [], isReady: true })

    render(<WatchlistPanel />)

    expect(screen.getByText('Wow, so empty...')).toBeInTheDocument()
  })

  it('renders movies from the watchlist', () => {
    getLocalWatchlist.mockReturnValue({
      data: [
        {
          id: 12345,
          title: 'Some Title',
          poster_path: '/png.png',
          genreId: 27,
        },
      ],
      isReady: true,
    })

    render(<WatchlistPanel />)

    expect(screen.getByText('Some Title')).toBeInTheDocument()
    expect(screen.queryByText('Wow, so empty...')).not.toBeInTheDocument()
  })
})
