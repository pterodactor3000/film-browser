import { describe, expect, it } from 'vitest'

import { render, screen } from '@testing-library/react'

import { MovieDescription } from './MovieDescription'

describe('MovieDescription', () => {
  it('renders title and overview', () => {
    render(
      <MovieDescription
        title="Some Title"
        overview="Some overview"
        isInWatchlist={false}
        watchlistButtonHandler={() => {}}
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'Some Title' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Some overview')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add to watchlist' }),
    ).toBeInTheDocument()
  })
})
