import { Suspense } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

import { CarouselPanel } from './CarouselPanel'

const { getGenreDefinitions, getMoviesByGenre } = vi.hoisted(() => ({
  getGenreDefinitions: vi.fn(),
  getMoviesByGenre: vi.fn(),
}))

vi.mock('#/lib/tmdb.ts', () => ({
  getGenreDefinitions,
  getMoviesByGenre,
}))

vi.mock('#/routes/index.tsx', () => ({
  GENRE_IDS: [878, 27, 53],
}))

const genreDefinitions = {
  genres: [
    { id: 878, name: 'Science Fiction' },
    { id: 27, name: 'Horror' },
    { id: 53, name: 'Thriller' },
  ],
}

const emptyMovieList = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
}

const renderCarouselPanel = () => {
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
        <CarouselPanel />
      </Suspense>
    </QueryClientProvider>,
  )
}

describe('CarouselPanel', () => {
  it('renders three carousels when genre queries succeed', async () => {
    getGenreDefinitions.mockResolvedValue(genreDefinitions)
    getMoviesByGenre.mockResolvedValue(emptyMovieList)

    renderCarouselPanel()

    expect(
      await screen.findByRole('heading', { name: 'Science Fiction' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Horror' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Thriller' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3)
  })

  it('renders an error message when a genre query fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    getGenreDefinitions.mockResolvedValue(genreDefinitions)
    getMoviesByGenre.mockImplementation(({ data }: { data: { genreId: number } }) => {
      if (data.genreId === 27) {
        return Promise.reject(new Error('Failed to fetch movies for genre 27'))
      }

      return Promise.resolve(emptyMovieList)
    })

    renderCarouselPanel()

    expect(
      await screen.findByText(
        'Could not fetch the data, try again or contact someone',
      ),
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})
