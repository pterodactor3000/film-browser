import { describe, expect, it } from 'vitest'

import { render, screen } from '@testing-library/react'

import { MovieDescription } from './MovieDescription'

const movieDescription = {
  title: 'Some Title',
  tagline: 'Some tagline',
  overview: 'Some overview',
  genres: ['Science Fiction'],
  runtimeMinutes: 120,
  releaseYear: '2010',
  voteAverage: 8.4,
  isInWatchlist: false,
  watchlistButtonHandler: () => {},
}

describe('MovieDescription', () => {
  it('renders title and overview', () => {
    render(<MovieDescription {...movieDescription} buttonType="square" />)

    expect(
      screen.getByRole('heading', { name: 'Some Title' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Some overview')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add to watchlist' }),
    ).toBeInTheDocument()
  })

  it('applies the given watchlist button type', () => {
    render(<MovieDescription {...movieDescription} buttonType="round" />)

    expect(screen.getByRole('button', { name: 'Add to watchlist' })).toHaveClass(
      'button--round',
    )
  })

  it('shows watchlist button text when type is none', () => {
    render(<MovieDescription {...movieDescription} buttonType="none" />)

    const button = screen.getByRole('button', { name: 'Add to watchlist' })
    expect(button).not.toHaveClass('button--round')
    expect(button).not.toHaveClass('button--square')
    expect(button).toHaveTextContent('Add to watchlist')
  })
})
