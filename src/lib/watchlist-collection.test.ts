import { afterEach, describe, expect, it } from 'vitest'

import {
  addToLocalWatchlist,
  localWatchlistCollection,
  removeFromLocalWatchlist,
} from './watchlist-collection'

describe('watchlist-collection', () => {
  afterEach(async () => {
    for (const movie of localWatchlistCollection.toArray) {
      removeFromLocalWatchlist(movie.id)
    }
  })

  it('adds a movie to watchlist collection', () => {
    addToLocalWatchlist(12345, 'Some Title', '/png.png', 27)

    expect(localWatchlistCollection.toArray).toEqual([
      {
        // actual data that is being saved in the collection
        // 'toEqual' does deep equal
        $collectionId: 'movies-watchlist',
        $key: 12345,
        $origin: 'local',
        $synced: false,
        id: 12345,
        title: 'Some Title',
        poster_path: '/png.png',
        genreId: 27,
      },
    ])
  })

  it('removes an item from a watchlist collection', () => {
    addToLocalWatchlist(12345, 'Some Title', '/png.png')
    removeFromLocalWatchlist(12345)

    expect(localWatchlistCollection.toArray).toEqual([])
  })
})
