import { ClientOnly } from '@tanstack/react-router'

import { SimpleMovieItem } from '#/components/blocks/SimpleMovieItem/SimpleMovieItem.tsx'
import { Loading } from '#/components/ui/Loading/Loading.tsx'
import { getLocalWatchlist } from '#/lib/watchlist-collection.ts'

import './WatchlistPanel.scss'

const WatchlistFallback = () => {
  return <Loading label="Loading watchlist..." />
}

const WatchlistList = () => {
  const { data: watchlist, isReady } = getLocalWatchlist()

  if (!isReady) {
    return <WatchlistFallback />
  }

  if (watchlist.length === 0) {
    return <p>Wow, so empty...</p>
  }

  return (
    <ul>
      {watchlist.map((movie) => (
        <SimpleMovieItem key={movie.id} movie={movie} />
      ))}
    </ul>
  )
}

const WatchlistPanel = () => {
  return (
    <article className="watchlist-grid">
      <ClientOnly fallback={<WatchlistFallback />}>
        <WatchlistList />
      </ClientOnly>
    </article>
  )
}

export { WatchlistPanel }
