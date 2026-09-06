import { clsx } from 'clsx'

import { Link } from '@tanstack/react-router'

import { Image } from '#/components/ui/Image/Image.tsx'

import './SimpleMovieItem.scss'

const SimpleMovieItem = ({ movie }: { movie: MovieSimpleItem }) => {
  return (
    <li>
      <article className={clsx('movie-thumbnail')}>
        <Link
          to={`/details/$movieId`}
          params={{ movieId: String(movie.id) }}
          search={{ genreId: movie.genreId }}
        >
          <label htmlFor="img" className={clsx('movie-thumbnail-label')}>
            {movie.poster_path !== null ? (
              <Image
                src={movie.poster_path ?? ''}
                alt={movie.title}
                width={92}
              />
            ) : null}
            <span className="movie-thumbnail-title">{movie.title}</span>
          </label>
        </Link>
      </article>
    </li>
  )
}

export { SimpleMovieItem }
