import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getGenreDefinitions, getMovieById, getMoviesByGenre } from './tmdb'

describe('tmdb', () => {
  const mockFetch = (payload: unknown) => {
    const fetchSuccessMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => payload,
    })

    vi.stubGlobal('fetch', fetchSuccessMock)

    return fetchSuccessMock
  }

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  beforeEach(() => {
    vi.stubEnv('TMDB_ACCESS_TOKEN', 'test-token')
  })

  it('returns the movie list for a genre and sends the bearer token', async () => {
    const payload = {
      page: 1,
      results: [
        { id: 12345, title: 'Some movie' },
        { id: 43210, title: 'Other movie' },
      ],
      total_pages: 1,
      total_results: 2,
    }

    const fetchMock = mockFetch(payload)

    const movies = await getMoviesByGenre({ genreId: 123 })

    expect(movies).toEqual(payload)

    const [calledUrl, calledInit] = fetchMock.mock.calls[0]
    expect(String(calledUrl)).toContain('discover/movie')
    expect(calledInit.headers).toMatchObject({
      accept: 'application/json',
      Authorization: 'Bearer test-token',
    })
  })

  it('sends the genre and page as query parameters', async () => {
    const fetchMock = mockFetch({ page: 3, results: [] })

    await getMoviesByGenre({ genreId: 27, page: 3 })

    const requestUrl = new URL(String(fetchMock.mock.calls[0][0]))
    expect(requestUrl.searchParams.get('with_genres')).toEqual('27')
    expect(requestUrl.searchParams.get('page')).toEqual('3')
    expect(requestUrl.searchParams.get('language')).toEqual('en-US')
  })

  it('defaults to the first page when no page is given', async () => {
    const fetchMock = mockFetch({ page: 1, results: [] })

    await getMoviesByGenre({ genreId: 27 })

    const requestUrl = new URL(String(fetchMock.mock.calls[0][0]))
    expect(requestUrl.searchParams.get('page')).toEqual('1')
  })

  it('fetches a single movie by id', async () => {
    const payload = { id: 12345, title: 'Some movie' }

    const fetchMock = mockFetch(payload)

    const movie = await getMovieById({ movieId: '12345' })

    expect(movie).toEqual(payload)

    const [calledUrl, calledInit] = fetchMock.mock.calls[0]
    expect(String(calledUrl)).toContain('movie/12345')
    expect(calledInit.headers).toMatchObject({
      accept: 'application/json',
      Authorization: 'Bearer test-token',
    })
  })

  it('escapes the movie id so it cannot alter the request path', async () => {
    const fetchMock = mockFetch({ id: 1, title: 'Some movie' })

    await getMovieById({ movieId: '../../genre/movie/list' })

    const requestUrl = new URL(String(fetchMock.mock.calls[0][0]))
    expect(requestUrl.pathname).toEqual('/3/movie/..%2F..%2Fgenre%2Fmovie%2Flist')
  })

  it('returns the genre definitions', async () => {
    const payload = {
      genres: [
        { id: 12, name: 'Adventure' },
        { id: 28, name: 'Action' },
      ],
    }

    const fetchMock = mockFetch(payload)

    const genres = await getGenreDefinitions()

    expect(genres).toEqual(payload)

    const [calledUrl, calledInit] = fetchMock.mock.calls[0]
    expect(String(calledUrl)).toContain('genre/movie/list')
    expect(calledInit.headers).toMatchObject({
      accept: 'application/json',
      Authorization: 'Bearer test-token',
    })
  })

  it('throws when the access token is missing', async () => {
    vi.stubEnv('TMDB_ACCESS_TOKEN', '')

    await expect(getGenreDefinitions()).rejects.toThrow(
      'TMDB access token is missing.',
    )
  })

  it('throws with the status when TMDB responds with an error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      }),
    )

    await expect(getGenreDefinitions()).rejects.toThrow(
      'Failed to fetch /genre/movie/list: 404 | Not Found',
    )
  })
})
