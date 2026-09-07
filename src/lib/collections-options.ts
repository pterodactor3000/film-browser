import { localStorageCollectionOptions } from '@tanstack/react-db'

import type { MovieSimpleItem } from '#/lib/types.ts'

const localWatchlistCollectionOptions =
  localStorageCollectionOptions<MovieSimpleItem>({
    id: 'movies-watchlist',
    storageKey: 'app-user-movies-watchlist',
    getKey: (item) => item.id,
  })

export { localWatchlistCollectionOptions }
