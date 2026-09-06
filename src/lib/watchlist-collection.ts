import { createCollection, useLiveQuery } from '@tanstack/react-db'

import { localWatchlistCollectionOptions } from './collections-options'

const localWatchlistCollection = createCollection(
  localWatchlistCollectionOptions,
)

const getLocalWatchlist = () => {
  return useLiveQuery({
    query: (q) => q.from({ watchlist: localWatchlistCollection }),
  })
}

const addToLocalWatchlist = (
  movieId: number,
  movieTitle: string,
  moviePoster: string,
  genreId?: number,
) =>
  localWatchlistCollection.insert({
    id: movieId,
    title: movieTitle,
    poster_path: moviePoster,
    genreId: genreId,
  })

const removeFromLocalWatchlist = (movieId: number) =>
  localWatchlistCollection.delete(movieId)

export {
  getLocalWatchlist,
  addToLocalWatchlist,
  removeFromLocalWatchlist,
  localWatchlistCollection,
}
