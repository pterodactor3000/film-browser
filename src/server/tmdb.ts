import type {
  TmdbGenreListResponse,
  TmdbMovieDetails,
  TmdbMovieListResponse,
} from '#/lib/types.ts'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

const fetchTmdb = async <TResponse>(
  pathname: string,
  searchParams: Record<string, string> = {},
): Promise<TResponse> => {
  const token = process.env.TMDB_ACCESS_TOKEN

  if (!token) {
    throw new Error('TMDB access token is missing.')
  }

  const url = new URL(`${TMDB_BASE_URL}${pathname}`)
  url.searchParams.set('language', 'en-US')

  for (const [key, value] of Object.entries(searchParams)) {
    url.searchParams.set(key, value)
  }

  const response = await fetch(url, {
    headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${pathname}: ${response.status} | ${response.statusText}`,
    )
  }

  return response.json() as Promise<TResponse>
}

const getMoviesByGenre = ({
  genreId,
  page = 1,
}: {
  genreId: number
  page?: number
}) =>
  fetchTmdb<TmdbMovieListResponse>('/discover/movie', {
    with_genres: String(genreId),
    page: String(page),
    sort_by: 'popularity.desc',
  })

const getMovieById = ({ movieId }: { movieId: string }) =>
  fetchTmdb<TmdbMovieDetails>(`/movie/${encodeURIComponent(movieId)}`)

const getGenreDefinitions = () =>
  fetchTmdb<TmdbGenreListResponse>('/genre/movie/list')

export { getGenreDefinitions, getMovieById, getMoviesByGenre }
