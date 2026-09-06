import type { ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'

import { WatchlistPanel } from './WatchlistPanel'

const { getLocalWatchlist } = vi.hoisted(() => ({
  getLocalWatchlist: vi.fn(),
}))

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: ReactElement }) => (
    <a href="/">{children}</a>
  ),
}))

vi.mock('#/lib/watchlist-collection.ts', () => ({
  getLocalWatchlist,
}))

describe('WatchlistPanel', () => {
  it('shows empty message when watchlist has no movies', () => {
    getLocalWatchlist.mockReturnValue({ data: [] })

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
    })

    render(<WatchlistPanel />)

    expect(screen.getByText('Some Title')).toBeInTheDocument()
    expect(screen.queryByText('Wow, so empty...')).not.toBeInTheDocument()
  })
})
