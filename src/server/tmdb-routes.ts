import { Router } from 'express'

import { getGenreDefinitions, getMovieById, getMoviesByGenre } from './tmdb'

import type { Response } from 'express'

/**
 * Upstream failures are logged with their cause but answered with a generic
 * message, so TMDB status text and internal paths never reach the browser.
 */
const sendUpstreamResult = async <TResponse>(
  res: Response,
  operation: string,
  load: () => Promise<TResponse>,
) => {
  try {
    res.json(await load())
  } catch (error) {
    console.error(`${operation} failed:`, error)
    res.status(502).json({ message: 'Could not reach the movie database' })
  }
}

const createTmdbRouter = () => {
  const router = Router()

  router.get('/genres', (_req, res) =>
    sendUpstreamResult(res, 'GET /api/genres', getGenreDefinitions),
  )

  router.get('/movies', (req, res) => {
    const genreId = Number(req.query.genreId)
    const page = Number(req.query.page ?? 1)

    if (!Number.isInteger(genreId) || !Number.isInteger(page) || page < 1) {
      res
        .status(400)
        .json({ message: 'genreId and page must be positive integers' })
      return
    }

    return sendUpstreamResult(res, `GET /api/movies (genre ${genreId})`, () =>
      getMoviesByGenre({ genreId, page }),
    )
  })

  router.get('/movies/:movieId', (req, res) => {
    const { movieId } = req.params

    if (!/^\d+$/.test(movieId)) {
      res.status(400).json({ message: 'movieId must be a positive integer' })
      return
    }

    return sendUpstreamResult(res, `GET /api/movies/${movieId}`, () =>
      getMovieById({ movieId }),
    )
  })

  return router
}

export { createTmdbRouter }
