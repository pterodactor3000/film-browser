import { localStorageCollectionOptions } from '@tanstack/react-db'

const localWatchlistCollectionOptions =
  localStorageCollectionOptions<WatchlistItem>({
    id: 'movies-watchlist',
    storageKey: 'app-user-movies-watchlist',
    getKey: (item) => item.id,
  })

export { localWatchlistCollectionOptions }
