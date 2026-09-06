import { createServerFn } from '@tanstack/react-start'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

const getAuthHeaders = () => {
  const token = process.env.TMDB_ACCESS_TOKEN

  if (!token) {
    throw new Error('TMDB access token is missing.')
  }

  return {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

const getMoviesByGenre = createServerFn({ method: 'GET' })
  .validator((data: { genreId: number | number[]; page?: number }) => data)
  .handler(async ({ data }) => {
    const url = new URL(`${TMDB_BASE_URL}/discover/movie`)

    url.searchParams.set('with_genres', String(data.genreId))
    url.searchParams.set('language', 'en-US')
    url.searchParams.set('page', String(data.page ?? 1))
    url.searchParams.set('sort_by', 'popularity.desc')
    url.searchParams.set('include_adult', 'true')

    const response = await fetch(url, { headers: getAuthHeaders() })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch movies for genre ${data.genreId}: ${response.status} | ${response.statusText}`,
      )
    }

    return response.json() as Promise<TmdbMovieListResponse>
  })

const getMovieById = createServerFn({ method: 'GET' })
  .validator((data: { movieId: string }) => data)
  .handler(async ({ data }) => {
    const url = new URL(`${TMDB_BASE_URL}/movie/${data.movieId}`)

    url.searchParams.set('language', 'en-US')

    const response = await fetch(url, { headers: getAuthHeaders() })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch movie ${data.movieId}: ${response.status} | ${response.statusText}`,
      )
    }

    return response.json() as Promise<TmdbMovieDetails>
  })

const getGenreDefinitions = createServerFn({ method: 'GET' }).handler(
  async () => {
    const url = new URL(`${TMDB_BASE_URL}/genre/movie/list`)

    url.searchParams.set('language', 'en-US')

    const response = await fetch(url, { headers: getAuthHeaders() })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch genre definitions: ${response.status} | ${response.statusText}`,
      )
    }

    return response.json() as Promise<TmdbGenreListResponse>
  },
)

export { getMovieById, getMoviesByGenre, getGenreDefinitions }
