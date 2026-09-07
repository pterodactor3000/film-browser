import type { ReactNode } from 'react'

import './MovieDescription.scss'

interface MovieDescriptionProps {
  title: string
  tagline: string
  overview: string
  genres: string[]
  runtimeMinutes: number | null
  releaseYear: string
  voteAverage: number
  watchlistButton: ReactNode
}

const MovieDescription = ({
  title,
  tagline,
  overview,
  genres,
  runtimeMinutes,
  releaseYear,
  voteAverage,
  watchlistButton,
}: MovieDescriptionProps) => {
  return (
    <section className="description">
      <h2>{title}</h2>
      <h4>{tagline}</h4>
      {watchlistButton}
      <div>{overview}</div>
      <div>
        <dl>
          <dt>Runtime</dt>
          <dd>{runtimeMinutes} min</dd>

          <dt>Release year</dt>
          <dd>{releaseYear}</dd>

          <dt>Avg. vote</dt>
          <dd>{voteAverage}</dd>

          <dt>Genres</dt>
          <dd>{genres?.join(', ')}</dd>
        </dl>
      </div>
    </section>
  )
}

export { MovieDescription }
