import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'

import { DetailsPanel } from './DetailsPanel'

const { getLocalWatchlist } = vi.hoisted(() => ({
  getLocalWatchlist: vi.fn(),
}))

vi.mock('#/lib/watchlist-collection.ts', () => ({
  getLocalWatchlist,
  addToLocalWatchlist: vi.fn(),
  removeFromLocalWatchlist: vi.fn(),
}))

const movie: TmdbMovieDetails = {
  adult: false,
  backdrop_path: null,
  belongs_to_collection: null,
  budget: 0,
  genres: [],
  homepage: '',
  id: 12345,
  imdb_id: null,
  origin_country: ['US'],
  original_language: 'en',
  original_title: 'Some Original Title',
  overview: 'Some overview',
  popularity: 0,
  poster_path: '/png.png',
  production_companies: [],
  production_countries: [],
  release_date: '2010-07-16',
  revenue: 0,
  runtime: 120,
  spoken_languages: [],
  status: 'Released',
  tagline: '',
  title: 'Some Title',
  video: false,
  vote_average: 8.4,
  vote_count: 100,
}

describe('DetailsPanel', () => {
  it('renders all page items with the success genre class and not the others', () => {
    getLocalWatchlist.mockReturnValue({ data: [] })

    render(<DetailsPanel movie={movie} genreId={878} />)

    expect(screen.getByRole('img', { name: 'Some Title' })).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/png.png',
    )
    expect(
      screen.getByRole('heading', { name: 'Some Title' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Some overview')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add to watchlist' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Original title (en)')).toBeInTheDocument()
    expect(screen.getByText('Some Original Title')).toBeInTheDocument()
    expect(screen.getByText('2010-07-16')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()

    const article = screen.getByRole('article')
    expect(article).toHaveClass('details-style--scifi')
    expect(article).not.toHaveClass('details-style--horror')
    expect(article).not.toHaveClass('details-style--thriller')
  })

  it('does not apply a genre class when genreId is not a known carousel genre', () => {
    getLocalWatchlist.mockReturnValue({ data: [] })

    render(<DetailsPanel movie={movie} genreId={12} />)

    const article = screen.getByRole('article')
    expect(article).toHaveClass('details')
    expect(article).not.toHaveClass('details-style--scifi')
    expect(article).not.toHaveClass('details-style--horror')
    expect(article).not.toHaveClass('details-style--thriller')
  })
})
