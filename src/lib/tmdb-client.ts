import type {
  TmdbGenreListResponse,
  TmdbMovieDetails,
  TmdbMovieListResponse,
} from '#/lib/types.ts'

const requestApi = async <TResponse>(
  pathname: string,
  searchParams: Record<string, string> = {},
  operation: string,
): Promise<TResponse> => {
  const query = new URLSearchParams(searchParams).toString()
  const url = query ? `/api${pathname}?${query}` : `/api${pathname}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`${operation} failed: ${response.status}`)
  }

  return response.json() as Promise<TResponse>
}

const fetchMoviesByGenre = async ({
  genreId,
  page = 1,
}: {
  genreId: number
  page?: number
}): Promise<TmdbMovieListResponse> => {
  if (import.meta.env.SSR) {
    const { getMoviesByGenre } = await import('#/server/tmdb.ts')
    return getMoviesByGenre({ genreId, page })
  }

  return requestApi<TmdbMovieListResponse>(
    '/movies',
    { genreId: String(genreId), page: String(page) },
    `Loading movies for genre ${genreId}`,
  )
}

const fetchMovieById = async ({
  movieId,
}: {
  movieId: string
}): Promise<TmdbMovieDetails> => {
  if (import.meta.env.SSR) {
    const { getMovieById } = await import('#/server/tmdb.ts')
    return getMovieById({ movieId })
  }

  return requestApi<TmdbMovieDetails>(
    `/movies/${encodeURIComponent(movieId)}`,
    {},
    `Loading movie ${movieId}`,
  )
}

const fetchGenreDefinitions = async (): Promise<TmdbGenreListResponse> => {
  if (import.meta.env.SSR) {
    const { getGenreDefinitions } = await import('#/server/tmdb.ts')
    return getGenreDefinitions()
  }

  return requestApi<TmdbGenreListResponse>(
    '/genres',
    {},
    'Loading genre definitions',
  )
}

export { fetchGenreDefinitions, fetchMovieById, fetchMoviesByGenre }
