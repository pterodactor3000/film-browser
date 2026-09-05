import { useSuspenseQuery } from '@tanstack/react-query'

import {
  genreDefinitionQueryOptions,
  genreListQueryOptions,
} from '#/lib/query-options.ts'

import { SimpleMovieItem } from '../SimpleMovieItem/SimpleMovieItem'

const Carousel = ({ genreId }: { genreId: number }) => {
  const { data: moviesList } = useSuspenseQuery(genreListQueryOptions(genreId))
  const { data: genreDefinitions } = useSuspenseQuery(
    genreDefinitionQueryOptions(),
  )

  const genreName = genreDefinitions.genres.find(
    (genre) => genre.id === genreId,
  )?.name

  return (
    <>
      <h3>{genreName}</h3>
      <ul>
        {moviesList.results.map((movie) => (
          <SimpleMovieItem
            key={movie.id}
            movie={{
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
            }}
          />
        ))}
      </ul>
    </>
  )
}

export { Carousel }
