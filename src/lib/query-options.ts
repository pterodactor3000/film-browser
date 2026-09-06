import {
  infiniteQueryOptions,
  queryOptions,
  type InfiniteData,
} from '@tanstack/react-query'

import { getMovieById, getMoviesByGenre, getGenreDefinitions } from './tmdb'

/**
 * Function that makes sure we do not have duplicated movies in carousel
 */
const selectUniqueMovies = (
  data: InfiniteData<TmdbMovieListResponse, number>,
) => {
  const seenIds = new Set<number>()

  return data.pages
    .flatMap((page) => page.results)
    .filter((movie) => {
      if (seenIds.has(movie.id)) {
        return false
      }
      seenIds.add(movie.id)
      return true
    })
}

const genreListQueryOptions = (genreId: number) => {
  return infiniteQueryOptions({
    queryKey: ['movies', 'genre', genreId],
    queryFn: ({ pageParam }) =>
      getMoviesByGenre({ data: { genreId, page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
    select: selectUniqueMovies,
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
