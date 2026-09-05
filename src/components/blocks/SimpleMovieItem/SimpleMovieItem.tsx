import { Image } from '#/components/ui/Image/Image.tsx'
import { Link } from '@tanstack/react-router'

const SimpleMovieItem = ({ movie }: { movie: MovieSimpleItem }) => {
  return (
    <li>
      <article>
        <Link to={`/details/$movieId`} params={{ movieId: String(movie.id) }}>
          <label htmlFor="img">
            {movie.poster_path !== null ? (
              <Image
                src={movie.poster_path ?? ''}
                alt={movie.title}
                width={92}
              />
            ) : null}
            {movie.title}
          </label>
        </Link>
      </article>
    </li>
  )
}

export { SimpleMovieItem }
