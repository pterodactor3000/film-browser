import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { runServerFn } from '#/test/setup.ts'

import { getGenreDefinitions, getMovieById, getMoviesByGenre } from './tmdb'

describe('tmdb', async () => {
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

  it('returns movie list by genre', async () => {
    const payload = {
      result: [
        { id: 12345, title: 'Some movie' },
        { id: 43210, title: 'Other movie' },
      ],
    }

    const fetchMock = mockFetch(payload)

    // wrapping the call in runServerFn, go to definition to see explanation
    const movies = await runServerFn(() =>
      getMoviesByGenre({ data: { genreId: 123 } }),
    )

    expect(movies).toEqual(payload.result)

    const [calledUrl, calledInit] = fetchMock.mock.calls[0]
    expect(String(calledUrl)).toContain('discover/movie')
    expect(calledInit.headers).toMatchObject({
      accept: 'application/json',
      Authorization: 'Bearer test-token',
    })
  })

  it('fetches movie object by movie id', async () => {
    const payload = { result: { id: 12345, title: 'Some movie' } }

    const fetchMock = mockFetch(payload)

    const movie = await runServerFn(() =>
      getMovieById({ data: { movieId: String(payload.result.id) } }),
    )

    expect(movie).toEqual(payload.result)

    const [calledUrl, calledInit] = fetchMock.mock.calls[0]
    expect(String(calledUrl)).toContain('movie/12345')
    expect(calledInit.headers).toMatchObject({
      accept: 'application/json',
      Authorization: 'Bearer test-token',
    })
  })

  it('get genre definitions', async () => {
    const payload = {
      result: [
        {
          id: 12,
          name: 'Adventure',
        },
        {
          id: 28,
          name: 'Action',
        },
      ],
    }

    const fetchMock = mockFetch(payload)

    const genres = await runServerFn(() => getGenreDefinitions())

    expect(genres).toEqual(payload.result)

    const [calledUrl, calledInit] = fetchMock.mock.calls[0]
    expect(String(calledUrl)).toContain('genre/movie/list')
    expect(calledInit.headers).toMatchObject({
      accept: 'application/json',
      Authorization: 'Bearer test-token',
    })
  })

  it('throws if token is missing', async () => {
    vi.unstubAllEnvs()
    vi.stubEnv('TMDB_ACCESS_TOKEN', '')

    await expect(runServerFn(() => getGenreDefinitions())).rejects.toThrow(
      'TMDB access token is missing.',
    )
  })

  it('throws if tmdb responds with error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      }),
    )
    await expect(runServerFn(() => getGenreDefinitions())).rejects.toThrow(
      'Failed to fetch genre definitions: 404 | Not Found',
    )
  })
})
