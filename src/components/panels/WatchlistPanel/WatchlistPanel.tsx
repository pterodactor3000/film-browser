import { useEffect, useState } from 'react'

import { SimpleMovieItem } from '#/components/blocks/SimpleMovieItem/SimpleMovieItem.tsx'
import { getLocalWatchlist } from '#/lib/watchlist-collection.ts'

const WatchlistPanel = () => {
  const [watchlist, setWatchlist] = useState<MovieSimpleItem[]>([])
  const { data } = getLocalWatchlist()

  useEffect(() => {
    setWatchlist(data)
  }, [data])

  return (
    <article>
      {watchlist.length
        ? watchlist.map((movie) => (
            <SimpleMovieItem key={movie.id} movie={movie} />
          ))
        : 'Wow, so empty...'}
    </article>
  )
}

export { WatchlistPanel }
