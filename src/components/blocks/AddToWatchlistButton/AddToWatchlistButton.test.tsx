import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AddToWatchlistButton } from './AddToWatchlistButton'

describe('AddToWatchlistButton', () => {
  it('shows add label when movie is not in watchlist', () => {
    render(
      <AddToWatchlistButton
        handleWatchlistClick={() => {}}
        isInWatchlist={false}
        type="round"
        ariaLabel="Add to watchlist"
      />,
    )

    expect(
      screen.getByRole('button', { name: 'Add to watchlist' }),
    ).toBeInTheDocument()
  })

  it('shows remove label when movie is in watchlist', () => {
    render(
      <AddToWatchlistButton
        handleWatchlistClick={() => {}}
        isInWatchlist={true}
        type="round"
        ariaLabel="Remove from watchlist"
      />,
    )

    expect(
      screen.getByRole('button', { name: 'Remove from watchlist' }),
    ).toBeInTheDocument()
  })

  it('calls handler when pressed', async () => {
    const user = userEvent.setup()
    const handleWatchlistClick = vi.fn()

    render(
      <AddToWatchlistButton
        handleWatchlistClick={handleWatchlistClick}
        isInWatchlist={false}
        type="round"
        ariaLabel="Add to watchlist"
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Add to watchlist' }))

    expect(handleWatchlistClick).toHaveBeenCalledTimes(1)
  })

  it('applies the given button type class', () => {
    render(
      <AddToWatchlistButton
        handleWatchlistClick={() => {}}
        isInWatchlist={false}
        type="square"
        ariaLabel="Add to watchlist"
      />,
    )

    expect(screen.getByRole('button', { name: 'Add to watchlist' })).toHaveClass(
      'button--square',
    )
  })
})
