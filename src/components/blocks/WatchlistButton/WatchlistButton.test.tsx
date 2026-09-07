import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { WatchlistButton } from './WatchlistButton'

const { addToLocalWatchlist, getLocalWatchlist, removeFromLocalWatchlist } =
  vi.hoisted(() => ({
    addToLocalWatchlist: vi.fn(),
    getLocalWatchlist: vi.fn(),
    removeFromLocalWatchlist: vi.fn(),
  }))

vi.mock('#/lib/watchlist-collection.ts', () => ({
  addToLocalWatchlist,
  getLocalWatchlist,
  removeFromLocalWatchlist,
}))

const movie = {
  id: 12345,
  title: 'Some Title',
  poster_path: '/png.png',
}

describe('WatchlistButton', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders a disabled add button on the server even when the movie is saved', () => {
    getLocalWatchlist.mockReturnValue({
      data: [{ ...movie, genreId: 27 }],
      isReady: true,
    })

    const html = renderToString(
      <WatchlistButton movie={movie} genreId={27} type="round" />,
    )

    expect(html).toContain('Add to watchlist')
    expect(html).not.toContain('Remove from watchlist')
    expect(html).toContain('disabled')
    expect(getLocalWatchlist).not.toHaveBeenCalled()
  })

  it('stays disabled on the client until the live query is ready', () => {
    getLocalWatchlist.mockReturnValue({ data: [], isReady: false })

    render(<WatchlistButton movie={movie} genreId={27} type="round" />)

    expect(
      screen.getByRole('button', { name: 'Add to watchlist' }),
    ).toBeDisabled()
  })

  it('shows the remove label when the movie is already in the watchlist', () => {
    getLocalWatchlist.mockReturnValue({
      data: [{ ...movie, genreId: 27 }],
      isReady: true,
    })

    render(<WatchlistButton movie={movie} genreId={27} type="round" />)

    expect(
      screen.getByRole('button', { name: 'Remove from watchlist' }),
    ).toBeEnabled()
  })

  it('adds the movie when pressed and it is not in the watchlist', async () => {
    const user = userEvent.setup()
    getLocalWatchlist.mockReturnValue({ data: [], isReady: true })

    render(<WatchlistButton movie={movie} genreId={27} type="square" />)

    await user.click(screen.getByRole('button', { name: 'Add to watchlist' }))

    expect(addToLocalWatchlist).toHaveBeenCalledWith(
      12345,
      'Some Title',
      '/png.png',
      27,
    )
  })

  it('applies the given button type class', () => {
    getLocalWatchlist.mockReturnValue({ data: [], isReady: true })

    render(<WatchlistButton movie={movie} genreId={27} type="square" />)

    expect(
      screen.getByRole('button', { name: 'Add to watchlist' }),
    ).toHaveClass('button--square')
  })

  it('removes the movie when pressed and it is in the watchlist', async () => {
    const user = userEvent.setup()
    getLocalWatchlist.mockReturnValue({
      data: [{ ...movie, genreId: 27 }],
      isReady: true,
    })

    render(<WatchlistButton movie={movie} genreId={27} type="round" />)

    await user.click(
      screen.getByRole('button', { name: 'Remove from watchlist' }),
    )

    expect(removeFromLocalWatchlist).toHaveBeenCalledWith(12345)
  })
})
