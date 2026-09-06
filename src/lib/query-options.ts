import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'

import { getMovieById, getMoviesByGenre, getGenreDefinitions } from './tmdb'

const genreListQueryOptions = (genreId: number) => {
  return infiniteQueryOptions({
    queryKey: ['movies', 'genre', genreId],
    queryFn: ({ pageParam }) =>
      getMoviesByGenre({ data: { genreId, page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
  })
}

const movieDetailsQueryOptions = (movieId: string) => {
  return queryOptions({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieById({ data: { movieId } }),
    staleTime: 5 * 60 * 1000,
  })
}

const genreDefinitionQueryOptions = () => {
  return queryOptions({
    queryKey: ['genreDefinition'],
    queryFn: () => getGenreDefinitions(),
    staleTime: 5 * 60 * 1000,
  })
}

export {
  genreListQueryOptions,
  movieDetailsQueryOptions,
  genreDefinitionQueryOptions,
}
