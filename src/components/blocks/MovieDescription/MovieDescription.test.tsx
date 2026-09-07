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
  watchlistButton: (
    <button type="button" className="button button--square">
      Add to watchlist
    </button>
  ),
}

describe('MovieDescription', () => {
  it('renders title, overview, and the given watchlist button', () => {
    render(<MovieDescription {...movieDescription} />)

    expect(
      screen.getByRole('heading', { name: 'Some Title' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Some overview')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add to watchlist' }),
    ).toBeInTheDocument()
  })
})
