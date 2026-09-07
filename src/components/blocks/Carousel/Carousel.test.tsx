import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { TmdbMovieListItem } from '#/lib/types.ts'

import { Carousel } from './Carousel'

const { fetchGenreDefinitions, fetchMoviesByGenre } = vi.hoisted(() => ({
  fetchGenreDefinitions: vi.fn(),
  fetchMoviesByGenre: vi.fn(),
}))

vi.mock('#/lib/tmdb-client.ts', () => ({
  fetchGenreDefinitions,
  fetchMoviesByGenre,
}))

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    params,
    search,
  }: {
    children: ReactElement
    params: { movieId: string }
    search: { genreId: number }
  }) => {
    const genreQuery =
      search.genreId === undefined ? '' : `?genreId=${search.genreId}`

    return <a href={`/details/${params.movieId}${genreQuery}`}>{children}</a>
  },
}))

const genreDefinitions = {
  genres: [
    { id: 878, name: 'Science Fiction' },
    { id: 27, name: 'Horror' },
    { id: 53, name: 'Thriller' },
    { id: 12, name: 'Adventure' },
  ],
}

const createMovie = (id: number, title: string): TmdbMovieListItem => ({
  adult: false,
  backdrop_path: null,
  genre_ids: [878],
  id,
  original_language: 'en',
  original_title: title,
  overview: '',
  popularity: 0,
  poster_path: '/png.png',
  release_date: '2010-01-01',
  softcore: false,
  title,
  video: false,
  vote_average: 0,
  vote_count: 0,
})

const createMoviePage = (page: number, totalPages: number) => ({
  page,
  results: Array.from({ length: 20 }, (_, index) =>
    createMovie(page * 100 + index, `Page ${page} Movie ${index + 1}`),
  ),
  total_pages: totalPages,
  total_results: totalPages * 20,
})

const oneMovieList = {
  page: 1,
  results: [createMovie(12345, 'Some Title')],
  total_pages: 1,
  total_results: 1,
}

const renderCarousel = (genreId: number) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<p>Loading your lists, be patient...</p>}>
        <Carousel genreId={genreId} />
      </Suspense>
    </QueryClientProvider>,
  )
}

describe('Carousel', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('puts the success genreId on movie links and not another genre id', async () => {
    fetchGenreDefinitions.mockResolvedValue(genreDefinitions)
    fetchMoviesByGenre.mockResolvedValue(oneMovieList)

    renderCarousel(878)

    expect(
      await screen.findByRole('heading', { name: 'Science Fiction' }),
    ).toBeInTheDocument()

    const movieLink = screen.getByRole('link', { name: /Some Title/ })
    expect(movieLink).toHaveAttribute('href', '/details/12345?genreId=878')
    expect(movieLink.getAttribute('href')).not.toContain('genreId=27')
    expect(movieLink.getAttribute('href')).not.toContain('genreId=53')
    expect(movieLink.getAttribute('href')).not.toContain('genreId=12')
  })

  it('puts the fail genreId on movie links and not a carousel genre id', async () => {
    fetchGenreDefinitions.mockResolvedValue(genreDefinitions)
    fetchMoviesByGenre.mockResolvedValue(oneMovieList)

    renderCarousel(12)

    expect(
      await screen.findByRole('heading', { name: 'Adventure' }),
    ).toBeInTheDocument()

    const movieLink = screen.getByRole('link', { name: /Some Title/ })
    expect(movieLink).toHaveAttribute('href', '/details/12345?genreId=12')
    expect(movieLink.getAttribute('href')).not.toContain('genreId=878')
    expect(movieLink.getAttribute('href')).not.toContain('genreId=27')
    expect(movieLink.getAttribute('href')).not.toContain('genreId=53')
  })

  it('loads the next page when the second-to-last batch is visible', async () => {
    fetchGenreDefinitions.mockResolvedValue(genreDefinitions)
    fetchMoviesByGenre.mockImplementation(
      ({ page = 1 }: { genreId: number; page?: number }) =>
        Promise.resolve(createMoviePage(page, 2)),
    )

    const user = userEvent.setup()
    renderCarousel(878)

    expect(await screen.findByText('Page 1 Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Page 1 Movie 10')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()
    expect(fetchMoviesByGenre).toHaveBeenCalledTimes(1)
    expect(fetchMoviesByGenre).toHaveBeenCalledWith({
      genreId: 878,
      page: 1,
    })

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(screen.getByText('Page 1 Movie 6')).toBeInTheDocument()
    expect(screen.getByText('Page 1 Movie 15')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled()
    expect(fetchMoviesByGenre).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(screen.getByText('Page 1 Movie 11')).toBeInTheDocument()
    expect(screen.getByText('Page 1 Movie 20')).toBeInTheDocument()

    await waitFor(() => {
      expect(fetchMoviesByGenre).toHaveBeenCalledWith({
        genreId: 878,
        page: 2,
      })
    })

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(await screen.findByText('Page 2 Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Page 1 Movie 16')).toBeInTheDocument()
  })
})
